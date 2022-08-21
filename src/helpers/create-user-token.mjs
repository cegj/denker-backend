import jasonwebtoken from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

export function createUserToken(user, req, res, message) {

  const secret = process.env.JWT_SECRET;

  //create a token
  const token = jasonwebtoken.sign({
    name: user.name,
    id: user.id
  }, secret)

  //return token
  res.status(200).json({
    message,
    token
  })

}