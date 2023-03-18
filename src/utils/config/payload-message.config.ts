import { Injectable } from '@nestjs/common';

@Injectable()
export class PayloadMessage {
  success(message: string, data?: any, meta?: any): any {
    if (meta) {
      return {
        meta,
        success: true,
        message,
        data,
      };
    } else if (data) {
      return {
        message,
        success: true,
        data,
      };
    }

    return {
      message,
      success: true,
    };
  }

  fail(message: string, data?: any, meta?: any): any {
    if (meta) {
      return {
        meta,
        success: false,
        message,
        data,
      };
    } else if (data) {
      return {
        message,
        success: false,
        data,
      };
    }

    return {
      message,
      success: false,
    };
  }
}
