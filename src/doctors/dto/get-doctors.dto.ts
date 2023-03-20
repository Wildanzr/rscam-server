import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/utils/dto/pagination.dto';

export class GetDoctorsDto extends PaginationDto {
  @ApiProperty({ required: false, default: null })
  @IsOptional()
  @IsString()
  hospitalId?: string;
}
