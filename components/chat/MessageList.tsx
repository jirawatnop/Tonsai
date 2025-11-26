"use client";
import type {ChatMessage} from '@/types';
import {useEffect, useRef} from 'react';

export default function MessageList({messages}: {messages: ChatMessage[]}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div ref={ref} className="flex-1 overflow-y-auto p-4 space-y-3 chat-gradient">
      {messages.map(m => (
        <div key={m.id} className={`max-w-[85%] ${m.role === 'assistant' ? '' : 'ml-auto'}`}>
          <div className={m.role === 'assistant' ? 'bubble-ai' : 'bubble-user'}>
            <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
