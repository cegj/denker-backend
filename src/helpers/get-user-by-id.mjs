import User from "../models/User.mjs";

export default async function getUserById(id){

  const user = await User.retrieve({id});

  return user[0];

}