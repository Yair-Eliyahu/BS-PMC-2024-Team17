import { db } from "@/db";
import { eq } from "drizzle-orm";
import { quizzes } from "@/db/schema";
import { auth } from "@/auth";
import QuizzesTable, { Quizz } from "./quizzesTable";
import getUserMetrics from "@/app/actions/getUserMetrics";
import getHeatMapData from "@/app/actions/getHeatMapData";
import MetricCard from "./metricCard";
import SubmissionsHeatMap from "./heatMap";
import SubscribeBtn from "../billing/SubscribeBtn";
import { PRICE_ID } from "@/lib/utils";
import { getUser } from "@/auth/server";


const page = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    const regsession = await getUser();
    const regUserId = regsession?.id;

    if(session) {
        if (!userId) {
            return (<p>User not found</p>)
        };

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
    } else if(regsession) {
        if (!regUserId) {
            return (<p>User not found</p>)
        };

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
    }
}

export default page;