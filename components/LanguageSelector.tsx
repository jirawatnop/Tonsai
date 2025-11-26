"use client";
import {usePathname, useRouter} from 'next/navigation';
import {useTransition} from 'react';
import type {Language} from '@/types';

const languages: {code: Language; label: string}[] = [
  {code: 'th', label: 'ไทย'},
  {code: 'en', label: 'EN'},
  {code: 'zh', label: '中文'}
];

export default function LanguageSelector({current}: {current: Language}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onChange = (code: Language) => {
    if (!pathname) return;
    const parts = pathname.split('/').filter(Boolean);
    parts[0] = code; // replace locale segment
    const newPath = '/' + parts.join('/');
    startTransition(() => router.push(newPath));
  };

  return (
    <div className="flex items-center gap-1">
      {languages.map(l => (
        <button
          key={l.code}
          onClick={() => onChange(l.code)}
          className={`px-3 py-1 rounded-full text-sm border ${
            l.code === current ? 'bg-tonsai-orange text-white border-tonsai-orange' : 'bg-white border-gray-200 hover:bg-gray-50'
          } ${isPending ? 'opacity-60' : ''}`}
          aria-pressed={l.code === current}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
