import { CouchDbModule } from '@blendedbot/nest-couchdb';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminsModule } from './admins/admins.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UtilsModule } from './utils/utils.module';

const URL = process.env.COUCHDB_HOST || 'http://localhost';
const PORT = process.env.COUCHDB_PORT || '5984';
const USERNAME = process.env.COUCHDB_USER || 'admin';
const PASSWORD = process.env.COUCHDB_PASSWORD || 'secret';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CouchDbModule.forRoot({
      url: `${URL}:${PORT}`,
      username: USERNAME,
      userpass: PASSWORD,
      requestDefaults: {
        jar: true,
        forever: true,
      },
      sync: true,
    }),
    UsersModule,
    AdminsModule,
    AuthModule,
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
