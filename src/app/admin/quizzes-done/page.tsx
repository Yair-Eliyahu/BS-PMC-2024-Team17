import AllQuizzesTable from "../../(user)/dashboard/allQuizzesTable";
import getAllQuizzesWithStudentNamesAndScores from "../../actions/getAllQuizzesWithStudentName";

const QuizzesDonePage = async () => {
    const allQuizzesWithDetails = await getAllQuizzesWithStudentNamesAndScores();

    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Completed Quizzes Information
            </h1>
            <div className="w-full max-w-2xl">
                <AllQuizzesTable quizzes={allQuizzesWithDetails} />
            </div>
        </div>
    );
};

export default QuizzesDonePage;
