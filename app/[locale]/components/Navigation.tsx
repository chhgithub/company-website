'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link } from '@/app/[locale]/components/Link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { locales, defaultLocale } from '@/i18n';

export function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'about', href: `/${locale}/about` },
    { key: 'services', href: `/${locale}/services` },
    { key: 'contact', href: `/${locale}/contact` },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  const switchLocale = (newLocale: string) => {
    // Get the path without any locale prefix
    let pathWithoutLocale = pathname;

    // Remove current locale prefix from pathname
    for (const loc of locales) {
      if (pathname === `/${loc}`) {
        pathWithoutLocale = '';
        break;
      } else if (pathname.startsWith(`/${loc}/`)) {
        pathWithoutLocale = pathname.slice(`/${loc}`.length);
        break;
      }
    }

    // If pathname doesn't start with locale prefix, use it as-is
    if (pathWithoutLocale === pathname) {
      pathWithoutLocale = pathname;
    }

    // Handle root path
    if (pathWithoutLocale === '' || pathWithoutLocale === '/') {
      return `/${newLocale}`;
    }

    // Always add locale prefix
    return `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href={`/${locale}`} className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Flyhigh
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-blue-600'
                    : 'text-slate-700 hover:text-blue-600'
                }`}
              >
                {t(item.key as any)}
              </Link>
            ))}

            {/* Language Switcher */}
            <div className="flex items-center space-x-2 border-l border-slate-300 pl-8">
              <Link
                href={switchLocale('en')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  locale === 'en'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                EN
              </Link>
              <Link
                href={switchLocale('zh')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  locale === 'zh'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                中文
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key as any)}
                </Link>
              ))}
            </div>
            <div className="flex space-x-2 mt-4 pt-4 border-t border-slate-200">
              <Link
                href={switchLocale('en')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium text-center transition-all ${
                  locale === 'en'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                EN
              </Link>
              <Link
                href={switchLocale('zh')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium text-center transition-all ${
                  locale === 'zh'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                中文
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
