import Denke from "../models/Denke.mjs";
import Follow from "../models/Follow.mjs";
import getUserByToken from "../helpers/get-user-by-token.mjs";

export default class DenkeController{

  static async create(req, res){

    if(!req.headers.authorization){
      res.status(422).json({message: "O token de autenticação não foi informado"})
      return
    }

    const user = await getUserByToken(req, res);

    if(!user){
      res.status(404).json({message: "O usuário não foi encontrado"});
      return
    }

    const denke = {}

    denke.content = req.body.content;

    if(req.file){
      denke.image = req.file.filename;
    } else {
      denke.image = "NULL";
    }

    denke.user_id = user.id;

    if (req.body.reply_to){
      denke.denke_id = req.body.reply_to;
    } else {
      denke.denke_id = "NULL";
    }

    try {
      
      const createdDenke = await Denke.create(denke);
      res.status(200).json({message: "Denke criado com sucesso", createdDenke})

    } catch (error) {
      res.status(500).json({ message: error, errorOrigin: "DenkeController.create" })
    }
  }

  static async getDenkeById(req, res){

    const id = req.params.id;

    try {
      
      let denke = await Denke.retrieve({id});
      denke = denke[0];

      let replyTo = {}
      if (denke.denke_id){
        replyTo = await Denke.retrieve({id: denke.denke_id})
      }

      const replies = await Denke.retrieve({denke_id: id});

      if (denke){
        res.status(200).json({message: "Denke obtido com sucesso", denke, replies, replyTo})
      } else {
        res.status(422).json({message: "O denke solicitado não foi localizado (id inválido)"})
      }

    } catch (error) {
      res.status(500).json({ message: error, errorOrigin: "DenkeController.getDenke" })
    }
  }

  static async getDenkes(req, res){

    if(!req.headers.authorization){
      res.status(422).json({message: "O token de autenticação não foi informado"})
      return
    }

    const user = await getUserByToken(req, res);

    if(!user){
      res.status(404).json({message: "O usuário não foi encontrado"});
      return
    }

    const followings = await Follow.retrieve({follower_id: user.id});

    let followingUsersIds = []
    followings.forEach((followingUser) => {
      followingUsersIds.push(followingUser.id)
    })

    try {

      const denkes = await Denke.retrieve({user_id: followingUsersIds});
      res.status(200).json({message: `Denkes recuperados com sucesso`, user, denkes});
      
    } catch (error) {
      res.status(500).json({ message: error, errorOrigin: "FollowController.unfollow" })
    }  
  }

  static async edit(req, res){

    let dataToUpdate = {}

    if(!req.headers.authorization){
      res.status(422).json({message: "O token de autenticação não foi informado"})
      return
    }

    const user = await getUserByToken(req, res);

    if(!user){
      res.status(404).json({message: "O usuário não foi encontrado"});
      return
    }

    const id = req.params.id;
    const content = req.body.content;

    let denke = await Denke.retrieve({id});
    denke = denke[0]

    // check if denke exists
    if (!denke){
      res.status(404).json({message: "O Denke não foi localizado"});
      return
    }

    // check if denke belongs to user
    if (user.id !== denke.user_id){
      res.status(401).json({message: "O Denke não pertence ao usuário"});
      return
    }

    // validate fields 
    if (!content){
      res.status(422).json({message: "O conteúdo do Denke não pode ficar vazio"});
      return
    }

    dataToUpdate.content = content;
    
    if(req.file){
      dataToUpdate.image = req.file.filename;
    }

    try {

      const updatedDenke = await Denke.update({id}, dataToUpdate);
      res.status(200).json({message: "Denke editado com sucesso", updatedDenke})
      
    } catch (error) {
      res.status(500).json({ message: error, errorOrigin: "UserController.edit" })
    }

  }

  static async delete(req, res){
    //to implement
  }

}