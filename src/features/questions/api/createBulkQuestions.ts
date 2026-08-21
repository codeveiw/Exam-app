import { api } from "@/services/api/axios";
import type {
    BulkQuestionsFormValues,
    BulkQuestionsResponse,
} from "../types/question";

export async function createBulkQuestions(
    examId: string,
    values: BulkQuestionsFormValues
): Promise<BulkQuestionsResponse> {
    const response = await api.post<BulkQuestionsResponse>(
        `/questions/exam/${examId}/bulk`,
        values
    );

    return response.data;
}
