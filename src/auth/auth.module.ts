import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminsModule } from 'src/admins/admins.module';
import { UtilsModule } from 'src/utils/utils.module';
import { DoctorsModule } from 'src/doctors/doctors.module';

@Module({
  imports: [AdminsModule, DoctorsModule, UtilsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
