import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { CouchDbModule } from '@blendedbot/nest-couchdb';
import { Admins } from './entities/admins.entity';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [CouchDbModule.forFeature([Admins]), UtilsModule],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
