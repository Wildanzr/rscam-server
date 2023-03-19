import {
  IsOptional,
  IsString,
  Length,
  IsUrl,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class UpdateDoctorDto {
  @IsOptional()
  @IsString()
  hospitalId?: string | null;

  @IsOptional()
  @IsString()
  @Length(3, 255)
  fullname?: string;

  @IsOptional()
  @IsString()
  @Length(8, 50)
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  picture?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

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
