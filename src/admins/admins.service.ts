import { InjectRepository, Repository } from '@blendedbot/nest-couchdb';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DictionaryMessage } from 'src/utils/config/dictionary-message.config';
import { UtilsService } from 'src/utils/utils.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admins } from './entities/admin.entity';

@Injectable()
export class AdminsService {
  @Inject(DictionaryMessage)
  private readonly dictionaryMessage: DictionaryMessage;
  @Inject(UtilsService)
  private readonly utilsService: UtilsService;

  constructor(
    @InjectRepository(Admins)
    private readonly adminRepo: Repository<Admins>,
  ) {}

  async createAdmin(payload: RegisterAdminDto): Promise<string> {
    const id = `${new Date().getTime()}-${await this.utilsService.generateId(
      'adm',
    )}`;
    const user = await this.adminRepo.insert({
      ...payload,
      _id: id,
      hospitalId: null,
      status: true,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      refreshToken: null,
    });

    if (!user.id) {
      throw new InternalServerErrorException(
        this.dictionaryMessage.serverCrash,
      );
    }

    return user.id;
  }

  async checkEmailIsUnique(email: string): Promise<void> {
    const admin = await this.adminRepo.find({
      selector: {
        email,
      },
      limit: 1,
    });

    if (admin.docs.length !== 0) {
      throw new BadRequestException(this.dictionaryMessage.emailAlreadyExists);
    }
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
