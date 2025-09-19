"use client";
import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="sticky top-0 z-50 relative overflow-hidden pt-1"
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
        <div className="w-[1728px] mx-auto flex items-center h-[128px] relative z-10">
        {/* Left: logo */}
        <div className="flex items-center gap-6 shrink-0 ml-[6px]">
          <a href="/" className="block">
            <img
              src="/images/logo-1.png?v=2"
              width={302}
              height={98}
              alt="Op2 logo"
              className="hidden md:block"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
            <span className="md:hidden font-semibold tracking-tight">Op2</span>
          </a>
        </div>
        {/* Right: nav + Eng group (equal gaps, Eng collé à droite) */}
        <div className="ml-auto hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-10 text-[#243768]">
            <Link href="/" className="text-[26px] font-medium">Accueil</Link>
            <a href="#expertise" className="text-[26px] font-medium">Expertise</a>
            <a href="#offres" className="text-[26px] font-medium">Offre</a>
            <a href="#realisations" className="text-[26px] font-medium">Réalisations</a>
            <a href="#equipe" className="text-[26px] font-medium capitalize">équipe</a>
            
          </nav>
          <Link href="/en" className="text-[26px] font-medium text-[#F36911]" aria-label="Switch to English">Eng</Link>
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
            <Link href="/" className="py-2" onClick={() => setOpen(false)}>Accueil</Link>
            <a href="#expertise" className="py-2" onClick={() => setOpen(false)}>Expertise</a>
            <a href="#offres" className="py-2" onClick={() => setOpen(false)}>Offre</a>
            <a href="#realisations" className="py-2" onClick={() => setOpen(false)}>Réalisations</a>
            <a href="#equipe" className="py-2" onClick={() => setOpen(false)}>Équipe</a>
            
            <Link href="/en" className="py-2 uppercase font-medium" onClick={() => setOpen(false)}>ENG</Link>
          </div>
        </div>
      )}
    </header>
  );
}


