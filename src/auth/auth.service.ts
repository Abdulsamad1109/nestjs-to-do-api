import { Injectable } from '@nestjs/common';
import { CreateSigninDto } from './dto/create-signin.dto';

@Injectable()
export class AuthService {
  create(createAuthDto: CreateSigninDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
