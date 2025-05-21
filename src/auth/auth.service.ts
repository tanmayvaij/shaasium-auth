import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(user: CreateUserDto) {
    try {
      const createdUser = await this.prisma.user.create({ data: user });
      return { email: createdUser.email };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError)
        if (err.code === 'P2002')
          throw new ConflictException('User with given email already exists');
        else
          throw new InternalServerErrorException(
            'An unexpected error occurred',
          );
    }
  }

  login() {
    throw new NotImplementedException('Login route not implemented');
  }
}
