import { Module } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { DatabaseModule } from 'src/database/database.module';
import { LlmModule } from 'src/llm/llm.module';

@Module({
  imports: [DatabaseModule, LlmModule],
  controllers: [QuotesController],
  providers: [QuotesService],
  exports: [QuotesService]
})
export class QuotesModule {}
