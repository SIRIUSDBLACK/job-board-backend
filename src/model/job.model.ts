


export interface Job {
  id?: number;
  title: string;
  description: string;
  salary?: number;
  location: string;
  employer_id: number;
  created_at?: Date;
}

export interface NewJobPayload {
  title: string;
  description: string;
  salary?: number;
  location: string;
  employer_id: number;
}

export interface UpdateJobPayload {
  jobUpdate: {
    title: string;
    description: string;
    salary?: number;
    location: string;
  };
  id: number;
  employer_id: number;
}
