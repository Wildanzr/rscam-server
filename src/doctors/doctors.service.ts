import { InjectRepository, Repository } from '@blendedbot/nest-couchdb';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { GetDoctorsDto } from 'src/doctors/dto/get-doctors.dto';
import { DictionaryMessage } from 'src/utils/config/dictionary-message.config';
import { UtilsService } from 'src/utils/utils.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctors } from './entities/doctors.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctors)
    private readonly doctorRepo: Repository<Doctors>,
    private readonly dictionaryMessage: DictionaryMessage,
    private readonly utilsService: UtilsService,
  ) {
    this.utilsService.createIndex('doctors', ['fullname', 'username', '_id']);
  }

  async findByUsername(username: string): Promise<Doctors> {
    const doctor = await this.doctorRepo.find({
      selector: {
        username,
      },
      limit: 1,
    });

    if (doctor.docs.length === 0) {
      throw new UnauthorizedException(
        this.dictionaryMessage.invalidCredentials,
      );
    }

    return doctor.docs[0];
  }

  async checkUsernameIsUnique(username: string): Promise<boolean> {
    const doctor = await this.doctorRepo.find({
      selector: {
        username,
      },
      limit: 1,
    });

    if (doctor.docs.length === 0) {
      return true;
    }

    return false;
  }

  async findById(_id: string): Promise<Doctors> {
    const doctor = await this.doctorRepo.find({
      selector: {
        _id,
      },
      limit: 1,
    });

    if (doctor.docs.length === 0) {
      throw new UnauthorizedException(
        this.dictionaryMessage.invalidCredentials,
      );
    }

    return doctor.docs[0];
  }

  async create(payload: CreateDoctorDto): Promise<string> {
    // Generate id
    const id = `${new Date().getTime()}-${await this.utilsService.generateId(
      'adm',
    )}`;

    // Insert doctor
    const doctor = await this.doctorRepo.insert({
      ...payload,
      _id: id,
      isActive: true,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      refreshToken: null,
      picture: this.utilsService.generateRandomUserPicture(payload.username),
    });

    // Check success
    if (!doctor.id) {
      throw new InternalServerErrorException(
        this.dictionaryMessage.serverCrash,
      );
    }

    return doctor.id;
  }

  async update(_id: string, payload: UpdateDoctorDto): Promise<void> {
    // Get doctor by id
    const doctor = await this.findById(_id);

    // Update doctor
    const updated = { ...doctor, ...payload, updatedAt: new Date() };

    // Save doctor
    await this.doctorRepo.insert(updated);
  }

  // Here is trouble
  async getDoctors(payload: GetDoctorsDto): Promise<any> {
    // Destructure
    const { limit, page } = payload;

    // Get doctors
    const doctors = await this.doctorRepo.find({
      limit,
      skip: limit * (page - 1),
      selector: {
        fullname: {
          $regex: `(?i)${payload.search || ''}`,
        },
      },
      fields: ['_id', 'username', 'fullname', 'picture'],
      sort: [{ fullname: 'asc' }],
    });

    // Get total
    const total = await this.doctorRepo.info();

    // Meta data
    const meta = {
      limit,
      page,
      totalData: total.doc_count,
      totalPage: Math.ceil(total.doc_count / limit),
    };

    return {
      doctors,
      meta,
    };
  }
}
