// ** NestJs
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// ** Services
import { UsersService } from '../users/users.service';

// ** Interface
import { IUser } from '../users/users.interface';

// ** ms
import ms from 'ms';

// ** DTO
import { RegisterDto } from './dto/register.dto';

import { AUTH_MESSAGES } from '../configs/messages/auth.message';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(user: IUser) {
    const { _id, name, role, email } = user;

    await this.usersService.ensureNotDeleted(_id);

    const payload = {
      sub: 'token login',
      iss: 'from server',
      _id,
      name,
      email,
      role,
    };

    const refresh_token = await this.createRefreshToken(payload);

    // update refresh token in db
    await this.usersService.updateUserToken(refresh_token, _id);

    return {
      accessToken: this.jwtService.sign(payload),
      refresh_token,
      user: { _id, name, email, role },
    };
  }

  async register(user: RegisterDto) {
    const newUser = await this.usersService.register(user);
    return {
      _id: newUser._id,
      createdAt: newUser?.createdAt,
    };
  }

  logout(user: IUser) {
    return this.usersService.updateUserToken('', user._id);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (isValid === true) return user;
    }
    return null;
  }

  async createRefreshToken(payload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
      expiresIn:
        ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE') as string) / 1000,
    });
  }

  async processNewToken(refreshToken: string) {
    if (!refreshToken) {
      throw new BadRequestException(AUTH_MESSAGES.REFRESH_TOKEN_MISSING);
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
      });

      const user = await this.usersService.findUserByToken(refreshToken);
      if (!user)
        throw new UnauthorizedException(AUTH_MESSAGES.REFRESH_TOKEN_FAILED);

      const { _id, name, email, role } = user;
      const payload = {
        sub: 'token refresh',
        iss: 'from server',
        _id,
        name,
        email,
        role,
      };

      const newRefreshToken = await this.createRefreshToken(payload);
      const newAccessToken = this.jwtService.sign(payload);

      // update refresh token in db
      await this.usersService.updateUserToken(newRefreshToken, _id.toString());

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: { _id, name, email, role },
      };
    } catch (error) {
      throw new UnauthorizedException(AUTH_MESSAGES.REFRESH_TOKEN_FAILED);
    }
  }
}
