import { quizzes } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import Link from "next/link";

export type Quizz = InferSelectModel<typeof quizzes>;

type Props = {
    quizzes: Quizz[]
}

const QuizzesTable = (props: Props) => {
    return (
        <div className="rounded-md overflow-hidden p-5 border">
            {props.quizzes.length === 0 ? (
                <p>No quizzes available</p>
            ) : (
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="text-[#6c7381] text-left px-4 py-2">Name</th>
                            <th className="text-[#6c7381] text-left px-4 py-2">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.quizzes.map((quizz: Quizz) => 
                            <tr key={quizz.id}>
                                <td className="px-4 py-2">
                                    <Link href={`/quizz/${quizz.id}`}>
                                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-semibold hover:bg-gradient-to-l hover:from-red-500 hover:via-pink-500 hover:to-purple-400 transition duration-300 ease-in-out transform hover:scale-105">
                                            {quizz.name}
                                        </p>
                                    </Link>
                                </td>
                                <td className="px-4 py-2">{quizz.description}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )
};

export default QuizzesTable;
