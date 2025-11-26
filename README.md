# Tonsai Elephant Phuket — AI Chatbot

Full-page AI chatbot and embeddable widget to assist guests in exploring and booking elephant experiences at Tonsai Elephant Phuket.

## Tech Stack
- Next.js 14 (App Router), React, TypeScript
- Tailwind CSS
- next-intl (i18n)
- Google Gemini API via `@google/generative-ai`

## Features
- Full-page chatbot with branded UI
- Floating widget popup embeddable on any site
- 3 languages: Thai (th), English (en), Chinese Simplified (zh)
- Responsive design for mobile, tablet, desktop
- Package recommendations with rich cards and deep-links to booking pages

## Getting Started

1. Install deps

   bun install

2. Configure environment

   cp .env.example .env
   # Fill GOOGLE_GEMINI_API_KEY

3. Run locally

   bun run dev

Open http://localhost:3000 and you will be redirected to /th by the i18n middleware. Switch languages with the selector.

## Project Structure
```
app/
  [locale]/
    page.tsx         # full-page chatbot
    layout.tsx       # next-intl provider
    api/chat/route.ts# Gemini API endpoint
  widget/page.tsx    # iframe-based chat (for widget)
components/
  chat/              # chat UI components
  widget/            # optional widget component (for internal use)
lib/
  gemini.ts          # Gemini setup + system prompt
  packages.ts        # package data + site info
messages/            # UI translations
public/
  embed.js           # embeddable widget script
```

## Environment Variables
```
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_SITE_URL=https://tonsai-chatbot.vercel.app
NEXT_PUBLIC_MAIN_SITE_URL=https://tonsaielephantphuket.com
```

## Deploy on Vercel
1. Push this repo to GitHub
2. Import the repo into Vercel
3. Add environment variable `GOOGLE_GEMINI_API_KEY`
4. Deploy

## Widget Embed
Add this to the host site (e.g. tonsaielephantphuket.com):

```html
<script src="https://tonsai-chatbot.vercel.app/embed.js"></script>
<script>
  TonsaiChatbot.init({
    language: 'th',
    theme: 'light',
    position: 'bottom-right'
  });
</script>
```

## Notes
- Promotion code: TONSAIP10 (10% off direct bookings)
- Location: Near Patong Beach, Phuket (5 minutes from Patong)
- Contact: 095-0364454, Infotonsaielephant@gmail.com
- Certifications: SHA Plus, Safe Travels certified

## Acceptance Checklist
- Full page chatbot works and is responsive
- Widget popup opens, minimizes, and shows new message badge
- 3 languages supported
- Gemini answers and recommends packages (UI renders cards based on special block)
- Package info complete with booking links
- Ready for Vercel deploy
