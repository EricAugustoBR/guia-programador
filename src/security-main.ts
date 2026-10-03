import './navigation';
import {
  SECURITY_CHECKLIST_DATA,
  SECURITY_CATEGORIES,
  SecurityCheckItem,
  SecurityCategory
} from './data/security-checklist';

type FilterStatus = 'all' | 'pending' | 'completed' | 'critica';

class SecurityApp {
  private checkedRules: Set<string> = new Set();
  private searchQuery: string = '';
  private activeCategory: SecurityCategory | 'all' = 'all';
  private activeStatus: FilterStatus = 'all';
  private isLightMode: boolean = false;

  // DOM Elements
  private readonly container = document.getElementById('security-rules-list') as HTMLElement | null;
  private readonly searchInput = document.getElementById('security-search-input') as HTMLInputElement | null;
  private readonly progressFill = document.getElementById('security-progress-fill') as HTMLElement | null;
  private readonly progressStatBadge = document.getElementById('security-stat-badge') as HTMLElement | null;
  private readonly progressTextDesc = document.getElementById('security-progress-text') as HTMLElement | null;
  private readonly celebrateBanner = document.getElementById('security-celebrate-banner') as HTMLElement | null;
  private readonly categoryContainer = document.getElementById('security-category-pills') as HTMLElement | null;
  private readonly filterTabsContainer = document.getElementById('security-filter-tabs') as HTMLElement | null;
  private readonly themeToggleBtn = document.getElementById('theme-toggle-btn') as HTMLButtonElement | null;
  private readonly backToTopBtn = document.getElementById('back-to-top') as HTMLButtonElement | null;
  private readonly btnReset = document.getElementById('btn-reset-security') as HTMLButtonElement | null;
  private readonly btnCheckAll = document.getElementById('btn-check-all-security') as HTMLButtonElement | null;
  private readonly btnExportReport = document.getElementById('btn-export-report') as HTMLButtonElement | null;
  private readonly criticasChip = document.getElementById('chip-criticas-stat') as HTMLElement | null;
  private readonly altasChip = document.getElementById('chip-altas-stat') as HTMLElement | null;
  private readonly toastElement = document.getElementById('security-toast') as HTMLElement | null;

  constructor() {
    this.initTheme();
    this.loadSavedChecks();
    this.setupEventListeners();
    this.renderCategoryPills();
    this.renderFilterTabs();
    this.renderCards();
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
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    this.themeToggleBtn.title = this.isLightMode ? 'Alternar para Modo Escuro' : 'Alternar para Modo Claro';
  }

  private loadSavedChecks(): void {
    try {
      const saved = localStorage.getItem('guia-security-checked');
      if (saved) {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr)) {
          this.checkedRules = new Set(arr);
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar checklist de segurança:', e);
    }
  }

  private saveChecks(): void {
    localStorage.setItem(
      'guia-security-checked',
      JSON.stringify(Array.from(this.checkedRules))
    );
  }

  private toggleCheck(id: string): void {
    // Immutability pattern
    const nextChecked = new Set(this.checkedRules);
    if (nextChecked.has(id)) {
      nextChecked.delete(id);
    } else {
      nextChecked.add(id);
    }
    this.checkedRules = nextChecked;
    this.saveChecks();
    this.updateProgress();

    const card = document.getElementById(`security-card-${id}`);
    if (card) {
      card.classList.toggle('is-checked', this.checkedRules.has(id));
      const btn = card.querySelector('.security-checkbox-btn');
      if (btn) {
        btn.setAttribute('aria-checked', this.checkedRules.has(id) ? 'true' : 'false');
      }
    }

    // Se estiver filtrando por status (pending/completed), re-renderiza
    if (this.activeStatus !== 'all') {
      this.renderCards();
    }
  }

  private checkAll(): void {
    const allIds = SECURITY_CHECKLIST_DATA.map((item) => item.id);
    this.checkedRules = new Set(allIds);
    this.saveChecks();
    this.updateProgress();
    this.renderCards();
    this.showToast(`✓ Todos os ${allIds.length} itens foram marcados!`);
  }

  private resetChecks(): void {
    if (confirm('Deseja desmarcar todos os itens do checklist de segurança?')) {
      this.checkedRules = new Set();
      this.saveChecks();
      this.updateProgress();
      this.renderCards();
      this.showToast('Checklist de segurança reiniciado.');
    }
  }

  private updateProgress(): void {
    const total = SECURITY_CHECKLIST_DATA.length;
    const checked = this.checkedRules.size;
    const pct = Math.round((checked / total) * 100);

    if (this.progressFill) {
      this.progressFill.style.width = `${pct}%`;
    }

    if (this.progressStatBadge) {
      this.progressStatBadge.textContent = `${checked}/${total} (${pct}%)`;
    }

    if (this.progressTextDesc) {
      this.progressTextDesc.textContent = `${checked} de ${total} verificações de segurança aprovadas`;
    }

    // Breakdown
    const criticasTotal = SECURITY_CHECKLIST_DATA.filter((i) => i.severity === 'Crítica').length;
    const criticasChecked = SECURITY_CHECKLIST_DATA.filter((i) => i.severity === 'Crítica' && this.checkedRules.has(i.id)).length;
    
    const altasTotal = SECURITY_CHECKLIST_DATA.filter((i) => i.severity === 'Alta').length;
    const altasChecked = SECURITY_CHECKLIST_DATA.filter((i) => i.severity === 'Alta' && this.checkedRules.has(i.id)).length;

    if (this.criticasChip) {
      this.criticasChip.innerHTML = `🚨 Críticas: <strong>${criticasChecked}/${criticasTotal}</strong>`;
    }
    if (this.altasChip) {
      this.altasChip.innerHTML = `⚠️ Altas: <strong>${altasChecked}/${altasTotal}</strong>`;
    }

    if (this.celebrateBanner) {
      if (checked === total && total > 0) {
        this.celebrateBanner.classList.add('is-active');
      } else {
        this.celebrateBanner.classList.remove('is-active');
      }
    }
  }

  private setupEventListeners(): void {
    this.themeToggleBtn?.addEventListener('click', () => this.toggleTheme());
    this.btnReset?.addEventListener('click', () => this.resetChecks());
    this.btnCheckAll?.addEventListener('click', () => this.checkAll());
    this.btnExportReport?.addEventListener('click', () => this.exportMarkdownReport());

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
    const categoryContainer = this.categoryContainer;
    if (!categoryContainer) return;
    categoryContainer.innerHTML = '';

    SECURITY_CATEGORIES.forEach((cat) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `security-pill ${this.activeCategory === cat.id ? 'is-active' : ''}`;

      const count = cat.id === 'all'
        ? SECURITY_CHECKLIST_DATA.length
        : SECURITY_CHECKLIST_DATA.filter((i) => i.category === cat.id).length;

      btn.innerHTML = `
        <span>${cat.icon}</span>
        <span>${cat.label}</span>
        <span class="security-pill-count">${count}</span>
      `;

      btn.addEventListener('click', () => {
        this.activeCategory = cat.id;
        this.renderCategoryPills();
        this.renderCards();
      });

      categoryContainer.appendChild(btn);
    });
  }

  private renderFilterTabs(): void {
    const filterTabsContainer = this.filterTabsContainer;
    if (!filterTabsContainer) return;
    filterTabsContainer.innerHTML = '';

    const tabs: readonly { id: FilterStatus; label: string }[] = [
      { id: 'all', label: 'Todos' },
      { id: 'pending', label: 'Pendentes' },
      { id: 'completed', label: 'Concluídos' },
      { id: 'critica', label: 'Apenas Críticos' }
    ];

    tabs.forEach((tab) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `security-filter-tab ${this.activeStatus === tab.id ? 'is-active' : ''}`;
      btn.textContent = tab.label;

      btn.addEventListener('click', () => {
        this.activeStatus = tab.id;
        this.renderFilterTabs();
        this.renderCards();
      });

      filterTabsContainer.appendChild(btn);
    });
  }

  private getFilteredItems(): readonly SecurityCheckItem[] {
    return SECURITY_CHECKLIST_DATA.filter((item) => {
      // Filtro por Categoria
      const matchesCat = this.activeCategory === 'all' || item.category === this.activeCategory;

      // Filtro por Status
      let matchesStatus = true;
      if (this.activeStatus === 'pending') {
        matchesStatus = !this.checkedRules.has(item.id);
      } else if (this.activeStatus === 'completed') {
        matchesStatus = this.checkedRules.has(item.id);
      } else if (this.activeStatus === 'critica') {
        matchesStatus = item.severity === 'Crítica';
      }

      // Filtro por Busca
      const matchesSearch =
        !this.searchQuery ||
        item.name.toLowerCase().includes(this.searchQuery) ||
        item.concept.toLowerCase().includes(this.searchQuery) ||
        item.whyItMatters.toLowerCase().includes(this.searchQuery) ||
        item.mnemonic.toLowerCase().includes(this.searchQuery) ||
        item.validationTip.toLowerCase().includes(this.searchQuery) ||
        item.categoryLabel.toLowerCase().includes(this.searchQuery);

      return matchesCat && matchesStatus && matchesSearch;
    });
  }

  private renderCards(): void {
    const container = this.container;
    if (!container) return;
    container.innerHTML = '';

    const items = this.getFilteredItems();

    if (items.length === 0) {
      container.innerHTML = `
        <div class="security-empty-state">
          <div class="security-empty-icon">🔍</div>
          <h3 class="security-empty-title">Nenhum ponto de segurança encontrado</h3>
          <p style="font-size: 0.875rem;">Tente ajustar o termo da busca ou alterar o filtro de categoria/status.</p>
        </div>
      `;
      return;
    }

    items.forEach((item) => {
      const isChecked = this.checkedRules.has(item.id);
      const card = document.createElement('article');
      card.className = `security-card ${isChecked ? 'is-checked' : ''}`;
      card.id = `security-card-${item.id}`;

      const severityClass =
        item.severity === 'Crítica'
          ? 'badge-critica'
          : item.severity === 'Alta'
          ? 'badge-alta'
          : 'badge-essencial';

      card.innerHTML = `
        <div class="security-card-header">
          <button
            type="button"
            class="security-checkbox-btn"
            id="chk-btn-${item.id}"
            role="checkbox"
            aria-checked="${isChecked}"
            aria-label="Marcar '${item.name}' como verificado"
          >
            ✓
          </button>
          <div class="security-title-group">
            <div class="security-title-row">
              <h2 class="security-card-name">${this.escapeHtml(item.name)}</h2>
              <div class="security-badges">
                <span class="${severityClass}">${item.severity}</span>
                <span class="badge-category">${item.categoryLabel}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="security-card-body">
          <div class="security-concept-box">
            <div><strong>O que é:</strong> ${this.escapeHtml(item.concept)}</div>
            <p><strong>Por que importa:</strong> ${this.escapeHtml(item.whyItMatters)}</p>
          </div>

          <div class="security-code-grid">
            <div class="code-box code-box-bad">
              <div class="code-box-header">
                <span>✕ O que Evitar (Vulnerável)</span>
                <button type="button" class="btn-copy-snippet" data-copy="bad-${item.id}">
                  Copiar
                </button>
              </div>
              <pre><code id="code-bad-${item.id}">${this.escapeHtml(item.badSnippet)}</code></pre>
            </div>

            <div class="code-box code-box-good">
              <div class="code-box-header">
                <span>✓ Padrão Seguro (Protegido)</span>
                <button type="button" class="btn-copy-snippet" data-copy="good-${item.id}">
                  Copiar
                </button>
              </div>
              <pre><code id="code-good-${item.id}">${this.escapeHtml(item.goodSnippet)}</code></pre>
            </div>
          </div>

          <div class="security-advice-grid">
            <div class="advice-card">
              <span class="advice-label mnemonic">💡 Mnemônico de Fixação</span>
              <span class="advice-text">${this.escapeHtml(item.mnemonic)}</span>
            </div>
            <div class="advice-card">
              <span class="advice-label pitfall">⚠️ Armadilha / Pegadinha</span>
              <span class="advice-text">${this.escapeHtml(item.pitfall)}</span>
            </div>
            <div class="advice-card">
              <span class="advice-label validation">🛠️ Como Testar no Projeto</span>
              <span class="advice-text">${this.escapeHtml(item.validationTip)}</span>
            </div>
          </div>
        </div>
      `;

      container.appendChild(card);

      // Event listener do checkbox
      const chkBtn = card.querySelector(`#chk-btn-${item.id}`);
      chkBtn?.addEventListener('click', () => this.toggleCheck(item.id));

      // Copy buttons
      const copyBtns = card.querySelectorAll<HTMLButtonElement>('.btn-copy-snippet');
      copyBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-copy');
          const isBad = targetId?.startsWith('bad-');
          const snippet = isBad ? item.badSnippet : item.goodSnippet;

          navigator.clipboard.writeText(snippet).then(() => {
            const originalText = btn.textContent;
            btn.textContent = '✓ Copiado!';
            setTimeout(() => {
              btn.textContent = originalText;
            }, 2000);
          });
        });
      });
    });
  }

  private exportMarkdownReport(): void {
    const total = SECURITY_CHECKLIST_DATA.length;
    const checked = this.checkedRules.size;
    const pct = Math.round((checked / total) * 100);
    const dateStr = new Date().toLocaleDateString('pt-BR');

    let report = `# 🛡️ Relatório de Revisão de Segurança Web\n\n`;
    report += `**Data da Auditoria:** ${dateStr}\n`;
    report += `**Progresso Geral:** ${checked}/${total} itens verificados (${pct}% de conformidade)\n\n`;
    report += `## Status dos ${total} Pilares de Segurança\n\n`;

    SECURITY_CHECKLIST_DATA.forEach((item) => {
      const isDone = this.checkedRules.has(item.id);
      const mark = isDone ? '[x]' : '[ ]';
      report += `- ${mark} **${item.name}** [${item.severity}] — *${item.categoryLabel}*\n`;
      if (!isDone) {
        report += `  - ⚠️ *Pendente de verificação*: ${item.concept}\n`;
      }
    });

    report += `\n---\n*Gerado via Guia do Programador — Revisão de Segurança Web*\n`;

    navigator.clipboard.writeText(report).then(() => {
      this.showToast('📋 Relatório em Markdown copiado para a área de transferência!');
    }).catch(() => {
      this.showToast('Erro ao copiar relatório. Permissão de clipboard negada.');
    });
  }

  private showToast(message: string): void {
    if (!this.toastElement) return;
    this.toastElement.textContent = message;
    this.toastElement.classList.add('is-visible');
    setTimeout(() => {
      this.toastElement?.classList.remove('is-visible');
    }, 3500);
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
  new SecurityApp();
});
