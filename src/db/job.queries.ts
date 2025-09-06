import { pool } from "../config/db";
import { NewJobPayload, UpdateJobPayload } from "../model/job.model";

export const createNewJob = async (newJob: NewJobPayload) => {
  const result = await pool.query(
    "INSERT INTO jobs (title, description, salary, location, employer_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [
      newJob.title,
      newJob.description,
      newJob.salary,
      newJob.location,
      newJob.employer_id,
    ]
  );
  return result.rows[0];
};

export const getAllJobs = async () => {
  const result = await pool.query(
    "SELECT * FROM jobs ORDER BY created_at DESC"
  );
  return result;
};

export const updateJob = async ({jobUpdate , id ,employer_id}:UpdateJobPayload) => {
  return await pool.query(
    "UPDATE jobs SET title=$1, description=$2, salary=$3, location=$4 WHERE id=$5 AND employer_id=$6 RETURNING *",
    [
      jobUpdate.title,
      jobUpdate.description,
      jobUpdate.salary,
      jobUpdate.location,
      id,
      employer_id,
    ]
  );
};

export const deleteJob = async (id:number , employer_id:number) => {
    return await pool.query(
      "DELETE FROM jobs WHERE id=$1 AND employer_id=$2 RETURNING *",
      [id, employer_id]
    );
}


export const getOnlyMyJobs = async (id:number) => {
  return await pool.query(
      'SELECT * FROM jobs WHERE employer_id = $1 ORDER BY created_at DESC',
      [id]
    );
}

export const GetJobDetail = async (id:number , employer_id : number) => {
  return await pool.query(
      'SELECT * FROM jobs WHERE id=$1 AND employer_id = $2',
      [id , employer_id]
    );
}



