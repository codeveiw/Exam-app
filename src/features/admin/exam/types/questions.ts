export interface QuestionAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface ExamQuestion {
  id: string;
  text: string;
  examId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  answers: QuestionAnswer[];
  exam: {
    id: string;
    title: string;
  };
}

export interface ExamQuestionsResponse {
  status: boolean;
  code: number;
  payload: {
    questions: ExamQuestion[];
  };
}

export interface GetExamQuestionsParams {
  sortBy?: "title" | "createdAt";
  sortOrder?: "asc" | "desc";
  immutable?: boolean;
  search?: string;
}