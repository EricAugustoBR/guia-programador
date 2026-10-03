/**
 * Gerenciador de navegação por seções e mega-dropdowns
 * Suporte a acessibilidade (WAI-ARIA), eventos de teclado, touch e mobile toggle.
 */

export function initNavigation(): void {
  const mobileToggle = document.getElementById('nav-mobile-toggle') as HTMLButtonElement | null;
  const navSections = document.getElementById('nav-sections') as HTMLElement | null;
  const dropdowns = document.querySelectorAll<HTMLElement>('.nav-section-dropdown');

  // 1. Mobile Menu Toggle
  if (mobileToggle && navSections) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navSections.classList.toggle('is-mobile-open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // 2. Dropdowns Interativos (Click / Touch / Teclado)
  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector<HTMLButtonElement>('.nav-section-trigger');
    const menu = dropdown.querySelector<HTMLElement>('.nav-mega-menu');

    // Identificar se este grupo contém a página atual
    const hasCurrentPage = !!dropdown.querySelector('.nav-mega-item.is-current');
    if (hasCurrentPage && trigger) {
      trigger.classList.add('is-active-section');
    }

    if (!trigger || !menu) return;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isCurrentlyOpen = dropdown.classList.contains('is-open');

      // Fecha outros dropdowns abertos
      dropdowns.forEach((other) => {
        if (other !== dropdown) {
          other.classList.remove('is-open');
          const otherTrigger = other.querySelector<HTMLButtonElement>('.nav-section-trigger');
          otherTrigger?.setAttribute('aria-expanded', 'false');
        }
      });

      if (isCurrentlyOpen) {
        dropdown.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        dropdown.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    // Tecla Escape para fechar
    dropdown.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdown.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      }
    });
  });

  // 3. Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    if (!target.closest('.nav-section-dropdown')) {
      dropdowns.forEach((d) => {
        d.classList.remove('is-open');
        const trigger = d.querySelector<HTMLButtonElement>('.nav-section-trigger');
        trigger?.setAttribute('aria-expanded', 'false');
      });
    }

    if (mobileToggle && navSections && !target.closest('.app-header')) {
      navSections.classList.remove('is-mobile-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Auto-inicialização compatível com módulos
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
}
