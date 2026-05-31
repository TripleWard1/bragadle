'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { LOCAIS_BRAGA, Local } from '../data/locais';

// ── HAVERSINE DISTANCE ───────────────────────────────────────────────────────
function calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return Math.round(6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10;
}

// ── BEARING / COMPASS ────────────────────────────────────────────────────────
function calcularDirecao(lat1: number, lon1: number, lat2: number, lon2: number): string {
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const lat1R = (lat1 * Math.PI) / 180;
  const lat2R = (lat2 * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos(lat2R);
  const x = Math.cos(lat1R) * Math.sin(lat2R) - Math.sin(lat1R) * Math.cos(lat2R) * Math.cos(dLon);
  let b = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  return dirs[Math.round(b / 45) % 8];
}

const COMPASS_ARROWS: Record<string, string> = {
  N: '↑', NE: '↗', E: '→', SE: '↘', S: '↓', SO: '↙', O: '←', NO: '↖',
};

// ── TIPO ICONS ────────────────────────────────────────────────────────────────
const TIPO_ICONS: Record<string, string> = {
  Igreja: '⛪',
  Monumento: '🏛️',
  Jardim: '🌿',
  Museu: '🖼️',
  Gastronomia: '🍽️',
  Arqueologia: '🏺',
  Desporto: '⚽',
  Cultura: '🎭',
  Universidade: '🎓',
  Miradouro: '🔭',
};

// ── PROXIMITY COLOR ───────────────────────────────────────────────────────────
function proximidadeConfig(dist: number, isAlvo: boolean) {
  if (isAlvo) return { label: 'ALVO!', color: 'var(--green)', bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.5)' };
  if (dist < 0.5) return { label: `${dist} km`, color: 'var(--green)', bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.5)' };
  if (dist < 2)   return { label: `${dist} km`, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.4)' };
  if (dist < 6)   return { label: `${dist} km`, color: '#fb923c', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.3)' };
  return { label: `${dist} km`, color: 'var(--muted)', bg: 'rgba(30,41,59,0.8)', border: 'rgba(51,65,85,0.8)' };
}

// ── STATS TYPE ────────────────────────────────────────────────────────────────
interface Stats {
  jogados: number;
  vitorias: number;
  sequencia: number;
  melhorSeq: number;
  distribuicao: number[];
}

const defaultStats: Stats = {
  jogados: 0, vitorias: 0, sequencia: 0, melhorSeq: 0,
  distribuicao: [0, 0, 0, 0, 0, 0],
};

// ────────────────────────────────────────────────────────────────────────────
export default function Bragadle() {
  const [alvo, setAlvo] = useState<Local | null>(null);
  const [inputVal, setInputVal] = useState('');
  const [sugestoes, setSugestoes] = useState<Local[]>([]);
  const [tentativas, setTentativas] = useState<Local[]>([]);
  const [ganhou, setGanhou] = useState(false);
  const [fimDeJogo, setFimDeJogo] = useState(false);
  const [mostrarDica, setMostrarDica] = useState(false);
  const [stats, setStats] = useState<Stats>(defaultStats);
  const [toast, setToast] = useState<{ msg: string; tipo: 'ok' | 'err' | 'info' } | null>(null);
  const [modalStats, setModalStats] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [selectedGuess, setSelectedGuess] = useState<string | null>(null);
  const [animatingRow, setAnimatingRow] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const MAX_TENTATIVAS = 6;

  // ── INIT ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const diaDoAno = Math.floor(Date.now() / 86_400_000);
    setAlvo(LOCAIS_BRAGA[diaDoAno % LOCAIS_BRAGA.length]);

    const saved = localStorage.getItem('bragadle_v2');
    if (saved) {
      try { setStats(JSON.parse(saved)); } catch { /* ignore */ }
    }
    // Auto-focus
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  // ── CLOSE DROPDOWN ON OUTSIDE CLICK ──────────────────────────────────────
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setSugestoes([]);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  // ── TOAST ─────────────────────────────────────────────────────────────────
  const showToast = useCallback((msg: string, tipo: 'ok' | 'err' | 'info' = 'info') => {
    setToast({ msg, tipo });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // ── AUTOCOMPLETE ──────────────────────────────────────────────────────────
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setInputVal(v);
    setSugestoes(
      v.trim().length === 0
        ? []
        : LOCAIS_BRAGA.filter(
            l =>
              l.nome.toLowerCase().includes(v.toLowerCase()) &&
              !tentativas.some(t => t.id === l.id)
          ).slice(0, 8)
    );
  };

  // ── GUESS ─────────────────────────────────────────────────────────────────
  const processarPalpite = (local: Local) => {
    if (ganhou || fimDeJogo) return;
    setAnimatingRow(local.id);
    setTimeout(() => setAnimatingRow(null), 500);

    const novas = [local, ...tentativas];
    setTentativas(novas);
    setInputVal('');
    setSugestoes([]);

    if (local.id === alvo?.id) {
      setGanhou(true);
      showToast('🎉 Parabéns! Conheces Braga como ninguém!', 'ok');
      const newStats: Stats = {
        jogados: stats.jogados + 1,
        vitorias: stats.vitorias + 1,
        sequencia: stats.sequencia + 1,
        melhorSeq: Math.max(stats.sequencia + 1, stats.melhorSeq),
        distribuicao: stats.distribuicao.map((v, i) => i === novas.length - 1 ? v + 1 : v),
      };
      setStats(newStats);
      localStorage.setItem('bragadle_v2', JSON.stringify(newStats));
    } else if (novas.length >= MAX_TENTATIVAS) {
      setFimDeJogo(true);
      showToast(`😢 Era: ${alvo?.nome}`, 'err');
      const newStats: Stats = { ...stats, jogados: stats.jogados + 1, sequencia: 0 };
      setStats(newStats);
      localStorage.setItem('bragadle_v2', JSON.stringify(newStats));
    }
  };

  // ── SHARE ─────────────────────────────────────────────────────────────────
  const copiarPartilha = () => {
    if (!alvo) return;
    let g = `⛪ BRAGADLE #${Math.floor(Date.now() / 86_400_000) % LOCAIS_BRAGA.length} — ${tentativas.length}/${MAX_TENTATIVAS}\n\n`;
    [...tentativas].reverse().forEach(t => {
      const tipo = t.tipo === alvo.tipo ? '🟩' : '🟥';
      const freg = t.freguesia === alvo.freguesia ? '🟩' : '🟥';
      const sec = t.seculo === alvo.seculo ? '🟩' : t.seculo < alvo.seculo ? '🟦' : '🟧';
      const dist = t.id === alvo.id ? '🟩' : calcularDistancia(t.lat, t.lng, alvo.lat, alvo.lng) < 2 ? '🟨' : '🟥';
      g += `${tipo}${freg}${sec}${dist}\n`;
    });
    g += '\n🏛️ bragadle.vercel.app';
    navigator.clipboard.writeText(g);
    showToast('📋 Resultado copiado!', 'ok');
  };

  // ── LOADING ───────────────────────────────────────────────────────────────
  if (!alvo) {
    return (
      <div style={{
        minHeight: '100vh', background: 'var(--bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '1rem',
      }}>
        <div className="logo-pulse">⛪</div>
        <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.2em', fontSize: '0.75rem' }}>
          BRACARA AUGUSTA A CARREGAR...
        </p>
      </div>
    );
  }

  const jogoTerminado = ganhou || fimDeJogo;
  const maxDist = Math.max(...tentativas.map(t => calcularDistancia(t.lat, t.lng, alvo.lat, alvo.lng)), 1);

  return (
    <>
      {/* ── CSS VARIABLES & GLOBAL STYLES ─────────────────────────────────── */}
      <style>{`
        :root {
          --bg: #09090f;
          --surface: #0f1117;
          --surface2: #151822;
          --border: #1e2333;
          --border2: #252d3d;
          --text: #e2e8f0;
          --muted: #4a5568;
          --muted2: #718096;
          --red: #ef4444;
          --red-dim: rgba(239,68,68,0.15);
          --red-border: rgba(239,68,68,0.35);
          --green: #22c55e;
          --green-dim: rgba(34,197,94,0.12);
          --green-border: rgba(34,197,94,0.4);
          --gold: #f59e0b;
          --gold-dim: rgba(245,158,11,0.1);
          --font-display: 'Georgia', 'Times New Roman', serif;
          --font-body: 'system-ui', '-apple-system', sans-serif;
          --font-mono: 'Courier New', monospace;
          --radius: 12px;
          --shadow: 0 4px 24px rgba(0,0,0,0.6);
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { color-scheme: dark; }
        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── BACKGROUND ──────────────────────────────────────── */
        .bg-layer {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(239,68,68,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(245,158,11,0.04) 0%, transparent 60%);
        }
        .bg-grid {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(30,35,50,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,35,50,0.4) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        /* ── LAYOUT ──────────────────────────────────────────── */
        .page-wrap {
          position: relative; z-index: 1;
          max-width: 860px; margin: 0 auto;
          padding: 1.5rem 1rem 4rem;
          display: flex; flex-direction: column; align-items: center; gap: 0;
        }

        /* ── NAV ─────────────────────────────────────────────── */
        .top-nav {
          width: 100%; display: flex; justify-content: space-between;
          align-items: center; margin-bottom: 2rem;
        }
        .nav-btn {
          background: var(--surface); border: 1px solid var(--border);
          color: var(--muted2); border-radius: 8px; padding: 0.4rem 0.7rem;
          font-size: 0.75rem; cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; gap: 0.35rem;
        }
        .nav-btn:hover { border-color: var(--red-border); color: var(--red); }

        /* ── HEADER ──────────────────────────────────────────── */
        .header { text-align: center; margin-bottom: 2.5rem; }
        .header-pill {
          display: inline-block;
          background: var(--red-dim); border: 1px solid var(--red-border);
          color: var(--red); font-family: var(--font-mono);
          font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase;
          padding: 0.25rem 0.75rem; border-radius: 999px; margin-bottom: 0.75rem;
        }
        .header-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 10vw, 5.5rem);
          font-weight: 900; letter-spacing: -0.03em;
          line-height: 1;
          background: linear-gradient(135deg, #ef4444 0%, #f97316 40%, #f59e0b 80%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: none;
          position: relative;
        }
        .header-sub {
          color: var(--muted2); font-size: 0.8rem; margin-top: 0.6rem;
          max-width: 380px; margin-left: auto; margin-right: auto;
          line-height: 1.6;
        }
        .header-counter {
          font-family: var(--font-mono); font-size: 0.65rem;
          color: var(--muted); letter-spacing: 0.15em; margin-top: 0.5rem;
        }

        /* ── STATS STRIP ─────────────────────────────────────── */
        .stats-strip {
          width: 100%; max-width: 480px;
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem; margin-bottom: 2rem;
        }
        .stat-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 0.75rem 0.5rem;
          text-align: center; cursor: pointer;
          transition: border-color 0.2s, transform 0.2s;
        }
        .stat-card:hover { border-color: var(--border2); transform: translateY(-1px); }
        .stat-val { font-size: 1.4rem; font-weight: 800; line-height: 1; }
        .stat-lbl { font-size: 0.55rem; text-transform: uppercase;
          letter-spacing: 0.1em; color: var(--muted); margin-top: 0.25rem; }

        /* ── INPUT ───────────────────────────────────────────── */
        .input-wrap { width: 100%; max-width: 520px; position: relative; margin-bottom: 2rem; }
        .input-box {
          width: 100%; background: var(--surface);
          border: 1.5px solid var(--border2); border-radius: 14px;
          display: flex; align-items: center; padding: 0 1rem;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .input-box:focus-within {
          border-color: rgba(239,68,68,0.6);
          box-shadow: 0 0 0 3px rgba(239,68,68,0.08);
        }
        .input-icon { font-size: 0.9rem; color: var(--muted); flex-shrink: 0; }
        .input-field {
          flex: 1; background: transparent; border: none; outline: none;
          color: var(--text); font-size: 0.9rem; padding: 0.85rem 0.75rem;
          font-family: var(--font-body);
        }
        .input-field::placeholder { color: var(--muted); }
        .input-count {
          font-family: var(--font-mono); font-size: 0.7rem; color: var(--muted);
          flex-shrink: 0; padding: 0.25rem 0.5rem;
          background: var(--bg); border: 1px solid var(--border);
          border-radius: 6px;
        }

        /* ── DROPDOWN ────────────────────────────────────────── */
        .dropdown {
          position: absolute; top: calc(100% + 6px); left: 0; width: 100%;
          background: var(--surface); border: 1px solid var(--border2);
          border-radius: var(--radius); overflow: hidden;
          box-shadow: 0 16px 48px rgba(0,0,0,0.7);
          z-index: 50; max-height: 280px; overflow-y: auto;
        }
        .dropdown::-webkit-scrollbar { width: 4px; }
        .dropdown::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }
        .dropdown-item {
          width: 100%; border: none; background: none; cursor: pointer;
          padding: 0.7rem 1rem; display: flex; align-items: center;
          gap: 0.75rem; text-align: left; transition: background 0.15s;
          border-bottom: 1px solid var(--border);
        }
        .dropdown-item:last-child { border-bottom: none; }
        .dropdown-item:hover { background: rgba(239,68,68,0.06); }
        .dropdown-item:hover .di-name { color: var(--red); }
        .di-icon {
          width: 2rem; height: 2rem; border-radius: 8px;
          background: var(--surface2); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; flex-shrink: 0;
        }
        .di-name { color: var(--text); font-size: 0.85rem; font-weight: 500; transition: color 0.15s; }
        .di-meta { display: flex; gap: 0.4rem; margin-top: 0.1rem; }
        .di-tag {
          font-size: 0.6rem; font-family: var(--font-mono);
          color: var(--muted2); background: var(--bg);
          padding: 0.1rem 0.4rem; border-radius: 4px;
          border: 1px solid var(--border);
        }

        /* ── HINT ────────────────────────────────────────────── */
        .hint-wrap { width: 100%; max-width: 520px; text-align: center; margin-bottom: 1.5rem; }
        .hint-btn {
          background: none; border: none; cursor: pointer;
          font-size: 0.75rem; color: var(--gold);
          text-decoration: underline; text-underline-offset: 3px;
          letter-spacing: 0.05em;
        }
        .hint-btn:hover { color: #fbbf24; }
        .hint-box {
          background: rgba(245,158,11,0.05); border: 1px solid rgba(245,158,11,0.2);
          border-radius: var(--radius); padding: 0.9rem 1.1rem;
          font-size: 0.78rem; color: #fcd34d; line-height: 1.6;
          text-align: left; margin-top: 0.5rem;
        }
        .hint-box strong { color: #fbbf24; }

        /* ── GRID HEADER ─────────────────────────────────────── */
        .grid-header {
          display: grid;
          grid-template-columns: 2fr 1.2fr 1.4fr 1.2fr 1.4fr;
          gap: 0.4rem; width: 100%;
          font-size: 0.55rem; text-transform: uppercase;
          letter-spacing: 0.12em; color: var(--muted);
          font-family: var(--font-mono); margin-bottom: 0.6rem;
          padding: 0 0.1rem;
        }
        .grid-header > div { text-align: center; }
        .grid-header > div:first-child { text-align: left; padding-left: 0.5rem; }

        /* ── GUESS ROW ───────────────────────────────────────── */
        .guess-row {
          display: grid;
          grid-template-columns: 2fr 1.2fr 1.4fr 1.2fr 1.4fr;
          gap: 0.4rem; width: 100%;
          animation: rowSlide 0.4s cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
          cursor: pointer;
        }
        .guess-row:hover .cell { filter: brightness(1.1); }
        @keyframes rowSlide {
          from { opacity: 0; transform: translateY(-12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .cell {
          border-radius: 10px; padding: 0.6rem 0.4rem;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          min-height: 3.2rem; border: 1px solid var(--border);
          background: var(--surface); transition: filter 0.2s;
          position: relative; overflow: hidden;
        }
        .cell::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%);
          pointer-events: none;
        }
        .cell-correct {
          background: var(--green-dim) !important;
          border-color: var(--green-border) !important;
        }
        .cell-wrong {
          background: var(--red-dim);
          border-color: var(--red-border);
        }
        .cell-name { font-size: 0.72rem; font-weight: 600; text-align: center; line-height: 1.3; }
        .cell-sub  { font-size: 0.58rem; color: var(--muted2); margin-top: 0.15rem; font-family: var(--font-mono); }
        .cell-arrow { font-size: 1rem; line-height: 1; }
        .cell-dist { font-size: 0.72rem; font-weight: 700; }

        /* ── PROXIMITY BAR ───────────────────────────────────── */
        .prox-bar {
          position: absolute; bottom: 0; left: 0;
          height: 3px; border-radius: 0 0 10px 10px;
          transition: width 0.5s ease;
        }

        /* ── END CARD ────────────────────────────────────────── */
        .end-card {
          width: 100%; max-width: 520px;
          background: var(--surface); border: 1px solid var(--border2);
          border-top: 3px solid;
          border-radius: var(--radius); padding: 1.5rem;
          margin-bottom: 2rem;
          animation: scaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .end-card.win  { border-top-color: var(--green); }
        .end-card.lose { border-top-color: var(--red); }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
        .end-title { font-size: 1.3rem; font-weight: 800; margin-bottom: 0.3rem; }
        .end-sub { font-size: 0.82rem; color: var(--muted2); margin-bottom: 1rem; }
        .end-curiosidade {
          background: var(--surface2); border: 1px solid var(--border);
          border-radius: 10px; padding: 0.85rem 1rem;
          font-size: 0.78rem; color: var(--muted2); font-style: italic;
          line-height: 1.65; margin-bottom: 1.25rem;
          position: relative;
        }
        .end-curiosidade::before {
          content: '"'; position: absolute; top: 0.4rem; left: 0.6rem;
          font-size: 2rem; color: var(--red-border); line-height: 1;
          font-family: var(--font-display);
        }
        .end-curiosidade p { padding-left: 0.75rem; }
        .share-btn {
          width: 100%; padding: 0.85rem;
          background: linear-gradient(135deg, #ef4444, #f97316);
          border: none; border-radius: 10px; cursor: pointer;
          color: white; font-size: 0.8rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          transition: opacity 0.2s, transform 0.15s;
        }
        .share-btn:hover { opacity: 0.92; transform: translateY(-1px); }

        /* ── EMPTY SLOTS ─────────────────────────────────────── */
        .empty-slot {
          display: grid;
          grid-template-columns: 2fr 1.2fr 1.4fr 1.2fr 1.4fr;
          gap: 0.4rem; width: 100%; opacity: 0.25;
        }
        .empty-cell {
          height: 3.2rem; border-radius: 10px;
          border: 1px dashed var(--border); background: transparent;
        }

        /* ── TOAST ───────────────────────────────────────────── */
        .toast {
          position: fixed; top: 1.25rem; left: 50%; transform: translateX(-50%);
          z-index: 100; padding: 0.6rem 1.25rem;
          border-radius: 999px; font-size: 0.82rem; font-weight: 600;
          backdrop-filter: blur(12px); white-space: nowrap;
          animation: toastIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        .toast-ok   { background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.4); color: #86efac; }
        .toast-err  { background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.4); color: #fca5a5; }
        .toast-info { background: rgba(30,41,59,0.9);  border: 1px solid var(--border2); color: var(--text); }
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        /* ── MODAL OVERLAY ───────────────────────────────────── */
        .overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.75);
          backdrop-filter: blur(4px); z-index: 80;
          display: flex; align-items: center; justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .modal {
          background: var(--surface); border: 1px solid var(--border2);
          border-radius: 16px; padding: 1.75rem; width: 100%; max-width: 420px;
          max-height: 90vh; overflow-y: auto;
          box-shadow: 0 24px 80px rgba(0,0,0,0.8);
        }
        .modal-title {
          font-size: 1.15rem; font-weight: 800; margin-bottom: 1.25rem;
          display: flex; justify-content: space-between; align-items: center;
        }
        .modal-close {
          background: none; border: none; cursor: pointer;
          color: var(--muted2); font-size: 1.2rem; line-height: 1;
          padding: 0.2rem; border-radius: 6px; transition: color 0.2s;
        }
        .modal-close:hover { color: var(--text); }

        /* ── DIST BAR STATS ──────────────────────────────────── */
        .dist-row {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.75rem; margin-bottom: 0.4rem; font-family: var(--font-mono);
        }
        .dist-label { width: 1.2rem; text-align: right; color: var(--muted2); }
        .dist-bar-wrap { flex: 1; height: 1.4rem; background: var(--surface2);
          border-radius: 4px; overflow: hidden; }
        .dist-bar-fill {
          height: 100%; background: var(--red);
          border-radius: 4px; display: flex; align-items: center;
          padding-left: 0.4rem; font-size: 0.65rem; color: white;
          font-weight: 700; transition: width 0.5s ease;
          min-width: 1.5rem;
        }

        /* ── HOW TO PLAY ITEMS ───────────────────────────────── */
        .how-item { display: flex; gap: 0.75rem; margin-bottom: 0.9rem; align-items: flex-start; }
        .how-icon {
          width: 2rem; height: 2rem; border-radius: 8px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center; font-size: 0.9rem;
        }
        .how-text { font-size: 0.8rem; color: var(--muted2); line-height: 1.5; }
        .how-text strong { color: var(--text); }

        /* ── LEGEND ──────────────────────────────────────────── */
        .legend {
          display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;
          font-size: 0.6rem; color: var(--muted); margin-top: 3rem;
          padding-top: 1.5rem; border-top: 1px solid var(--border);
          width: 100%; font-family: var(--font-mono); letter-spacing: 0.08em;
        }

        /* ── LOGO PULSE ──────────────────────────────────────── */
        @keyframes logoPulse { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(1.1);opacity:0.7;} }
        .logo-pulse { font-size: 3rem; animation: logoPulse 2s ease-in-out infinite; }

        /* ── ATTEMPTS BUBBLES ────────────────────────────────── */
        .attempt-bubbles {
          display: flex; gap: 0.4rem; margin-top: 0.75rem;
          justify-content: center;
        }
        .bubble {
          width: 0.6rem; height: 0.6rem; border-radius: 50%;
          background: var(--border); transition: background 0.3s;
        }
        .bubble.used  { background: var(--red); }
        .bubble.win   { background: var(--green); }

        /* ── RESPONSIVE ──────────────────────────────────────── */
        @media (max-width: 560px) {
          .grid-header, .guess-row, .empty-slot {
            grid-template-columns: 1.8fr 1fr 1.2fr 1fr 1.2fr;
            gap: 0.3rem;
          }
          .cell { min-height: 2.8rem; padding: 0.4rem 0.25rem; }
          .cell-name { font-size: 0.62rem; }
          .cell-sub  { font-size: 0.52rem; }
          .header-title { font-size: 3rem; }
        }
      `}</style>

      {/* ── BG ──────────────────────────────────────────────────────────────── */}
      <div className="bg-layer" />
      <div className="bg-grid" />

      {/* ── TOAST ───────────────────────────────────────────────────────────── */}
      {toast && (
        <div className={`toast toast-${toast.tipo}`}>{toast.msg}</div>
      )}

      {/* ── STATS MODAL ─────────────────────────────────────────────────────── */}
      {modalStats && (
        <div className="overlay" onClick={() => setModalStats(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">
              <span>📊 Estatísticas</span>
              <button className="modal-close" onClick={() => setModalStats(false)}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {[
                { v: stats.jogados, l: 'Jogados' },
                { v: stats.jogados > 0 ? `${Math.round((stats.vitorias / stats.jogados) * 100)}%` : '0%', l: 'Vitórias', color: 'var(--green)' },
                { v: `${stats.sequencia}🔥`, l: 'Streak' },
                { v: `${stats.melhorSeq}👑`, l: 'Máx. Streak', color: 'var(--gold)' },
              ].map(s => (
                <div key={s.l} className="stat-card" style={{ cursor: 'default' }}>
                  <div className="stat-val" style={{ color: s.color || 'var(--text)' }}>{s.v}</div>
                  <div className="stat-lbl">{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: '0.5rem', fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
              DISTRIBUIÇÃO DE TENTATIVAS
            </div>
            {stats.distribuicao.map((v, i) => {
              const maxV = Math.max(...stats.distribuicao, 1);
              const pct = Math.max((v / maxV) * 100, 4);
              return (
                <div key={i} className="dist-row">
                  <span className="dist-label">{i + 1}</span>
                  <div className="dist-bar-wrap">
                    <div className="dist-bar-fill" style={{ width: `${pct}%` }}>{v > 0 ? v : ''}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── HOW TO PLAY MODAL ───────────────────────────────────────────────── */}
      {modalInfo && (
        <div className="overlay" onClick={() => setModalInfo(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">
              <span>🏛️ Como Jogar</span>
              <button className="modal-close" onClick={() => setModalInfo(false)}>✕</button>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted2)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              Descobre o <strong style={{color:'var(--text)'}}>local secreto de Braga</strong> em {MAX_TENTATIVAS} tentativas. A cada palpite recebes pistas sobre o local alvo.
            </p>
            {[
              { icon: '📂', bg: 'rgba(239,68,68,0.1)', title: 'Categoria', desc: '🟩 Verde = mesma categoria. 🟥 Vermelho = diferente.' },
              { icon: '🏡', bg: 'rgba(59,130,246,0.1)', title: 'Freguesia', desc: '🟩 Verde = mesma freguesia. 🟥 Vermelho = freguesia diferente.' },
              { icon: '⏳', bg: 'rgba(245,158,11,0.1)', title: 'Século', desc: '🟩 Verde = século correto. ⬆️ = alvo é mais recente. ⬇️ = alvo é mais antigo.' },
              { icon: '🧭', bg: 'rgba(34,197,94,0.1)', title: 'Proximidade', desc: 'Distância em km até ao alvo + direção da bússola. Amarelo = menos de 2km. Verde = alvo encontrado!' },
            ].map(h => (
              <div key={h.title} className="how-item">
                <div className="how-icon" style={{ background: h.bg }}>{h.icon}</div>
                <div className="how-text"><strong>{h.title}</strong><br />{h.desc}</div>
              </div>
            ))}
            <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.5rem', lineHeight: 1.5 }}>
              💡 Após 3 tentativas falhadas, podes desbloquear uma pista histórica sobre o local secreto.
            </p>
          </div>
        </div>
      )}

      {/* ── PAGE ────────────────────────────────────────────────────────────── */}
      <div className="page-wrap">

        {/* NAV */}
        <nav className="top-nav">
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button className="nav-btn" onClick={() => setModalInfo(true)}>
              <span>❓</span> Como Jogar
            </button>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
            #{Math.floor(Date.now() / 86_400_000) % LOCAIS_BRAGA.length}
          </div>
          <button className="nav-btn" onClick={() => setModalStats(true)}>
            📊 Stats
          </button>
        </nav>

        {/* HEADER */}
        <header className="header">
          <div className="header-pill">⛪ Cidade dos Arcebispos · Edição 2026</div>
          <h1 className="header-title">BRAGADLE</h1>
          <p className="header-sub">
            Descobre o monumento, jardim, igreja ou segredo gastronómico escondido na Cidade dos Arcebispos.
          </p>
          {/* Attempt bubbles */}
          <div className="attempt-bubbles">
            {Array.from({ length: MAX_TENTATIVAS }).map((_, i) => {
              const t = [...tentativas].reverse()[i];
              const cls = !t ? 'bubble' : t.id === alvo?.id ? 'bubble win' : 'bubble used';
              return <div key={i} className={cls} />;
            })}
          </div>
        </header>

        {/* STATS STRIP */}
        <div className="stats-strip" onClick={() => setModalStats(true)} style={{ cursor: 'pointer' }}>
          <div className="stat-card">
            <div className="stat-val">{stats.jogados}</div>
            <div className="stat-lbl">Jogados</div>
          </div>
          <div className="stat-card">
            <div className="stat-val" style={{ color: 'var(--green)' }}>
              {stats.jogados > 0 ? `${Math.round((stats.vitorias / stats.jogados) * 100)}%` : '—'}
            </div>
            <div className="stat-lbl">Vitórias</div>
          </div>
          <div className="stat-card">
            <div className="stat-val" style={{ color: '#f97316' }}>{stats.sequencia}🔥</div>
            <div className="stat-lbl">Streak</div>
          </div>
          <div className="stat-card">
            <div className="stat-val" style={{ color: 'var(--gold)' }}>{stats.melhorSeq}👑</div>
            <div className="stat-lbl">Máx.</div>
          </div>
        </div>

        {/* END CARD */}
        {jogoTerminado && (
          <div className={`end-card ${ganhou ? 'win' : 'lose'}`} style={{ width: '100%', maxWidth: '520px' }}>
            <div className="end-title">
              {ganhou ? '🎉 Vitória!' : '💀 Esgotaste as tentativas!'}
            </div>
            <div className="end-sub">
              O local secreto era <strong style={{ color: ganhou ? 'var(--green)' : 'var(--red)' }}>{alvo.nome}</strong>{' '}
              <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>({alvo.freguesia} · {TIPO_ICONS[alvo.tipo]} {alvo.tipo})</span>
            </div>
            <div className="end-curiosidade">
              <p>{alvo.curiosidade}</p>
            </div>
            <button className="share-btn" onClick={copiarPartilha}>
              Partilhar Resultado 🚀
            </button>
          </div>
        )}

        {/* INPUT */}
        {!jogoTerminado && (
          <div ref={dropdownRef} className="input-wrap">
            <div className="input-box">
              <span className="input-icon">🔍</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={handleInput}
                placeholder="Digita um local de Braga..."
                className="input-field"
                onKeyDown={e => {
                  if (e.key === 'Enter' && sugestoes.length > 0) {
                    processarPalpite(sugestoes[0]);
                  }
                  if (e.key === 'Escape') setSugestoes([]);
                }}
              />
              <span className="input-count">
                {MAX_TENTATIVAS - tentativas.length}/{MAX_TENTATIVAS}
              </span>
            </div>

            {sugestoes.length > 0 && (
              <div className="dropdown">
                {sugestoes.map(l => (
                  <button
                    key={l.id}
                    className="dropdown-item"
                    onClick={() => processarPalpite(l)}
                  >
                    <div className="di-icon">{TIPO_ICONS[l.tipo] || '📍'}</div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div className="di-name">{l.nome}</div>
                      <div className="di-meta">
                        <span className="di-tag">{l.tipo}</span>
                        <span className="di-tag">{l.freguesia}</span>
                        <span className="di-tag">Séc. {l.seculo}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* HINT */}
        {!jogoTerminado && tentativas.length >= 3 && (
          <div className="hint-wrap">
            {!mostrarDica ? (
              <button className="hint-btn" onClick={() => setMostrarDica(true)}>
                💡 Estás com dificuldades? Desbloquear pista histórica
              </button>
            ) : (
              <div className="hint-box">
                <strong>Pista:</strong> {alvo.curiosidade.slice(0, alvo.curiosidade.indexOf(',') > 40 ? alvo.curiosidade.indexOf(',') : 80)}...
              </div>
            )}
          </div>
        )}

        {/* GRID HEADER */}
        {(tentativas.length > 0 || jogoTerminado) && (
          <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            <div style={{ minWidth: '520px' }}>
              <div className="grid-header" style={{ minWidth: '520px' }}>
                <div>📍 Local</div>
                <div>📂 Categoria</div>
                <div>🏡 Freguesia</div>
                <div>⏳ Século</div>
                <div>🧭 Distância</div>
              </div>

              {/* GUESS ROWS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minWidth: '520px' }}>
                {tentativas.map((t, idx) => {
                  const isAlvo = t.id === alvo.id;
                  const mesmoTipo = t.tipo === alvo.tipo;
                  const mesmaFreg = t.freguesia === alvo.freguesia;
                  const mesmoSec = t.seculo === alvo.seculo;
                  const dist = calcularDistancia(t.lat, t.lng, alvo.lat, alvo.lng);
                  const dir = calcularDirecao(t.lat, t.lng, alvo.lat, alvo.lng);
                  const prox = proximidadeConfig(dist, isAlvo);
                  const pct = isAlvo ? 100 : Math.max(0, Math.round((1 - dist / (maxDist * 1.2)) * 100));

                  return (
                    <div
                      key={t.id}
                      className="guess-row"
                      style={{ animationDelay: `${idx * 0.02}s` }}
                      onClick={() => setSelectedGuess(selectedGuess === t.id ? null : t.id)}
                    >
                      {/* Name */}
                      <div className={`cell ${isAlvo ? 'cell-correct' : ''}`}>
                        <span className="cell-name" title={t.nome}
                          style={{ color: isAlvo ? 'var(--green)' : 'var(--text)' }}>
                          {t.nome}
                        </span>
                        {isAlvo && <span className="cell-sub" style={{ color: 'var(--green)' }}>✓ CORRETO</span>}
                      </div>

                      {/* Tipo */}
                      <div className={`cell ${mesmoTipo ? 'cell-correct' : 'cell-wrong'}`}>
                        <span style={{ fontSize: '1rem' }}>{TIPO_ICONS[t.tipo]}</span>
                        <span className="cell-sub" style={{ color: mesmoTipo ? 'var(--green)' : 'var(--muted2)' }}>
                          {t.tipo}
                        </span>
                      </div>

                      {/* Freguesia */}
                      <div className={`cell ${mesmaFreg ? 'cell-correct' : 'cell-wrong'}`}>
                        <span className="cell-name" title={t.freguesia}
                          style={{ fontSize: '0.65rem', color: mesmaFreg ? 'var(--green)' : 'var(--text)' }}>
                          {t.freguesia}
                        </span>
                      </div>

                      {/* Século */}
                      <div className={`cell ${mesmoSec ? 'cell-correct' : 'cell-wrong'}`}>
                        <span className="cell-name" style={{ color: mesmoSec ? 'var(--green)' : 'var(--text)' }}>
                          Séc. {t.seculo}
                        </span>
                        {!mesmoSec && (
                          <span className="cell-sub">
                            {t.seculo < alvo.seculo ? '⬆️ mais recente' : '⬇️ mais antigo'}
                          </span>
                        )}
                      </div>

                      {/* Proximidade */}
                      <div className="cell" style={{
                        background: prox.bg,
                        borderColor: prox.border,
                      }}>
                        {isAlvo ? (
                          <span style={{ fontSize: '1.1rem' }}>📍</span>
                        ) : (
                          <>
                            <span className="cell-dist" style={{ color: prox.color }}>{prox.label}</span>
                            <span className="cell-arrow" style={{ color: prox.color }}>
                              {COMPASS_ARROWS[dir]} {dir}
                            </span>
                          </>
                        )}
                        <div className="prox-bar" style={{
                          width: `${pct}%`,
                          background: isAlvo ? 'var(--green)' : dist < 2 ? 'var(--gold)' : 'var(--red)',
                        }} />
                      </div>
                    </div>
                  );
                })}

                {/* EMPTY SLOTS */}
                {!jogoTerminado && Array.from({ length: MAX_TENTATIVAS - tentativas.length }).map((_, i) => (
                  <div key={i} className="empty-slot">
                    {Array.from({ length: 5 }).map((__, j) => (
                      <div key={j} className="empty-cell" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ZERO STATE */}
        {tentativas.length === 0 && !jogoTerminado && (
          <div style={{
            textAlign: 'center', color: 'var(--muted)',
            fontSize: '0.8rem', padding: '2rem 0',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', opacity: 0.4 }}>🏛️</div>
            Começa a digitar o nome de um local de Braga...
            <br />
            <span style={{ fontSize: '0.65rem', color: 'var(--border2)' }}>
              {LOCAIS_BRAGA.length} locais disponíveis
            </span>
          </div>
        )}

        {/* LEGEND */}
        <div className="legend">
          <span>🟩 Correto</span>
          <span>🟥 Incorreto</span>
          <span>⬆️⬇️ Direção Cronológica</span>
          <span>🧭 Bússola Real</span>
          <span>🟨 Muito Perto (&lt;2km)</span>
        </div>

      </div>
    </>
  );
}