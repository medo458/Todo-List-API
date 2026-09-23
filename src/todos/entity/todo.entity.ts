import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../auth/entity/user.entity.js';
import type { Relation } from 'typeorm';
@Entity()
export class TodoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        nullable: false
    })
    title: string;

    @Column({
        type: 'text',
        nullable: false
    })
    description: string;

    @ManyToOne(() => UserEntity, (User) => User.todo, {onDelete : 'CASCADE'})
    @JoinColumn()
    User: Relation<UserEntity>;

}