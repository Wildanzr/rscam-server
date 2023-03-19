import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AdminsService } from 'src/admins/admins.service';
import { RegisterAdminDto } from 'src/admins/dto/register-admin.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { DictionaryMessage } from 'src/utils/config/dictionary-message.config';
import { TokensDto } from './dto/tokens.dto';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokenDto } from './dto/generate-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminsService,
    private readonly jwtService: JwtService,
    private readonly dictionaryMessage: DictionaryMessage,
  ) {}

  async generateTokens(payload: GenerateTokenDto): Promise<TokensDto> {
    const { _id, username } = payload;
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: _id,
          username,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET || 'secret',
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: _id,
          username,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET || 'secret',
          expiresIn: '7d',
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async registerAdmin(payload: RegisterAdminDto): Promise<string> {
    const id = await this.adminService.createAdmin(payload);

    if (!id) {
      throw new InternalServerErrorException(
        this.dictionaryMessage.serverCrash,
      );
    }

    return id;
  }

  create(createAuthDto: CreateAuthDto) {
    console.log('createAuthDto', createAuthDto);
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    console.log('updateAuthDto', updateAuthDto);
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
