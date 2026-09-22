export type SiteCategory = 'all' | 'css' | 'design' | 'youtube' | 'tools';

export interface SiteCategoryInfo {
  readonly id: SiteCategory;
  readonly label: string;
  readonly iconSvg: string;
  readonly description: string;
}

export interface SiteItem {
  readonly id: string;
  readonly name: string;
  readonly url: string;
  readonly category: Exclude<SiteCategory, 'all'>;
  readonly categoryLabel: string;
  readonly iconSvg: string;
  readonly concept: string;
  readonly whyItMatters: string;
  readonly highlights: readonly string[];
  readonly tipOrMnemonic: string;
  readonly tags: readonly string[];
  readonly featured?: boolean;
}

export const SITE_CATEGORIES: readonly SiteCategoryInfo[] = [
  {
    id: 'all',
    label: 'Todos os Sites',
    description: 'Catálogo completo de referências, canais e ferramentas recomendadas',
    iconSvg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`
  },
  {
    id: 'css',
    label: 'CSS & Estilização',
    description: 'Guias aprofundados, truques de layout, seletores e técnicas modernas de CSS',
    iconSvg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`
  },
  {
    id: 'design',
    label: 'Inspiração de Design',
    description: 'Interfaces do mundo real, portfólios visuais, paletas de cores e microinterações',
    iconSvg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94"/></svg>`
  },
  {
    id: 'youtube',
    label: 'Canais de YouTube',
    description: 'Criadores focados em front-end visual, motion, arquitetura e tutoriais passo a passo',
    iconSvg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>`
  },
  {
    id: 'tools',
    label: 'Ferramentas & Docs',
    description: 'Documentação oficial, compatibilidade entre browsers e utilitários do dia a dia',
    iconSvg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`
  }
];

export const SITES_DATA: readonly SiteItem[] = [
  // ==========================================
  // CATEGORIA: CSS
  // ==========================================
  {
    id: 'css-tricks',
    name: 'CSS-Tricks',
    url: 'https://css-tricks.com/',
    category: 'css',
    categoryLabel: 'CSS & Estilização',
    featured: true,
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    concept: 'A bíblia histórica e enciclopédia prática de truques, guias definitivos e técnicas modernas de CSS e desenvolvimento web.',
    whyItMatters: 'Lar dos guias visuais mais famosos do mundo sobre Flexbox ("A Complete Guide to Flexbox") e CSS Grid ("A Complete Guide to Grid"), além do catálogo "The CSS Almanac" com todas as propriedades CSS.',
    highlights: [
      'A Complete Guide to Flexbox (o guia de referência mais consultado na história da web)',
      'A Complete Guide to CSS Grid (diagramas de tracks, grid lines e áreas)',
      'The Almanac (dicionário completo de propriedades e seletores CSS com demonstrações)',
      'Artigos práticos de animações, responsividade e layout moderno'
    ],
    tipOrMnemonic: 'Mnemônico do "Canivete Suíço do CSS": quando tiver dúvida sobre justify-content vs align-items, consulte primeiro o guia visual do CSS-Tricks.',
    tags: ['#CSS', '#Flexbox', '#Grid', '#Almanac', '#WebDev', '#Cheatsheet']
  },
  {
    id: 'modern-css-solutions',
    name: 'Modern CSS Solutions',
    url: 'https://moderncss.dev/',
    category: 'css',
    categoryLabel: 'CSS & Estilização',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    concept: 'Coleção de tutoriais modernos focados em resolver problemas comuns de layout e componentes sem bibliotecas pesadas.',
    whyItMatters: 'Criado por Stephanie Eckles, ensina soluções limpas usando CSS nativo puro, CSS Grid, Container Queries e acessibilidade.',
    highlights: [
      'Padrões de cards responsivos com CSS Grid sem media queries',
      'Estilização acessível de checkboxes, radios e inputs customizados',
      'Container Queries na prática para componentes independentes'
    ],
    tipOrMnemonic: 'Menos JavaScript, mais CSS: resolva layouts com os superpoderes do CSS nativo antes de pensar em código JS.',
    tags: ['#ModernCSS', '#NoJS', '#A11y', '#ContainerQueries', '#PureCSS']
  },
  {
    id: 'kevin-powell-css',
    name: 'Kevin Powell Resources',
    url: 'https://www.kevinpowell.co/',
    category: 'css',
    categoryLabel: 'CSS & Estilização',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
    concept: 'Portal e cursos dedicados a transformar o CSS em algo compreensível, intuitivo e agradável de escrever.',
    whyItMatters: 'Conhecido mundialmente como o "rei do CSS", desmistifica especificidade, stacking context (z-index), clamp() e unidades modernas.',
    highlights: [
      'Guias e cursos gratuitos sobre responsividade e fluidez',
      'Explicação detalhada de CSS Cascade, Subgrid e View Transitions',
      'Desafios de front-end para fixação muscular de código'
    ],
    tipOrMnemonic: 'Não lute contra o CSS: compreenda o algoritmo de fluxo e a cascata em vez de forçar !important.',
    tags: ['#CSSKing', '#Responsividade', '#Cascade', '#Subgrid', '#Frontend']
  },

  // ==========================================
  // CATEGORIA: INSPIRAÇÃO DE DESIGN
  // ==========================================
  {
    id: 'dribbble',
    name: 'Dribbble',
    url: 'https://dribbble.com/',
    category: 'design',
    categoryLabel: 'Inspiração de Design',
    featured: true,
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94"/></svg>`,
    concept: 'A maior comunidade global de designers de produto, UI/UX, ilustradores e tipógrafos exibindo conceitos e trabalhos do mundo real.',
    whyItMatters: 'Fonte primária para descobrir novas tendências estéticas (como Bento Grids, Neomorfismo, Glassmorphism, Microinterações) e paletas de cores refinadas.',
    highlights: [
      'Busca por paleta de cores hexadecimal específica em projetos reais',
      'Milhares de conceitos de dashboards, mobile apps e interfaces web inovadoras',
      'Animações em motion design para inspiração de transições CSS e microinterações',
      'Filtragem por tipografia, vetores, ilustrações e design systems'
    ],
    tipOrMnemonic: 'Mnemônico do "Moodboard": antes de abrir o editor de código, absorva referências no Dribbble para lapidar o senso estético.',
    tags: ['#Dribbble', '#UIUX', '#DesignInspiration', '#Microinteractions', '#BentoGrid', '#Palettes']
  },
  {
    id: 'mobbin',
    name: 'Mobbin',
    url: 'https://mobbin.com/',
    category: 'design',
    categoryLabel: 'Inspiração de Design',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
    concept: 'A maior biblioteca do mundo de fluxos reais de UX/UI capturados diretamente de aplicativos mobile e web em produção.',
    whyItMatters: 'Permite estudar como gigantes da tecnologia (Airbnb, Spotify, Uber, Stripe) resolvem fluxos reais de onboarding, checkout, filtros e modais.',
    highlights: [
      'Fluxos completos passo a passo (User Journeys)',
      'Screenshots reais de aplicações em iOS, Android e Web',
      'Busca por padrões de interface específicos (ex: paywall, bottom sheet, stepper)'
    ],
    tipOrMnemonic: 'Não reinvente a roda do UX: veja como os melhores apps do mundo já resolveram o fluxo que você está construindo.',
    tags: ['#RealWorldUX', '#MobileDesign', '#UserFlows', '#Screenshots', '#AppDesign']
  },
  {
    id: 'awwwards',
    name: 'Awwwards',
    url: 'https://www.awwwards.com/',
    category: 'design',
    categoryLabel: 'Inspiração de Design',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
    concept: 'Premiação internacional que reconhece e promove o talento dos melhores desenvolvedores e web designers do planeta.',
    whyItMatters: 'Referência suprema para animações WebGL, experiências interativas 3D, tipografia ousada e sites experimentais premiados.',
    highlights: [
      'Site do Dia (Site of the Day) com avaliação de Design, Usabilidade, Criatividade e Conteúdo',
      'Coleções de microinterações, cursores interativos e efeitos de scroll inovadores',
      'Artigos técnicos detalhando as tecnologias usadas pelos vencedores'
    ],
    tipOrMnemonic: 'O estado da arte da web: para saber até onde a tecnologia front-end pode chegar, olhe os vencedores do Awwwards.',
    tags: ['#Awwwards', '#WebAwards', '#CreativeDev', '#WebGL', '#Animation', '#StateOfTheArt']
  },

  // ==========================================
  // CATEGORIA: CANAIS DE YOUTUBE
  // ==========================================
  {
    id: 'kole-jain',
    name: 'Kole Jain (@KoleJain)',
    url: 'https://www.youtube.com/@KoleJain',
    category: 'youtube',
    categoryLabel: 'Canais de YouTube',
    featured: true,
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
    concept: 'Canal de ponta em tutoriais visuais ultra-didáticos de UI/UX, componentes modernos de interface e front-end dinâmico.',
    whyItMatters: 'Criador do célebre formato "Every UI/UX Concept Explained in Under 10 Minutes" — inspiração fundamental para este Guia do Programador! Vídeos diretos ao ponto, com animações ricas e sem enrolação.',
    highlights: [
      'Série "Every UI/UX Concept Explained": resumos visuais de controles, anatomia e feedback',
      'Implementação de microinterações e componentes interativos passo a passo',
      'Demonstração prática de usabilidade, hierarquia visual e design patterns modernos',
      'Ritmo ágil e focado em retenção rápida e memorização'
    ],
    tipOrMnemonic: 'Mnemônico do "Resumo Visual Acelerado": aprenda a essência do conceito em 5 minutos e aplique diretamente no código.',
    tags: ['#KoleJain', '#UIUXExplained', '#QuickLearning', '#ModernFrontend', '#VisualGuides']
  },
  {
    id: 'kevin-powell-youtube',
    name: 'Kevin Powell (YouTube)',
    url: 'https://www.youtube.com/@KevinPowell',
    category: 'youtube',
    categoryLabel: 'Canais de YouTube',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>`,
    concept: 'O canal mais recomendado do mundo para aprender CSS de verdade, desde o iniciante até truques avançados.',
    whyItMatters: 'Kevin foca em mentalidade: ensina como o navegador "pensa" em termos de layout, evitando hacks e frustrações comuns.',
    highlights: [
      'Vídeos semanais dissecando novos recursos de CSS (como :has(), subgrid e scroll-driven animations)',
      'Refatoração de layouts reais enviados por inscritos',
      'Explicações cristalinas de Flexbox, Grid e Acessibilidade'
    ],
    tipOrMnemonic: 'Pense como o motor de renderização: quando você entende como o CSS calcula tamanhos, tudo faz sentido.',
    tags: ['#CSSKing', '#Tutorials', '#Flexbox', '#Grid', '#Responsive']
  },
  {
    id: 'hyperplexed',
    name: 'Hyperplexed (YouTube)',
    url: 'https://www.youtube.com/@Hyperplexed',
    category: 'youtube',
    categoryLabel: 'Canais de YouTube',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    concept: 'Canal especializado em recriar os efeitos visuais, animações e interações mais impressionantes da web moderna.',
    whyItMatters: 'Demonstra como criar efeitos mágicos de hover, cartões magnéticos, animações de texto e layouts estelares em minutos.',
    highlights: [
      'Recriação de efeitos de sites renomados (Apple, Stripe, Linear)',
      'Uso inteligente de CSS moderno e JavaScript puro para microinterações',
      'Código limpo com foco em performance e impacto visual'
    ],
    tipOrMnemonic: 'Impacto nos detalhes: uma microinteração bem calibrada transforma uma interface comum em uma experiência memorável.',
    tags: ['#CreativeDev', '#Animations', '#Microinteractions', '#VisualPolish', '#CodeWalkthrough']
  },

  // ==========================================
  // CATEGORIA: FERRAMENTAS & DOCS
  // ==========================================
  {
    id: 'mdn-web-docs',
    name: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/',
    category: 'tools',
    categoryLabel: 'Ferramentas & Docs',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
    concept: 'A documentação de referência oficial, aberta e mantida pela comunidade para padrões web: HTML, CSS, JavaScript e Web APIs.',
    whyItMatters: 'A fonte definitiva de consulta técnica. Cada especificação, compatibilidade de navegadores e exemplos de uso verificados.',
    highlights: [
      'Tabelas de compatibilidade Browser Compatibility Data (BCD)',
      'Documentação aprofundada de WAI-ARIA e Acessibilidade Semântica',
      'Exemplos interativos de código no próprio navegador'
    ],
    tipOrMnemonic: 'A verdade absoluta da web: quando houver dúvida entre um tutorial e o MDN, a especificação do MDN é a autoridade máxima.',
    tags: ['#MDN', '#OfficialDocs', '#HTML5', '#CSS3', '#WebAPIs', '#Standard']
  },
  {
    id: 'caniuse',
    name: 'Can I Use',
    url: 'https://caniuse.com/',
    category: 'tools',
    categoryLabel: 'Ferramentas & Docs',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    concept: 'Ferramenta essencial para consultar a compatibilidade e suporte de qualquer recurso HTML, CSS, SVG ou JS entre todos os navegadores.',
    whyItMatters: 'Evita quebrar interfaces em produção permitindo verificar a porcentagem de suporte global antes de adotar um novo recurso.',
    highlights: [
      'Porcentagem exata de suporte global e regional',
      'Histórico de versões de Chrome, Safari, Firefox, Edge e navegadores mobile',
      'Notas de bugs conhecidos e prefixos necessários'
    ],
    tipOrMnemonic: 'Verifique antes de commitar: 10 segundos no "Can I Use" evitam horas de depuração em navegadores móveis.',
    tags: ['#CanIUse', '#BrowserSupport', '#Compatibility', '#WebStandards', '#CSSFeatures']
  }
];
