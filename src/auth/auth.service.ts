import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateSigninDto } from './dto/create-signin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor( 
  @InjectRepository(User) 
  private userRepository: Repository<User>,
  private jwtService: JwtService
  ){}

  async create(authDto: CreateSigninDto) {

    const {email, password} = authDto
    // checks if the email exists in the DB
    const user = await this.userRepository.findOneBy({email})
    if(!user) throw new UnauthorizedException('invalid credentials')

    // verify password before signing JWT
    const isPassword = await bcrypt.compare(password, user.password)
    if(!isPassword) throw new UnauthorizedException('invalid credentials')
      
    const payload = {email: user.email, sub: user.id, roles: user.roles}
    return { accessToken: this.jwtService.sign(payload) }
 
  }

}
