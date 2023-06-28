import { Request,Response,NextFunction} from 'express';
import { TodoService } from '../service/userService';
import AppError from '../utils/appError';


export const createTodo = async (req:Request, res:Response, next:NextFunction) => {
  const { name, email, password }:{name:string,email:string,password:string} = req.body;
  try {
    const todos = await TodoService.createTodo( name, email, password );
    return res.status(200).json({ message: 'User created successfully', data: todos });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req:Request, res:Response, next:NextFunction) => {
  const email:string = req.body.email;
  const password:string = req.body.password;
  try {
    const token = await TodoService.login(email, password);
    return res.status(200).json({ message: 'Your token', data: token });
  } catch (error) {
    return next(error);
  }
};

export const deleteTodo = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const  {id} = req.params;
    const deletedTodo = await TodoService.deleteTodoById(Number(id));
    return res.status(200).json({ message: 'User deleted successfully', data: deletedTodo?.id });
  } catch (error) {
    return next(error);
  }
};

export const getAllTodos = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const userId = req.id;
    if (userId !== 1) {
      throw new AppError(403, 'Access Denied');
    }
    const allTodos = await TodoService.getAllTodos();
    return res.status(200).json({ message: 'user fetched successfully', data: allTodos });
  } catch (error) {
    return next(error);
  }
};



export const getTodoById = async (req:Request, res:Response, next:NextFunction)  => {
  const  id  = req.id;
  try {
    const todo = await TodoService.getTodoById(Number(id));
    return res.status(200).json({ message: 'User fetched successfully', data: todo });
  } catch (error) {
    return next(error);
  }
};

export const updateTodo = async (req:Request, res:Response, next:NextFunction) => {
  const { id } = req.params;
  try {
    await TodoService.updateTodo(Number(id), req.body);
    const updatedTodo = await TodoService.getTodoById(Number(id));
    return res.status(200).json({ message: 'User updated successfully', data: updatedTodo });
  } catch (error) {
    return next(error);
  }
};
