import { db } from "../db/db.mjs";
import User from "./User.mjs";
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
      
      const followedUser = User.retrieve({id: follow.followed_id})
      db.query(query);
      return followedUser;  
      
    } catch (error) {
      console.log(error)
    }

  }

  static async retrieve(filter){

    let innerJoinQuery = "";
    let filterQuery = "";
    if(filter){

      //Set up the (WHERE) string
      const field = Object.keys(filter)[0];
      let value = filter[field];

      if (typeof(value) === "string"){
        value = `'${value}'`
      }

      filterQuery = `WHERE ${field} = ${value}`

      //Set up the (INNER JOIN) query

      if (field === 'follower_id'){
        innerJoinQuery += `INNER JOIN users ON follows.followed_id = users.id`
      } else if (field === 'followed_id'){
        innerJoinQuery += `INNER JOIN users ON follows.follower_id = users.id`
      }
    }

    const query = `SELECT * FROM follows ${innerJoinQuery} ${filterQuery}`

    console.log(query)

    try {

      const follows = await db.promise().query(query);

      console.log(follows[0])

      return follows[0];
      
    } catch (error) {
      console.log(error)
    }


  }

  static async delete(follow){

    const query = `DELETE FROM follows WHERE followed_id = ${follow.followed_id} AND follower_id = ${follow.follower_id}`

    try {

      const unfollowedUser = await User.retrieve({id: follow.followed_id});
      await db.promise().query(query);
      return unfollowedUser;

    } catch (error) {
      console.log(error)
    }
  }    
}