'use client';

import { useTranslations } from 'next-intl';
import { Navigation } from '@/app/[locale]/components/Navigation';
import { Link } from '@/app/[locale]/components/Link';
import { notFound } from 'next/navigation';
import { useState, use } from 'react';
import type { ReactNode } from 'react';

interface PageProps {
  params: Promise<{
    locale: string;
    serviceId: string;
  }>;
}

const serviceIcons: Record<string, ReactNode> = {
  web: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  ),
  mobile: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  ),
  enterprise: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  ),
  cloud: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  ),
  iot: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  ),
};

export default function ServiceCasesPage({ params }: PageProps) {
  const { locale, serviceId } = use(params);
  const t = useTranslations('services');
  const tCommon = useTranslations('common');
  const tNav = useTranslations('nav');

  const validServices = ['web', 'mobile', 'enterprise', 'cloud', 'iot'];
  if (!validServices.includes(serviceId)) {
    notFound();
  }

  const cases = t.raw(`${serviceId}.cases`) as Array<{
    name: string;
    description: string;
    image: string;
    fullDescription?: string;
    client?: string;
    timeline?: string;
    technologies?: string[];
  }> || [];

  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  const toggleCase = (index: number) => {
    setExpandedCase(expandedCase === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Compact Header */}
      <section className="bg-gradient-to-br from-slate-50 to-white border-b border-slate-200 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              {tNav('home')}
            </Link>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/services" className="hover:text-blue-600 transition-colors">
              {tNav('services')}
            </Link>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-900 font-medium">{t(`${serviceId}.title`)}</span>
          </div>

          {/* Title and Icon */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {serviceIcons[serviceId]}
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                {t(`${serviceId}.title`)} - {t('casesTitle')}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          {cases.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('noCases')}</h3>
              <p className="text-slate-600">{t('noCasesDesc')}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {cases.map((caseItem, index) => {
                const isExpanded = expandedCase === index;
                return (
                  <div
                    key={index}
                    className={`bg-white rounded-3xl overflow-hidden transition-all duration-500 border-2 ${
                      isExpanded ? 'border-blue-400 shadow-2xl md:col-span-2' : 'border-transparent hover:shadow-xl hover:border-blue-300'
                    }`}
                  >
                    {/* Project Image */}
                    <div className="aspect-[4/3] bg-slate-200 overflow-hidden relative cursor-pointer" onClick={() => toggleCase(index)}>
                      <img
                        src={caseItem.image}
                        alt={caseItem.name}
                        className="w-full h-full object-cover transition-transform duration-700"
                      />
                      {!isExpanded && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100"></div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-white text-sm font-medium">{t('casesTitle')}</p>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 hover:text-blue-600 transition-colors leading-tight cursor-pointer" onClick={() => toggleCase(index)}>
                        {caseItem.name}
                      </h3>

                      {/* Expanded Content */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        {/* Full Description */}
                        <p className="text-slate-600 leading-relaxed mb-6 pt-4 border-t border-slate-100">
                          {caseItem.fullDescription || caseItem.description}
                        </p>

                        {/* Meta Info */}
                        {caseItem.client && (
                          <div className="bg-slate-50 rounded-lg p-4 mb-6">
                            <p className="text-xs text-slate-500 mb-1">客户</p>
                            <p className="text-sm font-semibold text-slate-900">{caseItem.client}</p>
                          </div>
                        )}
                      </div>

                      {/* View/Collapse Button */}
                      <div className="flex items-center text-blue-600 font-medium text-sm mt-2">
                        <button
                          onClick={() => toggleCase(index)}
                          className="flex items-center hover:text-blue-700 transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              <span>收起</span>
                              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </>
                          ) : (
                            <>
                              <span>查看详情</span>
                              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
            {t('ctaTitle')}
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto font-light">
            {t('ctaDesc')}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">{tCommon('footer.copyright')}</p>
            </div>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-white transition-colors">
                {tNav('home')}
              </Link>
              <Link href="/about" className="hover:text-white transition-colors">
                {tNav('about')}
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                {tNav('contact')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
