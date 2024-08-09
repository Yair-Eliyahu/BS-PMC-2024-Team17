import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createSubscription({
    stripeCustomerID
}: {
    stripeCustomerID: string
}) {
    try {
        const result = await db.update(users).set({
            subscribed: true,
        }).where(eq(users.stripeCustomerID, stripeCustomerID));

        if (result.count === 0) {
            console.warn(`No user found with stripeCustomerID: ${stripeCustomerID}`);
        } else {
            console.log(`User with stripeCustomerID: ${stripeCustomerID} updated to subscribed`);
        }
    } catch (error) {
        console.error("Error updating subscription:", error);
    }
}

export async function deleteSubscription({
    stripeCustomerID
}: {
    stripeCustomerID: string
}) {
    console.log("Deleting subscription for:", stripeCustomerID);
    await db.update(users).set({
        subscribed: false,
    }).where(eq(users.stripeCustomerID, stripeCustomerID));
}

export async function getUserSubscription({
    userId,
    regUserId
}: {
    userId?: string;
    regUserId?: string;
}) {
    // Determine which ID to use
    const idToQuery = userId || regUserId;

    if (!idToQuery) {
        return;
    }

    const user = await db.query.users.findFirst({
        where: eq(users.id, idToQuery),
    });

    return user?.subscribed;
}


export async function getUserSubscriptionId({
    userId,
    regUserId
}: {
    userId?: string;
    regUserId?: string;
}) {
    // Determine which ID to use
    const idToQuery = userId || regUserId;

    if (!idToQuery) {
        return;
    }

    const user = await db.query.users.findFirst({
        where: eq(users.id, idToQuery),
    });

    return user?.stripeCustomerID;
}