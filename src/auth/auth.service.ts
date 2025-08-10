import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor( 
  private userService: UserService,
  private jwtService: JwtService
  ){}

  async validateUser(email: string, password: string) {

    // checks if the email exists in the DB
    const user = await this.userService.findOneByEmail(email)

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    
    throw new UnauthorizedException('Invalid credentials');
      
  }

  async signin(user: any) {
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    return { access_token: this.jwtService.sign(payload) };
  }

}
