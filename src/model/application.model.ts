export interface uploadApplication {
    job_id : string,
    seeker_id : string,
    cv_url : string
}

export type JobStatus = 'pending' | 'shortlisted' | 'rejected' ;