import { Role } from "src/auth/roles.enum";
import { Todo } from "src/todo/entities/todo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column( {type: "enum", enum: Role, array: true, default: [Role.USER]} )
    roles: Role[]

    @OneToMany(() => Todo, (todo) => todo.user)
    todos: Todo[];
}

