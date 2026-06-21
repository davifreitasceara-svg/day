"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Sun, Moon } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useTheme } from 'next-themes';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());
  const openCart = useCartStore((state) => state.openCart);
  
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-4 bg-[var(--bg-dark)]/80 backdrop-blur-xl shadow-lg border-b border-[var(--border-light)]' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-black text-xl shadow-[var(--shadow-glow)] group-hover:scale-105 transition-transform">
              ⚡
            </div>
            <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--primary-light)]">
              TechStore
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <Link href="/" className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--primary)] hover:after:w-full after:transition-all">Início</Link>
            <Link href="/produtos" className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--primary)] hover:after:w-full after:transition-all">Produtos</Link>
            <Link href="/#categorias" className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--primary)] hover:after:w-full after:transition-all">Categorias</Link>
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            {mounted && (
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--bg-surface)] hover:bg-[var(--primary)]/10 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}

            <button 
              onClick={openCart}
              className="relative w-10 h-10 rounded-full flex items-center justify-center bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 text-[var(--primary-light)] transition-colors"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--accent-orange)] text-white text-xs font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            
            <Link href="/login" className="hidden md:inline-flex btn-primary !py-2 !px-5 !text-sm">
              Entrar
            </Link>

            <button 
              className="md:hidden text-[var(--text-primary)]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[var(--bg-dark)]/95 backdrop-blur-xl border-b border-[var(--border-light)] p-6 shadow-2xl">
          <nav className="flex flex-col gap-6">
            <Link href="/" className="text-lg font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Início</Link>
            <Link href="/produtos" className="text-lg font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Produtos</Link>
            <Link href="/login" className="text-lg font-semibold text-[var(--primary)]" onClick={() => setIsMobileMenuOpen(false)}>Entrar / Cadastrar</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
