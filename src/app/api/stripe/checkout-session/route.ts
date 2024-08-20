import { stripe } from "@/lib/stripe";
import { auth } from "@/auth";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { getUser } from "@/auth/server";

export async function POST(req: Request) {
    const { price, quantity = 1 } = await req.json();
    
    // Get user sessions
    const userSession = await auth();
    const userRegsession = await getUser();
    const userId = userSession?.user?.id || userRegsession?.id;

    if (!userId) {
        return new Response(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 401 }
        );
    }

    // Fetch user details from the database
    const user = await db.query.users.findFirst({
        where: eq(users.id, userId)
    });

    if (!user) {
        return new Response(
            JSON.stringify({ error: "User not found" }),
            { status: 404 }
        );
    }

    let customer;

    // Check if user has a Stripe customer ID
    if (user.stripeCustomerID) {
        customer = { id: user.stripeCustomerID };
    } else {
        // Create a new Stripe customer
        const customerData = {
            metadata: { dbId: userId }
        };

        try {
            const response = await stripe.customers.create(customerData);
            customer = { id: response.id };

            // Update the user with the new Stripe customer ID
            await db.update(users).set({
                stripeCustomerID: customer.id
            }).where(eq(users.id, userId));

            console.log(`Stripe Customer ID updated for user ${userId}: ${customer.id}`);
        } catch (error) {
            console.error("Error creating Stripe customer:", error);
            return new Response(
                JSON.stringify({ error: "Failed to create Stripe customer" }),
                { status: 500 }
            );
        }
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    try {
        const session = await stripe.checkout.sessions.create({
            success_url: `${baseUrl}/billing/payment/success`,
            customer: customer.id,
            payment_method_types: ["card"],
            line_items: [{ price, quantity }],
            mode: "subscription"
        });

        if (session) {
            return new Response(
                JSON.stringify({ sessionId: session.id }),
                { status: 200 }
            );
        } else {
            throw new Error("Failed to create a session");
        }
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return new Response(
            JSON.stringify({ error: "Failed to create a checkout session" }),
            { status: 500 }
        );
    }
}
