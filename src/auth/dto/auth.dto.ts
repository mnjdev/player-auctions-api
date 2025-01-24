import { UserRole } from "../enum/user-role.enum";

export class LoginDTO {
    username: string;
    password: string;
}

export class UserRegistrationDTO {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    validTill: Date;
    role: UserRole;
}