import { Controller, Delete, Post, Put, Get, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { TodoDto } from './DTO/todo.dto.js';
import { TodosService } from './todos.service.js';
import { paginationQueryDto } from './DTO/pagination.dto.js';

@Controller('todos')
export class TodosController {
    constructor(private todoservice: TodosService) {}
    @Post()
    async newTodo(@Body() todo: TodoDto) {
        return await this.todoservice.newTodo(todo);
    }
    @Put(':id')
    async updateTodo(@Param('id', ParseIntPipe) id: number, @Body() todo: TodoDto) {
        return await this.todoservice.updateTodo(id, todo); 
    }
    @Delete(':id')
    async deleteTodo(@Param('id', ParseIntPipe) id: number) {
        return await this.todoservice.deleteTodo(id);
    }
    @Get()
    async getTodos(@Query() paginationQuery: paginationQueryDto) {
        return await this.todoservice.getTodowithpagination(paginationQuery);
    }
}
