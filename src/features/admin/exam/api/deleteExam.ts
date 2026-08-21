import { api } from "@/services/api/axios";

interface DeleteExamResponse {
    message?: string;
    status?: boolean;
    code?: number;
    [key: string]: unknown;
}

export async function deleteExam(
    id: string
): Promise<DeleteExamResponse> {
    const response = await api.delete<DeleteExamResponse>(
        `/exams/${id}`
    );

    return response.data;
}
