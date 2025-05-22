import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { User } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: User): Promise<User> {
    try {
      return await this.prisma.user.create({ data: user });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError)
        if (err.code === 'P2002')
          throw new ConflictException('User with given email already exists');
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async findUser(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
