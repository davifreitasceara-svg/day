import { ProductCard } from '@/components/product/ProductCard';

export default function ProductsPage() {
  const allProducts = [
    { name: 'iPhone 16 Pro Max 256GB', category: 'Smartphones', icon: '📱', price: 8499, oldPrice: 9999, rating: '★★★★★', reviews: 2340, badge: '-15%', badgeType: 'sale' as const },
    { name: 'Samsung Galaxy S25 Ultra', category: 'Smartphones', icon: '📱', price: 7299, oldPrice: 8499, rating: '★★★★★', reviews: 1870, badge: 'Promo', badgeType: 'sale' as const },
    { name: 'MacBook Air M3 15" 512GB', category: 'Notebooks', icon: '💻', price: 12999, oldPrice: 14499, rating: '★★★★★', reviews: 1890, badge: 'Novo', badgeType: 'new' as const },
    { name: 'Dell XPS 14 Intel Core Ultra', category: 'Notebooks', icon: '💻', price: 9499, oldPrice: 10999, rating: '★★★★☆', reviews: 720 },
    { name: 'AirPods Pro 2ª Geração', category: 'Fones', icon: '🎧', price: 1899, oldPrice: 2299, rating: '★★★★★', reviews: 4120, badge: '🔥 Hot', badgeType: 'hot' as const },
    { name: 'Sony WH-1000XM5', category: 'Fones', icon: '🎧', price: 2199, oldPrice: 2799, rating: '★★★★★', reviews: 2890 },
    { name: 'PlayStation 5 Slim 1TB', category: 'Games', icon: '🎮', price: 3199, oldPrice: 3999, rating: '★★★★★', reviews: 3560, badge: '-20%', badgeType: 'sale' as const },
    { name: 'Xbox Series X 1TB', category: 'Games', icon: '🎮', price: 3499, oldPrice: 3999, rating: '★★★★★', reviews: 2100 },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[var(--bg-main)]">
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(108,92,231,0.1)_0%,transparent_60%)]"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(0,184,148,0.1)_0%,transparent_60%)]"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        {/* Header Section */}
        <div className="glass-card p-8 rounded-3xl mb-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[var(--border)]">
          <div className="w-full md:w-auto text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-gradient mb-3 tracking-tight">Estoque & Produtos</h1>
            <p className="text-[var(--text-secondary)] text-lg">
              Explore nossa seleção com <span className="font-bold text-[var(--text-main)]">{allProducts.length} itens</span> em alta.
            </p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50 text-xl">🔍</span>
              <input 
                type="text" 
                placeholder="Buscar em estoque..." 
                className="w-full bg-[var(--bg-main)] border-2 border-[var(--border-light)] focus:border-[var(--primary)] focus:bg-[var(--primary)]/5 rounded-2xl py-3 pl-12 pr-4 outline-none transition-all shadow-sm font-medium"
              />
            </div>
            <button className="bg-[var(--bg-main)] px-4 py-3 rounded-2xl border-2 border-[var(--border-light)] hover:border-[var(--primary)] text-[var(--primary)] hover:text-white hover:bg-[var(--primary)] transition-all flex items-center justify-center shadow-sm">
               <span className="text-xl">⚙️</span>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex overflow-x-auto gap-3 mb-12 pb-4 snap-x hide-scrollbar">
           {['🔥 Destaques', '📱 Smartphones', '💻 Notebooks', '🎧 Fones', '📺 TVs', '🎮 Games', '⌚ Wearables'].map((cat, i) => (
             <button key={i} className={`snap-center shrink-0 px-6 py-2.5 rounded-full text-sm font-extrabold transition-all duration-300 ${i === 0 ? 'bg-[var(--gradient-primary)] text-white shadow-[0_4px_14px_0_rgba(108,92,231,0.39)] border-transparent hover:scale-105' : 'glass-card border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--primary)] hover:text-white hover:border-transparent hover:shadow-lg'}`}>
               {cat}
             </button>
           ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 bg-blend-normal lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {allProducts.map((product, idx) => (
            <div className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }} key={idx}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
