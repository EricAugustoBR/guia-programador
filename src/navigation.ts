/**
 * Gerenciador de navegação por seções e mega-dropdowns
 * Suporte a desktop hover com grace-period timer (sem perda de foco em gaps),
 * drawer mobile touch-friendly com sanfona/accordion, e acessibilidade WAI-ARIA.
 */

export function initNavigation(): void {
  const mobileToggle = document.getElementById('nav-mobile-toggle') as HTMLButtonElement | null;
  const navSections = document.getElementById('nav-sections') as HTMLElement | null;
  const dropdowns = Array.from(document.querySelectorAll<HTMLElement>('.nav-section-dropdown'));

  let desktopLeaveTimer: number | null = null;

  const isMobile = (): boolean => window.innerWidth < 992;

  // 1. Mobile Menu Toggle (Abrir/Fechar Drawer)
  if (mobileToggle && navSections) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !navSections.classList.contains('is-mobile-open');

      navSections.classList.toggle('is-mobile-open', willOpen);
      mobileToggle.setAttribute('aria-expanded', String(willOpen));
      document.body.classList.toggle('mobile-nav-active', willOpen);

      // No mobile, se abriu, expande por padrão a seção da página atual
      if (willOpen && isMobile()) {
        dropdowns.forEach((d) => {
          const hasCurrent = !!d.querySelector('.nav-mega-item.is-current');
          if (hasCurrent) {
            d.classList.add('is-open');
            d.querySelector<HTMLButtonElement>('.nav-section-trigger')?.setAttribute('aria-expanded', 'true');
          }
        });
      }
    });
  }

  // 2. Dropdowns Interativos (Desktop + Mobile)
  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector<HTMLButtonElement>('.nav-section-trigger');
    const menu = dropdown.querySelector<HTMLElement>('.nav-mega-menu');

    // Identificar e marcar se este grupo contém a página atual
    const hasCurrentPage = !!dropdown.querySelector('.nav-mega-item.is-current');
    if (hasCurrentPage && trigger) {
      trigger.classList.add('is-active-section');
    }

    if (!trigger || !menu) return;

    // --- COMPORTAMENTO NO DESKTOP: HOVER COM GRACE-PERIOD TIMER ---
    dropdown.addEventListener('mouseenter', () => {
      if (isMobile()) return;

      if (desktopLeaveTimer) {
        window.clearTimeout(desktopLeaveTimer);
        desktopLeaveTimer = null;
      }

      // Fecha outros menus abertos
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

      // Grace period de 180ms para permitir travessia suave pelo gap/mouse diagonal
      desktopLeaveTimer = window.setTimeout(() => {
        dropdown.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }, 180);
    });

    // --- COMPORTAMENTO NO CLICK (MOBILE ACCORDION & DESKTOP LOCK) ---
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isCurrentlyOpen = dropdown.classList.contains('is-open');

      if (isMobile()) {
        // Modo Sanfona no Mobile: abre/fecha individualmente
        if (isCurrentlyOpen) {
          dropdown.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
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

  // 3. Fechar ao clicar fora (ou fechar drawer mobile)
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
      document.body.classList.remove('mobile-nav-active');
    }
  });

  // 4. Ao redimensionar janela para Desktop, remove trava mobile
  window.addEventListener('resize', () => {
    if (!isMobile()) {
      document.body.classList.remove('mobile-nav-active');
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
