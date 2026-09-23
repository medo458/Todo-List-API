import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module.js';

@Module({
  imports: [TodosModule,AuthModule, TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'admin123',
      database: 'Todo List API',
      autoLoadEntities: true,
      synchronize: true,
    })
  }), TodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
