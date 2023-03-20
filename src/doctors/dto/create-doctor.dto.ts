import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({ required: true })
  @IsString()
  hospitalId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  fullname: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}
