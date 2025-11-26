import '../globals.css';
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Tonsai Elephant Phuket - AI Chatbot',
  description: 'AI chatbot for Tonsai Elephant Phuket to assist with packages and booking.'
};

export function generateStaticParams() {
  return [{locale: 'th'}, {locale: 'en'}, {locale: 'zh'}];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: 'th' | 'en' | 'zh'};
}) {
  const {locale} = params;
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
