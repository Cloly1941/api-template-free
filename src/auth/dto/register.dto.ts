// ** Class validator
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// ** Swagger
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'thỏ con xinh xắn',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'thocon@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123456',
    minLength: 6,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}