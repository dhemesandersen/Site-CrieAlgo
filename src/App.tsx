// App.tsx — home multilíngue do criealgo.pro (pt europeu / en / es)
// Reforma de agosto 2026: hero do prato pronto (francesinha em pt, sanduíche em en/es),
// Raio-X em 48h sem vídeo e sem "pagar só depois", sem preços, FAQ, portfólio de 15,
// jornada com vídeos, sem emoji, sem travessão, sem WhatsApp à vista.
import React, { useState, useCallback, useRef, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, animate, useAnimationFrame } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Copy, MoveLeft, MoveRight, Rocket, X, Plus, Minus } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { T } from './translations';
import { TECH_LOGOS } from './techlogos';
import { BR_CASES } from './brcases';

type Lang = 'pt' | 'en' | 'es';
const LANGS: Lang[] = ['pt', 'en', 'es'];
const BASE = import.meta.env.BASE_URL || '/';

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: any }>({
  lang: 'pt',
  setLang: () => {},
  t: T.pt,
});
const useLang = () => useContext(LangContext);

const detectLang = (): Lang => {
  try {
    const saved = localStorage.getItem('criealgo_lang');
    if (saved === 'pt' || saved === 'en' || saved === 'es') return saved;
    const nav = (navigator.language || 'pt').toLowerCase();
    return nav.startsWith('pt') ? 'pt' : nav.startsWith('es') ? 'es' : 'en';
  } catch {
    return 'pt';
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: custom * 0.1 },
  }),
};

const staggeredContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const FloatingParticles = () => {
  const particles = [
    { color: 'bg-blue-400', top: '15%', speed: 25, delay: 0 },
    { color: 'bg-fuchsia-400', top: '35%', speed: 30, delay: -5 },
    { color: 'bg-emerald-400', top: '75%', speed: 40, delay: -15 },
    { color: 'bg-amber-400', top: '85%', speed: 35, delay: -10 },
    { color: 'bg-purple-400', top: '25%', speed: 20, delay: -8 },
    { color: 'bg-rose-400', top: '55%', speed: 28, delay: -12 },
    { color: 'bg-cyan-400', top: '10%', speed: 22, delay: -3 },
    { color: 'bg-indigo-400', top: '90%', speed: 32, delay: -18 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: '-10vw' }}
          animate={{ x: '110vw' }}
          transition={{ duration: p.speed, repeat: Infinity, ease: 'linear', delay: p.delay }}
          className={`absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${p.color} opacity-60`}
          style={{ top: p.top }}
        />
      ))}
    </div>
  );
};

/* ---------- O prato do hero: sanduíche (en/es) ou francesinha (pt) ---------- */

const LAYER_STYLE = (solto: boolean, scatter: string): React.CSSProperties => ({
  transform: solto ? scatter : 'translate(0px, 0px) rotate(0deg)',
  transformOrigin: 'center',
  transition: 'transform .75s cubic-bezier(.34,1.4,.5,1)',
});

const SandwichSVG = ({ solto }: { solto: boolean }) => (
  <svg viewBox="0 0 200 200" aria-label="Sandwich" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
    <ellipse cx="100" cy="178" rx="72" ry="9" fill="rgba(27,28,30,.09)" />
    <g style={LAYER_STYLE(false, '')}>
      <path d="M36 148h128a8 8 0 0 1 0 16H36a8 8 0 0 1 0-16z" fill="#E8A94F" />
      <path d="M36 143h128a8 8 0 0 1 8 8H28a8 8 0 0 1 8-8z" fill="#F2BE68" />
    </g>
    <g style={LAYER_STYLE(solto, 'translate(66px, 74px) rotate(20deg)')}>
      <path d="M40 132h120a9 9 0 0 1 0 14H40a9 9 0 0 1 0-14z" fill="#EF476F" />
      <circle cx="66" cy="139" r="3.4" fill="#fff" opacity=".45" />
      <circle cx="112" cy="139" r="3.4" fill="#fff" opacity=".45" />
      <circle cx="146" cy="139" r="3.4" fill="#fff" opacity=".45" />
    </g>
    <g style={LAYER_STYLE(solto, 'translate(-64px, 52px) rotate(-11deg)')}>
      <rect x="32" y="112" width="136" height="20" rx="10" fill="#8A5A3B" />
      <rect x="32" y="112" width="136" height="8" rx="4" fill="#A06A46" />
    </g>
    <g style={LAYER_STYLE(solto, 'translate(80px, 6px) rotate(9deg)')}>
      <path d="M34 100h132l-10 14H44z" fill="#FFD166" />
      <path d="M46 114l-8 12 12-4zM104 114l-6 13 13-5zM152 114l-7 12 12-5z" fill="#FFD166" />
      <circle cx="72" cy="107" r="3" fill="#E8B44B" />
      <circle cx="122" cy="106" r="2.4" fill="#E8B44B" />
    </g>
    <g style={LAYER_STYLE(solto, 'translate(-72px, -34px) rotate(13deg)')}>
      <path d="M32 90c9-9 18 3 27-4s17 5 26-3 18 6 27-2 17 5 26-2 12 4 20 1v22H32z" fill="#06D6A0" />
      <path d="M32 100c9-6 18 2 27-3s17 4 26-2 18 4 27-2 17 4 26-2 12 3 20 1v6H32z" fill="#04B98A" opacity=".5" />
    </g>
    <g style={LAYER_STYLE(solto, 'translate(48px, -104px) rotate(-16deg)')}>
      <path d="M28 92c0-32 22-52 72-52s72 20 72 52z" fill="#F2BE68" />
      <path d="M28 92c0-32 22-52 72-52s72 20 72 52z" fill="#EFB559" opacity=".35" />
      <circle cx="74" cy="62" r="3" fill="#FFF3D6" />
      <circle cx="104" cy="54" r="3" fill="#FFF3D6" />
      <circle cx="132" cy="68" r="3" fill="#FFF3D6" />
      <circle cx="92" cy="76" r="2.6" fill="#FFF3D6" />
      <circle cx="126" cy="46" r="2.4" fill="#FFF3D6" />
    </g>
  </svg>
);

const FrancesinhaSVG = ({ solto }: { solto: boolean }) => (
  <svg viewBox="0 0 200 200" aria-label="Francesinha" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
    <ellipse cx="100" cy="181" rx="80" ry="9" fill="rgba(27,28,30,.09)" />
    {/* prato */}
    <g>
      <ellipse cx="100" cy="172" rx="78" ry="12" fill="#E4E5E9" />
      <ellipse cx="100" cy="169" rx="78" ry="12" fill="#F2F2F5" />
      <ellipse cx="100" cy="169" rx="58" ry="8" fill="#E9EAEE" />
    </g>
    {/* pão de baixo */}
    <g style={LAYER_STYLE(false, '')}>
      <rect x="46" y="148" width="108" height="18" rx="6" fill="#E8A94F" />
      <rect x="46" y="148" width="108" height="7" rx="3.5" fill="#F2BE68" />
    </g>
    {/* linguiça e fiambre */}
    <g style={LAYER_STYLE(solto, 'translate(64px, 58px) rotate(14deg)')}>
      <rect x="48" y="136" width="104" height="14" rx="7" fill="#C9566B" />
      <circle cx="60" cy="143" r="3" fill="#B24157" />
      <circle cx="100" cy="143" r="3" fill="#B24157" />
      <circle cx="140" cy="143" r="3" fill="#B24157" />
    </g>
    {/* bife */}
    <g style={LAYER_STYLE(solto, 'translate(-62px, 44px) rotate(-10deg)')}>
      <rect x="44" y="122" width="112" height="16" rx="8" fill="#8A5A3B" />
      <rect x="44" y="122" width="112" height="6" rx="3" fill="#A06A46" />
    </g>
    {/* pão de cima (fatia quadrada) */}
    <g style={LAYER_STYLE(solto, 'translate(-56px, -66px) rotate(-13deg)')}>
      <rect x="46" y="104" width="108" height="20" rx="6" fill="#F2BE68" />
      <rect x="46" y="104" width="108" height="8" rx="4" fill="#F7D08E" />
    </g>
    {/* queijo derretido a escorrer */}
    <g style={LAYER_STYLE(solto, 'translate(72px, -28px) rotate(9deg)')}>
      <path
        d="M42 104h116v8c0 4-3 6-6 9s-1 12-6 12-6-9-10-9-3 13-8 13-5-10-9-10-4 8-8 8-4-11-8-11-3 14-8 14-5-12-9-12-3 9-7 9-5-13-9-13-2 8-6 8-4-5-6-8-6-5-6-9z"
        fill="#FFD166"
      />
      <path d="M42 104h116v6H42z" fill="#FFDD8A" />
    </g>
    {/* molho da francesinha */}
    <g style={LAYER_STYLE(solto, 'translate(-78px, -40px) rotate(-8deg)')}>
      <path
        d="M40 100c0-8 12-12 60-12s60 4 60 12c0 6-8 8-14 10-4 1-4 6-9 6s-5-5-10-5-4 4-9 4-5-4-10-4-5 4-10 4-4-4-9-4-5 5-10 5-5-5-9-6c-6-2-14-4-14-10z"
        fill="#E2603F"
      />
      <path d="M52 94c10-3 26-4 48-4s38 1 48 4c-10 2-26 3-48 3s-38-1-48-3z" fill="#EA7A55" />
    </g>
    {/* ovo estrelado */}
    <g style={LAYER_STYLE(solto, 'translate(58px, -96px) rotate(16deg)')}>
      <path
        d="M74 88c-2-7 4-13 12-14s12-6 20-6 13 4 20 5 12 6 10 12-6 7-8 11-7 6-14 6-12 1-19-1-19-6-21-13z"
        fill="#FFFDF6"
      />
      <circle cx="102" cy="83" r="9" fill="#F2A83B" />
      <circle cx="99" cy="80" r="3" fill="#F7C570" />
    </g>
  </svg>
);

const HeroDish = () => {
  const { lang, t } = useLang();
  const [solto, setSolto] = useState(true);
  const [interagiu, setInteragiu] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setSolto(false);
      return;
    }
    const timer = setTimeout(() => setSolto(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      <div
        className="relative w-[280px] h-[280px] md:w-[330px] md:h-[330px] cursor-pointer"
        onClick={() => {
          setSolto((s) => !s);
          setInteragiu(true);
        }}
        role="button"
        aria-label={t.hero.sandHint}
      >
        {!interagiu && (
          <span className="absolute top-1 -right-2 text-xs text-black/40 font-medium">{t.hero.sandHint}</span>
        )}
        {lang === 'pt' ? <FrancesinhaSVG solto={solto} /> : <SandwichSVG solto={solto} />}
      </div>
      <span
        className={`mt-2 px-5 py-2.5 rounded-full font-display font-semibold text-[.82rem] tracking-wide shadow-[0_6px_20px_rgba(0,0,0,.08)] transition-all duration-400 ${
          solto ? 'bg-white text-[#EF476F] border border-[#EF476F]/30' : 'bg-[#1B1C1E] text-white'
        }`}
      >
        {solto ? t.hero.sandSolto : t.hero.sandMontado}
      </span>
    </div>
  );
};

/* ---------- Ícones animados da prova social ---------- */

const GlobeIcon = () => (
  <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">
    <defs>
      <clipPath id="pv-globe-clip">
        <circle cx="24" cy="24" r="17" />
      </clipPath>
    </defs>
    <circle cx="24" cy="24" r="17" fill="#E8F6FB" stroke="#118AB2" strokeWidth="2.5" />
    <g clipPath="url(#pv-globe-clip)" stroke="#118AB2" strokeWidth="1.8" fill="none" opacity=".85">
      <g style={{ animation: 'pv-globe-spin 5s linear infinite' }}>
        <ellipse cx="24" cy="24" rx="6.5" ry="17" />
        <ellipse cx="41" cy="24" rx="6.5" ry="17" />
        <ellipse cx="58" cy="24" rx="6.5" ry="17" />
        <line x1="7" y1="24" x2="75" y2="24" />
      </g>
    </g>
    <path d="M8.5 17.5h31M8.5 30.5h31" stroke="#118AB2" strokeWidth="1.4" opacity=".5" />
    <style>{'@keyframes pv-globe-spin{from{transform:translateX(0)}to{transform:translateX(-34px)}}'}</style>
  </svg>
);

const HandshakeIcon = () => (
  <svg viewBox="0 0 56 48" width="52" height="46" aria-hidden="true">
    <g style={{ animation: 'pv-shake 1.5s ease-in-out infinite', transformOrigin: '28px 27px' }}>
      {/* braço esquerdo: manga, pulseira verde, pele */}
      <line x1="5" y1="41" x2="13" y2="35" stroke="#1B1C1E" strokeWidth="10" strokeLinecap="round" />
      <line x1="15.5" y1="33.1" x2="18" y2="31.2" stroke="#06D6A0" strokeWidth="10" />
      <line x1="20" y1="29.8" x2="25" y2="26" stroke="#F1B999" strokeWidth="9.4" strokeLinecap="round" />
      {/* braço direito: manga, pulseira amarela, pele */}
      <line x1="51" y1="41" x2="43" y2="35" stroke="#118AB2" strokeWidth="10" strokeLinecap="round" />
      <line x1="40.5" y1="33.1" x2="38" y2="31.2" stroke="#FFD166" strokeWidth="10" />
      <line x1="36" y1="29.8" x2="31" y2="26" stroke="#E7A87F" strokeWidth="9.4" strokeLinecap="round" />
      {/* aperto: mãos entrelaçadas */}
      <rect x="19.5" y="17.5" width="17" height="11.5" rx="5.5" fill="#E7A87F" transform="rotate(-9 28 23)" />
      <rect x="20" y="15.5" width="16" height="10.5" rx="5" fill="#F1B999" transform="rotate(-9 28 21)" />
      <path d="M23 20.5c3 1.6 7.5 2 10.5 1" stroke="#C98D66" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M23.5 24c3 1.4 7 1.8 10 .9" stroke="#C98D66" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </g>
    <style>{'@keyframes pv-shake{0%,100%{transform:rotate(0deg) translateY(0)}25%{transform:rotate(-2.6deg) translateY(1.2px)}75%{transform:rotate(2.6deg) translateY(-1.2px)}}'}</style>
  </svg>
);

const HourglassIcon = () => (
  <svg viewBox="0 0 48 48" width="42" height="44" aria-hidden="true">
    <g style={{ animation: 'pv-flip 6s cubic-bezier(.6,0,.3,1) infinite', transformOrigin: '24px 24px' }}>
      <rect x="10" y="2" width="28" height="5" rx="2.5" fill="#1B1C1E" />
      <rect x="10" y="41" width="28" height="5" rx="2.5" fill="#1B1C1E" />
      <path d="M13 7h22c0 8-5 12-9 15v4c4 3 9 7 9 15H13c0-8 5-12 9-15v-4c-4-3-9-7-9-15z" fill="none" stroke="#9B7BE8" strokeWidth="2.2" strokeLinejoin="round" />
      {/* areia de cima, a esvaziar */}
      <path d="M17 10h14c0 5-3.5 8-7 10.5C20.5 18 17 15 17 10z" fill="#FFD166" style={{ animation: 'pv-sand-top 6s linear infinite', transformOrigin: '24px 10px' }} />
      {/* fio de areia */}
      <line x1="24" y1="22" x2="24" y2="38" stroke="#FFD166" strokeWidth="2" strokeDasharray="2 3" style={{ animation: 'pv-sand-fall .5s linear infinite' }} />
      {/* areia de baixo, a encher */}
      <path d="M15.5 40.5h17c-1.5-4.5-5-7-8.5-8.5-3.5 1.5-7 4-8.5 8.5z" fill="#FFD166" style={{ animation: 'pv-sand-bottom 6s linear infinite', transformOrigin: '24px 40px' }} />
    </g>
    <style>{`
      @keyframes pv-flip{0%,78%{transform:rotate(0deg)}88%,100%{transform:rotate(180deg)}}
      @keyframes pv-sand-top{0%{transform:scaleY(1)}78%{transform:scaleY(.18)}88%,100%{transform:scaleY(1)}}
      @keyframes pv-sand-bottom{0%{transform:scaleY(.25)}78%{transform:scaleY(1)}88%,100%{transform:scaleY(.25)}}
      @keyframes pv-sand-fall{from{stroke-dashoffset:0}to{stroke-dashoffset:-5}}
    `}</style>
  </svg>
);

const ProofIcon = ({ kind }: { kind: string }) =>
  kind === 'globo' ? <GlobeIcon /> : kind === 'maos' ? <HandshakeIcon /> : <HourglassIcon />;


/* ---------- Foguetão ilustrativo da marca ---------- */

const RocketDoodle = ({ size = 44, className = '' }: { size?: number; className?: string }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true" style={{ overflow: 'visible' }}>
    <g style={{ animation: 'rkFloat 3.2s ease-in-out infinite alternate' }}>
      <path d="M24 4c6 4 9 10 9 17 0 4-1 8-3 11H18c-2-3-3-7-3-11 0-7 3-13 9-17z" fill="#F2F2F5" stroke="#1B1C1E" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="24" cy="18" r="4.2" fill="#118AB2" stroke="#1B1C1E" strokeWidth="1.8" />
      <circle cx="24" cy="18" r="1.7" fill="#BDE3F2" />
      <path d="M15 26c-3 1-5 4-6 8 3 0 6-1 8-3z" fill="#EF476F" stroke="#1B1C1E" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M33 26c3 1 5 4 6 8-3 0-6-1-8-3z" fill="#EF476F" stroke="#1B1C1E" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M18 32h12l-2 4h-8z" fill="#FFD166" stroke="#1B1C1E" strokeWidth="1.8" strokeLinejoin="round" />
      <g style={{ animation: 'rkFlame .35s ease-in-out infinite alternate', transformOrigin: '24px 37px' }}>
        <path d="M24 46c-2.5-3-3.5-6-2.5-9h5c1 3 0 6-2.5 9z" fill="#FFD166" />
        <path d="M24 43.4c-1.3-1.8-1.8-3.4-1.3-5.4h2.6c.5 2 0 3.6-1.3 5.4z" fill="#EF476F" />
      </g>
    </g>
    <style>{`
      @keyframes rkFloat{from{transform:translateY(0)}to{transform:translateY(-5px)}}
      @keyframes rkFlame{from{transform:scaleY(1)}to{transform:scaleY(.65)}}
    `}</style>
  </svg>
);

/* ---------- Roleta 3D dos números (mantida) ---------- */

const SpaceBackground = () => {
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0a0a0a]"></div>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
          animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: star.duration, repeat: Infinity, delay: star.delay, ease: 'easeInOut' }}
        />
      ))}
      <motion.div
        className="absolute text-white/30"
        style={{ top: '60%', left: '-10%', rotate: '45deg' }}
        animate={{ x: ['0vw', '120vw'], y: ['0vh', '-40vh'] }}
        transition={{ duration: 15, delay: 5, repeat: Infinity, repeatDelay: 20, ease: 'linear' }}
      >
        <Rocket className="w-8 h-8" />
      </motion.div>
      <motion.div
        className="absolute text-white/20"
        style={{ top: '20%', left: '-10%', rotate: '110deg' }}
        animate={{ x: ['0vw', '120vw'], y: ['0vh', '30vh'] }}
        transition={{ duration: 12, delay: 18, repeat: Infinity, repeatDelay: 25, ease: 'linear' }}
      >
        <Rocket className="w-5 h-5" />
      </motion.div>
    </div>
  );
};

const StatsRoulette = () => {
  const { t } = useLang();
  const dragRotation = useMotionValue(0);
  const autoRotation = useMotionValue(0);
  const isDragging = useRef(false);

  useAnimationFrame((_, delta) => {
    if (!isDragging.current) {
      autoRotation.set(autoRotation.get() - 0.015 * delta);
    }
  });

  const handlePanStart = () => {
    isDragging.current = true;
  };
  const handlePan = (_: any, info: any) => {
    dragRotation.set(dragRotation.get() + info.delta.x * 0.4);
  };
  const handlePanEnd = (_: any, info: any) => {
    isDragging.current = false;
    const velocity = info.velocity.x;
    const current = dragRotation.get();
    animate(dragRotation, current + velocity * 0.15, { type: 'spring', stiffness: 50, damping: 20, mass: 1 });
  };

  const numbers = ['+300', '26', '+3000', '8'];
  const colors = ['text-[#FFD166]', 'text-[#06D6A0]', 'text-[#EF476F]', 'text-[#118AB2]'];
  const items = t.stats.map((text: string, i: number) => ({ number: numbers[i], text, color: colors[i] }));

  return (
    <section
      className="relative overflow-hidden py-40 md:py-56 min-h-[60vh] flex items-center justify-center cursor-grab active:cursor-grabbing border-y border-black/5 mt-12 md:mt-24 z-20 bg-[#0a0a0a]"
      style={{ perspective: '1200px' }}
    >
      <SpaceBackground />
      <motion.div onPanStart={handlePanStart} onPan={handlePan} onPanEnd={handlePanEnd} className="absolute inset-0 z-20 w-full h-full" />
      <motion.div style={{ rotateY: dragRotation, transformStyle: 'preserve-3d' }} className="relative w-full h-full flex items-center justify-center pointer-events-none">
        <motion.div style={{ rotateY: autoRotation, transformStyle: 'preserve-3d' }} className="relative w-full h-full flex items-center justify-center pointer-events-none">
          {items.map((item: any, i: number) => {
            const angle = (360 / items.length) * i;
            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center will-change-transform"
                style={{
                  transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(clamp(250px, 35vw, 550px))`,
                  transformStyle: 'preserve-3d',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                }}
              >
                <div
                  className={`text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] font-black tracking-tighter leading-none ${item.color} filter drop-shadow-[0_0_20px_inherit]`}
                  style={{ textShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
                >
                  {item.number}
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium text-white uppercase tracking-tighter mt-4 text-center whitespace-nowrap opacity-90">
                  {item.text}
                </div>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ---------- A Jornada, agora com vídeo (Pexels, licença comercial) ---------- */

const TIMELINE_VIDEOS = [
  'https://videos.pexels.com/video-files/3205674/3205674-hd_1280_720_25fps.mp4',
  'https://videos.pexels.com/video-files/8480293/8480293-hd_1280_720_25fps.mp4',
  'https://videos.pexels.com/video-files/19909834/19909834-hd_1280_720_30fps.mp4',
  'https://videos.pexels.com/video-files/8328103/8328103-hd_720_1280_25fps.mp4',
];

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(() => (typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true));
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isDesktop;
};

const TimelineVideo = ({ index, mobile }: { index: number; mobile?: boolean }) => (
  <AnimatePresence mode="wait">
    <motion.video
      key={`${mobile ? 'm' : 'd'}-${index}`}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      src={TIMELINE_VIDEOS[index]}
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    />
  </AnimatePresence>
);

const TimelineSection = () => {
  const { t } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const isDesktop = useIsDesktop();

  return (
    <section id="sobre" className="py-24 md:py-40 bg-white relative z-10 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-6">{t.timeline.heading}</h2>
          <p className="text-xl text-black/50 max-w-2xl font-light">{t.timeline.subtitle}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start relative pb-32">
          {isDesktop ? (
            <div className="w-full md:w-1/2 sticky top-24 h-[calc(100vh-12rem)] rounded-[2rem] overflow-hidden shadow-xl border border-black/5 bg-neutral-900 hidden md:block">
              <TimelineVideo index={activeIndex} />
            </div>
          ) : (
            <div className="w-full h-[50vh] sticky top-24 rounded-3xl overflow-hidden shadow-xl border border-black/5 bg-neutral-900 block md:hidden z-10">
              <TimelineVideo index={activeIndex} mobile />
            </div>
          )}

          <div className="w-full md:w-1/2 flex flex-col pt-[5vh] pb-[20vh] relative z-20">
            {t.timeline.stories.map((story: any, i: number) => (
              <motion.div
                key={i}
                onViewportEnter={() => setActiveIndex(i)}
                viewport={{ margin: '-45% 0px -45% 0px' }}
                className={`py-12 md:py-24 border-t border-black/10 first:border-none transition-opacity duration-500 ${
                  activeIndex === i ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <span className="text-sm font-semibold tracking-widest text-black/50 uppercase mb-4 block">{story.year}</span>
                <h3 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-6 leading-[1.1]">{story.title}</h3>
                <p className="text-lg md:text-xl text-black/70 font-light leading-relaxed">{story.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- Portfólio: 15 destaques internacionais ---------- */

const PORTFOLIO_MEDIA: { img: string; link: string | null }[] = [
  { img: `${BASE}mockups/olivah.jpg`, link: 'https://store.olivah.pt' },
  { img: `${BASE}mockups/vigias.jpg`, link: 'https://vigias.pt' },
  { img: `${BASE}mockups/coldwell.jpg`, link: null },
  { img: `${BASE}mockups/aim.webp`, link: 'https://aim.clinic' },
  { img: `${BASE}mockups/eslo.webp`, link: 'https://esloncology.com' },
  { img: `${BASE}mockups/studiogoulart.jpg`, link: 'https://instagram.com/studiogoulart.arq' },
  { img: `${BASE}mockups/xcape.webp`, link: 'https://www.xcape.pt' },
  { img: `${BASE}mockups/vitae.webp`, link: 'https://vitaeprofessionals.com' },
  { img: `${BASE}mockups/bhwedding.webp`, link: 'https://bhweddingphoto.com' },
  { img: `${BASE}mockups/philiaprime.webp`, link: 'https://philiaprime.com' },
  { img: `${BASE}mockups/mizuno.webp`, link: null },
  { img: `${BASE}mockups/graacc.webp`, link: null },
  { img: `${BASE}mockups/fhom.webp`, link: null },
  { img: `${BASE}mockups/cuticutibaby.webp`, link: null },
  { img: `${BASE}mockups/move-minho.webp`, link: null },
];

const ProjCard: React.FC<{ item: any }> = ({ item }) => (
  <div className="w-[150px] md:w-[172px] shrink-0 group/pc">
    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 border border-black/5 group-hover/pc:shadow-md transition-shadow">
      <img
        src={item.img}
        alt={item.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover/pc:scale-[1.06]"
      />
    </div>
    <h4 className="text-[12px] font-medium mt-2 leading-tight text-black/85 truncate">{item.title}</h4>
    <div className="text-[10px] text-black/40 truncate">{item.category}</div>
  </div>
);

const ProjectsMarquee = () => {
  const { t } = useLang();
  const featured = t.portfolio.items.map((item: any, i: number) => ({ ...item, ...PORTFOLIO_MEDIA[i] }));
  const extras = BR_CASES.map((c) => ({ title: c.n, category: c.l, img: c.img }));
  const todos: any[] = [];
  let e = 0;
  featured.forEach((f: any) => {
    todos.push(f);
    for (let k = 0; k < 4 && e < extras.length; k++) todos.push(extras[e++]);
  });
  while (e < extras.length) todos.push(extras[e++]);
  const linha1 = todos.filter((_, i) => i % 2 === 0);
  const linha2 = todos.filter((_, i) => i % 2 === 1);

  return (
    <section id="trabalho" className="py-24 bg-white text-black overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <p className="text-sm font-semibold tracking-widest uppercase text-[#118AB2] mb-5">Portfolio</p>
        <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-4">
          {t.portfolio.heading1} <span className="italic text-black/40">{t.portfolio.heading2}</span>
        </h2>
        <p className="text-black/50 text-xl font-light">{t.portfolio.subtitle}</p>
      </div>
      <div className="pm-wrap overflow-hidden flex flex-col gap-7">
        <div className="pm-row flex w-max items-start gap-5 px-6">
          {[...linha1, ...linha1].map((item, i) => (
            <ProjCard key={i} item={item} />
          ))}
        </div>
        <div className="pm-row pm-rev flex w-max items-start gap-5 px-6">
          {[...linha2, ...linha2].map((item, i) => (
            <ProjCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Logotipos de clientes ---------- */

const CLIENT_LOGOS: { name: string; img?: string; invert?: boolean; h?: number }[] = [
  { name: 'AIM Cancer Center', img: `${BASE}clientlogos/aim.png`, h: 38 },
  { name: 'Xcape', img: `${BASE}clientlogos/xcape.png`, h: 34 },
  { name: 'Vitae Professionals', img: `${BASE}clientlogos/vitae.png`, h: 44 },
  { name: 'Vigias', img: `${BASE}clientlogos/vigias.png`, h: 44 },
  { name: 'BH Wedding Photo', img: `${BASE}clientlogos/bh.png`, h: 44 },
  { name: 'Mizuno', img: `${BASE}clientlogos/mizuno.svg`, h: 30 },
  { name: 'CutiCutiBaby' },
  { name: 'Olivah', img: `${BASE}clientlogos/olivah.svg`, h: 26 },
  { name: 'GRAACC', img: `${BASE}clientlogos/graacc.svg`, h: 42 },
  { name: 'Estúdio Mármores', img: `${BASE}clientlogos/marmores.png`, h: 40 },
  { name: 'Studio Goulart' },
  { name: 'European School of Lifestyle Oncology', img: `${BASE}clientlogos/eslo.svg`, h: 36 },
];

const ClientsMarquee = () => {
  const { t } = useLang();
  return (
    <section className="py-16 md:py-20 bg-white text-black border-t border-black/5 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-9">
        <p className="text-sm font-semibold tracking-widest text-[#06D6A0] uppercase">{t.clients.heading}</p>
      </div>
      <div className="flex w-max animate-slide" style={{ animationDuration: '55s' }}>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-12 sm:gap-16 px-6 sm:px-8 items-center whitespace-nowrap">
            {CLIENT_LOGOS.map((c) =>
              c.img ? (
                <img
                  key={c.name + i}
                  src={c.img}
                  alt={c.name}
                  title={c.name}
                  loading="lazy"
                  style={{ height: (c.h || 40) + 'px', width: 'auto', filter: c.invert ? 'invert(1) grayscale(1) opacity(.55)' : 'grayscale(1) opacity(.55)' }}
                  className="transition-all duration-300 hover:!filter-none"
                />
              ) : (
                <span key={c.name + i} className="text-lg md:text-xl font-display font-semibold tracking-tight text-black/35 hover:text-black transition-colors cursor-default">
                  {c.name}
                </span>
              )
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

/* ---------- Serviços (labs, mantido) ---------- */

const LABS_META: Record<string, { img: string; accent: string; chip: string }> = {
  'estrategia-posicionamento': { img: `${BASE}labs/estrategia.jpg`, accent: '#4285F4', chip: 'bg-blue-100 text-blue-800' },
  'direcao-digital': { img: `${BASE}labs/direcao.jpg`, accent: '#6366F1', chip: 'bg-indigo-100 text-indigo-800' },
  websites: { img: `${BASE}labs/web.jpg`, accent: '#34A853', chip: 'bg-emerald-100 text-emerald-800' },
  'landing-pages': { img: `${BASE}labs/landing.jpg`, accent: '#F97316', chip: 'bg-orange-100 text-orange-800' },
  ecommerce: { img: `${BASE}labs/ecommerce.jpg`, accent: '#10B981', chip: 'bg-emerald-100 text-emerald-800' },
  branding: { img: `${BASE}labs/branding.jpg`, accent: '#D946EF', chip: 'bg-fuchsia-100 text-fuchsia-800' },
  conteudo: { img: `${BASE}labs/conteudo.jpg`, accent: '#F59E0B', chip: 'bg-amber-100 text-amber-800' },
  'social-video': { img: `${BASE}labs/social.jpg`, accent: '#EC4899', chip: 'bg-pink-100 text-pink-800' },
  campanhas: { img: `${BASE}labs/campanhas.jpg`, accent: '#EF4444', chip: 'bg-red-100 text-red-800' },
  automacao: { img: `${BASE}labs/automacao.jpg`, accent: '#EF476F', chip: 'bg-rose-100 text-rose-800' },
  'ia-criativa': { img: `${BASE}labs/iacriativa.jpg`, accent: '#8B5CF6', chip: 'bg-violet-100 text-violet-800' },
  'ia-empresas': { img: `${BASE}labs/ia.jpg`, accent: '#7C3AED', chip: 'bg-violet-100 text-violet-800' },
};

const LABS_TILT = [-7, 5, -4, 6, -6, 4, -5, 7, -4, 5, -7, 6];

const LabsModal = ({ card, onClose }: { card: any; onClose: () => void }) => {
  const { t } = useLang();
  const meta = LABS_META[card.id];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-8"
    >
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full md:max-w-3xl max-h-[92vh] md:max-h-[85vh] overflow-y-auto bg-[#FBFAF8] rounded-t-[2rem] md:rounded-[2rem] shadow-2xl"
      >
        <button
          onClick={onClose}
          className="sticky top-4 float-right mr-4 z-20 w-11 h-11 rounded-full bg-white border border-black/10 shadow-md flex items-center justify-center hover:bg-neutral-100 transition-colors"
          aria-label={t.labs.close}
        >
          <X size={20} />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
          <div className="md:col-span-2 relative min-h-[200px] md:min-h-full">
            <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${meta.accent}33, ${meta.accent}0d)` }}></div>
            <img
              src={meta.img}
              alt=""
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
              className="absolute inset-0 w-full h-full object-cover md:rounded-l-[2rem]"
            />
          </div>
          <div className="md:col-span-3 p-7 md:p-10">
            <span className={`inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-5 ${meta.chip}`}>{t.labs.badge}</span>
            <h3 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-2">{card.title}</h3>
            <p className="text-lg text-black/55 font-light mb-6">{card.tagline}</p>
            <p className="text-black/65 font-light leading-relaxed mb-6">{card.desc}</p>
            <p className="text-xs font-semibold tracking-widest text-black/40 uppercase mb-2.5">{t.labs.includes}</p>
            <div className="flex flex-wrap gap-2">
              {card.includes.map((inc: string, i: number) => (
                <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-white border border-black/10 text-black/60">
                  {inc}
                </span>
              ))}
            </div>
            <a
              href="#raiox"
              onClick={onClose}
              className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-full bg-[#1B1C1E] text-white text-sm font-semibold hover:bg-black transition-colors"
            >
              {t.services.cta} <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const LabsSection = () => {
  const { t } = useLang();
  const [selected, setSelected] = useState<any>(null);
  const [area, setArea] = useState('all');
  const cards = area === 'all' ? t.labs.cards : t.labs.cards.filter((c: any) => c.area === area);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'center', containScroll: false, dragFree: false, skipSnaps: true });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const applyArc = useCallback(() => {
    const root = emblaApi?.rootNode();
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const off = (r.left + r.width / 2 - centerX) / rect.width;
      const y = Math.pow(Math.abs(off) * 2.2, 1.7) * 60;
      const rot = LABS_TILT[i % LABS_TILT.length] * 0.35 + off * 14;
      el.style.transform = `translateY(${y}px) rotate(${rot}deg)`;
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    applyArc();
    emblaApi.on('scroll', applyArc);
    emblaApi.on('reInit', applyArc);
    window.addEventListener('resize', applyArc);
    return () => {
      emblaApi.off('scroll', applyArc);
      emblaApi.off('reInit', applyArc);
      window.removeEventListener('resize', applyArc);
    };
  }, [emblaApi, applyArc]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
      emblaApi.scrollTo(Math.floor(cards.length / 2), true);
      requestAnimationFrame(applyArc);
    }
  }, [area, emblaApi, cards.length, applyArc]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="servicos" className="relative py-24 md:py-36 bg-[#F2EFE9] text-[#1B1C1E] overflow-hidden z-10 rounded-t-[3rem]">
      <div className="absolute -left-40 top-40 w-[34rem] h-[34rem] rounded-full bg-[#4285F4] opacity-90 pointer-events-none" aria-hidden="true"></div>
      <div
        className="absolute -right-24 -top-16 w-[30rem] h-[26rem] bg-[#57D982] opacity-90 pointer-events-none"
        style={{ borderRadius: '42% 58% 38% 62% / 55% 45% 55% 45%' }}
        aria-hidden="true"
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mb-4">
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-display font-medium tracking-tight leading-[1.08] mb-6"
          >
            {t.labs.heading1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#A142F4] to-[#EA4335]">{t.labs.heading2}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-black/55 font-light leading-relaxed"
          >
            {t.labs.subtitle}
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 160 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ type: 'spring', stiffness: 70, damping: 18 }}
        className="relative z-10"
      >
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex items-start touch-pan-y pt-4 pb-24 md:pb-28">
            {cards.map((card: any, i: number) => {
              const meta = LABS_META[card.id];
              return (
                <div key={card.id} className="flex-[0_0_240px] md:flex-[0_0_260px] min-w-0 px-2.5 md:px-3">
                  <div
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className="will-change-transform"
                    style={{ transformOrigin: 'center bottom' }}
                  >
                    <button
                      type="button"
                      onClick={() => setSelected(card)}
                      className="group block w-full bg-white rounded-3xl p-3 pb-5 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.25)] border border-black/5 text-left cursor-pointer focus:outline-none transition-shadow hover:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.35)]"
                    >
                      <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 mb-4">
                        <div className="absolute inset-0" style={{ background: `linear-gradient(140deg, ${meta.accent}22, ${meta.accent}08)` }}></div>
                        <img
                          src={meta.img}
                          alt={card.title}
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                          }}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                        />
                      </div>
                      <div className="px-2">
                        <h3 className="text-[17px] font-display font-semibold tracking-tight leading-snug mb-1.5">{card.title}</h3>
                        <p className="text-sm text-black/55 font-light leading-relaxed mb-3">{card.tagline}</p>
                        <span className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: meta.accent }}>
                          {t.labs.explore} <ArrowUpRight size={15} />
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 -mt-10 md:-mt-12 relative z-20">
          <button
            onClick={prev}
            aria-label="Anterior"
            className="w-12 h-12 rounded-full bg-white border border-black/10 shadow-md flex items-center justify-center hover:bg-neutral-50 hover:scale-105 transition-all"
          >
            <MoveLeft size={20} strokeWidth={1.5} />
          </button>
          <button
            onClick={next}
            aria-label="Seguinte"
            className="w-12 h-12 rounded-full bg-[#1B1C1E] text-white shadow-md flex items-center justify-center hover:bg-black hover:scale-105 transition-all"
          >
            <MoveRight size={20} strokeWidth={1.5} />
          </button>
        </div>
      </motion.div>

      <div className="relative z-10 flex flex-wrap justify-center gap-2.5 md:gap-3 mt-10 px-6">
        {[{ id: 'all', label: t.labs.filterAll }, ...t.labs.areaChips].map((chip: any) => (
          <button
            key={chip.id}
            onClick={() => setArea(chip.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm border ${
              area === chip.id ? 'bg-[#1B1C1E] text-white border-transparent' : 'bg-white text-black/70 border-black/10 hover:text-black hover:border-black/30 hover:scale-105'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <AnimatePresence>{selected && <LabsModal card={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  );
};

/* ---------- Pacotes para começar (sem preços) ---------- */

const PACOTE_CORES = ['#118AB2', '#9B7BE8', '#06D6A0', '#FFD166', '#EF476F', '#118AB2', '#9B7BE8', '#06D6A0'];

const PacotesSection = () => {
  const { t } = useLang();
  return (
    <section id="pacotes" className="py-24 md:py-32 bg-[#F9F9F9] relative z-20 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-sm font-semibold tracking-widest uppercase text-[#EF476F] mb-6">{t.pacotes.kicker}</p>
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-4">
            {t.pacotes.h1} <span className="italic text-black/40">{t.pacotes.h2}</span>
          </h2>
          <div className="hidden md:block shrink-0 mb-2"><RocketDoodle size={52} /></div>
        </div>
        <p className="text-black/50 text-xl font-light max-w-2xl mb-14">{t.pacotes.sub}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.pacotes.items.map((p: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group/pk bg-white rounded-3xl border border-black/5 transition-all duration-300 p-6 flex flex-col hover:-translate-y-1"
              style={{ boxShadow: `0 14px 34px -14px ${PACOTE_CORES[i % PACOTE_CORES.length]}55, 0 3px 10px -4px rgba(27,28,30,.08)` }}
            >
              <span className="w-9 h-1.5 rounded-full mb-5 block" style={{ background: PACOTE_CORES[i % PACOTE_CORES.length] }}></span>
              <h3 className="text-lg font-display font-semibold tracking-tight leading-snug mb-2">{p.t}</h3>
              <p className="text-sm text-black/55 font-light leading-relaxed mb-4">{p.d}</p>
              <ul className="flex flex-col gap-1.5 mb-6">
                {p.i.map((li: string, k: number) => (
                  <li key={k} className="text-[13px] text-black/60 font-light leading-snug flex gap-2">
                    <span className="mt-[7px] w-1 h-1 rounded-full shrink-0" style={{ background: PACOTE_CORES[i % PACOTE_CORES.length] }}></span>
                    {li}
                  </li>
                ))}
              </ul>
              <a
                href="#raiox"
                className="btn-3d mt-auto inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-[#1B1C1E] rounded-2xl px-4 py-3"
                style={{ ['--b3d' as any]: PACOTE_CORES[i % PACOTE_CORES.length] }}
              >
                {t.pacotes.cta} <ArrowUpRight size={15} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- A equipa ---------- */

const TIME_FOTOS = ['/br/img/dhemes.webp', ''];
const TIME_CORES = ['#06D6A0', '#FFD166'];

const TimeSection = () => {
  const { t } = useLang();
  return (
    <section id="equipa" className="py-24 md:py-32 bg-white relative z-20 border-t border-black/5">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <p className="text-sm font-semibold tracking-widest uppercase text-[#06D6A0] mb-6">{t.time.kicker}</p>
        <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-4">
          {t.time.h1} <span className="italic text-black/40">{t.time.h2}</span>
        </h2>
        <p className="text-black/50 text-xl font-light max-w-2xl mb-14">{t.time.sub}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
          {t.time.pessoas.map((p: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#F9F9F9] rounded-3xl border border-black/5 p-7 md:p-9 flex flex-col items-start"
              style={{ boxShadow: `0 14px 34px -16px ${TIME_CORES[i]}55` }}
            >
              <div
                className="w-28 h-28 rounded-full mb-6 overflow-hidden border-4 border-white shadow-lg flex items-center justify-center"
                style={{ background: TIME_CORES[i] + '33' }}
              >
                {TIME_FOTOS[i] ? (
                  <img src={TIME_FOTOS[i]} alt={p.nome} loading="lazy" className="w-full h-full object-cover object-top" />
                ) : (
                  <span className="font-display font-bold text-4xl" style={{ color: TIME_CORES[i] }}>
                    {p.nome[0]}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-display font-semibold tracking-tight mb-1">{p.nome}</h3>
              <div className="text-sm font-medium mb-4" style={{ color: TIME_CORES[i] === '#FFD166' ? '#E3A93C' : TIME_CORES[i] }}>{p.cargo}</div>
              <p className="text-black/60 font-light leading-relaxed">{p.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Raio-X em 48h (sem vídeo, sem falar de pagamento) ---------- */

const EMAIL = 'contact@criealgo.pro';

const RaioXSection = () => {
  const { lang, t } = useLang();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [link, setLink] = useState('');
  const [desc, setDesc] = useState('');
  const [estado, setEstado] = useState<'idle' | 'sending' | 'done' | 'fail'>('idle');
  const [gaveta, setGaveta] = useState(false);
  const [servSel, setServSel] = useState<string[]>([]);
  const toggleServ = (id: string) =>
    setServSel((sel) => (sel.includes(id) ? sel.filter((x) => x !== id) : [...sel, id]));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (estado === 'sending' || estado === 'done') return;
    setEstado('sending');
    try {
      const r = await fetch('/api/raiox.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          email,
          link,
          mensagem: desc,
          servicos: servSel.map((id) => t.labs.cards.find((c: any) => c.id === id)?.title || id).join(', '),
          idioma: lang,
          site_url: '',
        }),
      });
      const j = await r.json().catch(() => ({ ok: false }));
      setEstado(j.ok ? 'done' : 'fail');
    } catch {
      setEstado('fail');
    }
  };

  return (
    <section id="raiox" className="relative z-20 py-24 md:py-36 bg-[#0a0a0c] text-white rounded-t-[3rem] -mt-8 overflow-hidden">
      <video
        src="https://videos.pexels.com/video-files/18388881/18388881-hd_1440_1080_60fps.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.32] pointer-events-none"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c]/72 to-[#0a0a0c]/38 pointer-events-none" aria-hidden="true"></div>
      <div className="absolute -right-32 -top-24 w-[26rem] h-[26rem] rounded-full bg-[#06D6A0] opacity-[0.10] pointer-events-none blur-3xl" aria-hidden="true"></div>

      <div className="absolute right-10 top-10 hidden lg:block opacity-90 pointer-events-none"><RocketDoodle size={56} /></div>
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={staggeredContainer}>
          <motion.p variants={fadeIn} className="text-sm font-semibold tracking-widest uppercase text-[#06D6A0] mb-6">
            {t.raiox.kicker}
          </motion.p>
          <motion.h2 variants={fadeIn} className="text-4xl md:text-6xl font-display font-medium tracking-tight leading-[1.06] mb-8">
            {t.raiox.h1} <span className="text-[#FFD166]">{t.raiox.h2}</span>
          </motion.h2>
          <motion.p variants={fadeIn} className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-xl">
            {t.raiox.lead}
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/[0.04] border border-white/10 rounded-[2rem] p-7 md:p-10 backdrop-blur-sm flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder={t.raiox.fName}
              className="w-full bg-white/[0.06] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/40 outline-none focus:border-[#06D6A0]/60 transition-colors"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.raiox.fMail}
              className="w-full bg-white/[0.06] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/40 outline-none focus:border-[#06D6A0]/60 transition-colors"
            />
          </div>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder={t.raiox.fLink}
            className="w-full bg-white/[0.06] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/40 outline-none focus:border-[#06D6A0]/60 transition-colors"
          />
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] overflow-hidden">
            <button
              type="button"
              onClick={() => setGaveta(!gaveta)}
              className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <span className={servSel.length ? 'text-white' : 'text-white/40'}>
                {t.raiox.fServ}
                {servSel.length > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full bg-[#06D6A0] text-[#1B1C1E] text-xs font-bold">{servSel.length}</span>
                )}
              </span>
              <span className={`transition-transform duration-300 text-white/50 ${gaveta ? 'rotate-45' : ''}`}>
                <Plus size={18} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {gaveta && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="gaveta-scroll flex gap-2.5 overflow-x-auto px-5 pb-3 pt-1 cursor-grab">
                    {t.labs.cards.map((c: any) => {
                      const on = servSel.includes(c.id);
                      const cor = LABS_META[c.id]?.accent || '#06D6A0';
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => toggleServ(c.id)}
                          className="shrink-0 rounded-full px-4 py-2.5 text-sm font-medium border transition-all duration-200"
                          style={
                            on
                              ? { background: cor, borderColor: cor, color: '#101012', boxShadow: `0 4px 16px ${cor}66` }
                              : { background: 'rgba(255,255,255,.05)', borderColor: cor + '66', color: cor }
                          }
                        >
                          {c.title}
                        </button>
                      );
                    })}
                  </div>
                  <p className="px-5 pb-4 text-xs text-white/35">{t.raiox.servHint}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder={t.raiox.fDesc}
            rows={4}
            className="w-full bg-white/[0.06] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/40 outline-none focus:border-[#06D6A0]/60 transition-colors resize-none"
          />
          <button
            type="submit"
            disabled={estado === 'sending' || estado === 'done'}
            className={`btn-3d group mt-2 inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full font-semibold text-lg ${
              estado === 'done' ? 'cursor-default' : ''
            } ${estado === 'sending' ? 'opacity-70 cursor-wait' : ''}`}
            style={{ ['--b3d' as any]: estado === 'done' ? '#FFFFFF' : '#06D6A0', color: '#1B1C1E' }}
          >
            {estado === 'sending' ? t.raiox.sending : estado === 'done' ? t.raiox.done : t.raiox.cta}
            {estado === 'idle' && <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />}
            {estado === 'done' && <CheckCircle2 size={20} className="text-[#06D6A0]" />}
          </button>
          {estado === 'fail' && (
            <p className="text-sm text-[#FFD166] text-center">
              {t.raiox.fail}{' '}
              <a className="underline underline-offset-2" href={`mailto:${EMAIL}?subject=${encodeURIComponent(t.raiox.mailSub)}`}>
                {EMAIL}
              </a>
            </p>
          )}
          <p className="text-sm text-white/40 text-center mt-1">{t.raiox.note}</p>
        </motion.form>
      </div>
    </section>
  );
};

/* ---------- FAQ ---------- */

const FaqSection = () => {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-36 bg-white relative z-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <p className="text-sm font-semibold tracking-widest uppercase text-[#9B7BE8] mb-6">{t.faq.kicker}</p>
        <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-14">
          {t.faq.h1} <span className="italic text-black/40">{t.faq.h2}</span>
        </h2>
        <div className="flex flex-col">
          {t.faq.items.map((item: any, i: number) => (
            <div key={i} className="border-t border-black/10 last:border-b">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-7 text-left group"
              >
                <span className="text-xl md:text-2xl font-display font-medium tracking-tight group-hover:text-black/70 transition-colors">{item.q}</span>
                <span
                  className="shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
                  style={{ borderColor: ['#118AB2', '#06D6A0', '#FFD166', '#EF476F', '#9B7BE8', '#118AB2'][i % 6] + '55', color: ['#118AB2', '#06D6A0', '#E3A93C', '#EF476F', '#9B7BE8', '#118AB2'][i % 6] }}
                >
                  {open === i ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-lg text-black/60 font-light leading-relaxed max-w-3xl">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Ferramentas e conhecimentos: logos reais, estáticos ---------- */

const TechLogosSection = () => {
  const { t } = useLang();
  const logos = TECH_LOGOS.filter((l) => l.name !== 'Anthropic');
  return (
    <section className="py-16 md:py-20 bg-white text-black border-t border-black/5 relative z-20 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-sm font-semibold tracking-widest uppercase mb-10" style={{ color: '#E3A93C' }}>{t.tech.heading}</p>
        <div className="flex flex-wrap items-center gap-x-9 gap-y-8 md:gap-x-12">
          {logos.map((logo) => (
            <div key={logo.name} className="group/logo relative flex items-center" tabIndex={0}>
              {logo.path ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 md:h-8 w-auto transition-all duration-300 opacity-45 grayscale group-hover/logo:opacity-100 group-hover/logo:grayscale-0 group-focus/logo:opacity-100 group-focus/logo:grayscale-0"
                  style={{ fill: logo.hex }}
                  role="img"
                  aria-label={logo.name}
                >
                  <path d={logo.path} />
                </svg>
              ) : (
                <span
                  className="text-lg md:text-xl font-display font-bold tracking-tight transition-all duration-300 opacity-45 grayscale group-hover/logo:opacity-100 group-hover/logo:grayscale-0"
                  style={{ color: logo.hex }}
                >
                  {logo.name}
                </span>
              )}
              {t.tech.tips?.[logo.name] && (
                <div className="tip-balao" role="tooltip">
                  <b>{logo.name}</b>
                  {t.tech.tips[logo.name]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- App ---------- */

export default function App() {
  const [lang, setLangState] = useState<Lang>(detectLang);
  const t = T[lang];
  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('criealgo_lang', l);
    } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
  }, [t.htmlLang]);

  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      <div className="min-h-screen relative selection:bg-black selection:text-white bg-[#F9F9F9] overflow-clip">
        {/* Navegação */}
        <nav className="absolute top-0 left-0 right-0 z-50 py-8 px-6 md:px-12 flex justify-between items-center max-w-7xl mx-auto mix-blend-difference text-white">
          <div className="font-display font-bold tracking-tighter text-2xl">
            criealgo<span className="text-[#06D6A0]">.</span>
          </div>
          <div className="flex items-center gap-5 md:gap-8 font-medium">
            <a href="#sobre" className="hidden md:block hover:opacity-70 transition-opacity">
              {t.nav.history}
            </a>
            <a href="#trabalho" className="hidden md:block hover:opacity-70 transition-opacity">
              {t.nav.work}
            </a>
            <a href="#servicos" className="hidden md:block hover:opacity-70 transition-opacity">
              {t.nav.services}
            </a>
            <div className="flex items-center gap-1 text-xs tracking-wide">
              {LANGS.map((l, i) => (
                <React.Fragment key={l}>
                  {i > 0 && <span className="opacity-30">·</span>}
                  <button
                    onClick={() => setLang(l)}
                    className={`px-1.5 py-1 uppercase transition-opacity ${lang === l ? 'opacity-100 font-bold underline underline-offset-4' : 'opacity-50 hover:opacity-80'}`}
                  >
                    {l}
                  </button>
                </React.Fragment>
              ))}
            </div>
            <a href="#raiox" className="px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors text-sm font-semibold">
              {t.nav.contact}
            </a>
          </div>
        </nav>

        {/* Hero: o prato pronto */}
        <section className="relative pt-36 md:pt-48 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
          <FloatingParticles />
          <motion.div style={{ y: heroY }} initial="hidden" animate="visible" variants={staggeredContainer} className="relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
              <div className="lg:col-span-7">
                <motion.div variants={fadeIn} className="inline-flex items-center gap-2.5 text-sm font-medium text-black/50 mb-8">
                  <span className="w-2 h-2 rounded-full bg-[#06D6A0] inline-block"></span>
                  {t.hero.tag}
                </motion.div>
                <motion.h1
                  variants={fadeIn}
                  className="text-[2.9rem] leading-[1.06] sm:text-6xl md:text-7xl lg:text-[4.6rem] xl:text-[5.2rem] font-display font-medium tracking-tighter mb-8 text-[#1B1B1B]"
                >
                  {t.hero.h1a}
                  <br />
                  {t.hero.h1b}
                  <br />
                  {t.hero.h1c} <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-[#EF476F] via-[#FFD166] to-[#06D6A0]">{t.hero.h1em}</em>
                </motion.h1>
                <motion.p variants={fadeIn} className="text-lg md:text-xl text-black/60 font-light max-w-xl leading-relaxed mb-10">
                  {t.hero.sub}
                </motion.p>
                <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4">
                  <a
                    href="#raiox"
                    className="btn-3d group inline-flex items-center gap-3 px-8 py-4.5 md:py-5 rounded-full text-[#1B1C1E] font-semibold text-lg"
                    style={{ ['--b3d' as any]: '#06D6A0' }}
                  >
                    {t.hero.ctaPrimary}
                    <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                  </a>
                  <a
                    href="#servicos"
                    className="inline-flex items-center gap-2 px-8 py-4.5 md:py-5 rounded-full border border-black/10 bg-white text-[#1B1C1E] font-medium text-lg hover:bg-neutral-50 transition-colors"
                  >
                    {t.hero.ctaSecondary}
                  </a>
                </motion.div>
              </div>
              <motion.div variants={fadeIn} className="lg:col-span-5">
                <HeroDish />
              </motion.div>
            </div>

            {/* Prova social */}
            <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 mt-16 md:mt-24 border-t border-black/10 pt-10">
              {t.hero.proof.map((p: any, i: number) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="shrink-0 mt-1"><ProofIcon kind={p.icon} /></div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-[#1B1C1E]">{p.b}</span>
                    <span className="text-black/50 font-light leading-snug max-w-[26ch]">{p.s}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Roleta 3D com os anos de experiência */}
        <StatsRoulette />

        {/* A Jornada, com vídeo */}
        <TimelineSection />

        {/* Serviços */}
        <LabsSection />

        {/* Portfólio: carrossel infinito em duas linhas */}
        <ProjectsMarquee />

        {/* Logotipos de clientes */}
        <ClientsMarquee />

        {/* Ferramentas e conhecimentos: logos reais, estáticos */}
        <TechLogosSection />

        {/* Pacotes para começar */}
        <PacotesSection />

        {/* Equipa */}
        <TimeSection />

        {/* Raio-X */}
        <RaioXSection />

        {/* FAQ */}
        <FaqSection />

        {/* CTA / Footer */}
        <footer id="contato" className="py-32 px-6 md:px-12 bg-[#F9F9F9] relative z-20 text-center border-t border-black/5">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggeredContainer} className="flex flex-col items-center max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-display font-medium tracking-tighter leading-none mb-12 text-[#1B1C1E]">
              {t.footer.heading1} <br />
              <span className="text-black/40 italic">{t.footer.heading2}</span>
            </h2>

            <div className="flex flex-col items-center gap-6 mb-8 w-full">
              <a href="#raiox" className="cta-final group relative inline-flex items-center justify-center rounded-full p-[3px]">
                <span className="cta-final-borda absolute inset-0 rounded-full" aria-hidden="true"></span>
                <span className="relative inline-flex items-center gap-4 rounded-full bg-[#1B1C1E] text-white px-12 md:px-16 py-6 md:py-7 font-display font-semibold text-xl md:text-2xl tracking-tight overflow-hidden">
                  <span className="cta-final-brilho absolute inset-0" aria-hidden="true"></span>
                  <span className="relative">{t.footer.raioxCta}</span>
                  <span className="relative group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform duration-300">
                    <RocketDoodle size={38} />
                  </span>
                </span>
              </a>
              <p className="text-black/45 text-sm">{t.footer.ctaNote}</p>
            </div>

            <div className="flex items-center gap-2 text-black/45 font-medium mb-20">
              <span>{t.footer.orWrite}</span>
              <button onClick={handleCopyEmail} className="inline-flex items-center gap-2 text-[#1B1C1E] hover:text-[#118AB2] transition-colors underline underline-offset-4 decoration-[#06D6A0]/60">
                {copied ? (
                  <>
                    <CheckCircle2 size={17} className="text-[#06D6A0]" /> {t.footer.copied}
                  </>
                ) : (
                  <>
                    {EMAIL} <Copy size={15} className="opacity-50" />
                  </>
                )}
              </button>
            </div>

            {/* bloco institucional */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-left border-t border-black/5 pt-12 mb-12">
              <div>
                <div className="font-display font-bold tracking-tighter text-2xl mb-3">
                  criealgo<span className="text-[#06D6A0]">.</span>
                </div>
                <p className="text-sm text-black/55 font-light leading-relaxed max-w-[30ch]">{t.footer.tagline}</p>
              </div>
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#FFD166] mb-2" style={{ color: '#E3A93C' }}>
                    {t.footer.addrPtLabel}
                  </p>
                  <p className="text-sm text-black/60 font-light">{t.footer.addrPt}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#06D6A0] mb-2">{t.footer.addrBrLabel}</p>
                  <p className="text-sm text-black/60 font-light">{t.footer.addrBr}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#118AB2] mb-2">{t.footer.contact}</p>
                  <a href={`mailto:${EMAIL}`} className="text-sm text-black/60 font-light hover:text-black transition-colors">
                    {EMAIL}
                  </a>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { n: 'Meta Business', key: 'Meta' },
                    { n: 'Google Partner', key: 'Google' },
                    { n: 'Shopify Partner', key: 'Shopify' },
                    { n: 'Brevo Certified', key: 'Brevo' },
                  ].map((b) => {
                    const ic = TECH_LOGOS.find((l) => l.name === b.key);
                    return (
                      <span
                        key={b.n}
                        className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-2 text-xs font-semibold text-black/65 shadow-sm"
                      >
                        {ic?.path && (
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" style={{ fill: ic.hex }} aria-hidden="true">
                            <path d={ic.path} />
                          </svg>
                        )}
                        {b.n}
                      </span>
                    );
                  })}
                  <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-2 text-xs font-semibold text-black/65 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#06D6A0] inline-block"></span> SSL &amp; RGPD
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6 text-sm text-black/50 font-medium pt-8 border-t border-black/5">
              <p>
                &copy; {new Date().getFullYear()} criealgo. {t.footer.rights}
              </p>
              <div className="flex gap-8">
                <a href="https://instagram.com/criealgo" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                  Instagram
                </a>
                <a href="https://www.linkedin.com/company/criealgo" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </footer>
      </div>
    </LangContext.Provider>
  );
}
