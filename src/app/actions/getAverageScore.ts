import { db } from "@/db";
import { quizzSubmissions } from "@/db/schema";
import { avg } from "drizzle-orm";

const getAverageScore = async () => {
    const result = await db
        .select({ value: avg(quizzSubmissions.score) })
        .from(quizzSubmissions);

    return result[0]?.value || 0;
};

export default getAverageScore;
