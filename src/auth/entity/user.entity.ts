import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TodoEntity } from "../../todos/entity/todo.entity.js";
import type { Relation } from "typeorm";
@Entity()
export class UserEntity {
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    @Exclude()
    password: string;

    @OneToMany(() => TodoEntity, (todo) => todo.User)
    todo: Relation<TodoEntity[]>
}