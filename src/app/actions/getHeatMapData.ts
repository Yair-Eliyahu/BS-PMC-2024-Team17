import { quizzes, questions, quizzSubmissions, users } from "@/db/schema";
import { auth } from "@/auth";
import { db } from "@/db";
import { count, eq, avg, sql } from "drizzle-orm";
import { getUser } from "@/auth/server";

const getHeatMapData = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    const regsession = await getUser();
    const regUserId = regsession?.id;
    
    if(session) {
        if (!userId) {
            return;
        }
    
        const data = await db.select({
            createdAt: quizzSubmissions.createAt,
            count: sql<number>`cast(count(${quizzSubmissions.id}) as int)`
        })
            .from(quizzSubmissions)
            .innerJoin(quizzes, eq(quizzSubmissions.quizzId, quizzes.id))
            .innerJoin(users, eq(quizzes.userId, users.id))
            .groupBy(quizzSubmissions.createAt);
    
        return { data };
    } else if(regsession) {
        if (!regUserId) {
            return;
        }
    
        const data = await db.select({
            createdAt: quizzSubmissions.createAt,
            count: sql<number>`cast(count(${quizzSubmissions.id}) as int)`
        })
            .from(quizzSubmissions)
            .innerJoin(quizzes, eq(quizzSubmissions.quizzId, quizzes.id))
            .innerJoin(users, eq(quizzes.userId, users.id))
            .groupBy(quizzSubmissions.createAt);
    
        return { data };
    }

};

export default getHeatMapData;