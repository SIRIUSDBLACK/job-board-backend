import { pool } from "../config/db";
import { UserRole } from "../model/users.model";

export const getStats = async () => {
  const totalUsersResult = await pool.query("SELECT COUNT(*) FROM users");
  const totalJobsResult = await pool.query("SELECT COUNT(*) FROM jobs");
  const totalApplicationsResult = await pool.query(
    "SELECT COUNT(*) FROM applications"
  );

  const jobsPerEmployerResult = await pool.query(`
      SELECT u.name AS employer_name, COUNT(j.id) AS total_jobs
      FROM users u
      LEFT JOIN jobs j ON j.employer_id = u.id
      WHERE u.role = 'employer'
      GROUP BY u.id, u.name
      ORDER BY total_jobs DESC
    `);

  // applications per job
  const applicationsPerJobResult = await pool.query(`
      SELECT j.title AS job_title, COUNT(a.application_id) AS total_applications
      FROM jobs j
      LEFT JOIN applications a ON a.job_id = j.id
      GROUP BY j.id, j.title
      ORDER BY total_applications DESC
    `);

  return {
    totalUsers: totalUsersResult.rows[0].count,
    totalJobs: totalJobsResult.rows[0].count,
    totalApplications: totalApplicationsResult.rows[0].count,
    jobsPerEmployer: jobsPerEmployerResult.rows,
    applicationsPerJob: applicationsPerJobResult.rows,
  };
};

export const getUsers = async () => {
  return await pool.query(
    "SELECT id , email , name , role , is_banned FROM users ORDER BY id DESC"
  );
};

export const changeUserRoleQ = async (id: number, role: UserRole) => {
  return await pool.query("UPDATE users SET role=$1 WHERE id=$2", [role, id]);
};

export const banUserQ = async (id: number, isBanned: boolean) => {
  return await pool.query("UPDATE users SET is_banned=$1 WHERE id=$2", [
    isBanned,
    id,
  ]);
};

export const deleteUserQ = async (id: number) => {
  return await pool.query("DELETE FROM users WHERE id=$1", [id]);
};
