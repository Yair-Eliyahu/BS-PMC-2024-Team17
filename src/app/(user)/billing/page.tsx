
import React from "react";
import ManageSubsription from "./ManageSubscription";
import { auth,signIn } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";


const page = async () => {
    const session = await auth();

    if(!session || !session.user || !session.user.id) {
        signIn();
        return null;
    }

    const user = await db.query.users.findFirst({
        where: eq(users.id, session.user.id)
    })

    const plan = user?.subscribed ? 'PREMIUM' : 'FREE';

    return (
        <div className="flex justify-center items-center py-20">
            <div className="p-8 border-2 border-gray-700 rounded-md w-full max-w-3xl text-center">
                <h1 className="text-4xl mb-4 text-white font-bold">Subscription Details</h1>
                <p className="mb-4 text-gray-300">You are currently on a <span className="text-green-400 font-semibold">{plan}</span> plan</p>
                <ManageSubsription />
            </div>
        </div>
    )
}

export default page;