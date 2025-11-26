"use client";
import ChatInterface from '@/components/chat/ChatInterface';
import LanguageSelector from '@/components/LanguageSelector';
import {useTranslations} from 'next-intl';
import type {Language} from '@/types';

export default function Page({params}:{params:{locale: Language}}){
  const t = useTranslations();
  const {locale} = params;
  return (
    <main className="min-h-screen bg-[url('https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=1400&auto=format&fit=crop')] bg-cover bg-center">
      <div className="bg-white/80">
        <header className="max-w-5xl mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tonsai-gradientFrom to-tonsai-gradientTo" />
            <div className="font-semibold">Tonsai Elephant Phuket</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-tonsai-text hidden sm:block">{t('header.promo')}</div>
            <LanguageSelector current={locale} />
          </div>
        </header>
      </div>
      <div className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-tonsai-gradientFrom/10 to-tonsai-gradientTo/10 flex items-center justify-center px-4 py-6">
        <ChatInterface locale={locale} />
      </div>
    </main>
  );
}
