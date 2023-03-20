import { Injectable } from '@nestjs/common';

@Injectable()
export class PayloadMessage {
  success(message: string, data?: any, meta?: any): any {
    if (meta) {
      return {
        message,
        meta,
        data,
      };
    } else if (data) {
      return {
        message,
        data,
      };
    }

    return {
      message,
    };
  }

  fail(message: string, data?: any, meta?: any): any {
    if (meta) {
      return {
        message,
        meta,
        data,
      };
    } else if (data) {
      return {
        message,
        data,
      };
    }

    return {
      message,
    };
  }
}
