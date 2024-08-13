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
            studentName: users.name, // Student name from users table
            averageScore: avg(quizzSubmissions.score) // Average score from quizz_submissions table
        })
        .from(quizzes)
        .leftJoin(users, eq(quizzes.userId, users.id))
        .leftJoin(quizzSubmissions, eq(quizzes.id, quizzSubmissions.quizzId))
        .groupBy(quizzes.id, users.name); // Group by quiz ID and student name

    return quizzesWithDetails.map((quiz) => ({
        id: quiz.quizId,
        name: quiz.quizName,           // Quiz name
        userId: quiz.userId,
        studentName: quiz.studentName || 'Unknown',  // Student name
        grade: quiz.averageScore || 'No Score'  // Average score, handle missing data
    }));
};

export default getAllQuizzesWithStudentNamesAndScores;
