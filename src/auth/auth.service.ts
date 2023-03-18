import { Inject, Injectable } from '@nestjs/common';
import { AdminsService } from 'src/admins/admins.service';
import { RegisterAdminDto } from 'src/admins/dto/register-admin.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  @Inject(AdminsService)
  private readonly adminService: AdminsService;

  async registerAdmin(payload: RegisterAdminDto): Promise<string> {
    return this.adminService.createAdmin(payload);
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
