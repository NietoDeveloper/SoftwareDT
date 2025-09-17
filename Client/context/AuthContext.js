// frontend/context/AuthContext.js
import React, { createContext, useContext } from 'react';
import { useAuthStore } from '@/store/authStore';

// Create the context
const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
    // *** IMPORTANT NOTE ***
    // This AuthProvider uses the Zustand store (`useAuthStore`) as the source of truth.
    // The primary purpose of this context is potentially to provide a familiar Context API
    // interface IF NEEDED for specific components or legacy reasons.
    //
    // However, for this project, directly using `useAuthStore` in components
    // (as shown in Navbar, LoginForm, withAuth HOC etc.) is the recommended and simpler approach.
    // This AuthContext might be redundant unless you have a specific use case for it.
    // Consider removing this file if you only use Zustand.

    const authState = useAuthStore(state => ({
        user: state.user,
        token: state.token,
        loading: state.loading,
        error: state.error,
        // Expose actions if needed through context, though directly importing actions is fine too
        // login: state.login,
        // logout: state.logout,
        // register: state.register,
    }));

    // The value provided by the context is the state from the Zustand store
    const contextValue = authState;

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook to use the auth context
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        // This check assumes AuthProvider wraps the relevant part of the app
        // It won't work if you try to use useAuthContext outside the provider
        console.warn("useAuthContext must be used within an AuthProvider - Falling back to direct Zustand usage might be intended.");
       // throw new Error('useAuthContext must be used within an AuthProvider');
    }
    // Even if context is undefined (because no provider used), components
    // might still function correctly if they directly use useAuthStore.
    // Returning context (which might be null) or fallback to Zustand state?
    // Returning null/undefined might be safer to indicate context wasn't found.
    return context; // Returns null if used outside AuthProvider
};

// How to potentially use it in _app.js (if you choose context over direct Zustand):
//
// import { AuthProvider } from '@/context/AuthContext';
//
// function MyApp({ Component, pageProps }) {
//   // ... other useEffects like rehydrateAuth
//   return (
//     <AuthProvider> {/* Wrap Layout or Component */}
//       <Layout>
//         <Component {...pageProps} />
//       </Layout>
//     </AuthProvider>
//   );
// }
//
// Then in a component:
// const auth = useAuthContext(); // Gets value from context (originating from Zustand)
// if (auth?.loading) return <p>Loading...</p>;
// if (auth?.user) return <p>Welcome {auth.user.username}</p>;