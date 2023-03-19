import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { UtilsModule } from 'src/utils/utils.module';
import { CouchDbModule } from '@blendedbot/nest-couchdb';
import { Doctors } from './entities/doctors.entity';

@Module({
  imports: [CouchDbModule.forFeature([Doctors]), UtilsModule],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [DoctorsService],
})
export class DoctorsModule {}
