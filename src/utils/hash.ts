import bcrypt from "bcrypt";

export const hashPassword = async (password: string):Promise<string> => {
  const saltRound = 10;
  return bcrypt.hash(password, saltRound);
};

export const comparePassword = async(password : string , hashedPassword : string):Promise<boolean> => {
    return bcrypt.compare(password,hashedPassword)
}
