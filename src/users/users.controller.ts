// ** NestJs
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';

// ** Services
import { UsersService } from './users.service';

// ** DTO
import { UpdateProfileDto } from './dto/update-profile.dto';

// ** Decorator
import { ResponseMessage, User } from '../decorator/customize';

// ** Guard
import { RolesGuard } from '../guards/roles.guard';

// ** Interface
import type { IUser } from './users.interface';

// ** Messages
import { USERS_MESSAGES } from '../configs/messages/user.message';

// ** Swagger
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@ApiBearerAuth('access-token')
@UseGuards(RolesGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ResponseMessage(USERS_MESSAGES.GET_PROFILE_SUCCESS)
  @ApiOperation({
    summary: 'Thông tin cá nhân',
  })
  findProfile(@User() user: IUser) {
    return this.usersService.findProfile(user);
  }

  @Patch('profile')
  @ResponseMessage(USERS_MESSAGES.UPDATE_PROFILE_SUCCESS)
  @ApiOperation({
    summary: 'Cập nhật thông tin cá nhân',
  })
  updateProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @User() user: IUser,
  ) {
    return this.usersService.updateProfile(updateProfileDto, user);
  }
}
