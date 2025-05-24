// src/quotes/quotes.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { LlmService } from 'src/llm/llm.service';


@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService, private readonly llmService: LlmService) {}

  @Get()
  async getAllQuotes() {
    return await this.quotesService.findAll();
  }

  @Get("/:id")
  async getQuote(@Param() {id}: {id: string}) {
    const quote =  await this.quotesService.findOne(id);
    return quote[0]
  }

  @Post("/recommend")
  async recommendQuote(@Body() {userInput}: {userInput: string}) {
    if (!userInput || typeof userInput !== 'string') {
      throw new Error('Field "userInput" is required and must be a string');
    }
    
    const quotes = await this.quotesService.findAll() as any

    const quoteSnippets = quotes.map((q) => `id: ${q.id}, quote_snippet: "${q.quote_snippet}"`).join("\n")

    const quoteIds = await this.llmService.recommendQuote(quoteSnippets, userInput);
    
    const recommendedQuotes = await this.quotesService.findMatch(quoteIds);
    
    return recommendedQuotes
  }

  @Post("/recommend/sentence")
  async recommendSentence(@Body() {userInput, fullQuote}: {userInput: string, fullQuote:string}) {
    if (!userInput || typeof userInput !== 'string') {
      throw new Error('Field "userInput" is required and must be a string');
    }
    
    const sentence = await this.llmService.recommendSentence(userInput, fullQuote)
    
    return sentence
  }
}