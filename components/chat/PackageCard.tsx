"use client";
import type {Package, Language} from '@/types';

export default function PackageCard({pkg, lang}:{pkg: Package; lang: Language}){
  const priceText = () => {
    const p = pkg.price as any;
    if (p.adult || p.child) {
      const parts: string[] = [];
      if (p.adult) parts.push(`${lang==='zh'?'成人':'ผู้ใหญ่ / Adult'} ${p.adult} THB`);
      if (p.child) parts.push(`${lang==='zh'?'儿童':'เด็ก / Child'} ${p.child} THB`);
      if (p.note) parts.push(`${p.note}`);
      return parts.join(' · ');
    }
    if (p.note) return String(p.note);
    return '';
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-soft overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-tonsai-gradientFrom to-tonsai-gradientTo"/>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg">{pkg.name[lang]}</h3>
        <p className="text-sm text-gray-600">{pkg.duration}</p>
        <p className="text-sm">{priceText()}</p>
        <p className="text-sm text-gray-700 line-clamp-2">{pkg.activities.join(', ')}</p>
        <div className="flex gap-2 pt-2">
          <a href={pkg.bookingUrl} target="_blank" className="bg-tonsai-orange text-white px-4 py-2 rounded-lg text-sm">{lang==='th'?'จองเลย': lang==='zh'?'立即预订':'Book now'}</a>
          <a href={pkg.bookingUrl} target="_blank" className="px-4 py-2 rounded-lg text-sm border border-gray-200">{lang==='th'?'ดูรายละเอียด': lang==='zh'?'查看详情':'Details'}</a>
        </div>
      </div>
    </div>
  );
}
