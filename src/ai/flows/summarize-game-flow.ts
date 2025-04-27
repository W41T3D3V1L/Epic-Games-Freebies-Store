
'use server';
/**
 * @fileOverview Provides an AI flow to summarize game descriptions.
 *
 * - summarizeGame - Function to generate a concise summary of a game's description.
 * - SummarizeGameInput - Input type for the summarizeGame function.
 * - SummarizeGameOutput - Output type (string summary) for the summarizeGame function.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit'; // Use genkit's z for schema definition

// Define the input schema for the flow
const SummarizeGameInputSchema = z.object({
  gameDescription: z.string().describe('The full description of the video game.'),
});
export type SummarizeGameInput = z.infer<typeof SummarizeGameInputSchema>;

// Define the output schema for the flow (just a string for the summary)
const SummarizeGameOutputSchema = z.string().describe('A concise summary of the game description.');
export type SummarizeGameOutput = z.infer<typeof SummarizeGameOutputSchema>;

// Exported wrapper function to call the flow
export async function summarizeGame(input: SummarizeGameInput): Promise<SummarizeGameOutput> {
  return summarizeGameFlow(input);
}

// Define the Genkit prompt
const prompt = ai.definePrompt(
  {
    name: 'summarizeGamePrompt',
    input: {
      schema: SummarizeGameInputSchema,
    },
    output: {
      // Request plain text output
      format: 'text',
    },
    prompt: `You are an expert game reviewer. Please provide a concise, engaging, one-paragraph summary (maximum 3 sentences) of the following game description. Focus on the core gameplay loop and unique selling points.

Game Description:
{{{gameDescription}}}

Summary:`,
  },
);

// Define the Genkit flow
const summarizeGameFlow = ai.defineFlow<
  typeof SummarizeGameInputSchema,
  typeof SummarizeGameOutputSchema // Output is just a string
>(
  {
    name: 'summarizeGameFlow',
    inputSchema: SummarizeGameInputSchema,
    outputSchema: SummarizeGameOutputSchema, // Expecting a string back
  },
  async (input) => {
    const llmResponse = await prompt(input);

    // Return the generated text directly
    return llmResponse.text();
  }
);
