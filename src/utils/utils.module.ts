import { Module } from '@nestjs/common';
import { DictionaryMessage } from './config/dictionary-message.config';
import { PayloadMessage } from './config/payload-message.config';
import { UtilsService } from './utils.service';

@Module({
  providers: [UtilsService, DictionaryMessage, PayloadMessage],
  exports: [UtilsService, DictionaryMessage, PayloadMessage],
})
export class UtilsModule {}
