import { pool } from "../config/db";
import { uploadApplication } from "../model/application.model";

export const uploadCV = async ({job_id , seeker_id , cv_url}:uploadApplication) => {
    const result = await pool.query(`INSERT INTO applications (job_id  , seeker_id , cv_url) VALUES ($1 , $2 , $3) RETURNING *` ,[job_id , seeker_id , cv_url])
    return result.rows[0]
}


export const getApplicationsBySeekerId = async (seekerId : number) => {
    return await pool.query(`
        SELECT * FROM applications
        WHERE seeker_id = $1
    `, [seekerId]);
    
};