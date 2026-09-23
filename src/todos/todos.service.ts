import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entity/todo.entity.js';
import { Repository } from 'typeorm';
import { TodoDto } from './DTO/todo.dto.js';
import { paginationQueryDto } from './DTO/pagination.dto.js';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class TodosService {
    constructor(@InjectRepository(TodoEntity) private ToDoRepo: Repository<TodoEntity>) {}

    private async findOwnedTodo(id: number, userId: number) {
        const todo = await this.ToDoRepo.findOne({
            where: { id, User: { id: userId } },
        });
        if (!todo) {
            throw new NotFoundException('Todo not found');
        }
        return todo;
    }

    async newTodo(todo: TodoDto, userId: number) {
        
        const todos = await this.ToDoRepo.create({...todo, User: {id : userId}});
        return await this.ToDoRepo.save(todos); 
    }

    async updateTodo(id: number, todo: TodoDto, userId: number) {
        const findtodo = await this.findOwnedTodo(id, userId);
        findtodo.title = todo.title;
        findtodo.description = todo.description;
        return await this.ToDoRepo.save(findtodo);
    }

    async deleteTodo(id: number, userId: number) {
        const findtodo = await this.findOwnedTodo(id, userId);
        const data = await this.ToDoRepo.remove(findtodo);
        return {message: "deleted succesfully", data: data};
    }

    async getTodowithpagination(paginationQuery: paginationQueryDto, userId: number)
    {
        const [todos, count] = await this.ToDoRepo.findAndCount({
            where: { User: {id : userId}},
            skip: (paginationQuery.page - 1) * paginationQuery.limit,
            take: paginationQuery.limit
        })
        return {
            "data": todos,
            "page": paginationQuery.page,
            "limit": paginationQuery.limit,
            "total": count
        }
    }
}
