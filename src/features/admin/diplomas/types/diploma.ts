export type DiplomaExam = {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  createdAt: string;
  questionsCount: number;
};

export type Diploma = {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  exams: DiplomaExam[];
};

export type GetDiplomaDetailsResponse = {
  status: boolean;
  code: number;
  payload: {
    diploma: Diploma;
  };
};


export interface DiplomaFormValues {
  title: string;
  description: string;
  image: string;
}



export interface DiplomaResponse {
  status: boolean;
  code: number;
  payload: {
    diploma: Diploma;
  };
}



export interface CreateDiplomaResponse {
  diploma: {
    id: string;
    title: string;
    description: string;
    image: string;
    immutable: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CreateDiplomaPayload {
  title: string;
  description: string;
  image: string;
}