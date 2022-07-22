import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default function deleteImgFile(imgName, lastFolder){

  const imgPath = path.resolve(__dirname, '..', '..', 'public', 'imgs', lastFolder, imgName);

  try {
    fs.unlinkSync(imgPath)
    return
  } catch(err) {
    console.error(err)
  }
}



