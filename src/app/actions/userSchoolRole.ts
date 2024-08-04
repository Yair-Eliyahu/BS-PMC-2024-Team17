import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserRole({
    userId,
    regUserId
}: {
    userId?: string;
    regUserId?: string;
}) {
    // Determine which ID to use
    const idToQuery = userId || regUserId;

    if (!idToQuery) {
        throw new Error("Neither userId nor regUserId provided");
    }

    const user = await db.query.users.findFirst({
        where: eq(users.id, idToQuery),
    });

    return user?.schoolRole;
}