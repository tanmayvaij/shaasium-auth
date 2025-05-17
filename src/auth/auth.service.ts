import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  register() {
    throw new NotImplementedException('Register route not implemented');
  }

  login() {
    throw new NotImplementedException('Login route not implemented');
  }
}
