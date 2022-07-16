import User from "../models/User.mjs";
import bcrypt from "bcrypt";
import { createUserToken } from "../helpers/create-user-token.mjs";
import getUserByToken from "../helpers/get-user-by-token.mjs";

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

    const usedEmail = await User.find({email});
    if (usedEmail){
      res.status(422).json({message: "O e-mail já está em uso. Faça login ou escolha outro e-mail."})
      return
    }

    const usedUsername = await User.find({username});
    if (usedUsername){
      res.status(422).json({message: "O nome de usuário já está em uso, escolha outro."})
      return
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      username,
      email,
      password: passwordHash,
      image
    }

    try {

      const createdUser = await User.create(newUser);

      createUserToken(createdUser, req, res);
      
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async login(req, res){

    const {email, password} = req.body;

    const user = await User.find({email});
    if (!user){
      res.status(422).json({message: "O usuário não foi encontrado, verifique o e-mail"});
      return
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches){
      res.status(422).json({message: "As senhas não conferem, tente novamente"});
      return
    }

    createUserToken(user, req, res);
  }

  static async checkUser(req, res){
    const user = await getUserByToken(req, res);

    if(!user){
      res.status(404).json({message: "O usuário não foi encontrado"});
    }
    
    res.status(200).json({user});
  }

  static async getUserById(req, res){
    const id = req.params.id;

    if (!id){
      res.status(422).json({message: "O id do usuário não foi informado"});
      return 
    }

    const user = await User.find({id});

    if (!user){
      res.status(404).json({message: "Id inválido, o usuário não foi encontrado"});
      return 
    }

    user.password = undefined;
    res.status(200).json({user});

  }
}