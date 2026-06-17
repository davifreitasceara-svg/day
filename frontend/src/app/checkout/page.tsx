"use client";

import { useCartStore } from '@/store/cart';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, totalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen pt-32 text-center">Carregando...</div>;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 text-center flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Seu Carrinho está vazio</h1>
        <p className="text-[var(--text-secondary)] mb-8">Adicione alguns produtos incríveis para continuar com a compra.</p>
        <Link href="/produtos" className="btn-primary">Explorar Produtos</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gradient mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Formulário / Endereço */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold mb-6">Endereço de Entrega</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-2">CEP</label>
                <input type="text" className="w-full bg-[var(--bg-input)] rounded-lg py-3 px-4 outline-none border border-transparent focus:border-[var(--primary)]" placeholder="00000-000" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-[var(--text-secondary)] mb-2">Endereço</label>
                <input type="text" className="w-full bg-[var(--bg-input)] rounded-lg py-3 px-4 outline-none border border-transparent focus:border-[var(--primary)]" placeholder="Rua, Avenida..." />
              </div>
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-2">Número</label>
                <input type="text" className="w-full bg-[var(--bg-input)] rounded-lg py-3 px-4 outline-none border border-transparent focus:border-[var(--primary)]" />
              </div>
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-2">Complemento</label>
                <input type="text" className="w-full bg-[var(--bg-input)] rounded-lg py-3 px-4 outline-none border border-transparent focus:border-[var(--primary)]" />
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-xl font-bold mb-6">Pagamento</h2>
            <div className="flex flex-col gap-4">
               <label className="flex items-center gap-4 p-4 border border-[var(--border)] bg-[var(--primary)]/5 rounded-xl cursor-pointer">
                 <input type="radio" name="payment" defaultChecked className="w-5 h-5 accent-[var(--primary)]" />
                 <div>
                   <div className="font-bold">Cartão de Crédito</div>
                   <div className="text-sm text-[var(--text-secondary)]">Até 12x sem juros no Stripe</div>
                 </div>
               </label>
               <label className="flex items-center gap-4 p-4 border border-[var(--border-light)] hover:border-[var(--border)] rounded-xl cursor-pointer transition-colors">
                 <input type="radio" name="payment" className="w-5 h-5 accent-[var(--accent-green)]" />
                 <div>
                   <div className="font-bold text-[var(--accent-green)]">PIX</div>
                   <div className="text-sm text-[var(--text-secondary)]">Aprovação na hora (5% OFF)</div>
                 </div>
               </label>
            </div>
          </div>
        </div>

        {/* Resumo do Pedido */}
        <div className="lg:col-span-1">
          <div className="glass-card p-8 sticky top-24">
            <h2 className="text-xl font-bold mb-6 border-b border-[var(--border-light)] pb-4">Resumo do Pedido</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--primary)]/10 flex items-center justify-center rounded-lg text-xl">{item.icon}</div>
                    <div>
                      <div className="font-semibold text-sm line-clamp-1">{item.name}</div>
                      <div className="text-xs text-[var(--text-secondary)]">Qtd: {item.quantity}</div>
                    </div>
                  </div>
                  <div className="font-bold text-sm">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[var(--border-light)] space-y-3 py-4">
               <div className="flex justify-between text-sm">
                 <span className="text-[var(--text-secondary)]">Subtotal</span>
                 <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice())}</span>
               </div>
               <div className="flex justify-between text-sm">
                 <span className="text-[var(--text-secondary)]">Frete</span>
                 <span className="text-[var(--accent-green)]">Grátis</span>
               </div>
            </div>

            <div className="border-t border-[var(--border-light)] pt-4 mb-8">
               <div className="flex justify-between items-center">
                 <span className="font-bold">Total</span>
                 <span className="text-2xl font-extrabold text-[var(--accent)]">
                   {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice())}
                 </span>
               </div>
            </div>

            <button className="btn-primary w-full shadow-glow py-4 text-lg">Finalizar Compra</button>
          </div>
        </div>
      </div>
    </div>
  );
}
