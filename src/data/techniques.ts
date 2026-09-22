export type TechniqueCategory = 'all' | 'structure' | 'techniques';

export interface TechniqueCategoryInfo {
  id: TechniqueCategory;
  label: string;
  iconSvg: string;
}

export interface TechniqueItem {
  id: string;
  name: string;
  ptName: string;
  category: 'structure' | 'techniques';
  categoryLabel: string;
  concept: string;
  purpose: string;
  goodPractice: string;
  commonPitfall: string;
  mnemonic: string;
  htmlSnippet: string;
  cssSnippet: string;
  renderInteractive: (container: HTMLElement) => void;
}

export const TECHNIQUE_CATEGORIES: TechniqueCategoryInfo[] = [
  {
    id: 'all',
    label: 'Todas as Partes & Técnicas',
    iconSvg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`
  },
  {
    id: 'structure',
    label: 'Partes que Compõem o Site',
    iconSvg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`
  },
  {
    id: 'techniques',
    label: 'Técnicas Modernas de UI/Layout',
    iconSvg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
  }
];

export const TECHNIQUES_DATA: TechniqueItem[] = [
  // 1. TIMELINE (Técnica Solicitada Explicitamente)
  {
    id: 'timeline',
    name: 'Timeline (Linha do Tempo)',
    ptName: 'Sequência Cronológica com Nós e Conectores',
    category: 'techniques',
    categoryLabel: 'Técnica de UI/Layout',
    concept: 'Estrutura visual contínua que organiza eventos, marcos históricos ou etapas em ordem cronológica através de nós e uma linha guia.',
    purpose: 'Roadmaps de produtos, histórico de pedidos/rastreamento de encomendas, evolução de carreira ou registros de auditoria.',
    goodPractice: 'Utilize nós com cores semânticas distintas para indicar eventos passados (concluídos), atual (em progresso) e futuros.',
    commonPitfall: 'Colocar textos longos e densos demais dentro de cada nó da timeline sem opção de expandir.',
    mnemonic: 'Pense nos "Postes de Iluminação ao longo da avenida": a fiação conecta cada ponto em uma sequência lógica.',
    htmlSnippet: `<div class="ui-timeline">
  <div class="ui-timeline-item is-done">
    <div class="ui-timeline-node">✓</div>
    <div class="ui-timeline-content">
      <span class="ui-timeline-date">Fase 1</span>
      <h4>Planejamento & UX</h4>
    </div>
  </div>
  <div class="ui-timeline-item is-current">
    <div class="ui-timeline-node">●</div>
    <div class="ui-timeline-content">
      <span class="ui-timeline-date">Fase 2 (Atual)</span>
      <h4>Desenvolvimento Front-End</h4>
    </div>
  </div>
</div>`,
    cssSnippet: `.ui-timeline {
  position: relative;
  padding-left: 2rem;
}
.ui-timeline::before {
  content: "";
  position: absolute;
  left: 11px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: var(--border-medium);
}
.ui-timeline-node {
  position: absolute;
  left: -2rem;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--brand-primary);
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div class="ui-timeline-box" style="width: 100%; max-width: 320px;">
          <div class="tech-timeline">
            <div class="tech-timeline-item is-completed">
              <div class="tech-timeline-pin">✓</div>
              <div class="tech-timeline-body">
                <span class="tech-timeline-time">Passo 1</span>
                <strong>Arquitetura & Wireframes</strong>
                <p>Estrutura semântica e levantamento de componentes.</p>
              </div>
            </div>
            <div class="tech-timeline-item is-active">
              <div class="tech-timeline-pin">
                <span class="tech-timeline-pulse"></span>
              </div>
              <div class="tech-timeline-body">
                <span class="tech-timeline-time" style="color: var(--brand-primary);">Passo 2 (Em andamento)</span>
                <strong>Codificação em TypeScript</strong>
                <p>Tipagem estrita e testes interativos.</p>
              </div>
            </div>
            <div class="tech-timeline-item">
              <div class="tech-timeline-pin">3</div>
              <div class="tech-timeline-body">
                <span class="tech-timeline-time">Passo 3</span>
                <strong>Publicação & Métricas</strong>
                <p>Otimização de performance e deploy contínuo.</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  },

  // 2. HERO SECTION (Parte do Site)
  {
    id: 'hero-section',
    name: 'Hero Section (Área de Destaque Principal)',
    ptName: 'Primeira Dobra / Vitrine de Entrada',
    category: 'structure',
    categoryLabel: 'Parte que Compõe o Site',
    concept: 'A primeira seção visual que o usuário vê ao carregar o site ("above the fold"), contendo a proposta de valor central.',
    purpose: 'Causar forte impacto visual imediato, reter o visitante nos primeiros 5 segundos e incentivar o primeiro clique.',
    goodPractice: 'Contenha: 1 Headline irresistível, 1 Sub-headline explicativa, 1 ou 2 botões de CTA claros e um elemento visual de suporte.',
    commonPitfall: 'Poluir a Hero com múltiplos títulos concorrentes, carrosséis automáticos vertiginosos ou textos minúsculos.',
    mnemonic: 'Hero é a "Capa da Revista": vende o assunto principal e faz você querer abrir as próximas páginas.',
    htmlSnippet: `<section class="hero-section">
  <span class="hero-badge">✨ Versão 2.0</span>
  <h1 class="hero-title">Aprenda Front-End na Prática</h1>
  <p class="hero-desc">Componentes nativos, acessíveis e tipados com TypeScript.</p>
  <div class="hero-cta-group">
    <button class="ui-btn ui-btn-primary">Começar Agora</button>
    <button class="ui-btn ui-btn-secondary">Documentação</button>
  </div>
</section>`,
    cssSnippet: `.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 1.5rem;
  background: radial-gradient(circle at top, rgba(99,102,241,0.15), transparent 70%);
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div class="mini-hero-preview">
          <div class="mini-hero-badge">🚀 Novidade 2026</div>
          <div class="mini-hero-headline">Domine Interfaces Modernas</div>
          <div class="mini-hero-sub">Biblioteca viva de componentes sem dependências pesadas.</div>
          <div class="mini-hero-actions">
            <button class="ui-btn ui-btn-primary" style="padding: 0.25rem 0.6rem; font-size: 0.75rem;">Testar Grátis</button>
            <button class="ui-btn ui-btn-secondary" style="padding: 0.25rem 0.6rem; font-size: 0.75rem;">Ver Código</button>
          </div>
        </div>
      `;
    }
  },

  // 3. HEADER & STICKY NAVBAR (Parte do Site)
  {
    id: 'header-navbar',
    name: 'Header & Sticky Navbar (Cabeçalho Global)',
    ptName: 'Barra Superior Fixa com Navegação e Ações',
    category: 'structure',
    categoryLabel: 'Parte que Compõe o Site',
    concept: 'Faixa superior persistente que abriga a identidade visual da marca, links de navegação principais, busca e perfil/CTA.',
    purpose: 'Garantir que o usuário nunca se sinta perdido e tenha acesso imediato aos menus principais em qualquer altura da página.',
    goodPractice: 'Utilize `position: sticky; top: 0; backdrop-filter: blur(12px)` para uma sobreposição suave com o conteúdo rolável.',
    commonPitfall: 'Criar um cabeçalho alto demais que ocupe 25% da tela em dispositivos móveis ou notebooks pequenos.',
    mnemonic: 'Header é o "Painel do Carro": sempre visível no horizonte com os velocímetros e comandos à mão.',
    htmlSnippet: `<header class="sticky-navbar">
  <div class="navbar-logo">Logo</div>
  <nav class="navbar-links">
    <a href="#home">Home</a>
    <a href="#cursos">Cursos</a>
    <a href="#blog">Blog</a>
  </nav>
  <button class="ui-btn ui-btn-primary">Entrar</button>
</header>`,
    cssSnippet: `.sticky-navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
  background: rgba(17, 24, 39, 0.85);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div class="mini-sticky-scroll-demo">
          <div class="mini-navbar-bar">
            <div style="font-weight: 800; font-size: 0.75rem; color: var(--brand-primary);">AppLogo</div>
            <div style="display: flex; gap: 0.5rem; font-size: 0.7rem; color: var(--text-secondary);">
              <span>Home</span>
              <span>Docs</span>
              <span>Blog</span>
            </div>
            <span class="ui-badge" style="font-size: 0.65rem; padding: 0.1rem 0.35rem;">Sticky</span>
          </div>
          <div class="mini-navbar-content">
            <p>Role este bloco interno para ver a barra fixa com efeito blur sobre o texto que desliza.</p>
            <p>Seção 1: Arquitetura semântica</p>
            <p>Seção 2: CSS Custom Properties</p>
            <p>Seção 3: Layout responsivo</p>
          </div>
        </div>
      `;
    }
  },

  // 4. BENTO GRID (Técnica de UI/Layout)
  {
    id: 'bento-grid',
    name: 'Bento Grid (Grade Assimétrica Modular)',
    ptName: 'Grade Estilo Bento Box Japonesa',
    category: 'techniques',
    categoryLabel: 'Técnica de UI/Layout',
    concept: 'Padrão de layout inspirado em marmitas japonesas (Bento Box), onde cartões com tamanhos e proporções distintas se encaixam harmoniosamente.',
    purpose: 'Exibir funcionalidades de produtos modernos (popularizado pela Apple, Linear e Stripe) com ritmo visual rico e dinâmico.',
    goodPractice: 'Destaque o diferencial principal do produto no card maior (que ocupa 2 colunas ou 2 linhas).',
    commonPitfall: 'Criar assimetrias caóticas sem manter alinhamento das calhas de espaçamento (gap uniforme).',
    mnemonic: 'Bento Grid é como a "Marmita Japonesa": cada compartimento tem um tamanho certo para o prato correspondente.',
    htmlSnippet: `<div class="bento-grid">
  <div class="bento-card bento-col-2">Recurso Principal (Destaque)</div>
  <div class="bento-card">Mini Métrica</div>
  <div class="bento-card">Gráfico</div>
  <div class="bento-card bento-col-2">Integrações</div>
</div>`,
    cssSnippet: `.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.bento-col-2 {
  grid-column: span 2;
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div class="bento-mini-grid">
          <div class="bento-mini-card bento-span-2" style="background: linear-gradient(135deg, var(--bg-surface-elevated), rgba(99,102,241,0.2));">
            <div style="font-weight: 700; font-size: 0.75rem;">⚡ Performance 100/100</div>
            <div style="font-size: 0.68rem; color: var(--text-secondary);">Core Web Vitals nativos e otimizados</div>
          </div>
          <div class="bento-mini-card" style="background: var(--bg-surface-elevated);">
            <div style="font-size: 0.7rem; font-weight: 700; color: #10b981;">99.9%</div>
            <div style="font-size: 0.65rem; color: var(--text-muted);">Uptime</div>
          </div>
          <div class="bento-mini-card" style="background: var(--bg-surface-elevated);">
            <div style="font-size: 0.7rem; font-weight: 700; color: var(--brand-primary);">TypeScript</div>
            <div style="font-size: 0.65rem; color: var(--text-muted);">Strict Mode</div>
          </div>
          <div class="bento-mini-card bento-span-2" style="background: var(--bg-surface-elevated);">
            <div style="font-size: 0.75rem; font-weight: 700;">🎨 CSS Moderno & SVG</div>
            <div style="font-size: 0.68rem; color: var(--text-secondary);">Animações fluidas a 60fps</div>
          </div>
        </div>
      `;
    }
  },

  // 5. GLASSMORPHISM (Técnica de UI/Layout)
  {
    id: 'glassmorphism',
    name: 'Glassmorphism (Efeito Vidro Fosco)',
    ptName: 'Translúcido com Desfoque de Fundo',
    category: 'techniques',
    categoryLabel: 'Técnica de UI/Layout',
    concept: 'Estilo visual caracterizado por fundos translúcidos com desfoque (`backdrop-filter`), borda sutil iluminada e sensação de camadas físicas.',
    purpose: 'Criar sensação de profundidade, sofisticação e hierarquia visual em cartões flutuantes, modais e barras de ferramentas.',
    goodPractice: 'Sempre combine fundo translúcido (`rgba(..., 0.2)`), desfoque (`blur(12px)`) e uma borda fina clara (`border: 1px solid rgba(255,255,255,0.15)`).',
    commonPitfall: 'Ignorar o contraste do texto: se o fundo atrás for claro, o texto branco fica ilegível.',
    mnemonic: 'Pense em um "Vidro de Box com Vapor de Água": você enxerga as cores borradas do outro lado, mas o foco fica na superfície.',
    htmlSnippet: `<div class="glass-card">
  <h3>Cartão Translúcido</h3>
  <p>Texto com alto contraste sobre o desfoque.</p>
</div>`,
    cssSnippet: `.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div class="glass-preview-stage">
          <div class="glass-circle-bg-1"></div>
          <div class="glass-circle-bg-2"></div>
          <div class="glass-card-element">
            <div style="font-weight: 700; font-size: 0.8125rem;">Vidro Fosco Real</div>
            <div style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 2px;">
              backdrop-filter: blur(12px)
            </div>
            <span class="ui-badge" style="margin-top: 6px; font-size: 0.65rem;">Camada Z-Index</span>
          </div>
        </div>
      `;
    }
  },

  // 6. PRICING TABLE (Parte do Site)
  {
    id: 'pricing-table',
    name: 'Pricing Table (Tabela de Preços / Planos)',
    ptName: 'Matriz Comparativa de Monetização',
    category: 'structure',
    categoryLabel: 'Parte que Compõe o Site',
    concept: 'Módulo estruturado que compara opções de contratação ou assinaturas com valores, lista de benefícios e botão de ação para checkout.',
    purpose: 'Converter visitantes em clientes pagantes com clareza nos preços e redução de atrito decisório.',
    goodPractice: 'Destaque o plano recomendado com borda colorida, badge "Mais Popular" ou elevação visual suave.',
    commonPitfall: 'Esconder custos extras ou limites de uso; a transparência reduz taxas de cancelamento.',
    mnemonic: 'Pricing Table é o "Cardápio do Restaurante": cada combo tem seus itens inclusos e o valor final destacado.',
    htmlSnippet: `<div class="pricing-card is-featured">
  <span class="pricing-badge">Mais Popular</span>
  <h3>Plano Pro</h3>
  <div class="pricing-price">R$ 49<span>/mês</span></div>
  <ul class="pricing-features">
    <li>✓ Acesso Ilimitado</li>
    <li>✓ Suporte Prioritário</li>
  </ul>
  <button class="ui-btn ui-btn-primary">Assinar Agora</button>
</div>`,
    cssSnippet: `.pricing-card.is-featured {
  border: 2px solid var(--brand-primary);
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.25);
  transform: scale(1.03);
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div style="width: 100%; display: flex; gap: 0.75rem; align-items: center;">
          <div class="mini-pricing-col">
            <div style="font-weight: 600; font-size: 0.75rem;">Iniciante</div>
            <div style="font-size: 1rem; font-weight: 800;">Grátis</div>
            <div style="font-size: 0.68rem; color: var(--text-muted); margin-bottom: 0.5rem;">Para sempre</div>
            <button class="ui-btn ui-btn-secondary" style="width: 100%; font-size: 0.7rem; padding: 0.25rem;">Começar</button>
          </div>
          <div class="mini-pricing-col is-pro" style="border: 2px solid var(--brand-primary); background: var(--bg-surface-elevated);">
            <span class="ui-badge badge-danger" style="position: absolute; top: -8px; right: 8px; font-size: 0.6rem; padding: 0.1rem 0.3rem;">Destaque</span>
            <div style="font-weight: 700; font-size: 0.75rem; color: var(--brand-primary);">Pro</div>
            <div style="font-size: 1.1rem; font-weight: 800;">R$ 29<span style="font-size: 0.65rem; color: var(--text-muted);">/m</span></div>
            <div style="font-size: 0.68rem; color: var(--text-secondary); margin-bottom: 0.5rem;">Tudo ilimitado</div>
            <button class="ui-btn ui-btn-primary" style="width: 100%; font-size: 0.7rem; padding: 0.25rem;">Assinar</button>
          </div>
        </div>
      `;
    }
  },

  // 7. INFINITE MARQUEE (Técnica de UI/Layout)
  {
    id: 'infinite-marquee',
    name: 'Infinite Marquee (Letreiro / Faixa Contínua em Loop)',
    ptName: 'Mural Deslizante Infinito de Logos ou Textos',
    category: 'techniques',
    categoryLabel: 'Técnica de UI/Layout',
    concept: 'Faixa horizontal animada que rola continuamente sem interrupção para expor logos de parceiros, marcas ou depoimentos.',
    purpose: 'Fornecer autoridade e validação social imediata de forma elegante sem exigir cliques do usuário.',
    goodPractice: 'Pause a animação ao passar o mouse (`:hover { animation-play-state: paused; }`) para permitir inspeção.',
    commonPitfall: 'Velocidade rápida demais que cause náusea visual ou impeça a identificação dos logos.',
    mnemonic: 'Pense no "Letreiro de Notícias da Bolsa de Valores": o texto corre continuamente da direita para a esquerda.',
    htmlSnippet: `<div class="marquee-wrapper">
  <div class="marquee-track">
    <span>TypeScript</span>
    <span>React</span>
    <span>Vue</span>
    <span>Svelte</span>
    <span>HTML5</span>
  </div>
</div>`,
    cssSnippet: `@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee-track {
  display: flex;
  animation: marquee 15s linear infinite;
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div class="mini-marquee-box">
          <div class="mini-marquee-track">
            <span class="marquee-item">TypeScript</span>
            <span class="marquee-item">CSS Grid</span>
            <span class="marquee-item">HTML5</span>
            <span class="marquee-item">SVG</span>
            <span class="marquee-item">Vite</span>
            <span class="marquee-item">TypeScript</span>
            <span class="marquee-item">CSS Grid</span>
            <span class="marquee-item">HTML5</span>
            <span class="marquee-item">SVG</span>
            <span class="marquee-item">Vite</span>
          </div>
        </div>
      `;
    }
  },

  // 8. TESTIMONIALS & SOCIAL PROOF (Parte do Site)
  {
    id: 'testimonials-section',
    name: 'Testimonials & Social Proof (Depoimentos e Prova Social)',
    ptName: 'Citações de Clientes e Avaliações Reais',
    category: 'structure',
    categoryLabel: 'Parte que Compõe o Site',
    concept: 'Bloco dedicado a depoimentos autênticos, notas de avaliação (`★★★★★`) e cases de sucesso de usuários reais.',
    purpose: 'Romper a desconfiança do visitante através da validação de terceiros (o princípio da Prova Social).',
    goodPractice: 'Inclua sempre a foto (avatar), nome real, cargo/empresa e um trecho focado no benefício atingido.',
    commonPitfall: 'Inventar depoimentos genéricos do tipo "Muito bom!" sem foto ou credenciais verificáveis.',
    mnemonic: 'Testimonial é a "Recomendação do Amigo": tem muito mais peso que a propaganda do próprio vendedor.',
    htmlSnippet: `<div class="testimonial-card">
  <div class="testimonial-stars">★★★★★</div>
  <blockquote class="testimonial-quote">"O melhor guia de front-end que já utilizei!"</blockquote>
  <div class="testimonial-author">
    <div class="ui-avatar">AL</div>
    <div><strong>Ana Lima</strong><small>Tech Lead</small></div>
  </div>
</div>`,
    cssSnippet: `.testimonial-card {
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div class="mini-testimonial-card">
          <div style="color: #f59e0b; font-size: 0.8rem; margin-bottom: 0.25rem;">★★★★★</div>
          <p style="font-size: 0.75rem; font-style: italic; color: var(--text-primary); margin-bottom: 0.5rem;">
            "A metodologia de memorização com analogias facilitou demais o domínio dos controles de UI."
          </p>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div class="ui-avatar" style="width: 28px; height: 28px; font-size: 0.65rem; background: var(--brand-primary); color: white;">RC</div>
            <div>
              <div style="font-weight: 700; font-size: 0.75rem;">Rodrigo Costa</div>
              <div style="font-size: 0.65rem; color: var(--text-muted);">Front-End Engineer</div>
            </div>
          </div>
        </div>
      `;
    }
  },

  // 9. FAQ SECTION (Parte do Site)
  {
    id: 'faq-section',
    name: 'FAQ Section (Perguntas Frequentes)',
    ptName: 'Central de Dúvidas com Acordeões Sanfonados',
    category: 'structure',
    categoryLabel: 'Parte que Compõe o Site',
    concept: 'Seção organizada por tópicos colapsáveis que responde às dúvidas e objeções mais comuns do usuário.',
    purpose: 'Reduzir tickets de suporte ao cliente e acelerar a decisão de compra ou cadastro.',
    goodPractice: 'Mantenha respostas diretas ao ponto e utilize a tag semântica nativa `<details>` e `<summary>`.',
    commonPitfall: 'Colocar perguntas irrelevantes ou respostas com páginas inteiras de texto.',
    mnemonic: 'FAQ é a "Seção de Dúvidas Rápidas": mata a charada antes do usuário desistir.',
    htmlSnippet: `<section class="faq-section">
  <h2>Perguntas Frequentes</h2>
  <details class="faq-item">
    <summary>O guia é gratuito?</summary>
    <p>Sim, todo o conteúdo é aberto e mantido pela comunidade.</p>
  </details>
</section>`,
    cssSnippet: `details.faq-item {
  border-bottom: 1px solid var(--border-subtle);
  padding: 0.75rem 0;
}
summary {
  cursor: pointer;
  font-weight: 600;
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div style="width: 100%; display: flex; flex-direction: column; gap: 0.4rem;">
          <details class="mini-faq-item" open>
            <summary>Como funciona a memorização ativa?</summary>
            <div class="mini-faq-answer">Usamos mnemônicos visuais e código ao vivo para fixação imediata.</div>
          </details>
          <details class="mini-faq-item">
            <summary>Precisa de framework para os componentes?</summary>
            <div class="mini-faq-answer">Não! Todos os componentes usam HTML semântico, CSS moderno e TypeScript puro.</div>
          </details>
        </div>
      `;
    }
  },

  // 10. CALL TO ACTION (CTA BANNER) (Parte do Site)
  {
    id: 'cta-section',
    name: 'Call to Action / CTA Banner (Chamada para Ação)',
    ptName: 'Bloco de Conversão Final',
    category: 'structure',
    categoryLabel: 'Parte que Compõe o Site',
    concept: 'Seção de alto impacto visual posicionada estrategicamente antes do rodapé para induzir o usuário a realizar a ação principal.',
    purpose: 'Capturar leads, inscrições em newsletters ou encaminhar para download/compra.',
    goodPractice: 'Foque em apenas 1 ação principal (evite dispersar a atenção com múltiplos formulários no mesmo banner).',
    commonPitfall: 'Fazer um CTA com frases genéricas como "Clique aqui" em vez de ações orientadas ao benefício (ex: "Começar a Estudar Grátis").',
    mnemonic: 'CTA é o "Aperto de Mão Final": o momento decisivo de fechar o acordo.',
    htmlSnippet: `<section class="cta-banner">
  <h2>Pronto para acelerar seu aprendizado?</h2>
  <p>Explore nosso repositório e crie interfaces incríveis hoje mesmo.</p>
  <button class="ui-btn ui-btn-primary">Criar Conta Grátis</button>
</section>`,
    cssSnippet: `.cta-banner {
  text-align: center;
  padding: 3rem 1.5rem;
  background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2));
  border-radius: 1rem;
  border: 1px solid rgba(99,102,241,0.3);
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div class="mini-cta-box">
          <div style="font-weight: 800; font-size: 0.8125rem;">Comece seu Guia Agora</div>
          <div style="font-size: 0.68rem; color: var(--text-secondary); margin: 2px 0 6px;">
            Junte-se a milhares de desenvolvedores no aprendizado ativo.
          </div>
          <div style="display: flex; gap: 0.35rem; justify-content: center;">
            <input type="email" placeholder="seu@email.com" class="ui-input" style="max-width: 150px; font-size: 0.7rem; padding: 0.25rem 0.5rem;">
            <button class="ui-btn ui-btn-primary" style="font-size: 0.7rem; padding: 0.25rem 0.6rem;">Cadastrar</button>
          </div>
        </div>
      `;
    }
  },

  // 11. FOOTER (Parte do Site)
  {
    id: 'site-footer',
    name: 'Footer (Rodapé Completo)',
    ptName: 'Encerramento com Mapa do Site e Links Legais',
    category: 'structure',
    categoryLabel: 'Parte que Compõe o Site',
    concept: 'A última seção da página contendo links secundários, termos legais, mapa do site, canais de contato e copyright.',
    purpose: 'Oferecer rede de segurança para o usuário que rolou até o fim sem encontrar o que procurava.',
    goodPractice: 'Organize os links em colunas temáticas (Produto, Recursos, Empresa, Legal).',
    commonPitfall: 'Esquecer de atualizar o ano do copyright ou deixar links quebrados.',
    mnemonic: 'Footer é a "Contra-Capa do Livro": ficha catalográfica, índice remissivo e dados da editora.',
    htmlSnippet: `<footer class="site-footer">
  <div class="footer-columns">
    <div><h4>Produto</h4><ul><li><a href="#">Recursos</a></li></ul></div>
    <div><h4>Empresa</h4><ul><li><a href="#">Sobre nós</a></li></ul></div>
  </div>
  <div class="footer-bottom">&copy; 2026 Guia do Programador.</div>
</footer>`,
    cssSnippet: `.site-footer {
  background: var(--bg-surface);
  border-top: 1px solid var(--border-subtle);
  padding: 3rem 1.5rem;
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div class="mini-footer-preview">
          <div class="mini-footer-cols">
            <div>
              <strong>Guia Dev</strong>
              <div style="color: var(--text-muted);">Front-End & UI</div>
            </div>
            <div>
              <strong>Conteúdo</strong>
              <div style="color: var(--text-muted);">Controles</div>
              <div style="color: var(--text-muted);">Timelines</div>
            </div>
            <div>
              <strong>Legal</strong>
              <div style="color: var(--text-muted);">Privacidade</div>
              <div style="color: var(--text-muted);">Termos</div>
            </div>
          </div>
          <div style="border-top: 1px solid var(--border-subtle); margin-top: 6px; padding-top: 4px; font-size: 0.65rem; color: var(--text-muted); text-align: center;">
            &copy; 2026 Guia do Programador • Código Aberto
          </div>
        </div>
      `;
    }
  },

  // 12. STATS COUNTER / KPI (Técnica de UI/Layout)
  {
    id: 'stats-counter',
    name: 'Stats Counter / KPIs (Métricas em Destaque)',
    ptName: 'Números Gigantes de Impacto',
    category: 'techniques',
    categoryLabel: 'Técnica de UI/Layout',
    concept: 'Grade de estatísticas numéricas em tipografia grande acompanhada de legendas explicativas para comprovação rápida de autoridade.',
    purpose: 'Comprovar escala, desempenho ou satisfação (ex: "10k+ usuários", "99.9% uptime", "< 20ms de latência").',
    goodPractice: 'Utilize fontes legíveis em peso Bold/Extra-Bold e sufixos intuitivos (ex: `k`, `M`, `%`, `+`).',
    commonPitfall: 'Colocar estatísticas vagas que não transmitem valor real ("Mais de 1000 horas trabalhadas").',
    mnemonic: 'Stats são o "Placar do Jogo": mostram o resultado em números grandes e indiscutíveis.',
    htmlSnippet: `<div class="stats-grid">
  <div class="stat-item">
    <span class="stat-num">99.9%</span>
    <span class="stat-label">Disponibilidade</span>
  </div>
  <div class="stat-item">
    <span class="stat-num">50ms</span>
    <span class="stat-label">Latência Média</span>
  </div>
</div>`,
    cssSnippet: `.stat-num {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--brand-primary);
  display: block;
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div style="display: flex; justify-content: space-around; width: 100%;">
          <div style="text-align: center;">
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--brand-primary);">10k+</div>
            <div style="font-size: 0.65rem; color: var(--text-secondary);">Devs Ativos</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 1.25rem; font-weight: 800; color: #10b981;">100%</div>
            <div style="font-size: 0.65rem; color: var(--text-secondary);">TypeScript</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 1.25rem; font-weight: 800; color: #f59e0b;">0 deps</div>
            <div style="font-size: 0.65rem; color: var(--text-secondary);">CSS Nativo</div>
          </div>
        </div>
      `;
    }
  }
];
