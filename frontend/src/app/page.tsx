import { ProductCard } from '@/components/product/ProductCard';
import { PixelHero } from "@/components/ui/pixel-perfect-hero";
import { ShaderAnimation } from "@/components/ui/shader-lines";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Home() {
  const featuredProducts = [
    { name: 'iPhone 16 Pro Max 256GB', category: 'Smartphones', icon: '📱', price: 8499, oldPrice: 9999, rating: '★★★★★', reviews: 2340, badge: '-15%', badgeType: 'sale' as const },
    { name: 'MacBook Air M3 15" 512GB', category: 'Notebooks', icon: '💻', price: 12999, oldPrice: 14499, rating: '★★★★★', reviews: 1890, badge: 'Novo', badgeType: 'new' as const },
    { name: 'AirPods Pro 2ª Geração', category: 'Fones', icon: '🎧', price: 1899, oldPrice: 2299, rating: '★★★★★', reviews: 4120, badge: '🔥 Hot', badgeType: 'hot' as const },
    { name: 'PlayStation 5 Slim 1TB', category: 'Games', icon: '🎮', price: 3199, oldPrice: 3999, rating: '★★★★★', reviews: 3560, badge: '-20%', badgeType: 'sale' as const },
  ];

  const categories = [
    { name: "Smartphones", icon: "📱", delay: 0.1 },
    { name: "Notebooks", icon: "💻", delay: 0.2 },
    { name: "Fones", icon: "🎧", delay: 0.3 },
    { name: "TVs", icon: "📺", delay: 0.4 },
    { name: "Games", icon: "🎮", delay: 0.5 },
    { name: "Wearables", icon: "⌚", delay: 0.6 },
  ];

  return (
    <div className="min-h-screen">
      {/* Shader Animation Intro */}
      <div className="relative flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden bg-[var(--bg-dark)]">
        <ShaderAnimation />
        
        <ScrollReveal delay={0.2} direction="up" className="z-10 w-full relative">
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
        </ScrollReveal>
      </div>

      {/* Categories */}
      <section className="py-24 relative z-10 bg-[var(--bg-dark)]" id="categorias">
        <div className="max-w-7xl mx-auto px-8">
          <ScrollReveal direction="up">
            <h2 className="text-3xl font-extrabold text-gradient mb-2 text-center">Nossos Departamentos</h2>
            <p className="text-[var(--text-secondary)] text-center mb-16">O melhor da tecnologia ao seu alcance</p>
          </ScrollReveal>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat, idx) => (
              <ScrollReveal delay={cat.delay} direction="up" key={idx}>
                <a href={`/produtos?cat=${cat.name.toLowerCase()}`} className="glass-card flex flex-col items-center justify-center p-8 group hover:bg-[var(--primary)]/10 cursor-pointer">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">{cat.icon}</div>
                  <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary-light)] transition-colors">{cat.name}</h3>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 relative z-10" id="ofertas">
        <div className="max-w-7xl mx-auto px-8">
          <ScrollReveal direction="up" className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl font-extrabold text-gradient mb-2">🔥 Destaques da Semana</h2>
              <p className="text-[var(--text-secondary)]">Os produtos mais procurados com descontos imperdíveis</p>
            </div>
            <a href="/produtos" className="btn-outline px-4 py-2 text-sm hidden sm:block">Ver Todos →</a>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, idx) => (
              <ScrollReveal key={idx} delay={0.1 * idx} direction="up">
                <ProductCard {...product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* Login / CTA Section */}
      <section className="py-32 relative overflow-hidden z-10 flex items-center justify-center">
        <div className="absolute inset-0 bg-[var(--primary)]/5 pointer-events-none"></div>
        
        <ScrollReveal delay={0.2} direction="up" className="max-w-5xl mx-auto px-8 relative w-full">
          <div className="glass-card p-16 rounded-[2rem] border border-[var(--primary)]/30 bg-gradient-to-br from-[var(--bg-card)] to-[var(--primary)]/5 text-center shadow-[var(--shadow-glow)] relative overflow-hidden backdrop-blur-2xl">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--primary)]/20 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[var(--accent)]/10 blur-[100px] rounded-full pointer-events-none"></div>
            
            <h2 className="text-4xl md:text-6xl font-black text-gradient mb-8 tracking-tight relative z-10 inline-block drop-shadow-md">
              Pronto para transformar sua experiência?
            </h2>
            <p className="text-[var(--text-secondary)] text-xl font-medium mb-12 max-w-2xl mx-auto relative z-10">
              Crie sua conta agora para ter acesso a ofertas exclusivas, rastreamento de pedidos em tempo real e um histórico completo de suas compras.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
              <a href="/login" className="btn-primary py-5 px-12 text-lg text-white group">
                <span className="relative z-10">Fazer Login</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>
              <a href="/login" className="bg-transparent text-[var(--text-primary)] border-2 border-[var(--border-light)] hover:border-[var(--primary-light)] hover:text-[var(--primary-light)] font-bold py-5 px-12 rounded-xl transition-all w-full sm:w-auto inline-block text-center text-lg bg-[var(--bg-surface)] hover:bg-[var(--primary)]/10 shadow-lg">
                Criar Conta
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
