import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[var(--bg-surface)] border-t border-[var(--border-light)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight mb-4">
              <div className="w-10 h-10 bg-[var(--gradient-primary)] rounded-lg flex items-center justify-center text-xl">⚡</div>
              <span className="text-gradient">TechStore</span>
            </Link>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-sm">
              Sua loja de eletrônicos premium. Oferecemos os melhores produtos com preços imbatíveis e atendimento de qualidade desde 2020.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Navegação</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--primary-light)] text-sm">Início</Link></li>
              <li><Link href="/produtos" className="text-[var(--text-secondary)] hover:text-[var(--primary-light)] text-sm">Produtos</Link></li>
              <li><Link href="/#categorias" className="text-[var(--text-secondary)] hover:text-[var(--primary-light)] text-sm">Categorias</Link></li>
              <li><Link href="/#ofertas" className="text-[var(--text-secondary)] hover:text-[var(--primary-light)] text-sm">Ofertas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contato</h4>
            <ul className="space-y-3 text-[var(--text-secondary)] text-sm">
              <li>📧 contato@techstore.com</li>
              <li>📞 (11) 9999-9999</li>
              <li>📍 São Paulo, SP</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border-light)] flex flex-col sm:flex-row justify-between items-center gap-4 text-[var(--text-muted)] text-sm">
          <span>© 2026 TechStore. Todos os direitos reservados.</span>
          <div className="flex gap-4">
            <a href="#" className="w-9 h-9 rounded bg-[var(--primary)]/15 text-[var(--primary-light)] flex items-center justify-center hover:bg-[var(--gradient-primary)] hover:text-white transition-all">📷</a>
            <a href="#" className="w-9 h-9 rounded bg-[var(--primary)]/15 text-[var(--primary-light)] flex items-center justify-center hover:bg-[var(--gradient-primary)] hover:text-white transition-all">🐦</a>
            <a href="#" className="w-9 h-9 rounded bg-[var(--primary)]/15 text-[var(--primary-light)] flex items-center justify-center hover:bg-[var(--gradient-primary)] hover:text-white transition-all">📘</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
