import { Entity } from '@blendedbot/nest-couchdb';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

@Entity('admins')
export class Admins {
  @IsOptional()
  @IsString()
  hospitalId: string | null;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  fullname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  phone: string;

  @IsNotEmpty()
  @IsNumber()
  subscription: number;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date | null;

  @IsOptional()
  @IsDate()
  deletedAt: Date | null;

  @IsOptional()
  @IsString()
  refreshToken: string | null;
}
