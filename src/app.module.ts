import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { QuotesModule } from './quotes/quotes.module';
import { LlmModule } from './llm/llm.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, QuotesModule, LlmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
