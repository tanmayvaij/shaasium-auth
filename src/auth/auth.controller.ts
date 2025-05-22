import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body(ValidationPipe) user: UserDto) {
    return this.authService.register(user);
  }

  @Post('login')
  login(@Body(ValidationPipe) user: UserDto) {
    return this.authService.login(user);
  }
}
