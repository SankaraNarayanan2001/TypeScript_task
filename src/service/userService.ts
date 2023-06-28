import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Todos } from '../models/userModel';
import AppError from '../utils/appError';


export class TodoService {
  public static async createTodo(name: string,email: string,password: string): Promise<Todos>
   {
    if(!name || !email || !password){
      throw new AppError(404, 'NAME,EMAIL,PASSWORD are required');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const todo = await Todos.create({ name, email, password: hashedPassword });
    return todo;
  }

  public static async login(email: string, password: string): Promise<string> {
    const user = await Todos.findOne({ where: { email } });
    if (!user) {
      throw new AppError(404, 'User email not found');
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if (!isPasswordCorrect) {
      throw new AppError(400, 'Incorrect password');
    }
    const token = jwt.sign({ id: user.id }, 'key');
    return token;
  }


  public static async deleteTodoById(Id:number): Promise<Todos | null> {
    const deletedTodo = await Todos.findByPk(Id);
    if (!deletedTodo) {
      throw new AppError(404, 'User not found');
    }
    await Todos.destroy({ where: { Id } });
    return deletedTodo;
  }


  public static async getAllTodos(): Promise<Todos[]> {
    const allTodos = await Todos.findAll();
    return allTodos;
  }

  public static async getTodoById(todoId: number): Promise<Todos | null> {
    const todo = await Todos.findByPk(todoId);
    if (!todo) {
      throw new AppError(404, 'User not found');
    }
    return todo;
  }

  public static async updateTodo(todoId: number, data: any): Promise<void> {
    await Todos.update(data, { where: { id: todoId } });
  }

 
}
