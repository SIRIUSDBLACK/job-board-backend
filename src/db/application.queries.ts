import { pool } from "../config/db";
import { JobStatus, uploadApplication } from "../model/application.model";

export const uploadCV = async ({job_id , seeker_id , cv_url}:uploadApplication) => {
    const result = await pool.query(`INSERT INTO applications (job_id  , seeker_id , cv_url) VALUES ($1 , $2 , $3) RETURNING *` ,[job_id , seeker_id , cv_url])
    return result.rows[0]
}


export const getApplicationsBySeekerId = async (seekerId : number) => {
    return await pool.query(`
        SELECT a.application_id, a.job_id ,  j.title AS job_title, a.status, a.applied_date, a.cv_url
        FROM applications a
        JOIN jobs j ON a.job_id = j.id
        WHERE a.seeker_id = $1
        ORDER BY a.applied_date DESC;  
        `
        , [seekerId]);
    
};


export const getApplicationsByJobId = async (jobId : number) => {
    return await pool.query(`
        SELECT a.application_id, a.seeker_id ,  u.name AS seeker_name, a.cv_url, a.status, a.applied_date
        FROM applications a
        JOIN users u ON a.seeker_id = u.id
        WHERE a.job_id = $1;
        ` 
        , [jobId] );
}

export const updateApplicationStatusQ = async (applicationId : number , status : JobStatus) => {
    return await pool.query(`
        UPDATE applications
        SET status = $1
        WHERE application_id = $2
        RETURNING *;
        `
    , [status , applicationId])
}