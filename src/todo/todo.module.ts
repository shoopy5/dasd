import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Todo } from '../../db/models/todo.model';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [SequelizeModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
