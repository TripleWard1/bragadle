'use client';

import { useState, useEffect, useRef } from 'react';
import { LOCAIS_BRAGA, Local } from '../data/locais';
import {
  collection, doc, getDoc, setDoc, getDocs,
  query, orderBy, limit, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

// ─── GEO ─────────────────────────────────────────────────────────────────────
function haversine(la1: number, lo1: number, la2: number, lo2: number) {
  const R = 6371, toR = (d: number) => (d * Math.PI) / 180;
  const dLa = toR(la2 - la1), dLo = toR(lo2 - lo1);
  const a = Math.sin(dLa / 2) ** 2 + Math.cos(toR(la1)) * Math.cos(toR(la2)) * Math.sin(dLo / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10;
}
function compass(la1: number, lo1: number, la2: number, lo2: number) {
  const dLo = ((lo2 - lo1) * Math.PI) / 180;
  const y = Math.sin(dLo) * Math.cos((la2 * Math.PI) / 180);
  const x = Math.cos((la1 * Math.PI) / 180) * Math.sin((la2 * Math.PI) / 180)
    - Math.sin((la1 * Math.PI) / 180) * Math.cos((la2 * Math.PI) / 180) * Math.cos(dLo);
  const b = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  return ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'][Math.round(b / 45) % 8];
}
const ARROW: Record<string, string> = { N:'↑',NE:'↗',E:'→',SE:'↘',S:'↓',SO:'↙',O:'←',NO:'↖' };
const ICONS: Record<string, string> = {
  Igreja:'⛪', Monumento:'🏛', Jardim:'🌿', Museu:'🖼', Gastronomia:'🍽',
  Arqueologia:'🏺', Desporto:'⚽', Cultura:'🎭',
};
const PONTOS = [100, 80, 60, 40, 25, 15];
const MAX = 6;

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface LocalStats { jogados: number; vitorias: number; streak: number; best: number; dist: number[]; }
interface RankRow { name: string; pts: number; jogos: number; wins: number; best: number; }
type Screen = 'welcome' | 'game' | 'ranking' | 'howto';

const LS_STATS = 'bragadle_stats_v4';
const LS_PLAYER = 'bragadle_player_v2';

// ─── FIREBASE HELPERS ────────────────────────────────────────────────────────
function playerKey(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/gi, '');
}
async function fbGetPlayer(name: string): Promise<RankRow | null> {
  try {
    const snap = await getDoc(doc(db, 'players', playerKey(name)));
    return snap.exists() ? (snap.data() as RankRow) : null;
  } catch { return null; }
}
async function fbSetPlayer(name: string, data: RankRow) {
  try { await setDoc(doc(db, 'players', playerKey(name)), { ...data, updated: serverTimestamp() }); }
  catch (e) { console.error('Firebase write error', e); }
}
async function fbHasPlayedToday(name: string, dayId: string): Promise<boolean> {
  try {
    const snap = await getDoc(doc(db, 'plays', `${playerKey(name)}_${dayId}`));
    return snap.exists();
  } catch { return false; }
}
async function fbMarkPlayed(name: string, dayId: string) {
  try { await setDoc(doc(db, 'plays', `${playerKey(name)}_${dayId}`), { ts: serverTimestamp() }); }
  catch {}
}
async function fbGetRanking(): Promise<RankRow[]> {
  try {
    const q = query(collection(db, 'players'), orderBy('pts', 'desc'), limit(50));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as RankRow);
  } catch { return []; }
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Bragadle() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [playerName, setPlayerName] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [nameError, setNameError] = useState('');

  const [alvo, setAlvo] = useState<Local | null>(null);
  const [dayId, setDayId] = useState('');
  const [tentativas, setTentativas] = useState<Local[]>([]);
  const [ganhou, setGanhou] = useState(false);
  const [fimJogo, setFimJogo] = useState(false);
  const [hintVis, setHintVis] = useState(false);
  const [query_, setQuery] = useState('');
  const [sugestoes, setSugestoes] = useState<Local[]>([]);

  const [stats, setStats] = useState<LocalStats>({ jogados:0, vitorias:0, streak:0, best:0, dist:[0,0,0,0,0,0] });
  const [ranking, setRanking] = useState<RankRow[]>([]);
  const [rankLoading, setRankLoading] = useState(false);

  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [newRowId, setNewRowId] = useState<string | null>(null);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  // ── INIT ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const day = Math.floor(Date.now() / 86_400_000);
    const id = new Date().toISOString().slice(0, 10);
    setDayId(id);
    setAlvo(LOCAIS_BRAGA[day % LOCAIS_BRAGA.length]);
    try {
      const s = localStorage.getItem(LS_STATS);
      if (s) setStats(JSON.parse(s));
      const n = localStorage.getItem(LS_PLAYER);
      if (n) { setPlayerName(n); setNameInput(n); }
    } catch {}
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setSugestoes([]);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  // ── TOAST ───────────────────────────────────────────────────────────────────
  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3800);
  }

  // ── SAVE STATS ──────────────────────────────────────────────────────────────
  function saveStats(s: LocalStats) {
    setStats(s);
    try { localStorage.setItem(LS_STATS, JSON.stringify(s)); } catch {}
  }

  // ── START GAME ──────────────────────────────────────────────────────────────
  function handleStartGame() {
    const n = nameInput.trim();
    if (!n || n.length < 2) { setNameError('Escreve o teu nome (pelo menos 2 caracteres).'); return; }
    if (n.length > 40) { setNameError('O nome não pode ter mais de 40 caracteres.'); return; }
    setNameError('');
    setPlayerName(n);
    try { localStorage.setItem(LS_PLAYER, n); } catch {}
    setScreen('game');
    setTimeout(() => inputRef.current?.focus(), 300);
  }

  // ── AUTOCOMPLETE ────────────────────────────────────────────────────────────
  function handleQueryChange(v: string) {
    setQuery(v);
    setSugestoes(
      v.trim().length < 1 ? [] :
      LOCAIS_BRAGA.filter(l =>
        l.nome.toLowerCase().includes(v.toLowerCase()) &&
        !tentativas.some(t => t.id === l.id)
      ).slice(0, 8)
    );
  }

  // ── GUESS ───────────────────────────────────────────────────────────────────
  async function guess(local: Local) {
    if (ganhou || fimJogo || !alvo) return;
    const novas = [local, ...tentativas];
    setTentativas(novas);
    setQuery('');
    setSugestoes([]);
    setNewRowId(local.id);
    setTimeout(() => setNewRowId(null), 600);

    const acertou = local.id === alvo.id;
    const esgotou = !acertou && novas.length >= MAX;

    if (acertou) {
      setGanhou(true);
      showToast('🎉 Excelente! Acertaste!', true);
      const ns: LocalStats = {
        jogados: stats.jogados + 1,
        vitorias: stats.vitorias + 1,
        streak: stats.streak + 1,
        best: Math.max(stats.streak + 1, stats.best),
        dist: stats.dist.map((v, i) => i === novas.length - 1 ? v + 1 : v),
      };
      saveStats(ns);
      submitScore(novas.length, true);
    } else if (esgotou) {
      setFimJogo(true);
      showToast(`😢 Era: ${alvo.nome}`, false);
      const ns: LocalStats = { ...stats, jogados: stats.jogados + 1, streak: 0 };
      saveStats(ns);
      submitScore(novas.length, false);
    } else {
      if (novas.length >= 3 && !hintVis) { /* hint becomes available */ }
    }
  }

  // ── FIREBASE SCORE SUBMIT ────────────────────────────────────────────────────
  async function submitScore(tries: number, won: boolean) {
    if (!playerName || scoreSubmitted) return;
    setScoreSubmitted(true);
    const alreadyPlayed = await fbHasPlayedToday(playerName, dayId);
    if (alreadyPlayed) return;
    await fbMarkPlayed(playerName, dayId);
    if (!won) return;
    const pts = PONTOS[tries - 1] ?? 0;
    const existing = await fbGetPlayer(playerName);
    await fbSetPlayer(playerName, {
      name: playerName,
      pts: (existing?.pts ?? 0) + pts,
      jogos: (existing?.jogos ?? 0) + 1,
      wins: (existing?.wins ?? 0) + 1,
      best: Math.max(existing?.best ?? 0, tries === 1 ? 100 : pts),
    });
    showToast(`+${pts} pts adicionados ao ranking!`, true);
  }

  // ── LOAD RANKING ─────────────────────────────────────────────────────────────
  async function loadRanking() {
    setRankLoading(true);
    const rows = await fbGetRanking();
    setRanking(rows);
    setRankLoading(false);
  }

  // ── SHARE ───────────────────────────────────────────────────────────────────
  function share() {
    if (!alvo) return;
    const num = Math.floor(Date.now() / 86_400_000) % LOCAIS_BRAGA.length;
    let g = `⛪ BRAGADLE #${num} — ${tentativas.length}/${MAX}\n\n`;
    [...tentativas].reverse().forEach(t => {
      const tipo = t.tipo === alvo.tipo ? '🟩' : '🟥';
      const freg = t.freguesia === alvo.freguesia ? '🟩' : '🟥';
      const sec  = t.seculo === alvo.seculo ? '🟩' : t.seculo < alvo.seculo ? '🟦' : '🟧';
      const dist = t.id === alvo.id ? '🟩' : haversine(t.lat,t.lng,alvo.lat,alvo.lng) < 2 ? '🟨' : '🟥';
      g += `${tipo}${freg}${sec}${dist}\n`;
    });
    g += '\n🏛 bragadle.vercel.app';
    navigator.clipboard.writeText(g);
    showToast('📋 Resultado copiado!', true);
  }

  // ─── COMPUTED ────────────────────────────────────────────────────────────────
  const jogoFim = ganhou || fimJogo;
  const maxDist = Math.max(...tentativas.map(t => alvo ? haversine(t.lat,t.lng,alvo.lat,alvo.lng) : 1), 1);
  const winPct  = stats.jogados > 0 ? Math.round((stats.vitorias / stats.jogados) * 100) : 0;
  const dayNum  = alvo ? Math.floor(Date.now() / 86_400_000) % LOCAIS_BRAGA.length : 0;

  // ─── LOADING ─────────────────────────────────────────────────────────────────
  if (!alvo) return (
    <div style={{ minHeight:'100vh', background:'#0c0b0e', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16, fontFamily:'system-ui' }}>
      <div style={{ fontSize:52, animation:'spin 3s linear infinite' }}>⛪</div>
      <p style={{ color:'#4a4060', fontSize:11, letterSpacing:'0.25em', textTransform:'uppercase' }}>a carregar bracara augusta</p>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <>
      {/* ── GOOGLE FONTS + CSS ───────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg:       #0c0b0e;
          --bg2:      #131118;
          --bg3:      #1a1820;
          --bg4:      #221f2a;
          --border:   #2e2a3a;
          --border2:  #3d3850;
          --text:     #f2eefc;
          --text2:    #9b96b8;
          --text3:    #5c5878;
          --gold:     #d4a84b;
          --gold2:    #f0c96a;
          --gold-dim: rgba(212,168,75,0.12);
          --gold-bd:  rgba(212,168,75,0.30);
          --red:      #c0392b;
          --red2:     #e84c3d;
          --red-dim:  rgba(192,57,43,0.14);
          --red-bd:   rgba(232,76,61,0.40);
          --green:    #27ae60;
          --green2:   #2ecc71;
          --gn-dim:   rgba(39,174,96,0.13);
          --gn-bd:    rgba(46,204,113,0.40);
          --amber:    #d68910;
          --amb-dim:  rgba(214,137,16,0.12);
          --amb-bd:   rgba(214,137,16,0.38);
          --r:        10px;
          --shadow:   0 8px 32px rgba(0,0,0,0.55);
          --font:     'DM Sans', system-ui, sans-serif;
          --display:  'Cinzel', Georgia, serif;
        }
        html, body {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: var(--font);
          font-size: 14px;
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
        }
        button { cursor: pointer; font-family: var(--font); }
        input  { font-family: var(--font); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }

        /* ─── NAV ──────────────────────────────────────────────────────────── */
        .nav {
          position: sticky; top: 0; z-index: 50;
          background: rgba(12,11,14,0.92);
          backdrop-filter: blur(16px) saturate(1.4);
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center;
          padding: 0 20px; height: 52px;
          gap: 4px;
        }
        .nav-logo {
          font-family: var(--display);
          font-size: 15px; font-weight: 900;
          letter-spacing: 0.1em;
          background: linear-gradient(90deg, var(--gold) 0%, var(--gold2) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          flex: 1;
        }
        .nav-btn {
          background: none; border: none;
          padding: 7px 14px; border-radius: 8px;
          color: var(--text3); font-size: 12px; font-weight: 500;
          letter-spacing: 0.03em;
          transition: color 0.18s, background 0.18s;
          white-space: nowrap;
        }
        .nav-btn:hover { color: var(--text); background: var(--bg3); }
        .nav-btn.active {
          color: var(--gold2);
          background: var(--gold-dim);
          border: 1px solid var(--gold-bd);
        }

        /* ─── WELCOME SCREEN ───────────────────────────────────────────────── */
        .welcome-wrap {
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 40px 16px; text-align: center;
          position: relative; overflow-x: hidden;
        }
        .welcome-glow {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,168,75,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 80% 80%, rgba(192,57,43,0.06) 0%, transparent 60%);
        }
        .welcome-lines {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(46,42,58,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(46,42,58,0.35) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
        }
        .welcome-content { position: relative; z-index: 1; max-width: 480px; width: 100%; }
        .welcome-eyebrow {
          display: inline-block;
          background: var(--gold-dim); border: 1px solid var(--gold-bd);
          color: var(--gold); font-size: 10px;
          letter-spacing: 0.22em; text-transform: uppercase;
          padding: 5px 14px; border-radius: 999px; margin-bottom: 20px;
          font-family: var(--display);
        }
        .welcome-title {
          font-family: var(--display);
          font-size: clamp(28px, 10vw, 80px);
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 1;
          word-break: normal;
          overflow-wrap: normal;
          white-space: nowrap;
          background: linear-gradient(160deg, #fff 0%, var(--gold2) 40%, var(--gold) 70%, #a0722a 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
          padding: 0 4px;
        }
        .welcome-sub {
          color: var(--text2); font-size: 14px; line-height: 1.7;
          margin-bottom: 36px; font-weight: 300;
        }
        .welcome-sub strong { color: var(--text); font-weight: 600; }
        .name-card {
          background: var(--bg2); border: 1px solid var(--border2);
          border-radius: 16px; padding: 28px 24px;
          box-shadow: var(--shadow);
        }
        .name-label {
          font-size: 11px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.12em; color: var(--text3); margin-bottom: 10px;
          text-align: left;
        }
        .name-row { display: flex; gap: 10px; }
        .name-input {
          flex: 1; background: var(--bg3); border: 1.5px solid var(--border2);
          border-radius: 10px; color: var(--text); font-size: 15px; font-weight: 500;
          padding: 13px 16px; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .name-input::placeholder { color: var(--text3); font-weight: 300; }
        .name-input:focus {
          border-color: var(--gold-bd);
          box-shadow: 0 0 0 3px rgba(212,168,75,0.1);
        }
        .name-error { color: var(--red2); font-size: 11px; text-align: left; margin-top: 8px; }
        .start-btn {
          background: linear-gradient(135deg, #b8860b 0%, var(--gold) 50%, var(--gold2) 100%);
          border: none; border-radius: 10px;
          color: #1a1200; font-size: 13px; font-weight: 700;
          padding: 13px 22px; letter-spacing: 0.06em; text-transform: uppercase;
          transition: opacity 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .start-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .welcome-hint {
          margin-top: 14px; font-size: 11px; color: var(--text3); text-align: left;
          line-height: 1.6;
        }
        .pts-preview {
          display: grid; grid-template-columns: repeat(6,1fr); gap: 6px; margin-top: 20px;
        }
        .pts-cell {
          background: var(--bg3); border: 1px solid var(--border);
          border-radius: 8px; padding: 10px 4px; text-align: center;
        }
        .pts-v { font-size: 17px; font-weight: 800; }
        .pts-l { font-size: 9px; color: var(--text3); margin-top: 2px; letter-spacing: 0.04em; }

        /* ─── GAME SCREEN ──────────────────────────────────────────────────── */
        .game-wrap { max-width: 780px; margin: 0 auto; padding: 28px 20px 64px; }
        .game-header { text-align: center; margin-bottom: 28px; position: relative; }
        .game-header::after {
          content: '';
          position: absolute; bottom: -16px; left: 50%; transform: translateX(-50%);
          width: 60px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold-bd), transparent);
        }
        .game-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--gold-dim); border: 1px solid var(--gold-bd);
          color: var(--gold); font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase;
          padding: 5px 14px; border-radius: 999px; margin-bottom: 16px;
          font-family: var(--display);
        }
        .game-title {
          font-family: var(--display);
          font-size: clamp(36px, 10vw, 68px); font-weight: 900;
          letter-spacing: -0.02em; line-height: 1;
          word-break: break-word; overflow-wrap: anywhere;
          background: linear-gradient(160deg, #fff 0%, var(--gold2) 45%, var(--gold) 75%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px; padding: 0 4px;
        }
        .game-sub { color: var(--text2); font-size: 13px; font-weight: 300; }
        .game-player {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--bg3); border: 1px solid var(--border2);
          border-radius: 999px; padding: 5px 14px;
          font-size: 12px; color: var(--text2); margin-top: 12px;
        }
        .game-player strong { color: var(--gold2); font-weight: 600; }

        /* ─── ATTEMPT DOTS ─────────────────────────────────────────────────── */
        .attempt-bar { display: flex; gap: 7px; justify-content: center; margin: 20px 0; }
        .adot {
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--border2); border: 1px solid var(--border);
          transition: background 0.3s, border-color 0.3s, transform 0.3s;
        }
        .adot.used { background: var(--red); border-color: var(--red-bd); }
        .adot.win  { background: var(--green2); border-color: var(--gn-bd); transform: scale(1.25); }

        /* ─── STATS STRIP ──────────────────────────────────────────────────── */
        .stats-strip {
          display: grid; grid-template-columns: repeat(4,1fr);
          gap: 10px; margin-bottom: 24px;
        }
        .stat-card {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 12px; padding: 14px 10px; text-align: center;
          transition: border-color 0.2s;
        }
        .stat-card:hover { border-color: var(--border2); }
        .stat-v { font-size: 24px; font-weight: 800; line-height: 1; font-variant-numeric: tabular-nums; }
        .stat-l { font-size: 9px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text3); margin-top: 4px; }

        /* ─── INPUT ────────────────────────────────────────────────────────── */
        .input-wrap { position: relative; max-width: 560px; margin: 0 auto 16px; }
        .input-box {
          display: flex; align-items: center;
          background: var(--bg2); border: 1.5px solid var(--border2);
          border-radius: 14px; padding: 0 16px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-box:focus-within {
          border-color: var(--gold-bd);
          box-shadow: 0 0 0 4px rgba(212,168,75,0.08);
        }
        .input-ico { color: var(--text3); font-size: 16px; flex-shrink: 0; }
        .input-f {
          flex: 1; background: transparent; border: none; outline: none;
          color: var(--text); font-size: 14px; font-weight: 400;
          padding: 14px 12px;
        }
        .input-f::placeholder { color: var(--text3); }
        .input-badge {
          font-size: 11px; font-variant-numeric: tabular-nums;
          color: var(--text3); background: var(--bg3);
          border: 1px solid var(--border); border-radius: 6px;
          padding: 3px 9px; flex-shrink: 0; font-weight: 600;
        }

        /* ─── DROPDOWN ─────────────────────────────────────────────────────── */
        .dropdown {
          position: absolute; top: calc(100% + 6px); left: 0; width: 100%;
          background: var(--bg2); border: 1px solid var(--border2);
          border-radius: 12px; overflow: hidden;
          box-shadow: 0 24px 64px rgba(0,0,0,0.8), 0 0 0 1px rgba(212,168,75,0.08);
          z-index: 60; max-height: 280px; overflow-y: auto;
        }
        .dd-item {
          width: 100%; border: none; background: none;
          padding: 11px 16px; display: flex; align-items: center; gap: 12px;
          text-align: left; border-bottom: 1px solid var(--border);
          cursor: pointer; transition: background 0.15s;
        }
        .dd-item:last-child { border-bottom: none; }
        .dd-item:hover { background: rgba(212,168,75,0.06); }
        .dd-item:hover .dd-name { color: var(--gold2); }
        .dd-ico {
          width: 36px; height: 36px; border-radius: 9px;
          background: var(--bg3); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; flex-shrink: 0;
        }
        .dd-name { color: var(--text); font-size: 13px; font-weight: 600; transition: color 0.15s; }
        .dd-tags { display: flex; gap: 5px; margin-top: 3px; }
        .dd-tag {
          font-size: 10px; color: var(--text3);
          background: var(--bg3); border: 1px solid var(--border);
          padding: 1px 7px; border-radius: 4px; font-weight: 500;
        }

        /* ─── HINT ─────────────────────────────────────────────────────────── */
        .hint-wrap { max-width: 560px; margin: 0 auto 16px; text-align: center; }
        .hint-btn {
          background: none; border: 1px solid var(--amb-bd);
          border-radius: 8px; color: var(--amber); font-size: 12px;
          padding: 7px 16px; transition: background 0.15s;
        }
        .hint-btn:hover { background: var(--amb-dim); }
        .hint-box {
          background: var(--amb-dim); border: 1px solid var(--amb-bd);
          border-radius: 12px; padding: 16px 18px;
          font-size: 13px; color: #f0c060; line-height: 1.8; text-align: left;
          font-style: italic; word-wrap: break-word; overflow-wrap: break-word;
          margin-top: 8px;
        }
        .hint-box strong { color: var(--gold2); font-style: normal; font-weight: 700; display: block; margin-bottom: 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; }

        /* ─── GRID ─────────────────────────────────────────────────────────── */
        .grid-outer { overflow-x: auto; padding-bottom: 6px; }
        .grid-inner { min-width: 600px; }
        .grid-head {
          display: grid; grid-template-columns: 2.2fr 1.1fr 1.3fr 1.1fr 1.3fr;
          gap: 6px; padding: 0 3px; margin-bottom: 8px;
        }
        .gh-cell {
          font-size: 9px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.14em; color: var(--text3); text-align: center;
        }
        .gh-cell:first-child { text-align: left; padding-left: 4px; }
        .guess-rows { display: flex; flex-direction: column; gap: 6px; }

        /* ─── GUESS ROW ────────────────────────────────────────────────────── */
        .grow {
          display: grid; grid-template-columns: 2.2fr 1.1fr 1.3fr 1.1fr 1.3fr;
          gap: 6px; animation: rowIn 0.4s cubic-bezier(0.34,1.4,0.64,1) both;
        }
        @keyframes rowIn {
          from { opacity: 0; transform: translateY(-14px) scale(0.97); }
          to   { opacity: 1; transform: none; }
        }
        .cell {
          border-radius: 10px; padding: 10px 8px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          min-height: 62px; border: 1px solid var(--border);
          background: var(--bg2); position: relative; overflow: hidden;
        }
        /* Subtle top-light shimmer */
        .cell::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
        }
        .cell.ok  { background: var(--gn-dim);  border-color: var(--gn-bd); }
        .cell.bad { background: var(--red-dim);  border-color: rgba(192,57,43,0.3); }
        .cell.warm{ background: var(--amb-dim);  border-color: var(--amb-bd); }

        .cell-main { font-size: 12px; font-weight: 700; text-align: center; line-height: 1.35; color: var(--text); }
        .cell-main.g { color: var(--green2); }
        .cell-main.r { color: #f07070; }
        .cell-main.a { color: #f0c040; }
        .cell-sub {
          font-size: 10px; color: var(--text3); margin-top: 2px;
          text-align: center; line-height: 1.3;
        }
        .pbar {
          position: absolute; bottom: 0; left: 0; height: 2px;
          border-radius: 0 2px 2px 0;
          transition: width 0.6s ease;
        }

        /* ─── EMPTY SLOTS ──────────────────────────────────────────────────── */
        .empty-row {
          display: grid; grid-template-columns: 2.2fr 1.1fr 1.3fr 1.1fr 1.3fr;
          gap: 6px;
        }
        .empty-cell {
          height: 62px; border-radius: 10px;
          border: 1px dashed rgba(46,42,58,0.8); background: transparent;
        }

        /* ─── END CARD ─────────────────────────────────────────────────────── */
        .end-card {
          max-width: 560px; margin: 0 auto 24px;
          background: var(--bg2); border: 1px solid var(--border2);
          border-radius: 16px; padding: 24px;
          border-top: 3px solid;
          animation: scaleUp 0.35s cubic-bezier(0.16,1,0.3,1) forwards;
          box-shadow: var(--shadow);
        }
        @keyframes scaleUp { from{opacity:0;transform:scale(0.94)} to{opacity:1;transform:none} }
        .end-card.win  { border-top-color: var(--green2); }
        .end-card.lose { border-top-color: var(--red2); }
        .end-title { font-size: 20px; font-weight: 800; margin-bottom: 4px; font-family: var(--display); letter-spacing: 0.02em; }
        .end-meta  { font-size: 12px; color: var(--text2); margin-bottom: 16px; }
        .end-fact  {
          background: var(--bg3); border: 1px solid var(--border);
          border-left: 3px solid var(--gold-bd);
          border-radius: 0 10px 10px 0;
          padding: 14px 16px; font-size: 12px; color: var(--text2);
          line-height: 1.75; margin-bottom: 20px; font-style: italic;
        }
        .share-btn {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, #8b0000 0%, var(--red) 50%, var(--red2) 100%);
          border: none; border-radius: 10px;
          color: #fff; font-size: 12px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          transition: opacity 0.2s, transform 0.15s;
        }
        .share-btn:hover { opacity: 0.87; transform: translateY(-1px); }

        /* ─── ZERO STATE ───────────────────────────────────────────────────── */
        .zero {
          text-align: center; padding: 40px 0;
          color: var(--text3);
        }
        .zero-ico { font-size: 40px; opacity: 0.3; margin-bottom: 14px; }
        .zero-txt { font-size: 13px; color: var(--text2); margin-bottom: 4px; }

        /* ─── LEGEND ───────────────────────────────────────────────────────── */
        .legend {
          display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;
          font-size: 10px; color: var(--text3); margin-top: 36px;
          padding-top: 20px; border-top: 1px solid var(--border);
          letter-spacing: 0.06em; font-weight: 500;
        }

        /* ─── RANKING SCREEN ───────────────────────────────────────────────── */
        .rank-wrap { max-width: 680px; margin: 0 auto; padding: 28px 20px 64px; }
        .rank-hero { text-align: center; margin-bottom: 28px; }
        .rank-title { font-family: var(--display); font-size: 32px; font-weight: 900; margin-bottom: 6px; letter-spacing: 0.02em; }
        .rank-sub { font-size: 13px; color: var(--text2); font-weight: 300; }
        .rank-col-h {
          display: grid; grid-template-columns: 44px 1fr 80px 64px 72px;
          gap: 8px; padding: 6px 16px; margin-bottom: 8px;
        }
        .rch { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text3); text-align: center; }
        .rch:nth-child(2) { text-align: left; }
        .rank-row {
          display: grid; grid-template-columns: 44px 1fr 80px 64px 72px;
          gap: 8px; align-items: center;
          padding: 13px 16px; border-radius: 12px;
          background: var(--bg2); border: 1px solid var(--border);
          margin-bottom: 6px;
          transition: border-color 0.2s, transform 0.15s;
        }
        .rank-row:hover { border-color: var(--border2); transform: translateX(2px); }
        .rank-row.top1 { border-color: var(--gold-bd); background: rgba(212,168,75,0.05); }
        .rank-row.top2 { border-color: rgba(192,192,192,0.3); }
        .rank-row.top3 { border-color: rgba(205,127,50,0.3); }
        .rank-row.mine { border-color: var(--red-bd); background: var(--red-dim); }
        .rank-pos { font-size: 18px; font-weight: 900; text-align: center; }
        .rank-name { font-size: 14px; font-weight: 600; color: var(--text); }
        .rank-name.mine { color: var(--gold2); }
        .rank-name .you { font-size: 10px; color: var(--red2); font-weight: 400; margin-left: 4px; }
        .rank-stat { text-align: center; }
        .rank-stat-v { font-size: 15px; font-weight: 800; color: var(--text); }
        .rank-stat-l { font-size: 9px; color: var(--text3); margin-top: 1px; letter-spacing: 0.06em; }
        .rank-empty { text-align: center; color: var(--text2); font-size: 13px; padding: 48px 0; }

        /* ─── HOW TO SCREEN ────────────────────────────────────────────────── */
        .how-wrap { max-width: 520px; margin: 0 auto; padding: 28px 20px 64px; }
        .how-item { display: flex; gap: 14px; margin-bottom: 18px; align-items: flex-start; }
        .how-ico {
          width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center; font-size: 16px;
          border: 1px solid var(--border);
        }
        .how-t { font-size: 13px; color: var(--text2); line-height: 1.65; }
        .how-t strong { color: var(--text); display: block; margin-bottom: 2px; font-size: 14px; }

        /* ─── TOAST ────────────────────────────────────────────────────────── */
        .toast {
          position: fixed; top: 16px; left: 50%; transform: translateX(-50%);
          z-index: 300; padding: 10px 20px; border-radius: 999px;
          font-size: 13px; font-weight: 600; white-space: nowrap;
          pointer-events: none;
          animation: toastIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        @keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(-10px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
        .toast.ok  { background:rgba(39,174,96,0.15);  border:1px solid rgba(46,204,113,0.4); color:#6ee7a0; }
        .toast.err { background:rgba(192,57,43,0.15);  border:1px solid rgba(232,76,61,0.4);  color:#fca0a0; }

        /* ─── DIVIDER ──────────────────────────────────────────────────────── */
        .divider {
          height: 1px; max-width: 560px; margin: 0 auto 20px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
        }

        /* ─── RESPONSIVE ───────────────────────────────────────────────────── */
        @media (max-width: 600px) {
          .grid-head, .grow, .empty-row {
            grid-template-columns: 1.8fr 1fr 1.1fr 1fr 1.1fr;
            gap: 4px;
          }
          .cell { min-height: 54px; padding: 8px 5px; }
          .cell-main { font-size: 11px; }
          .rank-col-h, .rank-row {
            grid-template-columns: 36px 1fr 70px 54px 60px;
            gap: 6px;
          }
          .stats-strip { grid-template-columns: repeat(2,1fr); }
        }
      `}</style>

      {/* TOAST */}
      {toast && <div className={`toast ${toast.ok ? 'ok' : 'err'}`}>{toast.msg}</div>}

      {/* ════════════════════════════════════════════════════════════════════════
          WELCOME SCREEN — name-first gate
      ════════════════════════════════════════════════════════════════════════ */}
      {screen === 'welcome' && (
        <div className="welcome-wrap">
          <div className="welcome-glow" />
          <div className="welcome-lines" />
          <div className="welcome-content">
            <div className="welcome-eyebrow">⛪ Cidade dos Arcebispos · Edição {new Date().getFullYear()}</div>
            <div className="welcome-title">BRAGADLE</div>
            <div className="welcome-sub">
              O jogo diário de <strong>Braga</strong>.<br />
              Descobre o local secreto em 6 tentativas e compete com os teus colegas no ranking global.
            </div>

            <div className="name-card">
              <div className="name-label">✍ Primeiro, diz-nos o teu nome</div>
              <div className="name-row">
                <input
                  type="text"
                  className="name-input"
                  value={nameInput}
                  onChange={e => { setNameInput(e.target.value); setNameError(''); }}
                  placeholder="Ex: Hugo Barros"
                  maxLength={40}
                  onKeyDown={e => e.key === 'Enter' && handleStartGame()}
                  autoFocus
                />
                <button className="start-btn" onClick={handleStartGame}>
                  Jogar →
                </button>
              </div>
              {nameError && <div className="name-error">⚠ {nameError}</div>}
              <div className="welcome-hint">
                O teu nome identifica-te no ranking global. Usa sempre o mesmo nome para acumular pontos. Não é necessário registo.
              </div>

              <div style={{ marginTop: 22, borderTop: '1px solid var(--border)', paddingTop: 18 }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text3)', marginBottom: 10 }}>
                  Sistema de Pontos
                </div>
                <div className="pts-preview">
                  {[['100','1ª'],['80','2ª'],['60','3ª'],['40','4ª'],['25','5ª'],['15','6ª']].map(([v,l]) => (
                    <div key={l} className="pts-cell">
                      <div className="pts-v" style={{ color: l==='1ª' ? 'var(--gold2)' : 'var(--text)' }}>{v}</div>
                      <div className="pts-l">{l} tent.</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="nav-btn" onClick={() => { setScreen('ranking'); loadRanking(); }}>
                🏆 Ver Ranking
              </button>
              <button className="nav-btn" onClick={() => setScreen('howto')}>
                ❓ Como Jogar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          NAVIGATION (shown when not on welcome)
      ════════════════════════════════════════════════════════════════════════ */}
      {screen !== 'welcome' && (
        <nav className="nav">
          <div className="nav-logo">BRAGADLE</div>
          <button className={`nav-btn${screen==='game'?' active':''}`} onClick={() => setScreen('game')}>
            🏛 Jogo
          </button>
          <button
            className={`nav-btn${screen==='ranking'?' active':''}`}
            onClick={() => { setScreen('ranking'); loadRanking(); }}
          >
            🏆 Ranking
          </button>
          <button className={`nav-btn${screen==='howto'?' active':''}`} onClick={() => setScreen('howto')}>
            ❓ Ajuda
          </button>
        </nav>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          GAME SCREEN
      ════════════════════════════════════════════════════════════════════════ */}
      {screen === 'game' && (
        <div className="game-wrap">
          {/* Header */}
          <div className="game-header">
            <div className="game-eyebrow">
              <span>⛪</span>
              <span>Puzzle #{dayNum} · {new Date().toLocaleDateString('pt-PT',{day:'numeric',month:'long'})}</span>
            </div>
            <div className="game-title">BRAGADLE</div>
            <div className="game-sub">
              Descobre o local secreto de Braga. {MAX - tentativas.length} {MAX - tentativas.length === 1 ? 'tentativa restante' : 'tentativas restantes'}.
            </div>
            <div className="game-player">
              <span>👤</span>
              <span>A jogar como <strong>{playerName}</strong></span>
              <span style={{ color:'var(--text3)', margin:'0 4px' }}>·</span>
              <button
                onClick={() => setScreen('welcome')}
                style={{ background:'none', border:'none', color:'var(--text3)', fontSize:10, cursor:'pointer', textDecoration:'underline' }}
              >
                mudar
              </button>
            </div>

            {/* Attempt dots */}
            <div className="attempt-bar">
              {Array.from({ length: MAX }).map((_, i) => {
                const t = tentativas[MAX - 1 - i];
                return <div key={i} className={`adot${t ? (t.id === alvo.id ? ' win' : ' used') : ''}`} />;
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="stats-strip">
            <div className="stat-card">
              <div className="stat-v">{stats.jogados}</div>
              <div className="stat-l">Jogados</div>
            </div>
            <div className="stat-card">
              <div className="stat-v" style={{ color:'var(--green2)' }}>{winPct > 0 ? winPct+'%' : '—'}</div>
              <div className="stat-l">Vitórias</div>
            </div>
            <div className="stat-card">
              <div className="stat-v" style={{ color:'#f97316' }}>{stats.streak}🔥</div>
              <div className="stat-l">Streak</div>
            </div>
            <div className="stat-card">
              <div className="stat-v" style={{ color:'var(--gold2)' }}>{stats.best}👑</div>
              <div className="stat-l">Melhor</div>
            </div>
          </div>

          {/* End card */}
          {jogoFim && (
            <div className={`end-card ${ganhou ? 'win' : 'lose'}`}>
              <div className="end-title">{ganhou ? '🎉 Vitória!' : '💀 Fim de Jogo!'}</div>
              <div className="end-meta">
                O local era{' '}
                <strong style={{ color: ganhou ? 'var(--green2)' : 'var(--red2)' }}>{alvo.nome}</strong>
                {' '}— {alvo.tipo} · {alvo.freguesia}
                {ganhou && (
                  <span style={{ marginLeft: 8, background:'var(--gold-dim)', border:'1px solid var(--gold-bd)', color:'var(--gold2)', fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:5, fontVariantNumeric:'tabular-nums' }}>
                    +{PONTOS[tentativas.length - 1]} pts
                  </span>
                )}
              </div>
              <div className="end-fact">{alvo.curiosidade}</div>
              <div style={{ display:'flex', gap:10 }}>
                <button className="share-btn" onClick={share}>Partilhar 🚀</button>
                <button
                  onClick={() => { setScreen('ranking'); loadRanking(); }}
                  style={{ background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:10, color:'var(--text2)', fontSize:12, fontWeight:600, padding:'14px 18px', cursor:'pointer', transition:'background .2s' }}
                >
                  🏆 Ranking
                </button>
              </div>
            </div>
          )}

          {/* Input */}
          {!jogoFim && (
            <div ref={dropRef} className="input-wrap">
              <div className="input-box">
                <span className="input-ico">🔍</span>
                <input
                  ref={inputRef}
                  type="text"
                  className="input-f"
                  value={query_}
                  onChange={e => handleQueryChange(e.target.value)}
                  placeholder="Digita um local de Braga..."
                  onKeyDown={e => {
                    if (e.key === 'Enter' && sugestoes.length > 0) guess(sugestoes[0]);
                    if (e.key === 'Escape') setSugestoes([]);
                  }}
                />
                <span className="input-badge">{MAX - tentativas.length}/{MAX}</span>
              </div>
              {sugestoes.length > 0 && (
                <div className="dropdown">
                  {sugestoes.map(l => (
                    <button key={l.id} className="dd-item" onClick={() => guess(l)}>
                      <div className="dd-ico">{ICONS[l.tipo] ?? '📍'}</div>
                      <div style={{ flex:1, overflow:'hidden' }}>
                        <div className="dd-name">{l.nome}</div>
                        <div className="dd-tags">
                          <span className="dd-tag">{l.tipo}</span>
                          <span className="dd-tag">{l.freguesia}</span>
                          <span className="dd-tag">Séc. {l.seculo}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Hint */}
          {!jogoFim && tentativas.length >= 3 && (
            <div className="hint-wrap">
              {!hintVis ? (
                <button className="hint-btn" onClick={() => setHintVis(true)}>
                  💡 Desbloquear pista histórica
                </button>
              ) : (
                <div className="hint-box">
                  <strong>Pista Histórica —</strong>{' '}
                  {alvo.curiosidade}
                </div>
              )}
            </div>
          )}

          {/* Grid */}
          {tentativas.length > 0 && (
            <div className="grid-outer">
              <div className="grid-inner">
                <div className="grid-head">
                  <div className="gh-cell" style={{ textAlign:'left' }}>📍 Local</div>
                  <div className="gh-cell">📂 Categoria</div>
                  <div className="gh-cell">🏡 Freguesia</div>
                  <div className="gh-cell">⏳ Século</div>
                  <div className="gh-cell">🧭 Distância</div>
                </div>
                <div className="guess-rows">
                  {tentativas.map((t, idx) => {
                    const isAlvo = t.id === alvo.id;
                    const mT = t.tipo === alvo.tipo;
                    const mF = t.freguesia === alvo.freguesia;
                    const mS = t.seculo === alvo.seculo;
                    const dist = haversine(t.lat, t.lng, alvo.lat, alvo.lng);
                    const dir  = compass(t.lat, t.lng, alvo.lat, alvo.lng);
                    const pct  = isAlvo ? 100 : Math.max(4, Math.round((1 - dist / (maxDist * 1.15)) * 100));
                    const distColor = isAlvo ? 'var(--green2)' : dist < 2 ? 'var(--amber)' : dist < 6 ? '#f07040' : 'var(--text2)';
                    const barCol = isAlvo ? 'var(--green2)' : dist < 2 ? 'var(--amber)' : 'var(--red2)';

                    return (
                      <div
                        key={t.id}
                        className="grow"
                        style={{ animationDelay:`${idx * 0.03}s` }}
                      >
                        {/* Nome */}
                        <div className={`cell${isAlvo ? ' ok' : ''}`}>
                          <div className={`cell-main${isAlvo ? ' g' : ''}`} style={{ fontSize:11 }}>
                            {t.nome}
                          </div>
                          {isAlvo && <div className="cell-sub" style={{ color:'var(--green2)' }}>✓ Correto!</div>}
                        </div>
                        {/* Tipo */}
                        <div className={`cell${mT ? ' ok' : ' bad'}`}>
                          <div style={{ fontSize:18, lineHeight:1 }}>{ICONS[t.tipo] ?? '?'}</div>
                          <div className={`cell-sub${mT ? '' : ''}`} style={{ color: mT ? 'var(--green2)' : 'var(--text2)', marginTop:4, fontSize:10 }}>
                            {t.tipo}
                          </div>
                        </div>
                        {/* Freguesia */}
                        <div className={`cell${mF ? ' ok' : ' bad'}`}>
                          <div className={`cell-main${mF ? ' g' : ''}`} style={{ fontSize:11, color: mF ? 'var(--green2)' : 'var(--text)' }}>
                            {t.freguesia}
                          </div>
                        </div>
                        {/* Século */}
                        <div className={`cell${mS ? ' ok' : ' bad'}`}>
                          <div className={`cell-main${mS ? ' g' : ''}`} style={{ color: mS ? 'var(--green2)' : 'var(--text)' }}>
                            Séc.&nbsp;{t.seculo}
                          </div>
                          {!mS && (
                            <div className="cell-sub">
                              {t.seculo < alvo.seculo ? '⬆ mais rec.' : '⬇ mais ant.'}
                            </div>
                          )}
                        </div>
                        {/* Distância */}
                        <div
                          className={`cell${isAlvo ? ' ok' : dist < 2 ? ' warm' : ''}`}
                          style={isAlvo ? { background:'var(--gn-dim)', borderColor:'var(--gn-bd)' }
                            : dist < 2 ? { background:'var(--amb-dim)', borderColor:'var(--amb-bd)' } : {}}
                        >
                          {isAlvo ? (
                            <div style={{ fontSize:20 }}>📍</div>
                          ) : (
                            <>
                              <div className="cell-main" style={{ color:distColor }}>{dist} km</div>
                              <div className="cell-sub" style={{ color:distColor, fontSize:11, fontWeight:600 }}>
                                {ARROW[dir]}&nbsp;{dir}
                              </div>
                            </>
                          )}
                          <div className="pbar" style={{ width:`${pct}%`, background:barCol }} />
                        </div>
                      </div>
                    );
                  })}

                  {/* Empty slots */}
                  {!jogoFim && Array.from({ length: MAX - tentativas.length }).map((_, i) => (
                    <div key={i} className="empty-row" style={{ marginTop: i > 0 ? 0 : 0 }}>
                      {Array.from({ length:5 }).map((_,j) => <div key={j} className="empty-cell" />)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Zero state */}
          {tentativas.length === 0 && !jogoFim && (
            <div className="zero">
              <div className="zero-ico">🏛</div>
              <div className="zero-txt">Começa a escrever o nome de um local de Braga...</div>
              <div style={{ fontSize:11, color:'var(--text3)', marginTop:4 }}>{LOCAIS_BRAGA.length} locais · {MAX} tentativas</div>
            </div>
          )}

          <div className="legend">
            <span>🟩 Correto</span>
            <span>🟥 Errado</span>
            <span>⬆⬇ Cronologia</span>
            <span>🟨 &lt;2 km</span>
            <span>🧭 Bússola real</span>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          RANKING SCREEN
      ════════════════════════════════════════════════════════════════════════ */}
      {screen === 'ranking' && (
        <div className="rank-wrap">
          <div className="rank-hero">
            <div className="rank-title">🏆 Ranking Global</div>
            <div className="rank-sub">
              Pontos acumulados de todos os dias · Jogas como <strong style={{ color:'var(--gold2)' }}>{playerName || '—'}</strong>
            </div>
            {!playerName && (
              <button
                className="start-btn"
                style={{ marginTop:12 }}
                onClick={() => setScreen('welcome')}
              >
                Definir Nome para Jogar →
              </button>
            )}
          </div>

          <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:12, maxWidth:680, margin:'0 auto 12px' }}>
            <button
              onClick={loadRanking}
              style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, color:'var(--text2)', fontSize:12, padding:'7px 14px', cursor:'pointer', fontFamily:'var(--font)' }}
            >
              ↻ Atualizar
            </button>
          </div>

          {rankLoading && <div className="rank-empty">A carregar o ranking Firebase...</div>}

          {!rankLoading && ranking.length === 0 && (
            <div className="rank-empty">
              <div style={{ fontSize:36, marginBottom:14, opacity:.4 }}>🏆</div>
              Ainda não há jogadores no ranking.<br />
              <span style={{ fontSize:12, color:'var(--text3)' }}>Joga e ganha para aparecer aqui!</span>
            </div>
          )}

          {!rankLoading && ranking.length > 0 && (
            <>
              <div className="rank-col-h">
                <div className="rch">#</div>
                <div className="rch" style={{ textAlign:'left' }}>Jogador</div>
                <div className="rch">Pontos</div>
                <div className="rch">Jogos</div>
                <div className="rch">% Vitória</div>
              </div>
              {ranking.map((e, i) => {
                const isMe = playerName && e.name.toLowerCase() === playerName.toLowerCase();
                const winP = e.jogos > 0 ? Math.round((e.wins / e.jogos) * 100) : 0;
                const medals = ['🥇','🥈','🥉'];
                return (
                  <div
                    key={e.name + i}
                    className={`rank-row${i===0?' top1':i===1?' top2':i===2?' top3':''}${isMe?' mine':''}`}
                  >
                    <div className="rank-pos" style={{ color: i===0?'var(--gold2)':i===1?'#c0c0c0':i===2?'#cd7f32':'var(--text3)' }}>
                      {i < 3 ? medals[i] : i+1}
                    </div>
                    <div className={`rank-name${isMe?' mine':''}`}>
                      {e.name}
                      {isMe && <span className="you"> (tu)</span>}
                    </div>
                    <div className="rank-stat">
                      <div className="rank-stat-v" style={{ color:'var(--gold2)' }}>{e.pts}</div>
                      <div className="rank-stat-l">pts</div>
                    </div>
                    <div className="rank-stat">
                      <div className="rank-stat-v">{e.jogos}</div>
                      <div className="rank-stat-l">jogos</div>
                    </div>
                    <div className="rank-stat">
                      <div className="rank-stat-v">{winP}%</div>
                      <div className="rank-stat-l">vitória</div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          HOW TO SCREEN
      ════════════════════════════════════════════════════════════════════════ */}
      {screen === 'howto' && (
        <div className="how-wrap">
          <div style={{ textAlign:'center', paddingBottom:24 }}>
            <div style={{ fontFamily:'var(--display)', fontSize:28, fontWeight:900, marginBottom:6, letterSpacing:'0.02em' }}>Como Jogar</div>
            <div style={{ fontSize:13, color:'var(--text2)', fontWeight:300 }}>
              Descobre o local secreto de Braga em 6 tentativas.
            </div>
          </div>
          {[
            { ico:'✍', bg:'var(--gold-dim)', title:'O teu nome primeiro', txt:'Antes de jogar defines o teu nome. É assim que apareces no ranking global. Usa sempre o mesmo nome para acumular pontos ao longo dos dias.' },
            { ico:'🔍', bg:'var(--bg3)', title:'Pesquisa o local', txt:'Escreve o nome de qualquer local de Braga na caixa de pesquisa e seleciona da lista de sugestões.' },
            { ico:'🟩', bg:'var(--gn-dim)', title:'Verde = Correto', txt:'Categoria, freguesia ou século verdes significam que essa caraterística coincide com o local alvo.' },
            { ico:'🟥', bg:'var(--red-dim)', title:'Vermelho = Errado', txt:'Essa caraterística é diferente do local alvo. Usa essa informação para refinar a próxima tentativa.' },
            { ico:'⏳', bg:'var(--amb-dim)', title:'Pista de Século', txt:'Se errares o século, a seta indica se o alvo é mais recente ⬆ (número de século maior) ou mais antigo ⬇.' },
            { ico:'🧭', bg:'var(--bg3)', title:'Distância e Bússola', txt:'A célula de distância mostra quantos km te separam do alvo e em que direção cardeal ele fica. Amarelo = menos de 2 km, estás quase!' },
            { ico:'💡', bg:'var(--amb-dim)', title:'Pista Histórica', txt:'Após 3 tentativas falhadas podes desbloquear uma curiosidade histórica sobre o local secreto.' },
            { ico:'🏆', bg:'var(--gold-dim)', title:'Ranking Firebase', txt:'Os pontos são guardados online e são acessíveis a toda a gente. 1ª tentativa = 100 pts, diminuindo com cada tentativa. Só conta uma vitória por dia.' },
          ].map(h => (
            <div key={h.title} className="how-item">
              <div className="how-ico" style={{ background:h.bg }}>{h.ico}</div>
              <div className="how-t"><strong>{h.title}</strong>{h.txt}</div>
            </div>
          ))}

          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:16, marginTop:8 }}>
            <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--gold)', marginBottom:10 }}>Sistema de Pontos</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:6 }}>
              {[['100','1ª','var(--gold2)'],['80','2ª','var(--text)'],['60','3ª','var(--text)'],['40','4ª','var(--text)'],['25','5ª','var(--text)'],['15','6ª','var(--text)']].map(([v,l,c]) => (
                <div key={l} style={{ background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:8, padding:'10px 4px', textAlign:'center' }}>
                  <div style={{ fontSize:18, fontWeight:800, color:c }}>{v}</div>
                  <div style={{ fontSize:9, color:'var(--text3)', marginTop:2 }}>{l} tent.</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign:'center', marginTop:24 }}>
            <button className="start-btn" onClick={() => setScreen(playerName ? 'game' : 'welcome')}>
              {playerName ? '🏛 Jogar Agora' : '✍ Definir Nome e Jogar'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}