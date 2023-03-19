import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  getAuthorization(payload: any): any {
    return { ...payload };
  }

  validate(req: Request, payload: any) {
    const refreshToken =
      req.headers.authorization?.replace('Bearer', '').trim() ?? '';
    return { ...payload, refreshToken };
  }
}
