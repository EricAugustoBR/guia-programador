import {
  AUDIT_CATEGORIES,
  AUDIT_PROMPTS_DATA,
  AUDIT_GUIDE_SECTIONS,
  AuditCategory,
  RiskLevel
} from './data/auditoria';

class SystemAuditApp {
  private activeCategory: AuditCategory = 'all';
  private searchQuery: string = '';
  private auditedItems: Set<string> = new Set();
  private isLightMode: boolean = false;

  // DOM Elements
  private themeToggleBtn = document.getElementById('theme-toggle-btn') as HTMLButtonElement;
  private backToTopBtn = document.getElementById('back-to-top') as HTMLButtonElement;
  private searchInput = document.getElementById('search-input') as HTMLInputElement;
  private pillsContainer = document.getElementById('audit-category-pills') as HTMLElement;
  private promptsContainer = document.getElementById('prompts-list') as HTMLElement;
  private guidesContainer = document.getElementById('guides-list') as HTMLElement;
  private progressFill = document.getElementById('progress-bar-fill') as HTMLElement;
  private progressStat = document.getElementById('progress-stat') as HTMLElement;
  private celebrateBanner = document.getElementById('celebrate-banner') as HTMLElement;
  private resetBtn = document.getElementById('btn-reset-audited') as HTMLButtonElement;
  private toastElement = document.getElementById('audit-toast') as HTMLElement;

  constructor() {
    this.initTheme();
    this.loadSavedAudited();
    this.setupEventListeners();
    this.renderCategoryPills();
    this.renderPrompts();
    this.renderGuides();
    this.updateProgress();
  }

  // --- TEMA CLARO / ESCURO ---
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

  // --- PERSISTÊNCIA DO CHECKLIST ---
  private loadSavedAudited(): void {
    try {
      const saved = localStorage.getItem('guia-auditoria-checked');
      if (saved) {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr)) {
          this.auditedItems = new Set(arr);
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar itens auditados do localStorage', e);
    }
  }

  private saveAudited(): void {
    localStorage.setItem(
      'guia-auditoria-checked',
      JSON.stringify(Array.from(this.auditedItems))
    );
  }

  public toggleAudited(id: string): void {
    if (this.auditedItems.has(id)) {
      this.auditedItems.delete(id);
    } else {
      this.auditedItems.add(id);
    }
    this.saveAudited();
    this.updateProgress();

    const card = document.getElementById(`audit-card-${id}`);
    if (card) {
      const isChecked = this.auditedItems.has(id);
      card.classList.toggle('is-audited', isChecked);
      const btn = card.querySelector('.btn-toggle-audited') as HTMLButtonElement;
      if (btn) {
        btn.classList.toggle('is-checked', isChecked);
        btn.innerHTML = isChecked
          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Auditado`
          : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Marcar como Auditado`;
      }
    }
  }

  private resetAudited(): void {
    if (!confirm('Deseja realmente desmarcar todas as auditorias concluídas?')) return;
    this.auditedItems.clear();
    this.saveAudited();
    this.updateProgress();

    document.querySelectorAll('.audit-card').forEach((card) => {
      card.classList.remove('is-audited');
      const btn = card.querySelector('.btn-toggle-audited');
      if (btn) {
        btn.classList.remove('is-checked');
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Marcar como Auditado`;
      }
    });
  }

  // --- PROGRESSO GERAL ---
  private getTotalItemsCount(): number {
    const totalPrompts = AUDIT_PROMPTS_DATA.length;
    const totalGuideItems = AUDIT_GUIDE_SECTIONS.reduce(
      (acc, sec) => acc + sec.items.length,
      0
    );
    return totalPrompts + totalGuideItems;
  }

  private updateProgress(): void {
    const total = this.getTotalItemsCount();
    const completed = this.auditedItems.size;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    if (this.progressStat) {
      this.progressStat.textContent = `${completed} de ${total} verificados (${percentage}%)`;
    }
    if (this.progressFill) {
      this.progressFill.style.width = `${percentage}%`;
    }
    if (this.celebrateBanner) {
      this.celebrateBanner.classList.toggle('is-active', percentage === 100);
    }
  }

  // --- NOTIFICAÇÃO TOAST ---
  private showToast(message: string): void {
    if (!this.toastElement) return;
    this.toastElement.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span>${this.escapeHtml(message)}</span>
    `;
    this.toastElement.classList.add('show');
    setTimeout(() => {
      this.toastElement.classList.remove('show');
    }, 3200);
  }

  // --- COPIAR TEXTO ---
  public copyPromptToClipboard(text: string, buttonElement?: HTMLButtonElement): void {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        this.showToast('Prompt copiado! Cole na sua IA (ChatGPT, Claude, Cursor ou Copilot).');
        if (buttonElement) {
          const originalHtml = buttonElement.innerHTML;
          buttonElement.classList.add('copied');
          buttonElement.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copiado!`;
          setTimeout(() => {
            buttonElement.classList.remove('copied');
            buttonElement.innerHTML = originalHtml;
          }, 2000);
        }
      })
      .catch((err) => {
        console.error('Falha ao copiar prompt:', err);
        alert('Não foi possível copiar automaticamente para a área de transferência.');
      });
  }

  // --- FILTROS E BUSCA ---
  private setupEventListeners(): void {
    this.themeToggleBtn?.addEventListener('click', () => this.toggleTheme());
    this.resetBtn?.addEventListener('click', () => this.resetAudited());

    this.searchInput?.addEventListener('input', (e) => {
      this.searchQuery = (e.target as HTMLInputElement).value.trim().toLowerCase();
      this.applyFilters();
    });

    // Voltar ao topo
    window.addEventListener('scroll', () => {
      if (this.backToTopBtn) {
        if (window.scrollY > 400) {
          this.backToTopBtn.classList.add('is-visible');
        } else {
          this.backToTopBtn.classList.remove('is-visible');
        }
      }
    });

    this.backToTopBtn?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  private renderCategoryPills(): void {
    if (!this.pillsContainer) return;
    this.pillsContainer.innerHTML = '';

    AUDIT_CATEGORIES.forEach((cat) => {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = `audit-pill ${cat.id === this.activeCategory ? 'is-active' : ''}`;
      pill.setAttribute('data-category', cat.id);

      let count = 0;
      if (cat.id === 'all') {
        count = this.getTotalItemsCount();
      } else if (cat.id === 'prompts') {
        count = AUDIT_PROMPTS_DATA.length;
      } else {
        const sec = AUDIT_GUIDE_SECTIONS.find((s) => s.category === cat.id);
        count = sec ? sec.items.length : 0;
      }

      pill.innerHTML = `
        ${cat.iconSvg}
        <span>${cat.label}</span>
        <span class="audit-pill-count">${count}</span>
      `;

      pill.addEventListener('click', () => {
        this.activeCategory = cat.id;
        document.querySelectorAll('.audit-pill').forEach((p) => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        this.applyFilters();
      });

      this.pillsContainer.appendChild(pill);
    });
  }

  private applyFilters(): void {
    const isPromptsCategory = this.activeCategory === 'all' || this.activeCategory === 'prompts';

    // Prompts section visibility
    const promptsSection = document.getElementById('section-o-que-auditar');
    if (promptsSection) {
      promptsSection.style.display = isPromptsCategory ? 'block' : 'none';
    }

    // Filter individual prompt cards
    let visiblePromptsCount = 0;
    AUDIT_PROMPTS_DATA.forEach((prompt) => {
      const card = document.getElementById(`audit-card-${prompt.id}`);
      if (!card) return;

      const matchesSearch =
        this.searchQuery === '' ||
        prompt.title.toLowerCase().includes(this.searchQuery) ||
        prompt.conceptOneLiner.toLowerCase().includes(this.searchQuery) ||
        prompt.whyItMatters.toLowerCase().includes(this.searchQuery) ||
        prompt.promptText.toLowerCase().includes(this.searchQuery) ||
        prompt.commonTraps.some((t) => t.toLowerCase().includes(this.searchQuery));

      const visible = isPromptsCategory && matchesSearch;
      card.style.display = visible ? 'flex' : 'none';
      if (visible) visiblePromptsCount++;
    });

    // Como auditar sections visibility
    AUDIT_GUIDE_SECTIONS.forEach((section) => {
      const sectionContainer = document.getElementById(`section-guide-${section.id}`);
      if (!sectionContainer) return;

      const matchesCategory =
        this.activeCategory === 'all' || this.activeCategory === section.category;

      let sectionVisibleCount = 0;
      section.items.forEach((item) => {
        const card = document.getElementById(`audit-card-${item.id}`);
        if (!card) return;

        const matchesSearch =
          this.searchQuery === '' ||
          item.title.toLowerCase().includes(this.searchQuery) ||
          item.whatToLookFor.toLowerCase().includes(this.searchQuery) ||
          item.realRisk.toLowerCase().includes(this.searchQuery) ||
          (item.goldenRule && item.goldenRule.toLowerCase().includes(this.searchQuery)) ||
          (item.mnemonicTip && item.mnemonicTip.toLowerCase().includes(this.searchQuery));

        const visible = matchesCategory && matchesSearch;
        card.style.display = visible ? 'flex' : 'none';
        if (visible) sectionVisibleCount++;
      });

      // Master prompt search match (if present in section B)
      const masterPromptBox = sectionContainer.querySelector('.audit-master-prompt-box') as HTMLElement;
      if (masterPromptBox && section.unifiedPrompt) {
        const matchesMaster =
          this.searchQuery === '' ||
          section.unifiedPrompt.title.toLowerCase().includes(this.searchQuery) ||
          section.unifiedPrompt.promptText.toLowerCase().includes(this.searchQuery);
        masterPromptBox.style.display = matchesCategory && matchesMaster ? 'flex' : 'none';
      }

      sectionContainer.style.display =
        matchesCategory && (sectionVisibleCount > 0 || this.searchQuery === '')
          ? 'block'
          : 'none';
    });

    const guidesSectionMain = document.getElementById('section-como-auditar');
    if (guidesSectionMain) {
      const anyGuideVisible =
        this.activeCategory === 'all' || this.activeCategory !== 'prompts';
      guidesSectionMain.style.display = anyGuideVisible ? 'block' : 'none';
    }
  }

  // --- RENDERIZAÇÃO DOS CARDS DE PROMPTS ---
  private renderPrompts(): void {
    if (!this.promptsContainer) return;
    this.promptsContainer.innerHTML = '';

    AUDIT_PROMPTS_DATA.forEach((item) => {
      const isChecked = this.auditedItems.has(item.id);
      const card = document.createElement('article');
      card.className = `audit-card ${isChecked ? 'is-audited' : ''}`;
      card.id = `audit-card-${item.id}`;

      card.innerHTML = `
        <div class="audit-card-top">
          <div class="audit-card-meta">
            <span class="audit-index-badge">#${item.number}</span>
            <span class="audit-risk-badge risk-${item.riskLevel}">${this.getRiskBadgeText(item.riskLevel)}</span>
          </div>
          <button type="button" class="btn-toggle-audited ${isChecked ? 'is-checked' : ''}" data-id="${item.id}">
            ${
              isChecked
                ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Auditado`
                : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Marcar como Auditado`
            }
          </button>
        </div>

        <h3 class="audit-card-title">${this.escapeHtml(item.title)}</h3>

        <div class="audit-one-liner">
          <strong>Conceito:</strong> ${this.escapeHtml(item.conceptOneLiner)}
        </div>

        <div class="audit-why-matters">
          <strong>Por que importa?</strong> ${this.escapeHtml(item.whyItMatters)}
        </div>

        <!-- Prompt de IA Pronto para Uso -->
        <div class="audit-prompt-box">
          <div class="audit-prompt-header">
            <span class="audit-prompt-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Prompt Pronto para IA / Auditor
            </span>
            <button type="button" class="btn-copy-prompt" data-prompt-id="${item.id}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              Copiar Prompt
            </button>
          </div>
          <div class="audit-prompt-content">${this.escapeHtml(item.promptText)}</div>
        </div>

        <!-- Armadilhas comuns -->
        <div class="audit-detail-box">
          <div class="audit-detail-title" style="color: #ef4444;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Pegadinhas & Armadilhas Comuns
          </div>
          <ul style="margin: 0.25rem 0 0 1.25rem; font-size: 0.84rem; color: var(--text-muted); line-height: 1.45;">
            ${item.commonTraps.map((trap) => `<li>${this.escapeHtml(trap)}</li>`).join('')}
          </ul>
        </div>

        <!-- Código Comparativo -->
        <div class="audit-code-comparison">
          <div class="audit-code-block audit-code-block-bad">
            <div class="audit-code-header audit-code-header-bad">
              ✕ Código Vulnerável / Anti-Padrão
            </div>
            <pre class="audit-code-body"><code>${this.escapeHtml(item.codeExample.badSnippet)}</code></pre>
            <div class="audit-code-note">${this.escapeHtml(item.codeExample.badExplanation)}</div>
          </div>

          <div class="audit-code-block audit-code-block-good">
            <div class="audit-code-header audit-code-header-good">
              ✓ Padrão Seguro / Código Auditado
            </div>
            <pre class="audit-code-body"><code>${this.escapeHtml(item.codeExample.goodSnippet)}</code></pre>
            <div class="audit-code-note">${this.escapeHtml(item.codeExample.goodExplanation)}</div>
          </div>
        </div>
      `;

      // Event listener para botão de marcar auditado
      const toggleBtn = card.querySelector('.btn-toggle-audited') as HTMLButtonElement;
      toggleBtn?.addEventListener('click', () => this.toggleAudited(item.id));

      // Event listener para botão de copiar prompt
      const copyBtn = card.querySelector('.btn-copy-prompt') as HTMLButtonElement;
      copyBtn?.addEventListener('click', () => {
        this.copyPromptToClipboard(item.promptText, copyBtn);
      });

      this.promptsContainer.appendChild(card);
    });
  }

  // --- RENDERIZAÇÃO DOS GUIAS TÉCNICOS ---
  private renderGuides(): void {
    if (!this.guidesContainer) return;
    this.guidesContainer.innerHTML = '';

    AUDIT_GUIDE_SECTIONS.forEach((section) => {
      const sectionContainer = document.createElement('section');
      sectionContainer.id = `section-guide-${section.id}`;
      sectionContainer.className = 'audit-guide-section-block';
      sectionContainer.style.marginBottom = '3rem';

      // Header da subseção
      let sectionHtml = `
        <div class="audit-section-header">
          <span class="audit-section-tag">
            ${section.iconSvg}
            Subseção ${section.sectionLetter}
          </span>
          <h3 class="audit-section-title">${this.escapeHtml(section.sectionTitle)}</h3>
          <p class="audit-section-subtitle">${this.escapeHtml(section.description)}</p>
        </div>
      `;

      // Se houver prompt mestre unificado (ex: Checklist Estático)
      if (section.unifiedPrompt) {
        sectionHtml += `
          <div class="audit-master-prompt-box">
            <div class="audit-master-header">
              <div class="audit-master-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--brand-primary);"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span>${this.escapeHtml(section.unifiedPrompt.title)}</span>
              </div>
              <button type="button" class="btn-copy-prompt btn-copy-master" data-section="${section.id}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                Copiar Prompt Mestre de Arquivo Único
              </button>
            </div>
            <div class="audit-prompt-content" style="max-height: 220px; background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); padding: 0.75rem;">${this.escapeHtml(
              section.unifiedPrompt.promptText
            )}</div>
          </div>
        `;
      }

      sectionHtml += `<div class="audit-cards-grid" id="grid-${section.id}"></div>`;
      sectionContainer.innerHTML = sectionHtml;

      // Event listener para botão do prompt mestre
      if (section.unifiedPrompt) {
        const masterCopyBtn = sectionContainer.querySelector('.btn-copy-master') as HTMLButtonElement;
        masterCopyBtn?.addEventListener('click', () => {
          this.copyPromptToClipboard(section.unifiedPrompt!.promptText, masterCopyBtn);
        });
      }

      const grid = sectionContainer.querySelector(`#grid-${section.id}`) as HTMLElement;

      // Renderiza cada item da subseção
      section.items.forEach((item) => {
        const isChecked = this.auditedItems.has(item.id);
        const card = document.createElement('article');
        card.className = `audit-card ${isChecked ? 'is-audited' : ''}`;
        card.id = `audit-card-${item.id}`;

        let codeHtml = '';
        if (item.badCode && item.goodCode) {
          codeHtml = `
            <div class="audit-code-comparison">
              <div class="audit-code-block audit-code-block-bad">
                <div class="audit-code-header audit-code-header-bad">✕ O que NÃO fazer / Código Suspeito</div>
                <pre class="audit-code-body"><code>${this.escapeHtml(item.badCode)}</code></pre>
              </div>
              <div class="audit-code-block audit-code-block-good">
                <div class="audit-code-header audit-code-header-good">✓ Padrão Recomendado / Código Seguro</div>
                <pre class="audit-code-body"><code>${this.escapeHtml(item.goodCode)}</code></pre>
              </div>
            </div>
          `;
        }

        let mnemonicHtml = '';
        if (item.mnemonicTip) {
          mnemonicHtml = `
            <div class="audit-mnemonic-box">
              <svg class="audit-mnemonic-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              <span><strong>Fixação Rápida:</strong> ${this.escapeHtml(item.mnemonicTip)}</span>
            </div>
          `;
        }

        let goldenRuleHtml = '';
        if (item.goldenRule) {
          goldenRuleHtml = `
            <div class="audit-detail-box" style="border-left: 3px solid #10b981;">
              <div class="audit-detail-title" style="color: #10b981;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Regra de Ouro
              </div>
              <div class="audit-detail-desc" style="color: var(--text-main); font-weight: 500;">${this.escapeHtml(
                item.goldenRule
              )}</div>
            </div>
          `;
        }

        card.innerHTML = `
          <div class="audit-card-top">
            <div class="audit-card-meta">
              <span class="audit-index-badge">${item.index}</span>
              <span class="audit-risk-badge risk-${item.riskLevel}">${this.getRiskBadgeText(item.riskLevel)}</span>
            </div>
            <button type="button" class="btn-toggle-audited ${isChecked ? 'is-checked' : ''}" data-id="${item.id}">
              ${
                isChecked
                  ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Auditado`
                  : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Marcar como Auditado`
              }
            </button>
          </div>

          <h4 class="audit-card-title">${this.escapeHtml(item.title)}</h4>

          <div class="audit-details-grid">
            <div class="audit-detail-box">
              <div class="audit-detail-title" style="color: var(--brand-primary);">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                O Que Procurar no Código
              </div>
              <div class="audit-detail-desc">${this.escapeHtml(item.whatToLookFor)}</div>
            </div>

            <div class="audit-detail-box">
              <div class="audit-detail-title" style="color: #ef4444;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                Risco Real em Produção
              </div>
              <div class="audit-detail-desc">${this.escapeHtml(item.realRisk)}</div>
            </div>
          </div>

          ${goldenRuleHtml}
          ${codeHtml}
          ${mnemonicHtml}
        `;

        const toggleBtn = card.querySelector('.btn-toggle-audited') as HTMLButtonElement;
        toggleBtn?.addEventListener('click', () => this.toggleAudited(item.id));

        grid.appendChild(card);
      });

      this.guidesContainer.appendChild(sectionContainer);
    });
  }

  // --- HELPERS ---
  private getRiskBadgeText(risk: RiskLevel): string {
    switch (risk) {
      case 'critico':
        return 'Risco Crítico';
      case 'alto':
        return 'Risco Alto';
      case 'medio':
        return 'Risco Médio';
      default:
        return 'Risco Baixo';
    }
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Inicializa a aplicação ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
  new SystemAuditApp();
});
