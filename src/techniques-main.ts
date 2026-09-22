import { TECHNIQUES_DATA, TECHNIQUE_CATEGORIES, TechniqueCategory, TechniqueItem } from './data/techniques';

class TechniquesApp {
  private activeCategory: TechniqueCategory = 'all';
  private searchQuery: string = '';
  private isLightMode: boolean = false;

  private categoryContainer = document.getElementById('category-pills') as HTMLElement;
  private cardsGrid = document.getElementById('techniques-grid') as HTMLElement;
  private searchInput = document.getElementById('search-input') as HTMLInputElement;
  private resultsCount = document.getElementById('results-count') as HTMLElement;
  private themeToggleBtn = document.getElementById('theme-toggle-btn') as HTMLButtonElement;
  private backToTopBtn = document.getElementById('back-to-top') as HTMLButtonElement;

  constructor() {
    this.initTheme();
    this.setupEventListeners();
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

  private renderCategoryPills(): void {
    if (!this.categoryContainer) return;
    this.categoryContainer.innerHTML = '';

    TECHNIQUE_CATEGORIES.forEach((cat) => {
      const count =
        cat.id === 'all'
          ? TECHNIQUES_DATA.length
          : TECHNIQUES_DATA.filter((item) => item.category === cat.id).length;

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

      this.categoryContainer.appendChild(btn);
    });
  }

  private getFilteredItems(): TechniqueItem[] {
    return TECHNIQUES_DATA.filter((item) => {
      const matchesCategory =
        this.activeCategory === 'all' || item.category === this.activeCategory;

      const matchesSearch =
        !this.searchQuery ||
        item.name.toLowerCase().includes(this.searchQuery) ||
        item.ptName.toLowerCase().includes(this.searchQuery) ||
        item.concept.toLowerCase().includes(this.searchQuery) ||
        item.mnemonic.toLowerCase().includes(this.searchQuery);

      return matchesCategory && matchesSearch;
    });
  }

  private renderCards(): void {
    if (!this.cardsGrid) return;
    this.cardsGrid.innerHTML = '';

    const items = this.getFilteredItems();

    if (this.resultsCount) {
      this.resultsCount.textContent = `Mostrando ${items.length} de ${TECHNIQUES_DATA.length} partes e técnicas`;
    }

    if (items.length === 0) {
      this.cardsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <p style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">Nenhuma técnica encontrada</p>
          <p style="font-size: 0.875rem;">Tente pesquisar por termos como "timeline", "hero", "bento", "pricing", "glass"...</p>
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
            <h3 class="card-title">${item.name}</h3>
            <span class="card-pt-name">${item.ptName}</span>
          </div>
          <span class="card-cat-badge">${item.categoryLabel}</span>
        </div>

        <div class="card-body">
          <div class="concept-box">
            <div class="concept-text">${item.concept}</div>
            <div class="purpose-text"><strong>Onde usar:</strong> ${item.purpose}</div>
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
            <span>Ver Snippet</span>
          </button>
          <button type="button" class="btn-copy-code" id="copy-code-${item.id}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copiar</span>
          </button>
        </div>

        <div class="code-drawer" id="drawer-${item.id}">
          <pre><code>${this.escapeHtml(item.htmlSnippet)}\n\n/* CSS */\n${this.escapeHtml(item.cssSnippet)}</code></pre>
        </div>
      `;

      this.cardsGrid.appendChild(card);

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
          span.textContent = drawer?.classList.contains('is-open') ? 'Ocultar Snippet' : 'Ver Snippet';
        }
      });

      // Copy code snippet
      const copyBtn = card.querySelector(`#copy-code-${item.id}`);
      copyBtn?.addEventListener('click', async () => {
        const fullSnippet = `${item.htmlSnippet}\n\n/* CSS */\n${item.cssSnippet}`;
        try {
          await navigator.clipboard.writeText(fullSnippet);
          const span = copyBtn.querySelector('span');
          if (span) {
            span.textContent = 'Copiado! ✓';
            setTimeout(() => (span.textContent = 'Copiar'), 1500);
          }
        } catch (err) {
          console.warn('Erro ao copiar', err);
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
  new TechniquesApp();
});
