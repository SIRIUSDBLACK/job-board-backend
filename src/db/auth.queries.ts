import { pool as db } from "../config/db";
import { RegisterPayload } from "../model/users.model";

export const createUser = async ({
  name,
  email,
  hashedPassword,
  role,
}: RegisterPayload) => {
  const user =  await db.query(
    "INSERT INTO users (name , email , password , role) VALUES ($1 , $2 , $3 , $4) RETURNING id , name , email , role",
    [name, email, hashedPassword, role]
  );
  console.log(user);
  return user.rows[0]
};

export const findByEmail = async (email:string) => {
    const user = await db.query("SELECT id , name , email , password , role , created_at , is_banned FROM users WHERE email = $1" , [email])
    console.log(user);
    return user.rows[0];
}

export const findById = async (id:number) => {
    const user = await db.query("SELECT id , name , email , role , created_at FROM users WHERE id = $1" , [id])
    return user.rows[0];
}