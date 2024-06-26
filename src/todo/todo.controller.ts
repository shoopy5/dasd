import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Put,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateTodoDto } from 'src/todo/dto/create.dto';
import { TodoService } from './todo.service';
import { Todo } from '../../db/models/todo.model';
import { UpdateTodoDto } from './dto/update.dto';
import { StatusDto } from './dto/status.dto';

@Controller()
export class TodoController {
  constructor(private todoService: TodoService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  getAllTodos(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Post()
  createElement(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.createElement(createTodoDto);
  }

  @Get(':id')
  getTodoById(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Delete()
  deleteCompletedTodos(): Promise<string> {
    return this.todoService.deleteCompletedElements();
  }

  @Delete(':id')
  removeTodoById(@Param('id') id: string): Promise<string> {
    return this.todoService.deleteElement(id);
  }

  @Put()
  updateAllTodos(@Body() isComplete: StatusDto): Promise<string> {
    return this.todoService.updateAllElements(isComplete);
  }

  @Put(':id')
  updateTodoById(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.updateElement(id, updateTodoDto);
  }
}
