// frontend/store/authStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // For localStorage persistence
import { jwtDecode } from 'jwt-decode'; // Use named import
import api from '@/lib/api'; // Your configured axios instance

// Helper to get initial state from localStorage if needed (for SSR compatibility)
const getInitialAuthState = () => {
    if (typeof window !== 'undefined') { // Check if running on the client
        const token = localStorage.getItem('auth-storage')
            ? JSON.parse(localStorage.getItem('auth-storage') || '{}')?.state?.token
            : null;
        if (token) {
            try {
                const decoded = jwtDecode(token);
                 // Optional: Check token expiration
                 if (decoded.exp * 1000 > Date.now()) {
                     // Need to fetch user data separately usually, token might only have id/role
                     // For simplicity here, we decode, but ideally fetch profile on load
                     return { token: token, user: { id: decoded.id, role: decoded.role /* ... other decoded fields if available */ } };
                 }
            } catch (error) {
                console.error("Error decoding token on initial load:", error);
                // Invalid token, clear it
                localStorage.removeItem('auth-storage');
            }
        }
    }
    return { token: null, user: null }; // Default initial state
};


export const useAuthStore = create(
    persist(
        (set, get) => ({
            // State
            token: getInitialAuthState().token, // Initialize token
            user: getInitialAuthState().user,   // Initialize user (basic info from token or null)
            loading: false,
            error: null,

            // Actions
            login: async (email, password) => {
                set({ loading: true, error: null });
                try {
                    const response = await api.post('/auth/login', { email, password });
                    const { token, user } = response.data;
                    const decoded = jwtDecode(token); // Decode to ensure we have basic info immediately

                    set({
                        token: token,
                        // Store essential user details obtained from login response
                        user: {
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            role: user.role,
                        },
                        loading: false,
                        error: null
                    });
                     // Optionally fetch full profile after successful login if needed
                    // get().fetchUserProfile(); // Example call
                } catch (error) {
                    console.error("Login failed:", error);
                    set({ loading: false, error: error || 'Login failed', token: null, user: null });
                    throw error; // Re-throw error to handle in component
                }
            },

            register: async (username, email, password) => {
                set({ loading: true, error: null });
                try {
                     const response = await api.post('/auth/register', { username, email, password });
                     const { token, user } = response.data;
                     const decoded = jwtDecode(token);

                     set({
                         token: token,
                         user: {
                             id: user.id,
                             username: user.username,
                             email: user.email,
                             role: user.role,
                         },
                         loading: false,
                         error: null
                     });
                     // Optionally fetch profile after registration
                } catch (error) {
                    console.error("Registration failed:", error);
                    set({ loading: false, error: error || 'Registration failed', token: null, user: null });
                    throw error; // Re-throw error
                }
            },

            logout: () => {
                set({ token: null, user: null, error: null, loading: false });
                // The 'persist' middleware handles removing from localStorage
            },

            // Action to fetch full user profile (if needed after initial login/decode)
            fetchUserProfile: async () => {
                 const token = get().token;
                 if (!token) return; // No token, cannot fetch profile

                 set({ loading: true });
                 try {
                     const response = await api.get('/auth/profile'); // Uses token from interceptor
                     set({ user: response.data, loading: false, error: null });
                 } catch (error) {
                     console.error("Failed to fetch user profile:", error);
                      // If profile fetch fails (e.g., token invalid), log out
                     if (error?.response?.status === 401 || error?.response?.status === 404) {
                          get().logout(); // Use get() to access other actions
                     } else {
                          set({ loading: false, error: error || 'Failed to fetch profile' });
                     }
                 }
            },

            // Action called by _app.js to rehydrate state and potentially fetch profile
            rehydrate: () => {
                // console.log('Rehydrating auth state...'); // Debug log
                // State is rehydrated automatically by `persist` middleware
                // Optional: Fetch fresh profile data if user exists after rehydration
                // This ensures data is up-to-date even if localStorage is stale
                const userExists = get().user;
                 if(userExists){
                     // console.log('User exists after rehydrate, fetching profile...'); // Debug log
                     get().fetchUserProfile(); // Use get() to access other actions
                }
            }

        }),
        {
            name: 'auth-storage', // Name of the item in storage (must be unique)
            storage: createJSONStorage(() => localStorage), // Use localStorage
            // Optionally: Only persist the token, fetch user on load
            // partialize: (state) => ({ token: state.token }),
        }
    )
);