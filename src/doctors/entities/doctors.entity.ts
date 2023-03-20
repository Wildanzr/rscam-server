import { CouchDbEntity, Entity } from '@blendedbot/nest-couchdb';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

@Entity('doctors')
export class Doctors extends CouchDbEntity {
  @IsOptional()
  @IsString()
  hospitalId: string | null;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  fullname: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 50)
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  picture: string | null;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

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
