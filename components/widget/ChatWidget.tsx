"use client";
import {useEffect, useRef, useState} from 'react';
import type {Language} from '@/types';

export default function ChatWidget({host, language='th'}:{host?: string; language?: Language}){
  const [open, setOpen] = useState(false);
  const [badge, setBadge] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(()=>{
    const onMessage = (e: MessageEvent) => {
      if (typeof e.data === 'object' && e.data?.source === 'tonsai-chat' && e.data?.type === 'new-message' && !open) {
        setBadge(b => Math.min(9, b+1));
      }
    };
    window.addEventListener('message', onMessage);
    return ()=>window.removeEventListener('message', onMessage);
  },[open]);

  const origin = host || (typeof window !== 'undefined' ? window.location.origin : '');

  return (
    <>
      <button onClick={()=>{ setOpen(v=>!v); setBadge(0); }} className="fixed z-50 bottom-4 right-4 bg-tonsai-orange text-white rounded-full px-5 py-3 shadow-soft">
        Chat {badge>0 && <span className="ml-2 bg-white text-tonsai-orange rounded-full px-2 py-0.5 text-xs">{badge}</span>}
      </button>
      {open && (
        <div className="fixed z-50 bottom-20 right-4 w-[360px] h-[560px] bg-white border border-gray-200 rounded-2xl shadow-soft overflow-hidden">
          <div className="bg-gradient-to-r from-tonsai-gradientFrom to-tonsai-gradientTo text-white px-3 py-2 flex items-center justify-between">
            <div className="font-medium">Tonsai Chat</div>
            <div className="space-x-1">
              <button onClick={()=>setOpen(false)} className="px-2">✕</button>
            </div>
          </div>
          <iframe ref={iframeRef} src={`${origin}/widget?lang=${language}`} className="w-full h-[calc(100%-40px)] border-0"/>
        </div>
      )}
    </>
  );
}
