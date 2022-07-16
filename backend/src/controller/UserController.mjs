import User from "../models/User.mjs";

export default class UserController{
  static async create(req, res){

    const { name, username, email, password, confirmpassword } = req.body;
    const image = req.file.filename;

    // validate fields 
    
    if (!name){
      res.status(422).json({message: "O nome é obrigatório"})
      return
    }
    if (!username){
      res.status(422).json({message: "O nome de usuário é obrigatório"})
      return
    }
    if (!email){
      res.status(422).json({message: "O email é obrigatório"})
      return
    }
    if (!password){
      res.status(422).json({message: "A senha é obrigatória"})
      return
    }
    if (!confirmpassword){
      res.status(422).json({message: "A confirmação de senha é obrigatória"})
      return
    }
    if (password !== confirmpassword){
      res.status(422).json({message: "A senha e a confirmação de senha devem ser iguais"})
      return
    }

    const user = {
      name,
      username,
      email,
      password,
      image
    }

    const createdUser = await User.create(user);

    createdUser.password = undefined;

    res.status(200).json({message: "Usuário cadastrado com sucesso", createdUser})

  }
}