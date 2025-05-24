import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { LLMProvider } from './llm-provider.interface';

@Injectable()
export class OpenAiLlmService implements LLMProvider {
   private readonly client;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env['OPEN_API_KEY'], // This is the default and can be omitted
    });
  }

  async transcribeAudio(audioBuffer: Buffer): Promise<string> {
     const transcription = await this.client.createTranscription(
        audioBuffer,
        'whisper-1',
      );

      return transcription.data.text;
  }

  async recommendQuote(quoteSnippets: {id: string, quote_snippet: string}[], input: string): Promise<string[]> {

    const systemPrompt = `
You are an empathetic quote recommender whose purpose is to uplift, comfort, or emotionally support the user based on their current state of mind.

You are given a list of quote snippets, each with a unique ID. Based on the user's emotional input (e.g., feelings of loneliness, confusion, heartbreak, anxiety, or hope), choose the two most emotionally resonant quotes that may help them feel understood, seen, or gently encouraged.

Here is a list of quote snippets:

${quoteSnippets}

Return ONLY an array of 2 or more IDs (e.g., ["asdfh-sadgasdc-df", "asdfh-sadgasdasdsad-sd"]). No explanation, no formatting.
		`
    const data = await this.client.responses.create({
        model: 'gpt-3.5-turbo',
        input: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: input,
          },
        ],
      });
		const idArray = JSON.parse(data.output_text || "[]") as string[]

		return idArray
  }

  async recommendSentence(userInput, quote) {

      const systemPrompt = `
You are a compassionate assistant that helps users reflect on their emotional state through meaningful quotes.

You will be given a full quote and a description of the user's emotional situation. Your task is to:
- Analyze the quote carefully.
- Select **only the sentence(s)** from the quote that best resonate with the user's feelings.
- Return **exactly one or two full sentences** from the quote, without paraphrasing or adding commentary.

Quote:
"""
${quote}
"""

Only return the selected sentence(s) from the quote. No explanations, no additional words. No corrections in spelling. Just give me the raw text sentence without editing anything.
`;
    const data = await this.client.responses.create({
        model: 'gpt-3.5-turbo',
        input: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userInput,
          },
        ],
      });
    return data.output_text
  } 
}
