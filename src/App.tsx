import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { 
  ArrowUpRight, 
  Cpu, 
  Layers, 
  Sliders, 
  Sparkles, 
  Eye, 
  Check, 
  Copy, 
  Info, 
  RefreshCw, 
  X, 
  ChevronRight, 
  ChevronLeft,
  Play,
  Activity, 
  Grid3X3, 
  Settings, 
  Paintbrush, 
  Compass,
  ArrowRight,
  Database,
  ExternalLink,
  User,
  Mail,
  Smartphone,
  Zap,
  Search,
  Grid,
  Monitor,
  LayoutGrid
} from 'lucide-react';

import { CATEGORIES, PROJECTS } from './data';
import { CategoryId, Project } from './types';

// High-quality professional design photography URLs to ensure robust compilation
const fengZhiColdChain = 'https://bee-reg-ab.imagency.cn/e/a21b7acee1d814d3a6f00ce689daeef9.jpg';
const visualDesignShowcase = 'https://bee-reg-ab.imagency.cn/e/c823038ae169471669290d74decd6830.jpg';
const packagingDesignShowcase = 'https://bee-reg-ab.imagency.cn/e/2f6f587f6c588b69b2e9da9d2e6dfa9c.jpg';
const threeDDesignShowcase = 'https://bee-reg-ab.imagency.cn/e/f52b3e45de0fce07bb88fc0815f71bd7.jpg';

const getBilingualInteractiveLogic = (projectId: string, lang: 'zh' | 'en') => {
  const data: Record<string, { objective: string, scientificApproach: string, steps: string[] }> = {
    'ui-neomorphic-dashboard': {
      objective: lang === 'zh' ? '在长时间数据监控和分析操作下，优化多参数面板的视觉搜寻速度并降低眼部疲劳。' : 'Optimize data telemetry monitoring and prevent visual fatigue under long-hour analytical operations.',
      scientificApproach: lang === 'zh' ? '应用菲茨定律计算最优触控靶区尺寸，结合韦伯-费希纳定律精调背景对比度，确保即使在40%高透光率的玻璃底板上，文本与底色对比度也严格维持在 4.5:1 的无障碍黄金比例。' : 'Applied Fitts\'s Law for target acquisition sizes, combined with Weber-Fechner law of perception for tone adjustments, ensuring text-to-background contrast remains at a perfect 4.5:1 ratio even with glass overlay.',
      steps: lang === 'zh' ? [
        '用户进入面板，触发 30ms 增量阶梯式排队渲染序列，有效消解大块色面突然出现对视网膜造成的瞬时视神经冲击。',
        '严谨的视觉重心层次设计，优先将用户的焦点指引至核心实时曲线图（即全局视觉锚点）。',
        '卡片组件在Z轴方向上执行 0.25 秒的物理阻尼弹簧运动，确保微交互平稳自然。'
      ] : [
        'User enters dashboard with a cascading content-loading sequence (staggered by 30ms increments to prevent jarring shifts).',
        'Visual hierarchy directs focus to the core Telemetry graph (primary anchor).',
        'Interactive card expanders translate on the Z-axis with 0.25s spring physics, offering non-obtrusive detailed parameters on-demand.'
      ]
    },
    'ui-synapse-notes': {
      objective: lang === 'zh' ? '帮助用户保持深度心流写作，同时揭示其知识库中的多层潜在关联。' : 'Facilitate uninterrupted deep writing state (Flow) while surfacing hidden semantic connections.',
      scientificApproach: lang === 'zh' ? '采用全屏柔和暗化遮罩，当用户开始打字时，非光标聚焦区域将平滑淡化至 40% 不透明度，完美进入心流无干扰状态。' : 'Built a custom distraction-free mode utilizing a dynamic viewport masking gradient, allowing non-focal text blocks to fade to 40% opacity based on current text-cursor vertical coordinate.',
      steps: lang === 'zh' ? [
        '开始打字时，系统微弱调暗背景光晕，将视觉通道收窄在光标周围 150px 范围内。',
        '鼠标悬停于网格拓结构节点时，触发重力模拟波动。',
        '按下 Esc 触发全屏矩阵菜单，利用斐波那契螺旋线精确排布快捷入口。'
      ] : [
        'Typing initiates a smooth background light dampening.',
        'Hovering over node relationships triggers a physics-calculated spatial vibration feedback.',
        'Escape triggers custom overlay menu with index mapping on a 12-point mathematical spiral.'
      ]
    },
    'brand-lumen-labs': {
      objective: lang === 'zh' ? '构建适应全场景、全屏幕比例的极简主义物理能量美学品牌形象。' : 'Establish a scientific yet deeply premium brand presence that translates seamlessly from microscopic packaging to giant digital billboards.',
      scientificApproach: lang === 'zh' ? '编写定制的 SVG 曲线矢量自适应渲染脚本，根据渲染尺寸和视口比例动态计算标志圆弧度，保证 100% 清晰对齐。' : 'Developed an algorithmic vector generation script that computes the logo\'s curvature dynamically based on the rendering size and viewport ratio, ensuring crisp vector alignment on any grid scale.',
      steps: lang === 'zh' ? [
        'Logo 的光圈比例随页面滚动深度进行无极平滑收缩和舒张。',
        '品牌核心色板自动在 AAA 级对比度阈值间自适应调节，无惧不同设备环境。',
        '双击或滚动在不同的媒介模型（手机、网页、纸张）间无缝呈现标识。'
      ] : [
        'Logo scale shrinks and expands smoothly depending on dynamic viewport scrolling distance.',
        'Branded color palettes calibrate dynamically against AAA contrast thresholds under low-light display modes.',
        'Double-clicking or scrolling seamlessly toggles identity projections between web, mobile and physical models.'
      ]
    }
  };

  return data[projectId] || null;
};

interface HeroSectionProps {
  language: 'zh' | 'en';
  theme: 'light' | 'dark';
}

function HeroSection({ language, theme }: HeroSectionProps) {
  const [heroHoverPos, setHeroHoverPos] = useState({ x: 50, y: 50 });
  const [heroParallax, setHeroParallax] = useState({ x: 0, y: 0 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    setHeroHoverPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
    setHeroParallax({
      x: normalizedX * 50,
      y: normalizedY * 50
    });
  };

  const handleHeroMouseLeave = () => {
    setHeroParallax({ x: 0, y: 0 });
  };

  return (
    <section 
      id="hero-intro"
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className={`glass-panel backdrop-blur-3xl border shadow-2xl rounded-3xl p-8 md:p-14 mb-16 relative overflow-hidden text-center w-full mx-auto transition-all duration-500 group ${theme === 'light' ? 'bg-white/35 border-white/50 shadow-indigo-100/30' : 'bg-slate-800/30 border-white/10 shadow-black/30'}`}
    >
      <motion.div 
        animate={{
          x: -heroParallax.x * 0.7,
          y: -heroParallax.y * 0.7,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 25 }}
        className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-blue-400/20 blur-3xl pointer-events-none animate-pulse" 
        style={{ animationDuration: '8s' }} 
      />
      <motion.div 
        animate={{
          x: heroParallax.x * 0.9,
          y: heroParallax.y * 0.9,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 25 }}
        className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-violet-400/20 blur-3xl pointer-events-none animate-pulse" 
        style={{ animationDuration: '12s' }} 
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div 
          animate={{
            x: heroParallax.x * 0.4,
            y: heroParallax.y * 0.4,
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 25 }}
          className="w-80 h-32 rounded-full bg-gradient-to-r from-indigo-300/10 to-pink-300/10 blur-3xl" 
        />
      </div>

      <motion.div 
        className="absolute pointer-events-none rounded-full bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 blur-[80px] w-96 h-96 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
        style={{
          left: `${heroHoverPos.x}%`,
          top: `${heroHoverPos.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/70 border border-slate-200/60 rounded-full shadow-xs mb-6 backdrop-blur-md">
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            {language === 'zh' ? '最终的设计版权属于个人' : 'The final design copyright belongs to the individual'}
          </span>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-24 bg-white/10 backdrop-blur-md -rotate-2 rounded-xl pointer-events-none -z-10 opacity-60 border border-white/20" />

        <h1 
          id="portfolio-title"
          className="font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none mb-6 relative select-none"
        >
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent animate-gradient-flow drop-shadow-sm">
            {language === 'zh' ? '个人设计作品集' : 'Personal Design Portfolio'}
          </span>
        </h1>
        
        <h2 className={`text-lg md:text-2xl font-light mb-6 font-display tracking-wide max-w-xl mx-auto flex items-center justify-center gap-2 ${theme === 'light' ? 'text-slate-800' : 'text-slate-300'}`}>
          <span className="h-px w-6 bg-slate-300" />
          <span>{language === 'zh' ? '以理性逻辑推演商业美学' : '以理性逻辑推演商业美学'}</span>
          <span className="h-px w-6 bg-slate-300" />
        </h2>

        <p className={`text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-sans font-light ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
          {language === 'zh' 
            ? '汇集UI、品牌、主视觉、包装、3D全类设计，结合用户体验与商业需求，多元风格、多行业实战项目，展现完整设计落地能力。'
            : 'Bringing together UI, branding, key visual, packaging, and 3D design, combining user experience with business needs. Diverse styles and practical projects across multiple industries showcase full-cycle execution and design delivery capabilities.'
          }
        </p>
      </div>
    </section>
  );
}

interface BrandSlideViewerProps {
  brandActiveStep: number;
  setBrandActiveStep: React.Dispatch<React.SetStateAction<number>>;
  glowIntensity: number;
  tiltIntensity: number;
  BRAND_SLIDES: any[];
}

function BrandSlideViewer({ 
  brandActiveStep, 
  setBrandActiveStep, 
  glowIntensity, 
  tiltIntensity,
  BRAND_SLIDES 
}: BrandSlideViewerProps) {
  const [brandTilt, setBrandTilt] = useState({ rx: 0, ry: 0 });
  const [brandHoverPos, setBrandHoverPos] = useState({ x: 50, y: 50 });
  const [isBrandHovered, setIsBrandHovered] = useState<boolean>(false);

  const handleBrandMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    setBrandTilt({
      rx: normalizedY * -12 * (tiltIntensity / 50),
      ry: normalizedX * 12 * (tiltIntensity / 50)
    });
    setBrandHoverPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
    setIsBrandHovered(true);
  };

  return (
    <div className="flex-grow relative overflow-hidden flex items-center justify-center p-4 lg:p-6 bg-slate-100/40 min-h-[300px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={brandActiveStep}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-full h-full flex items-center justify-center relative rounded-xl overflow-hidden border border-slate-200/55 bg-white shadow-inner group/brand transition-all duration-300 ease-out cursor-crosshair"
          onMouseMove={handleBrandMouseMove}
          onMouseLeave={() => {
            setBrandTilt({ rx: 0, ry: 0 });
            setIsBrandHovered(false);
          }}
          style={{
            transform: `perspective(800px) rotateX(${brandTilt.rx}deg) rotateY(${brandTilt.ry}deg)`,
            transformStyle: 'preserve-3d',
            boxShadow: isBrandHovered ? `0 20px 40px -10px rgba(0,0,0,0.08), 0 0 25px rgba(255,107,53,${0.15 * (glowIntensity / 50)})` : 'none',
          }}
        >
          <div className="w-full h-full overflow-auto scrollbar-none flex items-center justify-center p-2 pointer-events-none">
            <img 
              src={BRAND_SLIDES[brandActiveStep].image} 
              alt={BRAND_SLIDES[brandActiveStep].alt || BRAND_SLIDES[brandActiveStep].title}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-full object-contain pointer-events-none rounded-md transition-transform duration-700"
            />
          </div>

          {/* Specular glare dynamic highlight */}
          {isBrandHovered && (
            <div 
              className="absolute inset-0 pointer-events-none z-30 opacity-70 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle 200px at ${brandHoverPos.x}% ${brandHoverPos.y}%, rgba(255,255,255,0.3) 0%, transparent 80%)`,
                mixBlendMode: 'overlay',
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setBrandActiveStep((prev) => (prev > 0 ? prev - 1 : BRAND_SLIDES.length - 1));
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/95 hover:bg-[#FF6B35] text-slate-700 hover:text-white border border-slate-200 shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <span className="block rotate-180 text-xs">➔</span>
      </button>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          setBrandActiveStep((prev) => (prev < BRAND_SLIDES.length - 1 ? prev + 1 : 0));
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/95 hover:bg-[#FF6B35] text-slate-700 hover:text-white border border-slate-200 shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <span className="text-sm">➔</span>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/50 shadow-md z-10">
        {BRAND_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setBrandActiveStep(idx);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              brandActiveStep === idx 
                ? 'bg-[#FF6B35] w-3.5' 
                : 'bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

interface UiMockupViewerProps {
  uiActiveStep: number;
  activeSlide: any;
  uiShowGrid: boolean;
  uiShowXRay: boolean;
  glowIntensity: number;
  tiltIntensity: number;
}

function UiMockupViewer({
  uiActiveStep,
  activeSlide,
  uiShowGrid,
  uiShowXRay,
  glowIntensity,
  tiltIntensity
}: UiMockupViewerProps) {
  const [deviceTilt, setDeviceTilt] = useState({ rx: 0, ry: 0 });
  const [lensX, setLensX] = useState<number>(50);
  const [lensY, setLensY] = useState<number>(50);
  const [isHoveringLens, setIsHoveringLens] = useState<boolean>(false);

  const handleDeviceMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    setDeviceTilt({
      rx: normalizedY * -16 * (tiltIntensity / 50),
      ry: normalizedX * 16 * (tiltIntensity / 50)
    });
    setLensX((x / rect.width) * 100);
    setLensY((y / rect.height) * 100);
    setIsHoveringLens(true);
  };

  return (
    <motion.div
      key="mockup-canvas"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center w-full h-full"
    >
      <div 
        className="absolute w-[220px] h-[220px] rounded-full blur-[90px] opacity-[0.15] pointer-events-none transition-all duration-1000"
        style={{
          background: uiActiveStep < 3 ? '#3B82F6' : uiActiveStep < 6 ? '#EF4444' : uiActiveStep < 9 ? '#10B981' : uiActiveStep < 13 ? '#F59E0B' : '#6366F1'
        }}
      />

      <div 
        className="w-[170px] h-[290px] sm:w-[195px] sm:h-[330px] rounded-[24px] border border-slate-200/80 overflow-hidden relative bg-white flex flex-col cursor-crosshair group/phone transition-all duration-300 ease-out"
        onMouseMove={handleDeviceMouseMove}
        onMouseLeave={() => {
          setIsHoveringLens(false);
          setDeviceTilt({ rx: 0, ry: 0 });
        }}
        style={{
          transform: `perspective(800px) rotateX(${deviceTilt.rx}deg) rotateY(${deviceTilt.ry}deg)`,
          transformStyle: 'preserve-3d',
          boxShadow: `0 25px 50px -12px rgba(15,23,42,0.12), 0 0 30px rgba(99,102,241,${0.18 * (glowIntensity / 50)})`,
        }}
      >
        <div className="flex-1 w-full h-full relative overflow-hidden bg-white pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.img
              key={uiActiveStep}
              src={activeSlide.image}
              alt={activeSlide.title}
              referrerPolicy="no-referrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-contain select-none pointer-events-none block"
            />
          </AnimatePresence>
        </div>

        <div 
          className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover/phone:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 120px at ${lensX}% ${lensY}%, rgba(255,255,255,0.3) 0%, transparent 80%)`,
            mixBlendMode: 'overlay',
          }}
        />

        {uiShowGrid && (
          <div className="absolute inset-0 grid grid-cols-4 gap-2.5 px-2.5 py-5 pointer-events-none z-20">
            {[1, 2, 3, 4].map((col) => (
              <div key={col} className="h-full bg-cyan-400/8 border-x border-cyan-400/25 flex flex-col justify-between text-[5px] font-mono text-cyan-300 p-0.5">
                <span>COL_{col}</span>
                <span>W_48px</span>
              </div>
            ))}
          </div>
        )}

        {uiShowXRay && isHoveringLens && (
          <div 
            className="absolute w-24 h-24 rounded-full border-2 border-indigo-500 shadow-2xl pointer-events-none overflow-hidden z-20"
            style={{
              left: `${lensX}%`,
              top: `${lensY}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <img 
              src={activeSlide.image} 
              alt="Magnifier xray"
              referrerPolicy="no-referrer"
              className="absolute max-w-none w-[320%] h-auto block pointer-events-none"
              style={{
                left: `${-lensX * 3.2 + 50}%`,
                top: `${-lensY * 3.2 + 50}%`,
                filter: 'contrast(1.25) brightness(1.1) saturate(1.3) hue-rotate(15deg)',
              }}
            />
            <div className="absolute inset-0 border border-indigo-500/40 rounded-full flex items-center justify-center">
              <div className="w-2.5 h-[1px] bg-indigo-500" />
              <div className="h-2.5 w-[1px] bg-indigo-500" />
            </div>
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-indigo-600 text-white font-mono text-[5px] px-1 rounded-xs uppercase tracking-wider font-semibold">
              TELE_LENS
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface MusicSlideViewerProps {
  musicActiveStep: number;
  setMusicActiveStep: React.Dispatch<React.SetStateAction<number>>;
  activeMusicSlide: any;
  musicShowGrid: boolean;
  musicShowXRay: boolean;
  language: 'zh' | 'en';
  setMusicHapticLogs: React.Dispatch<React.SetStateAction<string[]>>;
  MUSIC_LOGIC_SLIDES: any[];
}

function MusicSlideViewer({
  musicActiveStep,
  setMusicActiveStep,
  activeMusicSlide,
  musicShowGrid,
  musicShowXRay,
  language,
  setMusicHapticLogs,
  MUSIC_LOGIC_SLIDES
}: MusicSlideViewerProps) {
  const [lensX, setLensX] = useState<number>(50);
  const [lensY, setLensY] = useState<number>(50);
  const [isHoveringLens, setIsHoveringLens] = useState<boolean>(false);

  const handleMusicMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLensX(x);
    setLensY(y);
    setIsHoveringLens(true);
    
    if (Math.random() < 0.04) {
      const time = new Date().toLocaleTimeString();
      setMusicHapticLogs(prev => [
        `[${time}] 🔍 Magnifying glass coordinates updated: x: ${x.toFixed(0)}%, y: ${y.toFixed(0)}%`,
        ...prev
      ].slice(0, 5));
    }
  };

  return (
    <div className="flex-grow relative overflow-hidden flex items-center justify-center p-4 lg:p-6 bg-slate-100/50 min-h-[350px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={musicActiveStep}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-full h-full flex items-center justify-center relative rounded-xl overflow-hidden border border-slate-200/80 bg-white shadow-md cursor-crosshair"
          onMouseMove={handleMusicMouseMove}
          onMouseLeave={() => {
            setIsHoveringLens(false);
          }}
        >
          <div className="w-full h-full overflow-hidden flex items-center justify-center p-2 pointer-events-none">
            <img 
              src={activeMusicSlide.image} 
              alt={activeMusicSlide.title}
              className="max-w-full max-h-full object-contain pointer-events-none rounded-md"
            />
          </div>

          <div 
            className="absolute inset-0 pointer-events-none z-30 opacity-40 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 250px at ${lensX}% ${lensY}%, rgba(255,255,255,0.25) 0%, transparent 80%)`,
              mixBlendMode: 'screen',
            }}
          />

          {musicShowGrid && (
            <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.06] select-none bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:16px_16px]" />
          )}

          {musicShowXRay && isHoveringLens && (
            <div
              className="absolute w-44 h-44 rounded-full border-2 border-orange-500 shadow-[0_10px_25px_rgba(249,115,22,0.15)] pointer-events-none z-30 bg-white overflow-hidden"
              style={{
                left: `calc(${lensX}% - 88px)`,
                top: `calc(${lensY}% - 88px)`,
              }}
            >
              <div 
                className="absolute w-[400%] h-[400%]"
                style={{
                  backgroundImage: `url(${activeMusicSlide.image})`,
                  backgroundSize: '100% 100%',
                  backgroundPosition: `${lensX}% ${lensY}%`,
                  transform: 'scale(1.2)',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 relative">
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-orange-400" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-orange-400" />
                </div>
                <span className="absolute bottom-2 font-mono text-[8px] text-orange-600 bg-white/90 border border-slate-200 px-1 rounded">
                  {lensX.toFixed(0)}%, {lensY.toFixed(0)}%
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => {
          setMusicActiveStep(prev => (prev - 1 + MUSIC_LOGIC_SLIDES.length) % MUSIC_LOGIC_SLIDES.length);
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 border border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-white hover:shadow-md transition-all z-20 shadow-sm"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button
        onClick={() => {
          setMusicActiveStep(prev => (prev + 1) % MUSIC_LOGIC_SLIDES.length);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 border border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-white hover:shadow-md transition-all z-20 shadow-sm"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

export default function App() {
  // Navigation & Filtering
  const [activeTab, setActiveTab] = useState<CategoryId>('ui');
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  // Selected Project for Case Study Inspector
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Color copy feedback
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  
  // Active step inside Project's interactive user flow
  const [activeFlowStep, setActiveFlowStep] = useState<number>(0);

  // Active sub-steps/slides for UI & Brand horizontal split showcases
  const [uiActiveStep, setUiActiveStep] = useState<number>(0);
  const [uiRenderStyle, setUiRenderStyle] = useState<'mockup' | 'exploded' | 'compare'>('mockup');
  const [uiDeviceTheme, setUiDeviceTheme] = useState<'dark' | 'light'>('dark');
  const [uiExplosionGap, setUiExplosionGap] = useState<number>(80);
  const [uiShowXRay, setUiShowXRay] = useState<boolean>(false);
  const [uiShowGrid, setUiShowGrid] = useState<boolean>(false);
  const [uiActiveFlow, setUiActiveFlow] = useState<'all' | 'core' | 'medical' | 'sleep' | 'settings'>('all');
  const [uiHapticLogs, setUiHapticLogs] = useState<string[]>([
    '🎨 UI Systems initialized. 12 responsive layouts loaded.',
    '⚡ Active telemetry: 60FPS drawing over Fitts\'s Law grids.'
  ]);
  const [uiToastMessage, setUiToastMessage] = useState<string | null>(null);

  const [brandActiveStep, setBrandActiveStep] = useState<number>(0);

  // New sub-tabs and controls for overall music UI design logic system
  const [activeUiSubTab, setActiveUiSubTab] = useState<'logic' | 'simulator'>('logic');
  const [musicActiveStep, setMusicActiveStep] = useState<number>(0);
  const [musicShowXRay, setMusicShowXRay] = useState<boolean>(false);
  const [musicShowGrid, setMusicShowGrid] = useState<boolean>(false);
  const [musicAutoPlay, setMusicAutoPlay] = useState<boolean>(false);
  const [musicHapticLogs, setMusicHapticLogs] = useState<string[]>([
    '🎼 Music Design Logic Engine initialized. 13 boards ready.',
    '📐 Analytical coordinate systems aligned to 8px soft grids.',
    '🎨 Soundwave color palettes copy-monitored.'
  ]);

  // Customized dynamic interaction states
  const [glowIntensity, setGlowIntensity] = useState<number>(50); // in %, default to 50%
  const [tiltIntensity, setTiltIntensity] = useState<number>(50); // in %, default to 50%
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Refs and smooth scrolling synchronizers for filmstrip bottom bars
  const uiScrollContainerRef = useRef<HTMLDivElement>(null);
  const musicScrollContainerRef = useRef<HTMLDivElement>(null);
  const brandScrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (uiScrollContainerRef.current) {
      const container = uiScrollContainerRef.current;
      const activeEl = container.children[uiActiveStep] as HTMLElement;
      if (activeEl) {
        const containerWidth = container.clientWidth;
        const activeWidth = activeEl.clientWidth;
        const targetScrollLeft = activeEl.offsetLeft - (containerWidth / 2) + (activeWidth / 2);
        container.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [uiActiveStep]);

  useEffect(() => {
    if (musicScrollContainerRef.current) {
      const container = musicScrollContainerRef.current;
      const activeEl = container.children[musicActiveStep] as HTMLElement;
      if (activeEl) {
        const containerWidth = container.clientWidth;
        const activeWidth = activeEl.clientWidth;
        const targetScrollLeft = activeEl.offsetLeft - (containerWidth / 2) + (activeWidth / 2);
        container.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [musicActiveStep]);

  useEffect(() => {
    if (brandScrollContainerRef.current) {
      const container = brandScrollContainerRef.current;
      const activeEl = container.children[brandActiveStep] as HTMLElement;
      if (activeEl) {
        const containerWidth = container.clientWidth;
        const activeWidth = activeEl.clientWidth;
        const targetScrollLeft = activeEl.offsetLeft - (containerWidth / 2) + (activeWidth / 2);
        container.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [brandActiveStep]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const uiScrollRef = React.useRef<HTMLDivElement>(null);
  const brandScrollRef = React.useRef<HTMLDivElement>(null);

  // Auto scroll UI browser preview depending on uiActiveStep
  useEffect(() => {
    if (uiScrollRef.current) {
      const container = uiScrollRef.current;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      if (uiActiveStep === 0) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (uiActiveStep === 1) {
        container.scrollTo({ top: (scrollHeight - clientHeight) / 2, behavior: 'smooth' });
      } else if (uiActiveStep === 2) {
        container.scrollTo({ top: scrollHeight - clientHeight, behavior: 'smooth' });
      }
    }
  }, [uiActiveStep]);

  // Auto scroll Brand browser preview depending on brandActiveStep
  useEffect(() => {
    if (brandScrollRef.current) {
      const container = brandScrollRef.current;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll <= 10) return;
      const targetScroll = (maxScroll / (BRAND_SLIDES.length - 1)) * brandActiveStep;
      container.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }, [brandActiveStep]);

  // UI Slide data definition containing the 12 custom mobile PNG layouts for the Music App
  const UI_SLIDES = [
    {
      title: '数字资产包与曲库离线管理',
      englishTitle: 'Offline Library & Digital Asset Packages',
      image: 'https://bee-reg-ab.imagency.cn/e/0e67a0f0f6adc37159aef9f0397d6534.png',
      desc: '查看已下载和离线缓存的高解析度音轨包，带有存储状态智能分析和极简数据一键清理。',
      englishDesc: 'Offline high-resolution audio asset packages with intelligent storage analysis and one-click cache purging.',
      tag: 'Offline Pack',
      flow: 'settings',
      metrics: [
        { label: 'Offline Tracks', value: '1,420 Songs' },
        { label: 'Cache Usage', value: '45.8 GB' },
        { label: 'Hi-Res Match', value: '100%' }
      ]
    },
    {
      title: '听觉节奏与心率同步散点图',
      englishTitle: 'Rhythm-HRV Tempo Sync Analysis',
      image: 'https://bee-reg-ab.imagency.cn/e/7fe4d8a9950837bad2265ef892fa57f8.png',
      desc: '记录实时听觉刺激（BPM）与心率变异性（HRV）的离散散点图，直观映射音乐节奏对自主神经系统的调谐。',
      englishDesc: 'HRV scatter plots measuring dynamic autonomic nervous responses synchronized directly with active audio tempo (BPM).',
      tag: 'HRV Tempo Sync',
      flow: 'settings',
      metrics: [
        { label: 'Tempo Range', value: '60-180BPM' },
        { label: 'Coherence', value: 'Live' },
        { label: 'Artifact Filter', value: 'Active' }
      ]
    },
    {
      title: '睡眠音频白噪音组合',
      englishTitle: 'Sleep Soundscape Mixer',
      image: 'https://bee-reg-ab.imagency.cn/e/e8dd61d98fa54bd3df14ac2a5b7cb414.png',
      desc: '多通道环境白噪音、雨声、风声与脑波音乐混合器，支持分轨音量微调与睡眠深度曲线映射。',
      englishDesc: 'Advanced environment mixing dashboard, allowing multi-track volume balance across rainfall, wind, waves and cerebral rhythm tracks.',
      tag: 'Sound Mixer',
      flow: 'sleep',
      metrics: [
        { label: 'Mixed Channels', value: '5 Tracks' },
        { label: 'DSP Clock', value: '96kHz' },
        { label: 'Binaural Sync', value: '98.4%' }
      ]
    },
    {
      title: '高分贝耳健康与噪声超限预警',
      englishTitle: 'Acoustic DB & Otological Risk Warning',
      image: 'https://bee-reg-ab.imagency.cn/e/af9a0055086c5b6e00b75d13cf7200e9.png',
      desc: '监测耳机长时间高分贝暴露风险，高对比度紧急声压预警，内置自适应听觉保护衰减指南。',
      englishDesc: 'Critical ear fatigue and decibel limit alerts in high-contrast styling, paired with dynamic protective audio attenuation steps.',
      tag: 'Ear Alert',
      flow: 'sleep',
      metrics: [
        { label: 'DB Threshold', value: '85dB+' },
        { label: 'Warning Code', value: 'Level-III' },
        { label: 'Safe Duration', value: '5 Steps' }
      ]
    },
    {
      title: '助眠声学模式与脑波韵律模型',
      englishTitle: 'Sleep Soundscape & Rhythm Model',
      image: 'https://bee-reg-ab.imagency.cn/e/4d44a3798e3cf013bfc249d048e27bcc.png',
      desc: '挖掘白噪声与双耳节拍对脑波节奏的谐振，将睡眠环境音效凝练为高直观度的睡前脑波共鸣环形得分。',
      englishDesc: 'Advanced sleep-induction acoustics analysis summarizing brainwave entrainment and pink noise resonance into intuitive circadian rings.',
      tag: 'Soundscape',
      flow: 'sleep',
      metrics: [
        { label: 'Binaural Sync', value: '96.2%' },
        { label: 'Resonance Score', value: '88/100' },
        { label: 'Theta Wave Rate', value: '94.1%' }
      ]
    },
    {
      title: '多维音频波形与频段解析曲线',
      englishTitle: 'Multi-Band Audio Waveform Telemetry',
      image: 'https://bee-reg-ab.imagency.cn/e/c423d5b6673cc1e6b7fc4ab148e99a87.png',
      desc: '利用毫秒级时序频域图表实时展示音频信号输出波形，通过动态阻尼与滑动视窗捕捉高精度的泛音走势。',
      englishDesc: 'High-precision real-time audio frequency telemetry showcasing output waves with fluid damping and timeline harmonics scrubbing.',
      tag: 'Waveform',
      flow: 'core',
      metrics: [
        { label: 'Sampling Rate', value: '192kHz' },
        { label: 'Resolution', value: '32-bit' },
        { label: 'Spectral Nodes', value: '1.4k' }
      ]
    },
    {
      title: '多端协同设计与全局控制板',
      englishTitle: 'Cross-Device Orchestration & Layout',
      image: 'https://bee-reg-ab.imagency.cn/e/cc1e5be7514a7716985e5bfd553afbb8.png',
      desc: '支持在多类自适应屏幕规格上流式呈现，优化桌面端、车辆终端等不同比例下的图形与交互排布。',
      englishDesc: 'Fluidly adaptive interface layout scales across high-contrast environments ensuring responsive element positioning on variable screens.',
      tag: 'Layout Grid',
      flow: 'settings',
      metrics: [
        { label: 'Sync Delay', value: '15ms' },
        { label: 'Adaptability', value: '100%' },
        { label: 'Target Ratio', value: 'Auto' }
      ]
    },
    {
      title: '全景均衡器与高级音频输出设置',
      englishTitle: 'Master Equalizer & Pro Output Engine',
      image: 'https://bee-reg-ab.imagency.cn/e/8ecad97350497f08ed6c9f3d515ade88.png',
      desc: '专业级多通道均衡微调与数模转换（DAC）采样率锁定，优化耳机的瞬态响应与高低音质感。',
      englishDesc: 'Studio-grade multichannel equalizer tweaking and hardware DAC sample rate locking to optimize dynamic transient response and timbre clarity.',
      tag: 'Master EQ',
      flow: 'settings',
      metrics: [
        { label: 'Channels', value: '10 Bands' },
        { label: 'Pre-amp Gain', value: '-3.5dB' },
        { label: 'Dithering', value: 'TDF' }
      ]
    },
    {
      title: 'AI 音乐智能流转与播放大盘',
      englishTitle: 'AI Music Flow & Playback Dashboard',
      image: 'https://bee-reg-ab.imagency.cn/e/0158649a2c36f8b6dbaeb000824fa43d.png',
      desc: '聚合实时音频流转率、流派能量分布、动态赫兹与高维均衡器参数，基于玻璃拟态组件实现无感音频交互。',
      englishDesc: 'Main hub aggregating real-time audio streams, genre energy metrics, Hertz waveforms, and high-dimensional EQ controls in glassmorphic cards.',
      tag: 'Dashboard',
      flow: 'core',
      metrics: [
        { label: 'Refresh Rate', value: '120Hz' },
        { label: 'Audio Bitrate', value: '320kbps' },
        { label: 'EQ Channels', value: '10 Bands' }
      ]
    },
    {
      title: '听众勋章与乐迷成就墙',
      englishTitle: 'Listener Progression & Badges Hub',
      image: 'https://bee-reg-ab.imagency.cn/e/a586fe710ba9a4ff79aafb473527be7e.png',
      desc: '数字化乐迷成长系统，集成每日听歌打卡、音乐风格版图解密以及专属玻璃态黑胶成就勋章。',
      englishDesc: 'Gamified listener progression system featuring daily listening milestones, music genre unlock quests, and virtual glass vinyl badges.',
      tag: 'Achievements',
      flow: 'core',
      metrics: [
        { label: 'Vinyl Unlocks', value: '24 Badges' },
        { label: 'Genre Mastery', value: '78%' },
        { label: 'Level Cap', value: 'Lv.50' }
      ]
    },
    {
      title: 'AI 听觉医疗健康诊断中枢',
      englishTitle: 'AI Audiology & Acoustic Diagnosis',
      image: 'https://bee-reg-ab.imagency.cn/e/9505d2cdddaf0ac564d86e679814badc.png',
      desc: '结合端侧大语言模型实现对用户日常听力损伤与突发性耳鸣的智能问诊、听敏度评估与自适应声学保护。',
      englishDesc: 'AI audiology diagnostic assistant providing standard smart triage, active tinnitus assessment, and protective hearing guides.',
      tag: 'AI Assistant',
      flow: 'medical',
      metrics: [
        { label: 'Generative Delay', value: '180ms' },
        { label: 'Token Speed', value: '85 tok/s' },
        { label: 'Style Links', value: 'Active' }
      ]
    },
    {
      title: '微观睡眠音疗频段拆解',
      englishTitle: 'Micro-Sleep Sound Therapy Frequency Breakdown',
      image: 'https://bee-reg-ab.imagency.cn/e/5f046d9a0c70e8b2f5745a7a1fc04311.png',
      desc: '利用高频赫兹时域图解剖深度睡眠脑波段分布，支持多频段音疗阻抗与脑电状态映射。',
      englishDesc: 'Deep sleep soundscape analyzer charting brainwave frequency curves and EEG state coordination metrics.',
      tag: 'Sound Therapy',
      flow: 'sleep',
      metrics: [
        { label: 'Frequency Range', value: '0.5-4Hz Delta' },
        { label: 'Coherence Index', value: '94.2%' },
        { label: 'Noise Rejection', value: '-42dB' }
      ]
    },
    {
      title: '高端无线音频与耳机功放配置',
      englishTitle: 'Smart Audio Transceiver & Amp Config',
      image: 'https://bee-reg-ab.imagency.cn/e/e39988fc1c018877d0c27fc783e1f40a.png',
      desc: '蓝牙音频解码器（LDAC、APTX Lossless）与前端耳机放大器连接管理，支持自定义采样率与低功耗解码微调。',
      englishDesc: 'Advanced Bluetooth codec (LDAC/aptX) and headphone amplifier IoT manager, supporting dynamic DAC sample rate tweaking.',
      tag: 'DAC Settings',
      flow: 'settings',
      metrics: [
        { label: 'Devices Linked', value: '3 Bound' },
        { label: 'Bandwidth', value: 'LE Audio 5.3' },
        { label: 'Protocol', value: 'Bit-Perfect' }
      ]
    },
    {
      title: '三维全景空间音频声场雷达',
      englishTitle: '3D Spatial Audio Soundstage Radar',
      image: 'https://bee-reg-ab.imagency.cn/e/42db0ec9055142047e96f45847d78a2f.png',
      desc: '结合头部追踪传感器的三维环绕空间音效热力图，带有高度轴定位、实时多声道声源运动拟合与声像偏置计算。',
      englishDesc: 'Outdoor-equivalent soundstage vector mapping head-tracking dynamic spatial audio orbits and real-time multichannel panning.',
      tag: 'Spatial Radar',
      flow: 'settings',
      metrics: [
        { label: 'Tracking Delay', value: '<5ms' },
        { label: 'Angle Step', value: '0.5°' },
        { label: 'Speaker Nodes', value: '7.1.4 Ch' }
      ]
    },
    {
      title: '听觉保护与音量限制',
      englishTitle: 'Acoustic Protection & Decibel Limit',
      image: 'https://bee-reg-ab.imagency.cn/e/c615d3b12b5945fbbe35e6ba8fa1ae89.png',
      desc: '动态监测耳机音频压强，提供分贝极限锁定、双耳听觉疲劳自适应降噪及安全声压保护。',
      englishDesc: 'Advanced listening protection and volume capping telemetry, warning users on prolonged loud exposure risk.',
      tag: 'Ear Guard',
      flow: 'settings',
      metrics: [
        { label: 'dB Threshold', value: '80dB' },
        { label: 'Expose Limit', value: '45 Mins' },
        { label: 'Muffle Ratio', value: '-6.2dB' }
      ]
    },
    {
      title: '个人云端音乐中心与账户同步',
      englishTitle: 'Personal Cloud Library & Account Sync',
      image: 'https://bee-reg-ab.imagency.cn/e/214eba8a1442651f0293e40604fb19d3.png',
      desc: '支持多端无缝同步，无损音轨云端备份与智能音乐包空间管理，呈现个人听歌成就档案与收藏夹。',
      englishDesc: 'Seamless multi-terminal synchronization, lossless track cloud backup, and space-optimized digital music package allocation with listener profiles.',
      tag: 'Cloud Sync',
      flow: 'settings',
      metrics: [
        { label: 'Sync Latency', value: '<50ms' },
        { label: 'Cloud Storage', value: '2TB Max' },
        { label: 'Auth Protocol', value: 'OAuth2' }
      ]
    }
  ];

  // Music overall UI design logic slides
  const MUSIC_LOGIC_SLIDES = [
    {
      title: '音乐系统视觉企划 & 概念推演',
      englishTitle: 'Visual Pitch & Concept Deduction',
      image: 'https://bee-reg-ab.imagency.cn/e/41620fbdf9c28271a46606651bee0ad8.jpg',
      desc: '整体系统设计框架的开篇企划，确立以黑胶拟态、流式音轨和触控物理反馈为核心的交互概念。',
      englishDesc: 'Opening visual pitch outlining the core interactive concepts including rotating vinyls, stream waveforms, and micro-haptic controls.',
      section: 'concept',
      specs: {
        grid: '12-Column Presentation Grid (W_1920px)',
        typography: 'Space Grotesk & Inter (Tracking -2%)',
        colors: [
          { name: 'Pitch Dark Slate', hex: '#0A0E1A' },
          { name: 'Neon Cyber Blue', hex: '#3B82F6' },
          { name: 'Aesthetic Muted Silver', hex: '#94A3B8' }
        ]
      },
      logic: {
        objective: 'Establish a bold, futuristic yet physical visual theme for the music ecosystem.',
        approach: 'Calculated contrast ratios on a dark emissive baseline, guiding the viewer’s eye via high-intensity chromatic highlights.',
        steps: [
          'Initialize pitch layout with symmetrical structural margins.',
          'Direct core attention toward the centered mobile device mockup overlay.',
          'Contrast dark panels with 3000K warm ambient glow accents.'
        ]
      }
    },
    {
      title: '听觉情绪与多维交互逻辑分析',
      englishTitle: 'Acoustic Emotions & Multi-Dimensional Logic',
      image: 'https://bee-reg-ab.imagency.cn/e/14e5da710f7bd64b664d824a77a1ded3.jpg',
      desc: '解构不同曲风与节奏对情绪的物理调谐，利用信息图表梳理音乐波形在不同心流场景下的交互逻辑。',
      englishDesc: 'Deconstructing emotional response profiles across varied rhythms, charting waveform flows to transition listeners into desired flow states.',
      section: 'concept',
      specs: {
        grid: 'Flowchart Schema Layout Grid',
        typography: 'JetBrains Mono (Logical Annotations)',
        colors: [
          { name: 'Logic Midnight Blue', hex: '#0F172A' },
          { name: 'Flowchart Coral Accent', hex: '#F43F5E' },
          { name: 'Neutral Guide Grey', hex: '#64748B' }
        ]
      },
      logic: {
        objective: 'Map user neuro-states to digital playback properties seamlessly.',
        approach: 'Leveraged Gestalt proximity laws to group audio features (BPM, spectral density) into unified cognitive blocks.',
        steps: [
          'User enters auditory diagnostics, visualizing active brainwave response curves.',
          'Acoustic filters dynamically shift, highlighting high-resonance frequency bands.',
          'Interactive dials smoothly sweep across the emotional vector space.'
        ]
      }
    },
    {
      title: '线框原型推演与核心控制流',
      englishTitle: 'UX Wireframe Deduction & Control Flows',
      image: 'https://bee-reg-ab.imagency.cn/e/703a70f9ad5b87f890cb8b40e6fec60c.jpg',
      desc: '展示核心播放界面与参数微调控制面板的 UX 低保真原型，奠定合理的用户心流操作区域与触控手势。',
      englishDesc: 'Low-fidelity wireframe blueprints defining tactile interaction layouts, gesture zones, and fluid navigation paths.',
      section: 'concept',
      specs: {
        grid: '360dp Mobile Viewport Wireframe Grid',
        typography: 'Inter Regular & Medium (Baseline 4px)',
        colors: [
          { name: 'Wireframe Slate', hex: '#475569' },
          { name: 'Interface Hotspot', hex: '#3B82F6' },
          { name: 'Canvas Paper White', hex: '#F8FAFC' }
        ]
      },
      logic: {
        objective: 'Eliminate layout friction before high-fidelity visual styling.',
        approach: 'Derived interactive target sizes based on thumb-zone heatmaps, placing active player controls in high-comfort sectors.',
        steps: [
          'Drafting skeletal player structures conforming to standard 8dp gutters.',
          'Mapping horizontal gestures for track transitions and circular sweeps for EQ.',
          'Simulating tap responses with spring-damper kinetic parameters.'
        ]
      }
    },
    {
      title: '多维声流交互架构与组件定义',
      englishTitle: 'Multi-Band Soundscape Component Architecture',
      image: 'https://bee-reg-ab.imagency.cn/e/514735a44ec79a028d32de3e89c8cc35.jpg',
      desc: '定义音乐音乐均衡器、立体环绕度、以及多通道时域波形组件的微观层级与多态交互逻辑。',
      englishDesc: 'Detailed blueprint defining microscopic hierarchies, dynamic states, and feedback formulas for equalizer knobs.',
      section: 'concept',
      specs: {
        grid: 'Bento Component Auto-Layout System',
        typography: 'Outfit Display & Fira Code',
        colors: [
          { name: 'Surgical Blue Accent', hex: '#2563EB' },
          { name: 'Matted Shadow Black', hex: '#111827' },
          { name: 'Indicator Amber', hex: '#D97706' }
        ]
      },
      logic: {
        objective: 'Build a modular component library that adapts to complex real-time audio streams.',
        approach: 'Mapped UI variables directly to physical sound pressure levels, ensuring interactive sliders visually mirror output harmonics.',
        steps: [
          'Component renders baseline sliders with matted shades during silent-state.',
          'Active sound waves trigger real-time scaling of glowing equalizer bars.',
          'User releases sliders, triggering quick dampening animation (decay: 0.1s).'
        ]
      }
    },
    {
      title: '全局视觉风格与设计规范探索',
      englishTitle: 'Global Design System & Branding Rules',
      image: 'https://bee-reg-ab.imagency.cn/e/191d4e6a3ef06c459e12ac4176ef2cd1.jpg',
      desc: '提炼出以“星系微茫、深空沉浸”为核心的深色系黑金视觉风格，定义多层叠加的毛玻璃卡片材质规范。',
      englishDesc: 'Formulating the premium dark cosmic visual identity, specifying layered glassmorphism transparencies and neon accents.',
      section: 'system',
      specs: {
        grid: '8px Soft Grid & Layout Token System',
        typography: 'Neue Haas Grotesk & Space Grotesk',
        colors: [
          { name: 'Cosmic Pitch Black', hex: '#020617' },
          { name: 'Emissive Golden Ray', hex: '#F59E0B' },
          { name: 'Backdrop Translucent', hex: 'rgba(15,23,42,0.6)' }
        ]
      },
      logic: {
        objective: 'Deliver an elite dark theme optimized for late-night listening comfort.',
        approach: 'Applied Weber-Fechner law of perception to control subtle differences in dark-grey backgrounds, preventing optical fatigue.',
        steps: [
          'Base canvas color matches pure slate black to save OLED panel energy.',
          'Cards utilize a 60% opacity fill with a 20px blur filter for layered depth.',
          'Highlights apply a sub-pixel fine gold border (0.5px) for premium crispness.'
        ]
      }
    },
    {
      title: '界面排版栅格与文字比例系统',
      englishTitle: 'Typographical Scaling & Layout Grids',
      image: 'https://bee-reg-ab.imagency.cn/e/5738c17aea6757a8a1c7eae7ded22b3d.jpg',
      desc: '确定适用于各种屏幕规格的标准字体排版层级，基于大三度（Major Third）比例进行大小缩放。',
      englishDesc: 'Establishes precise type sizing scale based on Major Third ratios (1.250) alongside fluid 4-column mobile grid rules.',
      section: 'system',
      specs: {
        grid: '4-Column Fluid Mobile Grid (Margin: 16px, Gap: 12px)',
        typography: 'Inter Tight (14px, 18px, 22px, 28px, 35px)',
        colors: [
          { name: 'Primary Bright White', hex: '#F8FAFC' },
          { name: 'Typographic Ink Slate', hex: '#0F172A' },
          { name: 'Secondary Muted Grey', hex: '#94A3B8' }
        ]
      },
      logic: {
        objective: 'Ensure high-contrast bilingual legibility on mobile viewports.',
        approach: 'Set line-heights dynamically based on character counts, optimizing paragraph layout for effortless visual scanning.',
        steps: [
          'Main headers align to the 4-column horizontal grid bounds.',
          'Subtext uses a half-step smaller font-size with 200% tracking for high readability.',
          'Paragraph block vertical margins automatically calculate based on typographic grid dividers.'
        ]
      }
    },
    {
      title: '动态资产定义与设计资产看板',
      englishTitle: 'Dynamic Visual Assets & Tokens Board',
      image: 'https://bee-reg-ab.imagency.cn/e/b9cd40be70e0ac538fc4a4f5f4a01633.jpg',
      desc: '汇总展示系统所有动态微标、黑胶胶套、播放状态以及多端协作中用到的核心矢量视觉资产。',
      englishDesc: 'Branding asset overview detailing vinyl cover frames, interactive badges, state icons, and responsive logo formats.',
      section: 'system',
      specs: {
        grid: '12-Column Symmetrical Canvas (W_1920px)',
        typography: 'Outfit Display & Space Grotesk',
        colors: [
          { name: 'Branding Gold Accent', hex: '#EAB308' },
          { name: 'Vinyl Dark Charcoal', hex: '#18181B' },
          { name: 'Satin Silver Surface', hex: '#E2E8F0' }
        ]
      },
      logic: {
        objective: 'Maintain brand consistency across all digital interfaces and touchpoints.',
        approach: 'Developed scalable vectors mapped to golden proportion guidelines to retain sharp edges on low-DPI displays.',
        steps: [
          'Logo shapes anchor perfectly onto central mathematical coordinate lines.',
          'Dynamic states (Play, Pause, Buffering) trigger proportional scale-downs.',
          'Circular vinyl containers preserve 1:1 ratios across variable screen viewports.'
        ]
      }
    },
    {
      title: '核心播放界面交互细分',
      englishTitle: 'Playback Interface Interaction Detail',
      image: 'https://bee-reg-ab.imagency.cn/e/8ab5f0ac6048d639b7c7686ec4ca2810.jpg',
      desc: '深入探讨播放界面的微交互细节，包括按钮反馈、进度条律动以及封面切换的转场逻辑。',
      englishDesc: 'Deep dive into playback micro-interactions, covering button feedback, progress rhythm, and cover transition logic.',
      section: 'system',
      specs: {
        grid: 'Detail Interaction Grid',
        typography: 'Inter & Space Grotesk',
        colors: [
          { name: 'Active UI Blue', hex: '#3B82F6' },
          { name: 'Soft Surface Grey', hex: '#F1F5F9' },
          { name: 'Deep Space Navy', hex: '#0F172A' }
        ]
      },
      logic: {
        objective: 'Refine micro-interactions for a premium tactile feel.',
        approach: 'Applied subtle spring physics to all active UI states.',
        steps: [
          'Map touch events to kinetic energy variables.',
          'Execute smooth frame-by-frame interpolation for layer scaling.',
          'Trigger haptic vibration pulses synchronized with visual peaks.'
        ]
      }
    },
    {
      title: '音频流媒体平台适配规范',
      englishTitle: 'Audio Streaming Platform Adaptation',
      image: 'https://bee-reg-ab.imagency.cn/e/422efefcf236d181efdf61af41aab5b8.jpg',
      desc: '展示在不同流媒体服务（如 Hi-Res, Dolby Atmos）下的界面适配规则与视觉标识。',
      englishDesc: 'Displaying interface adaptation rules and visual indicators for various streaming services.',
      section: 'system',
      specs: {
        grid: 'Cross-Platform Spec Grid',
        typography: 'Outfit & Inter',
        colors: [
          { name: 'Hi-Res Gold', hex: '#EAB308' },
          { name: 'Dolby Silver', hex: '#94A3B8' },
          { name: 'Platform Dark', hex: '#020617' }
        ]
      },
      logic: {
        objective: 'Standardize service branding within the native player ecosystem.',
        approach: 'Created modular slots for dynamic service logos and high-fidelity badges.',
        steps: [
          'Detect audio stream metadata (Sample Rate, Format).',
          'Inject appropriate tech-badges into the player secondary rail.',
          'Shift accent colors to match the detected audio quality tier.'
        ]
      }
    },
    {
      title: '动态音频均衡器高阶调节',
      englishTitle: 'Advanced Dynamic Equalizer Controls',
      image: 'https://bee-reg-ab.imagency.cn/e/e3e22e3917af538e86dfcc7df94ae538.jpg',
      desc: '针对专业用户的多频段实时均衡调节面板，强调参数的可视化反馈。',
      englishDesc: 'Professional multi-band real-time equalizer panel emphasizing visual feedback of parameters.',
      section: 'ux',
      specs: {
        grid: 'Pro EQ Matrix Layout',
        typography: 'JetBrains Mono & Space Grotesk',
        colors: [
          { name: 'Frequency Orange', hex: '#F97316' },
          { name: 'Matrix Slate', hex: '#1E293B' },
          { name: 'Grid Guideline', hex: '#334155' }
        ]
      },
      logic: {
        objective: 'Empower audiophiles with high-precision acoustic shaping tools.',
        approach: 'Visualized sound pressure levels across 15 discrete bands with real-time peak monitoring.',
        steps: [
          'Sample active audio buffer for FFT analysis.',
          'Render dynamic bar heights with custom easing curves.',
          'Support multi-touch gestures for sweeping band adjustments.'
        ]
      }
    },
    {
      title: '音乐社区与共享交互体验',
      englishTitle: 'Music Community & Social Experience',
      image: 'https://bee-reg-ab.imagency.cn/e/1e18b3cd8093d213374f83146201ae0d.jpg',
      desc: '设计音乐共享、实时评论以及社区互动的社交层级，通过极简布局提升互动效率。',
      englishDesc: 'Designing social layers for music sharing, live comments, and community interaction with minimal layouts.',
      section: 'ux',
      specs: {
        grid: 'Social Interaction Stack',
        typography: 'Inter & Space Grotesk',
        colors: [
          { name: 'Social Pulse Cyan', hex: '#06B6D4' },
          { name: 'Comment Bubble Slate', hex: '#F8FAFC' },
          { name: 'Text Deep Navy', hex: '#0F172A' }
        ]
      },
      logic: {
        objective: 'Foster community engagement through frictionless social sharing.',
        approach: 'Integrated live-listening bubbles and comment threads into the secondary player view.',
        steps: [
          'Animate active listener avatars along the track timeline.',
          'Trigger pop-over comment bubbles at specific time stamps.',
          'Enable one-tap "Co-Listen" synchronization between paired users.'
        ]
      }
    },
    {
      title: '听觉健康与分贝预警界面设计',
      englishTitle: 'Otological Health & Decibel Warning Screen',
      image: 'https://bee-reg-ab.imagency.cn/e/693b465bdfd119811f5e1782b495d0ff.jpg',
      desc: '多维监测耳机高声压暴露时间与环境分贝，设计醒目的高饱和警告配色与柔和的自适应听力衰减曲线。',
      englishDesc: 'High-contrast alert interfaces and responsive attenuation cards informing users of acoustic pressure risk and safe limits.',
      section: 'ux',
      specs: {
        grid: 'Acoustic Alert Layout Grid (4-Column)',
        typography: 'Fira Code & Inter Tight',
        colors: [
          { name: 'Urgent Red Alert', hex: '#EF4444' },
          { name: 'Ear Guard Teal', hex: '#14B8A6' },
          { name: 'Background Slate Grey', hex: '#1E293B' }
        ]
      },
      logic: {
        objective: 'Alert users instantly to hearing risks without inducing user panic.',
        approach: 'Adopted high-contrast hazard red for numeric values, paired with calming mint green for safe guide recommendations.',
        steps: [
          'Decibels exceed 85dB, triggering immediate red glow behind numbers.',
          'Adaptive attenuation cards slide up from the viewport bottom (duration: 0.3s).',
          'User clicks "Safeguard Mode" to smoothly muffle spikes via virtual DSP routing.'
        ]
      }
    },
    {
      title: '音乐流转与播放中枢系统设计',
      englishTitle: 'Audio Casting & Streaming Hub Interface',
      image: 'https://bee-reg-ab.imagency.cn/e/b2aef3486b62897d9368f4315de26805.jpg',
      desc: '多设备音频无缝流转面板，通过高透光毛玻璃卡片展现音轨正在同步传输至车载端和桌面端的动态状态。',
      englishDesc: 'Cross-device casting dashboard rendered in premium glassmorphism, detailing real-time track sharing to automotive/desktop endpoints.',
      section: 'ux',
      specs: {
        grid: 'Bento Grid Mobile Layout (4-Column Responsive)',
        typography: 'Space Grotesk & Inter',
        colors: [
          { name: 'Casting Electric Blue', hex: '#3B82F6' },
          { name: 'Muted Deep Indigo', hex: '#1E1B4B' },
          { name: 'Active Stream Green', hex: '#10B981' }
        ]
      },
      logic: {
        objective: 'Simplify multi-device routing and display real-time connection status visually.',
        approach: 'Utilized Gestalt common fate principle: animated network pulses flow toward target device icons, mimicking physical casting waves.',
        steps: [
          'User initiates casting tap, spawning outward radial wave rings.',
          'Connected targets light up with vibrant neon borders.',
          'Bitrate dials smoothly scale, showing optimal 990kbps LDAC sync.'
        ]
      }
    },
    {
      title: '微观睡眠音频分轨混音器',
      englishTitle: 'Cerebral Soundscape Multi-Track Mixer',
      image: 'https://bee-reg-ab.imagency.cn/e/580796b729e6e498bcceb1d8231f2161.jpg',
      desc: '支持分轨微调雨声、风声、脑波等环境音轨，通过渐变频域能量条向用户提供极致的心理声学治愈交互。',
      englishDesc: 'Advanced soundscape mixer panel enabling multi-channel volume scaling across rain, wind, and delta wave tracks with live waveform reflections.',
      section: 'ux',
      specs: {
        grid: 'Multi-Slider Column Grid Layout',
        typography: 'JetBrains Mono & Inter',
        colors: [
          { name: 'Relaxing Lilac Purple', hex: '#A855F7' },
          { name: 'Sleep Deep Indigo', hex: '#0B0F19' },
          { name: 'Acoustic Balance Silver', hex: '#64748B' }
        ]
      },
      logic: {
        objective: 'Enable effortless multi-track balancing for personalized sleep therapy.',
        approach: 'Mapped slide ranges to standard decibel logarithmic curves, so visual thumb positions feel perfectly proportional to actual volume changes.',
        steps: [
          'Render vertical sliding lanes with delicate glow traces.',
          'Dragging a knob scales its frequency spectrum glow intensity.',
          'Active track loops synchronize smoothly on zero-cross boundaries.'
        ]
      }
    },
    {
      title: '全景音频均衡器调音面板',
      englishTitle: 'Panoramic Multi-Band Equalizer Deck',
      image: 'https://bee-reg-ab.imagency.cn/e/d09e4cfc93c3509a40311a4bc0fa449f.jpg',
      desc: '专业级 10 段高精音频参数微调面板，利用平滑贝塞尔曲线实时展示调音增益，支持手势滑动绘制调音曲线。',
      englishDesc: 'Pro-grade 10-band parameters desk showing gain adjustment via dynamic cubic bezier curves with tactile swiping curves drawing.',
      section: 'ux',
      specs: {
        grid: '10-Band EQ Axis Grid (DPI-Aligned)',
        typography: 'Fira Code (Frequencies) & Inter Tight',
        colors: [
          { name: 'Timbre Orange Highlight', hex: '#F97316' },
          { name: 'Chamber Deep Black', hex: '#090D16' },
          { name: 'Graph Grid Line Grey', hex: '#334155' }
        ]
      },
      logic: {
        objective: 'Simplify professional EQ adjustments for everyday audiophiles.',
        approach: 'Calculated continuous Bezier points dynamically from discrete slider positions, rendering a cohesive, beautiful audio curve.',
        steps: [
          'User sweeps fingers across the bands, adjusting multiple frequencies.',
          'Curve generator draws a smooth spline interpolating the nodes.',
          'Hardware DAC registers gains instantly with zero auditory phase distortion.'
        ]
      }
    },
    {
      title: '车载终端自适应中控规范',
      englishTitle: 'Automotive Center Console Adaptive Spec',
      image: 'https://bee-reg-ab.imagency.cn/e/6e28a393bdc63674faade1393f9cf642.jpg',
      desc: '展示系统标志性的深黑色卡片布局在车载中控宽屏（21:9）上的自适应排列，强调驾车过程中的大靶区和高易读性。',
      englishDesc: 'Dynamic horizontal screen expansion rules adapting cards to wide 21:9 dashboards with high-readability targets for safe driving.',
      section: 'deliverables',
      specs: {
        grid: '24-Column Landscape Automotive Grid',
        typography: 'Space Grotesk & heavy weights',
        colors: [
          { name: 'Dashboard Matte Black', hex: '#020617' },
          { name: 'Driving Target Amber', hex: '#F59E0B' },
          { name: 'Road-Ready Safe Silver', hex: '#CBD5E1' }
        ]
      },
      logic: {
        objective: 'Maximize driving safety while operating active music settings.',
        approach: 'Doubled standard card tap areas according to Fitts’s Law, ensuring high target acquisition rates under physical car vibration.',
        steps: [
          'Wide screen detects display parameters, reflowing side-panels to outer columns.',
          'Touch target boxes expand to minimum 64dp sizing automatically.',
          'High-contrast night-mode filters down short-wavelength blue light.'
        ]
      }
    },
    {
      title: '多端协同与交互生态全景',
      englishTitle: 'Multi-Terminal Ecosystem & Device Symphony',
      image: 'https://bee-reg-ab.imagency.cn/e/1ff214eb41b7144baccb9ed5bf7fc72a.jpg',
      desc: '宏观展示手机客户端、智能穿戴、车载大屏、以及桌面端在同一音乐生态下的极致视觉对齐与信息智能流转。',
      englishDesc: 'Comprehensive orchestration layout demonstrating visual and logical cohesion across smartphone, watch, automotive, and desktop interfaces.',
      section: 'deliverables',
      specs: {
        grid: 'Cross-Device Multi-Scale Layout System',
        typography: 'Bilingual Space Grotesk & Inter',
        colors: [
          { name: 'Brand Master Gold', hex: '#EAB308' },
          { name: 'Ecosystem Midnight Blue', hex: '#0F172A' },
          { name: 'Active Channel Teal', hex: '#0D9488' }
        ]
      },
      logic: {
        objective: 'Present the ultimate vision of seamless unified design delivery.',
        approach: 'Structured devices along concentric visual orbits, showing flow direction through dynamic geometric guidelines.',
        steps: [
          'Ecosystem dashboard renders multiple devices in spatial perspective.',
          'A single tap triggers synchronous playlist updates across all 4 screens.',
          'Connection latency registers at <10ms via virtual local peer network.'
        ]
      }
    }
  ];

  // Brand Slide data definition with user's images in page display order (Foundation first, Application last)
  const BRAND_SLIDES = [
    {
      title: '辅助图形系统 01',
      englishTitle: 'Supporting Graphics 01',
      image: 'https://bee-reg-ab.imagency.cn/e/74f753666497c274d299a3ea91e85f44.png',
      desc: '基于集装箱金属褶皱和冷链网格衍生出的抽象辅助图形条带。',
      englishDesc: 'Abstract branding shapes inspired by industrial container patterns and linear grids.',
      tag: 'Graphics 01',
      alt: '37f38f00cb80b13c51b42f7a2c94d126_new'
    },
    {
      title: '辅助图形系统 02',
      englishTitle: 'Supporting Graphics 02',
      image: 'https://bee-reg-ab.imagency.cn/e/be411fb0b1068141b0e58c6b813eb245.jpg',
      desc: '安全反光格纹和货箱网格的多样化辅助图形组合及应用。',
      englishDesc: 'Extended corporate graphic structures including caution grids and diagonal stripes.',
      tag: 'Graphics 02'
    },
    {
      title: '物流作业人员服装',
      englishTitle: 'Operations Workwear',
      image: 'https://bee-reg-ab.imagency.cn/e/f52b3e45de0fce07bb88fc0815f71bd7.jpg',
      desc: '现场操作人员、叉车司机及冷库管理员的反光工作服、安全帽及作业手套配色标准。',
      englishDesc: 'Operational staff hi-vis jackets, safety helmets, and working uniforms color rules.',
      tag: 'Workwear'
    },
    {
      title: '色彩系统与比例',
      englishTitle: 'Color System',
      image: 'https://bee-reg-ab.imagency.cn/e/978752270061885a06d114c48a501981.jpg',
      desc: '物流专用安全冷光蓝、明艳橙以及中性灰等色彩系统的标准比例。',
      englishDesc: 'Standard color formulas and contrast percentages of blue, orange, and gray.',
      tag: 'Colors'
    },
    {
      title: '主标志设计规范',
      englishTitle: 'Master Logo Spec',
      image: 'https://bee-reg-ab.imagency.cn/e/3e1ee4bbde07f733e3892ad6bc90f3ed.jpg',
      desc: '峰致品牌核心徽标与字体组合规范，建立精确的网格定位 and 防白区范围。',
      englishDesc: 'Core logo lockups, geometric calculation grids, and typographic safety margins.',
      tag: 'Logo Spec'
    },
    {
      title: '生鲜配送冷链箱',
      englishTitle: 'Cold Chain Package',
      image: 'https://bee-reg-ab.imagency.cn/e/2f6f587f6c588b69b2e9da9d2e6dfa9c.jpg',
      desc: '生鲜保温配送箱、周转保温泡沫箱以及物流胶带的标准印制版式规范。',
      englishDesc: 'Design specifications and typography layout on corrugated and styrofoam cold chain boxes.',
      tag: 'Packaging'
    },
    {
      title: '品牌标准字体',
      englishTitle: 'Brand Typography',
      image: 'https://bee-reg-ab.imagency.cn/e/07aeef762e89fb96ad3f265307e40a29.jpg',
      desc: '品牌在数字化媒介与印刷媒介上的中英文标准字族及排版层级。',
      englishDesc: 'Bilingual typography guidelines, approved typefaces, and layout scaling hierarchy.',
      tag: 'Typography'
    },
    {
      title: '企业办公事务用品',
      englishTitle: 'Corporate Stationery',
      image: 'https://bee-reg-ab.imagency.cn/e/c823038ae169471669290d74decd6830.jpg',
      desc: '信封、信纸、便签、文件夹等常用办公用品标准版式排版设计规范。',
      englishDesc: 'Standard design specifications for corporate letterheads, envelopes, note cards, and folders.',
      tag: 'Stationery'
    },
    {
      title: '重型集装箱涂装规范',
      englishTitle: 'Heavy Trailer Livery',
      image: 'https://bee-reg-ab.imagency.cn/e/02548bb6cee16ee29e7296f7cfd52ba4.jpg',
      desc: '40英尺冷链重型半挂集装箱车辆的侧面和尾部品牌标志涂装定位标准。',
      englishDesc: 'Livery layout templates and side-graphics placement for heavy 40ft refrigerated freight trailers.',
      tag: 'Heavy Trailer'
    },
    {
      title: '厂区导视与环境标识',
      englishTitle: 'Signage & Environmental Spec',
      image: 'https://bee-reg-ab.imagency.cn/e/3f5b8f4298fa2d67ac20ca7cce983af4.jpg',
      desc: '物流仓储园区户外发光字招牌、路牌指示及仓库入口导视系统的规范设计。',
      englishDesc: 'Outdoor illuminated corporate signage, directional boards, and storage facility labels.',
      tag: 'Signage'
    },
    {
      title: '数字应用与自适应网页',
      englishTitle: 'Digital Media Layout',
      image: 'https://bee-reg-ab.imagency.cn/e/e9ce9853db3f2149810f63adc3ba1dc1.jpg',
      desc: '智能货运管理系统在手机客户端 and 官方网站的首屏品牌应用规范。',
      englishDesc: 'Adaptive layout standards for standard web screens and smartphone app headers.',
      tag: 'Digital UI'
    },
    {
      title: '大型干线集卡车身规范',
      englishTitle: 'Heavy Truck Livery',
      image: 'https://bee-reg-ab.imagency.cn/e/876f5355a329f615030b705225b3baa4.jpg',
      desc: '大型中远途冷链集装箱卡车车身品牌徽标定位、安全反光条与涂装比例。',
      englishDesc: 'Livery standard layout, large-scale logotype placement, and reflective caution lines for long-haul trucks.',
      tag: 'Heavy Truck'
    },
    {
      title: '员工徽章与胸卡规范',
      englishTitle: 'ID Badge & Card Spec',
      image: 'https://bee-reg-ab.imagency.cn/e/10ce07a8a885e903b06c99ebc0b5d6a0.jpg',
      desc: '标准企业名片与员工ID胸卡版式、信息层级及高对比底色应用规范。',
      englishDesc: 'Corporate business cards and staff identification badge layout grids and typography rules.',
      tag: 'Identity Card'
    },
    {
      title: '品牌周边礼品规范',
      englishTitle: 'Brand Gifts & Merchandise',
      image: 'https://bee-reg-ab.imagency.cn/e/a21b7acee1d814d3a6f00ce689daeef9.jpg',
      desc: '定制保温杯、环保手提袋、遮阳伞等高频商务礼品的品牌图案印制工艺标准。',
      englishDesc: 'Layout guidelines and printing standards for branded thermo mugs, canvas bags, and umbrellas.',
      tag: 'Merchandise'
    }
  ];

  // Preload brand and UI slide images on mount to ensure smooth transitions without lag
  useEffect(() => {
    BRAND_SLIDES.forEach(slide => {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.src = slide.image;
    });
    UI_SLIDES.forEach(slide => {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.src = slide.image;
    });
    MUSIC_LOGIC_SLIDES.forEach(slide => {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.src = slide.image;
    });
  }, []);

  // Music logic autoplay effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (musicAutoPlay) {
      interval = setInterval(() => {
        setMusicActiveStep(prev => (prev + 1) % MUSIC_LOGIC_SLIDES.length);
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [musicAutoPlay]);

  // Auto-reset active flow step and clear selected project when tab changes
  useEffect(() => {
    setSelectedProject(null);
    setActiveFlowStep(0);
    setUiActiveStep(0);
    setBrandActiveStep(0);
    if (uiScrollRef.current) {
      uiScrollRef.current.scrollTo({ top: 0 });
    }
    if (brandScrollRef.current) {
      brandScrollRef.current.scrollTo({ top: 0 });
    }
  }, [activeTab]);

  // Synchronize UI active step when active tab or active UI flow filter changes (Moved from inside map loop)
  useEffect(() => {
    if (activeTab === 'ui') {
      const filteredUiSlides = UI_SLIDES.filter(slide => 
        uiActiveFlow === 'all' || slide.flow === uiActiveFlow
      );
      const activeSlide = UI_SLIDES[uiActiveStep];
      if (filteredUiSlides.length > 0 && activeSlide) {
        const isCurrentSlideInFlow = filteredUiSlides.some(slide => slide.image === activeSlide.image);
        if (!isCurrentSlideInFlow) {
          const firstInFlowIndex = UI_SLIDES.findIndex(slide => slide.image === filteredUiSlides[0].image);
          if (firstInFlowIndex !== -1) {
            setUiActiveStep(firstInFlowIndex);
          }
        }
      }
    }
  }, [uiActiveFlow, activeTab, uiActiveStep]);

  // Copy Color Hex utility
  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Filter projects based on active tab
  const activeProjects = PROJECTS.filter(p => p.category === activeTab);

  // Compute bilingual interactive logic data
  const bilingualLogic = selectedProject ? getBilingualInteractiveLogic(selectedProject.id, language) : null;

  // Mathematical translation coordinates for the bottom light gradients
  const pinkX = Math.cos((135 * Math.PI) / 180) * 120;
  const pinkY = Math.sin((135 * Math.PI) / 180) * 120;
  const blueX = Math.cos(((135 + 180) * Math.PI) / 180) * 120;
  const blueY = Math.sin(((135 + 180) * Math.PI) / 180) * 120;

  // Custom Inline CSS styles mapped from our Science Lab state parameters
  const labVariables = {
    '--glass-opacity': '0.40',
    '--glass-blur': '20px',
  } as React.CSSProperties;

  // Dynamic Card Styles
  const cardStyle = {
    borderRadius: '24px',
  };

  return (
    <div 
      className={`relative min-h-screen font-sans flex flex-col justify-between transition-all duration-300 select-none pb-24 ${theme === 'light' ? 'bg-[#fafbfd]' : 'bg-slate-950'}`}
      style={labVariables}
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
          pointerEvents: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220, 240, 255, 0.2) 0%, transparent 70%)',
          zIndex: 9999,
        }}
      />
      {/* ----------------- SCIENTIFIC BACKGROUND GUIDES ----------------- */}

      {/* ----------------- GRADIENT LIGHT AURA AT THE BOTTOM ----------------- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className={`absolute inset-0 ${theme === 'light' ? 'bg-[#fafbfd]' : 'bg-slate-950'}`} />
        
        {/* Interactive Spotlight following cursor */}
        <motion.div 
          className="absolute w-[450px] h-[450px] rounded-full pointer-events-none opacity-40 blur-[100px]"
          style={{
            left: 0,
            top: 0,
            x: springX,
            y: springY,
            background: 'radial-gradient(circle, rgba(220, 240, 255, 0.25) 0%, rgba(255, 230, 240, 0.15) 50%, transparent 100%)',
            scale: glowIntensity / 50,
          }}
        />

        {/* Soft Violet/Purple Top-Left Aurora */}
        <motion.div 
          animate={{
            y: [-15, 15, -15],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            opacity: 0.8 * (glowIntensity / 50)
          }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-violet-200/20 via-indigo-200/10 to-transparent blur-[110px]"
        />

        {/* Soft Peach Middle-Right Aurora */}
        <motion.div 
          animate={{
            y: [20, -20, 20],
            x: [15, -15, 15],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            opacity: 0.8 * (glowIntensity / 50)
          }}
          className="absolute top-[30%] right-[-10%] w-[480px] h-[480px] rounded-full bg-gradient-to-bl from-amber-100/20 via-rose-200/10 to-transparent blur-[100px]"
        />
        
        {/* Soft Pink Glow Spot */}
        <motion.div 
          animate={{
            x: pinkX,
            y: pinkY + 300,
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            scale: { repeat: Infinity, duration: 15, ease: 'easeInOut' },
            type: 'spring',
            stiffness: 40,
            damping: 15
          }}
          style={{
            opacity: 1 * (glowIntensity / 50)
          }}
          className="glow-spot absolute bottom-[-20%] left-[20%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-rose-200/40 via-pink-300/20 to-transparent blur-[120px]"
        />

        {/* Soft Blue Glow Spot */}
        <motion.div 
          animate={{
            x: blueX,
            y: blueY + 250,
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={{
            scale: { repeat: Infinity, duration: 12, ease: 'easeInOut' },
            type: 'spring',
            stiffness: 40,
            damping: 15
          }}
          style={{
            opacity: 1 * (glowIntensity / 50)
          }}
          className="glow-spot absolute bottom-[-15%] right-[20%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-200/40 via-cyan-200/25 to-transparent blur-[120px]"
        />
        
        {/* Center ambient glow mix */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-white via-white/50 to-transparent" />
      </div>

      {/* ----------------- TOAST FEEDBACK ----------------- */}
      <AnimatePresence>
        {copiedColor && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 glass-panel border border-slate-200/60 shadow-lg px-4 py-2 rounded-full flex items-center gap-2 text-xs text-slate-800"
          >
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              {copiedColor.includes('@') 
                ? (language === 'zh' ? '联系邮箱 ' : 'Contact email ') 
                : (language === 'zh' ? '颜色代码 ' : 'Color HEX ')}
              <span className="font-mono font-medium text-blue-600">{copiedColor}</span> 
              {language === 'zh' ? ' 已成功复制到剪贴板' : ' copied to clipboard successfully'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------- TOP HEADER NAVIGATION ----------------- */}
      <header className="sticky top-6 z-40 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div 
          className="glass-panel border border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.04)] px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300"
          style={{ borderRadius: '24px' }}
        >
          {/* Brand/Identity */}
          <div className="flex flex-col items-start select-none">
            <h1 className="text-xs md:text-sm font-semibold tracking-wider text-slate-900 font-display">
              Personal Design Portfolio
            </h1>
            {/* 网页中英文文字切换 */}
            <div className="flex items-center mt-1 bg-slate-100/80 p-0.5 rounded-md border border-slate-200/40 text-[9px] font-mono shadow-xs">
              <button 
                onClick={() => setLanguage('zh')} 
                className={`px-1.5 py-0.5 rounded transition-all ${language === 'zh' ? 'bg-white text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
              >
                中
              </button>
              <span className="text-slate-200 px-0.5">|</span>
              <button 
                onClick={() => setLanguage('en')} 
                className={`px-1.5 py-0.5 rounded transition-all ${language === 'en' ? 'bg-white text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Tab switches */}
          <nav className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-lg border border-slate-200/20">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`nav-tab-${cat.id}`}
                  onClick={() => setActiveTab(cat.id)}
                  className={`relative px-3.5 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
                    isActive ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-white shadow-xs rounded-md border border-slate-200/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex flex-col items-center">
                    <span>{language === 'zh' ? cat.label : cat.englishLabel}</span>
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Global Controls */}
          <div className="flex items-center gap-3">
            {/* Self-Introduction Button */}
            <button
              onClick={() => setIsAboutOpen(true)}
              className="group flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 border border-blue-500/20 hover:border-blue-500/35 text-slate-800 hover:text-slate-950 text-xs font-mono transition-all duration-300 shadow-xs cursor-pointer font-medium"
              style={{ borderRadius: '20px' }}
            >
              <User className="w-3.5 h-3.5 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
              <span>{language === 'zh' ? '关于我 / 简介' : 'About Creator'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ----------------- HERO SECTION ----------------- */}
      <main className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 flex-1">
        
        {/* Intro - Premium Glass Card Structure with Gaussian Blur Textures */}
        <HeroSection language={language} theme={theme} />

        {/* ----------------- WORKS GRID BENTO SYSTEM ----------------- */}
        <section className="mb-20">
          <div className="flex items-center gap-2 mb-8">
            <Compass className="w-5 h-5 text-blue-500" />
            <h2 className={`font-display font-bold text-lg tracking-wide ${theme === 'light' ? 'text-slate-900' : 'text-slate-100'}`}>
              {activeTab === 'brand' 
                ? (language === 'zh' ? '峰致冷链—冷链物流品牌设计' : 'Fengzhi Cold Chain - Cold Chain Logistics Brand Design')
                : (language === 'zh' ? CATEGORIES.find(c => c.id === activeTab)?.label : CATEGORIES.find(c => c.id === activeTab)?.englishLabel)}
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              / {activeProjects.length} {language === 'zh' ? '作品展示' : 'Works'}
            </span>
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-1 mb-6">
            <Info className="w-3.5 h-3.5" />
            <span>{language === 'zh' ? '点击作品卡片进入深度推导透视面板' : 'Click a card to enter deep analytical specs panel'}</span>
          </div>

          {activeTab === 'ui' && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">Interactive Case Studies / 交互案例选择</span>
                </div>
                <h3 className="font-display font-bold text-base text-slate-800">
                  {language === 'zh' ? '乐享音乐—原创音乐UI设计' : 'LeShare Music - Original Music UI Design'}
                </h3>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50 shrink-0 shadow-sm">
                <button
                  onClick={() => {
                    setActiveUiSubTab('logic');
                    setMusicActiveStep(0);
                  }}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${
                    activeUiSubTab === 'logic'
                      ? 'text-white'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {activeUiSubTab === 'logic' && (
                    <motion.div 
                      layoutId="uiSubTabActive"
                      className="absolute inset-0 bg-blue-500 shadow-[0_4px_15px_rgba(37,99,235,0.15)] rounded-xl"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{language === 'zh' ? '设计逻辑推演' : 'DESIGN LOGIC'}</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setActiveUiSubTab('simulator');
                  }}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${
                    activeUiSubTab === 'simulator'
                      ? 'text-white'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {activeUiSubTab === 'simulator' && (
                    <motion.div 
                      layoutId="uiSubTabActive"
                      className="absolute inset-0 bg-indigo-500 shadow-[0_4px_15px_rgba(79,70,229,0.15)] rounded-xl"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-2">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>{language === 'zh' ? '界面仿真呈现' : 'UI SIMULATOR'}</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Staggered container */}
          <motion.div 
            layout 
            className="grid grid-cols-1 lg:grid-cols-3 transition-all duration-300"
            style={{ gap: '24px' }}
          >
            {activeProjects.map((project, idx) => {
              const isPrimary = idx === 0;
              const colSpanClass = activeProjects.length === 1 
                ? 'lg:col-span-3' 
                : (isPrimary ? 'lg:col-span-2' : 'lg:col-span-1');
              
              if (activeTab === 'ui' || (activeProjects.length === 1 && activeTab === 'brand')) {
                const isUiCategory = activeTab === 'ui';
                
                if (isUiCategory && idx > 0) {
                  return null;
                }
                
                if (!isUiCategory) {
                  return (
                    <motion.div
                      key={project.id}
                      layoutId={`project-container-${project.id}`}
                      style={cardStyle}
                      className="lg:col-span-3 group relative bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_16px_48px_rgba(15,23,42,0.04)] overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[650px] rounded-2xl"
                    >
                      {/* FULL-WIDTH VIEWPORT: Main Viewer & Bottom Horizontal Filmstrip Navigation */}
                      <div className="w-full flex flex-col bg-white/40 select-none justify-between">
                        {/* Canvas Header */}
                        <div className="h-11 bg-white/70 border-b border-slate-200/20 px-4 flex items-center justify-between shrink-0">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-400/90" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90" />
                          </div>
                          <div className="text-slate-400 font-mono text-[9px] uppercase tracking-widest flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-[#FF6B35]" />
                            <span>{language === 'zh' ? '品牌视觉资产画布' : 'BRAND CANVAS'} // SPECIFICATIONS</span>
                          </div>
                          <div className="text-[#FF6B35] font-mono text-[10px] font-bold bg-[#FF6B35]/10 px-2 py-0.5 rounded border border-[#FF6B35]/20">
                            {brandActiveStep + 1} / {BRAND_SLIDES.length}
                          </div>
                        </div>

                        {/* Large Active Slide Viewer */}
                        <BrandSlideViewer 
                          brandActiveStep={brandActiveStep}
                          setBrandActiveStep={setBrandActiveStep}
                          glowIntensity={glowIntensity}
                          tiltIntensity={tiltIntensity}
                          BRAND_SLIDES={BRAND_SLIDES}
                        />

                        {/* BOTTOM HORIZONTAL FILMSTRIP NAVIGATION */}
                        <div className="h-[160px] bg-white/70 backdrop-blur-md border-t border-white/20 flex flex-col overflow-hidden shrink-0">
                          {/* Filmstrip Mini Header */}
                          <div className="px-4 py-1.5 border-b border-slate-200/20 flex items-center justify-between shrink-0 bg-white/40">
                            <span className="font-mono text-[9px] text-slate-500 tracking-widest uppercase flex items-center gap-1.5">
                              <Sliders className="w-3.5 h-3.5 text-[#FF6B35]" />
                              <span>{language === 'zh' ? '画幅流导航 (Filmstrip)' : 'BRAND FILMSTRIP RAIL'}</span>
                            </span>
                            <span className="text-[9px] font-mono text-[#FF6B35] font-semibold bg-[#FF6B35]/10 px-1.5 py-0.5 rounded border border-[#FF6B35]/20">
                              {BRAND_SLIDES.length} SHEETS
                            </span>
                          </div>

                          {/* Scrollable list of landscape thumbnails with 3D cylindrical carousel projection */}
                          <div 
                            ref={brandScrollContainerRef}
                            className="flex-grow overflow-x-auto scrollbar-none flex items-center gap-3 px-4 py-2"
                            style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
                          >
                            {BRAND_SLIDES.map((slide, sIdx) => {
                              const isActive = brandActiveStep === sIdx;
                              const diff = sIdx - brandActiveStep;
                              const rotateY = Math.max(-25, Math.min(25, diff * -8)) * (tiltIntensity / 50);
                              const translateZ = -Math.abs(diff) * 12 * (tiltIntensity / 50);
                              const opacity = Math.max(0.4, 1 - Math.abs(diff) * 0.12);
                              const scale = isActive ? 1 : Math.max(0.85, 1 - Math.abs(diff) * 0.04);

                              return (
                                <motion.button
                                  key={sIdx}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setBrandActiveStep(sIdx);
                                  }}
                                  style={{
                                    transformStyle: 'preserve-3d',
                                    transform: `perspective(600px) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
                                    opacity: opacity,
                                    zIndex: 50 - Math.abs(diff),
                                  }}
                                  className={`flex-shrink-0 w-[110px] text-left rounded-lg overflow-hidden transition-all duration-300 relative group/thumb border ${
                                    isActive 
                                      ? 'border-[#FF6B35] bg-[#FF6B35]/5 shadow-[0_0_15px_rgba(255,107,53,0.35)]' 
                                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]'
                                  }`}
                                >
                                  <div className="aspect-[16/10] w-full relative overflow-hidden bg-slate-50">
                                    <img 
                                      src={slide.image} 
                                      alt={slide.alt || slide.title}
                                      referrerPolicy="no-referrer"
                                      className={`w-full h-full object-cover transition-all duration-500 ${
                                        isActive ? 'scale-105 opacity-100' : 'opacity-70 group-hover/thumb:opacity-100'
                                      }`}
                                    />
                                    
                                    <div className={`absolute top-1.5 left-1.5 w-4 h-4 rounded flex items-center justify-center font-mono text-[8px] font-bold shadow-sm ${
                                      isActive ? 'bg-[#FF6B35] text-white' : 'bg-slate-200 text-slate-600'
                                    }`}>
                                      {String(sIdx + 1).padStart(2, '0')}
                                    </div>

                                    {isActive && (
                                      <div className="absolute inset-0 border border-[#FF6B35]/30 rounded-lg animate-pulse pointer-events-none" />
                                    )}
                                  </div>
                                </motion.button>
                              );
                            })}
                          </div>

                          {/* Drag and Slide Helper Track Slider */}
                          <div className="h-8 px-4 border-t border-slate-200/40 bg-slate-100/40 flex items-center gap-3 shrink-0">
                            <button 
                              onClick={() => setBrandActiveStep(prev => Math.max(0, prev - 1))}
                              disabled={brandActiveStep === 0}
                              className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 disabled:opacity-40 transition-colors cursor-pointer"
                            >
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                            
                            <div className="flex-1 flex items-center relative">
                              <input 
                                type="range"
                                min="0"
                                max={BRAND_SLIDES.length - 1}
                                value={brandActiveStep}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value, 10);
                                  setBrandActiveStep(val);
                                }}
                                className="w-full h-1 bg-slate-200 hover:bg-slate-300 rounded-lg appearance-none cursor-ew-resize accent-[#FF6B35] focus:outline-none transition-all"
                                style={{
                                  background: `linear-gradient(to right, #FF6B35 0%, #FF6B35 ${(brandActiveStep / (BRAND_SLIDES.length - 1)) * 100}%, #cbd5e1 ${(brandActiveStep / (BRAND_SLIDES.length - 1)) * 100}%, #cbd5e1 100%)`
                                }}
                              />
                            </div>

                            <button 
                              onClick={() => setBrandActiveStep(prev => Math.min(BRAND_SLIDES.length - 1, prev + 1))}
                              disabled={brandActiveStep === BRAND_SLIDES.length - 1}
                              className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 disabled:opacity-40 transition-colors cursor-pointer"
                            >
                              <ChevronRight className="w-3 h-3" />
                            </button>

                            <div className="font-mono text-[9px] text-slate-500 font-semibold min-w-[32px] text-right">
                              {String(brandActiveStep + 1).padStart(2, '0')} / {String(BRAND_SLIDES.length).padStart(2, '0')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                // Filter UI slides based on active flow filter
                const filteredUiSlides = UI_SLIDES.filter(slide => 
                  uiActiveFlow === 'all' || slide.flow === uiActiveFlow
                );
                
                // Get the current slide
                const activeSlide = UI_SLIDES[uiActiveStep] || UI_SLIDES[0];

                const triggerHapticFeedback = () => {
                  // Trigger device vibrate if supported
                  if (navigator.vibrate) {
                    navigator.vibrate(15);
                  }
                  
                  // Add beautiful log to micro terminal
                  const time = new Date().toLocaleTimeString();
                  const logMsgs = [
                    `[${time}] ⚡ Micro-haptic pulse emitted: 15ms @ BLE frequency.`,
                    `[${time}] 📈 Audio calibration complete: Frequency harmonics synchronizing at 192kHz.`,
                    `[${time}] 🎨 Active Screen: "${activeSlide.title}" rendered smoothly.`
                  ];
                  
                  setUiHapticLogs(prev => [logMsgs[0], logMsgs[1], ...prev].slice(0, 5));
                  
                  // Show micro-toast
                  setUiToastMessage(language === 'zh' ? '⚡ 触觉振动与微交互反馈已激活！' : '⚡ Micro-haptic pulse feedback activated!');
                  setTimeout(() => setUiToastMessage(null), 2000);
                };

                const copyColorToClipboard = (hex: string, colorName: string) => {
                  navigator.clipboard.writeText(hex);
                  setCopiedColor(hex);
                  setTimeout(() => setCopiedColor(null), 1500);
                  
                  const time = new Date().toLocaleTimeString();
                  setMusicHapticLogs(prev => [
                    `[${time}] 🎨 Copied design token [${colorName} - ${hex}] to clipboard.`,
                    ...prev
                  ].slice(0, 5));
                  
                  setUiToastMessage(language === 'zh' ? `已复制色号: ${hex}` : `Copied color: ${hex}`);
                  setTimeout(() => setUiToastMessage(null), 2000);
                };

                if (activeUiSubTab === 'logic') {
                  const activeMusicSlide = MUSIC_LOGIC_SLIDES[musicActiveStep] || MUSIC_LOGIC_SLIDES[0];
                  return (
                    <motion.div
                      key="ui-music-logic-showcase"
                      layoutId="project-container-ui-logic"
                      style={cardStyle}
                      className="lg:col-span-3 group relative bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_16px_48px_rgba(15,23,42,0.04)] overflow-hidden flex flex-col h-auto lg:h-[750px] rounded-2xl"
                    >
                      {/* HEADER */}
                      <div className="h-12 bg-white/70 border-b border-slate-200/20 px-4 flex items-center justify-between shrink-0 z-30">
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-blue-600" />
                            <span>{language === 'zh' ? '推演互动画布' : 'LOGIC CANVAS'} // SPECS</span>
                          </div>
                          <div className="text-blue-600 font-mono text-[10px] font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200 shrink-0">
                            {musicActiveStep + 1} / {MUSIC_LOGIC_SLIDES.length}
                          </div>
                        </div>
                      </div>

                      {/* MAIN VIEWER */}
                      <MusicSlideViewer 
                        musicActiveStep={musicActiveStep}
                        setMusicActiveStep={setMusicActiveStep}
                        activeMusicSlide={activeMusicSlide}
                        musicShowGrid={musicShowGrid}
                        musicShowXRay={musicShowXRay}
                        language={language}
                        setMusicHapticLogs={setMusicHapticLogs}
                        MUSIC_LOGIC_SLIDES={MUSIC_LOGIC_SLIDES}
                      />

                      {/* FILMSTRIP NAVIGATION */}
                      <div className="h-[200px] bg-white/70 backdrop-blur-md border-t border-white/20 flex flex-col overflow-hidden shrink-0">
                        <div className="px-4 py-1.5 border-b border-slate-200/20 flex items-center justify-between shrink-0 bg-white/40">
                          <span className="font-mono text-[9px] text-slate-500 tracking-widest uppercase flex items-center gap-1.5">
                            <Sliders className="w-3.5 h-3.5 text-blue-600" />
                            <span>{language === 'zh' ? '推演画幅流导航' : 'LOGIC FILMSTRIP RAIL'}</span>
                          </span>
                        </div>

                        <div 
                          ref={musicScrollContainerRef}
                          className="flex-grow overflow-x-auto scrollbar-none flex items-center gap-3 px-4 py-2"
                          style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
                        >
                          {MUSIC_LOGIC_SLIDES.map((slide, sIdx) => {
                            const isActive = musicActiveStep === sIdx;
                            const diff = sIdx - musicActiveStep;
                            const rotateY = Math.max(-25, Math.min(25, diff * -8)) * (tiltIntensity / 50);
                            const translateZ = -Math.abs(diff) * 12 * (tiltIntensity / 50);
                            const opacity = Math.max(0.4, 1 - Math.abs(diff) * 0.12);
                            const scale = isActive ? 1 : Math.max(0.85, 1 - Math.abs(diff) * 0.04);

                            return (
                              <motion.button
                                key={sIdx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMusicActiveStep(sIdx);
                                }}
                                style={{
                                  transformStyle: 'preserve-3d',
                                  transform: `perspective(600px) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
                                  opacity: opacity,
                                  zIndex: 50 - Math.abs(diff),
                                }}
                                className={`flex-shrink-0 w-[110px] text-left rounded-lg overflow-hidden transition-all duration-300 relative group/thumb border ${
                                  isActive 
                                    ? 'border-blue-600 bg-blue-50/10 shadow-[0_0_15px_rgba(37,99,235,0.2)]' 
                                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]'
                                }`}
                              >
                                <div className="aspect-[16/10] w-full relative overflow-hidden bg-slate-50">
                                  <img 
                                    src={slide.image} 
                                    alt={slide.title}
                                    referrerPolicy="no-referrer"
                                    className={`w-full h-full object-cover transition-all duration-500 ${
                                      isActive ? 'scale-105 opacity-100' : 'opacity-70 group-hover/thumb:opacity-100'
                                    }`}
                                  />
                                  <div className={`absolute top-1.5 left-1.5 w-4 h-4 rounded flex items-center justify-center font-mono text-[8px] font-bold shadow-sm ${
                                    isActive ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                                  }`}>
                                    {String(sIdx + 1).padStart(2, '0')}
                                  </div>
                                  {isActive && (
                                    <div className="absolute inset-0 border border-blue-600/30 rounded-lg animate-pulse pointer-events-none" />
                                  )}
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>

                        {/* Drag and Slide Helper Track Slider */}
                        <div className="h-8 px-4 border-t border-slate-200/40 bg-slate-100/40 flex items-center gap-3 shrink-0">
                          <button 
                            onClick={() => setMusicActiveStep(prev => Math.max(0, prev - 1))}
                            className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 disabled:opacity-40 transition-colors cursor-pointer"
                            disabled={musicActiveStep === 0}
                          >
                            <ChevronLeft className="w-3 h-3" />
                          </button>
                          
                          <div className="flex-1 flex items-center relative">
                            <input 
                              type="range"
                              min="0"
                              max={MUSIC_LOGIC_SLIDES.length - 1}
                              value={musicActiveStep}
                              onChange={(e) => setMusicActiveStep(parseInt(e.target.value))}
                              className="w-full h-1 bg-slate-200 hover:bg-slate-300 rounded-lg appearance-none cursor-ew-resize accent-blue-600 focus:outline-none transition-all"
                              style={{
                                background: `linear-gradient(to right, #2563eb 0%, #2563eb ${(musicActiveStep / (MUSIC_LOGIC_SLIDES.length - 1)) * 100}%, #cbd5e1 ${(musicActiveStep / (MUSIC_LOGIC_SLIDES.length - 1)) * 100}%, #cbd5e1 100%)`
                              }}
                            />
                          </div>

                          <button 
                            onClick={() => setMusicActiveStep(prev => Math.min(MUSIC_LOGIC_SLIDES.length - 1, prev + 1))}
                            className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 disabled:opacity-40 transition-colors cursor-pointer"
                            disabled={musicActiveStep === MUSIC_LOGIC_SLIDES.length - 1}
                          >
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key="ui-custom-panoramic-showcase"
                    layoutId="project-container-ui-custom"
                    style={cardStyle}
                    className="lg:col-span-3 group relative bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_16px_48px_rgba(15,23,42,0.04)] overflow-hidden flex flex-col h-auto lg:h-[750px] rounded-2xl"
                  >
                    {/* HEADER */}
                    <div className="h-12 bg-white/70 border-b border-slate-200/20 px-4 flex items-center justify-between shrink-0 z-30">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{language === 'zh' ? '交互仿真画布' : 'INTERACTIVE SIMULATOR'} // UI</span>
                        </div>
                        <div className="text-indigo-600 font-mono text-[10px] font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 shrink-0">
                          {uiActiveStep + 1} / {UI_SLIDES.length}
                        </div>
                      </div>
                    </div>

                    {/* MAIN VIEWER */}
                    <UiMockupViewer 
                      uiActiveStep={uiActiveStep}
                      activeSlide={activeSlide}
                      uiShowGrid={uiShowGrid}
                      uiShowXRay={uiShowXRay}
                      glowIntensity={glowIntensity}
                      tiltIntensity={tiltIntensity}
                    />

                    {/* FILMSTRIP NAVIGATION */}
                    <div className="h-[200px] bg-white/70 backdrop-blur-md border-t border-white/20 flex flex-col overflow-hidden shrink-0">
                      <div className="px-4 py-1.5 border-b border-slate-200/20 flex items-center justify-between shrink-0 bg-white/40">
                        <span className="font-mono text-[9px] text-slate-500 tracking-widest uppercase flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{language === 'zh' ? '仿真画幅流导航' : 'SIMULATOR FILMSTRIP RAIL'}</span>
                        </span>
                      </div>

                      <div 
                        ref={uiScrollContainerRef}
                        className="flex-grow overflow-x-auto scrollbar-none flex items-center gap-3 px-4 py-2"
                        style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
                      >
                        {UI_SLIDES.map((slide, sIdx) => {
                          const isActive = uiActiveStep === sIdx;
                          const diff = sIdx - uiActiveStep;
                          const rotateY = Math.max(-25, Math.min(25, diff * -8)) * (tiltIntensity / 50);
                          const translateZ = -Math.abs(diff) * 12 * (tiltIntensity / 50);
                          const opacity = Math.max(0.4, 1 - Math.abs(diff) * 0.12);
                          const scale = isActive ? 1 : Math.max(0.85, 1 - Math.abs(diff) * 0.04);

                          return (
                            <motion.button
                              key={sIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setUiActiveStep(sIdx);
                              }}
                              style={{
                                transformStyle: 'preserve-3d',
                                transform: `perspective(600px) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
                                opacity: opacity,
                                zIndex: 50 - Math.abs(diff),
                              }}
                              className={`flex-shrink-0 w-[110px] text-left rounded-lg overflow-hidden transition-all duration-300 relative group/thumb border ${
                                isActive 
                                  ? 'border-indigo-600 bg-indigo-50/10 shadow-[0_0_15px_rgba(79,70,229,0.2)]' 
                                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]'
                              }`}
                            >
                              <div className="aspect-[16/10] w-full relative overflow-hidden bg-slate-50">
                                <img 
                                  src={slide.image} 
                                  alt={slide.title}
                                  referrerPolicy="no-referrer"
                                  className={`w-full h-full object-cover transition-all duration-500 ${
                                    isActive ? 'scale-105 opacity-100' : 'opacity-70 group-hover/thumb:opacity-100'
                                  }`}
                                />
                                <div className={`absolute top-1.5 left-1.5 w-4 h-4 rounded flex items-center justify-center font-mono text-[8px] font-bold shadow-sm ${
                                  isActive ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                                }`}>
                                  {String(sIdx + 1).padStart(2, '0')}
                                </div>
                                {isActive && (
                                  <div className="absolute inset-0 border border-indigo-600/30 rounded-lg animate-pulse pointer-events-none" />
                                )}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Drag and Slide Helper Track Slider */}
                      <div className="h-8 px-4 border-t border-slate-200/40 bg-slate-100/40 flex items-center gap-3 shrink-0">
                        <button 
                          onClick={() => setUiActiveStep(prev => Math.max(0, prev - 1))}
                          className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 disabled:opacity-40 transition-colors cursor-pointer"
                          disabled={uiActiveStep === 0}
                        >
                          <ChevronLeft className="w-3 h-3" />
                        </button>
                        
                        <div className="flex-1 flex items-center relative">
                          <input 
                            type="range"
                            min="0"
                            max={UI_SLIDES.length - 1}
                            value={uiActiveStep}
                            onChange={(e) => setUiActiveStep(parseInt(e.target.value))}
                            className="w-full h-1 bg-slate-200 hover:bg-slate-300 rounded-lg appearance-none cursor-ew-resize accent-indigo-600 focus:outline-none transition-all"
                            style={{
                              background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${(uiActiveStep / (UI_SLIDES.length - 1)) * 100}%, #cbd5e1 ${(uiActiveStep / (UI_SLIDES.length - 1)) * 100}%, #cbd5e1 100%)`
                            }}
                          />
                        </div>

                        <button 
                          onClick={() => setUiActiveStep(prev => Math.min(UI_SLIDES.length - 1, prev + 1))}
                          className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 disabled:opacity-40 transition-colors cursor-pointer"
                          disabled={uiActiveStep === UI_SLIDES.length - 1}
                        >
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={project.id}
                  layoutId={`project-container-${project.id}`}
                  onClick={() => setSelectedProject(project)}
                  style={cardStyle}
                  className={`group relative glass-panel border border-white/60 shadow-[0_4px_24px_rgba(31,38,135,0.03)] overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-500 hover:shadow-[0_12px_40px_rgba(31,38,135,0.06)] hover:border-slate-300/50 hover:-translate-y-1 ${colSpanClass}`}
                  whileHover={{ y: -4 }}
                >
                  {/* Image wrapper */}
                  <div className={`relative overflow-hidden w-full bg-slate-100 ${isPrimary ? 'h-64 md:h-[400px]' : 'h-52 md:h-60'}`}>
                    {project.images && project.images.length > 1 ? (
                      <div className="grid grid-cols-2 h-full w-full gap-1.5 p-1.5 bg-slate-50/50">
                        {project.images.map((imgUrl, imgIdx) => (
                          <div key={imgIdx} className="relative overflow-hidden h-full rounded-lg border border-slate-200/50 bg-white">
                            <img 
                              src={imgUrl} 
                              alt={`${project.title} - ${imgIdx + 1}`}
                              className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-500 ease-out"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      />
                    )}
                    
                    {/* Dark gradient mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent pointer-events-none" />



                    {/* Tags overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5 z-10">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-white/10 backdrop-blur-md border border-white/10 text-white rounded text-[9px] font-mono tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Top right floating button */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="w-8 h-8 rounded-full bg-white/95 shadow-sm border border-slate-200/50 flex items-center justify-center text-slate-700 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="p-6 bg-white/60 backdrop-blur-md flex-1 flex flex-col justify-between relative">
                    
                    {/* Bounding Box Info for Inspector Mode */}

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                          {project.year} / {CATEGORIES.find(c => c.id === project.category)?.englishLabel}
                        </span>
                        <span className="font-mono text-[10px] text-blue-500 bg-blue-50 px-2 py-0.5 rounded">
                          SPEC INSPECT
                        </span>
                      </div>
                      
                      <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                        {language === 'zh' ? project.chineseTitle : project.title}
                      </h3>
                      {language === 'zh' ? (
                        <p className="font-mono text-xs text-slate-400 mt-0.5 mb-3 tracking-wide">
                          {project.title}
                        </p>
                      ) : (
                        <div className="h-3" />
                      )}
                      
                      <p className="text-xs text-slate-500 leading-relaxed font-light mb-6">
                        {language === 'zh' ? project.chineseDescription : project.description}
                      </p>
                    </div>

                    {/* Core Performance Indicators removed */}

                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>


      </main>

      {/* ----------------- PROJECT CASE STUDY DEEP INSPECTOR MODAL ----------------- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden">
            {/* Modal Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />

            {/* Modal Sheet Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className={`relative w-full max-w-4xl h-full shadow-2xl overflow-y-auto flex flex-col z-10 border-l ${theme === 'light' ? 'bg-white border-slate-100' : 'bg-slate-900 border-slate-700'}`}
            >
              {/* Sticky Top Header */}
              <div className={`sticky top-0 backdrop-blur-md border-b px-6 py-4 flex items-center justify-between z-30 ${theme === 'light' ? 'bg-white/90 border-slate-100' : 'bg-slate-900/90 border-slate-700'}`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Cpu className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className={`font-display font-bold text-base ${theme === 'light' ? 'text-slate-900' : 'text-slate-100'}`}>
                      {language === 'zh' ? selectedProject.chineseTitle : selectedProject.title}
                    </h3>
                    <p className={`font-mono text-xs uppercase tracking-widest ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}>
                      {language === 'zh' ? selectedProject.title : selectedProject.chineseTitle}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Deep Case Study Body */}
              <div className="p-6 md:p-8 space-y-10 flex-1">
                
                {/* 1. Large Hero Picture */}
                {selectedProject.images && selectedProject.images.length > 1 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.images.map((imgUrl, idx) => (
                      <div key={idx} className="relative rounded-xl overflow-hidden h-[400px] md:h-[600px] bg-slate-950 shadow-inner border border-slate-800/60 flex items-center justify-center">
                        <img 
                          src={imgUrl} 
                          alt={`${selectedProject.title} - ${idx + 1}`} 
                          className="max-w-full max-h-full object-contain hover:scale-[1.02] transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 left-4">
                          <span className="px-2 py-1 bg-white/20 backdrop-blur-md text-white rounded text-[9px] font-mono">
                            POSTER 0{idx + 1}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden h-64 md:h-96 bg-slate-100 shadow-inner">
                    <img 
                      src={selectedProject.imageUrl} 
                      alt={selectedProject.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent pointer-events-none" />
                    
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                      <div>
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-md text-white rounded text-[10px] font-mono">
                          YEAR: {selectedProject.year}
                        </span>
                        <h4 className="text-white font-display text-2xl font-bold mt-2">
                          {language === 'zh' ? selectedProject.chineseTitle : selectedProject.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                )}

                {/* Intro Block */}
                <div className="space-y-4">
                  <h5 className="font-display font-semibold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Compass className="w-4 h-4 text-blue-500" />
                    <span>{language === 'zh' ? '设计陈述与问题对策 (Statement & Rationale)' : 'Statement & Rationale'}</span>
                  </h5>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    {language === 'zh' ? selectedProject.chineseDescription : selectedProject.description}
                  </p>
                  {language === 'zh' && (
                    <p className="text-slate-400 text-xs italic font-mono">
                      {selectedProject.description}
                    </p>
                  )}
                </div>


              </div>

              {/* Sticky bottom close bar */}
              <div className="sticky bottom-0 bg-slate-50 border-t border-slate-100 px-6 py-4 flex items-center justify-between z-30">
                <span className="font-mono text-[10px] text-slate-400">STUDIO.LOGIC / QUANTUM VIEW</span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-medium transition-colors shadow-xs"
                >
                  关闭全景透视
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ----------------- SELF-INTRODUCTION / ABOUT ME MODAL ----------------- */}
      <AnimatePresence>
        {isAboutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
            {/* Modal Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAboutOpen(false)}
              className="absolute inset-0 bg-slate-900/45 backdrop-blur-md"
            />

            {/* Modal Content Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel relative w-full max-w-2xl border border-white/80 shadow-[0_24px_64px_rgba(0,0,0,0.12)] bg-white/95 overflow-hidden flex flex-col z-10"
              style={{ borderRadius: '24px' }}
            >
              
              {/* Header inside modal */}
              <div className="px-6 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-slate-900 tracking-wide">
                      {language === 'zh' ? '设计创作者简介' : 'Creator Profile'}
                    </h3>
                    <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">
                      {language === 'zh' ? '设计师自序与简历' : 'Designer Monologue & Resume'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAboutOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors duration-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Bio Content Area */}
              <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                {/* Visual Avatar / Brand card */}
                <div className="relative rounded-xl overflow-hidden bg-slate-900/75 dark:bg-slate-950/50 backdrop-blur-xl p-6 text-white border border-white/10 dark:border-slate-800 shadow-xl">
                  {/* Grid Lines in background of card for geometric theme */}
                  <div className="absolute inset-0 grid grid-cols-6 gap-2 p-4 opacity-5 pointer-events-none">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <div key={i} className="border border-white/20" />
                    ))}
                  </div>

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/10 dark:bg-indigo-950/40 border border-white/20 dark:border-indigo-800/60 text-white dark:text-indigo-300 rounded text-[9px] font-mono tracking-wider">
                        <Sparkles className="w-2.5 h-2.5 animate-pulse text-indigo-300" />
                        <span>{language === 'zh' ? '2026届应届校招候选人' : 'CLASS OF 2026 CANDIDATE'}</span>
                      </div>
                      <h4 className="font-display text-2xl md:text-3xl font-black tracking-tight text-white leading-none">
                        {language === 'zh' ? '张恒' : 'Zhang Heng'}
                      </h4>
                      <p className="text-white/80 text-xs font-medium tracking-wide">
                        {language === 'zh' ? '求职意向：品牌设计师 / UI/UX设计师 / 创意视觉设计师' : 'Target: Brand Designer / UI/UX / Creative Visual Designer'}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white text-[11px] font-mono mt-2">
                        <span className="flex items-center gap-1">河南 • 郑州</span>
                        <span className="flex items-center gap-1">182-3972-0128</span>
                        <span className="flex items-center gap-1">1836080329@qq.com</span>
                      </div>
                    </div>

                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-violet-500 p-0.5 shrink-0 flex items-center justify-center shadow-lg border border-white/20 hover:rotate-6 transition-transform duration-300">
                        <img 
                          src="https://bee-reg-ab.imagency.cn/e/69ddff0ab8e33a3585a4c5c617de7b89.jpg" 
                          alt="未标题-1-08_new" 
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                          className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                  </div>

                  <div className="border-t border-white/10 dark:border-slate-800 pt-3 mt-4 flex items-center justify-between text-[9px] font-mono text-white">
                    <span>{language === 'zh' ? '河南工程学院 | 视觉传达设计' : 'Henan Institute of Engineering | Visual Comm'}</span>
                    <span>ACTIVE IN HONAN</span>
                  </div>
                </div>

                {/* Text blocks */}
                <div className="space-y-6">
                  {/* Education / Statement */}
                  <div className="space-y-2">
                    <h5 className="text-[10px] uppercase tracking-wider font-mono text-indigo-500 font-bold flex items-center gap-1.5 border-b border-slate-100 pb-1">
                      <Sparkles className="w-3 h-3" />
                      {language === 'zh' ? '个人陈述 / Statement' : 'Design Statement'}
                    </h5>
                    <p className="text-slate-600 text-xs leading-relaxed font-sans font-light">
                      {language === 'zh' 
                        ? '你好，我是张恒，一名热衷于融合前沿美学、科学逻辑与AIGC工具的视觉传达设计师。在多维设计体系（品牌视觉、3D卡通建模、快消品包装、UI/UX）中，我追求平衡与秩序之美。精通C4D、OC、Blender、Figma与AI辅助脑暴流，能在极短时间内实现完美的创意落地。'
                        : 'Hello, I am Zhang Heng, a visual communication designer passionate about merging cutting-edge aesthetics, scientific logic, and AIGC tools. I strive to achieve harmony and rigorous order across brand visual identity, 3D character setups, FMCG packaging, and modern UI/UX design paths.'
                      }
                    </p>
                  </div>

                  {/* Core Skills & Softwares */}
                  <div className="space-y-2">
                    <h5 className="text-[10px] uppercase tracking-wider font-mono text-indigo-500 font-bold flex items-center gap-1.5 border-b border-slate-100 pb-1">
                      <Activity className="w-3 h-3" />
                      {language === 'zh' ? '专业技能与软件 / Software & Skills' : 'Core Specialties'}
                    </h5>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['Ps', 'Figma', 'Ai', 'Blender', 'C4d', 'Ae', '剪映', 'AIGC 辅助脑暴', '快消品包装', '品牌视觉CI', 'UI/UX交互理念'].map((skill, sIdx) => (
                        <span key={sIdx} className="px-2.5 py-1 bg-slate-50 border border-slate-200/50 text-[10px] text-slate-700 font-medium rounded-md hover:bg-indigo-50 hover:border-indigo-100 transition-colors duration-150">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Selected Project History */}
                  <div className="space-y-3">
                    <h5 className="text-[10px] uppercase tracking-wider font-mono text-indigo-500 font-bold flex items-center gap-1.5 border-b border-slate-100 pb-1">
                      <User className="w-3 h-3" />
                      {language === 'zh' ? '重点项目经历 / Key Projects' : 'Selected Experience'}
                    </h5>
                    
                    <div className="space-y-3 pt-1">
                      {/* Project 1 */}
                      <div className="bg-slate-50/50 rounded-lg p-3 border border-slate-100/80 space-y-1 hover:border-indigo-100 transition-all duration-300">
                        <div className="flex justify-between items-start">
                          <h6 className="text-[11px] font-bold text-slate-800">仲景宛西制药山茱萸药材基地形象提升</h6>
                          <span className="text-[9px] font-mono text-slate-400">2025.05 - 2025.07</span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                          针对传统药材基地品牌弱现状，全面升级视觉系统。提取山茱萸核心元素，独立负责户外、室内导视系统设计，融合自然材质。
                        </p>
                      </div>

                      {/* Project 2 */}
                      <div className="bg-slate-50/50 rounded-lg p-3 border border-slate-100/80 space-y-1 hover:border-indigo-100 transition-all duration-300">
                        <div className="flex justify-between items-start">
                          <h6 className="text-[11px] font-bold text-slate-800">东方航天港文旅集团标志设计 (焕新与商用化)</h6>
                          <span className="text-[9px] font-mono text-slate-400">2025.09 - 2025.12</span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                          解决原有标识版权争议痛点，主导品牌标志焕新工程，通过工商注册与版权审核，打通商业化授权与法律合规。
                        </p>
                      </div>

                      {/* Project 3 */}
                      <div className="bg-slate-50/50 rounded-lg p-3 border border-slate-100/80 space-y-1 hover:border-indigo-100 transition-all duration-300">
                        <div className="flex justify-between items-start">
                          <h6 className="text-[11px] font-bold text-slate-800">东方航天港文创大赛主视觉及文创设计</h6>
                          <span className="text-[9px] font-mono text-slate-400">2025.09 - 2026.01</span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                          担任项目组长，采用 AI (Gemini, 即梦, FLOW) 辅助前期脑暴，缩短 30% 初稿时间。主攻航天系列文具创意延展及视觉打样输出。
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Certs & Awards */}
                  <div className="space-y-2">
                    <h5 className="text-[10px] uppercase tracking-wider font-mono text-indigo-500 font-bold flex items-center gap-1.5 border-b border-slate-100 pb-1">
                      <Sparkles className="w-3 h-3" />
                      {language === 'zh' ? '获奖经历与资格证书 / Awards & Credentials' : 'Awards & Honors'}
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] pt-1">
                      <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 p-2 rounded-md border border-slate-100">
                        <span className="text-amber-500 font-bold">★</span>
                        <span>河南省短视频大赛二等奖 (省奖)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 p-2 rounded-md border border-slate-100">
                        <span className="text-amber-500 font-bold">★</span>
                        <span>蓝桥杯文创大赛三等奖</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 p-2 rounded-md border border-slate-100">
                        <span className="text-indigo-500">✔</span>
                        <span>高中美术教师资格证</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 p-2 rounded-md border border-slate-100">
                        <span className="text-indigo-500">✔</span>
                        <span>普通话证书二级甲等</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 p-2 rounded-md border border-slate-100">
                        <span className="text-emerald-500">✦</span>
                        <span>河南省三下乡优秀志愿者</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons (Copy Mail) */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('1836080329@qq.com');
                      setCopiedColor('1836080329@qq.com');
                      setTimeout(() => setCopiedColor(null), 3000);
                    }}
                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-mono font-medium transition-colors duration-200 cursor-pointer shadow-sm"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span>{copiedColor === '1836080329@qq.com' ? (language === 'zh' ? '邮箱已复制！' : 'Email Copied!') : '1836080329@qq.com'}</span>
                    <Copy className="w-3 h-3 opacity-60 hover:opacity-100 ml-1" />
                  </button>

                  <button
                    onClick={() => setIsAboutOpen(false)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors duration-200 cursor-pointer border border-slate-200/30"
                  >
                    {language === 'zh' ? '关闭简介' : 'Close Profile'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ----------------- INTERACTIVE BOTTOM LIGHT TRACKING TRACER ----------------- */}
      <div className="relative w-full overflow-hidden h-8 pointer-events-none z-10">
        <motion.div 
          className="absolute h-[3px] rounded-full blur-[3px] opacity-80"
          style={{
            left: 0,
            x: springX,
            width: '220px',
            background: 'linear-gradient(90deg, transparent, #3b82f6, #8b5cf6, #ec4899, transparent)',
            boxShadow: '0 0 24px 8px rgba(139, 92, 246, 0.5)',
          }}
        />
        <div 
          className="absolute h-[1px] w-full bg-slate-200/30 bottom-0"
        />
      </div>

      {/* ----------------- FOOTER SECTION WITH GENTLE GRADIENT INFO ----------------- */}
      <footer className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] tracking-widest text-slate-400 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono">INTERFACE INTEGRITY: VERIFIED [PORT: 3000]</span>
          </div>
          <div className="font-light normal-case">
            © 2026 STUDIO.LOGIC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex space-x-6 text-[11px] font-mono tracking-wider font-medium">
            <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors duration-200">BEHANCE</a>
            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors duration-200">DRIBBBLE</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors duration-200">INSTAGRAM</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
