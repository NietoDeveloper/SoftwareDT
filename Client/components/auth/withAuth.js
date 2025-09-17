// frontend/components/auth/withAuth.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'; // Import useState
import { useAuthStore } from '@/store/authStore';

const withAuth = (WrappedComponent, options = {}) => {
    const { requiredRole = 'user' } = options;

    const Wrapper = (props) => {
        const router = useRouter();
        // Select needed state pieces individually
        const token = useAuthStore((state) => state.token);
        const user = useAuthStore((state) => state.user);
        const loading = useAuthStore((state) => state.loading); // Zustand loading state
        const fetchUserProfile = useAuthStore((state) => state.fetchUserProfile);
        const logout = useAuthStore((state) => state.logout); // Get logout action

        // Local loading state specifically for this HOC's initial check/fetch
        const [isCheckingAuth, setIsCheckingAuth] = useState(true);
        const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false); // Prevent fetch loops


        useEffect(() => {
            // Don't run effect logic if Zustand is still loading initial state (e.g., rehydrating)
            // Or if we've already completed the initial check
            if (loading || !isCheckingAuth) {
                 // console.log(`withAuth Effect Skip: loading=${loading}, isCheckingAuth=${isCheckingAuth}`);
                return;
            }

            // --- Logic after Zustand loading is false ---

            // Scenario 1: No token -> Redirect to login
            if (!token) {
                 console.log("withAuth: No token. Redirecting to login.");
                router.replace(`/auth/login?redirect=${router.asPath}`);
                // No need to set isCheckingAuth=false here, as redirection handles it.
                return; // Stop effect processing
            }

            // Scenario 2: Token exists, but no user data yet. Try fetching.
            if (token && !user && !hasAttemptedFetch) {
                console.log("withAuth: Token found, user missing. Attempting fetch.");
                setHasAttemptedFetch(true); // Mark that we are trying/have tried to fetch
                fetchUserProfile()
                    .then(() => {
                         console.log("withAuth: fetchUserProfile resolved successfully.");
                         // User state should now be updated by the store
                         // We still need to finish the check based on the *new* user state in the *next* effect run.
                         // However, we can potentially mark checking as done IF the fetch was successful.
                         // setIsCheckingAuth(false); // Move this to the 'user exists' block later
                    })
                    .catch((error) => {
                        console.error("withAuth: fetchUserProfile failed in effect.", error);
                        // fetchUserProfile action should handle logout on 401/404.
                        // If it failed for other reasons, logout/redirect might be needed,
                        // but the next effect run should catch the !user state again.
                        // setIsCheckingAuth(false); // Mark check done even on error
                    })
                    // Don't set setIsCheckingAuth(false) here yet. Let the next effect run check the user state after fetch.
                return; // Wait for fetch to complete and trigger re-render/next effect run
            }

            // Scenario 3: Token exists and user data exists. Perform role check.
            if (token && user) {
                 console.log(`withAuth: Token and user exist. Checking role (Required: ${requiredRole}, User: ${user.role}).`);
                 if (requiredRole === 'admin' && user.role !== 'admin') {
                    console.log("withAuth: Admin role required, user is not admin. Redirecting.");
                    router.replace('/'); // Redirect non-admins
                 } else {
                    // Authorized (either role matches or just needed login)
                    setIsCheckingAuth(false); // Mark auth check as complete
                 }
                return; // Stop effect processing
            }

             // Scenario 4: Token exists, fetch was attempted, still no user (fetch must have failed without logout)
            if (token && !user && hasAttemptedFetch) {
                 console.log("withAuth: Token exists, fetch attempted, user still null. Logging out and redirecting.");
                 logout(); // Force logout
                 router.replace(`/auth/login?redirect=${router.asPath}`);
                 // No need to set isCheckingAuth=false here
                 return;
             }


        // Dependencies: Include everything that could trigger a needed re-check.
        }, [token, user, loading, router, fetchUserProfile, isCheckingAuth, hasAttemptedFetch, logout]);


        // Render loading state while checking auth OR if Zustand state is loading
        if (isCheckingAuth || loading) {
            return (
                <div className="flex justify-center items-center min-h-screen">
                    <p>Authenticating...</p> {/* Or a spinner component */}
                </div>
            );
        }

        // Render component ONLY if check is complete AND user exists AND role is valid
        if (!isCheckingAuth && user && (requiredRole === 'user' || user.role === requiredRole)) {
            return <WrappedComponent {...props} />;
        }

        // If check is complete but user is missing or role invalid, render null (or redirect happened)
        // This case should ideally be handled by redirects within the useEffect
        return null;
    };

    Wrapper.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
    return Wrapper;
};

export default withAuth;