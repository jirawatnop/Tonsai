"use client";
import {useEffect, useMemo, useState} from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import PackageCard from './PackageCard';
import type {ChatMessage, Language, Package} from '@/types';
import {packages as pkgData} from '@/lib/packages';
import {useTranslations} from 'next-intl';

function uuid(){ return Math.random().toString(36).slice(2); }

function extractPackagesFromText(text: string): {items: {id:string; reason?:string}[]} {
  const m = text.match(/<packages>([\s\S]*?)<\/packages>/);
  if (!m) return {items: []};
  try {
    const arr = JSON.parse(m[1]);
    if (Array.isArray(arr)) return {items: arr};
  } catch {}
  return {items: []};
}

export default function ChatInterface({locale}:{locale: Language}){
  const t = useTranslations();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [recommended, setRecommended] = useState<Package[]>([]);

  const quickReplies = useMemo(()=>[
    locale==='th'? 'ฉันมีเวลา 1 ชั่วโมง แนะนำแพ็คเก็จไหน?' : locale==='zh'? '我只有1小时，推荐哪个套餐？' : 'I have 1 hour, which package do you recommend?',
    locale==='th'? 'แพ็คเก็จไหนเหมาะกับครอบครัว?' : locale==='zh'? '哪个套餐适合家庭？' : 'Which package is good for families?',
    locale==='th'? 'ราคาเท่าไหร่?' : locale==='zh'? '价格多少？' : 'How much is it?',
    locale==='th'? 'มีโปรโมชั่นอะไรบ้าง?' : locale==='zh'? '有什么优惠吗？' : 'Any promotions?'
  ], [locale]);

  useEffect(()=>{
    const greet: ChatMessage = { id: uuid(), role: 'assistant', content: t('chat.greeting'), createdAt: Date.now() };
    setMessages([greet]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const onSend = async (text: string) => {
    const user: ChatMessage = { id: uuid(), role: 'user', content: text, createdAt: Date.now() };
    setMessages(prev=>[...prev, user]);
    setLoading(true);
    try {
      const res = await fetch(`/${locale}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.concat(user).map(m=>({role: m.role, content: m.content})),
          language: locale
        })
      });
      const data = await res.json();
      let content: string = data.message || data.error || '';
      const {items} = extractPackagesFromText(content);
      if (items.length) {
        const ids = new Set(items.map(i=>i.id));
        const matched = pkgData.filter(p=>ids.has(p.id));
        setRecommended(matched);
        content = content.replace(/<packages>[\s\S]*?<\/packages>/, '');
      } else {
        setRecommended([]);
      }
      const ai: ChatMessage = { id: uuid(), role: 'assistant', content, createdAt: Date.now() };
      setMessages(prev=>[...prev, ai]);
      if (typeof window !== 'undefined' && window.parent !== window) {
        window.parent.postMessage({source:'tonsai-chat', type:'new-message'}, '*');
      }
    } catch (e:any) {
      const ai: ChatMessage = { id: uuid(), role: 'assistant', content: 'Sorry, something went wrong. Please try again later.', createdAt: Date.now() };
      setMessages(prev=>[...prev, ai]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto h-[calc(100vh-140px)] bg-white/70 backdrop-blur rounded-2xl border border-gray-200 shadow-soft flex flex-col overflow-hidden">
      <MessageList messages={messages} />
      {recommended.length>0 && (
        <div className="px-4 pb-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {recommended.map(p=> <PackageCard key={p.id} pkg={p} lang={locale} />)}
        </div>
      )}
      {loading && <div className="px-4 pb-2 text-sm text-gray-500">Typing…</div>}
      <MessageInput onSend={onSend} placeholder={t('chat.input.placeholder')} quickReplies={quickReplies} />
    </div>
  );
}
