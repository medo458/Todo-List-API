import { Module } from '@nestjs/common';
import { TodosService } from './todos.service.js';
import { TodosController } from './todos.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entity/todo.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [TodosService],
  controllers: [TodosController]
})
export class TodosModule {}
