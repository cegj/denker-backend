import { db } from "../db/db.mjs";
import getLastTableRow from "../helpers/get-last-row-table.mjs";

export default class Denke{

  static async create(denke){

    const query = `
    INSERT INTO denkes
    (content,
    image,
    createdAt,
    updatedAt,
    user_id,
    denke_id)
    VALUES
    ('${denke.content}',
    '${denke.image}',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    ${denke.user_id},
    ${denke.denke_id})
    `
  
    try {
      
      db.query(query);
      return await getLastTableRow('denkes');
      
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

    const query = `SELECT * FROM denkes ${filterQuery}`

    try {

      const denke = await db.promise().query(query);

      return denke[0];
      
    } catch (error) {
      console.log(error)
    }


  }

}