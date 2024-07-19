import { db } from "@/db";
import { quizzes, questions as dbQuestions, questionAnswers } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";

type Quizz = InferInsertModel<typeof quizzes>
type Question = InferInsertModel<typeof dbQuestions>
type Answer = InferInsertModel<typeof questionAnswers>

interface SaveQuizzData extends Quizz {
    questions: Array<Question & {answers?: Answer[]}>;
}

export default async function saveQuizz(quizzData: { name: any; description: any; questions: any; }) { // added { name:any... } cuz of redline
    const { name, description, questions } = quizzData;

    const newQuizz = await db
    .insert(quizzes)
    .values({
        name,
        description,
    })
    .returning({ insertedId: quizzes.id });
    const quizzId = newQuizz[0].insertedId;

    await db.transaction(async(tx) => {
        for (const question of questions) {
            const [{questionId}] = await tx
            .insert(dbQuestions)
            .values({
                questionText: question.questionText,
                quizzId
            })
            .returning({questionId: dbQuestions.id });
            
            if(question.answers && question.answers.length > 0) {
                await tx.insert(questionAnswers).values(
                    question.answers.map((answer: { answerText: any; IsCorrect: any; }) => ({
                        answerText: answer.answerText,
                        isCorrect: answer.IsCorrect,
                        questionId
                    }))
                )
            }
        }
    })

    return { quizzId };
}