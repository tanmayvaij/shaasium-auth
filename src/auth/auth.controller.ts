import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../dto/user.dto';
import { AuthGuard } from './auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: 'Registers a new user' })
  @ApiCreatedResponse({
    description: 'User created successfully',
    schema: {
      example: {
        email: 'johndoe@example.com',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhbm1heXZhaWpAZ21haWwuY29tIiwiaWF0IjoxNzQ3OTIyMjM4LCJleHAiOjE3NDgwMDg2Mzh9.pcLpEdwUrvhdjDHEuXCs0a4UcIqg-0N57Rr3-1BlEow',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid Body',
    schema: {
      example: {
        message: [
          'email must be an email',
          'password must be longer than or equal to 8 characters',
          'password must be a string',
        ],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiConflictResponse({
    description: 'Conflict, email already exists',
    schema: {
      example: {
        statusCode: 409,
        message: 'User with given email already exists',
        error: 'Conflict',
      },
    },
  })
  @Post('register')
  register(@Body(ValidationPipe) user: User) {
    return this.authService.register(user);
  }

  @ApiOperation({ description: 'User login route' })
  @ApiOkResponse({
    description: 'User logged in successfully',
    schema: {
      example: {
        email: 'johndoe@example.com',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhbm1heXZhaWpAZ21haWwuY29tIiwiaWF0IjoxNzQ3OTIyMjM4LCJleHAiOjE3NDgwMDg2Mzh9.pcLpEdwUrvhdjDHEuXCs0a4UcIqg-0N57Rr3-1BlEow',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid Body',
    schema: {
      example: {
        message: [
          'email must be an email',
          'password must be longer than or equal to 8 characters',
          'password must be a string',
        ],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid Credentials',
    schema: {
      example: {
        message: 'Invalid Credentials',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      example: {
        message: 'User not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @HttpCode(200)
  @Post('login')
  login(@Body(ValidationPipe) user: User) {
    return this.authService.login(user);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Token not provided / Invalid token',
    schema: {
      example: {
        message: 'Token not provided / Invalid token',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @UseGuards(AuthGuard)
  @Get('verify')
  verify(@Request() req) {
    return req.user;
  }
}
