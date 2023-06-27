import express from "express";
import todoRoutes from "./routes/userRoutes";
import connection from "./config/db";
import errorController from "./controller/errorController";

const app = express();

app.use(express.json());

let port:number=3000;

let hostName:string="localhost";

app.use("/user", todoRoutes);
app.use(errorController)

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);


connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });
app.listen(port,hostName, () => {
  console.log(`server is running in http://${hostName}:${port}`);
});