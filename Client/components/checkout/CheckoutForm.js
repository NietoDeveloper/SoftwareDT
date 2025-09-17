// frontend/components/checkout/CheckoutForm.js
import React, { useState, useEffect } from 'react';
import {
  PaymentElement, // Renders the dynamic Stripe payment form (card, wallets, etc.)
  useStripe,      // Hook to get the initialized Stripe instance
  useElements     // Hook to get the Elements instance managing the PaymentElement
} from "@stripe/react-stripe-js";
import Button from '@/components/common/Button'; // Your reusable Button component

/**
 * Renders the Stripe Payment Element form and handles the payment submission process.
 * This component should be rendered within the <Elements> provider from @stripe/react-stripe-js.
 *
 * @param {string} clientSecret - The PaymentIntent client secret obtained from the backend API.
 */
export default function CheckoutForm({ clientSecret }) {
  // --- Hooks ---
  const stripe = useStripe(); // Access the Stripe object (null until Stripe.js loads)
  const elements = useElements(); // Access the Elements group associated with the PaymentElement

  // --- State ---
  // message: For displaying feedback (errors, success, processing) to the user.
  const [message, setMessage] = useState(null);
  // isLoading: Tracks whether a payment submission is currently in progress.
  const [isLoading, setIsLoading] = useState(false);

  // --- Effect ---
  // Optional effect to check Stripe status or retrieve intent details if needed on component load.
  // Generally, status checking happens on the return_url page.
  useEffect(() => {
    if (!stripe) {
      console.log("CheckoutForm Effect: Stripe instance not available yet.");
      return;
    }
    if (!clientSecret) {
      console.warn("CheckoutForm Effect: clientSecret prop is missing.");
      // Consider setting an error message if needed, but the parent component
      // should ideally prevent rendering this form without a clientSecret.
      // setMessage("Payment cannot be initialized.");
      return;
    }
    // You could potentially retrieve the PaymentIntent here to check its initial status,
    // but it's often handled post-submission on the confirmation page.
  }, [stripe, clientSecret]); // Dependencies for the effect

  // --- Event Handler ---
  /**
   * Handles the click event of the "Pay Now" button.
   * Validates Elements, submits payment details to Stripe for confirmation.
   */
  const handleSubmit = async (e) => {
    // Since the button type is "button", preventDefault isn't strictly necessary
    // unless there's some other default action we want to avoid.
    // e.preventDefault();

    // Guard clauses: Don't proceed if Stripe/Elements aren't loaded,
    // or if a submission is already in progress.
    if (!stripe || !elements) {
      console.log("Submit prevented: Stripe or Elements not loaded.");
      setMessage("Payment system is initializing, please wait.");
      return;
    }
    if (isLoading) {
        console.log("Submit prevented: Already processing.");
        return;
    }

    // Start loading state and clear previous messages
    setIsLoading(true);
    setMessage(null);

    console.log("CheckoutForm: Initiating payment confirmation...");

    // 1. Trigger client-side validation and data collection from the PaymentElement.
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show validation error messages directly from Stripe Elements.
      console.error("Stripe elements.submit() Error:", submitError);
      setMessage(submitError.message || "Please check your payment details.");
      setIsLoading(false); // Stop loading on validation error
      return;
    }

    // 2. If elements.submit() is successful, confirm the PaymentIntent with Stripe.
    //    This attempts the actual charge or authentication step (like 3D Secure).
    const { error: confirmError } = await stripe.confirmPayment({
      elements, // The Elements instance containing the PaymentElement data
      clientSecret, // The secret for this specific PaymentIntent
      confirmParams: {
        // The URL Stripe will redirect the user back to after attempting payment.
        // This page (e.g., /order/confirmation) MUST handle checking the
        // payment status using the `payment_intent_client_secret` URL parameter.
        return_url: `${window.location.origin}/order/confirmation`,

        // Optional: If you collect shipping details separately and need to pass them
        // for specific payment methods or risk assessment.
        // shipping: { /* ... shipping data object ... */ }
      },
      // Default redirect behavior is 'if_required'. Stripe handles redirection automatically.
    });

    // 3. Handle *immediate* errors from confirmPayment.
    //    NOTE: If the payment requires redirection (like 3D Secure, some bank redirects),
    //    this `confirmPayment` promise might *not* resolve here immediately; the user
    //    is redirected first. This error handling is primarily for synchronous errors
    //    like card declines or immediate validation failures that don't require redirection.
    if (confirmError) {
      if (confirmError.type === "card_error" || confirmError.type === "validation_error") {
        setMessage(confirmError.message || "There was an error with your card details.");
      } else {
        setMessage("An unexpected error occurred while processing your payment.");
      }
      console.error("Stripe confirmPayment Error:", confirmError);
    } else {
      // This block is reached less often with modern payment flows involving redirects.
      // If reached, it might mean the payment succeeded synchronously or is processing.
      // The true status check should happen on the return_url page.
      setMessage("Payment processing...");
      console.log("CheckoutForm: confirmPayment called without immediate error (redirect might occur).");
    }

    // Stop loading only if an error occurred *without* redirection.
    // If redirection happens, the page navigates away anyway.
    setIsLoading(false);
  };

  // --- Payment Element Configuration ---
  // Customize the appearance and behavior of the Stripe Payment Element
  const paymentElementOptions = {
    layout: "tabs", // "tabs" or "accordion" view for multiple payment methods
    // Add other options like defaultValues if needed
  };

  // --- Render ---
  // Return the Payment Element and the submit button, wrapped in a div (NOT a nested form).
  return (
    <div>
      {/* PaymentElement mounts the dynamic Stripe form */}
      <div className="mb-6">
        <PaymentElement id="payment-element" options={paymentElementOptions} />
      </div>

      {/* Submit Button */}
      <Button
        type="button" // Important: Use type="button" to avoid conflicts with parent form
        onClick={handleSubmit} // Trigger payment confirmation on click
        // Disable button when loading, if Stripe/Elements aren't ready, or if no clientSecret
        disabled={isLoading || !stripe || !elements || !clientSecret}
        className="w-full" // Style as needed
        variant="primary"
        loading={isLoading} // Show loading indicator if Button component supports it
      >
        {/* Display dynamic text based on loading state */}
        {isLoading ? 'Processing Payment...' : 'Pay Now'}
      </Button>

      {/* Display any messages (errors or status updates) */}
      {message && (
        <div
          id="payment-message"
          role="alert"
          className={`mt-4 text-sm font-medium ${
            // Apply different text colors based on the message type
            message.includes('fail') || message.includes('error') || message.includes('check')
            ? 'text-red-600 dark:text-red-400'
            : message.includes('succ') // succeeded, successful
            ? 'text-green-600 dark:text-green-400'
            : 'text-blue-600 dark:text-blue-400' // processing, initializing etc.
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}