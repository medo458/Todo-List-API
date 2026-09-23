import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entity/todo.entity.js';
import { Repository } from 'typeorm';
import { TodoDto } from './DTO/todo.dto.js';
import { paginationQueryDto } from './DTO/pagination.dto.js';

@Injectable()
export class TodosService {
    constructor(@InjectRepository(TodoEntity) private ToDoRepo: Repository<TodoEntity>) {}

    async newTodo(todo: TodoDto) {
        const todos = await this.ToDoRepo.create(todo);
        return await this.ToDoRepo.save(todos); 
    }

    async updateTodo(id: number, todo: TodoDto) {
        const findtodo = await this.ToDoRepo.findOneBy({ id });
        if(!findtodo)
        {
            throw new NotFoundException;
        }
        findtodo.title = todo.title;
        findtodo.description = todo.description;
        return await this.ToDoRepo.save(findtodo);
    }

    async deleteTodo(id: number) {
        const findtodo = await this.ToDoRepo.findOneBy({ id });
        if(!findtodo)
        {
            throw new NotFoundException;
        }
        const data = await this.ToDoRepo.remove(findtodo);
        return {message: "deleted succesfully", data: data};
    }

    async getTodowithpagination(paginationQuery: paginationQueryDto)
    {
        const [todos, count] = await this.ToDoRepo.findAndCount({
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
