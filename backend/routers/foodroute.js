import express from "express";
import { addFood,listedfood,removefood } from "../controller/foodcontroller.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const foodrouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // e.g. 1692872222-burger.jpg
  },
});

const upload = multer({ storage: storage }); 
foodrouter.post("/add", upload.single("image"), addFood);
foodrouter.get("/list", listedfood);
foodrouter.post("/remove", removefood);

export default foodrouter;
