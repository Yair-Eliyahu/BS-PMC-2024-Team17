import { db } from "@/db";
import { count, eq } from "drizzle-orm";
import { users } from "@/db/schema";

const getTotalStudents = async () => {
    const result = await db
        .select({ value: count() })
        .from(users)
        .where(eq(users.schoolRole, "Student"));

    return result[0]?.value || 0;
};

export default getTotalStudents;
