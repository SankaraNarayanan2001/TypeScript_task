import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Todos } from '../models/userModel';
import AppError from '../utils/appError';

interface UserPayload {
  id: number;
}

export class TodoService {
  public static async createTodo({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<Todos> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const todo = await Todos.create({ name, email, password: hashedPassword });
    return todo;
  }

  public static async findUserByEmail(email: string): Promise<Todos | null> {
    const user = await Todos.findOne({ where: { email } });
    return user;
  }

  public static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  public static generateToken(userId: number): string {
    const token = jwt.sign({ id: userId }, 'key');
    return token;
  }

  public static async deleteTodoById(todoId: number): Promise<Todos | null> {
    const deletedTodo = await Todos.findByPk(todoId);
    if (!deletedTodo) {
        throw new AppError(404, 'User not found');
      }
    await Todos.destroy({ where: { id: todoId } });
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

  public static async login(email: string, password: string): Promise<string> {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new AppError(404, 'User email not found');
    }
    const isPasswordCorrect = await this.comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      throw new AppError(400, 'Incorrect password');
    }
    const token = this.generateToken(user.id);
    return token;
  }
}
