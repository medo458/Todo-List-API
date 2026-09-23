import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module.js';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [TodosModule, AuthModule, TypeOrmModule.forRootAsync({
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
  }), ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100
      }])],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'APP_GUARD',
    useClass: ThrottlerGuard
  }],
})
export class AppModule {}
