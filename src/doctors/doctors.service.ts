import { InjectRepository, Repository } from '@blendedbot/nest-couchdb';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { DictionaryMessage } from 'src/utils/config/dictionary-message.config';
import { UtilsService } from 'src/utils/utils.service';
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
}
