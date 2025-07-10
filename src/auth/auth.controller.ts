import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor( private authService: AuthService){}



  @UseGuards(LocalAuthGuard)
  @Post('signin')
 async  signin(@Request() req) {
    return this.authService.signin(req.user)
  }


//   @UseGuards(LocalAuthGuard)
//   @Post('signout')
//  async  signout(@Request() req) {
//     return req.logout();
//   }

}
 