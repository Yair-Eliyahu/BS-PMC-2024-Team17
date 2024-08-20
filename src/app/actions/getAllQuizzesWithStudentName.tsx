import { db } from "@/db";
import { eq, avg } from "drizzle-orm";
import { quizzes, users, quizzSubmissions } from "@/db/schema";

// Function to get all quizzes with student names and average scores
const getAllQuizzesWithStudentNamesAndScores = async () => {
    // Fetch quizzes with student names and average scores
    const quizzesWithDetails = await db
        .select({
            quizId: quizzes.id,
            quizName: quizzes.name,
            userId: quizzes.userId,
            studentEmail: users.email, // Student name from users table
            averageScore: avg(quizzSubmissions.score) // Average score from quizz_submissions table
        })
        .from(quizzes)
        .leftJoin(users, eq(quizzes.userId, users.id))
        .leftJoin(quizzSubmissions, eq(quizzes.id, quizzSubmissions.quizzId))
        .groupBy(quizzes.id, users.email); // Group by quiz ID and student name

    return quizzesWithDetails.map((quiz) => ({
        id: quiz.quizId,
        name: quiz.quizName,         
        userId: quiz.userId,
        studentEmail: quiz.studentEmail || 'No Email',
        grade: quiz.averageScore || 'No Score'
    }));
};

export default getAllQuizzesWithStudentNamesAndScores;
