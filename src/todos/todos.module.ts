import { Module } from '@nestjs/common';
import { TodosService } from './todos.service.js';
import { TodosController } from './todos.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entity/todo.entity.js';
import { AuthModule } from '../auth/auth.module.js';
import { UserEntity } from '../auth/entity/user.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [TodosService],
  controllers: [TodosController],
})
export class TodosModule {}
