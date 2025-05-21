import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body(ValidationPipe) createUser: CreateUserDto) {
    return this.authService.register(createUser);
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
