import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['th', 'en', 'zh'],
  defaultLocale: 'th'
});

export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*).*)'
  ]
};
