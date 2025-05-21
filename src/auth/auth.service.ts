import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaService) {}

  register(user: CreateUserDto) {
    this.prisma.user.create({ data: user })
  }

  login() {
    throw new NotImplementedException('Login route not implemented');
  }
}
