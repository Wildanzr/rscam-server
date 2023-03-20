import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AdminsService } from 'src/admins/admins.service';
import { RegisterAdminDto } from 'src/admins/dto/register-admin.dto';
import { DoctorsService } from 'src/doctors/doctors.service';
import { DictionaryMessage } from 'src/utils/config/dictionary-message.config';
import { PayloadMessage } from 'src/utils/config/payload-message.config';
import { AccessTokenGuard } from 'src/utils/guard/access-token.guard';
import { RefreshTokenGuard } from 'src/utils/guard/refresh-token.guard';
import { UtilsService } from 'src/utils/utils.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication and Authorization')
@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly utilsService: UtilsService,
    private readonly adminService: AdminsService,
    private readonly doctorService: DoctorsService,
    private readonly payloadMessage: PayloadMessage,
    private readonly dictionaryMessage: DictionaryMessage,
  ) {}

  @Post('register/for-admin')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: RegisterAdminDto) {
    // Destructure
    const { email, password, ...rest } = body;

    // Make sure email is unique
    await this.adminService.checkEmailIsUnique(email);

    // Hash password
    const hashed = await this.utilsService.hashPassword(password);

    // Create admin
    const adminId = await this.adminService.createAdmin({
      email,
      password: hashed,
      ...rest,
    });

    // Return response
    return this.payloadMessage.success(
      this.dictionaryMessage.successRegisterAdmin,
      { adminId },
    );
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto) {
    // Destructure
    const { username, password } = body;

    // Check if body is username or email
    const isEmail = await this.utilsService.checkEmailOrUsername(username);

    // Find credential
    const { password: hashed, _id = 'empty' } = isEmail
      ? await this.adminService.findByEmail(username)
      : await this.doctorService.findByUsername(username);

    // Check password
    await this.utilsService.comparePassword(password, hashed);

    // Generate token
    const tokens = await this.authService.generateTokens({ _id, username });

    // Save Refresh Token
    await this.adminService.updateAdmin(_id, {
      refreshToken: tokens.refreshToken,
    });

    // Return response
    return this.payloadMessage.success(
      this.dictionaryMessage.successLogin,
      tokens,
    );
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  async logout(@Req() req: Request) {
    // Get request payload
    const { username, sub } = await this.authService.getRequestPayload(
      req.user,
    );

    // Check if body is username or email
    const isEmail = await this.utilsService.checkEmailOrUsername(username);

    // Remove refresh token
    if (isEmail) {
      await this.adminService.updateAdmin(sub, { refreshToken: null });
    } else {
      await this.doctorService.updateDoctor(sub, { refreshToken: null });
    }

    return this.payloadMessage.success(this.dictionaryMessage.successLogout);
  }

  @Get('refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  async refreshToken(@Req() req: Request) {
    // Get request payload
    const token = req.headers.authorization?.replace('Bearer', '').trim();
    const { username, sub: _id } = await this.authService.getRequestPayload(
      req.user,
    );

    // Check if body is username or email
    const isEmail = await this.utilsService.checkEmailOrUsername(username);

    // Find credential
    const { refreshToken } = isEmail
      ? await this.adminService.findByEmail(username)
      : await this.doctorService.findByUsername(username);

    // Check refresh token
    if (refreshToken !== token) {
      throw new UnauthorizedException(this.dictionaryMessage.invalidToken);
    }

    // Generate token
    const tokens = await this.authService.generateTokens({ _id, username });

    // Save Refresh Token
    if (isEmail) {
      await this.adminService.updateAdmin(_id, {
        refreshToken: tokens.refreshToken,
      });
    } else {
      await this.doctorService.updateDoctor(_id, {
        refreshToken: tokens.refreshToken,
      });
    }

    // Return response
    return this.payloadMessage.success(
      this.dictionaryMessage.successRefreshToken,
      tokens,
    );
  }
}
