import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../enum/user-role.enum";

@Entity('auth')
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    username: string;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    password: string;

    @CreateDateColumn()
    createdOn: Date;

    @Column({type: "date", nullable: true, default: null})
    validTill: string;

    @Column({nullable: false})
    role: UserRole;

    @Column({default: true})
    isActive: boolean;

    @Column({nullable: false})
    email: string;

    @Column({nullable: false})
    phoneNumber: string;

    @Column({default: false})
    approvedByAdmin: boolean;
}