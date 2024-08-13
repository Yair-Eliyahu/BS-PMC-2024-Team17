import { db } from "@/db";
import { eq } from "drizzle-orm";
import { quizzes } from "@/db/schema";
import { auth } from "@/auth";
import QuizzesTable, { Quizz } from "./quizzesTable";
import getUserMetrics from "@/app/actions/getUserMetrics";
import getHeatMapData from "@/app/actions/getHeatMapData";
import MetricCard from "./metricCard";
import SubmissionsHeatMap from "./heatMap";
import { getUser } from "@/auth/server";
import { getUserRole } from "@/app/actions/userSchoolRole";
import getAllQuizzesWithStudentNamesAndScores from "@/app/actions/getAllQuizzesWithStudentName";
import AllQuizzesTable from "./allQuizzesTable";
import SummaryCard from "./SummaryCard";
import PieChart from "./PieChart";
import getTotalStudents from "@/app/actions/getTotalStudents";
import getAverageScore from "@/app/actions/getAverageScore";
import getHighestScore from "@/app/actions/getHighestScore";
import { roundIfNumber } from "@/lib/utils";
import { BadgeInfo } from "lucide-react";


const page = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    const regsession = await getUser();
    const regUserId = regsession?.id;

    const userRole = await getUserRole({ userId, regUserId });

    if(session) {
        if (!userId) {
            return (<p>User not found</p>)
        };
            if (userRole === "Student") {
            const userQuizzes: Quizz[] = await db.query.quizzes.findMany({
                where: eq(quizzes.userId, userId)
            });
            const userData = await getUserMetrics();
            const heatMapData = await getHeatMapData();

            return (
                <div className="mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        { userData && userData?.length > 0 ?
                        <>{
                            userData?.map((metric) => <MetricCard key={metric.label} label={metric.label} value={metric.value} />)
                        }
                        </> : null
                        }
                    </div>
                    <div>
                        {
                            heatMapData ? <SubmissionsHeatMap data={heatMapData.data} /> : null
                        }
                    </div>
                    <QuizzesTable quizzes = {userQuizzes} />
                </div>
            )
        } else if (userRole === "Educator" || userRole === "Manager") {
            // Fetch all quizzes with student names and scores
            const allQuizzesWithDetails = await getAllQuizzesWithStudentNamesAndScores();
            return (
                <div className="mt-20">
                    <h1></h1>
                    <AllQuizzesTable quizzes={allQuizzesWithDetails} />
                </div>
            );
        }
    } else if(regsession) {
        if (!regUserId) {
            return (<p>User not found</p>)
        };
        if (userRole === "Student") {
            const userQuizzes: Quizz[] = await db.query.quizzes.findMany({
                where: eq(quizzes.userId, regUserId)
            });
            const userData = await getUserMetrics();
            const heatMapData = await getHeatMapData();

            return (
                <div className="mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        { userData && userData?.length > 0 ?
                        <>{
                            userData?.map((metric) => <MetricCard key={metric.label} label={metric.label} value={metric.value} />)
                        }
                        </> : null
                        }
                    </div>
                    <div>
                        {
                            heatMapData ? <SubmissionsHeatMap data={heatMapData.data} /> : null
                        }
                    </div>
                    <QuizzesTable quizzes = {userQuizzes} />
                </div>
            )
        } else if (userRole === "Educator" || userRole === "Manager") {
            const allQuizzesWithDetails = await getAllQuizzesWithStudentNamesAndScores();
            const totalStudents = await getTotalStudents();
            const averageScore = await getAverageScore();
            const highestScore = await getHighestScore();
            const pieChartData = {
                labels: ['Total Students', 'Average Score', 'Highest Score'],
                values: [totalStudents, roundIfNumber(averageScore), highestScore],
            };

            return (
                <div className="mt-20">
                    <div className="flex items-center justify-center gap-2">
                        <h1 className="text-4xl mb-6">Students Information</h1>
                        <BadgeInfo className="w-8 h-8 mb-6" />
                    </div>
                    <div className="mb-6">
                        <SummaryCard title="Total Students" value={totalStudents} />
                        <SummaryCard title="Average Score" value={roundIfNumber(averageScore)} />
                        <SummaryCard title="Highest Score" value={highestScore} />
                        <PieChart data={pieChartData} />
                    </div>
                    <AllQuizzesTable quizzes={allQuizzesWithDetails} />
                </div>
            );
        }
    }
}

export default page;




