import { useTranslations } from 'next-intl';
import { Navigation } from '@/app/[locale]/components/Navigation';
import { Link } from '@/app/[locale]/components/Link';

export default function ServicesPage() {
  const t = useTranslations('services');
  const tCommon = useTranslations('common');
  const tNav = useTranslations('nav');

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-slate-300 font-light">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {['web', 'mobile', 'enterprise', 'cloud', 'iot'].map((key) => (
              <Link
                key={key}
                href={`/services/${key}`}
                className="block bg-white border-2 border-slate-200 rounded-2xl p-10 shadow-lg hover:shadow-2xl hover:border-blue-400 hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/30 group-hover:to-purple-50/30 transition-all duration-500 pointer-events-none" />
                <div className="relative z-10">
                  {/* Content Card */}
                  <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-8">
                    <div className="w-16 h-16 bg-blue-100 group-hover:bg-blue-600 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 shadow-md mx-auto">
                      <svg className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {key === 'web' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />}
                        {key === 'mobile' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />}
                        {key === 'enterprise' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />}
                        {key === 'cloud' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />}
                        {key === 'iot' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />}
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 group-hover:text-blue-600 mb-4 tracking-tight transition-colors text-center">
                      {t(`${key}.title`)}
                    </h2>
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed text-center">
                      {t(`${key}.description`)}
                    </p>
                    {key === 'iot' ? (
                      <div className="flex flex-wrap gap-2 justify-center">
                        {(t.raw(`${key}.techStack`) as string[]).map((tech, index) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium shadow-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <ul className="space-y-3">
                        {(t.raw(`${key}.items`) as string[]).map((item, index) => (
                          <li key={index} className="flex items-center text-slate-700">
                            <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-6 flex items-center justify-center text-blue-600 group-hover:text-blue-700 font-medium">
                      <span>查看案例</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
            {t('ctaTitle')}
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto font-light">
            {t('ctaDesc')}
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-xl">
            {tNav('contact')}
          </Link>
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
