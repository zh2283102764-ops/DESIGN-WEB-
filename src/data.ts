import { Project } from './types';

// High-quality professional design photography URLs to ensure robust compilation
const uiDesignShowcase = 'https://bee-reg-ab.imagency.cn/e/0775c5a154634b0c3972118109ee02bf.jpg';
const fengZhiColdChain = 'https://bee-reg-ab.imagency.cn/e/74f753666497c274d299a3ea91e85f44.png';
const visualDesignShowcase = 'https://bee-reg-ab.imagency.cn/e/3eabd64a212d23e02121b1126fd2c4eb.png';
const packagingDesignShowcase = 'https://bee-reg-ab.imagency.cn/e/2f6f587f6c588b69b2e9da9d2e6dfa9c.jpg';
const threeDDesignShowcase = 'https://bee-reg-ab.imagency.cn/e/f52b3e45de0fce07bb88fc0815f71bd7.jpg';

export const CATEGORIES = [
  { id: 'ui', label: 'UI设计', englishLabel: 'UI Design' },
  { id: 'brand', label: '品牌设计', englishLabel: 'Brand Identity' },
  { id: 'visual', label: '视觉设计', englishLabel: 'Visual & Typography' },
  { id: 'packaging', label: '包装设计', englishLabel: 'Packaging Design' },
  { id: '3d', label: '3D设计', englishLabel: '3D & Spatial Design' },
] as const;

export const PROJECTS: Project[] = [
  // ================= UI DESIGN =================
  {
    id: 'ui-music-design-logic',
    title: 'LeShare Music - Original Music UI Design',
    chineseTitle: '乐享音乐—原创音乐UI设计',
    category: 'ui',
    year: '2026',
    description: 'A comprehensive, multi-dimensional presentation demonstrating the UX wireframes, typography grid, design token variables, and detailed interface flows of the flagship music app.',
    chineseDescription: '旗舰级音乐播放App的整体UI设计逻辑与体验推演系统，涵盖UX信息架构、栅格比例规范、设计系统变量及完整的核心界面设计。',
    imageUrl: 'https://bee-reg-ab.imagency.cn/e/41620fbdf9c28271a46606651bee0ad8.jpg',
    images: [
      'https://bee-reg-ab.imagency.cn/e/41620fbdf9c28271a46606651bee0ad8.jpg',
      'https://bee-reg-ab.imagency.cn/e/14e5da710f7bd64b664d824a77a1ded3.jpg',
      'https://bee-reg-ab.imagency.cn/e/703a70f9ad5b87f890cb8b40e6fec60c.jpg',
      'https://bee-reg-ab.imagency.cn/e/514735a44ec79a028d32de3e89c8cc35.jpg',
      'https://bee-reg-ab.imagency.cn/e/191d4e6a3ef06c459e12ac4176ef2cd1.jpg',
      'https://bee-reg-ab.imagency.cn/e/5738c17aea6757a8a1c7eae7ded22b3d.jpg',
      'https://bee-reg-ab.imagency.cn/e/b9cd40be70e0ac538fc4a4f5f4a01633.jpg',
      'https://bee-reg-ab.imagency.cn/e/693b465bdfd119811f5e1782b495d0ff.jpg',
      'https://bee-reg-ab.imagency.cn/e/b2aef3486b62897d9368f4315de26805.jpg',
      'https://bee-reg-ab.imagency.cn/e/580796b729e6e498bcceb1d8231f2161.jpg',
      'https://bee-reg-ab.imagency.cn/e/d09e4cfc93c3509a40311a4bc0fa449f.jpg',
      'https://bee-reg-ab.imagency.cn/e/6e28a393bdc63674faade1393f9cf642.jpg',
      'https://bee-reg-ab.imagency.cn/e/1ff214eb41b7144baccb9ed5bf7fc72a.jpg'
    ],
    tags: ['Music UI', 'UX Architecture', 'Design Tokens', 'Interface Logic', 'Case Study'],
    metrics: [
      { label: 'Core Interface Screens', value: '13 Boards' },
      { label: 'Pixel Grid Accuracy', value: '100%' },
      { label: 'Information Density', value: 'Optimal' }
    ],
    specs: {
      gridSystem: '8px Soft Grid (4-Column Mobile & 24-Column Landscape)',
      spacingUnit: 'Base unit 4px / Increment 8px (4, 8, 16, 24, 32, 48, 64)',
      typography: {
        heading: 'Space Grotesk & Outfit Display',
        body: 'Inter (Bilingual dynamic spacing, Major Third scaling)',
        scaling: 'Major Third (1.250 ratio)'
      },
      colorPalette: [
        { name: 'Cosmic Pitch Black', hex: '#020617', usage: 'Deep dark background ensuring ultra-comfort during late-night listening (OLED friendly)' },
        { name: 'Emissive Golden Ray', hex: '#F59E0B', usage: 'Premium branding golden accent representing warm acoustic harmonics' },
        { name: 'Urgent Red Alert', hex: '#EF4444', usage: 'High-contrast warnings for high acoustic pressure and otological protection limits' },
        { name: 'Casting Electric Blue', hex: '#3B82F6', usage: 'Active connection and multi-terminal audio streaming routes' }
      ]
    },
    interactiveLogic: {
      objective: 'Present the continuous design logic and physical aesthetics of the ecosystem with full bilingual descriptions.',
      scientificApproach: 'Cohesively mapping user flow steps with layout specifications to ensure perfect balance between visual art and data representation.',
      userFlowSteps: [
        'User views the Concept Pitch and wireframe blueprints.',
        'Analyzing global typography grids and component layouts.',
        'Inspecting the deep interface functional screens and adaptive vehicle displays.'
      ]
    }
  },
  {
    id: 'ui-neomorphic-dashboard',
    title: 'Aether OS Intelligence Hub',
    chineseTitle: 'Aether 智能操作系统中枢',
    category: 'ui',
    year: '2026',
    description: 'A glassmorphic telemetry control center utilizing cognitive layout principles to optimize visual tracking speeds.',
    chineseDescription: '基于认知布局原理的半透明玻璃态遥测控制中心，旨在缩短用户的视觉搜寻时间并优化信息传递效率。',
    imageUrl: uiDesignShowcase,
    tags: ['Glassmorphism', 'Fitts\'s Law', '8px Grid System', 'Data Telemetry'],
    metrics: [
      { label: 'Cognitive Load Reduction', value: '-34%' },
      { label: 'Interaction Accuracy', value: '99.2%' },
      { label: 'Visual Ingestion Speed', value: '180ms' }
    ],
    specs: {
      gridSystem: '8px Soft Grid (12-Column Responsive Desktop Layout)',
      spacingUnit: 'Base unit 4px / Increment 8px (4, 8, 16, 24, 32, 48, 64)',
      typography: {
        heading: 'Inter Tight & Space Grotesk (Visual Anchor)',
        body: 'Inter (High legibility, dynamic line height)',
        scaling: 'Major Third (1.250 ratio) - 14px, 17.5px, 22px, 27.5px, 34px, 42.5px'
      },
      colorPalette: [
        { name: 'Surgical White', hex: '#FFFFFF', usage: 'Primary surface & container cards (80% opacity with backdrop-blur-xl)' },
        { name: 'Core Dark Slate', hex: '#0F172A', usage: 'Deep background structural text and visual focal points' },
        { name: 'Cosmic Magenta Accent', hex: '#EC4899', usage: 'Interactive status toggles, hover effects, and call-to-actions' },
        { name: 'Telemetry Cyan Accent', hex: '#06B6D4', usage: 'Data visualizer lines, indicators, and primary path guidelines' }
      ]
    },
    interactiveLogic: {
      objective: 'Optimize data telemetry monitoring and prevent visual fatigue under long-hour analytical operations.',
      scientificApproach: 'Applied Fitts\'s Law for target acquisition sizes, combined with Weber-Fechner law of perception for tone adjustments, ensuring text-to-background contrast remains at a perfect 4.5:1 ratio even with glass overlay.',
      userFlowSteps: [
        'User enters dashboard with a cascading content-loading sequence (staggered by 30ms increments to prevent jarring shifts).',
        'Visual hierarchy directs focus to the core Telemetry graph (primary anchor).',
        'Interactive card expanders translate on the Z-axis with 0.25s spring physics, offering non-obtrusive detailed parameters on-demand.'
      ]
    }
  },

  // ================= BRAND DESIGN =================
  {
    id: 'brand-lumen-labs',
    title: 'Feng Zhi Cold Chain Brand Identity',
    chineseTitle: '峰致冷链品牌形象与物流车队识别系统',
    category: 'brand',
    year: '2026',
    description: 'A professional corporate brand identity and fleet logistics visual design system integrating modern typography, container grids, and vibrant color schemes.',
    chineseDescription: '融合现代字标、集装箱网格与鲜明色彩的专业物流车队及品牌形象视觉设计系统，展现极致的现代感与工业严谨性。',
    imageUrl: fengZhiColdChain,
    tags: ['Logistics Fleet', 'Grid System', 'Brand Identity', 'Industrial Design'],
    metrics: [
      { label: 'Cohesive Score', value: '99/100' },
      { label: 'Fleet Recognition', value: '+85%' },
      { label: 'Grid Rigor Index', value: '100%' }
    ],
    specs: {
      gridSystem: 'Standard Logistics Container Grid & Type Alignment System',
      spacingUnit: 'Proportional Letter Spacing / Truck Side Ratio 1:4',
      typography: {
        heading: 'Space Grotesk & Heavy Geometric Sans-serif (Visual Anchor)',
        body: 'Inter & Songti / Mincho (Aesthetic pairing)',
        scaling: 'Perfect Fourth (1.333 ratio)'
      },
      colorPalette: [
        { name: '峰致冷链深海蓝 (Cold Chain Blue)', hex: '#0B2545', usage: '品牌主基调色，代表专业、安全的低温储运与物流控制环境 (Primary core identity)' },
        { name: '行车安全活力橙 (Vibrant Orange)', hex: '#FF6B35', usage: '安全反光与车体识别条带，在恶劣天气或夜间提供极高视觉对比度 (High-contrast safety fleet accent)' },
        { name: '工业中性深空灰 (Neutral Slate)', hex: '#8F9FA9', usage: '辅助系统底色、规格网格线及中性色质感排版 (Supporting structural grid and typography framework)' },
        { name: '高光极致纯净白 (Arctic White)', hex: '#F4F6F9', usage: '画册留白、安全白区和科技感负空间，确保信息纯净无摩擦传递 (Minimalist layout background and negative space)' }
      ]
    },
    interactiveLogic: {
      objective: 'Optimize truck side-body readability under high-speed highway conditions while maintaining premium corporate elegance.',
      scientificApproach: 'Calculated letter-spacing and visual contrast based on highway viewing distances and vehicle speed perception (Fitts\'s Law & Weber-Fechner Law), ensuring FZ identity is instantly recognizable within 150ms.',
      userFlowSteps: [
        'Viewer observes the logistics truck at a distance with a distinct high-contrast blue container side and orange checkered highlights.',
        'As the vehicle approaches, the heavy overlapping "FZ 峰致冷链" watermark typographic layout creates layered depth.',
        'The top white presentation sheet header organizes key information cleanly on corporate branding boards.'
      ]
    }
  },

  // ================= VISUAL DESIGN =================
  {
    id: 'visual-typographic-tension',
    title: 'Tmall Camping Season - Find the Little Beauty in Your Life',
    chineseTitle: '天猫露营季-寻找你生活中的小美好',
    category: 'visual',
    year: '2026',
    description: 'This key visual design was completed leveraging industry-leading AIGC tools combined with initial creative sketch concepts.',
    chineseDescription: '本此次设计借助行业主流AIGC加上前期草图创意构想完成主视觉设计。',
    imageUrl: visualDesignShowcase,
    tags: ['Grid Rigor', 'Negative Space', 'Asymmetry', 'High-Contrast Post-Punk'],
    metrics: [
      { label: 'Exhibition Footfall', value: '45,000+' },
      { label: 'Visual Interaction Rate', value: '88%' },
      { label: 'Media Features', value: '14' }
    ],
    specs: {
      gridSystem: 'Swiss Typographic Grid (International Typographic Style)',
      spacingUnit: 'Point System: 12pt / 24pt / 48pt Column Dividers',
      typography: {
        heading: 'Neue Haas Grotesk (Drawn tight, negative tracking)',
        body: 'Fletcher Sans-serif',
        scaling: 'Double Octave scale (Huge display contrast)'
      },
      colorPalette: [
        { name: 'Matte Ink Black', hex: '#08080A', usage: '90% visual weight; creates heavy informational gravity' },
        { name: 'Pristine Poster White', hex: '#FAFAFC', usage: 'Pure negative space channels to guide optical pathways' },
        { name: 'Kinetic Neon Orange', hex: '#FF5A36', usage: '10% critical warnings, interactive links, and physical exhibit arrows' }
      ]
    },
    interactiveLogic: {
      objective: 'Break static printing boundaries and translate heavy Swiss-style layout rules into a reactive fluid layout.',
      scientificApproach: 'Devised a kinetic grid where typographic letters dynamically adjust letter-spacing and font-weight based on the user\'s viewport scroll velocity, creating actual "tension" through layout physics.',
      userFlowSteps: [
        'On scroll, poster blocks slide with asynchronous vertical speeds (parallax factor calculated based on Golden Ratio).',
        'Cursor interaction creates an invisible gravitational pull, warping adjacent letters with precise CSS variable transitions.',
        'Clicking an asset transitions the entire layout into a clean, wireframe grid inspect overlay.'
      ]
    }
  },
  {
    id: 'visual-changhong-ecommerce',
    title: 'Changhong E-commerce Key Visual Design',
    chineseTitle: '长虹电商大促主视觉设计',
    category: 'visual',
    year: '2026',
    description: 'A premium promotional key visual design system for Changhong household appliances, emphasizing contour geometry, high-fidelity modeling setups, and structural layout spacing.',
    chineseDescription: '长虹家用电器电商大促主视觉设计案例，强化了产品白模的立体质感与光影轮廓，删除多余修饰后保留原场景的几何元素与透视构图，注重画面的对称及线条张力。',
    imageUrl: 'https://bee-reg-ab.imagency.cn/e/6794251565686eb9fa2ee24811a5a4ff.jpg',
    images: [
      'https://bee-reg-ab.imagency.cn/e/6794251565686eb9fa2ee24811a5a4ff.jpg',
      'https://bee-reg-ab.imagency.cn/e/5b57aa7e473b9303f97159bcd86ae79b.jpg'
    ],
    tags: ['E-commerce KV', '3D Layout', 'Product Outlines', 'Contour Shading'],
    metrics: [
      { label: 'Click-Through Rate', value: '+34.2%' },
      { label: 'E-commerce Conversion', value: '+28.5%' },
      { label: 'Brand Visual Cohesion', value: '98%' }
    ],
    specs: {
      gridSystem: 'Dynamic Perspective Grid & Central Bilateral Balance',
      spacingUnit: 'Bespoke ratio aligned to product silhouettes',
      typography: {
        heading: 'Outfit SemiBold & Futura Bold (Dynamic Contrast)',
        body: 'Inter & PingFang SC (Bilingual support)',
        scaling: 'Major Third (1.250 ratio)'
      },
      colorPalette: [
        { name: 'Metallic Pearl White', hex: '#F8FAFC', usage: 'Product surface highlights and structured matted bodies' },
        { name: 'Deep Space Shadow Gray', hex: '#1E293B', usage: 'Contrast background elements and precise contour shadow tracking' },
        { name: 'Promotional Scarlet Accent', hex: '#F43F5E', usage: 'High-contrast text callouts and campaign active highlights' }
      ]
    },
    interactiveLogic: {
      objective: 'Elevate product silhouette perception and guide customer attention to premium home appliance details without visual clutter.',
      scientificApproach: 'Applied Golden Ratio layout distribution and Gestalt grouping laws to design key product anchors. Shadow-tracking techniques establish an elegant, premium matte white aesthetic.',
      userFlowSteps: [
        'User scrolls to view the visual case, presenting side-by-side promotional posters emphasizing clean structures.',
        'Hovering or dragging initiates detail-focal sweeps, revealing pristine wireframe geometry layers under products.',
        'Clicking opens the deep inspect panels detailing the precise grid layout and font-scaling systems.'
      ]
    }
  },
  // ================= PACKAGING DESIGN =================
  {
    id: 'pack-islands-skincare',
    title: 'Islands Premium Skincare Series',
    chineseTitle: '仲景养生快消品包装设计',
    category: 'packaging',
    year: '2026',
    description: 'This packaging design was rendered and produced using C4D and Octane Renderer (OC) to deliver pristine visual fidelity.',
    chineseDescription: '此次包装设计采用C4D与OC渲染器进行高精细度建模与渲染，展现温润简约的材质质感。',
    imageUrl: 'https://bee-reg-ab.imagency.cn/e/cd4876496877e3308bc31148bad86679.png',
    images: [
      'https://bee-reg-ab.imagency.cn/e/cd4876496877e3308bc31148bad86679.png',
      'https://bee-reg-ab.imagency.cn/e/efdbfc3824cb24e6d48ccfb840f55279.png'
    ],
    tags: ['C4D Render', 'OC Renderer', 'FMCG Packaging', 'Tactile Layout'],
    metrics: [
      { label: 'Eco-Material Score', value: '100%' },
      { label: 'Physical Grip Satisfaction', value: '4.8/5' },
      { label: 'Shelving Visual Contrast', value: 'High' }
    ],
    specs: {
      gridSystem: 'Label Centric 1:2 Proportion Grid',
      spacingUnit: 'Vertical spacing aligned to text row height (3.125mm)',
      typography: {
        heading: 'Helvetica Neue Light & Editorial Serif',
        body: 'Aptos Sans',
        scaling: 'Perfect Fifth (1.500 ratio)'
      },
      colorPalette: [
        { name: 'Frosted Silica White', hex: '#F3F4F6', usage: 'Translucent frosted glass container mimicking marine salt mist' },
        { name: 'Eucalyptus Pale Green', hex: '#D1FAE5', usage: 'Formulated fluid hue showing through the translucent container walls' },
        { name: 'Botanist Charcoal', hex: '#1F2937', usage: 'Sub-millimeter micro typography details and recycling markers' }
      ]
    },
    interactiveLogic: {
      objective: 'Build a sensory connection between natural skincare ingredients and highly analytical product packaging design.',
      scientificApproach: 'Computed physical container dimensions against natural grip physics, drafting text placements exactly on non-touch surfaces of the bottles to preserve visual legibility during daily product application.',
      userFlowSteps: [
        'Web user can interactively rotate the packaging bottle 360 degrees.',
        'Clicking on packaging ingredients highlights the corresponding chemical structural logic.',
        'The virtual light source can be dragged around, demonstrating frosted glass refraction via custom CSS shader filters.'
      ]
    }
  },
  {
    id: 'pack-zhongjing-powder',
    title: 'Zhongjing Notoginseng & American Ginseng Powder Packaging',
    chineseTitle: '仲景三七粉、西洋参粉快消品包装设计案例',
    category: 'packaging',
    year: '2026',
    description: 'High-quality FMCG packaging design for Zhongjing traditional Chinese health powders, fusing historical herb aesthetics with premium glassmorphic containers.',
    chineseDescription: '仲景三七粉、西洋参粉快消品包装设计案例，结合传统药膳养生与现代快消视觉，利用精细的3D光影和透光玻璃质感展现品牌的高端与专业性。',
    imageUrl: 'https://bee-reg-ab.imagency.cn/e/d08c9977d48f170ae54bcd7c2b2db009.png',
    images: [
      'https://bee-reg-ab.imagency.cn/e/d08c9977d48f170ae54bcd7c2b2db009.png',
      'https://bee-reg-ab.imagency.cn/e/d29746764637226306ac5e3c32d9f22e.png'
    ],
    tags: ['C4D Render', 'Traditional & Modern', 'Herb Powder Packaging', 'Premium Octane Shader'],
    metrics: [
      { label: 'Ray-Tracing Depth', value: '32 bounces' },
      { label: 'Branding Recognition', value: '96.8%' },
      { label: 'Customer Trust Score', value: '4.9/5' }
    ],
    specs: {
      gridSystem: 'Symmetrical Central Brand Axis Layout',
      spacingUnit: 'Prestige product margins aligned to text row bounds',
      typography: {
        heading: 'FZSuXinShiTi & Playfair Display',
        body: 'Inter & PingFang SC',
        scaling: 'Golden Ratio (1.618 ratio)'
      },
      colorPalette: [
        { name: 'Warm Herbal Amber', hex: '#8B5A2B', usage: 'Protective satin translucent amber glass container rendering' },
        { name: 'Imperial Gold Border', hex: '#D4AF37', usage: 'Intricate brand detailing and premium metallic lid rimming' },
        { name: 'Traditional Ink Charcoal', hex: '#1C1C1E', usage: 'Clean, high-contrast back-label typography and barcode margins' }
      ]
    },
    interactiveLogic: {
      objective: 'Merge historical medicine cabinet layouts with streamlined minimalist consumer dynamics.',
      scientificApproach: 'Optimized container diameter to guarantee comfortable handling, and adjusted label materials to repel organic oil fingerprints during routine dispensing.',
      userFlowSteps: [
        'User views the central showcase depicting both premium product jars in side-by-side golden lighting setups.',
        'Hovering over labels initiates subtle 3D reflections, revealing the exquisite matte texture finish.',
        'Deep click interaction enables cross-section detail sweeps of the amber glass layers.'
      ]
    }
  },

  // ================= 3D DESIGN =================
  {
    id: 'three-d-glassmorphic-realms',
    title: 'Blender Cartoon Mini Scene Design',
    chineseTitle: 'Blender卡通小场景设计',
    category: '3d',
    year: '2026',
    description: 'Blender cartoon miniature styling and creative scene rendering.',
    chineseDescription: 'Blender卡通小场景设计建模与渲染案例。',
    imageUrl: 'https://bee-reg-ab.imagency.cn/e/a22345165ffd757151bed5466a35c829.jpg',
    images: [
      'https://bee-reg-ab.imagency.cn/e/a22345165ffd757151bed5466a35c829.jpg'
    ],
    tags: ['Blender 3D', 'Cartoon Scene', 'Octane Render', 'Lighting Rig'],
    metrics: [
      { label: 'Render Complexity', value: '12M Polys' },
      { label: 'Ray-Tracing Depth', value: '16 bounces' },
      { label: 'Interactive Frame rate', value: '120fps' }
    ],
    specs: {
      gridSystem: 'XYZ Tri-Planar Cartesian Coordinate Grid',
      spacingUnit: 'Unit based on lightwave wavelength divisions (nm)',
      typography: {
        heading: 'Syncopate (Ultra-wide display typeface)',
        body: 'JetBrains Mono',
        scaling: 'Geometric Progression Ratio (1.5)'
      },
      colorPalette: [
        { name: 'Spectral Glass Core', hex: '#E0F2FE', usage: 'High-index refraction glass body reflecting full rainbow spectrum' },
        { name: 'Chrome Liquid Metal', hex: '#F1F5F9', usage: 'Perfect mirror-reflection ribbons weaving through the sculpture' },
        { name: 'Ethereal Infrared Glow', hex: '#FCE7F3', usage: 'Backlit atmospheric gas particles, giving depth to the black space' }
      ]
    },
    interactiveLogic: {
      objective: 'Re-create high-end physical caustic glass refractions directly inside real-time responsive web rendering cycles.',
      scientificApproach: 'Built simulated light scattering mathematics into CSS filters and WebGL pipelines. By estimating standard glass index of refraction (IoR = 1.52) against screen coordinates, background cards split light wavelengths dynamically according to pointer coordinates.',
      userFlowSteps: [
        'Hovering over the 3D sculpture triggers fluid metallic ripples calculated using real-time wave formulas.',
        'User can customize glass dispersion density values using a floating control panel.',
        'A single click splits the mesh wireframes, revealing the underlying structural polygon mathematical coordinates.'
      ]
    }
  },
  {
    id: 'three-d-hollow-knight',
    title: 'Hollow Knight Character & Scene Design',
    chineseTitle: '空洞骑士人物+场景建模渲染设计案例',
    category: '3d',
    year: '2026',
    description: 'A stylistic rendering case combining Hollow Knight characters with atmospheric organic landscape modeling.',
    chineseDescription: '空洞骑士人物+场景建模渲染设计案例。融合经典的游戏人物形象与高度还原的场景光影，着重雕琢白模的立体材质感与静谧空灵的画作张力。',
    imageUrl: 'https://bee-reg-ab.imagency.cn/e/652b5956b6f9163ee84903a60ab90e26.jpg',
    images: [
      'https://bee-reg-ab.imagency.cn/e/652b5956b6f9163ee84903a60ab90e26.jpg'
    ],
    tags: ['Blender 3D', 'Character Modeling', 'Scene Rendering', 'Stylized Art'],
    metrics: [
      { label: 'Scene Triangles', value: '8.4M' },
      { label: 'Dynamic Lighting', value: '98%' },
      { label: 'Atmosphere Score', value: '4.9/5' }
    ],
    specs: {
      gridSystem: 'Golden Ratio Composition & Central Focus',
      spacingUnit: 'Curated balance margins matching key scenery contours',
      typography: {
        heading: 'Cinzel Decorative & Outfit',
        body: 'Inter & PingFang SC',
        scaling: 'Perfect Fourth (1.333 ratio)'
      },
      colorPalette: [
        { name: 'Ancient Hallownest Grey', hex: '#E2E8F0', usage: 'Satin matted white structures of the character mask and environmental monuments' },
        { name: 'Abyssal Darkness Blue', hex: '#020617', usage: 'Deep ambient backdrop occlusion and contrasting silhouette shades' },
        { name: 'Luminous Soul Cyan', hex: '#38BDF8', usage: 'Ethereal focal point glows from the background and ground debris' }
      ]
    },
    interactiveLogic: {
      objective: 'Build a high-immersion stylized game diorama focusing on lighting depth and outline contours.',
      scientificApproach: 'Designed subtle raytraced contact shadows and clean micro-beveling on white clay bodies to reinforce character volume. Optimized viewport rendering settings using adaptive ray distribution.',
      userFlowSteps: [
        'User initiates scroll view to observe the moody 3D landscape and stylized characters.',
        'Hovering over elements sweeps key illumination paths, demonstrating the 3D depth and outline sharpness.',
        'Clicking inside the active frame showcases raw untextured wireframes to outline modeling details.'
      ]
    }
  }
];

