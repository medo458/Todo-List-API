import { Body, Controller, Post, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { Public } from './Decorator/public.decorator.js';
import { UserDto } from './DTO/user.dto.js';
import { AuthService } from './auth.service.js';
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Public()
    @Post('register')
    async registerUser(@Body() user: UserDto) {
        return { message: 'User registered successfully', user: await this.authService.createUser(user) };
    }
    
    @Public()
    @Post('login')
    async loginUser(@Body() credentials: { email: string; password: string }) {
        return await this.authService.loginUser(credentials.email, credentials.password);
    }
}
