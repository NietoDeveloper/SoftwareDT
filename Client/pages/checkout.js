// frontend/pages/checkout.js
import withAuth from '@/components/auth/withAuth'; // HOC for route protection
import Head from 'next/head';
// Button import might not be needed directly here if CheckoutForm has its own button
// import Button from '@/components/common/Button';
import { useEffect, useState } from 'react';
import api from '@/lib/api'; // Your API helper instance
import { useCartStore } from '@/store/cartStore'; // To get cart items and total
import { Elements } from '@stripe/react-stripe-js'; // Stripe Elements provider
import stripePromise from '@/lib/stripe'; // Your loaded stripe.js instance promise
import CheckoutForm from '@/components/checkout/CheckoutForm'; // The Stripe Elements form component
import ShippingAddressForm from '@/components/checkout/ShippingAddressForm'; // The address form component
import { useForm, FormProvider } from 'react-hook-form'; // Import useForm & FormProvider for context

const CheckoutPage = () => {
  // --- State Hooks ---
  const [clientSecret, setClientSecret] = useState(''); // Stripe PaymentIntent client secret
  const [loadingSecret, setLoadingSecret] = useState(true); // Loading state for fetching the secret
  const [errorSecret, setErrorSecret] = useState(''); // Error state for fetching the secret
  // Loading state for the overall checkout process (optional, might be handled within CheckoutForm)
  // const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  // --- Store Hooks ---
  const items = useCartStore((state) => state.items);
  const getCartTotal = useCartStore((state) => state.getCartTotal);

  // --- React Hook Form Initialization ---
  // Initialize useForm at the top level of the checkout page
  const methods = useForm({
      mode: 'onTouched', // Validate fields when they lose focus
      // You could potentially load default address values here from user state if available
      // defaultValues: {
      //     fullName: userProfile?.name || '',
      //     // ... etc
      // }
  });

  // --- Effect for fetching Payment Intent client secret ---
  useEffect(() => {
    if (items && items.length > 0) {
      setLoadingSecret(true);
      setErrorSecret('');
      console.log("CheckoutPage: Fetching client secret...");

      const orderItems = items.map(item => ({ productId: item.product.id, quantity: item.quantity }));

      api.post('/payments/create-payment-intent', { items: orderItems })
        .then(res => {
          if (!res.data?.clientSecret) {
              throw new Error('Invalid server response: Missing clientSecret.');
          }
          setClientSecret(res.data.clientSecret);
          console.log("CheckoutPage: Client secret received.");
        })
        .catch(err => {
          console.error("CheckoutPage: Error fetching client secret:", err);
          const message = err.response?.data?.message || err.message || 'Could not initialize payment session.';
          setErrorSecret(message);
          setClientSecret('');
        })
        .finally(() => {
          setLoadingSecret(false);
        });
    } else {
        // Reset if cart becomes empty
        setClientSecret('');
        setLoadingSecret(false);
        setErrorSecret('');
    }
  }, [items]); // Re-run when cart items change


  // --- Checkout Submission Handler ---
  // This function is attached to the main <form> tag's onSubmit.
  // It primarily handles validation of the *address* part using react-hook-form.
  // The actual payment confirmation is typically triggered by the button *inside* CheckoutForm.
  const handleCheckoutSubmit = async (formData) => {
      console.log("Checkout Form (Address Part) Validated. Data:", formData);

      // **IMPORTANT NOTE:**
      // Usually, you don't need to do much more in *this* specific handler if
      // the button within CheckoutForm calls `stripe.confirmPayment()`.
      // That Stripe method handles payment confirmation and redirection.
      // Order creation in your DB typically happens *after* successful payment,
      // often triggered via a webhook or on the confirmation/return page.

      // If you had a single "Place Order" button *outside* the Stripe Elements,
      // you would add logic here to:
      // 1. Prevent default form submission (already done by handleSubmit)
      // 2. Manually trigger Stripe payment confirmation using the `stripe` and `elements` instances.
      // 3. Handle the result of the payment confirmation.
      // 4. If successful, THEN call your backend API to create the order, passing `formData` (address) and payment details.

      // For this implementation, we assume the button inside CheckoutForm handles payment.
      console.log("Proceeding to Stripe payment confirmation within the payment form...");

      // We don't set setIsProcessingOrder(true) here as that state is likely managed within CheckoutForm
  };

  // --- Calculate Order Summary ---
  const subtotal = getCartTotal();
  const shippingEstimate = subtotal > 0 ? 5.00 : 0; // Replace with real logic
  const taxRate = 0.08; // Replace with real logic
  const taxEstimate = subtotal * taxRate;
  const orderTotal = subtotal + shippingEstimate + taxEstimate;

  // --- Stripe Elements Options ---
  const stripeElementsOptions = { clientSecret };

  return (
    <>
        <Head>
            <title>Checkout - Your E-commerce App</title>
             <meta name="description" content="Complete your purchase by providing shipping and payment details." />
        </Head>

        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">Checkout</h1>

             {/* Display initialization errors */}
             {errorSecret && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                     <strong className="font-bold">Payment Setup Error: </strong>
                     <span className="block sm:inline">{errorSecret}</span>
                  </div>
             )}

            {/* Wrap the entire form content with FormProvider */}
            <FormProvider {...methods}>
                {/* The main form tag - onSubmit handles address validation via RHF */}
                <form onSubmit={methods.handleSubmit(handleCheckoutSubmit)} id="checkout-main-form">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                       {/* Column 1 & 2: Shipping & Payment */}
                       <div className="lg:col-span-2 space-y-8">
                           {/* Shipping Information Section */}
                           <section aria-labelledby="shipping-info-heading" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                               <h2 id="shipping-info-heading" className="text-xl font-semibold mb-4 border-b pb-2 dark:text-gray-100 dark:border-gray-700">Shipping Information</h2>
                               {/* Render the ShippingAddressForm - it gets RHF methods via context */}
                               <ShippingAddressForm />
                           </section>

                           {/* Payment Details Section */}
                           <section aria-labelledby="payment-info-heading" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                                <h2 id="payment-info-heading" className="text-xl font-semibold mb-4 border-b pb-2 dark:text-gray-100 dark:border-gray-700">Payment Details</h2>
                                {/* Conditionally render Stripe form based on clientSecret */}
                                {loadingSecret && <p className="text-gray-500 dark:text-gray-400 text-center py-4">Loading payment details...</p>}

                                {!loadingSecret && !errorSecret && clientSecret && items.length > 0 && (
                                    // Pass options and stripePromise to Elements provider
                                    <Elements options={stripeElementsOptions} stripe={stripePromise}>
                                        {/* Pass clientSecret down to the form if needed there (though options often suffice) */}
                                        <CheckoutForm clientSecret={clientSecret} />
                                    </Elements>
                                )}

                                {/* Display messages if payment cannot load */}
                                {!loadingSecret && !clientSecret && !errorSecret && items.length > 0 && (
                                    <p className="text-yellow-700 dark:text-yellow-300 text-center py-4">Could not initialize payment form.</p>
                                )}
                                {!loadingSecret && items.length === 0 && (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">Please add items to your cart to proceed with payment.</p>
                                )}
                           </section>
                       </div>

                       {/* Column 3: Order Summary */}
                       <div className="lg:col-span-1">
                            <section aria-labelledby="order-summary-heading" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow lg:sticky lg:top-24">
                                <h2 id="order-summary-heading" className="text-xl font-semibold mb-4 border-b pb-2 dark:text-gray-100 dark:border-gray-700">Order Summary</h2>
                                <div className="space-y-2 text-sm mb-6">
                                     {items.length > 0 ? items.map(item => (
                                         <div key={item.product.id} className="flex justify-between text-gray-600 dark:text-gray-300">
                                             <span className="truncate pr-2">{item.product.name} x {item.quantity}</span>
                                             <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                                         </div>
                                     )) : <p className="text-gray-500 dark:text-gray-400 text-center italic">Your cart is empty.</p>}
                                     {items.length > 0 && (
                                         <>
                                             <div className="border-t dark:border-gray-700 mt-2 pt-2">
                                                 <div className="flex justify-between text-gray-600 dark:text-gray-300"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                                                 <div className="flex justify-between text-gray-600 dark:text-gray-300"><span>Shipping</span><span>${shippingEstimate.toFixed(2)}</span></div>
                                                 <div className="flex justify-between text-gray-600 dark:text-gray-300"><span>Tax ({ (taxRate * 100).toFixed(0) }%)</span><span>${taxEstimate.toFixed(2)}</span></div>
                                             </div>
                                             <div className="border-t dark:border-gray-700 pt-3 mt-3 flex justify-between text-lg font-bold text-gray-900 dark:text-gray-100">
                                                 <span>Total</span>
                                                 <span>${orderTotal.toFixed(2)}</span>
                                             </div>
                                         </>
                                     )}
                                 </div>
                                 <p className="text-xs text-center mt-4 text-gray-500 dark:text-gray-400">
                                     Please complete your payment details above.
                                 </p>
                                 {/* No main submit button here - assuming it's inside CheckoutForm */}
                           </section>
                       </div>
                    </div>
                 </form>
            </FormProvider>
          </div>
    </>
  );
};

// Protect page: User must be logged in
export default withAuth(CheckoutPage);