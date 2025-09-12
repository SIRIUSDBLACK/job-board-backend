import { Request, Response } from "express";
import { banUserQ, changeUserRoleQ, deleteUserQ, getStats, getUsers } from "../db/admin.queries";

export const getAllStats = async (req: Request, res: Response) => {
  try {
    const TotalStats = await getStats();
    res.status(200).json({
      message: "all the stats are fetched",
      TotalStats,
    });
  } catch (err) {
    console.log("error fetching stats", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.status(200).json({
      message: "all of the users are fetched successfully",
      users: users.rows,
    });
  } catch (err) {
    console.log("error fetching users", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const banUser = async (req: Request, res: Response) => {
  try {


    const id = Number(req.params.id);
    const {isBanned} = req.body;
  

    await banUserQ(id,isBanned);
    if(isBanned){
      res.status(200).json({
        message : " users's banned successfully " 
    })
    }else{
      res.status(200).json({
        message : " users's unbanned successfully " 
    })
    }

  } catch (err) {
    console.log("error in banning users", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const changeUserRole = async (req: Request, res: Response) => {
  try {

    const id = Number(req.params.id);
    const {role} = req.body;

    await changeUserRoleQ(id,role);
    res.status(200).json({
        message : " users's role is updated successfully " 
    })
  } catch (err) {
    console.log("error in changing user role", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await deleteUserQ(id)
     res.status(200).json({
        message : " users's deleted successfully " 
    })
  } catch (err) {
    console.log("error in deleting user ", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
