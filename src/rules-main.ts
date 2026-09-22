import { DEV_RULES_DATA, DevRuleItem } from './data/rules';

class DevRulesApp {
  private checkedRules: Set<string> = new Set();
  private searchQuery: string = '';
  private activeCategory: string = 'all';
  private isLightMode: boolean = false;

  private rulesListContainer = document.getElementById('rules-list') as HTMLElement;
  private searchInput = document.getElementById('search-input') as HTMLInputElement;
  private progressFill = document.getElementById('progress-bar-fill') as HTMLElement;
  private progressStat = document.getElementById('progress-stat') as HTMLElement;
  private celebrateBanner = document.getElementById('celebrate-banner') as HTMLElement;
  private categoryNav = document.getElementById('rules-category-pills') as HTMLElement;
  private themeToggleBtn = document.getElementById('theme-toggle-btn') as HTMLButtonElement;
  private backToTopBtn = document.getElementById('back-to-top') as HTMLButtonElement;
  private resetBtn = document.getElementById('btn-reset-checklist') as HTMLButtonElement;

  constructor() {
    this.initTheme();
    this.loadSavedChecks();
    this.setupEventListeners();
    this.renderCategoryPills();
    this.renderRules();
    this.updateProgress();
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

  private loadSavedChecks(): void {
    try {
      const saved = localStorage.getItem('guia-rules-checked');
      if (saved) {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr)) {
          this.checkedRules = new Set(arr);
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar checklist salvo', e);
    }
  }

  private saveChecks(): void {
    localStorage.setItem(
      'guia-rules-checked',
      JSON.stringify(Array.from(this.checkedRules))
    );
  }

  private toggleRuleCheck(id: string): void {
    if (this.checkedRules.has(id)) {
      this.checkedRules.delete(id);
    } else {
      this.checkedRules.add(id);
    }
    this.saveChecks();
    this.updateProgress();

    const card = document.getElementById(`rule-card-${id}`);
    if (card) {
      card.classList.toggle('is-checked', this.checkedRules.has(id));
    }
  }

  private updateProgress(): void {
    const total = DEV_RULES_DATA.length;
    const checked = this.checkedRules.size;
    const pct = Math.round((checked / total) * 100);

    if (this.progressFill) {
      this.progressFill.style.width = `${pct}%`;
    }
    if (this.progressStat) {
      this.progressStat.textContent = `${checked} de ${total} cumpridas (${pct}%)`;
    }
    if (this.celebrateBanner) {
      if (checked === total && total > 0) {
        this.celebrateBanner.classList.add('is-active');
      } else {
        this.celebrateBanner.classList.remove('is-active');
      }
    }
  }

  private resetChecklist(): void {
    if (confirm('Deseja desmarcar todos os itens do checklist?')) {
      this.checkedRules.clear();
      this.saveChecks();
      this.updateProgress();
      this.renderRules();
    }
  }

  private setupEventListeners(): void {
    this.themeToggleBtn?.addEventListener('click', () => this.toggleTheme());
    this.resetBtn?.addEventListener('click', () => this.resetChecklist());

    this.searchInput?.addEventListener('input', (e) => {
      this.searchQuery = (e.target as HTMLInputElement).value.trim().toLowerCase();
      this.renderRules();
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
    if (!this.categoryNav) return;
    this.categoryNav.innerHTML = '';

    const categories = [
      { id: 'all', label: 'Todas as Regras' },
      { id: 'dados', label: 'Estado & Dados (Imutabilidade)' },
      { id: 'a11y', label: 'Acessibilidade & Web' },
      { id: 'arquitetura', label: 'TypeScript & Arquitetura' },
      { id: 'css', label: 'CSS & Estilização' }
    ];

    categories.forEach((cat) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `category-pill ${this.activeCategory === cat.id ? 'is-active' : ''}`;
      btn.textContent = cat.label;

      btn.addEventListener('click', () => {
        this.activeCategory = cat.id;
        this.renderCategoryPills();
        this.renderRules();
      });

      this.categoryNav.appendChild(btn);
    });
  }

  private getFilteredRules(): DevRuleItem[] {
    return DEV_RULES_DATA.filter((rule) => {
      const matchesCategory =
        this.activeCategory === 'all' || rule.category === this.activeCategory;

      const matchesSearch =
        !this.searchQuery ||
        rule.name.toLowerCase().includes(this.searchQuery) ||
        rule.concept.toLowerCase().includes(this.searchQuery) ||
        rule.whyItMatters.toLowerCase().includes(this.searchQuery) ||
        rule.mnemonic.toLowerCase().includes(this.searchQuery);

      return matchesCategory && matchesSearch;
    });
  }

  private renderRules(): void {
    if (!this.rulesListContainer) return;
    this.rulesListContainer.innerHTML = '';

    const rules = this.getFilteredRules();

    if (rules.length === 0) {
      this.rulesListContainer.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <p style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">Nenhuma regra encontrada</p>
          <p style="font-size: 0.875rem;">Tente buscar por "imutabilidade", "a11y", "tokens", "any"...</p>
        </div>
      `;
      return;
    }

    rules.forEach((rule) => {
      const isChecked = this.checkedRules.has(rule.id);
      const card = document.createElement('article');
      card.className = `rule-card ${isChecked ? 'is-checked' : ''}`;
      card.id = `rule-card-${rule.id}`;

      const severityClass =
        rule.severity === 'Crítica'
          ? 'badge-critica'
          : rule.severity === 'Essencial'
          ? 'badge-essencial'
          : 'badge-recomendada';

      card.innerHTML = `
        <div class="rule-header">
          <button type="button" class="rule-checkbox-btn" aria-label="Alternar regra cumprida" id="btn-chk-${rule.id}">
            ✓
          </button>
          <div class="rule-title-group">
            <div class="rule-title-row">
              <h3 class="rule-name">${rule.name}</h3>
              <div class="rule-badges">
                <span class="ui-badge ${severityClass}">${rule.severity}</span>
                <span class="card-cat-badge">${rule.categoryLabel}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="rule-body">
          <div class="rule-concept-box">
            <strong>O que é:</strong> ${rule.concept}
            <p><strong>Por que importa:</strong> ${rule.whyItMatters}</p>
          </div>

          <div class="rule-code-comparison">
            <div class="code-box code-box-bad">
              <div class="code-box-header">
                <span>✕ O que Evitar</span>
              </div>
              <pre><code>${this.escapeHtml(rule.badSnippet)}</code></pre>
            </div>

            <div class="code-box code-box-good">
              <div class="code-box-header">
                <span>✓ Padrão Correto</span>
              </div>
              <pre><code>${this.escapeHtml(rule.goodSnippet)}</code></pre>
            </div>
          </div>

          <div class="rule-advice-grid">
            <div class="advice-item">
              <span class="advice-label label-tip">💡 Mnemônico de Fixação</span>
              <span class="advice-text">${rule.mnemonic}</span>
            </div>
            <div class="advice-item">
              <span class="advice-label label-tool">🛠️ Como Validar no Projeto</span>
              <span class="advice-text">${rule.practicalTip}</span>
            </div>
          </div>
        </div>
      `;

      this.rulesListContainer.appendChild(card);

      const chkBtn = card.querySelector(`#btn-chk-${rule.id}`);
      chkBtn?.addEventListener('click', () => {
        this.toggleRuleCheck(rule.id);
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
  new DevRulesApp();
});
