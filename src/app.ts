import express from 'express';
import morgan from 'morgan'
import { json } from "express";
const app = express();
const port = 3000;

app.use(morgan("dev"));

import appRouter from "../interface/app.routes"

app.use(json());
app.use('/',appRouter)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});