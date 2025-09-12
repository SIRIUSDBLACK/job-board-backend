import { Request, Response } from "express";
import { getApplicationsBySeekerId, uploadCV } from "../db/application.queries";
import { uploadToCloudinary } from "../config/cloudinary";
import { AuthenticatedRequest } from "./job.controller";

export const applyCV = async (req : Request, res : Response) => {
    try {
        // Extract data from the request body

        console.log(req.body);
        console.log(req.file);
        const { job_id, seeker_id} = req.body;
        const cv_file = req.file;

        console.log(job_id , seeker_id , cv_file);

        // Basic validation
        if (!job_id || !seeker_id || !cv_file) {
            return res.status(400).json({ message: 'Missing required fields: job_id, seeker_id, or cv_file' });
        }

        //upload to cloudinary
        const cv_url = await uploadToCloudinary(cv_file,seeker_id);

        // Call the service function to insert the application

        const newApplication = await uploadCV({ job_id, seeker_id, cv_url });

        // Send a successful response with the new application data
        console.log(newApplication);
        res.status(201).json({
            message: 'Application submitted successfully!',
            application: {
                id: newApplication.application_id,
                jobId: newApplication.job_id,
                seekerId: newApplication.seeker_id,
                cvPath: newApplication.cv_url,
                createdAt: newApplication.applied_date
            }
        });

    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const getMyApplications = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const seeker_id = req.user.id; // coming from JWT payload
    console.log(seeker_id);

    const result = await getApplicationsBySeekerId(seeker_id);

    if (result.rowCount === 0) {
      console.log("returned the empty array due to no applications yet");
      return res
        .status(200)
        .json({ message: "there is no applications yet", applications : result.rows });
    } else {
      console.log("returned the applications array");
      res.json({
        message: "Successfully fetched all my applications",
        applications : result.rows,
      });
    }
  } catch (err) {
    console.error("Error fetching my applications:", err);
    res.status(500).json({ message: "Server error" });
  }
};