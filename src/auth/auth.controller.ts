// ** NestJs
import { ConfigService } from '@nestjs/config';

// ** Express
import type { Response, Request } from 'express';

// ** Controllers
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

// ** Services
import { AuthService } from './auth.service';

// ** DTO
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

// ** Decorators
import { Public, ResponseMessage, User } from '../decorator/customize';

// ** Guards
import { LocalAuthGuard } from './passport/guards/local-auth.guard';

// ** Interface
import type { IUser } from '../users/users.interface';

// ** Messages
import { AUTH_MESSAGES } from '../configs/messages/auth.message';

// ** ms
import ms from 'ms';

// ** Swagger
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage(AUTH_MESSAGES.LOGIN_SUCCESS)
  @ApiOperation({
    summary: 'Admin login',
  })
  @ApiConsumes('application/json')
  @Post('login')
  async handleLogin(
    @Body() body: LoginDto,
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ) {

    const { accessToken, refresh_token, user } = await this.authService.login(
      req.user,
    );

    // save refresh token in cookie
    response.cookie('TEF_token', refresh_token, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE') as string),
    });

    return { access_token: accessToken, user };
  }

  @Public()
  @Post('register')
  @ResponseMessage(AUTH_MESSAGES.REGISTRATION_SUCCESS)
  @ApiOperation({
    summary: 'Admin register',
  })
  async handleRegister(@Body() registerDto: RegisterDto, @Req() req) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Get('/refresh')
  @ResponseMessage(AUTH_MESSAGES.REFRESH_TOKEN_SUCCESS)
  @ApiOperation({
    summary: 'Refresh access token using refresh token',
  })
  async handleRefreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies['TEF_token'];
    const {
      accessToken,
      refreshToken: newRefreshToken,
      user,
    } = await this.authService.processNewToken(refreshToken);

    response.cookie('TEF_token', newRefreshToken, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE') as string),
    });

    return { access_token: accessToken, user };
  }

  @Post('/logout')
  @ResponseMessage(AUTH_MESSAGES.LOGOUT_SUCCESS)
  @ApiOperation({
    summary: 'Admin logout',
  })
  @ApiBearerAuth('access-token')
  async handleLogout(
    @Res({ passthrough: true }) response: Response,
    @User() user: IUser,
  ) {
    await this.authService.logout(user);
    response.clearCookie('TEF_token');
    return 'ok';
  }
}
