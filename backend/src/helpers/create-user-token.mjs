import jasonwebtoken from "jsonwebtoken";

export function createUserToken(user, req, res) {

  //create a token
  const token = jasonwebtoken.sign({
    name: user.name,
    id: user.id
  }, "secret")

  //return token
  res.status(200).json({
    message: "Você está autenticado",
    token
  })

}