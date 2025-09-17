// frontend/pages/order/confirmation.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from '@/components/common/Button';
import stripePromise from '@/lib/stripe'; // Import stripePromise to interact with Stripe API

export default function OrderConfirmationPage() {
  const router = useRouter();
  const [status, setStatus] = useState(null); // 'succeeded', 'processing', 'requires_payment_method'
  const [message, setMessage] = useState('Loading payment details...');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!router.isReady) {
      return; // Wait for router to be ready
    }

    // Retrieve the client secret from the URL query parameters added by Stripe
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      console.log("No client secret found in URL.");
      setMessage('Could not find payment details.');
      setStatus('error');
      return;
    }

    // Load Stripe.js
    stripePromise.then(stripe => {
        if (!stripe) {
            setMessage('Stripe failed to load.');
            setStatus('error');
            return;
        }

      // Retrieve the PaymentIntent using the client secret
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent, error: retrieveError }) => {
        if (retrieveError) {
            console.error("Error retrieving PaymentIntent:", retrieveError);
            setMessage(`Error retrieving payment details: ${retrieveError.message}`);
            setStatus('error');
            setError(retrieveError.message);
            return;
        }

        console.log("Retrieved PaymentIntent:", paymentIntent);
        // Inspect the PaymentIntent status
        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('Payment successful! Thank you for your order.');
            setStatus('succeeded');
             // TODO: Consider clearing the cart here using cartStore.getState().clearCart();
             // Make sure this only runs once
            break;
          case 'processing':
            setMessage('Your payment is processing. We will update you when it\'s complete.');
            setStatus('processing');
            break;
          case 'requires_payment_method':
            setMessage('Payment failed. Please try another payment method or contact support.');
            setStatus('failed');
            setError('Payment requires another payment method.');
            // You might want to redirect back to checkout here
            // router.push('/checkout');
            break;
          default:
            setMessage('Something went wrong with your payment.');
            setStatus('error');
             setError(`Unexpected payment status: ${paymentIntent.status}`);
            break;
        }
      });
    });
  }, [router.isReady]); // Depend on router readiness

  return (
    <>
      <Head>
        <title>Order Status - Your E-commerce App</title>
      </Head>
      <div className="container mx-auto px-4 py-12 text-center min-h-[calc(100vh-15rem)] flex flex-col items-center justify-center">
        {status === 'succeeded' && (
            <svg className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )}
         {(status === 'failed' || status === 'error') && (
             <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
         )}
          {status === 'processing' && (
              <svg className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
          )}

        <h1 className={`text-2xl font-semibold mb-4 ${status === 'succeeded' ? 'text-green-700' : status === 'failed' || status === 'error' ? 'text-red-700' : 'text-blue-700'}`}>
            {status === 'succeeded' ? 'Order Successful!' : status === 'processing' ? 'Payment Processing' : status === 'failed' || status === 'error' ? 'Payment Issue' : 'Order Status'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
            {message}
        </p>
        {error && <p className="text-sm text-red-500 mb-6">Error details: {error}</p>}

        <div className="space-x-4">
            <Link href="/">
                 <Button variant="primary">Continue Shopping</Button>
            </Link>
            {/* Optionally link to profile/orders page */}
             {/* <Link href="/profile">
                 <Button variant="outline">View My Orders</Button>
             </Link> */}
        </div>
      </div>
    </>
  );
}