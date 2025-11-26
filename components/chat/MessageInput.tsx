"use client";
import {useState} from 'react';

export default function MessageInput({onSend, placeholder, quickReplies}:{onSend:(text:string)=>void; placeholder:string; quickReplies:string[]}){
  const [text, setText] = useState('');

  const send = () => {
    const t = text.trim();
    if (!t) return;
    onSend(t);
    setText('');
  };

  return (
    <div className="border-t bg-white p-3 space-y-2">
      <div className="flex gap-2 items-center">
        <input
          className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tonsai-orange"
          value={text}
          placeholder={placeholder}
          onChange={e=>setText(e.target.value)}
          onKeyDown={e=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); send(); } }}
        />
        <button onClick={send} className="bg-tonsai-orange text-white px-4 py-3 rounded-xl shadow-soft hover:bg-tonsai-orangeDark">Send</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {quickReplies.map((q,i)=>(
          <button key={i} className="quick-chip" onClick={()=>onSend(q)}>{q}</button>
        ))}
      </div>
    </div>
  );
}
