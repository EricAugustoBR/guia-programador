import"./main-CvY94YZ6.js";var e=[{id:`imutabilidade`,order:1,name:`1. Imutabilidade (Immutability)`,category:`dados`,categoryLabel:`Estado & Dados`,severity:`Crítica`,concept:`Nunca altere objetos, arrays ou estados existentes diretamente na memória; crie sempre uma nova cópia contendo as modificações.`,whyItMatters:`Mutações diretas geram efeitos colaterais silenciosos, quebram a reatividade de bibliotecas, impossibilitam a memoização e destroem a rastreabilidade do fluxo de dados.`,badSnippet:`// ✕ ANTI-PADRÃO (Mutação direta na memória)
const state = { user: 'Ana', tags: ['Front-End'] };

// Mutação destrutiva:
state.tags.push('TypeScript'); 
state.user = 'Ana Clara';`,goodSnippet:`// ✓ PADRÃO CORRETO (Criação de novos estados imutáveis)
interface AppState {
  readonly user: string;
  readonly tags: readonly string[];
}

const state: AppState = { user: 'Ana', tags: ['Front-End'] };

// Novo objeto com spread operator:
const nextState: AppState = {
  ...state,
  user: 'Ana Clara',
  tags: [...state.tags, 'TypeScript']
};`,mnemonic:`Folha de Caderno com Caneta Permanente: o que já foi registrado não se rasura; para atualizar, escreve-se em uma nova página.`,practicalTip:"Defina propriedades como `readonly` no TypeScript e congele objetos críticos com `Object.freeze()` em testes."},{id:`semantica-a11y`,order:2,name:`2. HTML Semântico & Acessibilidade (A11y)`,category:`a11y`,categoryLabel:`Acessibilidade & Web`,severity:`Crítica`,concept:`Utilize tags nativas do HTML5 antes de qualquer div genérica e assegure navegabilidade total via teclado e leitores de tela.`,whyItMatters:`Melhora o SEO, garante acesso a usuários com deficiência motora/visual e economiza dezenas de linhas de JavaScript desnecessário.`,badSnippet:`<!-- ✕ ANTI-PADRÃO: Div clicável sem semântica -->
<div class="botao" onclick="enviarDados()">
  Salvar
</div>`,goodSnippet:`<!-- ✓ PADRÃO CORRETO: Botão nativo com foco e teclado -->
<button type="button" class="ui-btn ui-btn-primary">
  Salvar
</button>`,mnemonic:`Acessibilidade é a "Rampa de Acesso": o que é construído para quem precisa de rampa beneficia a todos.`,practicalTip:`Navegue pelo seu próprio site usando apenas as teclas [Tab], [Enter] e [Space] sem tocar no mouse.`},{id:`tipagem-estrita`,order:3,name:"3. Tipagem Estrita (Zero `any`)",category:`arquitetura`,categoryLabel:`TypeScript & Arquitetura`,severity:`Essencial`,concept:"Proíba o uso do tipo `any` e nunca force conversões cegas (`as unknown as X`); deixe o compilador verificar 100% dos fluxos.",whyItMatters:"O `any` desativa todo o sistema de proteção do TypeScript, transformando erros de tempo de compilação em falhas graves em produção.",badSnippet:`// ✕ ANTI-PADRÃO: Fuga de tipagem
function processarResposta(data: any) {
  return data.usuario.endereco.cidade; // Pode quebrar em runtime!
}`,goodSnippet:`// ✓ PADRÃO CORRETO: Tipagem descritiva e segura
interface RespostaAPI {
  usuario: {
    endereco?: {
      cidade: string;
    };
  };
}

function processarResposta(data: RespostaAPI): string {
  return data.usuario.endereco?.cidade ?? 'Cidade não informada';
}`,mnemonic:'Tipagem é o "Cinto de Segurança": desativá-lo com `any` não torna a viagem mais rápida, apenas fatal no primeiro impacto.',practicalTip:'Mantenha no tsconfig.json: `"strict": true` e `"noImplicitAny": true`.'},{id:`resiliencia-estados`,order:4,name:`4. Resiliência de Estados (Os 4 Estados da UI)`,category:`arquitetura`,categoryLabel:`TypeScript & Arquitetura`,severity:`Essencial`,concept:`Toda tela ou componente assíncrono deve prever e tratar visualmente: Carregamento (Loading), Erro (Error), Vazio (Empty) e Sucesso (Success).`,whyItMatters:`Projetar apenas o "caminho feliz" (happy path) deixa o usuário preso em telas brancas ou congeladas quando a rede falha ou a lista está vazia.`,badSnippet:`// ✕ ANTI-PADRÃO: Presume que os dados sempre chegam perfeitos
if (dados.length > 0) {
  renderizarLista(dados);
}`,goodSnippet:`// ✓ PADRÃO CORRETO: Tratamento explícito de todos os cenários
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'empty' }
  | { status: 'success'; data: T };`,mnemonic:`Os Quatro Pilares: se uma das quatro pernas da mesa quebrar, a interface inteira tomba.`,practicalTip:"Crie componentes reutilizáveis para `<SkeletonLoader>`, `<EmptyState>` e `<ErrorMessage>`."},{id:`design-tokens`,order:5,name:`5. Design Tokens (Zero Valores Mágicos)`,category:`css`,categoryLabel:`CSS & Estilização`,severity:`Recomendada`,concept:"Nunca declare cores hexadecimais soltas ou espaçamentos arbitrários; utilize sempre variáveis CSS semânticas (`var(--token)`).",whyItMatters:`Facilita suporte imediato a Dark/Light mode, garante consistência estética e torna refatorações globais instantâneas.`,badSnippet:`/* ✕ ANTI-PADRÃO: Cores e espaçamentos soltos */
.card {
  background: #1e293b;
  color: #6366f1;
  padding: 17px;
  border-radius: 7px;
}`,goodSnippet:`/* ✓ PADRÃO CORRETO: Tokens semânticos e consistentes */
.card {
  background: var(--bg-surface-elevated);
  color: var(--brand-primary);
  padding: var(--space-md);
  border-radius: var(--radius-md);
}`,mnemonic:`Tokens são o "Lego Padronizado": todas as peças encaixam porque respeitam a mesma medida universal.`,practicalTip:"Agrupe todas as variáveis no arquivo central `:root` dentro de `tokens.css`."},{id:`responsabilidade-unica`,order:6,name:`6. Responsabilidade Única (SRP)`,category:`arquitetura`,categoryLabel:`TypeScript & Arquitetura`,severity:`Recomendada`,concept:`Cada função, módulo ou componente de interface deve resolver apenas um problema bem delineado.`,whyItMatters:`Componentes gigantescos ("God Components") de 800 linhas são impossíveis de testar, causam bugs colaterais e desencorajam a reutilização.`,badSnippet:`// ✕ ANTI-PADRÃO: Um único arquivo faz busca de API, calcula impostos e desenha a tela inteira`,goodSnippet:`// ✓ PADRÃO CORRETO: Separação em camadas
// 1. Data Fetcher (serviço)
// 2. State Controller (regras de negócio)
// 3. UI Component (pura apresentação visual)`,mnemonic:`Canivete Suíço vs Faca do Chef: uma ferramenta especializada corta com perfeição; tentar fazer tudo gera ferramentas desajeitadas.`,practicalTip:`Se o componente passou de 200 linhas ou tem mais de 3 responsabilidades, quebre-o em subcomponentes.`},{id:`prevencao-cls`,order:7,name:`7. Prevenção de CLS (Estabilidade Visual)`,category:`css`,categoryLabel:`CSS & Estilização`,severity:`Essencial`,concept:"Reserve espaço prévio para imagens, fontes e conteúdos dinâmicos com `aspect-ratio` ou skeleton loaders.",whyItMatters:`Evita que elementos na tela pulem de posição enquanto carregam, prevenindo cliques acidentais e melhorando a pontuação Core Web Vitals do Google.`,badSnippet:`<!-- ✕ ANTI-PADRÃO: Imagem sem dimensões reservadas -->
<img src="/foto.jpg" alt="Avatar">`,goodSnippet:`<!-- ✓ PADRÃO CORRETO: Dimensões explícitas no CSS/HTML -->
<img src="/foto.jpg" alt="Avatar" width="300" height="200" style="aspect-ratio: 3/2;">`,mnemonic:`Vaga de Garagem Demarcada: o espaço do carro já está desenhado no chão mesmo antes de ele chegar.`,practicalTip:`Teste o site em conexões simuladas de "Slow 3G" nas ferramentas de desenvolvedor do navegador.`},{id:`mobile-first`,order:8,name:`8. Filosofia Mobile-First`,category:`css`,categoryLabel:`CSS & Estilização`,severity:`Recomendada`,concept:"Estruture o CSS base para a menor tela primeiro e utilize `@media (min-width: ...)` para expandir o layout em telas maiores.",whyItMatters:`Garante que dispositivos móveis (que têm conexões mais lentas e telas restritas) recebam o CSS mais limpo e leve possível.`,badSnippet:`/* ✕ EVITE: Escrever estilos para 4K e depois sobrescrever tudo com max-width */
.sidebar { width: 300px; }
@media (max-width: 600px) { .sidebar { display: none; } }`,goodSnippet:`/* ✓ PADRÃO CORRETO: Mobile-First natural */
.sidebar { display: none; }
@media (min-width: 768px) {
  .sidebar { display: block; width: 280px; }
}`,mnemonic:`Mala de Viagem Pequena: coloque primeiro o essencial; se sobrar espaço na mala maior, adicione os extras.`,practicalTip:`Inicie todo teste de interface reduzindo a janela do navegador para 360px de largura.`}],t=class{checkedRules=new Set;searchQuery=``;activeCategory=`all`;isLightMode=!1;rulesListContainer=document.getElementById(`rules-list`);searchInput=document.getElementById(`search-input`);progressFill=document.getElementById(`progress-bar-fill`);progressStat=document.getElementById(`progress-stat`);celebrateBanner=document.getElementById(`celebrate-banner`);categoryNav=document.getElementById(`rules-category-pills`);themeToggleBtn=document.getElementById(`theme-toggle-btn`);backToTopBtn=document.getElementById(`back-to-top`);resetBtn=document.getElementById(`btn-reset-checklist`);constructor(){this.initTheme(),this.loadSavedChecks(),this.setupEventListeners(),this.renderCategoryPills(),this.renderRules(),this.updateProgress()}initTheme(){localStorage.getItem(`guia-theme`)===`light`&&(this.isLightMode=!0,document.documentElement.setAttribute(`data-theme`,`light`)),this.updateThemeButton()}toggleTheme(){this.isLightMode=!this.isLightMode;let e=this.isLightMode?`light`:`dark`;document.documentElement.setAttribute(`data-theme`,e),localStorage.setItem(`guia-theme`,e),this.updateThemeButton()}updateThemeButton(){this.themeToggleBtn&&(this.themeToggleBtn.innerHTML=this.isLightMode?`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,this.themeToggleBtn.title=this.isLightMode?`Alternar para Modo Escuro`:`Alternar para Modo Claro`)}loadSavedChecks(){try{let e=localStorage.getItem(`guia-rules-checked`);if(e){let t=JSON.parse(e);Array.isArray(t)&&(this.checkedRules=new Set(t))}}catch(e){console.warn(`Erro ao carregar checklist salvo`,e)}}saveChecks(){localStorage.setItem(`guia-rules-checked`,JSON.stringify(Array.from(this.checkedRules)))}toggleRuleCheck(e){this.checkedRules.has(e)?this.checkedRules.delete(e):this.checkedRules.add(e),this.saveChecks(),this.updateProgress();let t=document.getElementById(`rule-card-${e}`);t&&t.classList.toggle(`is-checked`,this.checkedRules.has(e))}updateProgress(){let t=e.length,n=this.checkedRules.size,r=Math.round(n/t*100);this.progressFill&&(this.progressFill.style.width=`${r}%`),this.progressStat&&(this.progressStat.textContent=`${n} de ${t} cumpridas (${r}%)`),this.celebrateBanner&&(n===t&&t>0?this.celebrateBanner.classList.add(`is-active`):this.celebrateBanner.classList.remove(`is-active`))}resetChecklist(){confirm(`Deseja desmarcar todos os itens do checklist?`)&&(this.checkedRules.clear(),this.saveChecks(),this.updateProgress(),this.renderRules())}setupEventListeners(){this.themeToggleBtn?.addEventListener(`click`,()=>this.toggleTheme()),this.resetBtn?.addEventListener(`click`,()=>this.resetChecklist()),this.searchInput?.addEventListener(`input`,e=>{this.searchQuery=e.target.value.trim().toLowerCase(),this.renderRules()}),window.addEventListener(`scroll`,()=>{window.scrollY>300?this.backToTopBtn?.classList.add(`is-visible`):this.backToTopBtn?.classList.remove(`is-visible`)}),this.backToTopBtn?.addEventListener(`click`,()=>{window.scrollTo({top:0,behavior:`smooth`})})}renderCategoryPills(){this.categoryNav&&(this.categoryNav.innerHTML=``,[{id:`all`,label:`Todas as Regras`},{id:`dados`,label:`Estado & Dados (Imutabilidade)`},{id:`a11y`,label:`Acessibilidade & Web`},{id:`arquitetura`,label:`TypeScript & Arquitetura`},{id:`css`,label:`CSS & Estilização`}].forEach(e=>{let t=document.createElement(`button`);t.type=`button`,t.className=`category-pill ${this.activeCategory===e.id?`is-active`:``}`,t.textContent=e.label,t.addEventListener(`click`,()=>{this.activeCategory=e.id,this.renderCategoryPills(),this.renderRules()}),this.categoryNav.appendChild(t)}))}getFilteredRules(){return e.filter(e=>{let t=this.activeCategory===`all`||e.category===this.activeCategory,n=!this.searchQuery||e.name.toLowerCase().includes(this.searchQuery)||e.concept.toLowerCase().includes(this.searchQuery)||e.whyItMatters.toLowerCase().includes(this.searchQuery)||e.mnemonic.toLowerCase().includes(this.searchQuery);return t&&n})}renderRules(){if(!this.rulesListContainer)return;this.rulesListContainer.innerHTML=``;let e=this.getFilteredRules();if(e.length===0){this.rulesListContainer.innerHTML=`
        <div style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <p style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">Nenhuma regra encontrada</p>
          <p style="font-size: 0.875rem;">Tente buscar por "imutabilidade", "a11y", "tokens", "any"...</p>
        </div>
      `;return}e.forEach(e=>{let t=this.checkedRules.has(e.id),n=document.createElement(`article`);n.className=`rule-card ${t?`is-checked`:``}`,n.id=`rule-card-${e.id}`;let r=e.severity===`Crítica`?`badge-critica`:e.severity===`Essencial`?`badge-essencial`:`badge-recomendada`;n.innerHTML=`
        <div class="rule-header">
          <button type="button" class="rule-checkbox-btn" aria-label="Alternar regra cumprida" id="btn-chk-${e.id}">
            ✓
          </button>
          <div class="rule-title-group">
            <div class="rule-title-row">
              <h3 class="rule-name">${e.name}</h3>
              <div class="rule-badges">
                <span class="ui-badge ${r}">${e.severity}</span>
                <span class="card-cat-badge">${e.categoryLabel}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="rule-body">
          <div class="rule-concept-box">
            <strong>O que é:</strong> ${e.concept}
            <p><strong>Por que importa:</strong> ${e.whyItMatters}</p>
          </div>

          <div class="rule-code-comparison">
            <div class="code-box code-box-bad">
              <div class="code-box-header">
                <span>✕ O que Evitar</span>
              </div>
              <pre><code>${this.escapeHtml(e.badSnippet)}</code></pre>
            </div>

            <div class="code-box code-box-good">
              <div class="code-box-header">
                <span>✓ Padrão Correto</span>
              </div>
              <pre><code>${this.escapeHtml(e.goodSnippet)}</code></pre>
            </div>
          </div>

          <div class="rule-advice-grid">
            <div class="advice-item">
              <span class="advice-label label-tip">💡 Mnemônico de Fixação</span>
              <span class="advice-text">${e.mnemonic}</span>
            </div>
            <div class="advice-item">
              <span class="advice-label label-tool">🛠️ Como Validar no Projeto</span>
              <span class="advice-text">${e.practicalTip}</span>
            </div>
          </div>
        </div>
      `,this.rulesListContainer.appendChild(n),n.querySelector(`#btn-chk-${e.id}`)?.addEventListener(`click`,()=>{this.toggleRuleCheck(e.id)})})}escapeHtml(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`)}};document.addEventListener(`DOMContentLoaded`,()=>{new t});