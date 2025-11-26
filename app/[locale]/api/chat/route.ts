import { NextRequest, NextResponse } from 'next/server';
import { generateChatResponse } from '@/lib/gemini';
import type { Language } from '@/types';

export async function POST(request: NextRequest) {
  const { messages, language } = await request.json();
  try {
    const response = await generateChatResponse(messages, language as Language);
    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Gemini error', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
