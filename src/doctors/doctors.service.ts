import { InjectRepository, Repository } from '@blendedbot/nest-couchdb';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { GetDoctorsDto } from 'src/doctors/dto/get-doctors.dto';
import { DictionaryMessage } from 'src/utils/config/dictionary-message.config';
import { UtilsService } from 'src/utils/utils.service';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctors } from './entities/doctors.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctors)
    private readonly doctorRepo: Repository<Doctors>,

    @Inject(DictionaryMessage)
    private readonly dictionaryMessage: DictionaryMessage,

    @Inject(UtilsService)
    private readonly utilsService: UtilsService,
  ) {}

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

  async updateDoctor(_id: string, payload: UpdateDoctorDto): Promise<void> {
    // Get doctor by id
    const doctor = await this.findById(_id);

    // Update doctor
    const updated = { ...doctor, ...payload, updatedAt: new Date() };

    // Save doctor
    await this.doctorRepo.insert(updated);
  }

  async getDoctors(payload: GetDoctorsDto) {
    // Destructure
    const { limit, page } = payload;

    // Get doctors
    const doctors = await this.doctorRepo.find({
      limit,
      skip: limit * (page - 1),
      selector: {},
    });

    // Get total
    const total = await this.doctorRepo.info();

    console.log(doctors);
    console.log(total);
  }
}
