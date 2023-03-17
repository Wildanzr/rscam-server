import { CouchDbModule } from '@blendedbot/nest-couchdb';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

const URL = process.env.COUCHDB_HOST || 'http://localhost';
const PORT = process.env.COUCHDB_PORT || '5984';
const USERNAME = process.env.COUCHDB_USER || 'admin';
const PASSWORD = process.env.COUCHDB_PASSWORD || 'secret';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    CouchDbModule.forRoot({
      url: `${URL}:${PORT}`,
      username: USERNAME,
      userpass: PASSWORD,
      requestDefaults: { jar: true },
      sync: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
