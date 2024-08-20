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
    const idToQuery = userId || regUserId;

    if (!idToQuery) {
        return;
    }

    const user = await db.query.users.findFirst({
        where: eq(users.id, idToQuery),
    });

    return user?.schoolRole;
}