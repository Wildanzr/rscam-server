import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminsModule } from 'src/admins/admins.module';
import { UtilsModule } from 'src/utils/utils.module';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AdminsModule, DoctorsModule, UtilsModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
