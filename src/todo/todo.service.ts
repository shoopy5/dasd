import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateTodoDto } from './dto/create.dto';
import { Todo } from '../../db/models/todo.model';
import { UpdateTodoDto } from './dto/update.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StatusDto } from './dto/status.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo) private readonly todoModel: typeof Todo) {}

  createElement(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoModel.create(createTodoDto);
  }

  findAll(): Promise<Todo[]> {
    return this.todoModel.findAll({ order: [['id', 'ASC']] });
  }

  findOne(id: string): Promise<Todo> {
    const todoId = Number(id);
    const todo = this.todoModel.findByPk(todoId);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async updateElement(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todoId = Number(id);
    const [numberOfAffectedRows, [updatedTodo]] = await this.todoModel.update(
      updateTodoDto,
      {
        where: { id: todoId },
        returning: true,
      },
    );
    if (!numberOfAffectedRows) {
      throw new BadRequestException('Invalid ID');
    }
    return updatedTodo;
  }

  async deleteElement(id: string): Promise<string> {
    const todoId = Number(id);
    const deletedElement = await this.todoModel.destroy({
      where: { id: todoId },
    });
    if (!deletedElement) {
      throw new NotFoundException('Todo not found');
    }
    return 'ok';
  }

  async deleteCompletedElements(): Promise<string> {
    const result = await this.todoModel.destroy({
      where: { isCompleted: true },
    });
    if (!result) {
      throw new NotFoundException('Todo not found');
    }
    return 'ok';
  }

  async updateAllElements(isComplete: StatusDto): Promise<string> {
    const result = await this.todoModel.update(
      { isCompleted: isComplete.status },
      { where: {} },
    );
    if (!result) {
      throw new NotFoundException('Todo not found');
    }
    return 'OK';
  }
}
