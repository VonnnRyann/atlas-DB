import express from "express";
import cors from "cors";
import logger from "morgan";
import { isAdult, isFam, validKeys } from "./middleware/validation.js";
import {
  sanitizationResp,
  validationResp,
} from "./controllers/userController.js";
import chalk from "chalk";
import {
  sanitizeName,
  sortBands,
  stringToNumbers,
} from "./middleware/sanitization.js";
//this is a lowdb or database-----------------------
import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

//use JSON file for storage
const file = join(__dirname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

//read data from JSON file, this will set db.data content
await db.read();

//if file.json does'nt exist, db.data will be null
//set default data
db.data ||= { records: [] };

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger("dev"));
const port = process.env.PORT || 5000;

app.post("/validateUser", isAdult, validKeys, isFam, validationResp);
app.post(
  "/sanitizerUser",
  sanitizeName,
  stringToNumbers,
  sortBands,
  sanitizationResp
);

//Creating data
app.post("/add", async (req, res, next) => {
  const { records } = db.data;
  records.push({ ...req.body, id: Date.now().toString() });
  await db.write();
  res.status(200).send(records);
});

//Read the data
app.get("/getdata", (req, res, next) => {
  const { records } = db.data;
  res.status(200).send(records);
});

//Update the data
app.put("/update/:id", async (req, res, next) => {
  const { records } = db.data;
  let myId = await records.find((v) => v.id === req.params.id);
  myId.records = req.body.records;
  await db.write();
  res.status(200).json(myId);
});

//Deleting the data
app.delete("/delete/:id", (req, res, next) => {
  const getId = req.body.id;
  db.get("update").remove({ id: getId }).write();
  res.status(200).json(records);
});

//GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      msg: err.message,
    },
  });
});

app.listen(port, () => {
  console.log(chalk.redBright.bold("Listening on port:", port));
});
