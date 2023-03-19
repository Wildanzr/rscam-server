import {
  IsOptional,
  IsString,
  Length,
  IsEmail,
  IsNumber,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  hospitalId?: string | null;

  @IsOptional()
  @IsString()
  @Length(3, 255)
  fullname?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  @Length(8, 15)
  phone?: string;

  @IsOptional()
  @IsNumber()
  subscription?: number;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date | null;

  @IsOptional()
  @IsDate()
  deletedAt?: Date | null;

  @IsOptional()
  @IsString()
  refreshToken?: string | null;
}
