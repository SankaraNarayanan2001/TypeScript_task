import { RequestHandler } from 'express';
import { TodoService } from '../service/userService';

export const createTodo: RequestHandler = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const todos = await TodoService.createTodo({ name, email, password });
    return res.status(200).json({ message: 'User created successfully', data: todos });
  } catch (error) {
    return next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const token = await TodoService.login(email, password);
    return res.status(200).json({ message: 'Your token', data: token });
  } catch (error) {
    return next(error);
  }
};

export const deleteTodo: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedTodo = await TodoService.deleteTodoById(Number(id));
    return res.status(200).json({ message: 'User deleted successfully', data: deletedTodo });
  } catch (error) {
    return next(error);
  }
};

export const getAllTodos: RequestHandler = async (req, res, next) => {
  try {
    const allTodos = await TodoService.getAllTodos();
    return res.status(200).json({ message: 'user fetched successfully', data: allTodos });
  } catch (error) {
    return next(error);
  }
};

export const getTodoById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await TodoService.getTodoById(Number(id));
    return res.status(200).json({ message: 'User fetched successfully', data: todo });
  } catch (error) {
    return next(error);
  }
};

export const updateTodo: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    await TodoService.updateTodo(Number(id), req.body);
    const updatedTodo = await TodoService.getTodoById(Number(id));
    return res.status(200).json({ message: 'User updated successfully', data: updatedTodo });
  } catch (error) {
    return next(error);
  }
};
