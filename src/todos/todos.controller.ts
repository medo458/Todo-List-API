import { Req, Controller, Delete, Post, Put, Get, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { TodoDto } from './DTO/todo.dto.js';
import { TodosService } from './todos.service.js';
import { paginationQueryDto } from './DTO/pagination.dto.js';
import type { AuthenticatedRequest } from './DTO/request.dto.js';

@Controller('todos')
export class TodosController {
    constructor(private todoservice: TodosService) {}
    @Post()
    async newTodo(@Body() todo: TodoDto, @Req() req: AuthenticatedRequest) {
        return await this.todoservice.newTodo(todo, req.user.sub);
    }
    @Put(':id')
    async updateTodo(@Param('id', ParseIntPipe) id: number, @Body() todo: TodoDto, @Req() req: AuthenticatedRequest) {
        return await this.todoservice.updateTodo(id, todo, req.user.sub); 
    }
    @Delete(':id')
    async deleteTodo(@Param('id', ParseIntPipe) id: number, @Req() req: AuthenticatedRequest) {
        return await this.todoservice.deleteTodo(id, req.user.sub);
    }
    @Get()
    async getTodos(@Query() paginationQuery: paginationQueryDto, @Req() req: AuthenticatedRequest) {
        return await this.todoservice.getTodowithpagination(paginationQuery, req.user.sub);
    }
}
