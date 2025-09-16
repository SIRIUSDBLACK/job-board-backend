import { Request, Response } from "express";
import {
  createNewJob,
  deleteJob,
  GetJobDetail,
  getOnlyMyJobs,
  updateJob,
} from "../db/job.queries";
import { pool } from "../config/db";
// You can create a custom Request type to ensure type safety
// For example: interface CustomRequest extends Request { user: { id: number; role: string; }; }
// Assuming you have done this with Declaration Merging, you can now access req.user
// in a type-safe way without casting to 'any'.

// Add this interface at the top of your controller file

// Define the shape of your token's payload
interface TokenPayload {
  id: number;
  role: string;
}

// Extend the Express Request type
export interface AuthenticatedRequest extends Request {
  user: TokenPayload;
}

// SEEKER


// Get all jobs  

export const getJobs = async (req: Request, res: Response) => {
  try {
    const { title, location, salaryMin, salaryMax, page = 1, limit = 10 } = req.query;

    const offset = (Number(page) - 1) * Number(limit);

    // Build dynamic conditions
    const conditions: string[] = [];
    const values: any[] = [];

    if (title) {
      values.push(`%${title}%`);
      conditions.push(`LOWER(title) LIKE LOWER($${values.length})`);
    }

    if (location) {
      values.push(`%${location}%`);
      conditions.push(`LOWER(location) LIKE LOWER($${values.length})`);
    }

    if (salaryMin) {
      values.push(Number(salaryMin));
      conditions.push(`salary >= $${values.length}`);
    }

    if (salaryMax) {
      values.push(Number(salaryMax));
      conditions.push(`salary <= $${values.length}`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // Count total
    const countQuery = `SELECT COUNT(*) FROM jobs ${whereClause}`;
    const countResult = await pool.query(countQuery, values);
    const total = parseInt(countResult.rows[0].count, 10);

    // Fetch data
    const jobQuery = `
      SELECT j.*, u.email as employer_email
      FROM jobs j
      JOIN users u ON j.employer_id = u.id
      ${whereClause}
      ORDER BY j.created_at DESC
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}
    `;
    const jobResult = await pool.query(jobQuery, [...values, limit, offset]);
    res.json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      jobs: jobResult.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching jobs" });
  }
};


//get a job by id

export const GetAJob = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const jobId = Number(id);
    const employer_id = req.user!.id;

    const result = await GetJobDetail(jobId, employer_id);

    if (result.rowCount === 0) {
      // If no rows were updated, the job was not found or didn't belong to the user
      return res
        .status(404)
        .json({ message: "Job not found or not authorized" });
    } else {
      res.json({
        message: "Successfully fetched job detail",
        job: result.rows[0],
      });
    }
  } catch (err) {
    console.error("Error fetching job detail:", err);
    res.status(500).json({ message: "Server error" });
  }
};





//EMPLOYER

// Create a new job
export const createJob = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, salary, location } = req.body;
    const employer_id = req.user!.id; // Correct, type-safe way to get the ID

    // Create a job object for cleaner code
    const newJob = { title, description, salary, location, employer_id };

    const result = await createNewJob(newJob);

    res.status(201).json({
      message: "Job created successfully",
      job: result,
    });
  } catch (err) {
    console.error("Error creating job:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// Update an existing job
export const updateExistingJob = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { title, description, salary, location } = req.body;
    const employer_id = req.user!.id;

    const jobUpdate = { title, description, salary, location };

    const result = await updateJob({ jobUpdate, id: Number(id), employer_id });

    if (result.rowCount === 0) {
      // If no rows were updated, the job was not found or didn't belong to the user
      return res
        .status(404)
        .json({ message: "Job not found or not authorized" });
    }

    res.json({
      message: "Job updated successfully",
      job: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating job:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a job
export const deleteExistingJob = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const jobId = Number(id);
    const employer_id = req.user!.id;

    const result = await deleteJob(jobId, employer_id);

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Job not found or not authorized" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//get the jobs releated to the employer himself
export const getMyJobs = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const employer_id = req.user.id; // coming from JWT payload

    const result = await getOnlyMyJobs(employer_id);

    if (result.rowCount === 0) {
      // If no rows were updated, the job was not found or didn't belong to the user

      return res
        .status(200)
        .json({ message: "there is no jobs yet", jobs: result.rows });
    } else {
      res.json({
        message: "Successfully fetched all my jobs",
        jobs: result.rows,
      });
    }
  } catch (err) {
    console.error("Error fetching my jobs:", err);
    res.status(500).json({ message: "Server error" });
  }
};


