import { Request, Response } from 'express';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../constants';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// Mock lawyer data for demonstration
const lawyers = [
  { id: 1, name: 'John Doe', specialty: 'Criminal Law', experience: '10 years', description: 'Expert in defense cases.' },
  { id: 2, name: 'Jane Smith', specialty: 'Family Law', experience: '8 years', description: 'Specializes in divorce and child custody.' },
  { id: 3, name: 'Robert Brown', specialty: 'Corporate Law', experience: '15 years', description: 'Focuses on mergers and acquisitions.' },
  { id: 4, name: 'Emily Davis', specialty: 'Intellectual Property', experience: '5 years', description: 'Expert in patents and trademarks.' },
];

export const searchLawyers = async (req: Request, res: Response) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  try {
    const prompt = `Based on the following query: "${query}", find the most relatable lawyers from this list: ${JSON.stringify(lawyers)}. Return a list of lawyer names and why they are relatable.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });


    // const recommendation = response.choices[0].message.content;

    res.status(200).json({ response });
  } catch (error: any) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ message: 'Error communicating with OpenAI', error: error.message || error });
  }
};
