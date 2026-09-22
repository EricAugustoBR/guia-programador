export type GridTableCategory =
  | 'all'
  | 'tables'
  | 'bento'
  | 'kanban'
  | 'commerce'
  | 'fintech'
  | 'developer';

export interface GridTableCategoryInfo {
  readonly id: GridTableCategory;
  readonly label: string;
  readonly iconSvg: string;
  readonly count?: number;
}

export interface GridTableItem {
  readonly id: string;
  readonly name: string;
  readonly ptName: string;
  readonly category: Exclude<GridTableCategory, 'all'>;
  readonly categoryLabel: string;
  readonly dribbbleTrend: string;
  readonly concept: string;
  readonly whyItMatters: string;
  readonly goldenRule: string;
  readonly commonPitfall: string;
  readonly mnemonic: string;
  readonly htmlSnippet: string;
  readonly cssSnippet: string;
  readonly renderInteractive: (container: HTMLElement) => void;
}

export const GRID_TABLE_CATEGORIES: readonly GridTableCategoryInfo[] = [
  {
    id: 'all',
    label: 'Todos os Exemplos',
    iconSvg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`
  },
  {
    id: 'tables',
    label: 'Data Tables Avançadas',
    iconSvg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`
  },
  {
    id: 'bento',
    label: 'Bento & Dashboards',
    iconSvg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`
  },
  {
    id: 'kanban',
    label: 'Kanban & Fluxos',
    iconSvg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="5" height="16" rx="1"/><rect x="10" y="4" width="5" height="10" rx="1"/><rect x="17" y="4" width="5" height="14" rx="1"/></svg>`
  },
  {
    id: 'commerce',
    label: 'E-Commerce & Catálogo',
    iconSvg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`
  },
  {
    id: 'fintech',
    label: 'Fintech & Finanças',
    iconSvg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`
  },
  {
    id: 'developer',
    label: 'DevOps & Matrizes',
    iconSvg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`
  }
];

export const GRIDS_TABLES_DATA: readonly GridTableItem[] = [
  // =============================================================
  // ★ DRIBBBLE SHOT 24181331: LIL DATA TABLE (XCHYLER DRENTH)
  // =============================================================
  {
    id: 'lil-data-table',
    name: 'Lil Data Table — Compact Team & CRM Masterpiece',
    ptName: 'Lil Data Table — Tabela Compacta de Alta Densidade (Estilo Xchyler Drenth)',
    category: 'tables',
    categoryLabel: 'Data Tables Avançadas',
    dribbbleTrend: 'Dribbble #24181331: Segmented Toolbar Tabs + Floating Bulk Bar + Pastel Pills',
    concept: 'Inspirada diretamente no aclamado design "Lil Data Table" de Xchyler Drenth no Dribbble. Tabela compacta e flutuante com barra de abas segmentadas (Todos, Ativos, Pendentes, Inativos), busca inline rápida, avatares com status dot, pills suaves em tons pastel, barra flutuante de ações em massa e paginação integrada.',
    whyItMatters: 'É a referência máxima de micro-tabelas no Dribbble atual. Mostra como condensar dados densos sem abrir mão de respiração visual, sofisticação e microinterações fluidas.',
    goldenRule: 'Em micro-tabelas compactas (Lil Data Tables), a toolbar deve estar integrada visualmente na moldura do card e a barra de seleção em massa deve flutuar dinamicamente quando itens forem marcados.',
    commonPitfall: 'Exagerar na altura de linha (padding excessivo) ou deixar botões de ação pesados que disputam atenção com os avatares e os nomes.',
    mnemonic: 'Moldura compacta, abas segmentam, floating bar age em massa.',
    htmlSnippet: `<div class="lil-table-card">
  <!-- Toolbar Superior Integrada -->
  <div class="lil-table-toolbar">
    <div class="lil-table-header-left">
      <div class="lil-table-title">
        <span>Team Members</span>
        <span class="lil-count-chip">24 members</span>
      </div>
      <div class="lil-segmented-tabs">
        <button class="lil-tab-btn is-active">All</button>
        <button class="lil-tab-btn">Active</button>
        <button class="lil-tab-btn">Pending</button>
      </div>
    </div>
    <div class="lil-actions-right">
      <div class="lil-search-box">
        <span class="lil-search-icon">🔍</span>
        <input type="search" placeholder="Search members..." class="lil-search-input">
      </div>
      <button class="lil-btn-add">+ Add Member</button>
    </div>
  </div>

  <!-- Tabela Compacta -->
  <div class="gt-table-responsive">
    <table class="gt-table gt-table-hover">
      <thead>
        <tr>
          <th style="width:36px;"><input type="checkbox"></th>
          <th>Name & Contact</th>
          <th>Role</th>
          <th>Status</th>
          <th>Last Active</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input type="checkbox"></td>
          <td>
            <div class="gt-user-cell">
              <div class="gt-avatar" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);">XD</div>
              <div>
                <div class="gt-user-name">Xchyler Drenth</div>
                <div class="gt-user-email">xchyler@design.io</div>
              </div>
            </div>
          </td>
          <td><span class="lil-role-pill">Lead Designer</span></td>
          <td><span class="gt-status-dot dot-success">Active</span></td>
          <td class="text-muted">Just now</td>
          <td class="text-right"><button class="gt-btn-icon">•••</button></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Barra Flutuante de Seleção em Massa -->
  <div class="lil-floating-bar is-visible">
    <span>2 members selected</span>
    <button class="lil-floating-btn">Export CSV</button>
    <button class="lil-floating-btn">Deactivate</button>
  </div>

  <!-- Paginação Integrada -->
  <div class="lil-pagination-bar">
    <span>Showing 1 to 4 of 24 members</span>
    <div class="lil-page-btn-group">
      <button class="lil-page-btn is-active">1</button>
      <button class="lil-page-btn">2</button>
      <button class="lil-page-btn">3</button>
    </div>
  </div>
</div>`,
    cssSnippet: `.lil-table-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  position: relative;
}
.lil-table-toolbar {
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-subtle);
}
.lil-segmented-tabs {
  display: inline-flex;
  background: var(--bg-surface-elevated);
  padding: 3px;
  border-radius: var(--radius-md);
}
.lil-tab-btn.is-active {
  background: var(--bg-surface);
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
}
.lil-floating-bar {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  color: #fff;
  padding: 0.45rem 1rem;
  border-radius: var(--radius-full);
}`,
    renderInteractive: (container: HTMLElement) => {
      const allMembers = [
        { id: 1, name: 'Xchyler Drenth', email: 'xchyler@drenth.design', role: 'Lead Product Designer', status: 'Active', statusType: 'success', lastActive: 'Há 2 min', initials: 'XD', grad: 'linear-gradient(135deg, #ea4c89, #f43f5e)' },
        { id: 2, name: 'Soraia Vance', email: 'soraia.vance@studio.co', role: 'Staff Frontend Engineer', status: 'Active', statusType: 'success', lastActive: 'Há 14 min', initials: 'SV', grad: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
        { id: 3, name: 'Liam K. Sterling', email: 'liam@craftui.dev', role: 'Design Systems Architect', status: 'Pending', statusType: 'warning', lastActive: 'Convidado hoje', initials: 'LS', grad: 'linear-gradient(135deg, #f59e0b, #d97706)' },
        { id: 4, name: 'Elena Moreau', email: 'elena.m@productlab.io', role: 'UX Research Director', status: 'Active', statusType: 'success', lastActive: 'Ontem às 18:30', initials: 'EM', grad: 'linear-gradient(135deg, #10b981, #059669)' },
        { id: 5, name: 'Dante Falcone', email: 'dante@falcone.design', role: 'Motion & 3D Designer', status: 'Inactive', statusType: 'danger', lastActive: 'Há 2 semanas', initials: 'DF', grad: 'linear-gradient(135deg, #64748b, #475569)' }
      ];

      let currentTab = 'All';
      let searchQuery = '';
      let selectedIds = new Set<number>();
      let currentPage = 1;

      container.innerHTML = `
        <div class="lil-table-card">
          <!-- Toolbar Superior -->
          <div class="lil-table-toolbar">
            <div class="lil-table-header-left">
              <div class="lil-table-title">
                <span>Team Directory</span>
                <span class="lil-count-chip" id="lil-header-count">${allMembers.length} membros</span>
              </div>
              <div class="lil-segmented-tabs" id="lil-tabs-group">
                <button class="lil-tab-btn is-active" data-tab="All">Todos</button>
                <button class="lil-tab-btn" data-tab="Active">Ativos</button>
                <button class="lil-tab-btn" data-tab="Pending">Pendentes</button>
                <button class="lil-tab-btn" data-tab="Inactive">Inativos</button>
              </div>
            </div>
            <div class="lil-actions-right">
              <div class="lil-search-box">
                <span class="lil-search-icon">🔍</span>
                <input type="search" id="lil-search-field" placeholder="Buscar membro..." class="lil-search-input">
              </div>
              <button class="lil-btn-filter" id="lil-filter-trigger" title="Filtrar por papel">⚙️ Colunas</button>
              <button class="lil-btn-add" id="lil-add-trigger">+ Novo Membro</button>
            </div>
          </div>

          <!-- Tabela Compacta -->
          <div class="gt-table-responsive">
            <table class="gt-table gt-table-hover">
              <thead>
                <tr>
                  <th style="width: 36px;"><input type="checkbox" id="lil-master-chk" aria-label="Selecionar todos"></th>
                  <th>Membro & Contato</th>
                  <th>Cargo / Especialidade</th>
                  <th>Status</th>
                  <th>Última Atividade</th>
                  <th class="text-right" style="width: 70px;">Ação</th>
                </tr>
              </thead>
              <tbody id="lil-tbody"></tbody>
            </table>
          </div>

          <!-- Barra Flutuante de Seleção em Massa -->
          <div class="lil-floating-bar" id="lil-bulk-bar">
            <span id="lil-bulk-label" style="font-weight: 600; font-size: 0.75rem;">0 selecionados</span>
            <button class="lil-floating-btn" id="lil-bulk-export">Exportar CSV</button>
            <button class="lil-floating-btn" id="lil-bulk-deactivate">Desativar</button>
            <button class="lil-floating-btn" id="lil-bulk-clear" style="opacity: 0.7;">✕</button>
          </div>

          <!-- Paginação Integrada -->
          <div class="lil-pagination-bar">
            <span id="lil-pagination-info">Mostrando 1 a 5 de 5 membros</span>
            <div class="lil-page-btn-group">
              <button class="lil-page-btn" id="lil-prev-page">‹</button>
              <button class="lil-page-btn is-active">1</button>
              <button class="lil-page-btn">2</button>
              <button class="lil-page-btn" id="lil-next-page">›</button>
            </div>
          </div>
        </div>
      `;

      const tbody = container.querySelector('#lil-tbody') as HTMLElement;
      const masterChk = container.querySelector('#lil-master-chk') as HTMLInputElement;
      const bulkBar = container.querySelector('#lil-bulk-bar') as HTMLElement;
      const bulkLabel = container.querySelector('#lil-bulk-label') as HTMLElement;
      const searchField = container.querySelector('#lil-search-field') as HTMLInputElement;
      const tabs = container.querySelectorAll('.lil-tab-btn');
      const addBtn = container.querySelector('#lil-add-trigger') as HTMLElement;
      const filterBtn = container.querySelector('#lil-filter-trigger') as HTMLElement;
      const clearBtn = container.querySelector('#lil-bulk-clear') as HTMLElement;

      const render = () => {
        const filtered = allMembers.filter(m => {
          const matchesTab = currentTab === 'All' || m.status === currentTab;
          const matchesSearch =
            !searchQuery ||
            m.name.toLowerCase().includes(searchQuery) ||
            m.email.toLowerCase().includes(searchQuery) ||
            m.role.toLowerCase().includes(searchQuery);
          return matchesTab && matchesSearch;
        });

        tbody.innerHTML = filtered.map(m => {
          const isChecked = selectedIds.has(m.id);
          return `
            <tr style="${isChecked ? 'background: rgba(99, 102, 241, 0.07);' : ''}">
              <td><input type="checkbox" class="lil-row-chk" data-id="${m.id}" ${isChecked ? 'checked' : ''}></td>
              <td>
                <div class="gt-user-cell">
                  <div class="gt-avatar" style="background: ${m.grad}; width: 32px; height: 32px; font-size: 0.75rem;">${m.initials}</div>
                  <div>
                    <div class="gt-user-name">${m.name}</div>
                    <div class="gt-user-email">${m.email}</div>
                  </div>
                </div>
              </td>
              <td><span class="lil-role-pill">${m.role}</span></td>
              <td><span class="gt-status-dot dot-${m.statusType}">${m.status}</span></td>
              <td class="text-muted" style="font-size: 0.75rem;">${m.lastActive}</td>
              <td class="text-right">
                <button class="gt-btn-icon lil-action-row-btn" data-name="${m.name}" title="Opções">•••</button>
              </td>
            </tr>
          `;
        }).join('');

        // Master checkbox state
        if (filtered.length > 0 && filtered.every(m => selectedIds.has(m.id))) {
          masterChk.checked = true;
          masterChk.indeterminate = false;
        } else if (filtered.some(m => selectedIds.has(m.id))) {
          masterChk.checked = false;
          masterChk.indeterminate = true;
        } else {
          masterChk.checked = false;
          masterChk.indeterminate = false;
        }

        // Floating bulk action bar state
        if (selectedIds.size > 0) {
          bulkBar.classList.add('is-visible');
          bulkLabel.textContent = `${selectedIds.size} selecionado(s)`;
        } else {
          bulkBar.classList.remove('is-visible');
        }

        // Add listeners for row checks
        tbody.querySelectorAll('.lil-row-chk').forEach(chk => {
          chk.addEventListener('change', (e) => {
            const id = Number((e.target as HTMLInputElement).getAttribute('data-id'));
            if ((e.target as HTMLInputElement).checked) {
              selectedIds.add(id);
            } else {
              selectedIds.delete(id);
            }
            render();
          });
        });

        // Add listeners for row action dots
        tbody.querySelectorAll('.lil-action-row-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const name = btn.getAttribute('data-name');
            alert(`Ações para: ${name}\n• Ver Perfil\n• Alterar Cargo\n• Revogar Acesso`);
          });
        });
      };

      render();

      // Master checkbox listener
      masterChk.addEventListener('change', () => {
        const filtered = allMembers.filter(m => {
          const matchesTab = currentTab === 'All' || m.status === currentTab;
          const matchesSearch =
            !searchQuery ||
            m.name.toLowerCase().includes(searchQuery) ||
            m.email.toLowerCase().includes(searchQuery);
          return matchesTab && matchesSearch;
        });

        if (masterChk.checked) {
          filtered.forEach(m => selectedIds.add(m.id));
        } else {
          filtered.forEach(m => selectedIds.delete(m.id));
        }
        render();
      });

      // Tab switcher listener
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('is-active'));
          tab.classList.add('is-active');
          currentTab = tab.getAttribute('data-tab') || 'All';
          render();
        });
      });

      // Search listener
      searchField.addEventListener('input', (e) => {
        searchQuery = (e.target as HTMLInputElement).value.trim().toLowerCase();
        render();
      });

      // Add member demo
      addBtn.addEventListener('click', () => {
        const newName = prompt('Digite o nome do novo membro da equipe:');
        if (newName) {
          allMembers.unshift({
            id: Date.now(),
            name: newName,
            email: `${newName.toLowerCase().replace(/\s+/g, '.')}@equipe.com`,
            role: 'Product Designer',
            status: 'Active',
            statusType: 'success',
            lastActive: 'Agora mesmo',
            initials: newName.slice(0, 2).toUpperCase(),
            grad: 'linear-gradient(135deg, #10b981, #06b6d4)'
          });
          render();
        }
      });

      filterBtn.addEventListener('click', () => {
        alert('Painel de customização de colunas (Nome, Cargo, Status, Atividade, Tags).');
      });

      clearBtn.addEventListener('click', () => {
        selectedIds.clear();
        render();
      });

      container.querySelectorAll('.lil-page-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const num = parseInt(btn.textContent || '', 10);
          if (!isNaN(num)) {
            currentPage = num;
            container.querySelectorAll('.lil-page-btn').forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            const info = container.querySelector('#lil-pagination-info');
            if (info) info.textContent = `Página ${currentPage} (5 membros exibidos)`;
          }
        });
      });

      container.querySelector('#lil-bulk-export')?.addEventListener('click', () => {
        alert(`Exportando ${selectedIds.size} membros selecionados para CSV...`);
        selectedIds.clear();
        render();
      });

      container.querySelector('#lil-bulk-deactivate')?.addEventListener('click', () => {
        alert(`Desativando ${selectedIds.size} membros selecionados...`);
        selectedIds.clear();
        render();
      });
    }
  },

  // =============================================================
  // ★ DRIBBBLE SHOT: LIL FINANCIAL LEDGER (COMPACT TRANSACTION FLOW)
  // =============================================================
  {
    id: 'lil-financial-ledger',
    name: 'Lil Financial Ledger — Compact Fiat & Crypto Flow',
    ptName: 'Lil Ledger Financeiro — Microtabela de Movimentações & Extratos',
    category: 'fintech',
    categoryLabel: 'Fintech & Finanças',
    dribbbleTrend: 'Dribbble Micro-Ledger: Merchant Glyph + Card Last-4 + High-Precision Signed Inset',
    concept: 'Versão financeira e bancária do padrão Lil Data Table. Apresenta extrato compacto de transações com ícone semântico do comerciante, badge de categoria (SaaS, Nuvem, Payroll), número final do cartão, data e valor monetário com sinal e cor (+ verde / - vermelho).',
    whyItMatters: 'Comum em neobancos modernos (Mercury, Revolut, Brex). Permite aos usuários corporativos reconciliarem dezenas de despesas em um espaço visual reduzido e confortável.',
    goldenRule: 'Destaque visualmente entradas e saídas com os sinais explícitos (+) e (-) e mantenha os valores em fonte monospace com algarismos tabulares.',
    commonPitfall: 'Omitir o meio de pagamento ou a categoria contábil, forçando o usuário a clicar em cada linha para saber onde o cartão foi passado.',
    mnemonic: 'Ícone resume o gasto, cartão identifica o meio, sinal fecha a conta.',
    htmlSnippet: `<div class="lil-table-card">
  <div class="lil-table-toolbar">
    <div class="lil-table-title">
      <span>Company Expenses</span>
      <span class="lil-count-chip">Set 2026</span>
    </div>
    <div class="lil-actions-right">
      <button class="lil-btn-filter">Cartão Corporativo</button>
      <button class="lil-btn-add">+ Nova Despesa</button>
    </div>
  </div>
  <table class="gt-table gt-table-hover">
    <tbody>
      <tr>
        <td>
          <div class="gt-user-cell">
            <div class="gt-avatar" style="background:#000;">▲</div>
            <div>
              <div class="gt-user-name">Vercel Inc.</div>
              <div class="gt-user-email">Edge Functions & Bandwidth</div>
            </div>
          </div>
        </td>
        <td><span class="lil-role-pill">Cloud Hosting</span></td>
        <td class="font-mono text-muted">Visa •••• 4242</td>
        <td class="text-muted">08/Set 10:14</td>
        <td class="text-right font-mono" style="color:#ef4444; font-weight:700;">-$420.00</td>
      </tr>
    </tbody>
  </table>
</div>`,
    cssSnippet: `.lil-table-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}
.font-mono {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}`,
    renderInteractive: (container: HTMLElement) => {
      const expenses = [
        { merchant: 'Vercel Inc.', sub: 'Edge Hosting & Serverless', cat: 'Infraestrutura', card: 'Visa •••• 4242', date: 'Hoje, 10:14', amount: '-$420.00', isIncome: false, icon: '▲', color: '#000000' },
        { merchant: 'Stripe Payout', sub: 'Assinaturas do Plano Pro', cat: 'Receita SaaS', card: 'Conta Corrente PJ', date: 'Hoje, 09:00', amount: '+$8,450.00', isIncome: true, icon: 'S', color: '#6366f1' },
        { merchant: 'Figma Team Plan', sub: 'Assinatura 12 assentos', cat: 'Design Tools', card: 'Mastercard •••• 9811', date: '07/Set 16:42', amount: '-$180.00', isIncome: false, icon: '🎨', color: '#a855f7' },
        { merchant: 'OpenAI API Token', sub: 'GPT-4o Chamadas de Produção', cat: 'Inteligência Artificial', card: 'Visa •••• 4242', date: '06/Set 23:10', amount: '-$214.50', isIncome: false, icon: '⚡', color: '#10b981' }
      ];

      container.innerHTML = `
        <div class="lil-table-card">
          <div class="lil-table-toolbar">
            <div class="lil-table-header-left">
              <div class="lil-table-title">
                <span>Extrato Corporativo</span>
                <span class="lil-count-chip">Setembro 2026</span>
              </div>
            </div>
            <div class="lil-actions-right">
              <span class="font-mono text-muted" style="font-size:0.75rem;">Saldo Disponível: <strong style="color:var(--color-success);">$48,290.00</strong></span>
              <button class="lil-btn-add" onclick="alert('Exportando extrato financeiro OFX / CSV...')">Exportar Extrato</button>
            </div>
          </div>
          <div class="gt-table-responsive">
            <table class="gt-table gt-table-hover">
              <thead>
                <tr>
                  <th>Favorecido / Descrição</th>
                  <th>Categoria</th>
                  <th>Meio / Cartão</th>
                  <th>Data & Hora</th>
                  <th class="text-right">Valor Líquido</th>
                </tr>
              </thead>
              <tbody>
                ${expenses.map(e => `
                  <tr>
                    <td>
                      <div class="gt-user-cell">
                        <div class="gt-avatar" style="background:${e.color}; color:#fff; font-size:0.875rem;">${e.icon}</div>
                        <div>
                          <div class="gt-user-name">${e.merchant}</div>
                          <div class="gt-user-email">${e.sub}</div>
                        </div>
                      </div>
                    </td>
                    <td><span class="lil-role-pill">${e.cat}</span></td>
                    <td class="font-mono text-muted" style="font-size:0.75rem;">${e.card}</td>
                    <td class="text-muted" style="font-size:0.75rem;">${e.date}</td>
                    <td class="text-right font-mono" style="font-weight:700; color:${e.isIncome ? 'var(--color-success)' : 'var(--color-danger)'};">
                      ${e.amount}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
  },

  // -------------------------------------------------------------
  // 1. SAAS CUSTOMER & ARR MANAGEMENT TABLE
  // -------------------------------------------------------------
  {
    id: 'saas-customer-table',
    name: 'SaaS Customer & ARR Directory',
    ptName: 'Tabela de Clientes SaaS & Receita Recorrente',
    category: 'tables',
    categoryLabel: 'Data Tables Avançadas',
    dribbbleTrend: 'Floating Pill Badges + Micro-Avatars + Quick Action Popovers',
    concept: 'Tabela de alta densidade informativa com seleção múltipla, avatar com iniciais/foto, status em pill e receita alinhada à direita.',
    whyItMatters: 'É a espinha dorsal de qualquer painel SaaS (Stripe, HubSpot, Linear). Organiza relacionamentos complexos sem poluição visual.',
    goldenRule: 'Alinhe valores numéricos e monetários sempre à direita para facilitar a comparação visual de dígitos decimais.',
    commonPitfall: 'Alinhar colunas de moeda à esquerda ou centralizar textos longos, quebrando o ritmo de leitura vertical.',
    mnemonic: 'Números à direita, texto à esquerda, status centralizado.',
    htmlSnippet: `<div class="gt-table-responsive">
  <table class="gt-table gt-table-hover">
    <thead>
      <tr>
        <th class="th-checkbox"><input type="checkbox" aria-label="Selecionar todos"></th>
        <th>Cliente</th>
        <th>Plano</th>
        <th>Status</th>
        <th class="text-right">MRR / ARR</th>
        <th class="text-right">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><input type="checkbox"></td>
        <td>
          <div class="gt-user-cell">
            <div class="gt-avatar" style="--bg-grad: linear-gradient(135deg, #6366f1, #a855f7);">AL</div>
            <div>
              <div class="gt-user-name">Acme Logistics Corp</div>
              <div class="gt-user-email">billing@acmelog.io</div>
            </div>
          </div>
        </td>
        <td><span class="gt-badge gt-badge-purple">Enterprise</span></td>
        <td><span class="gt-status-dot dot-success">Ativo</span></td>
        <td class="text-right font-mono"><strong>$4,250.00</strong><span class="text-muted">/mês</span></td>
        <td class="text-right"><button class="gt-btn-icon">•••</button></td>
      </tr>
    </tbody>
  </table>
</div>`,
    cssSnippet: `.gt-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 0.875rem;
}
.gt-table th {
  background: var(--bg-surface-elevated);
  padding: 0.75rem 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.75rem;
  border-bottom: 1px solid var(--border-subtle);
}
.gt-table td {
  padding: 0.875rem 1rem;
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
}
.gt-table tr:hover td {
  background: var(--bg-surface-hover);
}`,
    renderInteractive: (container: HTMLElement) => {
      const customers = [
        { name: 'Acme Logistics Corp', email: 'billing@acmelog.io', plan: 'Enterprise', planColor: 'purple', status: 'Ativo', statusType: 'success', mrr: '$4,250.00', initials: 'AL', grad: 'linear-gradient(135deg, #6366f1, #a855f7)' },
        { name: 'HyperScale Cloud Inc', email: 'finances@hyperscale.dev', plan: 'Scale', planColor: 'indigo', status: 'Ativo', statusType: 'success', mrr: '$2,800.00', initials: 'HC', grad: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
        { name: 'Neon Dynamics Ltd', email: 'contato@neondyn.co', plan: 'Pro', planColor: 'teal', status: 'Pendente', statusType: 'warning', mrr: '$790.00', initials: 'ND', grad: 'linear-gradient(135deg, #10b981, #059669)' },
        { name: 'Vertex FinTech Lab', email: 'ops@vertexlab.finance', plan: 'Enterprise', planColor: 'purple', status: 'Atrasado', statusType: 'danger', mrr: '$5,120.00', initials: 'VF', grad: 'linear-gradient(135deg, #f59e0b, #ef4444)' }
      ];

      container.innerHTML = `
        <div class="gt-interactive-wrapper">
          <div class="gt-toolbar">
            <span class="gt-toolbar-label">Filtro rápido:</span>
            <div class="gt-chip-filter">
              <button class="gt-filter-chip is-active" data-plan="all">Todos (4)</button>
              <button class="gt-filter-chip" data-plan="Enterprise">Enterprise</button>
              <button class="gt-filter-chip" data-plan="Pro">Pro / Scale</button>
            </div>
            <span class="gt-selected-count" style="margin-left:auto; font-size:0.75rem; color:var(--text-muted);">0 selecionados</span>
          </div>
          <div class="gt-table-responsive">
            <table class="gt-table gt-table-hover">
              <thead>
                <tr>
                  <th style="width: 40px;"><input type="checkbox" id="saas-select-all" aria-label="Selecionar todos"></th>
                  <th>Empresa & Contato</th>
                  <th>Plano Contratado</th>
                  <th>Status Assinatura</th>
                  <th class="text-right">MRR Mensal</th>
                  <th class="text-right" style="width: 80px;">Ação</th>
                </tr>
              </thead>
              <tbody id="saas-table-body"></tbody>
            </table>
          </div>
        </div>
      `;

      const tbody = container.querySelector('#saas-table-body') as HTMLElement;
      const selectAll = container.querySelector('#saas-select-all') as HTMLInputElement;
      const selectedCount = container.querySelector('.gt-selected-count') as HTMLElement;
      let activeFilter = 'all';

      const updateRows = () => {
        const filtered = customers.filter(c => {
          if (activeFilter === 'all') return true;
          if (activeFilter === 'Enterprise') return c.plan === 'Enterprise';
          return c.plan === 'Pro' || c.plan === 'Scale';
        });

        tbody.innerHTML = filtered.map(c => `
          <tr>
            <td><input type="checkbox" class="saas-row-chk" data-name="${c.name}"></td>
            <td>
              <div class="gt-user-cell">
                <div class="gt-avatar" style="background: ${c.grad};">${c.initials}</div>
                <div>
                  <div class="gt-user-name">${c.name}</div>
                  <div class="gt-user-email">${c.email}</div>
                </div>
              </div>
            </td>
            <td><span class="gt-badge gt-badge-${c.planColor}">${c.plan}</span></td>
            <td><span class="gt-status-dot dot-${c.statusType}">${c.status}</span></td>
            <td class="text-right font-mono"><strong>${c.mrr}</strong></td>
            <td class="text-right"><button class="gt-btn-icon" title="Ver detalhes">•••</button></td>
          </tr>
        `).join('');

        const chks = tbody.querySelectorAll('.saas-row-chk') as NodeListOf<HTMLInputElement>;
        const refreshCount = () => {
          const checked = Array.from(chks).filter(ck => ck.checked).length;
          selectedCount.textContent = `${checked} selecionado(s)`;
        };
        chks.forEach(ck => ck.addEventListener('change', refreshCount));
      };

      updateRows();

      selectAll?.addEventListener('change', () => {
        const chks = tbody.querySelectorAll('.saas-row-chk') as NodeListOf<HTMLInputElement>;
        chks.forEach(ck => ck.checked = selectAll.checked);
        selectedCount.textContent = `${selectAll.checked ? chks.length : 0} selecionado(s)`;
      });

      const filterChips = container.querySelectorAll('.gt-filter-chip');
      filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
          filterChips.forEach(c => c.classList.remove('is-active'));
          chip.classList.add('is-active');
          activeFilter = chip.getAttribute('data-plan') || 'all';
          updateRows();
        });
      });
    }
  },

  // -------------------------------------------------------------
  // 2. FINTECH CRYPTO & ASSET LEDGER TABLE
  // -------------------------------------------------------------
  {
    id: 'crypto-ledger-table',
    name: 'Fintech & Crypto Portfolio Ledger',
    ptName: 'Ledger de Criptoativos & Mini Sparklines',
    category: 'fintech',
    categoryLabel: 'Fintech & Finanças',
    dribbbleTrend: 'Dynamic SVG Sparkline + Real-time Delta Pill + High Precision Decimals',
    concept: 'Tabela financeira com gráficos vetoriais inline (sparklines), flutuação percentual 24h e botões de ação rápida.',
    whyItMatters: 'Comum em apps bancários, carteiras Web3 e dashboards de investimento onde a velocidade de percepção de tendências é vital.',
    goldenRule: 'Use SVG com stroke suave e gradiente sem preenchimento opaco para que o gráfico não oculte a linha da tabela.',
    commonPitfall: 'Usar imagens estáticas em vez de vetores ou esconder o delta percentual positivo com sinal neutro.',
    mnemonic: 'Verde sobe (+), vermelho desce (-), sparkline conta a história.',
    htmlSnippet: `<tr class="gt-crypto-row">
  <td class="gt-asset-info">
    <div class="gt-asset-icon btc">₿</div>
    <div>
      <span class="gt-asset-symbol">BTC</span>
      <span class="gt-asset-name">Bitcoin</span>
    </div>
  </td>
  <td class="font-mono text-right">$64,820.50</td>
  <td>
    <svg class="gt-sparkline stroke-green" viewBox="0 0 100 24">
      <path d="M0,18 Q20,10 40,16 T80,8 T100,4" fill="none" stroke-width="2"/>
    </svg>
  </td>
  <td><span class="gt-delta-pill delta-up">+5.82%</span></td>
  <td class="text-right font-mono">$1.27T</td>
  <td class="text-right"><button class="gt-btn-trade">Negociar</button></td>
</tr>`,
    cssSnippet: `.gt-sparkline {
  width: 90px;
  height: 24px;
  display: block;
}
.gt-sparkline.stroke-green path {
  stroke: #10b981;
}
.gt-delta-pill {
  display: inline-flex;
  padding: 0.2rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
}
.gt-delta-pill.delta-up {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}`,
    renderInteractive: (container: HTMLElement) => {
      const assets = [
        { symbol: 'BTC', name: 'Bitcoin', price: '$64,820.50', delta: '+5.82%', isUp: true, cap: '$1.27T', icon: '₿', color: '#f7931a', path: 'M0,18 Q25,8 50,14 T80,6 T100,2' },
        { symbol: 'ETH', name: 'Ethereum', price: '$3,490.12', delta: '+3.14%', isUp: true, cap: '$419.8B', icon: 'Ξ', color: '#627eea', path: 'M0,16 Q20,12 45,9 T75,11 T100,5' },
        { symbol: 'SOL', name: 'Solana', price: '$158.40', delta: '-1.45%', isUp: false, cap: '$74.1B', icon: 'S', color: '#14f195', path: 'M0,4 Q25,12 50,8 T80,18 T100,20' },
        { symbol: 'AVAX', name: 'Avalanche', price: '$28.95', delta: '+8.70%', isUp: true, cap: '$11.4B', icon: 'A', color: '#e84142', path: 'M0,22 Q30,16 55,10 T85,6 T100,2' }
      ];

      container.innerHTML = `
        <div class="gt-table-responsive">
          <table class="gt-table gt-table-hover">
            <thead>
              <tr>
                <th>Ativo</th>
                <th class="text-right">Preço Atual</th>
                <th style="width: 110px;">Tendência 24h</th>
                <th>Variação</th>
                <th class="text-right">Cap. de Mercado</th>
                <th class="text-right" style="width: 100px;">Ação</th>
              </tr>
            </thead>
            <tbody>
              ${assets.map(a => `
                <tr>
                  <td>
                    <div class="gt-asset-cell">
                      <div class="gt-crypto-symbol-badge" style="background: ${a.color}22; color: ${a.color}; border-color: ${a.color}55;">${a.icon}</div>
                      <div>
                        <div class="gt-asset-symbol">${a.symbol}</div>
                        <div class="gt-asset-name">${a.name}</div>
                      </div>
                    </div>
                  </td>
                  <td class="text-right font-mono"><strong>${a.price}</strong></td>
                  <td>
                    <svg class="gt-sparkline ${a.isUp ? 'stroke-green' : 'stroke-red'}" viewBox="0 0 100 24" preserveAspectRatio="none">
                      <path d="${a.path}" fill="none" stroke-width="2.5" stroke-linecap="round"/>
                    </svg>
                  </td>
                  <td>
                    <span class="gt-delta-pill ${a.isUp ? 'delta-up' : 'delta-down'}">
                      ${a.isUp ? '▲' : '▼'} ${a.delta}
                    </span>
                  </td>
                  <td class="text-right font-mono text-muted">${a.cap}</td>
                  <td class="text-right">
                    <button class="gt-btn-trade-demo" data-asset="${a.symbol}">Comprar</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;

      container.querySelectorAll('.gt-btn-trade-demo').forEach(btn => {
        btn.addEventListener('click', () => {
          btn.textContent = 'Ordem Enviada! ✓';
          (btn as HTMLElement).style.background = '#10b981';
          setTimeout(() => {
            btn.textContent = 'Comprar';
            (btn as HTMLElement).style.background = '';
          }, 1500);
        });
      });
    }
  },

  // -------------------------------------------------------------
  // 3. EXPANDABLE ORDER FULFILLMENT ACCORDION TABLE
  // -------------------------------------------------------------
  {
    id: 'expandable-order-table',
    name: 'Expandable Order Fulfillment Table',
    ptName: 'Tabela de Pedidos com Linha Expansível (Drill-down)',
    category: 'tables',
    categoryLabel: 'Data Tables Avançadas',
    dribbbleTrend: 'Master-Detail Expandable Rows + Multi-step Logistics Pipeline',
    concept: 'Linhas mestre com botão de seta que abrem um detalhamento aninhado (itens comprados, endereço e etapas de envio).',
    whyItMatters: 'Permite que o usuário inspecione a profundidade dos dados sem sair da tela ou abrir modais intrusivos.',
    goldenRule: 'Mantenha a linha mestre com indicador claro de expansão (chevron que gira 180 graus).',
    commonPitfall: 'Substituir a linha em vez de expandi-la, desorientando o usuário em tabelas longas.',
    mnemonic: 'Clique expande, detalhe desce, contexto permanece.',
    htmlSnippet: `<tr class="gt-order-master is-expanded">
  <td><button class="gt-chevron-btn rotated">▼</button></td>
  <td class="font-mono">#ORD-9842</td>
  <td>Carlos Mendes</td>
  <td><span class="gt-badge gt-badge-teal">Em Trânsito</span></td>
  <td class="text-right font-mono">$384.50</td>
</tr>
<tr class="gt-order-detail-row">
  <td colspan="5">
    <div class="gt-detail-card">
      <!-- Itens e timeline aqui -->
    </div>
  </td>
</tr>`,
    cssSnippet: `.gt-order-detail-row {
  background: var(--bg-surface-elevated);
}
.gt-detail-card {
  padding: 1.25rem;
  border-left: 3px solid var(--brand-primary);
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 1.5rem;
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div class="gt-table-responsive">
          <table class="gt-table">
            <thead>
              <tr>
                <th style="width: 36px;"></th>
                <th>Código Pedido</th>
                <th>Destinatário</th>
                <th>Rastreio</th>
                <th>Status</th>
                <th class="text-right">Valor Total</th>
              </tr>
            </thead>
            <tbody>
              <!-- Row 1 -->
              <tr class="gt-expandable-row" data-target="detail-1" style="cursor: pointer;">
                <td><button class="gt-chevron-btn" id="btn-chev-1">▸</button></td>
                <td class="font-mono"><strong>#ORD-9842</strong></td>
                <td>Carlos Eduardo Mendes</td>
                <td><span class="gt-code-pill">FDX-88219</span></td>
                <td><span class="gt-status-dot dot-warning">Em Trânsito</span></td>
                <td class="text-right font-mono"><strong>R$ 1.429,90</strong></td>
              </tr>
              <tr id="detail-1" class="gt-nested-detail-row" style="display: none;">
                <td colspan="6">
                  <div class="gt-order-detail-box">
                    <div class="gt-detail-col">
                      <div class="gt-detail-title">Itens do Pedido (2 produtos)</div>
                      <div class="gt-order-item-line">
                        <div class="gt-item-thumb">🎧</div>
                        <div style="flex:1;">
                          <div style="font-weight:600;">Headset Noise Cancelling Pro X</div>
                          <div style="font-size:0.75rem; color:var(--text-muted);">Qtd: 1 • SKU: SND-409</div>
                        </div>
                        <span class="font-mono">R$ 1.199,90</span>
                      </div>
                      <div class="gt-order-item-line">
                        <div class="gt-item-thumb">🔌</div>
                        <div style="flex:1;">
                          <div style="font-weight:600;">Cabo Trançado USB-C 100W 2m</div>
                          <div style="font-size:0.75rem; color:var(--text-muted);">Qtd: 1 • SKU: CAB-022</div>
                        </div>
                        <span class="font-mono">R$ 230,00</span>
                      </div>
                    </div>
                    <div class="gt-detail-col">
                      <div class="gt-detail-title">Timeline da Entrega (FedEx)</div>
                      <div class="gt-mini-timeline">
                        <div class="gt-step done">✓ Pedido Aprovado (08/Set 09:12)</div>
                        <div class="gt-step done">✓ Coletado pela Transportadora (08/Set 14:40)</div>
                        <div class="gt-step current">● Em Trânsito para Hub SP (Previsão: Amanhã)</div>
                        <div class="gt-step future">○ Saiu para Entrega</div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>

              <!-- Row 2 -->
              <tr class="gt-expandable-row" data-target="detail-2" style="cursor: pointer;">
                <td><button class="gt-chevron-btn" id="btn-chev-2">▸</button></td>
                <td class="font-mono"><strong>#ORD-9843</strong></td>
                <td>Mariana Albuquerque</td>
                <td><span class="gt-code-pill">LOG-44102</span></td>
                <td><span class="gt-status-dot dot-success">Entregue</span></td>
                <td class="text-right font-mono"><strong>R$ 849,00</strong></td>
              </tr>
              <tr id="detail-2" class="gt-nested-detail-row" style="display: none;">
                <td colspan="6">
                  <div class="gt-order-detail-box">
                    <div class="gt-detail-col">
                      <div class="gt-detail-title">Itens do Pedido (1 produto)</div>
                      <div class="gt-order-item-line">
                        <div class="gt-item-thumb">⌨️</div>
                        <div style="flex:1;">
                          <div style="font-weight:600;">Teclado Mecânico RGB Hot-Swap</div>
                          <div style="font-size:0.75rem; color:var(--text-muted);">Qtd: 1 • Switch: Red Linear</div>
                        </div>
                        <span class="font-mono">R$ 849,00</span>
                      </div>
                    </div>
                    <div class="gt-detail-col">
                      <div class="gt-detail-title">Status da Entrega</div>
                      <div style="background:var(--color-success-subtle); padding:0.75rem; border-radius:0.5rem; color:var(--color-success); font-size:0.8125rem;">
                        ✓ <strong>Entregue com sucesso</strong> em 08/Set às 11:20 na portaria residencial (recebido por: Zelador).
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `;

      container.querySelectorAll('.gt-expandable-row').forEach(row => {
        row.addEventListener('click', () => {
          const targetId = row.getAttribute('data-target');
          if (!targetId) return;
          const detailRow = container.querySelector(`#${targetId}`) as HTMLElement;
          const chev = row.querySelector('.gt-chevron-btn') as HTMLElement;
          const isOpen = detailRow.style.display !== 'none';

          if (isOpen) {
            detailRow.style.display = 'none';
            chev.textContent = '▸';
            chev.classList.remove('rotated');
          } else {
            detailRow.style.display = 'table-row';
            chev.textContent = '▾';
            chev.classList.add('rotated');
          }
        });
      });
    }
  },

  // -------------------------------------------------------------
  // 4. LINEAR / JIRA AGILE ISSUE SPRINT BOARD TABLE
  // -------------------------------------------------------------
  {
    id: 'linear-issue-table',
    name: 'Linear-Style Issue & Sprint Tracker',
    ptName: 'Tabela de Tarefas e Sprints (Estilo Linear.app)',
    category: 'tables',
    categoryLabel: 'Data Tables Avançadas',
    dribbbleTrend: 'Monochrome Issue IDs + Semantic Priority Dots + Sub-pixel Hover',
    concept: 'Lista compacta de alta velocidade com identificadores de ticket, prioridade por cor, story points e status de sprint.',
    whyItMatters: 'A interface do Linear redefiniu o padrão de ferramentas de engenharia de software com visual minimalista e atalhos de teclado.',
    goldenRule: 'Use tons sóbrios na maior parte da tabela e reserve cores vivas apenas para prioridades Urgentes ou bloqueios.',
    commonPitfall: 'Poluir cada célula com bordas pesadas e botões chamativos, tornando a leitura diária cansativa.',
    mnemonic: 'Menos ruído, mais foco: cinza guia, cor alerta.',
    htmlSnippet: `<div class="linear-issue-row">
  <span class="linear-priority-urgent" title="Urgente">⚡</span>
  <span class="linear-id font-mono">ENG-1042</span>
  <span class="linear-title">Refatorar pipeline de sincronização offline</span>
  <span class="linear-points">5 pts</span>
  <span class="linear-status is-progress">Em Andamento</span>
  <div class="linear-avatar">GF</div>
</div>`,
    cssSnippet: `.linear-issue-row {
  display: grid;
  grid-template-columns: 24px 85px 1fr 60px 120px 32px;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1rem;
  border-bottom: 1px solid var(--border-subtle);
  transition: background var(--transition-fast);
}
.linear-issue-row:hover {
  background: var(--bg-surface-hover);
}`,
    renderInteractive: (container: HTMLElement) => {
      const issues = [
        { id: 'ENG-1042', title: 'Refatorar pipeline de sincronização offline (IndexedDB)', prio: '⚡', prioName: 'Urgente', prioClass: 'urgent', points: '5 pts', status: 'Em Progresso', statusColor: 'blue', assignee: 'TC' },
        { id: 'DES-890', title: 'Ajustar tokens de contraste dark mode no Design System', prio: '▲', prioName: 'Alta', prioClass: 'high', points: '3 pts', status: 'Em Revisão', statusColor: 'purple', assignee: 'MK' },
        { id: 'SEC-314', title: 'Renovar chaves de assinatura do Webhook e rotação JWT', prio: '▲', prioName: 'Alta', prioClass: 'high', points: '2 pts', status: 'A Fazer', statusColor: 'gray', assignee: 'AL' },
        { id: 'OPS-119', title: 'Otimizar compilação de assets no pipeline Docker', prio: '▼', prioName: 'Baixa', prioClass: 'low', points: '1 pt', status: 'Concluído', statusColor: 'green', assignee: 'DR' }
      ];

      container.innerHTML = `
        <div class="gt-interactive-wrapper" style="background: var(--bg-surface);">
          <div class="linear-table-header">
            <span style="width:24px;">Prio</span>
            <span style="width:85px;">Chave</span>
            <span style="flex:1;">Título da Tarefa</span>
            <span style="width:60px;">Pontos</span>
            <span style="width:120px;">Status</span>
            <span style="width:32px;">Dev</span>
          </div>
          <div class="linear-table-body" id="linear-list">
            ${issues.map(iss => `
              <div class="linear-issue-row">
                <span class="linear-prio ${iss.prioClass}" title="${iss.prioName}">${iss.prio}</span>
                <span class="linear-id font-mono">${iss.id}</span>
                <span class="linear-title">${iss.title}</span>
                <span class="linear-points font-mono">${iss.points}</span>
                <span class="linear-status-pill ${iss.statusColor}">${iss.status}</span>
                <div class="linear-avatar">${iss.assignee}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  },

  // -------------------------------------------------------------
  // 5. CLOUD INFRASTRUCTURE & SERVER HEALTH TABLE
  // -------------------------------------------------------------
  {
    id: 'server-health-table',
    name: 'Cloud Infrastructure & Server Health',
    ptName: 'Monitor de Infraestrutura & Saúde de Servidores',
    category: 'developer',
    categoryLabel: 'DevOps & Matrizes',
    dribbbleTrend: 'Pulsing Live Dot + Micro Gauge Bars + Region Flags',
    concept: 'Tabela de monitoramento de instâncias e nós de cluster com indicadores de status com animação de pulso (ripple) e barras de consumo.',
    whyItMatters: 'Essencial em produtos como AWS Console, Vercel, Datadog e Grafana para identificar gargalos em fração de segundos.',
    goldenRule: 'Adicione limiares visuais nas barras: verde (<60%), amarelo (60-85%) e vermelho (>85%).',
    commonPitfall: 'Exibir apenas o valor textual sem barra comparativa, obrigando o operador a ler número por número.',
    mnemonic: 'Verde opera, amarelo alerta, vermelho acelera.',
    htmlSnippet: `<tr class="gt-server-row">
  <td>
    <div class="gt-server-name-cell">
      <span class="gt-live-pulse-dot is-online"></span>
      <div>
        <div class="gt-node-title">prod-ingress-worker-01</div>
        <div class="gt-node-sub">us-east-1 • Ubuntu 24.04 LTS</div>
      </div>
    </div>
  </td>
  <td>
    <div class="gt-meter-cell">
      <div class="gt-meter-bar"><div class="gt-meter-fill is-green" style="width: 38%;"></div></div>
      <span class="gt-meter-val font-mono">38%</span>
    </div>
  </td>
  <td class="font-mono text-right">12ms</td>
  <td class="text-right"><button class="gt-btn-xs">Logs</button></td>
</tr>`,
    cssSnippet: `.gt-live-pulse-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: relative;
  background: #10b981;
}
.gt-live-pulse-dot::after {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 2px solid #10b981;
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  opacity: 0.7;
}`,
    renderInteractive: (container: HTMLElement) => {
      const servers = [
        { name: 'prod-edge-gateway-01', region: 'us-east-virginia', cpu: 32, ram: 45, latency: '14ms', status: 'Operacional', isOnline: true },
        { name: 'prod-db-replica-primary', region: 'sa-east-saopaulo', cpu: 78, ram: 84, latency: '28ms', status: 'Carga Alta', isOnline: true, isWarning: true },
        { name: 'prod-cache-redis-02', region: 'eu-central-frankfurt', cpu: 18, ram: 30, latency: '82ms', status: 'Operacional', isOnline: true },
        { name: 'batch-worker-transcode', region: 'us-west-oregon', cpu: 94, ram: 91, latency: '41ms', status: 'Crítico', isOnline: true, isCritical: true }
      ];

      container.innerHTML = `
        <div class="gt-table-responsive">
          <table class="gt-table gt-table-hover">
            <thead>
              <tr>
                <th>Instância / Host</th>
                <th style="width: 170px;">CPU (Core)</th>
                <th style="width: 170px;">RAM (Memória)</th>
                <th class="text-right">Latência</th>
                <th>Estado</th>
                <th class="text-right" style="width: 120px;">Ações</th>
              </tr>
            </thead>
            <tbody>
              ${servers.map(s => {
                const cpuColor = s.cpu > 85 ? 'is-danger' : s.cpu > 65 ? 'is-warning' : 'is-success';
                const ramColor = s.ram > 85 ? 'is-danger' : s.ram > 65 ? 'is-warning' : 'is-success';
                const dotClass = s.isCritical ? 'dot-danger' : s.isWarning ? 'dot-warning' : 'dot-success';

                return `
                  <tr>
                    <td>
                      <div class="gt-server-name-cell">
                        <span class="gt-pulse-indicator ${dotClass}"></span>
                        <div>
                          <div class="gt-node-title font-mono">${s.name}</div>
                          <div class="gt-node-sub">${s.region}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="gt-meter-cell">
                        <div class="gt-meter-track"><div class="gt-meter-fill ${cpuColor}" style="width: ${s.cpu}%;"></div></div>
                        <span class="gt-meter-val font-mono">${s.cpu}%</span>
                      </div>
                    </td>
                    <td>
                      <div class="gt-meter-cell">
                        <div class="gt-meter-track"><div class="gt-meter-fill ${ramColor}" style="width: ${s.ram}%;"></div></div>
                        <span class="gt-meter-val font-mono">${s.ram}%</span>
                      </div>
                    </td>
                    <td class="text-right font-mono">${s.latency}</td>
                    <td><span class="gt-status-dot ${dotClass}">${s.status}</span></td>
                    <td class="text-right">
                      <button class="gt-btn-xs" onclick="alert('Visualizando métricas de: ${s.name}')">Métricas</button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;
    }
  },

  // -------------------------------------------------------------
  // 6. SECURITY AUDIT LOGS & JSON PAYLOAD TABLE
  // -------------------------------------------------------------
  {
    id: 'audit-log-table',
    name: 'Security Audit Stream & JSON Payload',
    ptName: 'Logs de Auditoria de Segurança com Inspetor JSON',
    category: 'developer',
    categoryLabel: 'DevOps & Matrizes',
    dribbbleTrend: 'Severity Chips + Collapsible Monospace JSON Inspector',
    concept: 'Fluxo contínuo de eventos de segurança com níveis de severidade (CRITICAL, WARN, INFO) e expansão inline do payload JSON bruto.',
    whyItMatters: 'Imprescindível para times de cibersegurança e compliance (SOC2/LGPD) auditarem ações de usuários no sistema.',
    goldenRule: 'Forneça botão de cópia rápida para o objeto JSON inteiro para facilitar o reporte de bugs no Slack/Jira.',
    commonPitfall: 'Quebrar o JSON em texto sem quebras de linha ou perder o monospace, tornando a depuração impossível.',
    mnemonic: 'Log ordenado no tempo, payload à disposição no clique.',
    htmlSnippet: `<tr class="gt-log-row">
  <td class="font-mono text-muted">2026-09-08 13:05:42</td>
  <td><span class="gt-badge gt-badge-danger">CRITICAL</span></td>
  <td><code>auth.brute_force_detected</code></td>
  <td class="font-mono">189.44.12.90</td>
  <td><button class="gt-btn-inspect">Inspecionar JSON</button></td>
</tr>`,
    cssSnippet: `.gt-json-code-block {
  background: #090d16;
  color: #38bdf8;
  padding: 1rem;
  border-radius: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  overflow-x: auto;
}`,
    renderInteractive: (container: HTMLElement) => {
      const logs = [
        { time: '13:05:12', sev: 'CRITICAL', sevClass: 'danger', event: 'auth.brute_force_blocked', ip: '189.44.12.90', actor: 'attacker_bot', payload: '{\n  "attempts": 42,\n  "target": "admin@empresa.com",\n  "blocked_by": "Cloudflare WAF",\n  "duration_ms": 320\n}' },
        { time: '13:02:44', sev: 'WARN', sevClass: 'warning', event: 'org.member_privilege_escalated', ip: '177.18.204.11', actor: 'marcos.cto', payload: '{\n  "user_id": "usr_99812",\n  "new_role": "billing_admin",\n  "approved_by": "auto_policy"\n}' },
        { time: '12:58:19', sev: 'INFO', sevClass: 'info', event: 'api_key.created', ip: '200.12.9.4', actor: 'julia.lead', payload: '{\n  "key_name": "Zapier Webhook Sync",\n  "scopes": ["read:customers", "write:leads"]\n}' }
      ];

      container.innerHTML = `
        <div class="gt-table-responsive">
          <table class="gt-table gt-table-hover">
            <thead>
              <tr>
                <th>Horário</th>
                <th>Severidade</th>
                <th>Identificador do Evento</th>
                <th>IP de Origem</th>
                <th>Ator</th>
                <th class="text-right">Payload</th>
              </tr>
            </thead>
            <tbody>
              ${logs.map((l, i) => `
                <tr>
                  <td class="font-mono text-muted">${l.time}</td>
                  <td><span class="gt-badge gt-badge-${l.sevClass}">${l.sev}</span></td>
                  <td><code style="color:var(--brand-primary); font-size:0.8125rem;">${l.event}</code></td>
                  <td class="font-mono text-muted">${l.ip}</td>
                  <td>${l.actor}</td>
                  <td class="text-right">
                    <button class="gt-btn-inspect-demo" data-log-index="${i}">Ver JSON</button>
                  </td>
                </tr>
                <tr id="json-drawer-${i}" style="display:none; background:var(--bg-surface-elevated);">
                  <td colspan="6">
                    <div style="padding:1rem;">
                      <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                        <span style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">PAYLOAD COMPLETO DO EVENTO:</span>
                        <button class="gt-btn-copy-json" data-copy="${encodeURIComponent(l.payload)}" style="font-size:0.75rem; cursor:pointer;">Copiar JSON</button>
                      </div>
                      <pre class="gt-json-code-block"><code>${l.payload}</code></pre>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;

      container.querySelectorAll('.gt-btn-inspect-demo').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = btn.getAttribute('data-log-index');
          const row = container.querySelector(`#json-drawer-${idx}`) as HTMLElement;
          const isOpen = row.style.display !== 'none';
          row.style.display = isOpen ? 'none' : 'table-row';
          btn.textContent = isOpen ? 'Ver JSON' : 'Fechar';
        });
      });

      container.querySelectorAll('.gt-btn-copy-json').forEach(btn => {
        btn.addEventListener('click', async () => {
          const content = decodeURIComponent(btn.getAttribute('data-copy') || '');
          await navigator.clipboard.writeText(content);
          btn.textContent = 'Copiado! ✓';
          setTimeout(() => btn.textContent = 'Copiar JSON', 1500);
        });
      });
    }
  },

  // -------------------------------------------------------------
  // 7. E-COMMERCE PRODUCT INVENTORY & STOCK ALERT TABLE
  // -------------------------------------------------------------
  {
    id: 'inventory-stock-table',
    name: 'E-Commerce Inventory & Stock Alert Table',
    ptName: 'Tabela de Estoque & Reposição com Alerta',
    category: 'commerce',
    categoryLabel: 'E-Commerce & Catálogo',
    dribbbleTrend: 'Rounded Product Thumbnails + Threshold Progress Bars + Quick Restock CTA',
    concept: 'Gerenciamento de estoque com foto miniatura do produto, código SKU, indicador de nível com barra colorida e aviso de escassez.',
    whyItMatters: 'Previne rupturas de estoque em lojas virtuais e agiliza a tomada de decisão para reabastecimento de armazém.',
    goldenRule: 'Quando o estoque estiver abaixo do limite mínimo (ex: < 10 un.), destaque a linha com cor de alerta e botão de ação direta.',
    commonPitfall: 'Mostrar apenas números absolutos sem contextualizar o limite crítico de reposição do fornecedor.',
    mnemonic: 'Estoque alto respira, estoque baixo avisa, estoque zero paralisa.',
    htmlSnippet: `<tr class="gt-inventory-row is-low-stock">
  <td>
    <div class="gt-prod-cell">
      <div class="gt-prod-img">👟</div>
      <div>
        <div class="gt-prod-title">Tênis Runner Pro Carbon</div>
        <span class="gt-sku font-mono">SKU-RUN-801</span>
      </div>
    </div>
  </td>
  <td>R$ 799,90</td>
  <td>
    <div class="gt-stock-meter">
      <div class="gt-meter-track"><div class="gt-meter-fill is-danger" style="width: 12%;"></div></div>
      <span class="gt-stock-count font-mono text-danger">4 un. restantes</span>
    </div>
  </td>
  <td><span class="gt-badge gt-badge-danger">Repor Urgente</span></td>
  <td class="text-right"><button class="gt-btn-primary-xs">Pedir Fornecedor</button></td>
</tr>`,
    cssSnippet: `.gt-prod-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.gt-prod-img {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: var(--bg-surface-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}`,
    renderInteractive: (container: HTMLElement) => {
      const products = [
        { icon: '👟', title: 'Tênis Runner Pro Carbon', sku: 'SKU-RUN-801', price: 'R$ 799,90', stock: 4, max: 50, status: 'Crítico', badgeClass: 'danger' },
        { icon: '🎒', title: 'Mochila Impermeável Tech 30L', sku: 'SKU-BAG-209', price: 'R$ 389,00', stock: 42, max: 60, status: 'Normal', badgeClass: 'success' },
        { icon: '⌚', title: 'Smartwatch AMOLED Titanium', sku: 'SKU-WTC-552', price: 'R$ 1.299,00', stock: 9, max: 40, status: 'Baixo', badgeClass: 'warning' },
        { icon: '🎧', title: 'Fone Wireless Active Noise', sku: 'SKU-AUD-910', price: 'R$ 549,90', stock: 68, max: 80, status: 'Normal', badgeClass: 'success' }
      ];

      container.innerHTML = `
        <div class="gt-table-responsive">
          <table class="gt-table gt-table-hover">
            <thead>
              <tr>
                <th>Produto & SKU</th>
                <th class="text-right">Preço Unitário</th>
                <th style="width: 200px;">Nível de Estoque</th>
                <th>Estado</th>
                <th class="text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              ${products.map(p => {
                const percent = Math.round((p.stock / p.max) * 100);
                const barColor = p.badgeClass === 'danger' ? 'is-danger' : p.badgeClass === 'warning' ? 'is-warning' : 'is-success';

                return `
                  <tr>
                    <td>
                      <div class="gt-prod-cell">
                        <div class="gt-prod-img">${p.icon}</div>
                        <div>
                          <div class="gt-prod-title"><strong>${p.title}</strong></div>
                          <span class="gt-sku font-mono text-muted">${p.sku}</span>
                        </div>
                      </div>
                    </td>
                    <td class="text-right font-mono">${p.price}</td>
                    <td>
                      <div class="gt-stock-meter">
                        <div class="gt-meter-track"><div class="gt-meter-fill ${barColor}" style="width: ${percent}%;"></div></div>
                        <div style="display:flex; justify-content:space-between; font-size:0.75rem; margin-top:2px;">
                          <span class="font-mono">${p.stock} un.</span>
                          <span class="text-muted font-mono">${percent}%</span>
                        </div>
                      </div>
                    </td>
                    <td><span class="gt-badge gt-badge-${p.badgeClass}">${p.status}</span></td>
                    <td class="text-right">
                      <button class="gt-btn-primary-xs restock-btn" data-sku="${p.sku}">Pedir +50</button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;

      container.querySelectorAll('.restock-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          btn.textContent = 'Pedido Feito!';
          (btn as HTMLElement).style.background = '#10b981';
          setTimeout(() => {
            btn.textContent = 'Pedir +50';
            (btn as HTMLElement).style.background = '';
          }, 1500);
        });
      });
    }
  },

  // -------------------------------------------------------------
  // 8. GRANULAR RBAC USER PERMISSIONS MATRIX TABLE
  // -------------------------------------------------------------
  {
    id: 'rbac-matrix-table',
    name: 'Granular RBAC Permissions Matrix',
    ptName: 'Matriz de Permissões RBAC (Controle por Papéis)',
    category: 'developer',
    categoryLabel: 'DevOps & Matrizes',
    dribbbleTrend: 'Check Toggle Matrix + Role Headers + Interactive Bulk Switchers',
    concept: 'Tabela bidimensional de matriz de controle de acesso (RBAC) onde as linhas representam permissões e as colunas os cargos.',
    whyItMatters: 'Fundamental em plataformas corporativas para configurar papéis de Super Admin, Editor, Financeiro e Visualizador.',
    goldenRule: 'Agrupe as permissões por módulo de produto (Usuários, Faturamento, Deploy) com cabeçalhos de seção destacados.',
    commonPitfall: 'Salvar cada clique individualmente sem feedback ou sem botão claro de reverter/salvar alterações.',
    mnemonic: 'Quem pode o quê: linha é ação, coluna é função.',
    htmlSnippet: `<table class="gt-table gt-matrix-table">
  <thead>
    <tr>
      <th>Módulo & Capacidade</th>
      <th class="text-center">Super Admin</th>
      <th class="text-center">Gerente</th>
      <th class="text-center">Operador</th>
      <th class="text-center">Leitor</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Excluir usuários e workspaces</td>
      <td class="text-center"><input type="checkbox" checked disabled></td>
      <td class="text-center"><input type="checkbox"></td>
      <td class="text-center"><input type="checkbox" disabled></td>
      <td class="text-center"><input type="checkbox" disabled></td>
    </tr>
  </tbody>
</table>`,
    cssSnippet: `.gt-matrix-table th {
  text-align: center;
}
.gt-matrix-table th:first-child {
  text-align: left;
}
.gt-matrix-table input[type="checkbox"] {
  accent-color: var(--brand-primary);
  width: 18px;
  height: 18px;
  cursor: pointer;
}`,
    renderInteractive: (container: HTMLElement) => {
      const rows = [
        { section: 'Módulo de Usuários & Contas' },
        { title: 'Convidar novos membros de equipe', admin: true, manager: true, editor: false, viewer: false },
        { title: 'Excluir contas e alterar permissões globais', admin: true, manager: false, editor: false, viewer: false },
        { section: 'Módulo de Faturamento & Pagamentos' },
        { title: 'Visualizar faturas e histórico de cartões', admin: true, manager: true, editor: false, viewer: false },
        { title: 'Alterar plano contratado e cancelar assinatura', admin: true, manager: false, editor: false, viewer: false },
        { section: 'Módulo de Infraestrutura & Deploy' },
        { title: 'Disparar deploy em produção', admin: true, manager: true, editor: true, viewer: false },
        { title: 'Exportar logs brutos e dumps de banco', admin: true, manager: false, editor: false, viewer: false }
      ];

      container.innerHTML = `
        <div class="gt-table-responsive">
          <table class="gt-table gt-matrix-table">
            <thead>
              <tr>
                <th>Capacidade do Sistema</th>
                <th class="text-center" style="width: 120px;">Super Admin</th>
                <th class="text-center" style="width: 120px;">Gerente</th>
                <th class="text-center" style="width: 120px;">Editor</th>
                <th class="text-center" style="width: 120px;">Leitor</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map(r => {
                if (r.section) {
                  return `
                    <tr class="gt-matrix-section-header">
                      <td colspan="5" style="background:var(--bg-surface-elevated); font-weight:700; color:var(--brand-primary); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; padding:0.5rem 1rem;">
                        ${r.section}
                      </td>
                    </tr>
                  `;
                }
                return `
                  <tr>
                    <td>${r.title}</td>
                    <td class="text-center"><input type="checkbox" ${r.admin ? 'checked' : ''} disabled title="Admin possui todas as permissões"></td>
                    <td class="text-center"><input type="checkbox" class="rbac-chk" ${r.manager ? 'checked' : ''}></td>
                    <td class="text-center"><input type="checkbox" class="rbac-chk" ${r.editor ? 'checked' : ''}></td>
                    <td class="text-center"><input type="checkbox" class="rbac-chk" ${r.viewer ? 'checked' : ''}></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
          <div style="padding:0.75rem 1rem; display:flex; justify-content:space-between; align-items:center; background:var(--bg-surface-elevated); border-top:1px solid var(--border-subtle);">
            <span style="font-size:0.75rem; color:var(--text-muted);">* Super Admin tem permissões imutáveis por política de segurança.</span>
            <button class="gt-btn-primary-xs" id="rbac-save-btn">Salvar Matriz</button>
          </div>
        </div>
      `;

      const saveBtn = container.querySelector('#rbac-save-btn');
      saveBtn?.addEventListener('click', () => {
        saveBtn.textContent = 'Permissões Salvas! ✓';
        setTimeout(() => saveBtn.textContent = 'Salvar Matriz', 1500);
      });
    }
  },

  // -------------------------------------------------------------
  // 9. API KEYS & WEBHOOK ENDPOINTS TABLE
  // -------------------------------------------------------------
  {
    id: 'api-keys-table',
    name: 'Developer API Keys & Webhook Endpoints',
    ptName: 'Gerenciador de Chaves de API & Webhooks',
    category: 'developer',
    categoryLabel: 'DevOps & Matrizes',
    dribbbleTrend: 'Masked Secrets with Reveal Toggle + Copy Chip + Scopes Badges',
    concept: 'Tabela de segurança técnica com chaves criptográficas mascaradas (ex: `sk_live_••••••••`), botão de revelar, cópia com um clique e escopos.',
    whyItMatters: 'Padrão das documentações de desenvolvedores (Stripe, OpenAI, Supabase). Combina segurança visual com utilidade imediata.',
    goldenRule: 'Nunca exiba a chave secreta completa por padrão no DOM; revele apenas sob demanda do usuário.',
    commonPitfall: 'Não fornecer feedback visual quando o usuário copia a chave para a área de transferência.',
    mnemonic: 'Chave mascarada protege, botão copia agiliza.',
    htmlSnippet: `<tr class="gt-key-row">
  <td>
    <div class="gt-key-title">Produção Mobile App</div>
    <div class="gt-key-secret font-mono">
      <span>sk_live_••••••••••••••••94b2</span>
      <button class="gt-btn-reveal">👁</button>
      <button class="gt-btn-copy">Copiar</button>
    </div>
  </td>
  <td><span class="gt-badge gt-badge-indigo">read, write</span></td>
  <td class="font-mono text-muted">Hoje, 11:42</td>
  <td class="text-right"><button class="gt-btn-danger-xs">Revogar</button></td>
</tr>`,
    cssSnippet: `.gt-key-secret {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--bg-surface-elevated);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.8125rem;
}`,
    renderInteractive: (container: HTMLElement) => {
      const keys = [
        { name: 'Gateway Produção Web', masked: 'sk_live_••••••••••••4a81', full: 'sk_live_9921b778c1094a81', scopes: ['read:all', 'charge:write'], lastUsed: 'Há 4 min' },
        { name: 'Webhook Integração ERP', masked: 'whsec_••••••••••••99f2', full: 'whsec_554812aa89bb99f2', scopes: ['events:listen'], lastUsed: 'Há 18 min' },
        { name: 'Ambiente Sandbox Dev', masked: 'sk_test_••••••••••••33e7', full: 'sk_test_001289fe228833e7', scopes: ['test:all'], lastUsed: 'Ontem' }
      ];

      container.innerHTML = `
        <div class="gt-table-responsive">
          <table class="gt-table gt-table-hover">
            <thead>
              <tr>
                <th>Nome da Chave / Identificador</th>
                <th>Token Secreto</th>
                <th>Escopos Permitidos</th>
                <th>Último Acesso</th>
                <th class="text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              ${keys.map((k, i) => `
                <tr>
                  <td><strong>${k.name}</strong></td>
                  <td>
                    <div class="gt-key-secret">
                      <span id="key-text-${i}" class="font-mono">${k.masked}</span>
                      <button class="gt-btn-icon-xs toggle-reveal-btn" data-index="${i}" data-masked="${k.masked}" data-full="${k.full}" title="Revelar/Ocultar">👁</button>
                      <button class="gt-btn-copy-chip copy-key-btn" data-full="${k.full}">Copiar</button>
                    </div>
                  </td>
                  <td>
                    <div style="display:flex; gap:4px; flex-wrap:wrap;">
                      ${k.scopes.map(sc => `<span class="gt-code-pill">${sc}</span>`).join('')}
                    </div>
                  </td>
                  <td class="text-muted font-mono" style="font-size:0.8125rem;">${k.lastUsed}</td>
                  <td class="text-right">
                    <button class="gt-btn-danger-xs" onclick="alert('Chave revogada com sucesso!')">Revogar</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;

      container.querySelectorAll('.toggle-reveal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = btn.getAttribute('data-index');
          const span = container.querySelector(`#key-text-${idx}`) as HTMLElement;
          const masked = btn.getAttribute('data-masked') || '';
          const full = btn.getAttribute('data-full') || '';
          const isRevealed = span.textContent === full;

          span.textContent = isRevealed ? masked : full;
          btn.textContent = isRevealed ? '👁' : '🔒';
        });
      });

      container.querySelectorAll('.copy-key-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const full = btn.getAttribute('data-full') || '';
          await navigator.clipboard.writeText(full);
          btn.textContent = 'Copiado!';
          setTimeout(() => btn.textContent = 'Copiar', 1500);
        });
      });
    }
  },

  // -------------------------------------------------------------
  // 10. B2B INVOICES & BILLING HISTORY TABLE
  // -------------------------------------------------------------
  {
    id: 'invoices-billing-table',
    name: 'B2B Invoices & Billing History',
    ptName: 'Histórico de Faturas B2B & Download de PDF',
    category: 'fintech',
    categoryLabel: 'Fintech & Finanças',
    dribbbleTrend: 'Status Pills + Formatted Currencies + Inline PDF Action Triggers',
    concept: 'Tabela financeira corporativa para consulta de faturas com vencimento, tomador de serviço e download direto de comprovantes em PDF.',
    whyItMatters: 'Diminui os chamados no suporte de faturamento ao dar autonomia total para o cliente baixar extratos e notas fiscais.',
    goldenRule: 'Status "Pago" deve transmitir segurança (verde sólido ou sutil); "Em Aberto/Vencido" deve usar contraste imediato.',
    commonPitfall: 'Esconder o botão de download de PDF dentro de menus aninhados de três pontinhos.',
    mnemonic: 'Fatura clara, pagamento ágil, PDF na mão.',
    htmlSnippet: `<tr class="gt-invoice-row">
  <td class="font-mono">#INV-2026-004</td>
  <td>01/Set/2026</td>
  <td>15/Set/2026</td>
  <td><span class="gt-badge gt-badge-success">Pago</span></td>
  <td class="font-mono text-right"><strong>R$ 3.840,00</strong></td>
  <td class="text-right">
    <button class="gt-btn-pdf" title="Baixar PDF">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      PDF
    </button>
  </td>
</tr>`,
    cssSnippet: `.gt-btn-pdf {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}
.gt-btn-pdf:hover {
  border-color: var(--brand-primary);
  color: var(--brand-primary);
}`,
    renderInteractive: (container: HTMLElement) => {
      const invoices = [
        { num: '#INV-2026-089', issue: '01/Set/2026', due: '15/Set/2026', status: 'Pago', badge: 'success', val: 'R$ 8.920,00' },
        { num: '#INV-2026-088', issue: '01/Ago/2026', due: '15/Ago/2026', status: 'Pago', badge: 'success', val: 'R$ 8.920,00' },
        { num: '#INV-2026-087', issue: '01/Jul/2026', due: '15/Jul/2026', status: 'Pago', badge: 'success', val: 'R$ 7.450,00' },
        { num: '#INV-2026-090', issue: '05/Set/2026', due: '20/Set/2026', status: 'Pendente', badge: 'warning', val: 'R$ 1.280,00' }
      ];

      container.innerHTML = `
        <div class="gt-table-responsive">
          <table class="gt-table gt-table-hover">
            <thead>
              <tr>
                <th>Número da Fatura</th>
                <th>Data de Emissão</th>
                <th>Vencimento</th>
                <th>Estado</th>
                <th class="text-right">Total Cobrado</th>
                <th class="text-right">Comprovante</th>
              </tr>
            </thead>
            <tbody>
              ${invoices.map(inv => `
                <tr>
                  <td class="font-mono"><strong>${inv.num}</strong></td>
                  <td class="text-muted">${inv.issue}</td>
                  <td>${inv.due}</td>
                  <td><span class="gt-badge gt-badge-${inv.badge}">${inv.status}</span></td>
                  <td class="text-right font-mono"><strong>${inv.val}</strong></td>
                  <td class="text-right">
                    <button class="gt-btn-pdf invoice-dl-btn" data-num="${inv.num}">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      PDF
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;

      container.querySelectorAll('.invoice-dl-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          btn.innerHTML = 'Baixando...';
          setTimeout(() => {
            btn.innerHTML = 'Baixado ✓';
            setTimeout(() => {
              btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> PDF`;
            }, 1200);
          }, 600);
        });
      });
    }
  },

  // -------------------------------------------------------------
  // 11. LOGISTICS & FREIGHT SHIPMENT PIPELINE TABLE
  // -------------------------------------------------------------
  {
    id: 'logistics-pipeline-table',
    name: 'Logistics & Freight Shipment Pipeline',
    ptName: 'Pipeline Logístico & Rastreamento Multi-etapa',
    category: 'commerce',
    categoryLabel: 'E-Commerce & Catálogo',
    dribbbleTrend: 'Multi-node Progress Trackers + Courier Brand Badges + ETA Pills',
    concept: 'Tabela de frete e cadeia de suprimentos onde cada linha apresenta uma barra de nós conectando a origem ao destino.',
    whyItMatters: 'Comum em painéis de logística como Flexport, Shippo e Mercado Envios para monitorar remessas em trânsito.',
    goldenRule: 'Exiba visualmente o ponto exato da carga na linha de nós para eliminar a necessidade de abrir outra página de rastreio.',
    commonPitfall: 'Usar apenas texto de status ("Em trânsito") sem indicar a transportadora e a previsão estimada de entrega (ETA).',
    mnemonic: 'Origem conecta, nó acende, destino conclui.',
    htmlSnippet: `<div class="gt-logistics-cell">
  <div class="gt-route-names">São Paulo (GRU) ➔ Miami (MIA)</div>
  <div class="gt-route-nodes">
    <span class="node done"></span>
    <span class="line done"></span>
    <span class="node current"></span>
    <span class="line"></span>
    <span class="node"></span>
  </div>
</div>`,
    cssSnippet: `.gt-route-nodes {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
}
.gt-route-nodes .node {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border-medium);
}
.gt-route-nodes .node.done,
.gt-route-nodes .node.current {
  background: var(--brand-primary);
}
.gt-route-nodes .line {
  flex: 1;
  height: 2px;
  background: var(--border-medium);
}
.gt-route-nodes .line.done {
  background: var(--brand-primary);
}`,
    renderInteractive: (container: HTMLElement) => {
      const shipments = [
        { code: 'SHP-8819', courier: 'DHL Express', route: 'Campinas (VCP) ➔ Frankfurt (FRA)', step: 3, eta: 'Amanhã, 14:00', status: 'Voo Internacional' },
        { code: 'SHP-8820', courier: 'FedEx Cargo', route: 'Santos (Porto) ➔ Rotterdam (NLD)', step: 2, eta: '14/Set', status: 'Em Trânsito Marítimo' },
        { code: 'SHP-8821', courier: 'Azul Cargo', route: 'Manaus (MAO) ➔ Brasília (BSB)', step: 4, eta: 'Hoje, 18:30', status: 'Saiu p/ Entrega' }
      ];

      container.innerHTML = `
        <div class="gt-table-responsive">
          <table class="gt-table gt-table-hover">
            <thead>
              <tr>
                <th>Código / Carga</th>
                <th>Transportadora</th>
                <th style="min-width: 260px;">Rota & Progresso</th>
                <th>Previsão (ETA)</th>
                <th>Status Atual</th>
              </tr>
            </thead>
            <tbody>
              ${shipments.map(s => `
                <tr>
                  <td><strong class="font-mono">${s.code}</strong></td>
                  <td><span class="gt-badge gt-badge-indigo">${s.courier}</span></td>
                  <td>
                    <div>
                      <div style="font-size:0.8125rem; font-weight:600;">${s.route}</div>
                      <div class="gt-route-nodes">
                        <span class="node done" title="Origem coletada"></span>
                        <span class="line ${s.step >= 2 ? 'done' : ''}"></span>
                        <span class="node ${s.step >= 2 ? (s.step === 2 ? 'current' : 'done') : ''}" title="Centro de Distribuição"></span>
                        <span class="line ${s.step >= 3 ? 'done' : ''}"></span>
                        <span class="node ${s.step >= 3 ? (s.step === 3 ? 'current' : 'done') : ''}" title="Em trânsito internacional"></span>
                        <span class="line ${s.step >= 4 ? 'done' : ''}"></span>
                        <span class="node ${s.step === 4 ? 'current' : ''}" title="Entrega final"></span>
                      </div>
                    </div>
                  </td>
                  <td><span class="gt-code-pill font-mono">${s.eta}</span></td>
                  <td><span class="gt-status-dot dot-success">${s.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }
  },

  // -------------------------------------------------------------
  // 12. HEALTHCARE & PATIENT VITALS TRIAGE TABLE
  // -------------------------------------------------------------
  {
    id: 'healthcare-vitals-table',
    name: 'Healthcare Patient Vitals & Triage',
    ptName: 'Monitor Hospitalar de Triagem & Sinais Vitais',
    category: 'tables',
    categoryLabel: 'Data Tables Avançadas',
    dribbbleTrend: 'Live Pulse Heart Indicator + Vitals Gauges + Manchester Triage Colors',
    concept: 'Tabela clínica para leitos hospitalares com prioridade de triagem (Vermelho, Amarelo, Verde), batimentos cardíacos (BPM) e saturação SpO2.',
    whyItMatters: 'Em interfaces de saúde e UTI, clareza e contraste podem literalmente salvar vidas ao alertar instabilidades fisiológicas.',
    goldenRule: 'Siga a classificação internacional de triagem (Manchester): Vermelho (Imediato), Laranja (Muito urgente), Amarelo (Urgente).',
    commonPitfall: 'Substituir números de pressão arterial por gráficos abstratos que dificultam a leitura da equipe médica.',
    mnemonic: 'Vermelho atende agora, batimento pulsa ao vivo.',
    htmlSnippet: `<tr class="gt-patient-row is-urgent">
  <td>
    <strong>Carlos Alberto Silva</strong>
    <div class="text-muted" style="font-size:0.75rem;">Leito 04-B • UTI Geral</div>
  </td>
  <td><span class="gt-badge gt-badge-danger">Emergência</span></td>
  <td class="font-mono">
    <span class="gt-heart-pulse">❤️</span> <strong>128 BPM</strong>
  </td>
  <td class="font-mono">140/95 mmHg</td>
  <td class="font-mono">92% SpO2</td>
</tr>`,
    cssSnippet: `.gt-heart-pulse {
  display: inline-block;
  animation: pulse 1s infinite;
}`,
    renderInteractive: (container: HTMLElement) => {
      const patients = [
        { name: 'Arthur Guimarães', bed: 'Leito 04-B • UTI Geral', priority: 'Emergência', prioBadge: 'danger', bpm: 128, bp: '140/95', spo2: '92%', isAlert: true },
        { name: 'Helena Duarte Santos', bed: 'Leito 12-A • Enfermaria', priority: 'Pouco Urgente', prioBadge: 'teal', bpm: 74, bp: '120/80', spo2: '98%' },
        { name: 'Roberto Firmino Costa', bed: 'Leito 08-C • Semi-Intensiva', priority: 'Urgente', prioBadge: 'warning', bpm: 104, bp: '135/88', spo2: '95%' }
      ];

      container.innerHTML = `
        <div class="gt-table-responsive">
          <table class="gt-table gt-table-hover">
            <thead>
              <tr>
                <th>Paciente & Leito</th>
                <th>Classificação de Triagem</th>
                <th>Batimentos (BPM)</th>
                <th>Pressão Arterial</th>
                <th>Oxigenação (SpO2)</th>
                <th class="text-right">Ação Rápida</th>
              </tr>
            </thead>
            <tbody>
              ${patients.map(p => `
                <tr ${p.isAlert ? 'style="background: rgba(239, 68, 68, 0.08);"' : ''}>
                  <td>
                    <div>
                      <strong>${p.name}</strong>
                      <div class="text-muted" style="font-size:0.75rem;">${p.bed}</div>
                    </div>
                  </td>
                  <td><span class="gt-badge gt-badge-${p.prioBadge}">${p.priority}</span></td>
                  <td>
                    <span class="gt-heart-pulse" style="color:#ef4444;">♥</span>
                    <strong class="font-mono">${p.bpm} BPM</strong>
                  </td>
                  <td class="font-mono">${p.bp} mmHg</td>
                  <td class="font-mono" style="${p.isAlert ? 'color:#ef4444; font-weight:700;' : ''}">${p.spo2}</td>
                  <td class="text-right">
                    <button class="gt-btn-xs ${p.isAlert ? 'gt-btn-danger' : ''}" onclick="alert('Prontuário de ${p.name}')">Prontuário</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }
  },

  // -------------------------------------------------------------
  // 13. CUSTOMER FEEDBACK & NPS SENTIMENT TABLE
  // -------------------------------------------------------------
  {
    id: 'feedback-sentiment-table',
    name: 'Customer Feedback & NPS Sentiment Table',
    ptName: 'Análise de Sentimento & NPS de Feedback',
    category: 'tables',
    categoryLabel: 'Data Tables Avançadas',
    dribbbleTrend: 'Star Ratings + Sentiment Color Chips + Quote Excerpts',
    concept: 'Tabela de avaliações de clientes com pontuação de estrelas, tags automáticas de sentimento (Positivo, Neutro, Negativo) e excerto da mensagem.',
    whyItMatters: 'Comum em painéis de suporte e experiência do cliente (Zendesk, Intercom, G2) para detectar detratores rapidamente.',
    goldenRule: 'Mantenha o comentário em linha única com reticências (`text-overflow: ellipsis`) e tooltip ao passar o mouse.',
    commonPitfall: 'Permitir que comentários longos quebrem a altura de linhas adjacentes, desbalanceando a tabela.',
    mnemonic: 'Estrelas quantificam, sentimento classifica, texto explica.',
    htmlSnippet: `<tr class="gt-feedback-row">
  <td>
    <div class="gt-user-cell">
      <div class="gt-avatar">FD</div>
      <div><strong>Fernanda Dias</strong><div class="text-muted" style="font-size:0.75rem;">Há 2 horas</div></div>
    </div>
  </td>
  <td><span style="color:#f59e0b;">★★★★★</span> (5.0)</td>
  <td><span class="gt-badge gt-badge-success">Positivo</span></td>
  <td class="gt-quote-cell">"A velocidade de integração da nova API reduziu nosso tempo de deploy em 70%!"</td>
</tr>`,
    cssSnippet: `.gt-quote-cell {
  max-width: 320px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-secondary);
  font-style: italic;
}`,
    renderInteractive: (container: HTMLElement) => {
      const feedbacks = [
        { name: 'Fernanda Dias', avatar: 'FD', time: 'Há 2 horas', stars: '★★★★★', score: '5.0', sentiment: 'Positivo', badge: 'success', quote: 'A velocidade de integração da nova API reduziu nosso tempo de deploy em 70%!' },
        { name: 'Lucas Brandão', avatar: 'LB', time: 'Há 5 horas', stars: '★★☆☆☆', score: '2.0', sentiment: 'Negativo', badge: 'danger', quote: 'Tivemos timeout recorrente na exportação de relatórios pesados de mais de 100k linhas.' },
        { name: 'Carla Nogueira', avatar: 'CN', time: 'Ontem', stars: '★★★★☆', score: '4.0', sentiment: 'Neutro', badge: 'warning', quote: 'Interface muito bonita, mas gostaria de ver mais opções de temas customizados.' }
      ];

      container.innerHTML = `
        <div class="gt-table-responsive">
          <table class="gt-table gt-table-hover">
            <thead>
              <tr>
                <th>Usuário / Horário</th>
                <th>Avaliação</th>
                <th>Sentimento</th>
                <th>Comentário / Trecho</th>
                <th class="text-right">Responder</th>
              </tr>
            </thead>
            <tbody>
              ${feedbacks.map(f => `
                <tr>
                  <td>
                    <div class="gt-user-cell">
                      <div class="gt-avatar">${f.avatar}</div>
                      <div>
                        <div><strong>${f.name}</strong></div>
                        <div class="text-muted" style="font-size:0.75rem;">${f.time}</div>
                      </div>
                    </div>
                  </td>
                  <td><span style="color:#f59e0b; letter-spacing:2px;">${f.stars}</span> <span class="font-mono text-muted">(${f.score})</span></td>
                  <td><span class="gt-badge gt-badge-${f.badge}">${f.sentiment}</span></td>
                  <td class="gt-quote-cell" title="${f.quote}">"${f.quote}"</td>
                  <td class="text-right"><button class="gt-btn-xs" onclick="alert('Responder a ${f.name}')">Responder</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }
  },

  // -------------------------------------------------------------
  // 14. CLOUD DRIVE FILE & ASSET MANAGER TABLE
  // -------------------------------------------------------------
  {
    id: 'file-manager-table',
    name: 'Cloud Drive File & Asset Manager',
    ptName: 'Gerenciador de Arquivos & Ativos em Nuvem',
    category: 'tables',
    categoryLabel: 'Data Tables Avançadas',
    dribbbleTrend: 'File Format Micro-Icons + Collaborator Avatar Stacks + Quick Share Pill',
    concept: 'Tabela de sistema de arquivos com ícones coloridos por extensão (Figma, PDF, MP4, Zip), tamanho e pilha de avatares colaboradores.',
    whyItMatters: 'Interface padrão de ferramentas como Google Drive, Dropbox e Notion para compartilhamento de documentos de equipe.',
    goldenRule: 'Diferencie os tipos de arquivo através de cores e glifos semânticos (vermelho p/ PDF, roxo p/ Figma, azul p/ docs).',
    commonPitfall: 'Não exibir a data da última modificação ou o autor da edição mais recente.',
    mnemonic: 'Ícone indica o tipo, pilha mostra quem mexe.',
    htmlSnippet: `<tr class="gt-file-row">
  <td>
    <div class="gt-file-title-cell">
      <div class="gt-file-icon figma">🎨</div>
      <div>
        <div class="gt-file-name">design-system-v2.fig</div>
        <span class="text-muted" style="font-size:0.75rem;">Editado há 12 min por Sara</span>
      </div>
    </div>
  </td>
  <td class="font-mono">148.2 MB</td>
  <td>
    <div class="gt-avatar-stack">
      <div class="gt-stack-item">SM</div>
      <div class="gt-stack-item">AL</div>
      <div class="gt-stack-item">+3</div>
    </div>
  </td>
  <td class="text-right"><button class="gt-btn-share">Compartilhar</button></td>
</tr>`,
    cssSnippet: `.gt-avatar-stack {
  display: flex;
  align-items: center;
}
.gt-stack-item {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid var(--bg-surface);
  background: var(--brand-primary);
  color: #fff;
  font-size: 0.6875rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -8px;
}
.gt-stack-item:first-child {
  margin-left: 0;
}`,
    renderInteractive: (container: HTMLElement) => {
      const files = [
        { icon: '🎨', name: 'design-system-tokens-v2.fig', size: '148.2 MB', edited: 'Sara M. (há 12 min)', type: 'Figma', members: ['SM', 'AL', '+3'] },
        { icon: '📄', name: 'manual-arquitetura-2026.pdf', size: '12.4 MB', edited: 'Carlos T. (ontem)', type: 'PDF', members: ['CT', 'MK'] },
        { icon: '🎬', name: 'demo-produto-keynote-4k.mp4', size: '820.5 MB', edited: 'Julia R. (há 3 dias)', type: 'Vídeo', members: ['JR'] }
      ];

      container.innerHTML = `
        <div class="gt-table-responsive">
          <table class="gt-table gt-table-hover">
            <thead>
              <tr>
                <th>Nome do Arquivo</th>
                <th>Tamanho</th>
                <th>Colaboradores</th>
                <th>Modificação</th>
                <th class="text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              ${files.map(f => `
                <tr>
                  <td>
                    <div class="gt-file-title-cell">
                      <div class="gt-file-icon">${f.icon}</div>
                      <div>
                        <strong>${f.name}</strong>
                        <div class="text-muted" style="font-size:0.75rem;">${f.edited}</div>
                      </div>
                    </div>
                  </td>
                  <td class="font-mono text-muted">${f.size}</td>
                  <td>
                    <div class="gt-avatar-stack">
                      ${f.members.map(m => `<div class="gt-stack-item">${m}</div>`).join('')}
                    </div>
                  </td>
                  <td><span class="gt-code-pill">${f.type}</span></td>
                  <td class="text-right">
                    <button class="gt-btn-share-demo" onclick="alert('Link copiado para o arquivo: ${f.name}')">Compartilhar</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }
  },

  // -------------------------------------------------------------
  // 15. BENTO GRID 2.0 — MODERN SAAS SHOWCASE
  // -------------------------------------------------------------
  {
    id: 'bento-grid-showcase',
    name: 'Bento Grid 2.0 — SaaS Feature & Metrics',
    ptName: 'Bento Grid 2.0 — Vitrine Assimétrica SaaS',
    category: 'bento',
    categoryLabel: 'Bento & Dashboards',
    dribbbleTrend: 'Asymmetric Span Cards + Neon Subtle Borders + Micro-Widgets',
    concept: 'Layout modular estilo marmita japonesa (Bento Box), popularizado pela Apple e Linear, combinando cards de proporções 2x1, 1x2 e 1x1.',
    whyItMatters: 'Substitui páginas de funcionalidades monótonas por uma experiência visual moderna, dinâmica e altamente memorizável.',
    goldenRule: 'Equilibre o peso visual: o card principal (2x2 ou 2x1) deve conter a métrica estrela com gradiente e maior hierarquia.',
    commonPitfall: 'Exagerar nas cores de fundo tornando os blocos concorrentes entre si; use fundos neutros e cor apenas nos destaques.',
    mnemonic: 'Card grande ancora o olhar, cards menores completam o mosaico.',
    htmlSnippet: `<div class="bento-grid-container">
  <div class="bento-card bento-hero-span">
    <div class="bento-badge">Destaque 2.0</div>
    <h3>Velocidade Extrema de Processamento</h3>
    <p>Processamento distribuído em borda com sub-10ms.</p>
    <!-- Widget / Gráfico -->
  </div>
  <div class="bento-card">
    <div class="bento-metric font-mono">99.99%</div>
    <div class="bento-label">Uptime Garantido</div>
  </div>
  <div class="bento-card">
    <div class="bento-metric font-mono">14.2M</div>
    <div class="bento-label">Requisições/dia</div>
  </div>
</div>`,
    cssSnippet: `.bento-grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.bento-hero-span {
  grid-column: span 2;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.05));
  border: 1px solid rgba(99, 102, 241, 0.3);
}
.bento-card {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  transition: transform var(--transition-fast), border-color var(--transition-fast);
}
.bento-card:hover {
  transform: translateY(-2px);
  border-color: var(--brand-primary);
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div class="bento-grid-container">
          <!-- Card 1 (Span 2) -->
          <div class="bento-card bento-hero-span">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <span class="gt-badge gt-badge-indigo">Destaque de Performance</span>
              <span class="font-mono text-muted" style="font-size:0.75rem;">LIVE CLUSTER</span>
            </div>
            <h3 style="margin: 0.75rem 0 0.25rem 0; font-size: 1.25rem;">Pipeline de Cache Global</h3>
            <p style="color:var(--text-secondary); font-size:0.875rem; margin-bottom: 1rem;">
              Distribuição automática para 42 data centers globais com latência P99 abaixo de 8ms.
            </p>
            <div class="bento-spark-banner">
              <svg viewBox="0 0 400 60" class="bento-svg-chart" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="bentoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#6366f1" stop-opacity="0.5"/>
                    <stop offset="100%" stop-color="#6366f1" stop-opacity="0.0"/>
                  </linearGradient>
                </defs>
                <path d="M0,45 Q50,20 100,35 T200,15 T300,25 T400,8 L400,60 L0,60 Z" fill="url(#bentoGrad)"/>
                <path d="M0,45 Q50,20 100,35 T200,15 T300,25 T400,8" fill="none" stroke="#6366f1" stroke-width="2.5"/>
              </svg>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="bento-card">
            <div class="gt-badge gt-badge-teal" style="margin-bottom:0.5rem;">Segurança</div>
            <div class="bento-metric font-mono" style="font-size:2rem; font-weight:800; color:#10b981;">0.00%</div>
            <div class="bento-label" style="font-size:0.875rem; font-weight:600;">Taxa de Falsos Positivos</div>
            <p style="font-size:0.75rem; color:var(--text-muted); margin-top:0.5rem;">Filtro WAF biométrico treinado com 50 milhões de vetores.</p>
          </div>

          <!-- Card 3 -->
          <div class="bento-card">
            <div class="gt-badge gt-badge-purple" style="margin-bottom:0.5rem;">Escala</div>
            <div class="bento-metric font-mono" style="font-size:2rem; font-weight:800; color:#a855f7;">99.999%</div>
            <div class="bento-label" style="font-size:0.875rem; font-weight:600;">Disponibilidade SLA</div>
            <p style="font-size:0.75rem; color:var(--text-muted); margin-top:0.5rem;">Failover instantâneo sem perda de pacotes em memória.</p>
          </div>

          <!-- Card 4 (Span 2) -->
          <div class="bento-card bento-hero-span" style="background:var(--bg-surface-elevated); border-color:var(--border-subtle);">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <h4 style="margin-bottom:0.25rem;">Atividade Recente de Deploy</h4>
                <div style="font-size:0.75rem; color:var(--text-muted);">Sincronizado automaticamente via GitHub Actions</div>
              </div>
              <button class="gt-btn-primary-xs" onclick="alert('Disparando deploy simulado...')">Novo Deploy</button>
            </div>
            <div style="margin-top:1rem; display:flex; gap:1rem; align-items:center;">
              <span class="gt-status-dot dot-success">v2.4.0 Live em Prod</span>
              <span class="font-mono text-muted" style="font-size:0.8125rem;">commit: <code>4f99a1c</code></span>
              <span class="text-muted" style="font-size:0.8125rem;">por @erica</span>
            </div>
          </div>
        </div>
      `;
    }
  },

  // -------------------------------------------------------------
  // 16. KPI & ANALYTICS STAT CARD GRID
  // -------------------------------------------------------------
  {
    id: 'kpi-analytics-grid',
    name: 'KPI & Analytics Metric Stat Cards Grid',
    ptName: 'Grid de Cards de KPIs com Mini Gráficos de Tendência',
    category: 'bento',
    categoryLabel: 'Bento & Dashboards',
    dribbbleTrend: 'Responsive 4-Col Grid + Floating Delta Pills + Micro Sparklines',
    concept: 'Grid de 4 colunas com números-chave (Receita, Usuários Ativos, Conversão e Churn), delta de comparação e sparkline de suporte.',
    whyItMatters: 'É a primeira seção visual de qualquer dashboard executivo. Dá a temperatura do negócio em 3 segundos de leitura.',
    goldenRule: 'Coloque sempre a referência comparativa (ex: "vs. mês anterior") para que o número tenha contexto imediato.',
    commonPitfall: 'Exibir porcentagens sem deixar claro se um número alto é bom ou ruim (ex: Churn subindo deve ser vermelho).',
    mnemonic: 'Métrica, variação e comparação: a tríade do KPI.',
    htmlSnippet: `<div class="kpi-grid">
  <div class="kpi-card">
    <div class="kpi-header">
      <span class="kpi-title">Receita Total (MRR)</span>
      <span class="gt-delta-pill delta-up">+18.4%</span>
    </div>
    <div class="kpi-value font-mono">R$ 124.500</div>
    <div class="kpi-footer">
      <span class="text-muted">vs. R$ 105.100 no mês anterior</span>
    </div>
  </div>
</div>`,
    cssSnippet: `.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
.kpi-card {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  transition: transform var(--transition-fast);
}
.kpi-card:hover {
  transform: translateY(-2px);
  border-color: var(--brand-primary);
}
.kpi-value {
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0.5rem 0;
}`,
    renderInteractive: (container: HTMLElement) => {
      const kpis = [
        { title: 'Receita Total Recorrente', val: 'R$ 128.450', delta: '+18.2%', isUp: true, sub: 'vs. R$ 108.600 mês passado', stroke: '#10b981', path: 'M0,18 Q30,12 60,6 T120,2' },
        { title: 'Usuários Ativos (MAU)', val: '42.890', delta: '+8.4%', isUp: true, sub: 'vs. 39.500 mês passado', stroke: '#6366f1', path: 'M0,16 Q30,14 60,8 T120,4' },
        { title: 'Taxa de Conversão', val: '3.84%', delta: '+0.6%', isUp: true, sub: 'vs. 3.24% mês passado', stroke: '#06b6d4', path: 'M0,14 Q30,8 60,10 T120,3' },
        { title: 'Net Churn Mensal', val: '0.82%', delta: '-0.3%', isUp: false, sub: 'Redução positiva de perdas', stroke: '#10b981', path: 'M0,4 Q30,10 60,14 T120,18' }
      ];

      container.innerHTML = `
        <div class="kpi-grid">
          ${kpis.map(k => `
            <div class="kpi-card">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:0.8125rem; color:var(--text-secondary); font-weight:600;">${k.title}</span>
                <span class="gt-delta-pill ${k.isUp ? 'delta-up' : 'delta-up'}">${k.delta}</span>
              </div>
              <div class="kpi-value font-mono">${k.val}</div>
              <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                <span style="font-size:0.75rem; color:var(--text-muted);">${k.sub}</span>
                <svg width="60" height="20" viewBox="0 0 120 20" preserveAspectRatio="none">
                  <path d="${k.path}" fill="none" stroke="${k.stroke}" stroke-width="3" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  },

  // -------------------------------------------------------------
  // 17. KANBAN SPRINT BOARD WORKFLOW GRID
  // -------------------------------------------------------------
  {
    id: 'kanban-workflow-grid',
    name: 'Kanban Sprint Board Workflow Grid',
    ptName: 'Grid de Fluxo Ágil Kanban (Colunas & Cartões)',
    category: 'kanban',
    categoryLabel: 'Kanban & Fluxos',
    dribbbleTrend: 'Column Count Badges + Draggable Card Physics + Priority Tags',
    concept: 'Grid de colunas verticais (A Fazer, Em Progresso, Revisão, Pronto) organizando cartões de trabalho por etapa de fluxo.',
    whyItMatters: 'O padrão definitivo de gestão de projetos (Trello, Jira, Asana) que visualiza gargalos de produção em tempo real.',
    goldenRule: 'Fixe o cabeçalho das colunas e permita rolagem independente em colunas com muitos cartões.',
    commonPitfall: 'Cartões pesados com excesso de texto e botões que sobrecarregam a densidade vertical do kanban.',
    mnemonic: 'Entra na esquerda, flui no meio, conclui na direita.',
    htmlSnippet: `<div class="kanban-grid">
  <div class="kanban-col">
    <div class="kanban-col-header">
      <span>Em Progresso</span>
      <span class="kanban-count">2</span>
    </div>
    <div class="kanban-card">
      <div class="kanban-tag tag-blue">Frontend</div>
      <div class="kanban-card-title">Migrar componentes para CSS Container Queries</div>
      <div class="kanban-card-footer">
        <span class="font-mono text-muted">2/4 subtarefas</span>
        <div class="kanban-avatar">ER</div>
      </div>
    </div>
  </div>
</div>`,
    cssSnippet: `.kanban-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.kanban-col {
  background: var(--bg-surface-elevated);
  border-radius: var(--radius-lg);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.kanban-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 0.875rem;
  box-shadow: var(--shadow-sm);
  cursor: grab;
  transition: transform var(--transition-fast), border-color var(--transition-fast);
}
.kanban-card:hover {
  transform: translateY(-2px);
  border-color: var(--brand-primary);
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div class="kanban-grid">
          <!-- Col 1 -->
          <div class="kanban-col">
            <div class="kanban-col-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <strong style="font-size:0.875rem;">📋 A Fazer</strong>
              <span class="gt-code-pill font-mono">2</span>
            </div>
            <div class="kanban-card" data-card-id="1">
              <span class="gt-badge gt-badge-indigo" style="font-size:0.6875rem;">Arquitetura</span>
              <div style="font-weight:600; font-size:0.875rem; margin:0.5rem 0;">Adicionar testes unitários com Vitest</div>
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-muted);">
                <span>0/3 tarefas</span>
                <div class="gt-avatar" style="width:24px; height:24px; font-size:0.6875rem;">DR</div>
              </div>
            </div>
            <div class="kanban-card" data-card-id="2">
              <span class="gt-badge gt-badge-teal" style="font-size:0.6875rem;">Acessibilidade</span>
              <div style="font-weight:600; font-size:0.875rem; margin:0.5rem 0;">Auditar contraste WAI-ARIA no Dark Mode</div>
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-muted);">
                <span>1/2 tarefas</span>
                <div class="gt-avatar" style="width:24px; height:24px; font-size:0.6875rem;">MK</div>
              </div>
            </div>
          </div>

          <!-- Col 2 -->
          <div class="kanban-col">
            <div class="kanban-col-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <strong style="font-size:0.875rem;">⚡ Em Progresso</strong>
              <span class="gt-code-pill font-mono">1</span>
            </div>
            <div class="kanban-card" data-card-id="3" style="border-left: 3px solid var(--brand-primary);">
              <span class="gt-badge gt-badge-purple" style="font-size:0.6875rem;">Frontend</span>
              <div style="font-weight:600; font-size:0.875rem; margin:0.5rem 0;">Criar seção de Grids & Data Tables Dribbble</div>
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-muted);">
                <span>4/5 tarefas</span>
                <div class="gt-avatar" style="width:24px; height:24px; font-size:0.6875rem; background:#a855f7;">AI</div>
              </div>
            </div>
          </div>

          <!-- Col 3 -->
          <div class="kanban-col">
            <div class="kanban-col-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <strong style="font-size:0.875rem;">✓ Concluído</strong>
              <span class="gt-code-pill font-mono">1</span>
            </div>
            <div class="kanban-card" data-card-id="4" style="opacity:0.85;">
              <span class="gt-badge gt-badge-success" style="font-size:0.6875rem;">Design Tokens</span>
              <div style="font-weight:600; font-size:0.875rem; margin:0.5rem 0; text-decoration:line-through; color:var(--text-muted);">Configurar variáveis CSS de tema escuro</div>
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-muted);">
                <span style="color:#10b981;">✓ Concluído</span>
                <div class="gt-avatar" style="width:24px; height:24px; font-size:0.6875rem; background:#10b981;">TC</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  },

  // -------------------------------------------------------------
  // 18. PRICING & FEATURE TIER COMPARISON MATRIX GRID
  // -------------------------------------------------------------
  {
    id: 'pricing-comparison-grid',
    name: 'Pricing & Feature Tier Comparison Matrix',
    ptName: 'Tabela Comparativa de Planos & Preços (Pricing Matrix)',
    category: 'fintech',
    categoryLabel: 'Fintech & Finanças',
    dribbbleTrend: 'Highlighted Pro Card with Glow Ribbon + Annual Discount Switcher',
    concept: 'Tabela de preços de 3 colunas com toggle interativo Mensal/Anual (-20%), destaque luminoso no plano recomendado e lista de recursos com checkmarks.',
    whyItMatters: 'A página de preços é a página de conversão mais importante de qualquer negócio digital.',
    goldenRule: 'Destaque visualmente o plano mais vendido (Pro) com elevação, sombra ou borda de acento.',
    commonPitfall: 'Preços confusos ou taxas escondidas que geram desconfiança na hora da assinatura.',
    mnemonic: 'Três opções: âncora barata, estrela no meio, enterprise no topo.',
    htmlSnippet: `<div class="pricing-matrix">
  <div class="pricing-card">
    <h3>Starter</h3>
    <div class="price font-mono">R$ 49<span>/mês</span></div>
    <ul class="pricing-features">
      <li>✓ 5 Projetos ativos</li>
      <li>✓ Suporte comunitário</li>
    </ul>
    <button class="gt-btn-outline">Começar</button>
  </div>
  <div class="pricing-card is-popular">
    <div class="popular-ribbon">Mais Popular</div>
    <h3>Pro</h3>
    <div class="price font-mono">R$ 149<span>/mês</span></div>
    <ul class="pricing-features">
      <li>✓ Projetos ilimitados</li>
      <li>✓ Suporte prioritário 24/7</li>
    </ul>
    <button class="gt-btn-primary">Assinar Pro</button>
  </div>
</div>`,
    cssSnippet: `.pricing-card.is-popular {
  border: 2px solid var(--brand-primary);
  position: relative;
  box-shadow: var(--shadow-glow);
}
.popular-ribbon {
  position: absolute;
  top: -12px;
  right: 20px;
  background: var(--brand-primary);
  color: #ffffff;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
}`,
    renderInteractive: (container: HTMLElement) => {
      container.innerHTML = `
        <div class="gt-interactive-wrapper">
          <div style="display:flex; justify-content:center; align-items:center; gap:0.75rem; margin-bottom:1.5rem;">
            <span style="font-weight:600; font-size:0.875rem;">Cobrança Mensal</span>
            <label class="gt-switch">
              <input type="checkbox" id="pricing-cycle-toggle">
              <span class="gt-slider"></span>
            </label>
            <span style="font-weight:600; font-size:0.875rem;">Anual <span class="gt-badge gt-badge-teal" style="font-size:0.6875rem;">Economize 20%</span></span>
          </div>

          <div class="pricing-grid-demo" style="display:grid; grid-template-columns: repeat(3, 1fr); gap:1rem;">
            <!-- Starter -->
            <div class="bento-card" style="display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <h4 style="font-size:1.125rem; margin-bottom:0.25rem;">Starter</h4>
                <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:1rem;">Para desenvolvedores individuais</div>
                <div class="price-val font-mono" id="starter-price" style="font-size:1.75rem; font-weight:800; margin-bottom:1rem;">R$ 49<span style="font-size:0.875rem; color:var(--text-muted); font-weight:400;">/mês</span></div>
                <div style="font-size:0.8125rem; display:flex; flex-direction:column; gap:0.5rem; color:var(--text-secondary);">
                  <div>✓ Até 5 projetos ativos</div>
                  <div>✓ 10GB de storage em nuvem</div>
                  <div>✓ Suporte por e-mail</div>
                </div>
              </div>
              <button class="gt-btn-outline" style="margin-top:1.5rem; width:100%;">Começar Grátis</button>
            </div>

            <!-- Pro -->
            <div class="bento-card" style="border: 2px solid var(--brand-primary); position:relative; box-shadow:var(--shadow-glow); display:flex; flex-direction:column; justify-content:space-between; background:var(--bg-surface);">
              <span class="popular-ribbon">Mais Escolhido</span>
              <div>
                <h4 style="font-size:1.125rem; margin-bottom:0.25rem; color:var(--brand-primary);">Pro Team</h4>
                <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:1rem;">Para equipes de produto ágeis</div>
                <div class="price-val font-mono" id="pro-price" style="font-size:1.75rem; font-weight:800; margin-bottom:1rem; color:var(--brand-primary);">R$ 149<span style="font-size:0.875rem; color:var(--text-muted); font-weight:400;">/mês</span></div>
                <div style="font-size:0.8125rem; display:flex; flex-direction:column; gap:0.5rem; color:var(--text-primary);">
                  <div>✓ <strong>Projetos ilimitados</strong></div>
                  <div>✓ 1TB de storage acelerado</div>
                  <div>✓ Análise em tempo real</div>
                  <div>✓ Suporte prioritário 24/7</div>
                </div>
              </div>
              <button class="gt-btn-primary" style="margin-top:1.5rem; width:100%;">Assinar Plano Pro</button>
            </div>

            <!-- Enterprise -->
            <div class="bento-card" style="display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <h4 style="font-size:1.125rem; margin-bottom:0.25rem;">Enterprise</h4>
                <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:1rem;">Para organizações com compliance</div>
                <div class="price-val font-mono" id="ent-price" style="font-size:1.75rem; font-weight:800; margin-bottom:1rem;">R$ 499<span style="font-size:0.875rem; color:var(--text-muted); font-weight:400;">/mês</span></div>
                <div style="font-size:0.8125rem; display:flex; flex-direction:column; gap:0.5rem; color:var(--text-secondary);">
                  <div>✓ SSO / SAML & RBAC avançado</div>
                  <div>✓ Storage e limites dedicados</div>
                  <div>✓ Gerente de conta exclusivo</div>
                  <div>✓ SLA contratual de 99.99%</div>
                </div>
              </div>
              <button class="gt-btn-outline" style="margin-top:1.5rem; width:100%;">Falar com Vendas</button>
            </div>
          </div>
        </div>
      `;

      const toggle = container.querySelector('#pricing-cycle-toggle') as HTMLInputElement;
      const starter = container.querySelector('#starter-price') as HTMLElement;
      const pro = container.querySelector('#pro-price') as HTMLElement;
      const ent = container.querySelector('#ent-price') as HTMLElement;

      toggle?.addEventListener('change', () => {
        if (toggle.checked) {
          starter.innerHTML = `R$ 39<span style="font-size:0.875rem; color:var(--text-muted); font-weight:400;">/mês (faturado anual)</span>`;
          pro.innerHTML = `R$ 119<span style="font-size:0.875rem; color:var(--text-muted); font-weight:400;">/mês (faturado anual)</span>`;
          ent.innerHTML = `R$ 399<span style="font-size:0.875rem; color:var(--text-muted); font-weight:400;">/mês (faturado anual)</span>`;
        } else {
          starter.innerHTML = `R$ 49<span style="font-size:0.875rem; color:var(--text-muted); font-weight:400;">/mês</span>`;
          pro.innerHTML = `R$ 149<span style="font-size:0.875rem; color:var(--text-muted); font-weight:400;">/mês</span>`;
          ent.innerHTML = `R$ 499<span style="font-size:0.875rem; color:var(--text-muted); font-weight:400;">/mês</span>`;
        }
      });
    }
  },

  // -------------------------------------------------------------
  // 19. MODERN E-COMMERCE PRODUCT CATALOG GRID
  // -------------------------------------------------------------
  {
    id: 'product-catalog-grid',
    name: 'Modern E-Commerce Product Catalog Grid',
    ptName: 'Grid de Produtos E-Commerce com Ação Rápida',
    category: 'commerce',
    categoryLabel: 'E-Commerce & Catálogo',
    dribbbleTrend: 'Floating Action Buttons on Hover + Color Swatches + Discount Badge',
    concept: 'Grid responsivo de cartões de produto com efeito de zoom suave na foto, paleta de cores para troca rápida e botão flutuante "Comprar".',
    whyItMatters: 'O formato clássico das maiores lojas D2C do Dribbble (Nike, Apple, Glossier) que maximiza o apelo estético visual.',
    goldenRule: 'Mantenha as fotos com a mesma proporção de aspecto (aspect-ratio: 1/1 ou 4/5) para evitar desalinhamento da grade.',
    commonPitfall: 'Colocar botões pesados cobrindo os detalhes do produto quando o usuário apenas deseja ver a foto.',
    mnemonic: 'Foto limpa atrai, swatch muda a cor, botão rápido converte.',
    htmlSnippet: `<div class="prod-grid">
  <div class="prod-card">
    <div class="prod-thumb-wrapper">
      <span class="prod-badge-discount">-25%</span>
      <div class="prod-emoji-img">👟</div>
      <button class="prod-quick-add">Adicionar +</button>
    </div>
    <div class="prod-info">
      <div class="prod-category">Corrida & Alta Performance</div>
      <h4 class="prod-name">Ultralight Aero Pro</h4>
      <div class="prod-price font-mono">R$ 599,90 <del>R$ 799,90</del></div>
    </div>
  </div>
</div>`,
    cssSnippet: `.prod-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
}
.prod-card {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}
.prod-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}`,
    renderInteractive: (container: HTMLElement) => {
      const items = [
        { emoji: '👟', cat: 'Calçados', title: 'Ultralight Aero Pro', price: 'R$ 599,90', oldPrice: 'R$ 799,90', tag: '-25%' },
        { emoji: '🎒', cat: 'Acessórios', title: 'Mochila Commuter Roll-Top', price: 'R$ 349,00', oldPrice: '', tag: 'Novo' },
        { emoji: '🕶️', cat: 'Óculos', title: 'Solar Polarized Wayfarer', price: 'R$ 289,90', oldPrice: 'R$ 350,00', tag: '-17%' }
      ];

      container.innerHTML = `
        <div class="prod-grid">
          ${items.map(it => `
            <div class="prod-card">
              <div class="prod-thumb-wrapper" style="position:relative; height:150px; background:var(--bg-surface); display:flex; align-items:center; justify-content:center; font-size:3.5rem;">
                <span class="gt-badge gt-badge-${it.tag === 'Novo' ? 'teal' : 'danger'}" style="position:absolute; top:10px; left:10px;">${it.tag}</span>
                ${it.emoji}
                <button class="prod-quick-add-btn" style="position:absolute; bottom:10px; right:10px; background:var(--brand-primary); color:#fff; border:none; border-radius:var(--radius-sm); padding:0.35rem 0.75rem; font-size:0.75rem; font-weight:600; cursor:pointer;">+ Sacola</button>
              </div>
              <div style="padding:1rem;">
                <div style="font-size:0.6875rem; text-transform:uppercase; color:var(--text-muted); font-weight:600;">${it.cat}</div>
                <h4 style="margin:0.25rem 0 0.5rem 0; font-size:0.9375rem;">${it.title}</h4>
                <div class="font-mono">
                  <strong>${it.price}</strong>
                  ${it.oldPrice ? `<del style="color:var(--text-muted); font-size:0.75rem; margin-left:6px;">${it.oldPrice}</del>` : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      container.querySelectorAll('.prod-quick-add-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          btn.textContent = 'Adicionado! ✓';
          (btn as HTMLElement).style.background = '#10b981';
          setTimeout(() => {
            btn.textContent = '+ Sacola';
            (btn as HTMLElement).style.background = '';
          }, 1500);
        });
      });
    }
  },

  // -------------------------------------------------------------
  // 20. TEAM ROSTER & AVAILABILITY MATRIX GRID
  // -------------------------------------------------------------
  {
    id: 'team-roster-grid',
    name: 'Team Roster & Availability Matrix Grid',
    ptName: 'Grid de Equipe com Status & Fuso Horário Local',
    category: 'bento',
    categoryLabel: 'Bento & Dashboards',
    dribbbleTrend: 'Timezone Clocks + Availability Dots + Direct Quick DM Triggers',
    concept: 'Grid de cartões de perfil com foto, especialidade técnica, horário local calculado no fuso do colaborador e indicador de disponibilidade.',
    whyItMatters: 'Comum em empresas remotas globais (Automattic, GitLab, Basecamp) para saber se o colega está acordado antes de enviar uma mensagem.',
    goldenRule: 'Mostre o horário local do colaborador em destaque para incentivar comunicação assíncrona respeitosa.',
    commonPitfall: 'Indicar apenas "online" sem mostrar o fuso, levando a interrupções fora de expediente.',
    mnemonic: 'Fuso orienta, status avisa, respeito lidera.',
    htmlSnippet: `<div class="team-card">
  <div class="team-card-header">
    <div class="gt-avatar">SM</div>
    <span class="gt-status-dot dot-success">Disponível</span>
  </div>
  <h4>Sara Mendes</h4>
  <div class="text-muted">Staff Design Engineer</div>
  <div class="team-clock font-mono">13:05 (UTC-3 • SP)</div>
  <button class="gt-btn-xs">Mensagem Direta</button>
</div>`,
    cssSnippet: `.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
.team-card {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  text-align: center;
}`,
    renderInteractive: (container: HTMLElement) => {
      const members = [
        { name: 'Sara Mendes', role: 'Staff Design Engineer', loc: 'São Paulo (UTC-3)', time: '13:05', status: 'Disponível', dot: 'dot-success', initials: 'SM' },
        { name: 'Kenji Sato', role: 'Principal Backend Dev', loc: 'Tóquio (UTC+9)', time: '01:05 (Dormindo)', status: 'Ausente', dot: 'dot-warning', initials: 'KS' },
        { name: 'Elena Rostova', role: 'DevOps / SRE Lead', loc: 'Berlim (UTC+2)', time: '18:05', status: 'Em Reunião', dot: 'dot-danger', initials: 'ER' }
      ];

      container.innerHTML = `
        <div class="team-grid" style="display:grid; grid-template-columns: repeat(3, 1fr); gap:1rem;">
          ${members.map(m => `
            <div class="team-card" style="display:flex; flex-direction:column; align-items:center;">
              <div class="gt-avatar" style="width:48px; height:48px; font-size:1.125rem; margin-bottom:0.5rem;">${m.initials}</div>
              <h4 style="font-size:1rem; margin-bottom:0.15rem;">${m.name}</h4>
              <div style="font-size:0.75rem; color:var(--text-secondary); margin-bottom:0.5rem;">${m.role}</div>
              <span class="gt-status-dot ${m.dot}" style="margin-bottom:0.75rem;">${m.status}</span>
              <div class="font-mono text-muted" style="font-size:0.75rem; margin-bottom:1rem; background:var(--bg-surface); padding:0.25rem 0.5rem; border-radius:0.25rem;">
                🕒 ${m.time} • ${m.loc}
              </div>
              <button class="gt-btn-primary-xs" style="width:100%;" onclick="alert('Iniciando conversa com ${m.name}')">Enviar Slack</button>
            </div>
          `).join('')}
        </div>
      `;
    }
  },

  // -------------------------------------------------------------
  // 21. REAL ESTATE LUXURY PROPERTY LISTINGS GRID
  // -------------------------------------------------------------
  {
    id: 'real-estate-grid',
    name: 'Real Estate Luxury Property Listings Grid',
    ptName: 'Grid Imobiliário com Especificações & Favoritos',
    category: 'commerce',
    categoryLabel: 'E-Commerce & Catálogo',
    dribbbleTrend: 'Photo Badges + Spec Chips (Beds/Baths/Sqft) + Interactive Heart Bookmark',
    concept: 'Grid de imóveis com foto de alta fidelidade, preço em evidência, tags de metragem/quartos e botão interativo de favoritar.',
    whyItMatters: 'Padrão consagrado de portais imobiliários (Zillow, Airbnb, Loft) onde fotos e especificações numéricas direcionam o lead.',
    goldenRule: 'Mantenha os ícones de especificações (🛏️ quartos, 🚿 banheiros, 📐 m²) alinhados uniformemente na base do card.',
    commonPitfall: 'Omitir a localização ou truncar o preço formatado em moedas locais.',
    mnemonic: 'Foto atrai, preço filtra, especificação qualifica.',
    htmlSnippet: `<div class="property-card">
  <div class="property-thumb-box">
    <button class="btn-favorite">♥</button>
    <span class="price-pill">R$ 1.850.000</span>
  </div>
  <h4>Cobertura Duplex Jardins</h4>
  <p class="location-pin">📍 Jardins, São Paulo - SP</p>
  <div class="property-specs">
    <span>🛏️ 3 Quartos</span>
    <span>🚿 4 Banheiros</span>
    <span>📐 240 m²</span>
  </div>
</div>`,
    cssSnippet: `.property-specs {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--border-subtle);
  padding-top: 0.75rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
}`,
    renderInteractive: (container: HTMLElement) => {
      const props = [
        { title: 'Apartamento Alto Padrão Vila Nova', loc: 'Vila Nova Conceição, SP', price: 'R$ 2.450.000', beds: '3 Quartos', baths: '3 Banheiros', sqft: '185 m²', icon: '🏢' },
        { title: 'Casa Contemporânea em Condomínio', loc: 'Alphaville, Barueri - SP', price: 'R$ 4.890.000', beds: '4 Suítes', baths: '5 Banheiros', sqft: '420 m²', icon: '🏡' }
      ];

      container.innerHTML = `
        <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:1rem;">
          ${props.map((p, i) => `
            <div class="bento-card">
              <div style="height:140px; background:var(--bg-surface); border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; position:relative; font-size:3rem; margin-bottom:1rem;">
                <span class="gt-badge gt-badge-teal font-mono" style="position:absolute; bottom:10px; left:10px; font-weight:700;">${p.price}</span>
                <button class="prop-fav-btn" data-fav-id="${i}" style="position:absolute; top:10px; right:10px; background:rgba(0,0,0,0.4); border:none; border-radius:50%; width:32px; height:32px; color:#fff; cursor:pointer; font-size:1.125rem;">♡</button>
                ${p.icon}
              </div>
              <h4 style="font-size:1rem; margin-bottom:0.25rem;">${p.title}</h4>
              <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.75rem;">📍 ${p.loc}</div>
              <div class="property-specs">
                <span>🛏️ ${p.beds}</span>
                <span>🚿 ${p.baths}</span>
                <span>📐 ${p.sqft}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      container.querySelectorAll('.prop-fav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const isFav = btn.textContent === '♥';
          btn.textContent = isFav ? '♡' : '♥';
          (btn as HTMLElement).style.color = isFav ? '#ffffff' : '#ef4444';
        });
      });
    }
  },

  // -------------------------------------------------------------
  // 22. GAMIFICATION & TOURNAMENT LEADERBOARD GRID
  // -------------------------------------------------------------
  {
    id: 'leaderboard-grid',
    name: 'Gamification & Tournament Leaderboard Grid',
    ptName: 'Tabela de Ranking & Gamificação (Leaderboard)',
    category: 'tables',
    categoryLabel: 'Data Tables Avançadas',
    dribbbleTrend: 'Top 3 Podium Trophies + Rank Shift Arrows + XP Point Badges',
    concept: 'Tabela de pontuação e classificação com destaque especial para o pódio (Ouro, Prata, Bronze), nível e movimento de subida/descida no ranking.',
    whyItMatters: 'Aumenta o engajamento e retenção de usuários em plataformas de educação, jogos e vendas (Sales gamification).',
    goldenRule: 'O Top 1 deve ter tratamento nobre com coroa/troféu dourado e destaque luminoso no avatar.',
    commonPitfall: 'Não exibir a diferença de pontos para o próximo colocado, reduzindo a motivação de competição.',
    mnemonic: 'Pódio celebra, delta desafia, pontos recompensam.',
    htmlSnippet: `<tr class="gt-rank-row is-top-1">
  <td class="font-mono rank-number">🥇 1º</td>
  <td>
    <div class="gt-user-cell">
      <div class="gt-avatar" style="border: 2px solid #eab308;">AL</div>
      <div><strong>André Lucas</strong><span class="gt-badge gt-badge-warning">Lvl 48</span></div>
    </div>
  </td>
  <td class="font-mono text-right"><strong>18.420 XP</strong></td>
  <td><span class="gt-rank-delta delta-up">▲ 2</span></td>
</tr>`,
    cssSnippet: `.gt-rank-delta.delta-up {
  color: #10b981;
  font-weight: 700;
  font-size: 0.8125rem;
}`,
    renderInteractive: (container: HTMLElement) => {
      const players = [
        { rank: '🥇 1º', name: 'André Lucas', lvl: 'Lvl 48', xp: '18.420 XP', delta: '▲ 2', isUp: true, grad: 'linear-gradient(135deg, #eab308, #ca8a04)', initials: 'AL' },
        { rank: '🥈 2º', name: 'Beatriz Martins', lvl: 'Lvl 45', xp: '17.110 XP', delta: '▼ 1', isUp: false, grad: 'linear-gradient(135deg, #94a3b8, #64748b)', initials: 'BM' },
        { rank: '🥉 3º', name: 'Caio Silveira', lvl: 'Lvl 42', xp: '15.980 XP', delta: '▲ 4', isUp: true, grad: 'linear-gradient(135deg, #d97706, #b45309)', initials: 'CS' },
        { rank: '4º', name: 'Juliana Pires', lvl: 'Lvl 39', xp: '14.250 XP', delta: '—', isUp: false, grad: 'linear-gradient(135deg, #6366f1, #a855f7)', initials: 'JP' }
      ];

      container.innerHTML = `
        <div class="gt-table-responsive">
          <table class="gt-table gt-table-hover">
            <thead>
              <tr>
                <th style="width: 70px;">Rank</th>
                <th>Jogador / Desenvolvedor</th>
                <th>Nível</th>
                <th class="text-right">Pontos Totais</th>
                <th class="text-center" style="width: 80px;">Posição</th>
              </tr>
            </thead>
            <tbody>
              ${players.map(p => `
                <tr>
                  <td class="font-mono"><strong>${p.rank}</strong></td>
                  <td>
                    <div class="gt-user-cell">
                      <div class="gt-avatar" style="background:${p.grad}; color:#fff;">${p.initials}</div>
                      <div>
                        <strong>${p.name}</strong>
                      </div>
                    </div>
                  </td>
                  <td><span class="gt-code-pill font-mono">${p.lvl}</span></td>
                  <td class="text-right font-mono"><strong>${p.xp}</strong></td>
                  <td class="text-center font-mono" style="color: ${p.isUp ? '#10b981' : 'var(--text-muted)'}; font-weight:700;">
                    ${p.delta}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }
  },

  // -------------------------------------------------------------
  // 23. MEDIA STUDIO VIDEO ASSETS PROCESSING GRID
  // -------------------------------------------------------------
  {
    id: 'media-studio-grid',
    name: 'Media Studio Video Assets Processing Grid',
    ptName: 'Grid de Produção de Vídeo & Transcodificação',
    category: 'bento',
    categoryLabel: 'Bento & Dashboards',
    dribbbleTrend: '16:9 Thumbnail Overlays + Transcoding Progress Trackers + Resolution Badges',
    concept: 'Grid para estúdios de vídeo (estilo YouTube Studio / Vimeo) com miniatura 16:9, selo 4K HDR e barra de renderização com porcentagem.',
    whyItMatters: 'Essencial em ferramentas de mídia em nuvem onde o usuário acompanha o status de exportação e download dos cortes de vídeo.',
    goldenRule: 'Coloque a duração do vídeo no canto inferior direito da imagem em badge escuro semitransparente.',
    commonPitfall: 'Não permitir que o usuário cancele ou pause uma renderização em andamento direto do cartão.',
    mnemonic: 'Thumbnail 16:9, duração no canto, progresso avisa o fim.',
    htmlSnippet: `<div class="media-card">
  <div class="media-thumb-box">
    <span class="media-tag-hdr">4K HDR</span>
    <span class="media-duration">08:24</span>
    <div class="media-play-overlay">▶</div>
  </div>
  <h4>Teaser Oficial Produto 2026</h4>
  <div class="gt-meter-track"><div class="gt-meter-fill is-success" style="width: 78%;"></div></div>
  <span class="font-mono text-muted">78% Renderizado</span>
</div>`,
    cssSnippet: `.media-thumb-box {
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: var(--radius-md);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.media-duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.6875rem;
  font-family: var(--font-mono);
}`,
    renderInteractive: (container: HTMLElement) => {
      const videos = [
        { title: 'Keynote Anúncio Oficial 2026', dur: '12:45', res: '4K 60fps', prog: 100, status: 'Pronto para Download' },
        { title: 'Tutorial Passo a Passo: CSS Grid', dur: '06:18', res: '1080p', prog: 64, status: 'Transcodificando...' }
      ];

      container.innerHTML = `
        <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:1rem;">
          ${videos.map((v, i) => `
            <div class="bento-card">
              <div class="media-thumb-box" style="margin-bottom:0.75rem; background: linear-gradient(135deg, #1e1b4b, #31104b);">
                <span class="gt-badge gt-badge-indigo" style="position:absolute; top:8px; left:8px; font-size:0.6875rem;">${v.res}</span>
                <span class="media-duration">${v.dur}</span>
                <div style="font-size:2rem; cursor:pointer;" onclick="alert('Reproduzindo: ${v.title}')">▶</div>
              </div>
              <h4 style="font-size:0.9375rem; margin-bottom:0.5rem;">${v.title}</h4>
              <div class="gt-meter-track" style="margin-bottom:0.35rem;">
                <div class="gt-meter-fill is-success" id="video-bar-${i}" style="width: ${v.prog}%;"></div>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
                <span class="text-muted" id="video-status-${i}">${v.status}</span>
                <span class="font-mono font-bold" id="video-val-${i}">${v.prog}%</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  },

  // -------------------------------------------------------------
  // 24. CALENDAR & MEETING SCHEDULER AGENDA GRID
  // -------------------------------------------------------------
  {
    id: 'calendar-agenda-grid',
    name: 'Calendar & Meeting Scheduler Agenda Grid',
    ptName: 'Grid de Agenda & Horários com Blocos Coloridos',
    category: 'kanban',
    categoryLabel: 'Kanban & Fluxos',
    dribbbleTrend: 'Time Slot Columns + Color-Coded Event Blocks + Live Time Marker',
    concept: 'Grid de planejamento semanal com colunas de horários, blocos com paleta semântica por tipo de reunião e indicador da hora atual.',
    whyItMatters: 'Padrão universal de produtividade (Google Calendar, Cron/Notion Calendar, Calendly) para evitar sobreposição de agendas.',
    goldenRule: 'Eventos sobrepostos devem dividir a largura da coluna proporcionalmente para não se esconderem mutuamente.',
    commonPitfall: 'Usar fontes pequenas demais que truncam o título da reunião e os nomes dos participantes.',
    mnemonic: 'Horário verticaliza o dia, bloco colorido identifica o tema.',
    htmlSnippet: `<div class="agenda-day-grid">
  <div class="time-slot font-mono">09:00</div>
  <div class="event-block event-design">
    <div class="event-title">Design Review Design System</div>
    <div class="event-attendees">Sara, Marcos, André</div>
  </div>
</div>`,
    cssSnippet: `.event-block {
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-md);
  border-left: 3px solid;
  font-size: 0.8125rem;
  margin-bottom: 0.5rem;
}
.event-design {
  background: rgba(99, 102, 241, 0.12);
  border-color: #6366f1;
  color: var(--text-primary);
}`,
    renderInteractive: (container: HTMLElement) => {
      const schedule = [
        { time: '09:00', title: 'Daily Standup Engenharia', dur: '09:00 - 09:30', cat: 'Sync', color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.15)' },
        { time: '10:30', title: 'Arquitetura de Front-End: Grids & Data Tables', dur: '10:30 - 12:00', cat: 'Foco Profundo', color: '#6366f1', bg: 'rgba(99, 102, 241, 0.15)' },
        { time: '14:00', title: 'Alinhamento de Produto com Stakeholders', dur: '14:00 - 15:00', cat: 'Estratégia', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' }
      ];

      container.innerHTML = `
        <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:1rem;">
          <div style="display:flex; justify-content:space-between; margin-bottom:1rem; border-bottom:1px solid var(--border-subtle); padding-bottom:0.75rem;">
            <strong>Terça-feira, 08 de Setembro</strong>
            <span class="gt-status-dot dot-success">Fuso: Horário de Brasília (GMT-3)</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            ${schedule.map(s => `
              <div style="display:grid; grid-template-columns: 70px 1fr; gap:1rem; align-items:flex-start;">
                <span class="font-mono text-muted" style="font-size:0.8125rem; font-weight:600;">${s.time}</span>
                <div style="background:${s.bg}; border-left: 3px solid ${s.color}; padding:0.6rem 0.85rem; border-radius:var(--radius-sm);">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong>${s.title}</strong>
                    <span class="font-mono text-muted" style="font-size:0.6875rem;">${s.dur}</span>
                  </div>
                  <span class="gt-code-pill" style="font-size:0.6875rem; margin-top:4px; display:inline-block;">${s.cat}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  },

  // -------------------------------------------------------------
  // 25. SUBSCRIPTION COHORT CHURN & RETENTION MATRIX GRID
  // -------------------------------------------------------------
  {
    id: 'retention-cohort-grid',
    name: 'Subscription Cohort Retention Heatmap Grid',
    ptName: 'Heatmap de Retenção & Cohort de Assinantes',
    category: 'fintech',
    categoryLabel: 'Fintech & Finanças',
    dribbbleTrend: 'Gradient Opacity Matrix Cells + Metric Cohort Rows + Heatmap Visualization',
    concept: 'Matriz bidimensional de análise de cohort onde cada célula recebe intensidade de cor proporcional à retenção de usuários ao longo dos meses.',
    whyItMatters: 'O gráfico analítico mais sagrado do venture capital para comprovar o Product-Market Fit e retenção de longo prazo.',
    goldenRule: 'O Mês 0 é sempre 100%; aplique cores gradativas do verde escuro (alta retenção) para o neutro (baixa retenção).',
    commonPitfall: 'Usar gradientes lineares confusos em vez de faixas percentuais discretas que facilitam a leitura das safras.',
    mnemonic: 'Safra na linha, meses na coluna, calor na retenção.',
    htmlSnippet: `<table class="cohort-table font-mono">
  <thead>
    <tr>
      <th>Safra</th>
      <th>Mês 0</th>
      <th>Mês 1</th>
      <th>Mês 2</th>
      <th>Mês 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Jan 2026</td>
      <td class="c-100">100%</td>
      <td class="c-85">88%</td>
      <td class="c-70">76%</td>
      <td class="c-60">68%</td>
    </tr>
  </tbody>
</table>`,
    cssSnippet: `.cohort-cell {
  text-align: center;
  padding: 0.5rem;
  border-radius: 4px;
}
.c-100 { background: rgba(16, 185, 129, 0.4); color: #fff; }
.c-85  { background: rgba(16, 185, 129, 0.3); color: #fff; }
.c-70  { background: rgba(16, 185, 129, 0.2); }
.c-60  { background: rgba(16, 185, 129, 0.1); }`,
    renderInteractive: (container: HTMLElement) => {
      const cohorts = [
        { cohort: 'Jan 2026', size: '1.240', m0: '100%', m1: '89%', m2: '78%', m3: '71%', m4: '68%' },
        { cohort: 'Fev 2026', size: '1.580', m0: '100%', m1: '91%', m2: '82%', m3: '76%', m4: '—' },
        { cohort: 'Mar 2026', size: '1.890', m0: '100%', m1: '94%', m2: '86%', m3: '—', m4: '—' },
        { cohort: 'Abr 2026', size: '2.100', m0: '100%', m1: '95%', m2: '—', m3: '—', m4: '—' }
      ];

      const getBg = (val: string) => {
        if (val === '—') return 'transparent';
        const num = parseInt(val, 10);
        if (num === 100) return 'rgba(16, 185, 129, 0.45)';
        if (num >= 90) return 'rgba(16, 185, 129, 0.35)';
        if (num >= 80) return 'rgba(16, 185, 129, 0.25)';
        if (num >= 70) return 'rgba(16, 185, 129, 0.18)';
        return 'rgba(16, 185, 129, 0.10)';
      };

      container.innerHTML = `
        <div class="gt-table-responsive">
          <table class="gt-table font-mono" style="font-size:0.8125rem;">
            <thead>
              <tr>
                <th style="font-family:var(--font-sans);">Safra de Entrada</th>
                <th class="text-right" style="font-family:var(--font-sans);">Novos Usuários</th>
                <th class="text-center">Mês 0</th>
                <th class="text-center">Mês 1</th>
                <th class="text-center">Mês 2</th>
                <th class="text-center">Mês 3</th>
                <th class="text-center">Mês 4</th>
              </tr>
            </thead>
            <tbody>
              ${cohorts.map(c => `
                <tr>
                  <td><strong>${c.cohort}</strong></td>
                  <td class="text-right text-muted">${c.size}</td>
                  <td class="text-center" style="background:${getBg(c.m0)}; font-weight:700;">${c.m0}</td>
                  <td class="text-center" style="background:${getBg(c.m1)};">${c.m1}</td>
                  <td class="text-center" style="background:${getBg(c.m2)};">${c.m2}</td>
                  <td class="text-center" style="background:${getBg(c.m3)};">${c.m3}</td>
                  <td class="text-center" style="background:${getBg(c.m4)};">${c.m4}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }
  },

  // -------------------------------------------------------------
  // 26. INTERACTIVE LIVE SEARCH & FILTER DATA TABLE
  // -------------------------------------------------------------
  {
    id: 'live-sortable-table',
    name: 'Full Interactive Live Sortable & Filter Table',
    ptName: 'Tabela Dinâmica Completa com Busca, Ordenação & Densidade',
    category: 'tables',
    categoryLabel: 'Data Tables Avançadas',
    dribbbleTrend: 'Column Click Sorting + Instant Search Bar + Density Modes',
    concept: 'Tabela de alta performance com ordenação por clique em qualquer cabeçalho de coluna (Asc/Desc), busca por texto em tempo real e seletor de densidade (Compacto vs Confortável).',
    whyItMatters: 'É o modelo que reúne todas as boas práticas de UI/UX em uma única tabela nativa, leve e acessível.',
    goldenRule: 'Adicione indicadores visuais claros de ordenação (setas ▲/▼) na coluna ativa para orientar o estado atual dos dados.',
    commonPitfall: 'Recarregar a página para aplicar buscas ou ordenações simples que podem ocorrer em memória no cliente.',
    mnemonic: 'Clica na coluna ordena, digita no input filtra, ajusta o padding e respira.',
    htmlSnippet: `<div class="table-interactive-controls">
  <input type="search" placeholder="Filtrar nesta tabela..." class="gt-input-sm">
  <div class="density-group">
    <button class="btn-density is-active">Compacto</button>
    <button class="btn-density">Normal</button>
  </div>
</div>
<table class="gt-table gt-table-sortable">
  <thead>
    <tr>
      <th class="is-sortable">Nome <span class="sort-icon">⇅</span></th>
      <th class="is-sortable">Cargo <span class="sort-icon">⇅</span></th>
      <th class="is-sortable text-right">Salário <span class="sort-icon">⇅</span></th>
    </tr>
  </thead>
</table>`,
    cssSnippet: `.gt-table th.is-sortable {
  cursor: pointer;
  user-select: none;
}
.gt-table th.is-sortable:hover {
  color: var(--brand-primary);
}`,
    renderInteractive: (container: HTMLElement) => {
      let data = [
        { name: 'Ana Beatriz Souza', role: 'Staff Software Engineer', dept: 'Engenharia', salary: 18500, status: 'Ativo' },
        { name: 'Bruno Henrique Lima', role: 'Product Design Lead', dept: 'Design', salary: 16200, status: 'Ativo' },
        { name: 'Carla Vasconcelos', role: 'Director of Growth', dept: 'Marketing', salary: 22000, status: 'Ativo' },
        { name: 'Diego Ramos', role: 'Security Architect', dept: 'Segurança', salary: 19800, status: 'Férias' },
        { name: 'Eduarda Castro', role: 'Frontend Engineer', dept: 'Engenharia', salary: 12400, status: 'Ativo' }
      ];

      let sortCol: 'name' | 'role' | 'salary' = 'name';
      let sortAsc = true;
      let query = '';
      let isCompact = false;

      container.innerHTML = `
        <div class="gt-interactive-wrapper">
          <div class="gt-toolbar" style="margin-bottom:0.75rem;">
            <input type="search" id="live-table-search" placeholder="Buscar por nome, cargo ou área..." style="background:var(--bg-surface); border:1px solid var(--border-subtle); color:var(--text-primary); padding:0.4rem 0.75rem; border-radius:var(--radius-sm); font-size:0.8125rem; width:260px;">
            <div style="display:flex; gap:4px; margin-left:auto;">
              <button id="btn-density-compact" class="gt-filter-chip">Compacto</button>
              <button id="btn-density-normal" class="gt-filter-chip is-active">Normal</button>
            </div>
          </div>
          <div class="gt-table-responsive">
            <table class="gt-table gt-table-hover" id="live-target-table">
              <thead>
                <tr>
                  <th class="is-sortable" data-col="name" style="cursor:pointer;">Colaborador <span id="sort-ind-name">▲</span></th>
                  <th class="is-sortable" data-col="role" style="cursor:pointer;">Cargo & Departamento <span id="sort-ind-role">⇅</span></th>
                  <th class="is-sortable text-right" data-col="salary" style="cursor:pointer;">Remuneração <span id="sort-ind-salary">⇅</span></th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="live-tbody"></tbody>
            </table>
          </div>
          <div id="live-table-footer" style="padding:0.5rem 1rem; font-size:0.75rem; color:var(--text-muted); display:flex; justify-content:space-between;"></div>
        </div>
      `;

      const tbody = container.querySelector('#live-tbody') as HTMLElement;
      const footer = container.querySelector('#live-table-footer') as HTMLElement;
      const searchInput = container.querySelector('#live-table-search') as HTMLInputElement;
      const btnCompact = container.querySelector('#btn-density-compact') as HTMLElement;
      const btnNormal = container.querySelector('#btn-density-normal') as HTMLElement;

      const render = () => {
        let filtered = data.filter(d =>
          !query ||
          d.name.toLowerCase().includes(query) ||
          d.role.toLowerCase().includes(query) ||
          d.dept.toLowerCase().includes(query)
        );

        filtered.sort((a, b) => {
          let valA = a[sortCol];
          let valB = b[sortCol];
          if (typeof valA === 'string') {
            return sortAsc ? (valA as string).localeCompare(valB as string) : (valB as string).localeCompare(valA as string);
          }
          return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
        });

        tbody.innerHTML = filtered.map(row => `
          <tr style="${isCompact ? 'padding: 0.35rem 0.75rem;' : ''}">
            <td style="${isCompact ? 'padding: 0.4rem 0.75rem;' : ''}"><strong>${row.name}</strong></td>
            <td style="${isCompact ? 'padding: 0.4rem 0.75rem;' : ''}">
              <div>${row.role}</div>
              <span class="gt-code-pill" style="font-size:0.6875rem;">${row.dept}</span>
            </td>
            <td class="text-right font-mono" style="${isCompact ? 'padding: 0.4rem 0.75rem;' : ''}">
              <strong>R$ ${row.salary.toLocaleString('pt-BR')},00</strong>
            </td>
            <td style="${isCompact ? 'padding: 0.4rem 0.75rem;' : ''}">
              <span class="gt-status-dot ${row.status === 'Ativo' ? 'dot-success' : 'dot-warning'}">${row.status}</span>
            </td>
          </tr>
        `).join('');

        footer.textContent = `Exibindo ${filtered.length} de ${data.length} registros cadastrados`;

        ['name', 'role', 'salary'].forEach(col => {
          const ind = container.querySelector(`#sort-ind-${col}`);
          if (ind) {
            ind.textContent = sortCol === col ? (sortAsc ? '▲' : '▼') : '⇅';
          }
        });
      };

      render();

      searchInput.addEventListener('input', (e) => {
        query = (e.target as HTMLInputElement).value.trim().toLowerCase();
        render();
      });

      container.querySelectorAll('th.is-sortable').forEach(th => {
        th.addEventListener('click', () => {
          const col = th.getAttribute('data-col') as 'name' | 'role' | 'salary';
          if (sortCol === col) {
            sortAsc = !sortAsc;
          } else {
            sortCol = col;
            sortAsc = true;
          }
          render();
        });
      });

      btnCompact.addEventListener('click', () => {
        isCompact = true;
        btnCompact.classList.add('is-active');
        btnNormal.classList.remove('is-active');
        render();
      });

      btnNormal.addEventListener('click', () => {
        isCompact = false;
        btnNormal.classList.add('is-active');
        btnCompact.classList.remove('is-active');
        render();
      });
    }
  }
];
