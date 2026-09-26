import express, { json } from "express"
import connectDB from "./db.js";
import router from "./routes/routes.js"


const app = express();
app.use(express.json());


connectDB();

app.use("/notes", router);

app.use(express.static("Public"));




export default app;
