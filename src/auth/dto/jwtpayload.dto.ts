export class JwtPayloadDto {
  sub: string;
  username: string;
  iat: number;
  exp: number;
  refreshToken?: string;
}
