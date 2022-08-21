import jasonwebtoken from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

export function createUserToken(user, req, res, message) {

  //create a token
  const token = jasonwebtoken.sign({
    name: user.name,
    id: user.id
  }, process.env.JTW_SECRET)

  //return token
  res.status(200).json({
    message,
    token
  })

}