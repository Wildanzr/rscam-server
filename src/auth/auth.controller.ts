import { Controller, Post, Body } from '@nestjs/common';
import { AdminsService } from 'src/admins/admins.service';
import { RegisterAdminDto } from 'src/admins/dto/register-admin.dto';
import { DoctorsService } from 'src/doctors/doctors.service';
import { DictionaryMessage } from 'src/utils/config/dictionary-message.config';
import { PayloadMessage } from 'src/utils/config/payload-message.config';
import { UtilsService } from 'src/utils/utils.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly utilsService: UtilsService,
    private readonly adminService: AdminsService,
    private readonly doctorService: DoctorsService,
    private readonly payloadMessage: PayloadMessage,
    private readonly dictionaryMessage: DictionaryMessage,
  ) {}

  @Post('register')
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
  async login(@Body() body: LoginDto) {
    // Destructure
    const { username, password } = body;

    // Check if body is username or email
    const isEmail = await this.utilsService.checkEmailOrUsername(username);

    // Find credential
    const { password: hashed, _id } = isEmail
      ? await this.adminService.findByEmail(username)
      : await this.doctorService.findByUsername(username);

    // Check password
    await this.utilsService.comparePassword(password, hashed);

    // Generate token
    const tokens = await this.authService.generateTokens({ _id, username });

    // Return response
    return this.payloadMessage.success(
      this.dictionaryMessage.successLogin,
      tokens,
    );
  }
}
