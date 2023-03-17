import { CouchDbEntity, Entity } from '@blendedbot/nest-couchdb';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsBoolean,
  IsEmail,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

@Entity('users')
export class User extends CouchDbEntity {
  @IsAlpha()
  @Length(3, 255)
  @ApiProperty()
  fullName: string;

  @IsAlpha()
  @Length(3, 50)
  @ApiProperty()
  username: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty({ required: false })
  picture?: string;

  @IsNumber()
  @Min(1)
  @Max(3)
  @ApiProperty()
  role: number;

  @IsBoolean()
  @ApiProperty()
  status: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
