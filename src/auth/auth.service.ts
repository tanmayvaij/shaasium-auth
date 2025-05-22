import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash, compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  async register(user: UserDto) {
    // hashing password
    const password = await hash(user.password, await genSalt(12));

    // adding user to database
    const createdUser = await this.userService.createUser({
      email: user.email,
      password,
    });

    // sending token object
    return this.generateToken(createdUser.email);
  }

  async login(user: UserDto) {

    // checking if user exists
    const userFromDB = await this.userService.findUser(user.email);

    // sending token object if password matches
    if (await compare(user.password, userFromDB.password))
      return this.generateToken(user.email);

    // throwing error if password mismatches
    throw new UnauthorizedException('Invalid Credentials');
  }

  generateToken(email: string) {
    return { email, token: this.jwt.sign({ email }) };
  }
}
