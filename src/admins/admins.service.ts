import { InjectRepository, Repository } from '@blendedbot/nest-couchdb';
import { Injectable } from '@nestjs/common';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admins } from './entities/admin.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admins)
    private readonly adminRepo: Repository<Admins>,
  ) {}

  test(): string {
    return 'here';
  }

  async createAdmin(payload: RegisterAdminDto): Promise<string> {
    const user = await this.adminRepo.insert({
      ...payload,
      hospitalId: null,
      status: true,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      refreshToken: null,
    });

    return user.id;
  }

  findAll() {
    return `This action returns all admins`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    console.log('updateAdminDto', updateAdminDto);
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
