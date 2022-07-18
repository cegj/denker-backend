import jsonwebtoken from "jsonwebtoken";
import User from "../models/User.mjs";

export default async function getUserByToken(req, res){

  if(!req.headers.authorization){
    res.status(422).json({message: "O token de autenticação não foi informado"})
    return
  }

  const token = req.headers.authorization.split("Bearer ")[1];

  const decoded = jsonwebtoken.decode(token);

  if (!decoded){
    res.status(422).json({message: "O token de autenticação informado é inválido"})
    return
  }

  const user = await User.retrieve({id: decoded.id})

  user.password = undefined;
  
  return user;

}