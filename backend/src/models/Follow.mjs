import { db } from "../db/db.mjs";
import getLastTableRow from "../helpers/get-last-row-table.mjs";

export default class Follow{

  static async create(follow){

    const query = `
    INSERT INTO follows
    (createdAt,
    updatedAt,
    followed_id,
    follower_id)
    VALUES
    (CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    ${follow.followed_id},
    ${follow.follower_id}
    )
    `
  
    try {
      
      db.query(query);
      return await getLastTableRow('users');  
      
    } catch (error) {
      console.log(error)
    }

  }

  static async retrieve(filter){

    let filterQuery = "";
    if(filter){
      const field = Object.keys(filter)[0];
      let value = filter[field];

      if (typeof(value) === "string"){
        value = `'${value}'`
      }

      filterQuery = `WHERE ${field} = ${value}`
    }

    const query = `SELECT * FROM follows ${filterQuery}`

    try {

      const follows = await db.promise().query(query);

      return follows[0];
      
    } catch (error) {
      console.log(error)
    }


  }

  static async delete(){

  }

}