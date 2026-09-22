import {
  SOLID_PRINCIPLES_DATA,
  SOLID_QUIZ_DATA,
  SolidPrincipleItem
} from './data/solid';

class SolidPrinciplesApp {
  private activeFilter: string = 'all';
  private searchQuery: string = '';
  private masteredPrinciples: Set<string> = new Set();
  private quizAnswers: Map<string, string> = new Map(); // quizId -> selectedOptionLetter
  private isLightMode: boolean = false;

  // DOM Elements
  private themeToggleBtn = document.getElementById('theme-toggle-btn') as HTMLButtonElement;
  private backToTopBtn = document.getElementById('back-to-top') as HTMLButtonElement;
  private searchInput = document.getElementById('search-input') as HTMLInputElement;
  private filterPillsContainer = document.getElementById('solid-filter-pills') as HTMLElement;
  private cardsContainer = document.getElementById('solid-principles-list') as HTMLElement;
  private progressFill = document.getElementById('progress-bar-fill') as HTMLElement;
  private progressStat = document.getElementById('progress-stat') as HTMLElement;
  private quizContainer = document.getElementById('quiz-questions-list') as HTMLElement;
  private resetChecklistBtn = document.getElementById('btn-reset-mastered') as HTMLButtonElement;

  constructor() {
    this.initTheme();
    this.loadSavedMastery();
    this.setupEventListeners();
    this.renderFilterPills();
    this.renderCards();
    this.renderQuiz();
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

  private loadSavedMastery(): void {
    try {
      const saved = localStorage.getItem('guia-solid-mastered');
      if (saved) {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr)) {
          this.masteredPrinciples = new Set(arr);
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar progresso S.O.L.I.D.', e);
    }
  }

  private saveMastery(): void {
    localStorage.setItem(
      'guia-solid-mastered',
      JSON.stringify(Array.from(this.masteredPrinciples))
    );
  }

  public toggleMastery(id: string): void {
    if (this.masteredPrinciples.has(id)) {
      this.masteredPrinciples.delete(id);
    } else {
      this.masteredPrinciples.add(id);
    }
    this.saveMastery();
    this.updateProgress();

    const card = document.getElementById(`solid-card-${id}`);
    if (card) {
      const isMastered = this.masteredPrinciples.has(id);
      card.classList.toggle('is-mastered', isMastered);
      const btn = card.querySelector('.solid-mastered-btn') as HTMLElement;
      if (btn) {
        btn.innerHTML = isMastered
          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Dominado`
          : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Marcar como Dominado`;
      }
    }
  }

  private updateProgress(): void {
    const total = SOLID_PRINCIPLES_DATA.length;
    const mastered = this.masteredPrinciples.size;
    const pct = Math.round((mastered / total) * 100);

    if (this.progressFill) {
      this.progressFill.style.width = `${pct}%`;
    }
    if (this.progressStat) {
      this.progressStat.textContent = `${mastered} de ${total} dominados (${pct}%)`;
    }
  }

  private setupEventListeners(): void {
    this.themeToggleBtn?.addEventListener('click', () => this.toggleTheme());

    this.searchInput?.addEventListener('input', (e) => {
      this.searchQuery = (e.target as HTMLInputElement).value.trim().toLowerCase();
      this.renderCards();
    });

    this.resetChecklistBtn?.addEventListener('click', () => {
      if (this.masteredPrinciples.size === 0) return;
      if (confirm('Deseja zerar o progresso dos princípios dominados?')) {
        this.masteredPrinciples.clear();
        this.saveMastery();
        this.updateProgress();
        this.renderCards();
      }
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

    // Delegate copy snippet buttons
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const copyBtn = target.closest('.solid-copy-btn') as HTMLButtonElement;
      if (copyBtn) {
        const targetId = copyBtn.getAttribute('data-code-target');
        if (targetId) {
          const preElement = document.getElementById(targetId);
          if (preElement) {
            navigator.clipboard.writeText(preElement.innerText).then(() => {
              const originalText = copyBtn.innerText;
              copyBtn.innerText = '✓ Copiado!';
              setTimeout(() => {
                copyBtn.innerText = originalText;
              }, 1800);
            });
          }
        }
      }
    });

    // Handle acronym strip clicks
    document.querySelectorAll('.acronym-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const letter = (card as HTMLElement).getAttribute('data-letter');
        if (letter) {
          this.activeFilter = letter;
          this.renderFilterPills();
          this.renderCards();
          const targetCard = document.getElementById(`solid-card-${letter.toLowerCase()}rp`) ||
                             document.getElementById(`solid-card-${letter.toLowerCase()}cp`) ||
                             document.getElementById(`solid-card-${letter.toLowerCase()}sp`) ||
                             document.getElementById(`solid-card-${letter.toLowerCase()}ip`);
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
    });
  }

  private renderFilterPills(): void {
    if (!this.filterPillsContainer) return;
    this.filterPillsContainer.innerHTML = '';

    const filters = [
      { id: 'all', label: 'Todos os Princípios (5)' },
      { id: 'S', label: 'S — Responsabilidade Única' },
      { id: 'O', label: 'O — Aberto / Fechado' },
      { id: 'L', label: 'L — Substituição de Liskov' },
      { id: 'I', label: 'I — Segregação de Interfaces' },
      { id: 'D', label: 'D — Inversão de Dependência' }
    ];

    filters.forEach((f) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `solid-pill ${this.activeFilter === f.id ? 'is-active' : ''}`;
      btn.textContent = f.label;
      btn.addEventListener('click', () => {
        this.activeFilter = f.id;
        this.renderFilterPills();
        this.renderCards();
      });
      this.filterPillsContainer.appendChild(btn);
    });
  }

  private getFilteredPrinciples(): readonly SolidPrincipleItem[] {
    return SOLID_PRINCIPLES_DATA.filter((item) => {
      const matchesFilter = this.activeFilter === 'all' || item.letter === this.activeFilter;
      const matchesSearch =
        !this.searchQuery ||
        item.name.toLowerCase().includes(this.searchQuery) ||
        item.portugueseTitle.toLowerCase().includes(this.searchQuery) ||
        item.oneLiner.toLowerCase().includes(this.searchQuery) ||
        item.realWorldAnalogy.title.toLowerCase().includes(this.searchQuery) ||
        item.realWorldAnalogy.description.toLowerCase().includes(this.searchQuery) ||
        item.mnemonic.toLowerCase().includes(this.searchQuery);

      return matchesFilter && matchesSearch;
    });
  }

  private renderCards(): void {
    if (!this.cardsContainer) return;
    const items = this.getFilteredPrinciples();

    if (items.length === 0) {
      this.cardsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1.5rem; background: var(--bg-surface); border: 1px dashed var(--border-medium); border-radius: var(--radius-lg);">
          <p style="font-size: 1.1rem; font-weight: 600; color: var(--text-primary);">Nenhum princípio encontrado</p>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">Tente buscar por termos como "responsabilidade", "liskov", "tomada", "aberto" ou limpe o filtro.</p>
        </div>
      `;
      return;
    }

    this.cardsContainer.innerHTML = items
      .map((item) => {
        const isMastered = this.masteredPrinciples.has(item.id);
        const badSnippetId = `code-bad-${item.id}`;
        const goodSnippetId = `code-good-${item.id}`;

        return `
        <article class="solid-card ${isMastered ? 'is-mastered' : ''}" id="solid-card-${item.id}">
          <!-- Header -->
          <header class="solid-card-header">
            <div class="solid-header-left">
              <div class="solid-letter-circle color-${item.tagColor}">
                ${item.letter}
              </div>
              <div class="solid-title-block">
                <h2 class="solid-title-original">${item.name}</h2>
                <span class="solid-title-pt">${item.portugueseTitle}</span>
              </div>
            </div>

            <button
              type="button"
              class="solid-mastered-btn"
              onclick="window.__solidApp.toggleMastery('${item.id}')"
              aria-label="Marcar princípio como dominado"
            >
              ${
                isMastered
                  ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Dominado`
                  : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Marcar como Dominado`
              }
            </button>
          </header>

          <!-- Body -->
          <div class="solid-card-body">
            <!-- Conceito em 1 frase -->
            <div class="solid-one-liner">
              ${item.oneLiner}
            </div>

            <!-- Analogia do Dia a Dia -->
            <div class="solid-analogy-box">
              <div class="solid-analogy-icon">
                ${item.realWorldAnalogy.iconSvg}
              </div>
              <div class="solid-analogy-content">
                <div class="solid-analogy-title">
                  <span>${item.realWorldAnalogy.title}</span>
                  <span class="solid-analogy-title-tag">Analogia da Vida Real</span>
                </div>
                <p class="solid-analogy-desc">${item.realWorldAnalogy.description}</p>
              </div>
            </div>

            <!-- Por que importa -->
            <div class="solid-why-box">
              <strong>💡 Por que isso evita dor de cabeça no trabalho?</strong>
              <p style="margin-top: 0.35rem;">${item.whyItMatters}</p>
            </div>

            <!-- Exemplos de Código Comparativos -->
            <div class="solid-code-grid">
              <!-- Código Ruim -->
              <div class="solid-code-card solid-code-card-bad">
                <div class="solid-code-header">
                  <span>${item.badCode.title}</span>
                  <button type="button" class="solid-copy-btn" data-code-target="${badSnippetId}">Copiar</button>
                </div>
                <pre id="${badSnippetId}"><code>${this.escapeHtml(item.badCode.code)}</code></pre>
                <div class="solid-code-footer-note">
                  <strong>Onde está o erro:</strong> ${item.badCode.explanation}
                </div>
              </div>

              <!-- Código Bom -->
              <div class="solid-code-card solid-code-card-good">
                <div class="solid-code-header">
                  <span>${item.goodCode.title}</span>
                  <button type="button" class="solid-copy-btn" data-code-target="${goodSnippetId}">Copiar</button>
                </div>
                <pre id="${goodSnippetId}"><code>${this.escapeHtml(item.goodCode.code)}</code></pre>
                <div class="solid-code-footer-note">
                  <strong>Como o SOLID resolve:</strong> ${item.goodCode.explanation}
                </div>
              </div>
            </div>
          </div>

          <!-- Rodapé com Armadilha e Mnemônico -->
          <footer class="solid-card-footer">
            <div class="solid-advice-item">
              <div class="solid-advice-tag tag-trap">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                Pegadinha de Iniciante
              </div>
              <div class="solid-advice-text">${item.beginnerTrap}</div>
            </div>

            <div class="solid-advice-item">
              <div class="solid-advice-tag tag-mnemonic">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                Mnemônico para Fixação
              </div>
              <div class="solid-advice-text">"${item.mnemonic}"</div>
            </div>
          </footer>
        </article>
      `;
      })
      .join('');
  }

  private renderQuiz(): void {
    if (!this.quizContainer) return;

    this.quizContainer.innerHTML = SOLID_QUIZ_DATA.map((quiz, index) => {
      const selectedOptionLetter = this.quizAnswers.get(quiz.id);
      const isAnswered = selectedOptionLetter !== undefined;

      return `
        <div class="quiz-item-card" id="quiz-card-${quiz.id}">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--brand-primary);">
              Desafio #${index + 1} de ${SOLID_QUIZ_DATA.length}
            </span>
          </div>

          <div class="quiz-scenario-box">
            <strong>📋 Situação no Trabalho:</strong> ${quiz.scenario}
          </div>

          <h3 class="quiz-question-title">${quiz.question}</h3>

          <div class="quiz-options-list">
            ${quiz.options
              .map((opt) => {
                let statusClass = '';
                if (isAnswered) {
                  if (opt.isCorrect) statusClass = 'is-correct';
                  else if (selectedOptionLetter === opt.letter) statusClass = 'is-wrong';
                }

                return `
                  <button
                    type="button"
                    class="quiz-option-btn ${statusClass}"
                    ${isAnswered ? 'disabled' : ''}
                    onclick="window.__solidApp.handleQuizOption('${quiz.id}', '${opt.letter}')"
                  >
                    <strong style="width: 20px; font-family: var(--font-mono);">${opt.letter})</strong>
                    <span>${opt.label}</span>
                  </button>
                `;
              })
              .join('')}
          </div>

          <div class="quiz-feedback-box ${isAnswered ? 'is-visible' : ''} ${
            isAnswered
              ? quiz.options.find((o) => o.letter === selectedOptionLetter)?.isCorrect
                ? 'is-correct-feedback'
                : 'is-wrong-feedback'
              : ''
          }">
            <strong>${
              isAnswered && quiz.options.find((o) => o.letter === selectedOptionLetter)?.isCorrect
                ? '🎉 Resposta Correta!'
                : '💡 Quase lá! Veja a explicação:'
            }</strong>
            <p style="margin-top: 0.35rem;">${quiz.explanation}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  public handleQuizOption(quizId: string, chosenLetter: string): void {
    if (this.quizAnswers.has(quizId)) return;
    this.quizAnswers.set(quizId, chosenLetter);
    this.renderQuiz();
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}

// Global hook for HTML event handlers
const app = new SolidPrinciplesApp();
(window as unknown as { __solidApp: SolidPrinciplesApp }).__solidApp = app;
