import { InjectRepository, Repository } from '@blendedbot/nest-couchdb';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { DictionaryMessage } from 'src/utils/config/dictionary-message.config';
import { UtilsService } from 'src/utils/utils.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admins } from './entities/admins.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admins)
    private readonly adminRepo: Repository<Admins>,
    private readonly dictionaryMessage: DictionaryMessage,
    private readonly utilsService: UtilsService,
  ) {}

  async createAdmin(payload: RegisterAdminDto): Promise<string> {
    // Generate id
    const id = `${new Date().getTime()}-${await this.utilsService.generateId(
      'adm',
    )}`;

    // Insert admin
    const admin = await this.adminRepo.insert({
      ...payload,
      _id: id,
      hospitalId: null,
      status: true,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      refreshToken: null,
    });

    // Check success
    if (!admin.id) {
      throw new InternalServerErrorException(
        this.dictionaryMessage.serverCrash,
      );
    }

    return admin.id;
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

  async findByEmail(email: string): Promise<Admins> {
    const admin = await this.adminRepo.find({
      selector: {
        email,
      },
      limit: 1,
    });

    if (admin.docs.length === 0) {
      throw new UnauthorizedException(
        this.dictionaryMessage.invalidCredentials,
      );
    }

    return admin.docs[0];
  }

  async findById(_id: string): Promise<Admins> {
    const admin = await this.adminRepo.find({
      selector: {
        _id,
      },
      limit: 1,
    });

    if (admin.docs.length === 0) {
      throw new UnauthorizedException(
        this.dictionaryMessage.invalidCredentials,
      );
    }

    return admin.docs[0];
  }

  async update(_id: string, payload: UpdateAdminDto): Promise<void> {
    // Get admin by id
    const admin = await this.findById(_id);
    const updateDate = payload.refreshToken ? {} : { updatedAt: new Date() };

    // Update admin
    const updated = { ...admin, ...updateDate, ...payload };

    // Save admin
    await this.adminRepo.insert(updated);
  }
}
