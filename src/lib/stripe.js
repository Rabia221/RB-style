import Stripe from "stripe";

// Lazy-init so `next build` doesn't crash when STRIPE_SECRET_KEY isn't set.
// The API route will return a clear error if Stripe isn't configured.
let stripe = null;

function getStripe() {
  if (stripe) return stripe;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;

  stripe = new Stripe(secretKey, {
    apiVersion: "2024-06-20",
  });

  return stripe;
}

export { getStripe };
export default getStripe();
