import  express  from "express";

import {createTodo,updateTodo,deleteTodo,login,getAllTodos,getTodoById} from "../controller/userController"


const router:express.Router = express.Router();

/*
@usage: To create new user
@url:   http://localhost:3000/user/create
@fields:name,email,password
 */
router.post("/create", createTodo);

/*
@usage: Login existing user
@url:   http://localhost:3000/user/login
@fields:email,password
 */
router.post("/login",login)

/*
@usage: Read all user from database
@url:   http://localhost:3000/user/read
 */
router.get("/read", getAllTodos);

/*
@usage: Read by id
@url:   http://localhost:3000/user/readby/:id
@fields:id
 */
router.get("/readby/:id", getTodoById);

/*
@usage: update the user
@url:   http://localhost:3000/user/update/:id
@fields:id
 */
router.put("/update/:id", updateTodo);

/*
@usage: Login existing user
@url:   http://localhost:3000/user/delete/:id
@fields:id
 */
router.delete("/delete/:id", deleteTodo);

export default router;