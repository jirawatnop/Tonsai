import { GoogleGenerativeAI } from '@google/generative-ai';
import { packages, siteInfo } from './packages';
import type { Language } from '@/types';

const apiKey = process.env.GOOGLE_GEMINI_API_KEY as string;
if (!apiKey) {
  console.warn('GOOGLE_GEMINI_API_KEY is not set');
}
const genAI = new GoogleGenerativeAI(apiKey || '');

export async function generateChatResponse(
  messages: { role: string; content: string }[],
  language: Language
) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const systemPrompt = getSystemPrompt(language);
  const fullPrompt = `${systemPrompt}\n\n${formatMessages(messages)}`;

  const result = await model.generateContent(fullPrompt);
  const response = await result.response;
  return response.text();
}

function getSystemPrompt(lang: Language) {
  const pkgData = packages.map(p => ({
    id: p.id,
    name: p.name[lang],
    duration: p.duration,
    price: p.price,
    activities: p.activities,
    times: p.times || null,
    bookingUrl: p.bookingUrl
  }));

  const guidelines = {
    language: lang,
    objectives: [
      'Answer questions about elephant experiences and packages',
      'Recommend the best package based on budget, time, people, interests',
      'Provide location, opening times (if applicable), booking methods',
      'Include current promotion code when helpful',
      'Always reply in the user-selected language',
      'If recommending, also output a structured block for the UI to render cards'
    ],
    promotion: {
      code: siteInfo.promoCode,
      description: lang === 'th' ? 'รหัสส่วนลด 10% เมื่อจองผ่านเว็บโดยตรง' : lang === 'en' ? '10% off when booking directly on the website' : '官网直接预订立减 10%'
    },
    contact: {
      phone: siteInfo.phone,
      email: siteInfo.email,
      location: siteInfo.location[lang]
    },
    formatting: {
      recommendationBlock: {
        description: 'When you recommend packages, include a block like <packages>[{"id":"banana-me","reason":"short time and friendly for kids"}]</packages> below your natural-language answer.'
      },
      comparison: {
        description: 'For comparisons, you may list pros/cons in a simple table-like text. The UI may parse the packages block to render cards.'
      }
    }
  };

  return [
    'You are a helpful, friendly AI travel assistant for Tonsai Elephant Phuket.',
    `Use this data (JSON): ${JSON.stringify({ packages: pkgData, guidelines }, null, 2)}`,
    'Rules:',
    '- Always answer in the selected language.',
    '- Ask clarifying questions about budget, time available, adults/children, and interests before recommending, unless user is explicit.',
    '- When recommending, provide 1-3 best matches, include reasons, and append a <packages> JSON block with package ids and reasons.',
    '- If user asks for promotion, mention the promo code and conditions.',
    '- If the question is unrelated, politely guide back to elephant experiences and offer to contact admin if needed.',
    `- Contact info: phone ${siteInfo.phone}, email ${siteInfo.email}.`,
    `- Certifications: ${siteInfo.certifications.join(', ')}.`
  ].join('\n');
}

function formatMessages(messages: { role: string; content: string }[]) {
  return messages
    .map(m => `${m.role.toUpperCase()}: ${m.content}`)
    .join('\n');
}
