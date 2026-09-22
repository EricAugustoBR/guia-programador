import {
  LIBRARIES_DATA,
  LIBRARY_CATEGORIES,
  ROSETTA_STONE_ITEMS,
  LibraryCategory,
  LibraryItem,
  RosettaStoneItem
} from './data/libraries';

class LibrariesApp {
  private activeCategory: LibraryCategory = 'all';
  private searchQuery: string = '';
  private isLightMode: boolean = false;
  private activeRosettaId: string = 'shadcn';

  // DOM Elements
  private themeToggleBtn = document.getElementById('theme-toggle-btn') as HTMLButtonElement | null;
  private backToTopBtn = document.getElementById('back-to-top') as HTMLButtonElement | null;
  private searchInput = document.getElementById('search-input') as HTMLInputElement | null;
  private categoryContainer = document.getElementById('category-pills') as HTMLElement | null;
  private cardsGrid = document.getElementById('libraries-grid') as HTMLElement | null;
  private resultsCount = document.getElementById('results-count') as HTMLElement | null;

  // Rosetta Elements
  private rosettaTabsContainer = document.getElementById('rosetta-tabs-list') as HTMLElement | null;
  private rosettaBadge = document.getElementById('rosetta-paradigm-badge') as HTMLElement | null;
  private rosettaTitle = document.getElementById('rosetta-paradigm-title') as HTMLElement | null;
  private rosettaPhilosophy = document.getElementById('rosetta-philosophy') as HTMLElement | null;
  private rosettaLiveStage = document.getElementById('rosetta-live-stage') as HTMLElement | null;
  private rosettaProsList = document.getElementById('rosetta-pros-list') as HTMLElement | null;
  private rosettaConsList = document.getElementById('rosetta-cons-list') as HTMLElement | null;
  private rosettaCodeBlock = document.getElementById('rosetta-code-block') as HTMLElement | null;
  private btnCopyRosetta = document.getElementById('btn-copy-rosetta') as HTMLButtonElement | null;

  constructor() {
    this.initTheme();
    this.setupEventListeners();
    this.initRosettaStone();
    this.renderCategoryPills();
    this.renderCards();
  }

  private initTheme(): void {
    const savedTheme = localStorage.getItem('guia-theme');
    if (savedTheme === 'light') {
      this.isLightMode = true;
      document.documentElement.setAttribute('data-theme', 'light');
    }
    this.updateThemeButton();
  }

  private toggleTheme(): void {
    this.isLightMode = !this.isLightMode;
    const theme = this.isLightMode ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('guia-theme', theme);
    this.updateThemeButton();
  }

  private updateThemeButton(): void {
    if (!this.themeToggleBtn) return;
    this.themeToggleBtn.innerHTML = this.isLightMode
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    this.themeToggleBtn.title = this.isLightMode ? 'Alternar para Modo Escuro' : 'Alternar para Modo Claro';
  }

  private setupEventListeners(): void {
    this.themeToggleBtn?.addEventListener('click', () => this.toggleTheme());

    this.searchInput?.addEventListener('input', (e) => {
      this.searchQuery = (e.target as HTMLInputElement).value.trim().toLowerCase();
      this.renderCards();
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        this.backToTopBtn?.classList.add('is-visible');
      } else {
        this.backToTopBtn?.classList.remove('is-visible');
      }
    });

    this.backToTopBtn?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- ROSETTA STONE STUDIO ---
  private initRosettaStone(): void {
    this.renderRosettaTabs();
    this.updateRosettaView();

    this.btnCopyRosetta?.addEventListener('click', async () => {
      const code = this.rosettaCodeBlock?.textContent || '';
      try {
        await navigator.clipboard.writeText(code);
        const span = this.btnCopyRosetta?.querySelector('span');
        if (span) {
          span.textContent = 'Copiado! ✓';
          setTimeout(() => (span.textContent = 'Copiar Código'), 1500);
        }
      } catch (err) {
        console.warn('Erro ao copiar código rosetta', err);
      }
    });
  }

  private renderRosettaTabs(): void {
    const container = this.rosettaTabsContainer;
    if (!container) return;
    container.innerHTML = '';

    ROSETTA_STONE_ITEMS.forEach((item: RosettaStoneItem) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `rosetta-tab-btn ${this.activeRosettaId === item.id ? 'is-active' : ''}`;
      btn.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        <span>${item.name}</span>
      `;

      btn.addEventListener('click', () => {
        this.activeRosettaId = item.id;
        this.renderRosettaTabs();
        this.updateRosettaView();
      });

      container.appendChild(btn);
    });
  }

  private updateRosettaView(): void {
    const current = ROSETTA_STONE_ITEMS.find((i) => i.id === this.activeRosettaId) || ROSETTA_STONE_ITEMS[0];

    if (this.rosettaBadge) this.rosettaBadge.textContent = current.paradigm;
    if (this.rosettaTitle) this.rosettaTitle.textContent = current.name;
    if (this.rosettaPhilosophy) this.rosettaPhilosophy.textContent = current.philosophy;

    if (this.rosettaLiveStage) {
      current.renderSample(this.rosettaLiveStage);
    }

    if (this.rosettaProsList) {
      this.rosettaProsList.innerHTML = `
        <div class="pros-title">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          <span>VANTAGENS</span>
        </div>
        ${current.pros.map((p) => `<div class="pros-item">• ${p}</div>`).join('')}
      `;
    }

    if (this.rosettaConsList) {
      this.rosettaConsList.innerHTML = `
        <div class="cons-title">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          <span>ATENÇÃO / TRADE-OFFS</span>
        </div>
        ${current.cons.map((c) => `<div class="cons-item">• ${c}</div>`).join('')}
      `;
    }

    if (this.rosettaCodeBlock) {
      this.rosettaCodeBlock.textContent = current.code;
    }
  }

  // --- CATEGORIES & CARDS ---
  private renderCategoryPills(): void {
    const container = this.categoryContainer;
    if (!container) return;
    container.innerHTML = '';

    LIBRARY_CATEGORIES.forEach((cat) => {
      const count =
        cat.id === 'all'
          ? LIBRARIES_DATA.length
          : LIBRARIES_DATA.filter((item) => item.category === cat.id).length;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `category-pill ${this.activeCategory === cat.id ? 'is-active' : ''}`;
      btn.innerHTML = `
        ${cat.iconSvg}
        <span>${cat.label}</span>
        <span class="category-pill-count">${count}</span>
      `;

      btn.addEventListener('click', () => {
        this.activeCategory = cat.id;
        this.renderCategoryPills();
        this.renderCards();
      });

      container.appendChild(btn);
    });
  }

  private getFilteredItems(): readonly LibraryItem[] {
    return LIBRARIES_DATA.filter((item) => {
      const matchesCategory =
        this.activeCategory === 'all' || item.category === this.activeCategory;

      const matchesSearch =
        !this.searchQuery ||
        item.name.toLowerCase().includes(this.searchQuery) ||
        item.ptName.toLowerCase().includes(this.searchQuery) ||
        item.concept.toLowerCase().includes(this.searchQuery) ||
        item.mnemonic.toLowerCase().includes(this.searchQuery) ||
        item.architecture.distribution.toLowerCase().includes(this.searchQuery) ||
        item.architecture.stylingApproach.toLowerCase().includes(this.searchQuery);

      return matchesCategory && matchesSearch;
    });
  }

  private renderCards(): void {
    const grid = this.cardsGrid;
    if (!grid) return;
    grid.innerHTML = '';

    const items = this.getFilteredItems();

    if (this.resultsCount) {
      this.resultsCount.textContent = `Mostrando ${items.length} de ${LIBRARIES_DATA.length} conjuntos e ecossistemas`;
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <p style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">Nenhum conjunto encontrado</p>
          <p style="font-size: 0.875rem;">Tente pesquisar por termos como "shadcn", "styled", "tailwind", "mui", "antd", "radix", "headless"...</p>
        </div>
      `;
      return;
    }

    items.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'control-card';
      card.id = `card-${item.id}`;

      card.innerHTML = `
        <div class="card-header">
          <div class="card-title-group">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <h3 class="card-title">${item.name}</h3>
              <span class="badge-card-rank">${item.badge}</span>
            </div>
            <span class="card-pt-name">${item.ptName}</span>
          </div>
          <span class="card-cat-badge">${item.categoryLabel}</span>
        </div>

        <div class="card-body">
          <div class="concept-box">
            <div class="concept-text">${item.concept}</div>
            <div class="purpose-text"><strong>Onde usar:</strong> ${item.purpose}</div>

            <div class="arch-summary-bar">
              <span class="arch-pill">📦 ${item.architecture.distribution}</span>
              <span class="arch-pill">🎨 ${item.architecture.stylingApproach}</span>
              <span class="arch-pill">⚡ ${item.architecture.rscSupport}</span>
              <span class="arch-pill">🔒 Lock-in: ${item.architecture.lockIn}</span>
            </div>
          </div>

          <div class="interactive-stage" id="stage-${item.id}"></div>

          <div class="memorization-box">
            <div class="memo-item">
              <span class="memo-tag-good">✓ REGRA:</span>
              <span>${item.goodPractice}</span>
            </div>
            <div class="memo-item">
              <span class="memo-tag-bad">✕ EVITE:</span>
              <span>${item.commonPitfall}</span>
            </div>
            <div class="memo-item">
              <span class="memo-tag-tip">💡 FIXAÇÃO:</span>
              <span>${item.mnemonic}</span>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <button type="button" class="btn-code-toggle" id="toggle-code-${item.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            <span>Ver Código</span>
          </button>
          <button type="button" class="btn-copy-code" id="copy-code-${item.id}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copiar</span>
          </button>
        </div>

        <div class="code-drawer" id="drawer-${item.id}">
          <pre><code>${this.escapeHtml(item.codeSnippet)}</code></pre>
        </div>
      `;

      grid.appendChild(card);

      // Render interactive stage
      const stage = card.querySelector(`#stage-${item.id}`) as HTMLElement;
      if (stage) {
        item.renderInteractive(stage);
      }

      // Toggle code snippet
      const toggleBtn = card.querySelector(`#toggle-code-${item.id}`);
      const drawer = card.querySelector(`#drawer-${item.id}`);
      toggleBtn?.addEventListener('click', () => {
        drawer?.classList.toggle('is-open');
        const span = toggleBtn.querySelector('span');
        if (span) {
          span.textContent = drawer?.classList.contains('is-open') ? 'Ocultar Código' : 'Ver Código';
        }
      });

      // Copy code snippet
      const copyBtn = card.querySelector(`#copy-code-${item.id}`);
      copyBtn?.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(item.codeSnippet);
          const span = copyBtn.querySelector('span');
          if (span) {
            span.textContent = 'Copiado! ✓';
            setTimeout(() => (span.textContent = 'Copiar'), 1500);
          }
        } catch (err) {
          console.warn('Erro ao copiar snippet', err);
        }
      });
    });
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new LibrariesApp();
});
