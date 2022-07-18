import jsonwebtoken from "jsonwebtoken";
import User from "../models/User.mjs";

export default async function getUserByToken(req, res){

  const token = req.headers.authorization.split("Bearer ")[1];

  const decoded = jsonwebtoken.decode(token);

  if (!decoded){
    return false
  }

  const user = await User.retrieve({id: decoded.id})

  user.password = undefined;
  
  return user;

}