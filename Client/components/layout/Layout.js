// frontend/components/layout/Layout.js
import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head'; // For setting page title, meta tags

const Layout = ({ children, title = "E-commerce Platform" }) => {
  return (
    <>
      <Head>
         <title>{title}</title>
         <meta name="description" content="A modern full-stack e-commerce platform." />
         <link rel="icon" href="/favicon.ico" /> {/* Add your favicon */}
         {/* Add other meta tags: viewport, keywords etc. */}
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;