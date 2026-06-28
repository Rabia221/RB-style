import { getStripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return Response.json(
        { error: "Stripe is not configured (missing STRIPE_SECRET_KEY)." },
        { status: 500 },
      );
    }

    const { total } = await req.json();
    const amount = Math.round(total * 100); // Convert to cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "pkr", // Pakistani Rupee
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return Response.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
