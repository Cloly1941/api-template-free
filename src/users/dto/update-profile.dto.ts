// ** Class Validator
import {
  IsDateString,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

// ** Swagger
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'thỏ con xinh xắn' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'I am a cute bunny' })
  @IsOptional()
  @IsString()
  password?: string;
}
