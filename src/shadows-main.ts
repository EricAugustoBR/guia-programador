import {
  SHADOWS_DATA,
  SHADOW_CATEGORIES,
  SHADOW_PRESETS,
  ShadowCategory,
  ShadowItem,
  ShadowPreset
} from './data/shadows';

interface StudioState {
  readonly x: number;
  readonly y: number;
  readonly blur: number;
  readonly spread: number;
  readonly color: string;
  readonly opacity: number;
  readonly isInset: boolean;
  readonly activePresetId: string | null;
}

class ShadowsApp {
  private activeCategory: ShadowCategory = 'all';
  private searchQuery: string = '';
  private isLightMode: boolean = false;

  private studioState: StudioState = {
    x: 0,
    y: 8,
    blur: 24,
    spread: 0,
    color: '#000000',
    opacity: 35,
    isInset: false,
    activePresetId: 'clean-card'
  };

  // DOM Elements
  private themeToggleBtn = document.getElementById('theme-toggle-btn') as HTMLButtonElement | null;
  private backToTopBtn = document.getElementById('back-to-top') as HTMLButtonElement | null;
  private searchInput = document.getElementById('search-input') as HTMLInputElement | null;
  private categoryContainer = document.getElementById('category-pills') as HTMLElement | null;
  private cardsGrid = document.getElementById('shadows-grid') as HTMLElement | null;
  private resultsCount = document.getElementById('results-count') as HTMLElement | null;

  // Studio Elements
  private presetsContainer = document.getElementById('studio-presets-list') as HTMLElement | null;
  private sliderX = document.getElementById('slider-x') as HTMLInputElement | null;
  private sliderY = document.getElementById('slider-y') as HTMLInputElement | null;
  private sliderBlur = document.getElementById('slider-blur') as HTMLInputElement | null;
  private sliderSpread = document.getElementById('slider-spread') as HTMLInputElement | null;
  private sliderOpacity = document.getElementById('slider-opacity') as HTMLInputElement | null;
  private colorPicker = document.getElementById('color-picker') as HTMLInputElement | null;
  private checkboxInset = document.getElementById('checkbox-inset') as HTMLInputElement | null;

  private valBadgeX = document.getElementById('val-x') as HTMLElement | null;
  private valBadgeY = document.getElementById('val-y') as HTMLElement | null;
  private valBadgeBlur = document.getElementById('val-blur') as HTMLElement | null;
  private valBadgeSpread = document.getElementById('val-spread') as HTMLElement | null;
  private valBadgeOpacity = document.getElementById('val-opacity') as HTMLElement | null;

  private studioTargetBox = document.getElementById('studio-target-box') as HTMLElement | null;
  private studioCodeText = document.getElementById('studio-code-text') as HTMLElement | null;
  private btnCopyStudio = document.getElementById('btn-copy-studio') as HTMLButtonElement | null;

  constructor() {
    this.initTheme();
    this.setupEventListeners();
    this.initStudio();
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

  // --- STUDIO IMPLEMENTATION ---
  private initStudio(): void {
    this.renderPresets();
    this.bindStudioInputs();
    this.updateStudioUI();
  }

  private renderPresets(): void {
    const container = this.presetsContainer;
    if (!container) return;
    container.innerHTML = '';

    SHADOW_PRESETS.forEach((preset: ShadowPreset) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `preset-pill-btn ${this.studioState.activePresetId === preset.id ? 'is-active' : ''}`;
      btn.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg>
        <span>${preset.name}</span>
      `;

      btn.addEventListener('click', () => {
        this.applyPreset(preset);
      });

      container.appendChild(btn);
    });
  }

  private applyPreset(preset: ShadowPreset): void {
    // Immutability: create new state object
    this.studioState = {
      ...this.studioState,
      x: preset.x,
      y: preset.y,
      blur: preset.blur,
      spread: preset.spread,
      color: preset.color,
      opacity: preset.opacity,
      isInset: preset.isInset,
      activePresetId: preset.id
    };

    if (this.sliderX) this.sliderX.value = String(preset.x);
    if (this.sliderY) this.sliderY.value = String(preset.y);
    if (this.sliderBlur) this.sliderBlur.value = String(preset.blur);
    if (this.sliderSpread) this.sliderSpread.value = String(preset.spread);
    if (this.sliderOpacity) this.sliderOpacity.value = String(preset.opacity);
    if (this.colorPicker) this.colorPicker.value = preset.color;
    if (this.checkboxInset) this.checkboxInset.checked = preset.isInset;

    this.renderPresets();
    this.updateStudioUI(preset.cssValue);
  }

  private bindStudioInputs(): void {
    const onControlChange = () => {
      // Immutability: clone state with updated values
      this.studioState = {
        ...this.studioState,
        x: Number(this.sliderX?.value || 0),
        y: Number(this.sliderY?.value || 0),
        blur: Number(this.sliderBlur?.value || 0),
        spread: Number(this.sliderSpread?.value || 0),
        opacity: Number(this.sliderOpacity?.value || 35),
        color: this.colorPicker?.value || '#000000',
        isInset: Boolean(this.checkboxInset?.checked),
        activePresetId: null
      };

      this.renderPresets();
      this.updateStudioUI();
    };

    this.sliderX?.addEventListener('input', onControlChange);
    this.sliderY?.addEventListener('input', onControlChange);
    this.sliderBlur?.addEventListener('input', onControlChange);
    this.sliderSpread?.addEventListener('input', onControlChange);
    this.sliderOpacity?.addEventListener('input', onControlChange);
    this.colorPicker?.addEventListener('input', onControlChange);
    this.checkboxInset?.addEventListener('change', onControlChange);

    this.btnCopyStudio?.addEventListener('click', async () => {
      const code = this.studioCodeText?.textContent || '';
      try {
        await navigator.clipboard.writeText(code);
        const btnSpan = this.btnCopyStudio?.querySelector('span');
        if (btnSpan) {
          btnSpan.textContent = 'Copiado! ✓';
          setTimeout(() => (btnSpan.textContent = 'Copiar CSS'), 1500);
        }
      } catch (err) {
        console.warn('Erro ao copiar código do studio', err);
      }
    });
  }

  private hexToRgba(hex: string, opacityPercent: number): string {
    const cleanHex = hex.replace('#', '');
    let r = 0;
    let g = 0;
    let b = 0;

    if (cleanHex.length === 6) {
      r = parseInt(cleanHex.substring(0, 2), 16);
      g = parseInt(cleanHex.substring(2, 4), 16);
      b = parseInt(cleanHex.substring(4, 6), 16);
    } else if (cleanHex.length === 3) {
      r = parseInt(cleanHex[0] + cleanHex[0], 16);
      g = parseInt(cleanHex[1] + cleanHex[1], 16);
      b = parseInt(cleanHex[2] + cleanHex[2], 16);
    }

    const alpha = (opacityPercent / 100).toFixed(2);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  private updateStudioUI(customCss?: string): void {
    const { x, y, blur, spread, color, opacity, isInset } = this.studioState;

    if (this.valBadgeX) this.valBadgeX.textContent = `${x}px`;
    if (this.valBadgeY) this.valBadgeY.textContent = `${y}px`;
    if (this.valBadgeBlur) this.valBadgeBlur.textContent = `${blur}px`;
    if (this.valBadgeSpread) this.valBadgeSpread.textContent = `${spread}px`;
    if (this.valBadgeOpacity) this.valBadgeOpacity.textContent = `${opacity}%`;

    const rgbaColor = this.hexToRgba(color, opacity);
    const generatedBoxShadow = customCss
      ? customCss
      : `${isInset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${rgbaColor}`;

    if (this.studioTargetBox) {
      this.studioTargetBox.style.boxShadow = generatedBoxShadow;
    }

    if (this.studioCodeText) {
      this.studioCodeText.textContent = `box-shadow: ${generatedBoxShadow};`;
    }
  }

  // --- CATEGORIES & CARDS ---
  private renderCategoryPills(): void {
    const container = this.categoryContainer;
    if (!container) return;
    container.innerHTML = '';

    SHADOW_CATEGORIES.forEach((cat) => {
      const count =
        cat.id === 'all'
          ? SHADOWS_DATA.length
          : SHADOWS_DATA.filter((item) => item.category === cat.id).length;

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

  private getFilteredItems(): readonly ShadowItem[] {
    return SHADOWS_DATA.filter((item) => {
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
    const grid = this.cardsGrid;
    if (!grid) return;
    grid.innerHTML = '';

    const items = this.getFilteredItems();

    if (this.resultsCount) {
      this.resultsCount.textContent = `Mostrando ${items.length} de ${SHADOWS_DATA.length} técnicas de sombra e iluminação`;
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <p style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">Nenhuma técnica encontrada</p>
          <p style="font-size: 0.875rem;">Tente pesquisar por termos como "inset", "camadas", "lift", "rim", "glow", "neumorphism"...</p>
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
  new ShadowsApp();
});
