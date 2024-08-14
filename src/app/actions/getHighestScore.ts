import { db } from "@/db";
import { quizzSubmissions } from "@/db/schema";
import { max } from "drizzle-orm"; // Ensure this is available in your ORM version

const getHighestScore = async () => {
    try {
        // Use max() function if available
        const result = await db
            .select({ value: max(quizzSubmissions.score) })
            .from(quizzSubmissions);

        // Check if result is returned correctly
        if (result.length > 0) {
            return result[0].value || 0;
        }
        return 0; // Default value if no result found
    } catch (error) {
        console.error("Error fetching highest score:", error);
        return 0; // Default value in case of error
    }
};

export default getHighestScore;
