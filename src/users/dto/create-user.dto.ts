import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  Min,
  Max,
  Length,
  IsNotEmpty,
  IsAlphanumeric,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(3, 255)
  @ApiProperty()
  fullname: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(3, 50)
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @Length(8, 50)
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(3)
  @ApiProperty()
  role: number;
}
