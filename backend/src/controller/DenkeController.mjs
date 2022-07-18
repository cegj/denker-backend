import Denke from "../models/Denke.mjs";
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

}