import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CouchDbModule } from '@blendedbot/nest-couchdb';
import { User } from './entities/user.entity';

@Module({
  imports: [CouchDbModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
