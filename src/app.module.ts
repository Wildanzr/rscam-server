import { CouchDbModule } from '@blendedbot/nest-couchdb';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminsModule } from './admins/admins.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from './utils/utils.module';
import { DoctorsModule } from './doctors/doctors.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CouchDbModule.forRoot({
      url: `${process.env.COUCHDB_URL || 'http://localhost:5984'}`,
      username: process.env.COUCHDB_USER || 'admin',
      userpass: process.env.COUCHDB_PASSWORD || 'secret',
      requestDefaults: {
        jar: true,
        forever: true,
      },
      sync: true,
    }),
    AdminsModule,
    AuthModule,
    UtilsModule,
    DoctorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
