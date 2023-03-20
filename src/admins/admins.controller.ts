import { Controller, Post, Get, Delete, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminsService } from './admins.service';
import { GetDoctorsDto } from '../doctors/dto/get-doctors.dto';
import { DoctorsService } from 'src/doctors/doctors.service';

@ApiTags('Management for Admin')
@Controller('api/v1/admin/management')
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly doctorService: DoctorsService,
  ) {}

  @Get('doctors')
  async getAllDoctors(@Query() query: GetDoctorsDto) {
    await this.doctorService.getDoctors(query);
    return 'Get all doctors';
  }

  @Post('doctors')
  async addDoctor() {
    return 'Add doctor';
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
