import { db } from "@/db";
import { questions, quizzes } from "@/db/schema";
import { eq } from 'drizzle-orm';
import QuizzQuestions from "../QuizzQuestions";

const page = async ({ params }: {
    params: {
        quizzId: string
    }
}) => {
    const quizzId = params.quizzId;
    const quizz = await db.query.quizzes.findFirst({
        where: eq(quizzes.id, parseInt(quizzId)),
        with: {
            questions: {
                with: {
                    answers: true
                }
            }
        }
    })

    if(!quizzId || !quizz) {
        return <div>Quizz not found</div>
    }
    return (
        <QuizzQuestions quizz={quizz} />
    )
}

export default page;