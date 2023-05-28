import express from "express";
import dotenv from "dotenv";

// Middlewares imports
import { errorHandler } from "./middlewares/error";

// Configs
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.json({ message: "Hello from the server" });
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listenning on PORT : ${PORT}`));
