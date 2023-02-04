import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserCredsDto } from './DTO/create-user-creds.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { LogInUserDTO } from './DTO/log-in-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async createUser(data: CreateUserCredsDto): Promise<void> {
    const { username, password, role } = data;

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);

    const secureData = {
      username,
      password: hashedPass,
      role,
    };
    try {
      await this.prisma.user.create({ data: secureData });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2002') {
          throw new ConflictException('username already exists!');
        }
      }
      throw error;
    }
  }

  async logIn(userInfo: LogInUserDTO): Promise<{ accessToken: string }> {
    const { username, password } = userInfo;
    const user = await this.prisma.user.findFirst({
      where: { username: username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('wrong user or password.');
    }
  }
}
