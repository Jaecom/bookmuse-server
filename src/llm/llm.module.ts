import { Module } from '@nestjs/common';
import { LlmService } from './llm.service';
import { OpenAiLlmService } from './openai.service';
import { QuotesModule } from 'src/quotes/quotes.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [],
  providers: [LlmService, {
    provide: "LLM_Provider",
    useClass: OpenAiLlmService
  }],
  exports: [LlmService]
})
export class LlmModule {}
