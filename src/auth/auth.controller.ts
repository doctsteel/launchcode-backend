import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserCredsDto } from './DTO/create-user-creds.dto';
import { LogInUserDTO } from './DTO/log-in-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async registerUser(@Body() newUserInfo: CreateUserCredsDto): Promise<void> {
    return this.authService.createUser(newUserInfo);
  }

  @Post('/login')
  async loginUser(
    @Body() loginInfo: LogInUserDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.logIn(loginInfo);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
