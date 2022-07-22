import { db } from "../db/db.mjs";
import Denke from "./Denke.mjs";

export default class Like {

  static async create(like){

    const query = `INSERT INTO
    likes
    (user_id,
    denke_id,
    createdAt,
    updatedAt)
    VALUES
    (${like.user_id},
    ${like.denke_id},
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP)`
    
    try {
      
      const likedDenke = await Like.retrieve(like);
      await db.promise().query(query);
      return likedDenke;

    } catch (error) {
      console.log(error);
      return new Error(error);    
    }
  }

  static async retrieve(like){

    let filterQuery = "";
    if (like.denke_id && like.user_id){
      filterQuery = `WHERE likes.denke_id = ${like.denke_id} AND likes.user_id = ${like.user_id}`
    } else if (like.denke_id) {
      filterQuery = `WHERE likes.denke_id = ${like.denke_id}`
    } else if (like.user_id){
      filterQuery = `WHERE likes.user_id = ${like.user_id}`
    }

    const query = `
    SELECT
    denkes.id AS denke_id,
    denkes.content AS denke_content,
    denkes.image AS denke_image,
    denkes.createdAt AS denke_createdAt,
    denkes.updatedAt AS denke_updatedAt,
    users.id AS user_id,
    users.name AS user_name,
    users.username AS user_username,
    users.email AS user_email,
    users.image AS user_image,
    users.createdAt AS user_createdAt,
    users.updatedAt AS user_updatedAt
    FROM
    likes
    INNER JOIN
    users
    ON likes.user_id = users.id
    INNER JOIN
    denkes
    ON likes.denke_id = denkes.id
    ${filterQuery}
    `

    try {
      
      const like = await db.promise().query(query);
      return like[0];
      
    } catch (error) {
      console.log(error);
      return new Error(error);
    }
  }

  static async delete(like){

    const query = `
    DELETE FROM
    likes
    WHERE
    user_id = ${like.user_id} AND denke_id = ${like.denke_id}
    `

    try {
      
      const unlikedDenke = await Denke.retrieve({id: like.denke_id});
      await db.promise().query(query);
      return unlikedDenke;

    } catch (error) {
      console.log(error);
      return new Error(error);
    }
  }
}