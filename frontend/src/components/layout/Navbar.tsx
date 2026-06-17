"use client";

import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { useEffect, useState } from 'react';

export function Navbar() {
  const totalItems = useCartStore((state) => state.totalItems());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-[#0A0E27]/85 backdrop-blur-xl border-b border-[var(--border-light)] transition-all">
      <div className="max-w-7xl mx-auto px-8">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
            <div className="w-10 h-10 bg-[var(--gradient-primary)] rounded-lg flex items-center justify-center text-xl">⚡</div>
            <span className="text-gradient">TechStore</span>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            <li><Link href="/" className="text-[var(--text-secondary)] hover:text-white font-medium transition-colors">Início</Link></li>
            <li><Link href="/produtos" className="text-[var(--text-secondary)] hover:text-white font-medium transition-colors">Produtos</Link></li>
            <li><Link href="/#categorias" className="text-[var(--text-secondary)] hover:text-white font-medium transition-colors">Categorias</Link></li>
            <li><Link href="/#ofertas" className="text-[var(--text-secondary)] hover:text-white font-medium transition-colors">Ofertas</Link></li>
          </ul>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-lg bg-[var(--primary)]/15 text-[var(--primary-light)] hover:bg-[var(--primary)]/30 transition-all flex items-center justify-center" aria-label="Buscar">🔍</button>
            <Link href="/checkout" className="relative w-10 h-10 rounded-lg bg-[var(--primary)]/15 text-[var(--primary-light)] hover:bg-[var(--primary)]/30 transition-all flex items-center justify-center" aria-label="Carrinho">
              🛒
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--accent-orange)] rounded-full text-[0.65rem] font-bold flex items-center justify-center text-white">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href="/login" className="btn-primary py-2 px-5 text-sm hidden sm:flex">Entrar</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
