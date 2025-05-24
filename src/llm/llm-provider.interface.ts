export interface LLMProvider {
  recommendQuote(quoteSnippets: {id: string, quote_snippet: string}[], input: string): Promise<string[]>;
  transcribeAudio(audioBuffer: Buffer): Promise<string>;
  recommendSentence(userInput: string, quote:string) : Promise<string>;
}
