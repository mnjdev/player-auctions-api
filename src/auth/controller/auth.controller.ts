import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO, UserRegistrationDTO } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('user-registration')
    async createUser(@Body() dto: UserRegistrationDTO) {
        return await this.authService.userRegistration(dto);
    }

    @Post('login')
    async login(@Body() dto: LoginDTO) {
        return await this.authService.login(dto);
    }
}
