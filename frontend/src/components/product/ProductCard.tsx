"use client";

import { useCartStore } from '@/store/cart';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface ProductCardProps {
  id?: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  icon: string;
  rating: string;
  reviews: number;
  badge?: string;
  badgeType?: 'sale' | 'new' | 'hot';
}

export function ProductCard({ id, name, category, price, oldPrice, icon, rating, reviews, badge, badgeType }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: id || name.toLowerCase().replace(/\s+/g, '-'),
      name,
      price,
      quantity: 1,
      icon
    });
  };
  
  const badgeClasses = {
    sale: "bg-gradient-to-br from-[#FF6B35] to-[#FF4757] text-white",
    new: "bg-gradient-to-br from-[#00E676] to-[#00C853] text-[#0A0E27]",
    hot: "bg-gradient-to-br from-[#FD79A8] to-[#E84393] text-white"
  };

  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });
  const transform = useMotionTemplate`perspective(1000px) rotateX(${x}deg) rotateY(${y}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(yPct * 15);
    y.set(xPct * 15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      className="glass-card overflow-hidden group relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transformStyle: "preserve-3d" }}
      whileHover={{ y: -8 }}
    >
      {/* Dynamic Glow */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" style={{ transform: "translateZ(10px)" }}></div>

      {badge && (
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase z-10 ${badgeType ? badgeClasses[badgeType] : badgeClasses.new}`} style={{ transform: "translateZ(20px)" }}>
          {badge}
        </span>
      )}
      
      <div className="w-full h-[220px] bg-[radial-gradient(circle,rgba(108,92,231,0.1)_0%,transparent_70%)] relative flex items-center justify-center text-7xl p-4 overflow-hidden" style={{ transform: "translateZ(30px)" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-card)]/80 z-0"></div>
        <span className="relative z-10 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 drop-shadow-2xl">{icon}</span>
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20 flex gap-2 w-max">
          <button 
            onClick={handleAddToCart}
            className="bg-gradient-to-br from-[var(--accent)] to-[var(--accent-alt)] text-[#0A0E27] font-bold px-4 py-2 text-sm rounded-lg hover:-translate-y-1 hover:shadow-lg transition-transform"
          >
            🛒 Comprar
          </button>
          <button className="w-9 h-9 rounded-lg bg-white/15 text-[var(--text-primary)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-colors backdrop-blur-md">
            ❤️
          </button>
        </div>
      </div>

      <div className="p-6 relative z-10 bg-[var(--bg-card)]/50 backdrop-blur-sm" style={{ transform: "translateZ(40px)" }}>
        <div className="text-xs text-[var(--primary-light)] uppercase tracking-wider font-semibold mb-1">{category}</div>
        <h3 className="text-[1.05rem] font-bold mb-2 leading-tight group-hover:text-[var(--primary-light)] transition-colors">{name}</h3>
        
        <div className="flex items-center gap-1 mb-3 text-sm">
          <span className="text-[#F9CA24]">{rating}</span>
          <span className="text-[var(--text-muted)] text-[0.8rem]">({reviews.toLocaleString()})</span>
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className="text-[1.35rem] font-extrabold text-[var(--accent)] drop-shadow-md">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
          </span>
          {oldPrice && (
            <span className="text-[0.9rem] text-[var(--text-muted)] line-through">
               {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(oldPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
