import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../dto/user.dto';
import { AuthGuard } from './auth.guard';

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

  @UseGuards(AuthGuard)
  @Get('verify')
  verify(@Request() req) {
    return req.user;
  }
}
