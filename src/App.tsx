// App.tsx
// Update for Git staging
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, animate, useAnimationFrame } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Copy, MoveLeft, MoveRight, Rocket } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: custom * 0.1,
    },
  }),
};

const staggeredContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
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

const CursorMediaReveal = ({ words, media }: { words: string[], media: string }) => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      if(!isHovered) {
        setIndex((prev) => (prev + 1) % words.length);
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length, isHovered]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <span 
        className="relative inline-flex flex-col h-[1.1em] overflow-hidden align-bottom text-black/40 italic cursor-pointer transition-colors hover:text-black font-light px-2 -mx-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={index}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block whitespace-nowrap"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      
      {/* Floating Image */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 5 }}
            transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
            className="fixed w-[280px] h-[320px] rounded-2xl overflow-hidden z-[100] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-black/5 pointer-events-none"
            style={{ 
              left: mousePosition.x, 
              top: mousePosition.y,
              x: "10%",
              y: "-50%",
            }}
          >
            <div className="absolute inset-0 bg-black/10 z-10 transition-opacity duration-300"></div>
            <img src={media} alt="Author" className="w-full h-full object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const TiltVideoCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full max-w-5xl aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-black/10 mx-auto group cursor-pointer mt-16 z-30"
    >
      <video 
        src="https://cdn.coverr.co/videos/coverr-a-beautiful-workspace-4596/1080p.mp4" 
        autoPlay muted loop playsInline
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700 scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none transition-opacity duration-500"></div>
      
      <div style={{ transform: "translateZ(80px)" }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl">
          <div className="w-0 h-0 border-t-[6px] md:border-t-[8px] border-t-transparent border-l-[10px] md:border-l-[12px] border-l-white border-b-[6px] md:border-b-[8px] border-b-transparent ml-1"></div>
        </div>
      </div>

      <div style={{ transform: "translateZ(60px)" }} className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 flex flex-col gap-4 pointer-events-none">
         <div className="flex gap-2 flex-wrap">
           <div className="backdrop-blur-md bg-black/50 border border-white/20 text-white text-xs px-4 py-2 rounded-full font-display font-medium shadow-sm">✨ Showreel</div>
           <div className="backdrop-blur-md bg-black/50 border border-white/20 text-white text-xs px-4 py-2 rounded-full font-display font-medium shadow-sm">E-commerce & Automação</div>
         </div>
      </div>
    </motion.div>
  );
};

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
      
      {/* Stars */}
      {stars.map((star) => (
         <motion.div
           key={star.id}
           className="absolute rounded-full bg-white"
           style={{
             top: star.top,
             left: star.left,
             width: star.size,
             height: star.size,
           }}
           animate={{
             opacity: [0.1, 0.8, 0.1],
             scale: [0.8, 1.2, 0.8],
           }}
           transition={{
             duration: star.duration,
             repeat: Infinity,
             delay: star.delay,
             ease: "easeInOut",
           }}
         />
      ))}
      
      {/* Rocket 1 */}
      <motion.div
         className="absolute text-white/30"
         style={{ top: "60%", left: "-10%", rotate: "45deg" }}
         animate={{
           x: ["0vw", "120vw"],
           y: ["0vh", "-40vh"],
         }}
         transition={{
           duration: 15,
           delay: 5,
           repeat: Infinity,
           repeatDelay: 20,
           ease: "linear"
         }}
      >
        <Rocket className="w-8 h-8" />
      </motion.div>

      {/* Rocket 2 */}
      <motion.div
         className="absolute text-white/20"
         style={{ top: "20%", left: "-10%", rotate: "110deg" }}
         animate={{
           x: ["0vw", "120vw"],
           y: ["0vh", "30vh"],
         }}
         transition={{
           duration: 12,
           delay: 18,
           repeat: Infinity,
           repeatDelay: 25,
           ease: "linear"
         }}
      >
        <Rocket className="w-5 h-5" />
      </motion.div>
    </div>
  );
};

const StatsRoulette = () => {
  const dragRotation = useMotionValue(0);
  const autoRotation = useMotionValue(0);
  const isDragging = useRef(false);

  useAnimationFrame((time, delta) => {
    if (!isDragging.current) {
      autoRotation.set(autoRotation.get() - 0.015 * delta);
    }
  });

  const handlePanStart = () => {
    isDragging.current = true;
  };

  const handlePan = (e: any, info: any) => {
    dragRotation.set(dragRotation.get() + info.delta.x * 0.4);
  };

  const handlePanEnd = (e: any, info: any) => {
    isDragging.current = false;
    const velocity = info.velocity.x;
    const current = dragRotation.get();
    animate(dragRotation, current + velocity * 0.15, {
      type: "spring",
      stiffness: 50,
      damping: 20,
      mass: 1
    });
  };

  const items = [
    { number: "+300", text: "Projetos Lançados", color: "text-[#FFD166]" },
    { number: "26", text: "Anos de Experiência", color: "text-[#06D6A0]" },
    { number: "+3000", text: "Campanhas", color: "text-[#EF476F]" },
    { number: "8", text: "Países Atendidos", color: "text-[#118AB2]" },
  ];

  return (
    <section className="relative overflow-hidden py-40 md:py-56 min-h-[60vh] flex items-center justify-center cursor-grab active:cursor-grabbing border-y border-black/5 mt-12 md:mt-24 z-20 bg-[#0a0a0a]" style={{ perspective: "1200px" }}>
      <SpaceBackground />
      <motion.div
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        className="absolute inset-0 z-20 w-full h-full"
      />
      <motion.div 
        style={{ rotateY: dragRotation, transformStyle: "preserve-3d" }}
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
      >
        <motion.div 
           style={{ rotateY: autoRotation, transformStyle: "preserve-3d" }}
           className="relative w-full h-full flex items-center justify-center pointer-events-none"
        >
          {items.map((item, i) => {
             const angle = (360 / items.length) * i;
             return (
               <div 
                 key={i}
                 className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center will-change-transform"
                 style={{ 
                   transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(clamp(250px, 35vw, 550px))`,
                   transformStyle: "preserve-3d",
                   WebkitBackfaceVisibility: "hidden",
                   backfaceVisibility: "hidden"
                 }}
               >
                  <div 
                    className={`text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] font-black tracking-tighter leading-none ${item.color} filter drop-shadow-[0_0_20px_inherit]`}
                    style={{ textShadow: "0 10px 40px rgba(0,0,0,0.5)" }}
                  >
                     {item.number}
                  </div>
                  <div 
                     className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium text-white uppercase tracking-tighter mt-4 text-center whitespace-nowrap opacity-90"
                  >
                     {item.text}
                  </div>
               </div>
             )
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

const TimelineSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const stories = [
    {
      year: "O Início",
      title: "Na essência do design, pixel por pixel.",
      text: "Logo percebi que tela bonita não paga boleto se ninguém clica. Foi aí que entendi que o visual precisava casar com a conversão profunda e focada em resultados reais.",
      img: "https://images.unsplash.com/photo-1542744094-24638ea0b5b5?q=80&w=1470"
    },
    {
      year: "2018",
      title: "O próprio cobaia (e a fundação).",
      text: "Resolvi empreender e escalei minha própria marca no agressivo e-commerce nacional. Apanhei, testei WooCommerce, Loja Integrada, Meta Ads... e fundei uma agência que rapidamente conectou dezenas de negócios.",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470"
    },
    {
      year: "2020",
      title: "Portugal & Fronteiras.",
      text: "A busca por desafios globais me trouxe a Portugal. Desde então, atuo conectando empresas europeias e brasileiras construindo projetos onde o impacto visual encontra o crescimento rápido de receita.",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470"
    },
    {
      year: "Hoje",
      title: "O futuro não espera.",
      text: "Construo ecossistemas misturando hiper-criatividade com inteligência artificial, de automações via Make até sites em Webflow incríveis. Viro o jogo para quem quer acelerar sem freio na nova economia.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470"
    }
  ];

  return (
    <section id="sobre" className="py-24 md:py-40 bg-white relative z-10 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-6">A Jornada.</h2>
          <p className="text-xl text-black/50 max-w-2xl font-light">
            Como transformei criatividade e suor na construção de ecossistemas digitais de alta performance ao longo dos anos.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start relative pb-32">
          
          <div className="w-full md:w-1/2 sticky top-24 h-[calc(100vh-12rem)] rounded-[2rem] overflow-hidden shadow-xl border border-black/5 bg-neutral-100 hidden md:block">
             <AnimatePresence mode="wait">
              <motion.img
                key={`img-${activeIndex}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                src={stories[activeIndex].img}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>
          
          <div className="w-full h-[50vh] sticky top-24 rounded-3xl overflow-hidden shadow-xl border border-black/5 bg-neutral-100 block md:hidden z-10">
             <AnimatePresence mode="wait">
              <motion.img
                key={`img-mobile-${activeIndex}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                src={stories[activeIndex].img}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          <div className="w-full md:w-1/2 flex flex-col pt-[5vh] pb-[20vh] relative z-20">
            {stories.map((story, i) => (
              <motion.div
                key={i}
                onViewportEnter={() => setActiveIndex(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                className={`py-12 md:py-24 border-t border-black/10 first:border-none transition-opacity duration-500 ${activeIndex === i ? 'opacity-100' : 'opacity-30'}`}
              >
                <span className="text-sm font-semibold tracking-widest text-black/50 uppercase mb-4 block">
                  {story.year}
                </span>
                <h3 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-6 leading-[1.1]">
                   {story.title}
                </h3>
                <p className="text-lg md:text-xl text-black/70 font-light leading-relaxed">
                  {story.text}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

const PortfolioItem: React.FC<{ item: any }> = ({ item }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  return (
    <div 
      className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_35%] min-w-0 group"
      onMouseEnter={() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});
        }
      }}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }}
    >
      <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-neutral-100 border border-black/5 shadow-sm group-hover:shadow-lg transition-shadow duration-500">
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-20 pointer-events-none"></div>
        <img 
          src={item.img} 
          alt={item.title} 
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out z-10 group-hover:opacity-0"
        />
        {item.videoUrl && (
          <video 
            ref={videoRef}
            src={item.videoUrl} 
            muted 
            loop 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}
        <div className="absolute top-6 right-6 z-30 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm">
          <ArrowUpRight size={24} className="text-black" />
        </div>
      </div>
      <div>
        <div className="text-sm font-medium text-black/50 mb-2">{item.category}</div>
        <h3 className="text-2xl font-display font-medium">{item.title}</h3>
      </div>
    </div>
  );
};

const ServicesAccordion = () => {
    return (
      <section id="servicos" className="py-24 md:py-40 bg-[#1B1C1E] text-white relative z-10 w-full rounded-t-[3rem] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
            
            <div className="lg:col-span-4">
               <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-6 leading-tight">
                  Serviços <br/> Criativos
               </h2>
               <p className="text-xl text-white/50 font-light max-w-sm">
                  Elevando marcas ao próximo nível com soluções digitais que misturam design, código e inteligência.
               </p>
               <a href="#contato" className="inline-flex mt-8 px-6 py-3 rounded-full bg-white text-[#1B1C1E] text-sm font-semibold hover:bg-neutral-200 transition-colors">
                 Iniciar projeto
               </a>
            </div>
  
            <div className="lg:col-span-8 flex flex-col">
              {[
                  { title: "Design & Experiência", tag: "UX/UI", desc: "Criamos interfaces irresistíveis. Design minimalista, focado na jornada do usuário e otimizado para retenção." },
                  { title: "Plataformas Web", tag: "E-commerce", desc: "Desenvolvemos em WordPress, WooCommerce, Shopify, Loja Integrada e Webflow. Seu e-commerce construído na ferramenta certa." },
                  { title: "Agentes & IA", tag: "Inovação", desc: "Aplicações incríveis e automações que escalam seu serviço. Menos trabalho braçal, mais inteligência no seu negócio." },
                  { title: "Growth & Ads", tag: "Marketing", desc: "Trafego não é gasto, é investimento. Estruturamos funis em Meta Ads e Google Ads que multiplicam o caixa." }
              ].map((item, idx) => (
                  <div key={idx} className="group border-t border-white/10 py-10 md:py-14 hover:px-6 transition-all duration-500 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div>
                          <p className="text-sm tracking-widest text-white/40 uppercase mb-4">{item.tag}</p>
                          <h3 className="text-3xl md:text-5xl font-display font-light tracking-tight group-hover:tracking-normal transition-all duration-500">{item.title}</h3>
                      </div>
                      <div className="md:max-w-xs overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <p className="text-white/60 text-lg font-light mt-4 md:mt-0">{item.desc}</p>
                      </div>
                      <div className="hidden md:flex w-14 h-14 rounded-full border border-white/20 items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-white group-hover:text-black -rotate-45 group-hover:rotate-0 transition-all duration-500">
                          <ArrowUpRight strokeWidth={1.5} size={24} />
                      </div>
                  </div>
              ))}
            </div>
  
        </div>
      </section>
    );
};

const technologies = [
  { name: "Adobe" },
  { name: "Canva" },
  { name: "Google" },
  { name: "Meta" },
  { name: "WordPress" },
  { name: "Webflow" },
  { name: "Shopify" },
  { name: "Loja Integrada" },
  { name: "Open AI" },
  { name: "Claude" },
  { name: "Midjourney" },
  { name: "Nano Banana" },
  { name: "VEO 3" },
  { name: "Kling" },
  { name: "Seedance" },
  { name: "HTML5" },
  { name: "CSS3" },
  { name: "JavaScript" },
  { name: "React" },
  { name: "TailwindCSS" },
];

export default function App() {
  const [copied, setCopied] = useState(false);
  const email = "contato@criealgo.com.br";
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative selection:bg-black selection:text-white bg-[#F9F9F9] overflow-clip">
      
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 py-8 px-6 md:px-12 flex justify-between items-center max-w-7xl mx-auto mix-blend-difference text-white">
        <div className="font-display font-bold tracking-tighter text-2xl">
          criealgo.
        </div>
        <div className="flex items-center gap-8 font-medium">
          <a href="#sobre" className="hidden md:block hover:opacity-70 transition-opacity">História</a>
          <a href="#trabalho" className="hidden md:block hover:opacity-70 transition-opacity">Trabalhos</a>
          <a href="#servicos" className="hidden md:block hover:opacity-70 transition-opacity">Serviços</a>
          <a href="#contato" className="px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors text-sm font-semibold">
            Fale conosco
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 md:pt-52 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center">
        <FloatingParticles />
        
        <motion.div 
          style={{ y: heroY }}
          initial="hidden"
          animate="visible"
          variants={staggeredContainer}
          className="relative z-10 w-full"
        >
          <motion.h1 variants={fadeIn} className="text-[3rem] leading-[1.1] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6rem] font-display font-medium tracking-tighter mb-10 text-[#1B1B1B] max-w-5xl">
            A conceber e gerar <CursorMediaReveal words={['lojas online,', 'aplicações web,', 'marcas memoráveis,', 'automações à altura,']} media="https://github.com/dhemesandersen.png" /> <br className="hidden md:block"/> interfaces bonitas e ecossistemas à medida.
          </motion.h1>
          
          <motion.div variants={fadeIn} className="flex flex-col md:flex-row gap-8 items-start md:items-center max-w-5xl">
             <div className="h-px w-16 bg-black/20 hidden md:block mt-2"></div>
             <p className="text-lg md:text-xl text-black/60 font-light max-w-2xl leading-relaxed">
               Desde o design impecável de websites à construção de produtos online robustos. Operamos de forma independente para construir soluções apoiadas em Inteligência Artificial para o seu momento atual.
             </p>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <TiltVideoCard />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Roulette Section */}
      <StatsRoulette />

      {/* Timeline / Journey Section */}
      <TimelineSection />

      {/* Portfolio Carousel Section */}
      <section id="trabalho" className="py-24 px-6 md:px-12 bg-white text-black overflow-hidden relative z-20">
        <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-4">
              Projetos que <br /> <span className="italic text-black/40">dão orgulho.</span>
            </h2>
            <p className="text-black/50 text-xl font-light">Uma amostra do que construímos recentemente.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={scrollPrev}
              className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-neutral-100 transition-colors"
            >
              <MoveLeft size={24} strokeWidth={1.5} />
            </button>
            <button 
              onClick={scrollNext}
              className="w-14 h-14 rounded-full bg-[#1B1C1E] text-white flex items-center justify-center hover:bg-black transition-colors shadow-lg"
            >
              <MoveRight size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-6 md:gap-8">
            {[
              { title: "Marca Exclusiva BR", category: "Shopify E-commerce", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1470&auto=format&fit=crop", videoUrl: "https://cdn.coverr.co/videos/coverr-surfing-through-the-waves-4252/1080p.mp4" },
              { title: "Startup Europeia", category: "Automação & CRM", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop", videoUrl: "https://cdn.coverr.co/videos/coverr-a-beautiful-workspace-4596/1080p.mp4" },
              { title: "Global Expansion", category: "Meta Ads & Tráfego", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1515&auto=format&fit=crop", videoUrl: "https://cdn.coverr.co/videos/coverr-someone-typing-on-a-macbook-5034/1080p.mp4" },
              { title: "Plataforma Educacional", category: "Webflow & IA", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1374&auto=format&fit=crop", videoUrl: "https://cdn.coverr.co/videos/coverr-typing-on-a-keyboard-and-using-a-mouse-5031/1080p.mp4" }
            ].map((item, idx) => (
              <PortfolioItem key={idx} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee Section */}
      <section className="py-16 bg-white text-black border-t border-black/5 overflow-hidden flex relative z-20 pb-24">
        <div className="flex w-max animate-slide hover:opacity-100 transition-opacity duration-500">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 sm:gap-24 px-8 sm:px-12 items-center whitespace-nowrap">
              {technologies.map((tech) => (
                <div key={tech.name} className="flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity cursor-default grayscale hover:grayscale-0 group">
                  {tech.icon ? (
                    <img src={tech.icon} alt={tech.name} className="h-8 md:h-12 w-auto object-contain transition-all duration-300" />
                  ) : (
                    <span className="text-2xl md:text-3xl font-display font-medium tracking-tight">
                      {tech.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <ServicesAccordion />

      {/* CTA / Footer Section */}
      <footer id="contato" className="py-32 px-6 md:px-12 bg-white relative z-20 text-center rounded-t-[3rem] -mt-10">
         <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggeredContainer}
          className="flex flex-col items-center max-w-7xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-display font-medium tracking-tighter leading-none mb-12 text-[#1B1C1E]">
            Tem um projeto <br/><span className="text-black/40 italic">em mente?</span> 👋
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-32 w-full max-w-md mx-auto">
            <a 
               href={`mailto:${email}`}
               className="group w-full sm:w-auto px-10 py-5 bg-[#1B1C1E] text-white rounded-full font-medium text-lg flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl"
            >
               <span>Enviar mensagem</span>
               <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
            </a>
            
            <button 
               onClick={handleCopyEmail}
               className="w-full sm:w-auto px-10 py-5 rounded-full border border-black/10 bg-white text-[#1B1C1E] hover:bg-neutral-50 transition-all flex items-center justify-center gap-3 font-medium text-lg"
            >
               <AnimatePresence mode="wait">
                  {copied ? (
                     <motion.div
                        key="check"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center gap-2 text-green-500"
                     >
                        <CheckCircle2 size={22} /> Copiado
                     </motion.div>
                  ) : (
                     <motion.div
                        key="copy"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center gap-2"
                     >
                        <Copy size={20} className="opacity-50" /> {email}
                     </motion.div>
                  )}
               </AnimatePresence>
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6 text-sm text-black/50 font-medium pt-8 border-t border-black/5">
            <p>&copy; {new Date().getFullYear()} criealgo. Todos os direitos reservados.</p>
            <div className="flex gap-8">
               <a href="#" className="hover:text-black transition-colors">X (Twitter)</a>
               <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
               <a href="#" className="hover:text-black transition-colors">Instagram</a>
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
