export interface QuestionAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuestionDetailsAnswer {
  id: string;
  text: string;
}

export interface QuestionDetails {
  id: string;
  text: string;
  examId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;

  exam: {
    id: string;
    title: string;
  };

  answers: QuestionDetailsAnswer[];
}

export interface QuestionDetailsResponse {
  status: boolean;
  code: number;

  payload: {
    question: QuestionDetails;
  };
}

export interface QuestionFormAnswer {
  text: string;
  isCorrect: boolean;
}

export interface QuestionFormValues {
  examId: string;
  text: string;
  answers: QuestionFormAnswer[];
}

export interface Question {
  id: string;
  text: string;
  examId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;

  exam: {
    id: string;
    title: string;
  };

  answers: QuestionAnswer[];
}

export interface QuestionResponse {
  question: Question;
}

export interface BulkQuestionsFormValues {
  examId: string;
  questions: Omit<QuestionFormValues, "examId">[];
}

export interface BulkQuestionsResponse {
  message: string;
  questions: Question[];
  count: number;
}