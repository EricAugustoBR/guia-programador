import { SITES_DATA, SITE_CATEGORIES, SiteCategory, SiteItem } from './data/sites';

class SitesApp {
  private activeCategory: SiteCategory = 'all';
  private searchQuery: string = '';
  private isLightMode: boolean = false;

  private categoryContainer = document.getElementById('category-pills') as HTMLElement;
  private sitesGrid = document.getElementById('sites-grid') as HTMLElement;
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

    SITE_CATEGORIES.forEach((cat) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `category-pill ${this.activeCategory === cat.id ? 'is-active' : ''}`;
      
      const count = cat.id === 'all'
        ? SITES_DATA.length
        : SITES_DATA.filter((s) => s.category === cat.id).length;

      btn.innerHTML = `
        ${cat.iconSvg}
        <span>${cat.label}</span>
        <span class="category-pill-count">${count}</span>
      `;

      btn.title = cat.description;

      btn.addEventListener('click', () => {
        this.activeCategory = cat.id;
        this.renderCategoryPills();
        this.renderCards();
      });

      this.categoryContainer.appendChild(btn);
    });
  }

  private renderCards(): void {
    if (!this.sitesGrid) return;

    const filtered = SITES_DATA.filter((site: SiteItem) => {
      const matchCat = this.activeCategory === 'all' || site.category === this.activeCategory;
      if (!matchCat) return false;

      if (!this.searchQuery) return true;

      const q = this.searchQuery;
      const matchName = site.name.toLowerCase().includes(q);
      const matchConcept = site.concept.toLowerCase().includes(q);
      const matchWhy = site.whyItMatters.toLowerCase().includes(q);
      const matchCategory = site.categoryLabel.toLowerCase().includes(q);
      const matchTags = site.tags.some((t: string) => t.toLowerCase().includes(q));
      const matchHighlights = site.highlights.some((h: string) => h.toLowerCase().includes(q));

      return matchName || matchConcept || matchWhy || matchCategory || matchTags || matchHighlights;
    });

    if (this.resultsCount) {
      this.resultsCount.textContent = `Exibindo ${filtered.length} de ${SITES_DATA.length} referências`;
    }

    if (filtered.length === 0) {
      this.sitesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted); background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px dashed var(--border-medium);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 1rem; opacity: 0.5;">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <h3 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Nenhum site ou canal encontrado</h3>
          <p style="font-size: 0.875rem; margin-bottom: 1.25rem;">Tente pesquisar por outros termos como "CSS", "Dribbble", "YouTube" ou limpe a busca.</p>
          <button type="button" id="btn-clear-search" class="ui-btn ui-btn-secondary" style="margin: 0 auto; display: inline-flex; align-items: center; gap: 0.5rem;">
            Limpar Pesquisa
          </button>
        </div>
      `;

      const clearBtn = document.getElementById('btn-clear-search');
      clearBtn?.addEventListener('click', () => {
        this.searchQuery = '';
        if (this.searchInput) this.searchInput.value = '';
        this.activeCategory = 'all';
        this.renderCategoryPills();
        this.renderCards();
      });
      return;
    }

    this.sitesGrid.innerHTML = '';

    filtered.forEach((site: SiteItem) => {
      const card = document.createElement('article');
      card.className = `site-card ${site.featured ? 'is-featured' : ''}`;
      card.id = `site-card-${site.id}`;

      const highlightsHtml = site.highlights
        .map(
          (h) => `
        <div class="site-highlight-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>${h}</span>
        </div>
      `
        )
        .join('');

      const tagsHtml = site.tags
        .map((t) => `<button type="button" class="site-tag-pill" data-tag="${t}">${t}</button>`)
        .join('');

      card.innerHTML = `
        <header class="site-header">
          <div class="site-title-group">
            <div class="site-icon-wrapper" aria-hidden="true">
              ${site.iconSvg}
            </div>
            <div class="site-name-wrap">
              <h2 class="site-title">${site.name}</h2>
              <div class="site-meta-badges">
                <span class="site-category-badge">${site.categoryLabel}</span>
                ${site.featured ? '<span class="site-featured-badge">Destaque</span>' : ''}
              </div>
            </div>
          </div>

          <a
            href="${site.url}"
            target="_blank"
            rel="noopener noreferrer"
            class="site-visit-btn"
            title="Acessar ${site.name} (abre em nova aba)"
          >
            <span>Acessar</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </header>

        <p class="site-concept">${site.concept}</p>

        <div class="site-why">
          <strong>Por que consultar / Quando usar:</strong>
          ${site.whyItMatters}
        </div>

        <div class="site-highlights">
          <div class="site-highlights-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Destaques Principais:
          </div>
          ${highlightsHtml}
        </div>

        <div class="site-tip-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18h6"/>
            <path d="M10 22h4"/>
            <path d="M15 2a6 6 0 0 0-6 6c0 2 1.5 3.5 2 5h2c.5-1.5 2-3 2-5a6 6 0 0 0-6-6z"/>
          </svg>
          <div>
            <strong>Dica de Ouro:</strong> ${site.tipOrMnemonic}
          </div>
        </div>

        <div class="site-tags-row">
          ${tagsHtml}
        </div>
      `;

      // Event listener nas tags para busca instantânea
      card.querySelectorAll<HTMLButtonElement>('.site-tag-pill').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const tagText = (btn.getAttribute('data-tag') || '').replace('#', '').toLowerCase();
          if (this.searchInput) {
            this.searchInput.value = tagText;
            this.searchQuery = tagText;
            this.renderCards();
          }
        });
      });

      this.sitesGrid.appendChild(card);
    });
  }
}

// Inicializar aplicação ao carregar DOM
document.addEventListener('DOMContentLoaded', () => {
  new SitesApp();
});
