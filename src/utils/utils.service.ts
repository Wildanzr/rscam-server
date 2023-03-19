import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { customAlphabet } from 'nanoid';
import * as bcrypt from 'bcrypt';
import { DictionaryMessage } from './config/dictionary-message.config';

@Injectable()
export class UtilsService {
  private readonly nanoid = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    10,
  );

  constructor(
    @Inject(DictionaryMessage)
    private readonly dictionaryMessage: DictionaryMessage,
  ) {}

  async generateId(prefix?: string): Promise<string> {
    return prefix ? `${prefix}-${this.nanoid()}` : this.nanoid();
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<void> {
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      throw new UnauthorizedException(
        this.dictionaryMessage.invalidCredentials,
      );
    }
  }

  async checkEmailOrUsername(username: string): Promise<boolean> {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(username);
  }
}
