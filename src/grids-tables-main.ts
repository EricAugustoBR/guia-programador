import { GRIDS_TABLES_DATA, GRID_TABLE_CATEGORIES } from './data/grids-tables';
import { GridTableCategory, GridTableItem } from './data/grids-tables';

class GridsTablesApp {
  private activeCategory: GridTableCategory = 'all';
  private searchQuery: string = '';
  private isLightMode: boolean = false;

  private categoryContainer = document.getElementById('category-pills') as HTMLElement;
  private itemsGrid = document.getElementById('grids-tables-container') as HTMLElement;
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

    GRID_TABLE_CATEGORIES.forEach((cat) => {
      const count =
        cat.id === 'all'
          ? GRIDS_TABLES_DATA.length
          : GRIDS_TABLES_DATA.filter((item) => item.category === cat.id).length;

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

  private getFilteredItems(): readonly GridTableItem[] {
    return GRIDS_TABLES_DATA.filter((item) => {
      const matchesCategory =
        this.activeCategory === 'all' || item.category === this.activeCategory;

      const matchesSearch =
        !this.searchQuery ||
        item.name.toLowerCase().includes(this.searchQuery) ||
        item.ptName.toLowerCase().includes(this.searchQuery) ||
        item.dribbbleTrend.toLowerCase().includes(this.searchQuery) ||
        item.concept.toLowerCase().includes(this.searchQuery) ||
        item.goldenRule.toLowerCase().includes(this.searchQuery) ||
        item.mnemonic.toLowerCase().includes(this.searchQuery);

      return matchesCategory && matchesSearch;
    });
  }

  private renderCards(): void {
    if (!this.itemsGrid) return;
    this.itemsGrid.innerHTML = '';

    const items = this.getFilteredItems();

    if (this.resultsCount) {
      this.resultsCount.textContent = `Mostrando ${items.length} de ${GRIDS_TABLES_DATA.length} exemplos Dribbble`;
    }

    if (items.length === 0) {
      this.itemsGrid.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem; color: var(--text-muted); background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl);">
          <p style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">Nenhum exemplo encontrado</p>
          <p style="font-size: 0.875rem;">Tente pesquisar por termos como "bento", "crypto", "expandable", "kanban", "pricing", "sparkline"...</p>
        </div>
      `;
      return;
    }

    items.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'gt-example-card';
      card.id = `card-${item.id}`;

      card.innerHTML = `
        <header class="gt-example-header">
          <div class="gt-example-title-group">
            <h3 class="gt-example-title">${item.name}</h3>
            <div class="gt-example-pt-title">${item.ptName}</div>
          </div>
          <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
            <span class="card-cat-badge">${item.categoryLabel}</span>
            <span class="gt-dribbble-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/>
                <path d="M21.75 12.84c-6.62-1.41-12.14.73-15.5 6.25"/>
                <path d="M8.5 2.5c3.5 4.5 4.5 11 3.5 19"/>
              </svg>
              Dribbble Trend: ${item.dribbbleTrend}
            </span>
          </div>
        </header>

        <div class="gt-example-body">
          <div class="gt-pedagogical-box">
            <div class="gt-pedagogical-item">
              <span class="gt-ped-tag gt-ped-concept">CONCEITO:</span>
              <span>${item.concept}</span>
            </div>
            <div class="gt-pedagogical-item">
              <span class="gt-ped-tag gt-ped-rule">✓ REGRA DE OURO:</span>
              <span>${item.goldenRule}</span>
            </div>
            <div class="gt-pedagogical-item">
              <span class="gt-ped-tag gt-ped-pitfall">✕ EVITE:</span>
              <span>${item.commonPitfall}</span>
            </div>
            <div class="gt-pedagogical-item">
              <span class="gt-ped-tag gt-ped-mnemonic">💡 FIXAÇÃO:</span>
              <span>${item.mnemonic}</span>
            </div>
          </div>

          <div class="gt-stage" id="stage-${item.id}"></div>
        </div>

        <footer class="gt-example-footer">
          <button type="button" class="gt-btn-code-toggle" id="toggle-code-${item.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            <span>Ver Snippet HTML/CSS</span>
          </button>
          <button type="button" class="gt-btn-copy-code" id="copy-code-${item.id}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copiar Snippet</span>
          </button>
        </footer>

        <div class="gt-code-drawer" id="drawer-${item.id}">
          <pre><code><!-- HTML -->\n${this.escapeHtml(item.htmlSnippet)}\n\n/* CSS */\n${this.escapeHtml(item.cssSnippet)}</code></pre>
        </div>
      `;

      this.itemsGrid.appendChild(card);

      // Render interactive stage
      const stage = card.querySelector(`#stage-${item.id}`) as HTMLElement;
      if (stage) {
        item.renderInteractive(stage);
      }

      // Snippet toggle
      const toggleBtn = card.querySelector(`#toggle-code-${item.id}`);
      const drawer = card.querySelector(`#drawer-${item.id}`);
      toggleBtn?.addEventListener('click', () => {
        drawer?.classList.toggle('is-open');
        const span = toggleBtn.querySelector('span');
        if (span) {
          span.textContent = drawer?.classList.contains('is-open') ? 'Ocultar Snippet' : 'Ver Snippet HTML/CSS';
        }
      });

      // Copy snippet
      const copyBtn = card.querySelector(`#copy-code-${item.id}`);
      copyBtn?.addEventListener('click', async () => {
        const fullSnippet = `<!-- HTML -->\n${item.htmlSnippet}\n\n/* CSS */\n${item.cssSnippet}`;
        try {
          await navigator.clipboard.writeText(fullSnippet);
          const span = copyBtn.querySelector('span');
          if (span) {
            span.textContent = 'Copiado! ✓';
            setTimeout(() => (span.textContent = 'Copiar Snippet'), 1500);
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
  new GridsTablesApp();
});
