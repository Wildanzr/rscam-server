import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Query,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminsService } from './admins.service';
import { GetDoctorsDto } from '../doctors/dto/get-doctors.dto';
import { CreateDoctorDto } from '../doctors/dto/create-doctor.dto';
import { DoctorsService } from 'src/doctors/doctors.service';
import { DictionaryMessage } from 'src/utils/config/dictionary-message.config';
import { UtilsService } from 'src/utils/utils.service';
import { PayloadMessage } from 'src/utils/config/payload-message.config';

@ApiTags('Management for Admin')
@Controller('api/v1/admin/management')
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly doctorService: DoctorsService,
    private readonly dictionaryMessage: DictionaryMessage,
    private readonly utilService: UtilsService,
    private readonly payloadMessage: PayloadMessage,
  ) {}

  @Get('doctors')
  async getAllDoctors(@Query() query: GetDoctorsDto) {
    await this.doctorService.getDoctors(query);
    return 'Get all doctors';
  }

  @Post('doctors')
  async addDoctor(@Body() body: CreateDoctorDto) {
    // Destructure
    const { username, password, ...rest } = body;

    // Check username is unique
    if (!(await this.doctorService.checkUsernameIsUnique(username))) {
      throw new BadRequestException(
        this.dictionaryMessage.usernameAlreadyExists,
      );
    }

    // Hash password
    const hashed = await this.utilService.hashPassword(password);

    // Add doctor
    const doctorId = await this.doctorService.create({
      username,
      password: hashed,
      ...rest,
    });

    // Return response
    return this.payloadMessage.success(
      this.dictionaryMessage.successAddDoctor,
      { doctorId },
    );
  }

  @Put('doctors')
  async editDoctor() {
    return 'Edit doctor';
  }

  @Delete('doctors')
  async deleteDoctor() {
    return 'Delete doctor';
  }
}
