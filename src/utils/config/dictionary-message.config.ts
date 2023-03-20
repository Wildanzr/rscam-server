import { Injectable } from '@nestjs/common';

@Injectable()
export class DictionaryMessage {
  // Error message
  serverCrash = 'Ups, ada kendala. Silahkan coba lagi nanti.';

  // Duplicate message
  emailAlreadyExists = 'Maaf, email telah terdaftar.';
  usernameAlreadyExists = 'Maaf, username telah digunakan.';

  // Admin message
  successRegisterAdmin = 'Berhasil mendaftarkan admin.';
  successAddDoctor = 'Berhasil menambahkan dokter.';

  // Auth message
  invalidCredentials = 'Username atau password tidak valid';
  successLogin = 'Berhasil login';
  successLogout = 'Berhasil logout';
  successRefreshToken = 'Berhasil mendapatkan token baru';
  invalidToken = 'Otorisasi tidak valid';
}
