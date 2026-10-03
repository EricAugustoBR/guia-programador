/**
 * Gerenciador de navegação por seções e mega-dropdowns
 * Suporte a desktop hover com grace-period timer (sem perda de foco em gaps),
 * drawer mobile touch-friendly com sanfona/accordion individual, e acessibilidade WAI-ARIA.
 */

export function initNavigation(): void {
  const mobileToggle = document.getElementById('nav-mobile-toggle') as HTMLButtonElement | null;
  const navSections = document.getElementById('nav-sections') as HTMLElement | null;
  const dropdowns = Array.from(document.querySelectorAll<HTMLElement>('.nav-section-dropdown'));

  let desktopLeaveTimer: number | null = null;

  const isMobile = (): boolean => window.innerWidth < 992;

  // 1. Mobile Menu Toggle (Abrir/Fechar Gaveta)
  if (mobileToggle && navSections) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !navSections.classList.contains('is-mobile-open');

      navSections.classList.toggle('is-mobile-open', willOpen);
      mobileToggle.setAttribute('aria-expanded', String(willOpen));

      // No mobile, se abriu, expande apenas a seção da página atual (accordion)
      if (willOpen && isMobile()) {
        dropdowns.forEach((d) => {
          const hasCurrent = !!d.querySelector('.nav-mega-item.is-current');
          const trigger = d.querySelector<HTMLButtonElement>('.nav-section-trigger');
          if (hasCurrent) {
            d.classList.add('is-open');
            trigger?.setAttribute('aria-expanded', 'true');
          } else {
            d.classList.remove('is-open');
            trigger?.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });
  }

  // 2. Dropdowns Interativos (Desktop Hover + Mobile Accordion)
  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector<HTMLButtonElement>('.nav-section-trigger');
    const menu = dropdown.querySelector<HTMLElement>('.nav-mega-menu');

    // Identificar e marcar se este grupo contém a página atual
    const hasCurrentPage = !!dropdown.querySelector('.nav-mega-item.is-current');
    if (hasCurrentPage && trigger) {
      trigger.classList.add('is-active-section');
    }

    if (!trigger || !menu) return;

    // --- COMPORTAMENTO NO DESKTOP: HOVER COM TIMER GRACE-PERIOD ---
    dropdown.addEventListener('mouseenter', () => {
      if (isMobile()) return;

      if (desktopLeaveTimer) {
        window.clearTimeout(desktopLeaveTimer);
        desktopLeaveTimer = null;
      }

      // Fecha outros menus no desktop
      dropdowns.forEach((other) => {
        if (other !== dropdown) {
          other.classList.remove('is-open');
          other.querySelector<HTMLButtonElement>('.nav-section-trigger')?.setAttribute('aria-expanded', 'false');
        }
      });

      dropdown.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    });

    dropdown.addEventListener('mouseleave', () => {
      if (isMobile()) return;

      // Grace period de 180ms para evitar desaparecimento acidental ao atravessar o gap
      desktopLeaveTimer = window.setTimeout(() => {
        dropdown.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }, 180);
    });

    // --- COMPORTAMENTO NO CLICK (MOBILE SANFONA / DESKTOP TOGGLE) ---
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isCurrentlyOpen = dropdown.classList.contains('is-open');

      if (isMobile()) {
        // Sanfona no Mobile: apenas uma seção aberta por vez
        if (isCurrentlyOpen) {
          dropdown.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          dropdowns.forEach((other) => {
            other.classList.remove('is-open');
            other.querySelector<HTMLButtonElement>('.nav-section-trigger')?.setAttribute('aria-expanded', 'false');
          });
          dropdown.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      } else {
        // Desktop: Alternar trava
        if (isCurrentlyOpen) {
          dropdown.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          dropdowns.forEach((other) => {
            if (other !== dropdown) {
              other.classList.remove('is-open');
              other.querySelector<HTMLButtonElement>('.nav-section-trigger')?.setAttribute('aria-expanded', 'false');
            }
          });
          dropdown.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
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

  // 3. Fechar gaveta ao clicar em um link interno
  document.querySelectorAll<HTMLAnchorElement>('.nav-mega-item').forEach((link) => {
    link.addEventListener('click', () => {
      if (isMobile() && navSections && mobileToggle) {
        navSections.classList.remove('is-mobile-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // 4. Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    if (!target.closest('.nav-section-dropdown')) {
      dropdowns.forEach((d) => {
        d.classList.remove('is-open');
        d.querySelector<HTMLButtonElement>('.nav-section-trigger')?.setAttribute('aria-expanded', 'false');
      });
    }

    if (mobileToggle && navSections && !target.closest('.app-header')) {
      navSections.classList.remove('is-mobile-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // 5. Ao redimensionar para Desktop, limpa estado mobile
  window.addEventListener('resize', () => {
    if (!isMobile()) {
      if (navSections) navSections.classList.remove('is-mobile-open');
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
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
