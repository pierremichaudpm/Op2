"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';

const SECTION_IDS = ['expertise', 'offres', 'realisations', 'equipe'] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { t, locale } = useI18n();
  const logoSrc = locale === 'en' ? '/images/logo-site-en.png' : '/images/logo-1.png?v=2';

  // Scroll-spy: track which section is currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  // Clear active section when at the very top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 200) setActiveSection(null);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = (sectionId: string) =>
    `text-[26px] font-medium transition-colors duration-200 ${
      activeSection === sectionId
        ? 'text-[#F36911]'
        : 'text-[#243768] hover:text-[#F36911]'
    }`;

  return (
    <header
      className="sticky top-0 z-50 relative overflow-hidden"
      style={{
        background: 'rgba(255,255,255,1)'
      }}
    >
      {/* Dégradé intégré AU FOND du header, sous le contenu */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[24px] z-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)'
        }}
      />

      <div className="container-wrapper relative z-10">
        <div className="w-[1728px] mx-auto flex items-center h-[148px] relative z-10">
        {/* Left: logo Op2 + Part of Accenture */}
        <div className="flex items-center gap-6 shrink-0 ml-[6px]">
          <a href="/" className="hidden md:flex flex-col items-start gap-2">
            {/* Logo Op2 principal */}
            <Image
              src={logoSrc}
              width={250}
              height={81}
              alt="Op2 logo"
              priority
            />
            {/* Logo Part of Accenture */}
            <Image
              src="/images/PartofAccenture_logo.png"
              width={180}
              height={24}
              alt="Part of Accenture"
              style={{ marginLeft: '41px' }}
            />
          </a>
          <a href="/" className="md:hidden">
            <span className="font-semibold tracking-tight">Op2</span>
          </a>
        </div>
        {/* Right: nav + Eng group (equal gaps, Eng collé à droite) */}
        <div className="ml-auto hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-10">
            <Link href={locale === 'en' ? '/en' : '/'} className={`text-[26px] font-medium transition-colors duration-200 ${activeSection === null ? 'text-[#F36911]' : 'text-[#243768] hover:text-[#F36911]'}`}>{t('common.nav.home')}</Link>
            <a href="#expertise" className={navLinkClass('expertise')} onClick={(e) => {
              e.preventDefault();
              document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}>{t('common.nav.expertise')}</a>
            <a href="#offres" className={navLinkClass('offres')} onClick={(e) => {
              e.preventDefault();
              document.getElementById('offres')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}>{t('common.nav.offers')}</a>
            <a href="#realisations" className={navLinkClass('realisations')} onClick={(e) => {
              e.preventDefault();
              document.getElementById('realisations')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}>{t('common.nav.projects')}</a>
            <a href="#equipe" className={`${navLinkClass('equipe')} capitalize`} onClick={(e) => {
              e.preventDefault();
              document.getElementById('equipe')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}>{t('common.nav.team')}</a>

          </nav>
          {locale === 'en' ? (
            <Link href="/" className="text-[26px] font-medium text-[#F36911]" aria-label="Basculer en français">{t('common.lang.switchToFrench')}</Link>
          ) : (
            <Link href="/en" className="text-[26px] font-medium text-[#F36911]" aria-label="Switch to English">{t('common.lang.switchToEnglish')}</Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden ml-auto inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100"
          onClick={() => setOpen((v) => !v)}
          aria-label="Ouvrir le menu"
        >
          <span className="sr-only">Menu</span>
          ☰
        </button>
        </div>
      </div>
      {/* fin du header */}

      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur">
          <div className="container-wrapper py-3 flex flex-col gap-3">
            <Link href={locale === 'en' ? '/en' : '/'} className="py-2" onClick={() => setOpen(false)}>{t('common.nav.home')}</Link>
            <a href="#expertise" className="py-2" onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              setTimeout(() => document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
            }}>{t('common.nav.expertise')}</a>
            <a href="#offres" className="py-2" onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              setTimeout(() => document.getElementById('offres')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
            }}>{t('common.nav.offers')}</a>
            <a href="#realisations" className="py-2" onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              setTimeout(() => document.getElementById('realisations')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
            }}>{t('common.nav.projects')}</a>
            <a href="#equipe" className="py-2" onClick={() => setOpen(false)}>{t('common.nav.team')}</a>
            
            {locale === 'en' ? (
              <Link href="/" className="py-2 uppercase font-medium" onClick={() => setOpen(false)}>{t('common.lang.switchToFrench')}</Link>
            ) : (
              <Link href="/en" className="py-2 uppercase font-medium" onClick={() => setOpen(false)}>{t('common.lang.switchToEnglish')}</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}


