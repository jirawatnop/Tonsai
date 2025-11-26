"use client";
import ChatInterface from '@/components/chat/ChatInterface';
import type {Language} from '@/types';
import {useEffect, useState} from 'react';

export default function WidgetPage(){
  const [lang, setLang] = useState<Language>('th');

  useEffect(()=>{
    const url = new URL(window.location.href);
    const l = (url.searchParams.get('lang') as Language) || 'th';
    setLang(l);
  },[]);

  return (
    <div className="w-full h-screen bg-white">
      <ChatInterface locale={lang} />
    </div>
  );
}
