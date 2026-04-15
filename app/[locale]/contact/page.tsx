'use client';

import { useTranslations } from 'next-intl';
import { Navigation } from '@/app/[locale]/components/Navigation';
import { Link } from '@/app/[locale]/components/Link';
import { useEffect, useRef } from 'react';

export default function ContactPage() {
  const t = useTranslations('contact');
  const tCommon = useTranslations('common');
  const tNav = useTranslations('nav');

  const scrollRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    scrollRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !scrollRefs.current.includes(el)) {
      scrollRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />

        {/* Animated background elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight text-reveal">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-slate-300 font-light animate-slide-left" style={{ animationDelay: '0.3s' }}>
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Office Location */}
            <div className="mb-20 animate-on-scroll" ref={addToRefs}>
              <h2 className="text-3xl font-bold text-slate-900 mb-12 uppercase tracking-wider">
                {t('offices.title')}
              </h2>
              <div className="border-l-4 border-blue-600 pl-8 py-6 card-hover bg-gradient-to-r from-slate-50 to-white rounded-r-2xl">
                <div className="text-2xl font-semibold text-slate-900 mb-2">
                  {t('offices.headquarters.label')}
                </div>
                <div className="text-xl text-slate-700">
                  {t('offices.headquarters.city')}
                </div>
                <div className="text-lg text-slate-600 mt-2">
                  {t('companyName')}
                </div>
              </div>
            </div>

            {/* Email Contacts */}
            <div className="mb-20 animate-on-scroll" ref={addToRefs}>
              <h2 className="text-3xl font-bold text-slate-900 mb-12 uppercase tracking-wider">
                {t('email.title')}
              </h2>
              <div className="space-y-6">
                <div className="group card-hover p-8 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200 hover:border-blue-300 transition-all duration-300">
                  <a
                    href="mailto:info@flyhigh.com"
                    className="text-2xl text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-3 group"
                  >
                    info@flyhigh.com
                    <svg className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="animate-on-scroll" ref={addToRefs}>
              <h2 className="text-3xl font-bold text-slate-900 mb-12 uppercase tracking-wider">
                {t('social.title')}
              </h2>
              <div className="flex flex-wrap gap-6">
                {['instagram', 'twitter'].map((key) => (
                  <a
                    key={key}
                    href={`https://${key === 'twitter' ? 'x.com' : key}.com/flyhigh`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-button group flex items-center gap-3 px-6 py-4 bg-slate-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <svg className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      {key === 'instagram' && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>}
                      {key === 'twitter' && <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>}
                    </svg>
                    <span className="text-lg font-medium text-slate-700 group-hover:text-white transition-colors">
                      {t(`social.${key}`)}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                {tCommon('footer.copyright')}
              </p>
            </div>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-white transition-colors hover:scale-110 transform">
                {tNav('home')}
              </Link>
              <Link href="/about" className="hover:text-white transition-colors hover:scale-110 transform">
                {tNav('about')}
              </Link>
              <Link href="/services" className="hover:text-white transition-colors hover:scale-110 transform">
                {tNav('services')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
