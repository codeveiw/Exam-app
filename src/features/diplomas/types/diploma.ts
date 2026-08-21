export interface Diploma {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DiplomaMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetDiplomasResponse {
  status: boolean;
  code: number;
  payload: {
    data: Diploma[];
    metadata: DiplomaMetadata;
  };
}
export interface ExamDiploma {
  id: string;
  title: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  questionsCount: number;
  diplomaId: string;
  diploma: ExamDiploma;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExamsMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetExamsResponse {
  status: boolean;
  code: number;
  payload: {
    data: Exam[];
    metadata: ExamsMetadata;
  };
}
export interface Exam {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  questionsCount: number;
  diplomaId: string;
  diploma: {
    id: string;
    title: string;
  };
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface GetExamResponse {
  status: boolean;
  code: number;
  payload: {
    exam: Exam;
  };
}


export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  examId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  answers: Answer[];
  exam: {
    id: string;
    title: string;
  };
}

export interface GetQuestionsResponse {
  status: boolean;
  code: number;
  payload: {
    questions: Question[];
  };
}



export interface SubmissionAnswer {
  questionId: string;
  answerId: string;
}

export interface SubmitExamPayload {
  examId: string;
  answers: SubmissionAnswer[];
  startedAt: string;
}


export interface Submission {
  id: string;
  userId: string;
  examId: string;
  examTitle: string;

  exam: {
    id: string;
    title: string;
    duration: number;
  };

  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;

  startedAt: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}


export interface SubmissionAnalytics {
  questionId: string;
  questionText: string;

  selectedAnswer: {
    id?: string;
    text?: string;
  };

  isCorrect: boolean;

  correctAnswer: {
    id?: string;
    text?: string;
  };
}


export interface SubmitExamResponse {
  status: boolean;
  code: number;

  payload: {
    submission: Submission;
    analytics: SubmissionAnalytics[];
  };
}