import { Inject, Injectable } from '@nestjs/common';
import { LLMProvider } from './llm-provider.interface';
import { DatabaseService } from 'src/database/database.service';
import { QuotesService } from 'src/quotes/quotes.service';

@Injectable()
export class LlmService {
  constructor(@Inject("LLM_Provider") private readonly provider: LLMProvider) {}
  
  transcribeAudio(audio: Buffer): Promise<string> {
    return this.provider.transcribeAudio(audio);
  }

  recommendQuote(list: any, input: string): Promise<string[]> {  
    return this.provider.recommendQuote(list, input);
  }

  recommendSentence(user_input: any, quote: string): Promise<string> {  
    return this.provider.recommendSentence(user_input, quote);
  }
}
