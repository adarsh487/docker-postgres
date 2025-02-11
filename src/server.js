import express from "express";
import "./db.js";
import appRoutes from "./routes.js";
import morgan from "morgan";
import fetch from "node-fetch";
import { openSearch } from "./lib/helpers.js";
const app = express();
const PORT = 3009;
global.fetch = fetch;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(`${process.env.NODE_ENV}`);
app.get("/", (req, res) => {
  res.send("Hello, Docker!");
});
app.use(morgan(':method :url :status :response-time ms'))

app.use("/api/v1", appRoutes);
app.use('*',(req , res)=>{
  res.status(404).json({status:false,message:'Not found'})
})
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// openSearch()
