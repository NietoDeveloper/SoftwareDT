// frontend/pages/_app.js
import Layout from '@/components/layout/Layout';
import '@/styles/globals.css';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';

function MyApp({ Component, pageProps }) {
    // NOTE: We removed the direct call to rehydrateAuth here.
    // Zustand's persist middleware handles rehydration automatically when the store is first accessed.
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // We only need to set isMounted to true on the client side.
        // The actual state rehydration happens via Zustand middleware.
        setIsMounted(true);
    }, []); // Empty dependency array ensures this runs only once on mount

    const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

    // Crucially: Render null or a loader if not mounted yet.
    // This ensures the initial client render pass does NOT try to render
    // components that might rely on rehydrated state immediately.
    if (!isMounted) {
        // You could return a full-page loader here for better UX
        // e.g., return <FullPageLoader />;
        return null;
    }

    // Only render the actual component tree once mounted
    return getLayout(<Component {...pageProps} />);
}

export default MyApp;