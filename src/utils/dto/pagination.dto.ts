import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

export class PaginationDto {
  @ApiProperty({ required: true, default: 1 })
  @IsNotEmpty()
  @Transform((value) => parseInt(value.value))
  @IsNumber()
  page: number;

  @ApiProperty({
    required: true,
    default: 10,
    minimum: 10,
    maximum: 100,
  })
  @IsNotEmpty()
  @Transform((value) => parseInt(value.value))
  @IsIn([10, 20, 50, 100])
  @IsNumber()
  limit: number;

  @ApiProperty({ required: false, default: null })
  @IsOptional()
  @IsString()
  search?: string;
}
