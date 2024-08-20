import React from "react";
import ManageSubscription from "./ManageSubscription"; // Component to manage the subscription
import { auth, signIn } from "@/auth"; // Authentication functions
import { db } from "@/db"; // Database connection
import { users } from "@/db/schema"; // Users schema
import { eq } from "drizzle-orm"; // Equality condition for queries
import { getUser } from "@/auth/server"; // Function to get the current user

const page = async () => {
    // Attempt to authenticate the user and get the session data
    const session = await auth();
    const regsession = await getUser();

    // Check if the session exists and is valid
    if (session) {
        // If session is invalid or missing user ID, redirect to sign-in
        if (!session || !session.user || !session.user.id) {
            signIn();
            return null;
        }

        // Query the database to find the user based on the session's user ID
        const user = await db.query.users.findFirst({
            where: eq(users.id, session.user.id)
        });

        // Determine the user's subscription plan
        const plan = user?.subscribed ? 'PREMIUM' : 'FREE';

        // Render the subscription details for authenticated users
        return (
            <div className="flex justify-center items-center py-20 mt-10">
                <div className="p-8 border-2 border-gray-700 rounded-md w-full max-w-3xl text-center">
                    <h1 className="text-4xl mb-4 text-black dark:text-white font-bold">Subscription Details</h1>
                    <p className="mb-4 text-gray-300">You are currently on a <span className="text-green-400 font-semibold">{plan}</span> plan</p>
                    <ManageSubscription />
                </div>
            </div>
        );
    } 
    // If the session does not exist, check for a registered session
    else if (regsession) {
        // Query the database to find the user based on the registered session's user ID
        const reguser = await db.query.users.findFirst({
            where: eq(users.id, regsession.id)
        });

        // Determine the user's subscription plan
        const plan = reguser?.subscribed ? 'PREMIUM' : 'FREE';

        // Render the subscription details for registered users
        return (
            <div className="flex justify-center items-center py-20 mt-10">
                <div className="p-8 border-2 border-gray-700 rounded-md w-full max-w-3xl text-center">
                    <h1 className="text-4xl mb-4 text-black dark:text-white font-bold">Subscription Details</h1>
                    <p className="mb-4 text-gray-400">You are currently on a <span className="text-green-400 font-semibold">{plan}</span> plan</p>
                    <ManageSubscription />
                </div>
            </div>
        );
    }
}

export default page;
