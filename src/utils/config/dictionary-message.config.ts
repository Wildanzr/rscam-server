import { Injectable } from '@nestjs/common';

@Injectable()
export class DictionaryMessage {
  // Error message
  serverCrash = 'Ups, ada kendala. Silahkan coba lagi nanti.';
  emailAlreadyExists = 'Maaf, email sudah terdaftar.';

  // Admin message
  successRegisterAdmin = 'Berhasil mendaftarkan admin.';

  // Auth message
  invalidCredentials = 'Username atau password tidak valid';
  successLogin = 'Berhasil login';
}
