import { Sequelize } from "sequelize-typescript";
import { Todos } from "../models/userModel";

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "root123",
  database: "typescript",
  logging: false,
  models: [Todos],
});

export default connection;