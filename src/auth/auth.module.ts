import { Module } from "@nestjs/common";
import { AuthController } from "./controller/auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "./entity/auth.entity";
import { AuthService } from "./service/auth.service";

@Module({
    imports:[TypeOrmModule.forFeature([Auth])],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule{}