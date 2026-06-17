'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCredentialsLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signIn('credentials', { email, password, callbackUrl: '/' });
  };

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[var(--bg-main)]">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[rgba(108,92,231,0.2)] blur-[100px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[rgba(0,184,148,0.2)] blur-[100px] rounded-full"></div>

      <div className="w-full max-w-md p-8 glass-card border border-[var(--border)] relative z-10 mx-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-3xl font-black text-gradient mb-2 tracking-tight">TECH<span className="text-[var(--text-main)]">STORE</span></Link>
          <p className="text-[var(--text-secondary)] text-sm">Bem-vindo(a) de volta! Faça login para continuar.</p>
        </div>

        <form onSubmit={handleCredentialsLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-[var(--text-main)] mb-1">E-mail</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50">✉️</span>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com" 
                className="w-full bg-[var(--bg-input)] border-2 border-transparent focus:border-[var(--primary)] focus:bg-[var(--primary)]/10 rounded-xl py-3 pl-10 pr-4 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-semibold text-[var(--text-main)]">Senha</label>
              <a href="#" className="text-xs text-[var(--primary-light)] hover:underline">Esqueceu a senha?</a>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50">🔒</span>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-[var(--bg-input)] border-2 border-transparent focus:border-[var(--primary)] focus:bg-[var(--primary)]/10 rounded-xl py-3 pl-10 pr-4 outline-none transition-all"
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-[var(--gradient-primary)] text-white font-bold py-3 rounded-xl shadow-[0_4px_14px_0_rgba(108,92,231,0.39)] hover:shadow-[0_6px_20px_rgba(108,92,231,0.23)] hover:scale-[1.02] transition-all">
            Entrar
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px bg-[var(--border)] flex-1"></div>
          <span className="text-[var(--text-muted)] text-xs font-semibold uppercase">Ou continue com</span>
          <div className="h-px bg-[var(--border)] flex-1"></div>
        </div>

        <button onClick={handleGoogleLogin} type="button" className="w-full bg-[var(--bg-input)] border border-[var(--border-light)] hover:border-[var(--primary)] text-[var(--text-main)] font-semibold py-3 rounded-xl flex justify-center items-center gap-3 transition-all hover:bg-[var(--primary)]/5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l2.85-2.22.83-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>

        <p className="mt-8 text-center text-sm text-[var(--text-secondary)]">
          Não tem uma conta? <a href="#" className="font-bold text-[var(--primary-light)] hover:underline">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}
