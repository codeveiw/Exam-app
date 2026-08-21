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

export interface ExamsMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ExamsResponse {
  status: boolean;
  code: number;
  payload: {
    data: Exam[];
    metadata: ExamsMetadata;
  };
}


export interface ExamDetailsResponse {
  status: boolean;
  code: number;
  payload: {
    exam: {
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
    };
  };
}

export interface CreateExamResponse {
  payload?: {
    exam: {
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
    };
  };
  exam?: {
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
  };
}




export interface UpdateExamData {
  title: string;
  description: string;
  image: string;
  duration: number;
  diplomaId: string;
}

export interface UpdateExamResponse {
  exam: {
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
  };
}