// ============================================================================
// MAIN SCRIPT: TAREFAS DE AUDITORIA DO SISTEMA
// Guia do Programador — TypeScript Estrito & Componentes Nativos
// ============================================================================

import {
  AUDIT_CATEGORIES,
  AUDIT_BOOKS_DATA,
  AUDIT_TASKS_DATA,
  AUDIT_UNIFIED_CHECKLIST_DATA,
  AUDIT_GUIDE_SECTIONS,
  AuditCategory,
  AuditBookFoundation,
  AuditTaskItem
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
  private booksSection = document.getElementById('section-livros') as HTMLElement;
  private booksContainer = document.getElementById('books-list') as HTMLElement;
  private tasksSection = document.getElementById('section-tarefas-auditoria') as HTMLElement;
  private tasksContainer = document.getElementById('tasks-list') as HTMLElement;
  private unifiedSection = document.getElementById('section-checklist-unificado') as HTMLElement;
  private unifiedContainer = document.getElementById('unified-checklist-container') as HTMLElement;
  private guidesSection = document.getElementById('section-como-auditar') as HTMLElement;
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
    this.renderBooks();
    this.renderTasks();
    this.renderUnifiedChecklist();
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
    if (!confirm('Deseja realmente desmarcar todas as tarefas e auditorias concluídas?')) return;
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

  private updateProgress(): void {
    // Total de itens = 8 tarefas + todos os itens dos guias técnicos
    let totalItems = AUDIT_TASKS_DATA.length;
    AUDIT_GUIDE_SECTIONS.forEach((section) => {
      totalItems += section.items.length;
    });

    const checkedCount = this.auditedItems.size;
    const percentage = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

    if (this.progressStat) {
      this.progressStat.textContent = `${checkedCount} de ${totalItems} verificados (${percentage}%)`;
    }

    if (this.progressFill) {
      this.progressFill.style.width = `${percentage}%`;
    }

    if (this.celebrateBanner) {
      if (percentage === 100) {
        this.celebrateBanner.classList.add('is-active');
      } else {
        this.celebrateBanner.classList.remove('is-active');
      }
    }
  }

  // --- COPIAR PROMPT PARA O CLIPBOARD ---
  public async copyPrompt(promptText: string, btnElement: HTMLElement): Promise<void> {
    try {
      await navigator.clipboard.writeText(promptText);
      const originalHtml = btnElement.innerHTML;
      btnElement.classList.add('is-copied');
      btnElement.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Prompt Copiado!`;

      this.showToast('Prompt especializado copiado com sucesso! Cole na sua IA favorita.');

      setTimeout(() => {
        btnElement.classList.remove('is-copied');
        btnElement.innerHTML = originalHtml;
      }, 3000);
    } catch (err) {
      console.error('Falha ao copiar prompt', err);
      this.showToast('Erro ao copiar. Selecione o texto manualmente.');
    }
  }

  private showToast(msg: string): void {
    if (!this.toastElement) return;
    this.toastElement.textContent = msg;
    this.toastElement.classList.add('is-active');
    setTimeout(() => {
      this.toastElement.classList.remove('is-active');
    }, 3500);
  }

  // --- FILTROS POR PÍLULAS ---
  private renderCategoryPills(): void {
    if (!this.pillsContainer) return;
    this.pillsContainer.innerHTML = '';

    AUDIT_CATEGORIES.forEach((cat) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `audit-pill ${cat.id === this.activeCategory ? 'is-active' : ''}`;
      btn.dataset.category = cat.id;

      // Calcular contagem
      let count = 0;
      if (cat.id === 'all') {
        count = AUDIT_TASKS_DATA.length + AUDIT_GUIDE_SECTIONS.reduce((acc, s) => acc + s.items.length, 0);
      } else if (cat.id === 'livros') {
        count = AUDIT_BOOKS_DATA.length;
      } else if (cat.id === 'tarefas') {
        count = AUDIT_TASKS_DATA.length;
      } else if (cat.id === 'checklist-unificado') {
        count = 4; // 4 eixos
      } else {
        const guide = AUDIT_GUIDE_SECTIONS.find((g) => g.category === cat.id);
        if (guide) count = guide.items.length;
      }

      btn.innerHTML = `
        ${cat.iconSvg}
        <span>${cat.label}</span>
        <span class="audit-pill-count">${count}</span>
      `;

      btn.addEventListener('click', () => {
        this.activeCategory = cat.id;
        document.querySelectorAll('.audit-pill').forEach((p) => p.classList.remove('is-active'));
        btn.classList.add('is-active');
        this.filterAll();
      });

      this.pillsContainer.appendChild(btn);
    });
  }

  // --- RENDERIZAR FUNDAMENTOS DA LITERATURA CLÁSSICA ---
  private renderBooks(): void {
    if (!this.booksContainer) return;
    this.booksContainer.innerHTML = '';

    AUDIT_BOOKS_DATA.forEach((book: AuditBookFoundation) => {
      const card = document.createElement('article');
      card.className = 'audit-book-card';
      card.dataset.id = book.id;

      const pillarsHtml = book.pillars
        .map(
          (p) => `
        <div class="audit-book-pillar-item">
          <div class="audit-book-pillar-title">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            ${p.title}
          </div>
          <div class="audit-book-pillar-desc">${p.description}</div>
        </div>
      `
        )
        .join('');

      card.innerHTML = `
        <div class="audit-book-header">
          <div class="audit-book-avatar">${book.avatarSvg}</div>
          <div class="audit-book-meta">
            <span class="audit-book-author">${book.author}</span>
            <span class="audit-book-title">${book.bookTitle}</span>
          </div>
        </div>
        <span class="audit-book-badge">${book.badge}</span>
        <blockquote class="audit-book-quote">"${book.quote}"</blockquote>
        <div class="audit-book-pillars">${pillarsHtml}</div>
      `;

      this.booksContainer.appendChild(card);
    });
  }

  // --- RENDERIZAR AS 8 TAREFAS DE AUDITORIA ---
  private renderTasks(): void {
    if (!this.tasksContainer) return;
    this.tasksContainer.innerHTML = '';

    AUDIT_TASKS_DATA.forEach((task: AuditTaskItem) => {
      const card = document.createElement('article');
      const isAudited = this.auditedItems.has(task.id);
      card.className = `audit-card ${isAudited ? 'is-audited' : ''}`;
      card.id = `audit-card-${task.id}`;
      card.dataset.id = task.id;
      card.dataset.risk = task.riskLevel;

      const failureListHtml = task.failureCriteria
        .map((crit) => `<li>${crit}</li>`)
        .join('');

      card.innerHTML = `
        <div class="audit-card-top">
          <div class="audit-card-meta">
            <span class="audit-index-badge">Tarefa ${task.number}</span>
            <span class="audit-risk-badge risk-${task.riskLevel}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Risco ${task.riskLevel.toUpperCase()}
            </span>
          </div>

          <button
            type="button"
            class="btn-toggle-audited ${isAudited ? 'is-checked' : ''}"
            aria-label="Marcar tarefa ${task.number} como auditada"
          >
            ${
              isAudited
                ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Auditado`
                : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Marcar como Auditado`
            }
          </button>
        </div>

        <h3 class="audit-card-title">${task.title}</h3>

        <div class="audit-objective-box">
          <div class="audit-objective-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            Objetivo da Auditoria:
          </div>
          <div>${task.objective}</div>
        </div>

        <div class="audit-failure-criteria">
          <div class="audit-failure-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            Critérios de Reprovação (Violações):
          </div>
          <ul class="audit-failure-list">
            ${failureListHtml}
          </ul>
        </div>

        <div class="audit-prompt-box">
          <div class="audit-prompt-header">
            <span class="audit-prompt-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Prompt Especializado para IA (Tarefa ${task.number})
            </span>
            <button type="button" class="btn-copy-prompt" aria-label="Copiar prompt da tarefa ${task.number}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              Copiar Prompt
            </button>
          </div>
          <div class="audit-prompt-content">${this.escapeHtml(task.promptText)}</div>
        </div>

        <div class="audit-code-comparison">
          <div class="audit-code-block is-bad">
            <div class="audit-code-header is-bad">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              ✕ Exemplo Incorreto / Violação
            </div>
            <pre class="audit-code-pre"><code>${this.escapeHtml(task.codeExample.badSnippet)}</code></pre>
            <div class="audit-code-footer">${task.codeExample.badExplanation}</div>
          </div>

          <div class="audit-code-block is-good">
            <div class="audit-code-header is-good">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              ✓ Padrão Auditado / Conformidade
            </div>
            <pre class="audit-code-pre"><code>${this.escapeHtml(task.codeExample.goodSnippet)}</code></pre>
            <div class="audit-code-footer">${task.codeExample.goodExplanation}</div>
          </div>
        </div>

        <div class="audit-mnemonic-box">
          <span class="audit-mnemonic-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/><line x1="10" y1="22" x2="14" y2="22"/></svg>
          </span>
          <span><strong>Dica Mnemônica:</strong> ${task.mnemonicTip}</span>
        </div>
      `;

      // Evento de marcar como auditado
      const toggleBtn = card.querySelector('.btn-toggle-audited') as HTMLButtonElement;
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => this.toggleAudited(task.id));
      }

      // Evento de copiar prompt
      const copyBtn = card.querySelector('.btn-copy-prompt') as HTMLButtonElement;
      if (copyBtn) {
        copyBtn.addEventListener('click', () => this.copyPrompt(task.promptText, copyBtn));
      }

      this.tasksContainer.appendChild(card);
    });
  }

  // --- RENDERIZAR CHECKLIST TÉCNICO UNIFICADO (SEÇÃO B) ---
  private renderUnifiedChecklist(): void {
    if (!this.unifiedContainer) return;
    const data = AUDIT_UNIFIED_CHECKLIST_DATA;

    const axesHtml = data.axes
      .map(
        (axis) => `
      <div class="audit-axis-card">
        <div class="audit-axis-title">
          ${axis.iconSvg}
          ${axis.title}
        </div>
        <ul class="audit-axis-points">
          ${axis.points.map((p) => `<li>${p}</li>`).join('')}
        </ul>
      </div>
    `
      )
      .join('');

    const outputHtml = data.outputFormat
      .map(
        (out) => `
      <div class="audit-severity-pill">
        <span class="audit-severity-tag ${out.level.toLowerCase().replace(/[[\]]/g, '')}">${out.level}</span>
        <span>${out.description}</span>
      </div>
    `
      )
      .join('');

    this.unifiedContainer.innerHTML = `
      <div class="audit-unified-box">
        <div class="audit-unified-header">
          <div class="audit-unified-title-group">
            <h3 class="audit-unified-title">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--brand-primary);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              ${data.title}
            </h3>
            <p class="audit-unified-subtitle">${data.objective}</p>
          </div>
          <button type="button" class="btn-copy-prompt" id="btn-copy-unified-prompt" aria-label="Copiar Prompt Unificado">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copiar Prompt Unificado
          </button>
        </div>

        <div class="audit-axes-grid">${axesHtml}</div>

        <div class="audit-severity-legend">${outputHtml}</div>

        <div class="audit-prompt-box">
          <div class="audit-prompt-header">
            <span class="audit-prompt-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Prompt Completo por Arquivo (.NET / C#)
            </span>
          </div>
          <div class="audit-prompt-content">${this.escapeHtml(data.promptText)}</div>
        </div>
      </div>
    `;

    const copyBtn = document.getElementById('btn-copy-unified-prompt') as HTMLButtonElement;
    if (copyBtn) {
      copyBtn.addEventListener('click', () => this.copyPrompt(data.promptText, copyBtn));
    }
  }

  // --- RENDERIZAR GUIAS TÉCNICOS DETALHADOS (SEÇÃO C) ---
  private renderGuides(): void {
    if (!this.guidesContainer) return;
    this.guidesContainer.innerHTML = '';

    AUDIT_GUIDE_SECTIONS.forEach((section) => {
      const sectionEl = document.createElement('div');
      sectionEl.className = 'audit-guide-section';
      sectionEl.dataset.category = section.category;
      sectionEl.style.marginBottom = '3rem';

      const itemsHtml = section.items
        .map((item) => {
          const isAudited = this.auditedItems.has(item.id);

          const codeComparisonHtml =
            item.badCode && item.goodCode
              ? `
            <div class="audit-code-comparison" style="margin-top: 1rem;">
              <div class="audit-code-block is-bad">
                <div class="audit-code-header is-bad">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  ✕ Exemplo Incorreto / Anti-padrão
                </div>
                <pre class="audit-code-pre"><code>${this.escapeHtml(item.badCode)}</code></pre>
              </div>
              <div class="audit-code-block is-good">
                <div class="audit-code-header is-good">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  ✓ Padrão Seguro / Código Auditado
                </div>
                <pre class="audit-code-pre"><code>${this.escapeHtml(item.goodCode)}</code></pre>
              </div>
            </div>
          `
              : '';

          const mnemonicHtml = item.mnemonicTip
            ? `
            <div class="audit-mnemonic-box" style="margin-top: 0.75rem;">
              <span class="audit-mnemonic-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/><line x1="10" y1="22" x2="14" y2="22"/></svg>
              </span>
              <span><strong>Mnemônico:</strong> ${item.mnemonicTip}</span>
            </div>
          `
            : '';

          return `
            <article class="audit-card ${isAudited ? 'is-audited' : ''}" id="audit-card-${item.id}" data-id="${item.id}" data-risk="${item.riskLevel}" style="margin-bottom: 1.5rem;">
              <div class="audit-card-top">
                <div class="audit-card-meta">
                  <span class="audit-index-badge">${item.index}</span>
                  <span class="audit-risk-badge risk-${item.riskLevel}">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    Risco ${item.riskLevel.toUpperCase()}
                  </span>
                </div>
                <button
                  type="button"
                  class="btn-toggle-audited ${isAudited ? 'is-checked' : ''}"
                  data-audit-id="${item.id}"
                  aria-label="Marcar item ${item.index} como auditado"
                >
                  ${
                    isAudited
                      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Auditado`
                      : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Marcar como Auditado`
                  }
                </button>
              </div>

              <h4 class="audit-card-title">${item.title}</h4>

              <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.875rem; line-height: 1.5;">
                <div>
                  <strong style="color: var(--text-main);">🔍 O Que Procurar:</strong>
                  <span style="color: var(--text-muted);">${item.whatToLookFor}</span>
                </div>
                <div>
                  <strong style="color: #ef4444;">⚠️ Risco Real em Produção:</strong>
                  <span style="color: var(--text-muted);">${item.realRisk}</span>
                </div>
                ${
                  item.goldenRule
                    ? `
                  <div style="background: rgba(16, 185, 129, 0.08); border-left: 3px solid #10b981; padding: 0.5rem 0.75rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
                    <strong style="color: #10b981;">🛡️ Regra de Ouro:</strong>
                    <span style="color: var(--text-main); font-weight: 500;">${item.goldenRule}</span>
                  </div>
                `
                    : ''
                }
              </div>

              ${codeComparisonHtml}
              ${mnemonicHtml}
            </article>
          `;
        })
        .join('');

      sectionEl.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 1.25rem;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: var(--radius-md); background: rgba(99, 102, 241, 0.12); color: var(--brand-primary);">
            ${section.iconSvg}
          </div>
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-main);">${section.sectionTitle}</h3>
            <p style="font-size: 0.875rem; color: var(--text-muted);">${section.description}</p>
          </div>
        </div>
        <div class="audit-guide-items-grid">
          ${itemsHtml}
        </div>
      `;

      // Conectar eventos dos botões de auditar
      sectionEl.querySelectorAll('.btn-toggle-audited').forEach((btn) => {
        const auditId = (btn as HTMLElement).dataset.auditId;
        if (auditId) {
          btn.addEventListener('click', () => this.toggleAudited(auditId));
        }
      });

      this.guidesContainer.appendChild(sectionEl);
    });
  }

  // --- FILTRAGEM INTEGRADA (BUSCA + PÍLULAS) ---
  private filterAll(): void {
    const query = this.searchQuery.toLowerCase().trim();

    // 1. Seção de Livros
    if (this.booksSection) {
      const showBooks = this.activeCategory === 'all' || this.activeCategory === 'livros';
      if (!showBooks) {
        this.booksSection.style.display = 'none';
      } else {
        let anyBookVisible = false;
        document.querySelectorAll('.audit-book-card').forEach((el) => {
          const text = (el as HTMLElement).textContent?.toLowerCase() || '';
          const matches = !query || text.includes(query);
          (el as HTMLElement).style.display = matches ? 'flex' : 'none';
          if (matches) anyBookVisible = true;
        });
        this.booksSection.style.display = anyBookVisible ? 'block' : 'none';
      }
    }

    // 2. Seção das 8 Tarefas
    if (this.tasksSection) {
      const showTasks = this.activeCategory === 'all' || this.activeCategory === 'tarefas';
      if (!showTasks) {
        this.tasksSection.style.display = 'none';
      } else {
        let anyTaskVisible = false;
        document.querySelectorAll('#tasks-list .audit-card').forEach((el) => {
          const text = (el as HTMLElement).textContent?.toLowerCase() || '';
          const matches = !query || text.includes(query);
          (el as HTMLElement).style.display = matches ? 'flex' : 'none';
          if (matches) anyTaskVisible = true;
        });
        this.tasksSection.style.display = anyTaskVisible ? 'block' : 'none';
      }
    }

    // 3. Seção Checklist Unificado
    if (this.unifiedSection) {
      const showUnified = this.activeCategory === 'all' || this.activeCategory === 'checklist-unificado';
      if (!showUnified) {
        this.unifiedSection.style.display = 'none';
      } else {
        const text = this.unifiedContainer?.textContent?.toLowerCase() || '';
        const matches = !query || text.includes(query);
        this.unifiedSection.style.display = matches ? 'block' : 'none';
      }
    }

    // 4. Seção Guias Técnicos
    if (this.guidesSection) {
      const isGuideCategory = ['rbac', 'estatico', 'solid', 'imutabilidade', 'exclusao'].includes(
        this.activeCategory
      );
      const showGuides = this.activeCategory === 'all' || isGuideCategory;

      if (!showGuides) {
        this.guidesSection.style.display = 'none';
      } else {
        let anyGuideSectionVisible = false;
        document.querySelectorAll('.audit-guide-section').forEach((sec) => {
          const secCat = (sec as HTMLElement).dataset.category;
          const catMatches = this.activeCategory === 'all' || this.activeCategory === secCat;

          if (!catMatches) {
            (sec as HTMLElement).style.display = 'none';
          } else {
            let anyItemMatches = false;
            sec.querySelectorAll('.audit-card').forEach((card) => {
              const text = (card as HTMLElement).textContent?.toLowerCase() || '';
              const matches = !query || text.includes(query);
              (card as HTMLElement).style.display = matches ? 'flex' : 'none';
              if (matches) anyItemMatches = true;
            });
            (sec as HTMLElement).style.display = anyItemMatches ? 'block' : 'none';
            if (anyItemMatches) anyGuideSectionVisible = true;
          }
        });
        this.guidesSection.style.display = anyGuideSectionVisible ? 'block' : 'none';
      }
    }
  }

  // --- EVENT LISTENERS GERAIS ---
  private setupEventListeners(): void {
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    }

    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => this.resetAudited());
    }

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = (e.target as HTMLInputElement).value;
        this.filterAll();
      });
    }

    if (this.backToTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          this.backToTopBtn.classList.add('is-visible');
        } else {
          this.backToTopBtn.classList.remove('is-visible');
        }
      });

      this.backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
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

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', () => {
  new SystemAuditApp();
});
