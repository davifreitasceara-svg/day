import { ProductCard } from '@/components/product/ProductCard';

export default function Home() {
  const featuredProducts = [
    { name: 'iPhone 16 Pro Max 256GB', category: 'Smartphones', icon: '📱', price: 8499, oldPrice: 9999, rating: '★★★★★', reviews: 2340, badge: '-15%', badgeType: 'sale' as const },
    { name: 'MacBook Air M3 15" 512GB', category: 'Notebooks', icon: '💻', price: 12999, oldPrice: 14499, rating: '★★★★★', reviews: 1890, badge: 'Novo', badgeType: 'new' as const },
    { name: 'AirPods Pro 2ª Geração', category: 'Fones', icon: '🎧', price: 1899, oldPrice: 2299, rating: '★★★★★', reviews: 4120, badge: '🔥 Hot', badgeType: 'hot' as const },
    { name: 'PlayStation 5 Slim 1TB', category: 'Games', icon: '🎮', price: 3199, oldPrice: 3999, rating: '★★★★★', reviews: 3560, badge: '-20%', badgeType: 'sale' as const },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(108,92,231,0.15),transparent_70%)] animate-hero-glow"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/15 border border-[var(--border)] rounded-full text-[var(--primary-light)] text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-[var(--accent-green)] rounded-full animate-pulse"></span>
              Novidades 2026
            </div>
            <h1 className="text-5xl sm:text-6xl font-black leading-tight mb-6 tracking-tight">
              Tecnologia que<br />
              <span className="text-gradient">Transforma</span> seu Dia
            </h1>
            <p className="text-[var(--text-secondary)] text-lg mb-10 leading-relaxed">
              Descubra os melhores eletrônicos com preços incríveis. Smartphones, notebooks, fones e muito mais com entrega rápida e garantia estendida.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary">🛍️ Ver Produtos</button>
              <button className="btn-outline">🔥 Ofertas do Dia</button>
            </div>
          </div>
          <div className="hidden lg:flex justify-center items-center relative animate-float">
             <div className="w-full max-w-[420px] p-8 glass-card border-[var(--border)] relative">
                <div className="absolute top-4 right-[-20px] px-4 py-2 glass-card text-xs font-bold z-30">🚀 Frete Grátis</div>
                <div className="absolute bottom-8 left-[-20px] px-4 py-2 glass-card text-xs font-bold z-30">⭐ 4.9 (2.340)</div>
                <div className="w-full h-64 bg-[radial-gradient(circle,rgba(108,92,231,0.2)_0%,transparent_70%)] rounded-xl flex items-center justify-center text-8xl mb-6">📱</div>
                <h3 className="text-xl font-bold mb-1">iPhone 16 Pro Max</h3>
                <div className="flex gap-3 items-baseline">
                  <span className="text-2xl font-extrabold text-[var(--accent)]">R$ 8.499</span>
                  <span className="text-sm text-[var(--text-muted)] line-through">R$ 9.999</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24" id="ofertas">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-gradient mb-2">🔥 Destaques da Semana</h2>
              <p className="text-[var(--text-secondary)]">Os produtos mais procurados com descontos imperdíveis</p>
            </div>
            <button className="btn-outline px-4 py-2 text-sm hidden sm:block">Ver Todos →</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, idx) => (
              <ProductCard key={idx} {...product} />
            ))}
          </div>
        </div>
      </section>
      {/* Login / CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--primary)]/5"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="glass-card p-12 rounded-3xl border border-[var(--primary)]/20 bg-gradient-to-br from-[var(--bg-main)] to-[var(--primary)]/10 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--primary)]/30 blur-[80px] rounded-full"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[var(--accent)]/20 blur-[80px] rounded-full"></div>
            
            <h2 className="text-4xl md:text-5xl font-black text-gradient mb-6 tracking-tight relative z-10">Pronto para transformar sua experiência?</h2>
            <p className="text-[var(--text-secondary)] text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Crie sua conta agora para ter acesso a ofertas exclusivas, rastreamento de pedidos em tempo real e um histórico completo de suas compras.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <a href="/login" className="bg-[var(--gradient-primary)] text-white font-bold py-4 px-10 rounded-xl shadow-[0_8px_20px_0_rgba(108,92,231,0.4)] hover:shadow-[0_12px_25px_rgba(108,92,231,0.3)] hover:scale-105 transition-all w-full sm:w-auto inline-block text-center text-lg">
                Fazer Login
              </a>
              <a href="/login" className="bg-[var(--bg-main)] text-[var(--text-main)] border-2 border-[var(--border-light)] hover:border-[var(--primary)] font-bold py-4 px-10 rounded-xl transition-all w-full sm:w-auto inline-block text-center text-lg">
                Criar Conta
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
