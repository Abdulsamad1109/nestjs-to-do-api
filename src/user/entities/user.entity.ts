import { Roles } from "src/auth/roles.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column( {type: "enum", enum: Roles, array: true, default: [Roles.USER]} )
    roles: Roles[]
}

