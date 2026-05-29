'use client';

import { useState, useEffect, useRef } from 'react';
import { LOCAIS_BRAGA, Local } from '../data/locais';

// --- FUNÇÕES MATEMÁTICAS E GEOGRÁFICAS ---

// Distância por Haversine
function calcularDistancia(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10; // Retorna com precisão de 100 metros
}

// Bússola: Calcula para onde o jogador deve andar a partir do palpite até ao alvo
function calcularDirecao(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): string {
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;

  const y = Math.sin(dLon) * Math.cos(lat2Rad);
  const x =
    Math.cos(lat1Rad) * Math.sin(lat2Rad) -
    Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
  let brng = (Math.atan2(y, x) * 180) / Math.PI;
  brng = (brng + 360) % 360;

  if (brng >= 337.5 || brng < 22.5) return '⬆️ N';
  if (brng >= 22.5 && brng < 67.5) return '↗️ NE';
  if (brng >= 67.5 && brng < 112.5) return '➡️ E';
  if (brng >= 112.5 && brng < 157.5) return '↘️ SE';
  if (brng >= 157.5 && brng < 202.5) return '⬇️ S';
  if (brng >= 202.5 && brng < 247.5) return '↙️ SO';
  if (brng >= 247.5 && brng < 292.5) return '⬅️ O';
  return '↖️ NO';
}

export default function Bragadle() {
  // --- ESTADOS DO JOGO ---
  const [alvo, setAlvo] = useState<Local | null>(null);
  const [inputVal, setInputVal] = useState('');
  const [sugestoes, setSugestoes] = useState<Local[]>([]);
  const [tentativas, setTentativas] = useState<Local[]>([]);
  const [ganhou, setGanhou] = useState(false);
  const [mostrarDica, setMostrarDica] = useState(false);
  const [estatisticas, setEstatisticas] = useState({
    jogados: 0,
    vitorias: 0,
    sequencia: 0,
    melhorSeq: 0,
  });
  const [notificacao, setNotificacao] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // --- CARREGAMENTO INICIAL E PERSISTÊNCIA ---
  useEffect(() => {
    // Escolha determinística baseada no dia civil para simular jogo diário
    const diaDoAno = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24));
    const localSorteado = LOCAIS_BRAGA[diaDoAno % LOCAIS_BRAGA.length];
    setAlvo(localSorteado);

    // Carregar Estatísticas do LocalStorage
    const guardadas = localStorage.getItem('bragadle_stats');
    if (guardadas) {
      setEstatisticas(JSON.parse(guardadas));
    }
  }, []);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function escutarCliqueFora(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSugestoes([]);
      }
    }
    document.addEventListener('mousedown', escutarCliqueFora);
    return () => document.removeEventListener('mousedown', escutarCliqueFora);
  }, []);

  // --- LÓGICA DO INPUT & AUTOCOMPLETE ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setInputVal(valor);

    if (valor.trim().length > 0) {
      const filtradas = LOCAIS_BRAGA.filter(
        (local) =>
          local.nome.toLowerCase().includes(valor.toLowerCase()) &&
          !tentativas.some((t) => t.id === local.id)
      );
      setSugestoes(filtradas);
    } else {
      setSugestoes([]);
    }
  };

  const selecionarSugestao = (local: Local) => {
    processarPalpite(local);
    setInputVal('');
    setSugestoes([]);
  };

  // --- PROCESSAMENTO DA TENTATIVA ---
  const processarPalpite = (local: Local) => {
    if (ganhou) return;

    const novasTentativas = [local, ...tentativas];
    setTentativas(novasTentativas);

    if (local.id === alvo?.id) {
      setGanhou(true);
      triggerNotificacao('🎉 Excelente! Conheces Braga como ninguém!');

      // Atualizar Estatísticas
      const novasStats = {
        jogados: estatisticas.jogados + 1,
        vitorias: estatisticas.vitorias + 1,
        sequencia: estatisticas.sequencia + 1,
        melhorSeq: Math.max(estatisticas.sequencia + 1, estatisticas.melhorSeq),
      };
      setEstatisticas(novasStats);
      localStorage.setItem('bragadle_stats', JSON.stringify(novasStats));
    } else if (novasTentativas.length >= 6 && local.id !== alvo?.id) {
      triggerNotificacao(`😢 Que pena! O local secreto era: ${alvo?.nome}`);
      const novasStats = {
        ...estatisticas,
        jogados: estatisticas.jogados + 1,
        sequencia: 0,
      };
      setEstatisticas(novasStats);
      localStorage.setItem('bragadle_stats', JSON.stringify(novasStats));
    }
  };

  const triggerNotificacao = (msg: string) => {
    setNotificacao(msg);
    setTimeout(() => setNotificacao(null), 5000);
  };

  // Copiar grelha de resultado para partilha rápida social
  const copiarPartilha = () => {
    if (!alvo) return;
    let grelha = `⛪ Bragadle - 2026 (${tentativas.length}/6)\n\n`;

    [...tentativas].reverse().forEach((t) => {
      const tipo = t.tipo === alvo.tipo ? '🟩' : '🟥';
      const freg = t.freguesia === alvo.freguesia ? '🟩' : '🟥';
      const sec =
        t.seculo === alvo.seculo ? '🟩' : t.seculo < alvo.seculo ? '⬆️' : '⬇️';
      const dist = t.id === alvo.id ? '🟩' : '🔸';
      grelha += `${tipo}${freg}${sec}${dist}\n`;
    });

    grelha += '\nJoga em: https://bragadle.vercel.app';
    navigator.clipboard.writeText(grelha);
    triggerNotificacao('📋 Resultado copiado para a área de transferência!');
  };

  if (!alvo) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-sans">
        <div className="animate-pulse text-xl tracking-widest text-red-400">
          ⚡ A CARREGAR BRACARA AUGUSTA...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100 font-sans p-3 sm:p-6 selection:bg-red-500 selection:text-white">
      {/* Toast Notificação */}
      {notificacao && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-800 border border-red-500/50 px-6 py-3 rounded-xl shadow-2xl text-center font-semibold text-sm backdrop-blur-md animate-fade-in text-white">
          {notificacao}
        </div>
      )}

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* HEADER */}
        <header className="text-center my-6 sm:my-10 animate-fade-in">
          <div className="inline-block bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-full text-xs text-red-400 font-mono tracking-widest uppercase mb-3">
            Edição Turística Oficial
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 drop-shadow">
            BRAGADLE
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
            Descobre o monumento, praça, jardim ou segredo gastronómico
            escondido na Cidade dos Arcebispos.
          </p>
        </header>

        {/* DASHBOARD DE ESTATÍSTICAS */}
        <section className="w-full max-w-md bg-slate-900/60 border border-slate-800 backdrop-blur-md rounded-2xl p-4 mb-6 flex justify-around text-center shadow-lg">
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-200">
              {estatisticas.jogados}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              Jogados
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-green-400">
              {estatisticas.jogados > 0
                ? Math.round(
                    (estatisticas.vitorias / estatisticas.jogados) * 100
                  )
                : 0}
              %
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              Vitórias
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-orange-400">
              {estatisticas.sequencia} 🔥
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              Streak Ativa
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-amber-400">
              {estatisticas.melhorSeq} 👑
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              Max Streak
            </div>
          </div>
        </section>

        {/* PAINEL DE ENTRADA / INPUT */}
        {!ganhou && tentativas.length < 6 && (
          <div ref={dropdownRef} className="w-full max-w-md relative mb-8 z-30">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 flex items-center shadow-2xl focus-within:border-red-500/50 transition-all duration-300">
              <span className="pl-3 text-lg text-slate-500">🔍</span>
              <input
                type="text"
                value={inputVal}
                onChange={handleInputChange}
                placeholder="Digita um monumento ou local de Braga..."
                className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-slate-200 placeholder-slate-500 focus:outline-none"
              />
            </div>

            {/* Dropdown Customizado de Sugestões Interativas */}
            {sugestoes.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-2 bg-slate-950/95 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-40 backdrop-blur-xl max-h-60 overflow-y-auto divide-y divide-slate-900 custom-scrollbar">
                {sugestoes.map((local) => (
                  <button
                    key={local.id}
                    onClick={() => selecionarSugestao(local)}
                    className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-colors flex justify-between items-center"
                  >
                    <span className="font-medium">{local.nome}</span>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
                      {local.tipo}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* INTERFACE DE SUCESSO / FIM DE JOGO */}
        {(ganhou || tentativas.length >= 6) && (
          <div className="w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 text-center shadow-2xl mb-8 border-t-4 border-t-red-500 animate-scale-up">
            <h3 className="text-xl font-bold mb-2">
              {ganhou
                ? '🎉 Vitória Conseguida!'
                : '💀 Esgotaste as tentativas!'}
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              O local secreto era{' '}
              <span className="text-red-400 font-bold">{alvo.nome}</span>{' '}
              (Freguesia de {alvo.freguesia}).
            </p>
            <div className="bg-slate-900/80 p-3 rounded-xl text-xs text-slate-400 italic mb-5 leading-relaxed border border-slate-800">
              "{alvo.curiosidade}"
            </div>
            <button
              onClick={copiarPartilha}
              className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold py-3 px-6 rounded-xl transition duration-300 shadow-lg shadow-red-900/30 text-sm tracking-wider uppercase"
            >
              Partilhar Desempenho 🚀
            </button>
          </div>
        )}

        {/* AJUDA / BOTÃO DE PISTA DINÂMICO */}
        {!ganhou && tentativas.length >= 3 && (
          <div className="w-full max-w-md text-center mb-8">
            {!mostrarDica ? (
              <button
                onClick={() => setMostrarDica(true)}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4 tracking-wider"
              >
                💡 Estás com dificuldades? Desbloquear Pista Histórica
              </button>
            ) : (
              <div className="bg-amber-500/5 border border-amber-500/20 text-amber-300 p-4 rounded-xl text-xs leading-relaxed max-w-sm mx-auto animate-fade-in">
                <strong>Pista:</strong> {alvo.curiosidade.split(',')[0]}...
              </div>
            )}
          </div>
        )}

        {/* GRELHA COMPACTA DE FEEDBACK (Estilo Wordle/Pokedle Avançado) */}
        <div className="w-full max-w-3xl overflow-x-auto pb-4 px-1 rounded-xl">
          <div className="grid grid-cols-5 gap-2 sm:gap-3 text-center text-[11px] sm:text-xs font-bold tracking-wider uppercase text-slate-500 min-w-[580px] px-2 mb-3">
            <div>📍 Local Turístico</div>
            <div>📂 Categoria</div>
            <div>🏡 Freguesia</div>
            <div>⏳ Época / Séc.</div>
            <div>🧭 Proximidade</div>
          </div>

          <div className="flex flex-col gap-2.5 min-w-[580px] px-1">
            {tentativas.map((t) => {
              const éAlvo = t.id === alvo.id;
              const éMesmoTipo = t.tipo === alvo.tipo;
              const éMesmaFreguesia = t.freguesia === alvo.freguesia;
              const éMesmoSeculo = t.seculo === alvo.seculo;

              const dist = calcularDistancia(t.lat, t.lng, alvo.lat, alvo.lng);
              const bússola = calcularDirecao(t.lat, t.lng, alvo.lat, alvo.lng);

              return (
                <div
                  key={t.id}
                  className="grid grid-cols-5 gap-2 sm:gap-3 text-center text-xs font-medium animate-row-pop"
                >
                  {/* Nome do Local */}
                  <div
                    className={`p-3.5 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                      éAlvo
                        ? 'bg-green-500/20 border-green-500 text-green-300 shadow-md shadow-green-950/20 font-bold'
                        : 'bg-slate-900/90 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="truncate max-w-[110px]" title={t.nome}>
                      {t.nome}
                    </span>
                  </div>

                  {/* Tipo / Categoria */}
                  <div
                    className={`p-3.5 rounded-xl flex flex-col items-center justify-center border text-[10px] sm:text-xs font-semibold ${
                      éMesmoTipo
                        ? 'bg-green-500/20 border-green-500 text-green-300 shadow-inner'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}
                  >
                    <span>{t.tipo}</span>
                  </div>

                  {/* Freguesia */}
                  <div
                    className={`p-3.5 rounded-xl flex items-center justify-center border text-[10px] sm:text-xs font-semibold ${
                      éMesmaFreguesia
                        ? 'bg-green-500/20 border-green-500 text-green-300'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}
                  >
                    <span className="truncate max-w-[90px]" title={t.freguesia}>
                      {t.freguesia}
                    </span>
                  </div>

                  {/* Século */}
                  <div
                    className={`p-3.5 rounded-xl flex flex-col items-center justify-center border ${
                      éMesmoSeculo
                        ? 'bg-green-500/20 border-green-500 text-green-300'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}
                  >
                    <span className="font-bold">Séc. {t.seculo}</span>
                    {!éMesmoSeculo && (
                      <span className="text-[9px] text-slate-500 mt-0.5">
                        {t.seculo < alvo.seculo
                          ? 'Mais Recente ⬆️'
                          : 'Mais Antigo ⬇️'}
                      </span>
                    )}
                  </div>

                  {/* Distância e Direção */}
                  <div
                    className={`p-3.5 rounded-xl flex flex-col items-center justify-center border ${
                      éAlvo
                        ? 'bg-green-500/20 border-green-500 text-green-300'
                        : dist < 1.5
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 animate-pulse'
                        : 'bg-slate-900/90 border-slate-800 text-slate-400'
                    }`}
                  >
                    {éAlvo ? (
                      <span className="font-bold">📍 Alvo</span>
                    ) : (
                      <>
                        <span className="font-bold text-slate-200">
                          {dist} km
                        </span>
                        <span className="text-[9px] font-mono mt-0.5 text-orange-400 tracking-tight">
                          {bússola}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AJUDA DE LEGENDA */}
        <footer className="mt-12 text-slate-600 text-[10px] flex gap-4 border-t border-slate-900 pt-6 w-full justify-center">
          <div>🟩 Correto</div>
          <div>🟥 Incorreto</div>
          <div>⬆️ ⬇️ Direção Cronológica</div>
          <div>🧭 Orientação de Bússola Real</div>
        </footer>
      </div>
    </main>
  );
}
