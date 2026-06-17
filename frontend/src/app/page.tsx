import { ProductCard } from '@/components/product/ProductCard';
import { PixelHero } from "@/components/ui/pixel-perfect-hero";
import { ShaderAnimation } from "@/components/ui/shader-animation";

export default function Home() {
  const featuredProducts = [
    { name: 'iPhone 16 Pro Max 256GB', category: 'Smartphones', icon: '📱', price: 8499, oldPrice: 9999, rating: '★★★★★', reviews: 2340, badge: '-15%', badgeType: 'sale' as const },
    { name: 'MacBook Air M3 15" 512GB', category: 'Notebooks', icon: '💻', price: 12999, oldPrice: 14499, rating: '★★★★★', reviews: 1890, badge: 'Novo', badgeType: 'new' as const },
    { name: 'AirPods Pro 2ª Geração', category: 'Fones', icon: '🎧', price: 1899, oldPrice: 2299, rating: '★★★★★', reviews: 4120, badge: '🔥 Hot', badgeType: 'hot' as const },
    { name: 'PlayStation 5 Slim 1TB', category: 'Games', icon: '🎮', price: 3199, oldPrice: 3999, rating: '★★★★★', reviews: 3560, badge: '-20%', badgeType: 'sale' as const },
  ];

  return (
    <div className="min-h-screen">
      {/* Shader Animation Intro */}
      <div className="relative flex h-[650px] w-full flex-col items-center justify-center overflow-hidden">
        <ShaderAnimation />
        <span className="absolute pointer-events-none z-10 text-center text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
          Tech Store
        </span>
      </div>

      <PixelHero
        word1="Tech"
        word2="Store."
        description="Experiência minimalista movida por inovação. Cada detalhe tecnológico foi pensado para revolucionar seu estilo de vida."
        primaryCta="Ver Produtos"
        primaryCtaMobile="Produtos"
        secondaryCta="Nossas Lojas"
        secondaryCtaMobile="Lojas"
        githubUrl="#"
      />

      {/* Featured Products */}
      <section className="py-24" id="ofertas">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-gradient mb-2">🔥 Destaques da Semana</h2>
              <p className="text-[var(--text-secondary)]">Os produtos mais procurados com descontos imperdíveis</p>
            </div>
            <a href="/produtos" className="btn-outline px-4 py-2 text-sm hidden sm:block">Ver Todos →</a>
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
