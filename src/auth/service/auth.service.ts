import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "../entity/auth.entity";
import { Repository } from "typeorm";
import { LoginDTO, UserRegistrationDTO } from "../dto/auth.dto";
import * as bcrypt from "bcrypt";
import { UserRole } from "../enum/user-role.enum";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Auth)
        private readonly authRepo: Repository<Auth>
    ) {}

    async userRegistration(dto: UserRegistrationDTO) {
        try {
            const exisitingUser = await this.authRepo.createQueryBuilder('auth')
                        .where('auth.email = :email', {email: dto.email})
                        .orWhere('auth.phoneNumber = :phoneNumber', {phoneNumber: dto.phoneNumber})
                        .getOne();
            if(!exisitingUser) {
                const user = new Auth();

                user.username = dto.email.split('@')[0]; 
                user.password = await this.hashPassword(dto.password);
                user.email = dto.email;
                user.role = UserRole.ADMIN;
                user.name = dto.name;
                user.phoneNumber = dto.phoneNumber;

                return await this.authRepo.save(user);
            } else {
                throw new Error('User details already exisits');
            }
        } catch(err) {
            console.log('Error occured while creating user', err);
        }
    }

    async login(dto: LoginDTO) {
        try {
            const user = await this.authRepo.createQueryBuilder('auth')
                        .where('auth.username = :username', {username: dto.username})
                        .where('auth.isActive = :isActive', {isActive: true})
                        .where('Date(auth.validTill) >= Date(:date)', {date: new Date()})
                        .getOne();
            if(user && this.comparePassword(dto.password, user.password)) {
                return user;
            } else {
                throw new NotFoundException('User not found');
            }
        } catch(err) {
            console.log('Error occured while logging in the user', err);
        }
    }

    private async hashPassword(password: string): Promise<string> {
        try {
            return await bcrypt.hash(password, 10);
        } catch(err) {
            console.log('Error occured while hashing password', err);
        }
    }

    private async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(password, hashedPassword);
        } catch(err) {
            console.log('Error occured while comparing password', err);
        }
    }
}