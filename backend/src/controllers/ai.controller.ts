import { Request, Response } from 'express';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../constants';
import { LawyerProfile } from '../models/lawyer.model';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export const searchLawyers = async (req: Request, res: Response) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  try {
    const lawyers = await LawyerProfile.find().populate('userId', 'name email');

    const lawyerSummaries = lawyers.map((l: any) => ({
      id: l._id,
      name: l.userId?.name || 'Unknown',
      speciality: l.speciality,
      specialization: l.specialization,
      experience: l.experience,
      description: l.description,
      fees: l.fees,
      address: l.address?.line1,
    }));

    const systemPrompt = `You are a helpful legal assistant for FindMyLawyer, an Indian legal services platform.
Your job is to recommend the most relevant lawyers from our platform based on the user's legal issue.
Be concise, empathetic, and professional. Format your response clearly with bullet points.
Always mention the lawyer's name, speciality, and why they are suitable.
If no lawyer matches well, say so honestly and suggest the closest option.`;

    const userPrompt = `User's legal issue: "${query}"

Available lawyers on our platform:
${JSON.stringify(lawyerSummaries, null, 2)}

Please recommend the most suitable lawyers for this issue and explain why.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 600,
      temperature: 0.7,
    });

    const recommendation = response.choices[0]?.message?.content || 'No recommendations found.';

    res.status(200).json({ recommendation });
  } catch (error: any) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ message: 'Error communicating with AI', error: error.message || error });
  }
};
