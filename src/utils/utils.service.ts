import { Injectable } from '@nestjs/common';

import { customAlphabet } from 'nanoid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilsService {
  private readonly nanoid = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    10,
  );

  async generateId(prefix?: string): Promise<string> {
    return prefix ? `${prefix}-${this.nanoid()}` : this.nanoid();
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
