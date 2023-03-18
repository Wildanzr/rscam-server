import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { AdminsService } from 'src/admins/admins.service';
import { RegisterAdminDto } from 'src/admins/dto/register-admin.dto';
import { DictionaryMessage } from 'src/utils/config/dictionary-message.config';
import { PayloadMessage } from 'src/utils/config/payload-message.config';
import { UtilsService } from 'src/utils/utils.service';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  @Inject(UtilsService)
  private readonly utilsService: UtilsService;
  @Inject(AdminsService)
  private readonly adminService: AdminsService;
  @Inject(PayloadMessage)
  private readonly payloadMessage: PayloadMessage;
  @Inject(DictionaryMessage)
  private readonly dictionaryMessage: DictionaryMessage;

  constructor(private readonly authService: AuthService) {}

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

    return this.payloadMessage.success(
      this.dictionaryMessage.successRegisterAdmin,
      { adminId },
    );
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
