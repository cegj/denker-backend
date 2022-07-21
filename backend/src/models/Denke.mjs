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
      
      await db.promise().query(query);
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

      if (Array.isArray(value)){
        const arrayToString = value.toString();
        filterQuery = `WHERE ${field} in (${arrayToString})`
      } else {
        if (typeof(value) === "string"){
          value = `'${value}'`
        }
        filterQuery = `WHERE denkes.${field} = ${value}`
      }
    }

    const query = `SELECT * FROM denkes INNER JOIN users ON denkes.user_id = users.id ${filterQuery}`

    try {

      const denke = await db.promise().query(query);

      return denke[0];
      
    } catch (error) {
      console.log(error)
    }


  }

  static async update(filter, valuesToUpdate){

    const toUpdateData = Object.entries(valuesToUpdate);

    //Create string with values to update
    let updateString = "";
    toUpdateData.forEach((data) => {
      updateString += `${data[0]} = '${data[1]}',`
    })
    updateString = updateString.slice(0, -1); //remove last comma

    //Create string with filter to find denke
    let filterQuery = "";
    if(filter){
      const field = Object.keys(filter)[0];
      let value = filter[field];

      if (typeof(value) === "string"){
        value = `'${value}'`
      }

      filterQuery = `${field} = ${value}`
    }

    const query = `
    UPDATE
    denkes
    SET
    ${updateString},
    updatedAt = CURRENT_TIMESTAMP
    WHERE
    ${filterQuery}
    `

    try {
      
      await db.promise().query(query);
      const updatedDenke = await Denke.retrieve(filter);
      return updatedDenke;

    } catch (error) {
      console.log(error)
    }

  }

  static async delete(filter){
        //Create string with filter to find user
        let filterQuery = "";
        if(filter){
          const field = Object.keys(filter)[0];
          let value = filter[field];
    
          if (typeof(value) === "string"){
            value = `'${value}'`
          }
    
          filterQuery = `${field} = ${value}`
        }
    
        const query = `DELETE FROM denkes WHERE ${filterQuery}`
    
        try {
    
          const deletedDenke = await Denke.retrieve(filter);
          await db.promise().query(query);
          return deletedDenke;
    
        } catch (error) {
          console.log(error)
          return new Error(error);
        }
  }

}