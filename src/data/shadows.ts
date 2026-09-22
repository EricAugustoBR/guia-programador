export type ShadowCategory = 'all' | 'fundamentals' | 'realism' | 'lighting';

export interface ShadowCategoryInfo {
  readonly id: ShadowCategory;
  readonly label: string;
  readonly iconSvg: string;
}

export interface ShadowItem {
  readonly id: string;
  readonly name: string;
  readonly ptName: string;
  readonly category: Exclude<ShadowCategory, 'all'>;
  readonly categoryLabel: string;
  readonly concept: string;
  readonly purpose: string;
  readonly goodPractice: string;
  readonly commonPitfall: string;
  readonly mnemonic: string;
  readonly htmlSnippet: string;
  readonly cssSnippet: string;
  readonly renderInteractive: (container: HTMLElement) => void;
}

export interface ShadowPreset {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly cssValue: string;
  readonly isInset: boolean;
  readonly x: number;
  readonly y: number;
  readonly blur: number;
  readonly spread: number;
  readonly color: string;
  readonly opacity: number;
}

export const SHADOW_CATEGORIES: readonly ShadowCategoryInfo[] = [
  {
    id: 'all',
    label: 'Todas as Técnicas',
    iconSvg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/></svg>`
  },
  {
    id: 'fundamentals',
    label: 'Fundamentos & Parâmetros',
    iconSvg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`
  },
  {
    id: 'realism',
    label: 'Profundidade & Camadas',
    iconSvg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`
  },
  {
    id: 'lighting',
    label: 'Efeitos de Luz & Estilos',
    iconSvg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`
  }
];

export const SHADOW_PRESETS: readonly ShadowPreset[] = [
  {
    id: 'clean-card',
    name: 'Card Clean (Sutil)',
    description: 'Sombra suave de contato para cards em repouso.',
    cssValue: '0 4px 12px rgba(0, 0, 0, 0.15)',
    isInset: false,
    x: 0,
    y: 4,
    blur: 12,
    spread: 0,
    color: '#000000',
    opacity: 15
  },
  {
    id: 'hover-lift',
    name: 'Hover Elevado (Flutuação)',
    description: 'Sensação de altura no eixo Z para botões e cards ativos.',
    cssValue: '0 16px 32px -4px rgba(0, 0, 0, 0.35)',
    isInset: false,
    x: 0,
    y: 16,
    blur: 32,
    spread: -4,
    color: '#000000',
    opacity: 35
  },
  {
    id: 'apple-rim',
    name: 'Borda Chanfrada (Rim Light)',
    description: 'Borda iluminada de luz especular superior no estilo Apple/Linear.',
    cssValue: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.2), 0 8px 24px rgba(0, 0, 0, 0.4)',
    isInset: false,
    x: 0,
    y: 8,
    blur: 24,
    spread: 0,
    color: '#000000',
    opacity: 40
  },
  {
    id: 'inset-pressed',
    name: 'Rebaixo Côncavo (Inset)',
    description: 'Sensação de botão pressionado ou campo afundado na superfície.',
    cssValue: 'inset 0 4px 8px rgba(0, 0, 0, 0.45)',
    isInset: true,
    x: 0,
    y: 4,
    blur: 8,
    spread: 0,
    color: '#000000',
    opacity: 45
  },
  {
    id: 'brand-glow',
    name: 'Glow Bioluminescente',
    description: 'Luz emitida a partir da cor de marca para foco e status.',
    cssValue: '0 0 25px rgba(99, 102, 241, 0.65)',
    isInset: false,
    x: 0,
    y: 0,
    blur: 25,
    spread: 4,
    color: '#6366f1',
    opacity: 65
  },
  {
    id: 'neumorphic',
    name: 'Soft UI Neumórfico',
    description: 'Esculpido com fonte de luz dupla: clara no topo-esq e escura na base.',
    cssValue: '-6px -6px 14px rgba(255, 255, 255, 0.07), 6px 6px 14px rgba(0, 0, 0, 0.5)',
    isInset: false,
    x: 6,
    y: 6,
    blur: 14,
    spread: 0,
    color: '#000000',
    opacity: 50
  }
];

export const SHADOWS_DATA: readonly ShadowItem[] = [
  // 1. ANATOMIA DOS 5 VALORES DO BOX-SHADOW (Base direta do vídeo #25)
  {
    id: 'five-values',
    name: 'Anatomia dos 5 Valores do Box-Shadow',
    ptName: 'X-Offset, Y-Offset, Blur, Spread e Cor',
    category: 'fundamentals',
    categoryLabel: 'Fundamentos',
    concept: 'A propriedade box-shadow projeta sombras externas ou internas recebendo: [horizontal] [vertical] [desfoque] [expansão] [cor].',
    purpose: 'Criar desde sombras pontuais até difusões amplas com total controle de proporção e intensidade.',
    goodPractice: 'Use sempre cores no formato RGBA, HSLA ou com opacidade para evitar manchas duras e permitir que o fundo transpareça.',
    commonPitfall: 'Usar nomes de cores sólidas como #000 ou black puro com blur baixo, gerando um bloco escuro que parece um erro de renderização.',
    mnemonic: 'Pense na regra X-Y-B-S-C: "Xuxa e Yuri Buscam Sombras Claras" (Horizontal, Vertical, Blur, Spread, Cor).',
    htmlSnippet: `<div class="shadow-box-demo">
  <p>Objeto Iluminado</p>
</div>`,
    cssSnippet: `/* box-shadow: [x-offset] [y-offset] [blur-radius] [spread-radius] [color]; */
.shadow-box-demo {
  background: var(--bg-surface-elevated);
  border-radius: 12px;
  /* Projeta 8px para a direita, 12px para baixo, 20px de desfoque e 2px de expansão */
  box-shadow: 8px 12px 20px 2px rgba(0, 0, 0, 0.35);
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div class="stage-shadow-interactive" style="display: flex; flex-direction: column; align-items: center; gap: 1rem; width: 100%;">
          <div class="interactive-sample-box" id="sample-five-values" style="
            width: 140px;
            height: 90px;
            background: var(--bg-surface-elevated);
            border: 1px solid var(--border-medium);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8125rem;
            font-weight: 600;
            color: var(--text-primary);
            box-shadow: 8px 12px 20px 0 rgba(0, 0, 0, 0.4);
            transition: all 0.2s ease;
          ">
            5 Valores
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center; font-size: 0.75rem;">
            <button class="stage-btn-pill" data-mode="sharp">Nítida (Blur 0)</button>
            <button class="stage-btn-pill is-active" data-mode="soft">Suave (Blur 20)</button>
            <button class="stage-btn-pill" data-mode="spread">Expandida (Spread 8)</button>
          </div>
        </div>
      `;

      const sample = container.querySelector('#sample-five-values') as HTMLElement;
      const buttons = container.querySelectorAll('.stage-btn-pill');

      buttons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          buttons.forEach((b) => b.classList.remove('is-active'));
          const target = e.currentTarget as HTMLElement;
          target.classList.add('is-active');
          const mode = target.dataset.mode;

          if (mode === 'sharp') {
            sample.style.boxShadow = '8px 8px 0px 0px rgba(0, 0, 0, 0.4)';
          } else if (mode === 'spread') {
            sample.style.boxShadow = '4px 8px 15px 8px rgba(0, 0, 0, 0.3)';
          } else {
            sample.style.boxShadow = '8px 12px 20px 0px rgba(0, 0, 0, 0.4)';
          }
        });
      });
    }
  },

  // 2. INSET SHADOWS (Rebaixo / Pressionado / Cavidade)
  {
    id: 'inset-shadows',
    name: 'Sombras Internas (Palavra-chave Inset)',
    ptName: 'Simulação de Rebaixo Côncavo e Botão Pressionado',
    category: 'fundamentals',
    categoryLabel: 'Fundamentos',
    concept: 'Ao prefixar a regra com "inset", a sombra é desenhada para o lado de dentro da borda, simulando corte em relevo ou afundamento na tela.',
    purpose: 'Inputs de texto digitáveis, botões em estado ativo/clicado, cavidades de sliders, switches e contêineres de scroll.',
    goodPractice: 'Combine uma leve sombra inset no topo de um botão quando ele for clicado (:active) para transmitir retorno tátil imediato.',
    commonPitfall: 'Aplicar inset muito forte em caixas com texto escuro, prejudicando o contraste e a legibilidade nas bordas interiores.',
    mnemonic: '"IN-set joga a sombra para DENTRO (INside)": transforma elevações salientes em poços escavados.',
    htmlSnippet: `<button class="btn-tactile">Clique e segure</button>
<div class="input-well">Campo Afundado</div>`,
    cssSnippet: `.btn-tactile {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-medium);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.15s ease;
}

/* Quando pressionado, inverte para inset */
.btn-tactile:active {
  transform: translateY(2px);
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.4);
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; width: 100%;">
          <button class="stage-tactile-btn" id="interactive-inset-btn" style="
            padding: 0.8rem 1.6rem;
            background: var(--bg-surface-elevated);
            color: var(--text-primary);
            border: 1px solid var(--border-medium);
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.875rem;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
            transition: all 0.12s ease;
            user-select: none;
          ">
            Pressione Aqui (Simular Clique)
          </button>
          <span style="font-size: 0.75rem; color: var(--text-muted);" id="inset-state-label">
            Estado atual: <strong>Elevado (Outset)</strong>
          </span>
        </div>
      `;

      const btn = container.querySelector('#interactive-inset-btn') as HTMLElement;
      const label = container.querySelector('#inset-state-label') as HTMLElement;

      let isPressed = false;
      const applyState = () => {
        if (isPressed) {
          btn.style.boxShadow = 'inset 0 4px 8px rgba(0, 0, 0, 0.55)';
          btn.style.transform = 'translateY(2px)';
          btn.style.borderColor = 'var(--brand-primary)';
          label.innerHTML = 'Estado atual: <strong style="color: var(--brand-primary);">Pressionado (Inset)</strong>';
        } else {
          btn.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.25)';
          btn.style.transform = 'translateY(0)';
          btn.style.borderColor = 'var(--border-medium)';
          label.innerHTML = 'Estado atual: <strong>Elevado (Outset)</strong>';
        }
      };

      btn.addEventListener('mousedown', () => {
        isPressed = true;
        applyState();
      });
      window.addEventListener('mouseup', () => {
        if (isPressed) {
          isPressed = false;
          applyState();
        }
      });
    }
  },

  // 3. MULTI-LAYER BOX-SHADOW (Camadas Múltiplas e Suavidade Realista)
  {
    id: 'multi-layer',
    name: 'Sombras em Múltiplas Camadas',
    ptName: 'Oclusão de Contato + Penumbra Ambiente',
    category: 'realism',
    categoryLabel: 'Profundidade & Camadas',
    concept: 'Na física óptica, objetos projetam múltiplas sombras simultâneas: uma oclusão densa rente à base e uma penumbra ampla e suave iluminada pelo céu.',
    purpose: 'Eliminar sombras toscas e conferir estética de alta gama (estilo Stripe, Apple e Vercel) a cards e janelas modais.',
    goodPractice: 'Declare de 2 a 4 camadas separadas por vírgula no box-shadow, dobrando o desfoque e reduzindo a opacidade a cada nível.',
    commonPitfall: 'Tentar simular profundidade alta aumentando apenas o blur de uma única sombra, criando uma auréola embaçada e artificial.',
    mnemonic: '"Camada de Contato abraça a base; Camada de Ambiente pinta o ar": 2 sombras sempre batem 1.',
    htmlSnippet: `<div class="card-multi-layer">
  <h4>Card com Sombras Compostas</h4>
  <p>Transição natural e orgânica de luz.</p>
</div>`,
    cssSnippet: `/* Camada 1: Oclusão rente e nítida */
/* Camada 2: Penumbra intermediária */
/* Camada 3: Difusão suave da luz ambiente */
.card-multi-layer {
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.08),
    0 4px 8px rgba(0, 0, 0, 0.12),
    0 16px 32px rgba(0, 0, 0, 0.16);
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div style="display: flex; gap: 1rem; width: 100%; justify-content: center; flex-wrap: wrap;">
          <div style="
            flex: 1;
            min-width: 130px;
            max-width: 150px;
            padding: 1rem;
            background: var(--bg-surface-elevated);
            border-radius: 10px;
            text-align: center;
            font-size: 0.75rem;
            box-shadow: 0 16px 20px rgba(0, 0, 0, 0.45);
          ">
            <strong style="display: block; margin-bottom: 0.25rem; color: #ef4444;">1 Camada</strong>
            <span style="color: var(--text-muted);">Borda opaca artificial</span>
          </div>

          <div style="
            flex: 1;
            min-width: 130px;
            max-width: 150px;
            padding: 1rem;
            background: var(--bg-surface-elevated);
            border-radius: 10px;
            text-align: center;
            font-size: 0.75rem;
            box-shadow:
              0 1px 2px rgba(0, 0, 0, 0.2),
              0 4px 10px rgba(0, 0, 0, 0.25),
              0 18px 36px rgba(0, 0, 0, 0.35);
          ">
            <strong style="display: block; margin-bottom: 0.25rem; color: #10b981;">3 Camadas</strong>
            <span style="color: var(--text-muted);">Difusão hiper-realista</span>
          </div>
        </div>
      `;
    }
  },

  // 4. ELEVAÇÃO & HOVER LIFT (Simulação do Eixo Z)
  {
    id: 'elevation-lift',
    name: 'Elevação & Efeito Hover Lift',
    ptName: 'Simulação de Eixo Z com Luz Fixa Superior',
    category: 'realism',
    categoryLabel: 'Profundidade & Camadas',
    concept: 'Ao combinar transform: translateY(-Npx) com o aumento do desfoque (blur) e deslocamento vertical (Y), cria-se a ilusão óptica de aproximação do usuário.',
    purpose: 'Sinalizar interatividade tátil em cards clicáveis, botões primários e itens de listagem.',
    goodPractice: 'Utilize transições com cubic-bezier suave (ex: cubic-bezier(0.2, 0.8, 0.2, 1)) para que a subida e descida pareçam ter massa física.',
    commonPitfall: 'Subir o card sem aumentar a sombra correspondente, quebrando a consistência física da fonte de luz.',
    mnemonic: '"Mais perto dos olhos = Sombra mais distante e mais difusa na mesa".',
    htmlSnippet: `<div class="card-hover-lift">
  <span class="badge">Interativo</span>
  <h3>Passe o mouse aqui</h3>
</div>`,
    cssSnippet: `.card-hover-lift {
  transform: translateY(0);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1),
              box-shadow 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.card-hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 30px -6px rgba(0, 0, 0, 0.45);
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%;">
          <div class="stage-hover-card" style="
            width: 180px;
            padding: 1.25rem;
            background: var(--bg-surface-elevated);
            border: 1px solid var(--border-medium);
            border-radius: 12px;
            text-align: center;
            cursor: pointer;
            transform: translateY(0);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
            transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          ">
            <div style="font-size: 1.5rem; margin-bottom: 0.25rem;">🚀</div>
            <div style="font-weight: 700; font-size: 0.875rem; color: var(--text-primary);">Passe o Mouse</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">Efeito Flutuação Z</div>
          </div>
        </div>
      `;

      const card = container.querySelector('.stage-hover-card') as HTMLElement;
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.borderColor = 'var(--brand-primary)';
        card.style.boxShadow = '0 24px 36px -8px rgba(0, 0, 0, 0.5), 0 8px 16px -4px rgba(99, 102, 241, 0.2)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.borderColor = 'var(--border-medium)';
        card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.2)';
      });
    }
  },

  // 5. REGRA DA FONTE DE LUZ GLOBAL (Consistência de Direção)
  {
    id: 'global-light',
    name: 'Regra da Fonte de Luz Global',
    ptName: 'Consistência de Iluminação (Convenção dos 135°)',
    category: 'realism',
    categoryLabel: 'Profundidade & Camadas',
    concept: 'Todas as sombras de uma interface devem compartilhar a mesma fonte imaginária de luz (geralmente vindo do topo ou do topo-esquerdo a ~135°).',
    purpose: 'Manter a coerência espacial do cérebro humano, evitando a sensação de estranhamento cognitivo ou náusea visual.',
    goodPractice: 'Mantenha valores de Y sempre positivos (luz de cima) e valores de X com o mesmo sinal em todos os elementos da página.',
    commonPitfall: 'Fazer um botão com sombra para a direita e o card vizinho com sombra para a esquerda, fingindo haver dois sóis opostos no layout.',
    mnemonic: '"O Sol da interface nunca se divide": a luz vem sempre de cima (+Y para baixo).',
    htmlSnippet: `<div class="scene">
  <div class="light-source">☀️ Fonte de Luz</div>
  <div class="element e1">Item A (+X, +Y)</div>
  <div class="element e2">Item B (+X, +Y)</div>
</div>`,
    cssSnippet: `/* Sistema de design consistente: luz no topo-esquerdo */
:root {
  --shadow-standard: 3px 6px 14px rgba(0, 0, 0, 0.25);
}

.item-a, .item-b, .item-c {
  /* Todos recebem a mesma projeção angular */
  box-shadow: var(--shadow-standard);
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem; width: 100%;">
          <div style="font-size: 0.75rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.4rem;">
            <span>☀️ Luz Global em</span>
            <span id="light-angle-label" style="font-weight: 700; color: var(--color-warning);">135° (Topo-Esquerdo)</span>
          </div>
          <div style="display: flex; gap: 1rem; justify-content: center; width: 100%;">
            <div class="consistent-box" style="
              width: 80px;
              height: 60px;
              background: var(--bg-surface-elevated);
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 0.75rem;
              font-weight: 600;
              box-shadow: 6px 8px 14px rgba(0, 0, 0, 0.35);
              transition: box-shadow 0.3s ease;
            ">Card A</div>
            <div class="consistent-box" style="
              width: 80px;
              height: 60px;
              background: var(--bg-surface-elevated);
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 0.75rem;
              font-weight: 600;
              box-shadow: 6px 8px 14px rgba(0, 0, 0, 0.35);
              transition: box-shadow 0.3s ease;
            ">Card B</div>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="stage-btn-pill is-active" id="btn-light-tl">Topo-Esq</button>
            <button class="stage-btn-pill" id="btn-light-top">Direto Acima</button>
            <button class="stage-btn-pill" id="btn-light-tr">Topo-Dir</button>
          </div>
        </div>
      `;

      const boxes = container.querySelectorAll('.consistent-box') as NodeListOf<HTMLElement>;
      const btnTl = container.querySelector('#btn-light-tl') as HTMLElement;
      const btnTop = container.querySelector('#btn-light-top') as HTMLElement;
      const btnTr = container.querySelector('#btn-light-tr') as HTMLElement;
      const label = container.querySelector('#light-angle-label') as HTMLElement;

      const setDirection = (x: number, y: number, text: string, activeBtn: HTMLElement) => {
        [btnTl, btnTop, btnTr].forEach((b) => b.classList.remove('is-active'));
        activeBtn.classList.add('is-active');
        label.textContent = text;
        boxes.forEach((b) => {
          b.style.boxShadow = `${x}px ${y}px 14px rgba(0, 0, 0, 0.35)`;
        });
      };

      btnTl.addEventListener('click', () => setDirection(6, 8, 'Topo-Esquerdo (Natural)', btnTl));
      btnTop.addEventListener('click', () => setDirection(0, 10, 'Direto de Cima (Zenital)', btnTop));
      btnTr.addEventListener('click', () => setDirection(-6, 8, 'Topo-Direito', btnTr));
    }
  },

  // 6. RIM LIGHT & BORDA ILUMINADA (O Segredo da Apple e Linear)
  {
    id: 'rim-light',
    name: 'Borda Iluminada & Rim Light',
    ptName: 'Reflexo Especular Superior (Inset Highlight)',
    category: 'lighting',
    categoryLabel: 'Efeitos de Luz & Estilos',
    concept: 'Ao aplicar uma sombra interna de 1 pixel no topo da caixa com tom branco semitransparente, simula-se a quina física do vidro ou metal que reflete luz.',
    purpose: 'Conferir acabamento "ultra-premium", nitidez geométrica em temas escuros e profundidade tátil sem usar bordas grossas.',
    goodPractice: 'Use box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.15) combinado com sombra externa regular.',
    commonPitfall: 'Usar branco com opacidade muito alta (> 0.4), transformando o reflexo sutil em uma linha branca grosseira.',
    mnemonic: '"Rim Light é o colar brilhante do cartão escuro": 1px que separa o amador do profissional.',
    htmlSnippet: `<div class="apple-style-card">
  <div class="card-icon">⚡</div>
  <h3>Linear / Apple Specular Finish</h3>
</div>`,
    cssSnippet: `.apple-style-card {
  background: #181b24;
  border-radius: 12px;
  /* Destaque especular no topo + sombra suave embaixo */
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.18),
    0 12px 24px -4px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div style="display: flex; gap: 1rem; width: 100%; justify-content: center; flex-wrap: wrap;">
          <div style="
            flex: 1;
            min-width: 130px;
            max-width: 150px;
            padding: 1.25rem 1rem;
            background: #141a29;
            border-radius: 10px;
            text-align: center;
            font-size: 0.75rem;
            border: 1px solid #243048;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
          ">
            <span style="color: var(--text-muted);">Sem Rim Light</span>
            <div style="margin-top: 0.5rem; font-weight: 600; color: #94a3b8;">Borda Apagada</div>
          </div>

          <div style="
            flex: 1;
            min-width: 130px;
            max-width: 150px;
            padding: 1.25rem 1rem;
            background: #141a29;
            border-radius: 10px;
            text-align: center;
            font-size: 0.75rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow:
              inset 0 1px 0 0 rgba(255, 255, 255, 0.25),
              0 10px 20px rgba(0, 0, 0, 0.5);
          ">
            <span style="color: #6366f1; font-weight: 700;">Com Rim Light ✨</span>
            <div style="margin-top: 0.5rem; font-weight: 600; color: #ffffff;">Quina Refletora</div>
          </div>
        </div>
      `;
    }
  },

  // 7. SOMBRAS COLORIDAS & LUZ REBATIDA (Colored Shadows / Radiosity)
  {
    id: 'colored-shadows',
    name: 'Sombras Coloridas & Luz Rebatida',
    ptName: 'Ambient Bounce Light com a Cor de Marca',
    category: 'lighting',
    categoryLabel: 'Efeitos de Luz & Estilos',
    concept: 'Objetos reais com cores vivas refletem sua própria tonalidade sobre a mesa. No CSS, usa-se a cor do próprio elemento com opacidade na sombra.',
    purpose: 'Botões primários magnéticos, cards de produtos em destaque, tags ativas e efeitos de iluminação holográfica.',
    goodPractice: 'Misture uma sombra preta sutil (para peso) com a sombra colorida expansiva (para brilho atmosférico).',
    commonPitfall: 'Usar cor pura 100% saturada sem desfoque suficiente, gerando a sensação de mancha de tinta em vez de luz emanada.',
    mnemonic: '"Luz viva rebate cor viva": substitua o preto fosco pelo DNA de cor do elemento.',
    htmlSnippet: `<button class="btn-glow-primary">
  Começar Agora
</button>`,
    cssSnippet: `.btn-glow-primary {
  background: #6366f1;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  /* Sombra de oclusão + sombra colorida rebatida */
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.2),
    0 10px 20px -2px rgba(99, 102, 241, 0.45);
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; width: 100%;">
          <div id="sample-colored-btn" style="
            padding: 0.75rem 1.5rem;
            background: #6366f1;
            color: #ffffff;
            font-weight: 700;
            font-size: 0.875rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px -4px rgba(99, 102, 241, 0.55);
            transition: all 0.3s ease;
          ">
            Botão com Luz Rebatida
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="stage-btn-pill is-active" data-color="#6366f1" data-rgba="rgba(99, 102, 241, 0.55)">Índigo</button>
            <button class="stage-btn-pill" data-color="#10b981" data-rgba="rgba(16, 185, 129, 0.55)">Esmeralda</button>
            <button class="stage-btn-pill" data-color="#ec4899" data-rgba="rgba(236, 72, 153, 0.55)">Pink Glow</button>
          </div>
        </div>
      `;

      const sample = container.querySelector('#sample-colored-btn') as HTMLElement;
      const pills = container.querySelectorAll('.stage-btn-pill');

      pills.forEach((p) => {
        p.addEventListener('click', (e) => {
          pills.forEach((btn) => btn.classList.remove('is-active'));
          const target = e.currentTarget as HTMLElement;
          target.classList.add('is-active');
          const color = target.dataset.color || '#6366f1';
          const rgba = target.dataset.rgba || 'rgba(99, 102, 241, 0.55)';
          sample.style.background = color;
          sample.style.boxShadow = `0 10px 25px -4px ${rgba}`;
        });
      });
    }
  },

  // 8. DROP-SHADOW VS BOX-SHADOW (Pegadinha das Formas Vazadas / SVGs)
  {
    id: 'drop-shadow-vs-box-shadow',
    name: 'Drop-Shadow vs Box-Shadow',
    ptName: 'Filtro de Contorno Alfa vs Caixa Retangular',
    category: 'fundamentals',
    categoryLabel: 'Fundamentos',
    concept: 'box-shadow projeta sombra sobre a bounding-box retangular; filter: drop-shadow(...) respeita a transparência alfa real de SVGs e ponteiros de balões.',
    purpose: 'Tooltips com ponta triangular, logos SVG transparentes, badges recortados e imagens PNG sem fundo.',
    goodPractice: 'Utilize filter: drop-shadow() em balões de fala (speech bubbles) para que o triângulo e o corpo compartilhem a mesma sombra unificada.',
    commonPitfall: 'Colocar box-shadow em um container com triângulo em :after; a sombra do retângulo corta de forma bizarra sobre o ponteiro.',
    mnemonic: '"Box-Shadow cuida da CAIXA; Drop-Shadow cuida da SILHUETA".',
    htmlSnippet: `<div class="tooltip-bubble">
  Mensagem do Tooltip
  <div class="triangle-pointer"></div>
</div>`,
    cssSnippet: `/* ERRADO com box-shadow: o triângulo fica sem sombra contínua */
/* CERTO com filter: drop-shadow */
.tooltip-bubble {
  position: relative;
  background: var(--bg-surface-elevated);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  /* O filtro aplica a sombra em todo o contorno visível (corpo + seta) */
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.35));
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div style="display: flex; gap: 1.5rem; justify-content: center; width: 100%; flex-wrap: wrap;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <div style="
              position: relative;
              background: var(--bg-surface-elevated);
              padding: 0.6rem 0.9rem;
              border-radius: 8px;
              font-size: 0.75rem;
              font-weight: 600;
              box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
            ">
              Com Box-Shadow
              <div style="
                position: absolute;
                bottom: -6px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 6px solid var(--bg-surface-elevated);
              "></div>
            </div>
            <span style="font-size: 0.7rem; color: #ef4444;">✕ Ponta fica sem sombra</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <div style="
              position: relative;
              background: var(--bg-surface-elevated);
              padding: 0.6rem 0.9rem;
              border-radius: 8px;
              font-size: 0.75rem;
              font-weight: 600;
              filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.45));
            ">
              Com Drop-Shadow
              <div style="
                position: absolute;
                bottom: -6px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 6px solid var(--bg-surface-elevated);
              "></div>
            </div>
            <span style="font-size: 0.7rem; color: #10b981;">✓ Silhueta perfeita</span>
          </div>
        </div>
      `;
    }
  },

  // 9. NEUMORFISMO SUAVE (Dual-Light Source)
  {
    id: 'neumorphism',
    name: 'Neumorfismo Suave (Dual-Light)',
    ptName: 'Escultura com Duas Fontes Opostas de Luz e Sombra',
    category: 'lighting',
    categoryLabel: 'Efeitos de Luz & Estilos',
    concept: 'Técnica visual em que o elemento parece moldado a partir do mesmo plástico ou material do fundo, combinando uma sombra clara no topo-esq e escura na base-dir.',
    purpose: 'Dashboards futuristas, players de música, controles de smart home e interfaces conceituais.',
    goodPractice: 'Mantenha a cor de fundo do elemento EXATAMENTE igual à cor de fundo da página para que o relevo se forme unicamente pela luz.',
    commonPitfall: 'Usar neumorfismo em botões críticos de acessibilidade sem borda de contraste, violando as regras WCAG para pessoas com baixa visão.',
    mnemonic: '"Luz branca sobe ao norte, sombra escura cai ao sul": a forma emerge do mesmo tecido da tela.',
    htmlSnippet: `<div class="neu-card">
  <div class="neu-icon">📻</div>
  <span>Painel Extrudado</span>
</div>`,
    cssSnippet: `.neu-card {
  background: #1e2536; /* Idêntico ao fundo da página */
  border-radius: 16px;
  /* Luz refletida no topo-esq + Sombra projetada embaixo-dir */
  box-shadow:
    -6px -6px 14px rgba(255, 255, 255, 0.05),
    6px 6px 14px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.03);
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; width: 100%;">
          <div id="neu-sample" style="
            width: 100px;
            height: 100px;
            background: var(--bg-surface-elevated);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow:
              -6px -6px 14px rgba(255, 255, 255, 0.08),
              6px 6px 14px rgba(0, 0, 0, 0.5);
            transition: all 0.2s ease;
          ">
            🎛️
          </div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">Clique no botão para alternar entre Extrudado e Escavado</span>
        </div>
      `;

      const sample = container.querySelector('#neu-sample') as HTMLElement;
      let isPressed = false;
      sample.addEventListener('click', () => {
        isPressed = !isPressed;
        if (isPressed) {
          sample.style.boxShadow =
            'inset -4px -4px 10px rgba(255, 255, 255, 0.06), inset 4px 4px 10px rgba(0, 0, 0, 0.6)';
        } else {
          sample.style.boxShadow =
            '-6px -6px 14px rgba(255, 255, 255, 0.08), 6px 6px 14px rgba(0, 0, 0, 0.5)';
        }
      });
    }
  },

  // 10. BACKLIGHT & GLOW NEON (Aura Bioluminescente)
  {
    id: 'backlight-glow',
    name: 'Glow Neon & Backlight',
    ptName: 'Iluminação Difusa Sem Deslocamento (0 Offset)',
    category: 'lighting',
    categoryLabel: 'Efeitos de Luz & Estilos',
    concept: 'Ao zerar os deslocamentos X e Y (0 0) e usar um blur alto com cor saturada, a caixa deixa de projetar sombra e passa a emitir luz como uma lâmpada neon.',
    purpose: 'Indicadores de status "Online/Ao Vivo", contornos de foco acessível com estilo e elementos no estilo Cyberpunk/Gamer.',
    goodPractice: 'Combine um blur intermediário de alta opacidade com um segundo blur gigante de opacidade suave para uma dispersão de luz natural.',
    commonPitfall: 'Exagerar na quantidade de elementos com glow na mesma página, transformando a interface em um letreiro ofuscante.',
    mnemonic: '"0 no X, 0 no Y: o objeto é o sol, não o anteparo".',
    htmlSnippet: `<span class="badge-live">
  <span class="dot-beacon"></span>
  SISTEMA OPERACIONAL
</span>`,
    cssSnippet: `.dot-beacon {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  /* 0 X e 0 Y criam o halo radial omnidirecional */
  box-shadow:
    0 0 10px #10b981,
    0 0 20px rgba(16, 185, 129, 0.5);
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; width: 100%;">
          <div style="display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 1.2rem; background: var(--bg-surface-elevated); border: 1px solid var(--border-medium); border-radius: 9999px;">
            <div id="neon-glow-dot" style="
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: #10b981;
              box-shadow: 0 0 12px #10b981, 0 0 24px rgba(16, 185, 129, 0.6);
              transition: all 0.3s ease;
            "></div>
            <span style="font-size: 0.8125rem; font-weight: 700; color: var(--text-primary);">STATUS ONLINE</span>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="stage-btn-pill is-active" data-pulse="green">Operacional</button>
            <button class="stage-btn-pill" data-pulse="amber">Alerta</button>
            <button class="stage-btn-pill" data-pulse="purple">Mágico</button>
          </div>
        </div>
      `;

      const dot = container.querySelector('#neon-glow-dot') as HTMLElement;
      const pills = container.querySelectorAll('.stage-btn-pill');

      pills.forEach((p) => {
        p.addEventListener('click', (e) => {
          pills.forEach((b) => b.classList.remove('is-active'));
          const target = e.currentTarget as HTMLElement;
          target.classList.add('is-active');
          const pulse = target.dataset.pulse;

          if (pulse === 'amber') {
            dot.style.background = '#f59e0b';
            dot.style.boxShadow = '0 0 12px #f59e0b, 0 0 24px rgba(245, 158, 11, 0.6)';
          } else if (pulse === 'purple') {
            dot.style.background = '#a855f7';
            dot.style.boxShadow = '0 0 12px #a855f7, 0 0 24px rgba(168, 85, 247, 0.6)';
          } else {
            dot.style.background = '#10b981';
            dot.style.boxShadow = '0 0 12px #10b981, 0 0 24px rgba(16, 185, 129, 0.6)';
          }
        });
      });
    }
  }
];
