import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GenerateTokenDto {
  @IsOptional()
  @IsString()
  _id: string | undefined;

  @IsNotEmpty()
  @IsString()
  username: string;
}
