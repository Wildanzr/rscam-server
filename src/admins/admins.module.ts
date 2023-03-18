import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { CouchDbModule } from '@blendedbot/nest-couchdb';
import { Admins } from './entities/admin.entity';

@Module({
  imports: [CouchDbModule.forFeature([Admins])],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
