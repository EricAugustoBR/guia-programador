import"./main-CvY94YZ6.js";var e=[{id:`all`,label:`Todos os Controles`,iconSvg:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`},{id:`indicators`,label:`Badges & Chips`,iconSvg:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`},{id:`inputs`,label:`Inputs & Seletores`,iconSvg:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><line x1="7" y1="15" x2="17" y2="15"/></svg>`},{id:`navigation`,label:`Navegação & Trilhas`,iconSvg:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`},{id:`feedback`,label:`Feedback & Overlays`,iconSvg:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`},{id:`containers`,label:`Containers & Estrutura`,iconSvg:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>`},{id:`loading`,label:`Carregamento & Status`,iconSvg:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/></svg>`},{id:`scroll`,label:`Scroll & Viewport`,iconSvg:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4"/></svg>`}],t=[{id:`chip`,name:`Chip (Tag / Pill)`,ptName:`Etiqueta Compacta / Ficha Interativa`,category:`indicators`,categoryLabel:`Badges & Chips`,concept:`Elemento compacto e clicável usado para representar atributos, filtros ativos ou seleções descartáveis.`,purpose:`Ideal para filtros múltiplos em e-commerce, tags de posts ou remoção de categorias selecionadas.`,goodPractice:`Use ícone "✕" para ações de remoção rápida e alterne estado ativo em filtros.`,commonPitfall:`Não confunda Chip (interativo/clicável) com Badge (geralmente estático ou puramente informativo).`,mnemonic:`Pense em "Fichas de Cassino": você pega, clica, ativa e descarta quando quiser.`,htmlSnippet:`<div class="ui-chip-group">
  <button class="ui-chip is-active">TypeScript</button>
  <button class="ui-chip">HTML5</button>
  <button class="ui-chip">CSS3 <span class="ui-chip-close">&times;</span></button>
</div>`,cssSnippet:`.ui-chip {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: #1e293b;
  border: 1px solid #334155;
  cursor: pointer;
}`,renderInteractive:e=>{e.innerHTML=`
        <div class="ui-chip-group">
          <button type="button" class="ui-chip is-active" data-chip="ts">TypeScript</button>
          <button type="button" class="ui-chip" data-chip="html">HTML5</button>
          <button type="button" class="ui-chip" data-chip="css">CSS Grid <span class="ui-chip-close" title="Remover">&times;</span></button>
          <button type="button" class="ui-chip" data-chip="svg">SVG <span class="ui-chip-close" title="Remover">&times;</span></button>
        </div>
      `,e.querySelectorAll(`.ui-chip`).forEach(e=>{e.addEventListener(`click`,t=>{t.target.classList.contains(`ui-chip-close`)?(t.stopPropagation(),e.style.transform=`scale(0.8)`,e.style.opacity=`0`,setTimeout(()=>e.remove(),150)):e.classList.toggle(`is-active`)})})}},{id:`badge`,name:`Badge (Crachá / Indicador)`,ptName:`Contador / Sinalizador de Status`,category:`indicators`,categoryLabel:`Badges & Chips`,concept:`Pequeno indicador visual afixado a um ícone ou elemento para exibir contadores numéricos ou estados.`,purpose:`Exibir contagem de mensagens não lidas, status online/offline ou alertas de novidade.`,goodPractice:`Mantenha valores numéricos concisos (ex: use "99+" se exceder dois dígitos).`,commonPitfall:`Evite transformar badges em botões de ação complexos; seu foco é sinalização passiva.`,mnemonic:`Badge é a "Medalha" no uniforme: pequena, afixada no canto e informa status de relance.`,htmlSnippet:`<div class="ui-badge-container">
  <button class="ui-btn ui-btn-secondary ui-btn-icon">🔔</button>
  <span class="ui-badge badge-danger badge-floating">3</span>
</div>`,cssSnippet:`.ui-badge-floating {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  border-radius: 9999px;
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="display: flex; gap: 1.5rem; align-items: center;">
          <div class="ui-badge-container">
            <button class="ui-btn ui-btn-secondary ui-btn-icon" id="badge-bell-demo" title="Clique para somar +1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </button>
            <span class="ui-badge badge-danger badge-floating" id="badge-counter-demo">3</span>
          </div>
          <span class="ui-badge badge-success">
            <span class="ui-badge badge-dot badge-success" style="margin-right: 4px;"></span> Online
          </span>
          <span class="ui-badge">v2.4.0</span>
        </div>
      `;let t=e.querySelector(`#badge-bell-demo`),n=e.querySelector(`#badge-counter-demo`),r=3;t?.addEventListener(`click`,()=>{r++,n&&(n.textContent=r>9?`9+`:String(r))})}},{id:`scroll`,name:`Scroll & Custom Scrollbar`,ptName:`Barra de Rolagem / Transbordo Controlado`,category:`scroll`,categoryLabel:`Scroll & Viewport`,concept:`Mecanismo de navegação por transbordo (overflow) vertical ou horizontal com trilha e cursor estilizados.`,purpose:`Permitir navegação em listas densas mantendo altura e layout da interface consistentes.`,goodPractice:"Estilize com `scrollbar-width: thin` e `::-webkit-scrollbar` mantendo alto contraste de usabilidade.",commonPitfall:`Nunca esconda totalmente a barra de rolagem sem deixar pistas visuais claras de que há mais conteúdo.`,mnemonic:`Scroll é a "Janela de Rolagem": você só enxerga o que cabe na moldura, mas desliza a fita.`,htmlSnippet:`<div class="ui-custom-scroll">
  <div class="ui-scroll-item">Linha de item 1</div>
  <div class="ui-scroll-item">Linha de item 2</div>
  <div class="ui-scroll-item">Linha de item 3</div>
</div>`,cssSnippet:`.ui-custom-scroll {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #6366f1 #1e293b;
}
.ui-custom-scroll::-webkit-scrollbar-thumb {
  background: #6366f1;
  border-radius: 9999px;
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="width: 100%;">
          <div class="ui-custom-scroll" style="height: 110px;">
            <div class="ui-scroll-item"><strong>1. Track</strong> — A calha fixa de rolagem</div>
            <div class="ui-scroll-item"><strong>2. Thumb</strong> — O cursor que desliza ao arrastar</div>
            <div class="ui-scroll-item"><strong>3. Scroll-snap</strong> — Parada magnética em itens</div>
            <div class="ui-scroll-item"><strong>4. Smooth scroll</strong> — Transição de rolagem suave</div>
            <div class="ui-scroll-item"><strong>5. Scrollspy</strong> — Detecção de visibilidade no viewport</div>
          </div>
        </div>
      `}},{id:`button`,name:`Button (Botão & Variantes)`,ptName:`Gatilho de Ação Primária/Secundária`,category:`inputs`,categoryLabel:`Inputs & Seletores`,concept:`Principal elemento de sinalização de ação direta do usuário (submissão, confirmação, disparo de fluxo).`,purpose:`Estabelecer hierarquia de ações através de variantes: Primário, Secundário, Ghost e Destrutivo.`,goodPractice:`Mantenha apenas 1 ação primária proeminente por viewport para evitar paralisia decisória.`,commonPitfall:"Usar botões quando deveria ser um link `<a>` (botão faz ação; link navega para uma URL).",mnemonic:'Botão é o "Interruptor de Ação": se executa algo imediato, é `<button>`.',htmlSnippet:`<button class="ui-btn ui-btn-primary">Salvar Alterações</button>
<button class="ui-btn ui-btn-secondary">Cancelar</button>
<button class="ui-btn ui-btn-ghost">Ajuda</button>`,cssSnippet:`.ui-btn-primary {
  background: #6366f1;
  color: white;
  border-radius: 0.5rem;
  font-weight: 600;
}`,renderInteractive:e=>{e.innerHTML=`
        <div class="ui-btn-group">
          <button type="button" class="ui-btn ui-btn-primary" id="demo-btn-act">Primário</button>
          <button type="button" class="ui-btn ui-btn-secondary">Secundário</button>
          <button type="button" class="ui-btn ui-btn-ghost">Ghost</button>
          <button type="button" class="ui-btn ui-btn-danger">Destrutivo</button>
        </div>
      `;let t=e.querySelector(`#demo-btn-act`);t?.addEventListener(`click`,()=>{t.textContent=`Clicado! ✨`,setTimeout(()=>t.textContent=`Primário`,1200)})}},{id:`toggle-switch`,name:`Toggle / Switch`,ptName:`Chave Comutadora Liga/Desliga`,category:`inputs`,categoryLabel:`Inputs & Seletores`,concept:`Controle de estado binário que aplica imediatamente a mudança sem necessidade de botão "Salvar".`,purpose:`Configurações de preferências imediatas (ex: Tema escuro, Notificações ativadas, Modo avião).`,goodPractice:`O efeito da mudança deve ser instantâneo e o estado visual (ativo/inativo) inequívoco.`,commonPitfall:`Não use Switch em formulários que dependem de submissão em lote (para isso use Checkbox).`,mnemonic:`Pense no interruptor da lâmpada de casa: virou, acendeu na hora sem esperar confirmação.`,htmlSnippet:`<label class="ui-switch-label">
  <input type="checkbox" class="ui-switch-input" checked>
  <span class="ui-switch-track"><span class="ui-switch-thumb"></span></span>
  <span>Modo Silencioso</span>
</label>`,cssSnippet:`.ui-switch-input:checked + .ui-switch-track {
  background: #6366f1;
}
.ui-switch-input:checked + .ui-switch-track .ui-switch-thumb {
  transform: translateX(20px);
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <label class="ui-switch-label">
            <input type="checkbox" class="ui-switch-input" checked id="demo-sw-1">
            <span class="ui-switch-track"><span class="ui-switch-thumb"></span></span>
            <span id="demo-sw-text">Notificações: Ativadas</span>
          </label>
        </div>
      `;let t=e.querySelector(`#demo-sw-1`),n=e.querySelector(`#demo-sw-text`);t?.addEventListener(`change`,()=>{n&&(n.textContent=t.checked?`Notificações: Ativadas`:`Notificações: Desativadas`)})}},{id:`checkbox-radio`,name:`Checkbox & Radio Button`,ptName:`Caixa de Seleção & Botão de Escolha Única`,category:`inputs`,categoryLabel:`Inputs & Seletores`,concept:`Controles nativos de seleção: Checkbox para opções múltiplas independentes; Radio para escolha única.`,purpose:`Formulários estruturados de dados, questionários, termos de serviço e seleção em grade.`,goodPractice:"Sempre agrupe Radios com o mesmo atributo `name` e utilize `<label>` clicável.",commonPitfall:`Nunca use Radio para opções que permitam desmarcar todas ou marcar múltiplas.`,mnemonic:`Radio é o rádio do carro: só toca uma estação por vez. Checkbox é lista de compras de supermercado.`,htmlSnippet:`<label class="ui-checkbox-label">
  <input type="checkbox" class="ui-checkbox" checked> Aceito os termos
</label>
<label class="ui-radio-label">
  <input type="radio" name="plan" class="ui-radio" checked> Pro
</label>`,cssSnippet:`.ui-checkbox:checked, .ui-radio:checked {
  background: #6366f1;
  border-color: #6366f1;
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <label class="ui-checkbox-label">
            <input type="checkbox" class="ui-checkbox" checked>
            <span>Lembrar minhas credenciais</span>
          </label>
          <div style="display: flex; gap: 1rem; margin-top: 0.25rem;">
            <label class="ui-radio-label">
              <input type="radio" name="demo_opt" class="ui-radio" checked>
              <span>Opção A</span>
            </label>
            <label class="ui-radio-label">
              <input type="radio" name="demo_opt" class="ui-radio">
              <span>Opção B</span>
            </label>
          </div>
        </div>
      `}},{id:`segmented-control`,name:`Segmented Control`,ptName:`Controle Segmentado / Seletor de Modo`,category:`inputs`,categoryLabel:`Inputs & Seletores`,concept:`Barra horizontal compacta de botões interconectados para alternância rápida entre visões ou filtros.`,purpose:`Alternar entre modos como [Lista | Grade | Tabela] ou períodos [Hoje | Semana | Mês].`,goodPractice:`Limite o número de segmentos a no máximo 4 ou 5 opções para manter legibilidade.`,commonPitfall:`Não use em fluxos de ação assíncrona; deve mudar o estado da UI instantaneamente.`,mnemonic:`Pense nas marchas do câmbio: você seleciona uma posição única dentro do mesmo bloco.`,htmlSnippet:`<div class="ui-segmented">
  <button class="ui-segmented-btn is-active">Dia</button>
  <button class="ui-segmented-btn">Semana</button>
  <button class="ui-segmented-btn">Mês</button>
</div>`,cssSnippet:`.ui-segmented {
  display: inline-flex;
  background: #1e293b;
  border-radius: 0.5rem;
  padding: 3px;
}`,renderInteractive:e=>{e.innerHTML=`
        <div class="ui-segmented" role="tablist">
          <button class="ui-segmented-btn is-active" data-seg="grid">Grade</button>
          <button class="ui-segmented-btn" data-seg="list">Lista</button>
          <button class="ui-segmented-btn" data-seg="table">Tabela</button>
        </div>
      `;let t=e.querySelectorAll(`.ui-segmented-btn`);t.forEach(e=>{e.addEventListener(`click`,()=>{t.forEach(e=>e.classList.remove(`is-active`)),e.classList.add(`is-active`)})})}},{id:`slider`,name:`Slider / Range`,ptName:`Controle Deslizante de Faixa`,category:`inputs`,categoryLabel:`Inputs & Seletores`,concept:`Controle deslizante que permite ao usuário escolher um valor contínuo ou discreto ao longo de uma trilha.`,purpose:`Ajuste de volume, brilho, filtro de faixas de preço em lojas ou zoom visual.`,goodPractice:`Exiba sempre o valor numérico atual ao lado ou acima da trilha para precisão.`,commonPitfall:`Evite usar quando o usuário precisa digitar dados extremamente precisos (como datas exatas ou valores bancários).`,mnemonic:`Slider é a "Mesa de Som": você desliza a haste para subir ou descer a intensidade.`,htmlSnippet:`<div class="ui-slider-box">
  <div class="ui-slider-header"><span>Volume</span><span id="val">75%</span></div>
  <input type="range" min="0" max="100" value="75" class="ui-slider">
</div>`,cssSnippet:`.ui-slider::-webkit-slider-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #6366f1;
}`,renderInteractive:e=>{e.innerHTML=`
        <div class="ui-slider-box" style="max-width: 260px;">
          <div class="ui-slider-header">
            <span>Volume de Áudio</span>
            <strong id="slider-demo-val" style="color: var(--brand-primary)">70%</strong>
          </div>
          <input type="range" min="0" max="100" value="70" class="ui-slider" id="slider-demo-input">
        </div>
      `;let t=e.querySelector(`#slider-demo-input`),n=e.querySelector(`#slider-demo-val`);t?.addEventListener(`input`,()=>{n&&(n.textContent=`${t.value}%`)})}},{id:`dropdown-select`,name:`Dropdown / Select`,ptName:`Menu Suspenso / Caixa de Seleção Retrátil`,category:`inputs`,categoryLabel:`Inputs & Seletores`,concept:`Gatilho compacto que expande uma lista suspensa de opções selecionáveis quando clicado.`,purpose:`Economizar espaço de tela em formulários com listas longas de opções (como países, estados ou categorias).`,goodPractice:`Se houver menos de 4 opções, prefira Radio Buttons ou Segmented Control para evitar cliques desnecessários.`,commonPitfall:`Esconder opções frequentes em dropdowns sem necessidade aumenta a carga cognitiva.`,mnemonic:`Dropdown é a "Gaveta Dobrável": fica fechada ocupando 1 linha e abre o menu só quando chamada.`,htmlSnippet:`<div class="ui-select-wrapper">
  <select class="ui-select">
    <option>Front-End Developer</option>
    <option>Back-End Developer</option>
    <option>Full-Stack Engineer</option>
  </select>
  <span class="ui-select-icon">▼</span>
</div>`,cssSnippet:`.ui-select {
  appearance: none;
  padding-right: 2rem;
  background: #1e293b;
  border-radius: 0.5rem;
}`,renderInteractive:e=>{e.innerHTML=`
        <div class="ui-select-wrapper">
          <select class="ui-select">
            <option>Desenvolvimento Front-End</option>
            <option>Engenharia de Dados</option>
            <option>Design de UI / UX</option>
            <option>Arquitetura Cloud</option>
          </select>
          <span class="ui-select-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </span>
        </div>
      `}},{id:`text-input`,name:`Text Input & Textarea`,ptName:`Campo de Entrada de Texto & Área Multilinha`,category:`inputs`,categoryLabel:`Inputs & Seletores`,concept:`Campos para inserção de dados alfanuméricos curtos (Input) ou textos longos multilinha (Textarea).`,purpose:`Coleta de dados do usuário (nome, e-mail, senha, buscas ou comentários detalhados).`,goodPractice:"Sempre inclua `<label>` acessível, placeholder auxiliar e texto explicativo de erro/validação.",commonPitfall:`Usar apenas placeholder como rótulo (ele desaparece assim que o usuário digita).`,mnemonic:`Input é a "Folha em Branco Pautada": você preenche na linha demarcada.`,htmlSnippet:`<div class="ui-input-box">
  <input type="text" class="ui-input" placeholder="Digite seu nome...">
  <span class="ui-input-helper">Visível publicamente no seu perfil</span>
</div>`,cssSnippet:`.ui-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}`,renderInteractive:e=>{e.innerHTML=`
        <div class="ui-input-box" style="max-width: 280px;">
          <input type="text" class="ui-input" placeholder="Ex: Maria Silva" id="demo-user-input">
          <span class="ui-input-helper" id="demo-input-hint">Pressione Enter ou digite algo</span>
        </div>
      `;let t=e.querySelector(`#demo-user-input`),n=e.querySelector(`#demo-input-hint`);t?.addEventListener(`input`,()=>{n&&(n.textContent=t.value?`Digitando: ${t.value.length} caracteres`:`Pressione Enter ou digite algo`)})}},{id:`breadcrumbs`,name:`Breadcrumbs`,ptName:`Trilha de Navegação (Migalhas de Pão)`,category:`navigation`,categoryLabel:`Navegação & Trilhas`,concept:`Trilha secundária de navegação que exibe a localização hierárquica atual do usuário na estrutura da aplicação.`,purpose:`Orientar o usuário em estruturas profundas de catálogo, documentação ou painéis administrativos.`,goodPractice:'Marque a página atual com `aria-current="page"` e não a torne clicável.',commonPitfall:`Não substitua a barra de navegação principal por breadcrumbs.`,mnemonic:`Vem do conto de "João e Maria": deixar migalhas pelo caminho para saber de onde veio e como voltar.`,htmlSnippet:`<nav aria-label="Breadcrumb">
  <ol class="ui-breadcrumbs">
    <li><a href="#">Início</a> ›</li>
    <li><a href="#">Guias</a> ›</li>
    <li aria-current="page">Front-End</li>
  </ol>
</nav>`,cssSnippet:`.ui-breadcrumbs {
  display: flex;
  gap: 0.375rem;
  list-style: none;
}`,renderInteractive:e=>{e.innerHTML=`
        <nav aria-label="Breadcrumb">
          <ol class="ui-breadcrumbs">
            <li><a href="#home">Home</a></li>
            <li>/</li>
            <li><a href="#cursos">Cursos</a></li>
            <li>/</li>
            <li><span aria-current="page">Front-End UI</span></li>
          </ol>
        </nav>
      `}},{id:`tabs`,name:`Tabs (Abas)`,ptName:`Painel de Abas Alternáveis`,category:`navigation`,categoryLabel:`Navegação & Trilhas`,concept:`Estrutura que divide conteúdos em múltiplas visões no mesmo contexto visual, exibindo uma de cada vez.`,purpose:`Organizar informações relacionadas em páginas de perfil, configurações ou documentações sem recarregar a tela.`,goodPractice:'Utilize os papéis `role="tablist"`, `role="tab"` e `role="tabpanel"` para acessibilidade.',commonPitfall:`Não utilize abas para etapas sequenciais (para isso use Stepper/Wizard).`,mnemonic:`Pense nas divisórias de um fichário escolar: cada orelha revela uma seção do mesmo caderno.`,htmlSnippet:`<div class="ui-tabs-list" role="tablist">
  <button class="ui-tab is-active" role="tab">Visão Geral</button>
  <button class="ui-tab" role="tab">Código</button>
  <button class="ui-tab" role="tab">Histórico</button>
</div>`,cssSnippet:`.ui-tab.is-active {
  color: #6366f1;
  border-bottom: 2px solid #6366f1;
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="width: 100%;">
          <div class="ui-tabs-list" role="tablist">
            <button class="ui-tab is-active" data-tab="1">Estrutura</button>
            <button class="ui-tab" data-tab="2">Estilos</button>
            <button class="ui-tab" data-tab="3">TypeScript</button>
          </div>
          <div id="tab-demo-content" style="padding-top: 0.75rem; font-size: 0.8125rem; color: var(--text-secondary);">
            Conteúdo selecionado: <strong>HTML Semântico</strong>
          </div>
        </div>
      `;let t=e.querySelectorAll(`.ui-tab`),n=e.querySelector(`#tab-demo-content`),r={1:`Conteúdo selecionado: <strong>HTML Semântico</strong>`,2:`Conteúdo selecionado: <strong>CSS Custom Properties & Flexbox</strong>`,3:`Conteúdo selecionado: <strong>TypeScript Strict Typings</strong>`};t.forEach(e=>{e.addEventListener(`click`,()=>{t.forEach(e=>e.classList.remove(`is-active`)),e.classList.add(`is-active`);let i=e.getAttribute(`data-tab`)||`1`;n&&(n.innerHTML=r[i])})})}},{id:`pagination`,name:`Pagination`,ptName:`Paginação Numérica Sequencial`,category:`navigation`,categoryLabel:`Navegação & Trilhas`,concept:`Conjunto sequencial de links ou botões para navegar entre grandes volumes de registros divididos em blocos.`,purpose:`Tabelas extensas, catálogos de produtos e resultados de busca com centenas de itens.`,goodPractice:`Indique claramente a página ativa e ofereça botões de Anterior/Próximo acessíveis.`,commonPitfall:`Não use paginação tradicional para feeds infinitos de redes sociais (onde infinite scroll é melhor).`,mnemonic:`Paginação é o "Índice de Livro": você pula direto para o capítulo ou página desejada.`,htmlSnippet:`<nav class="ui-pagination" aria-label="Paginação">
  <button class="ui-page-btn">‹</button>
  <button class="ui-page-btn is-active">1</button>
  <button class="ui-page-btn">2</button>
  <button class="ui-page-btn">3</button>
  <button class="ui-page-btn">›</button>
</nav>`,cssSnippet:`.ui-page-btn.is-active {
  background: #6366f1;
  color: white;
  border-color: #6366f1;
}`,renderInteractive:e=>{e.innerHTML=`
        <div class="ui-pagination">
          <button class="ui-page-btn" id="pg-prev">‹</button>
          <button class="ui-page-btn is-active" data-p="1">1</button>
          <button class="ui-page-btn" data-p="2">2</button>
          <button class="ui-page-btn" data-p="3">3</button>
          <button class="ui-page-btn" id="pg-next">›</button>
        </div>
      `;let t=e.querySelectorAll(`[data-p]`);t.forEach(e=>{e.addEventListener(`click`,()=>{t.forEach(e=>e.classList.remove(`is-active`)),e.classList.add(`is-active`)})})}},{id:`stepper`,name:`Stepper / Wizard`,ptName:`Passo a Passo / Indicador Linear de Fases`,category:`navigation`,categoryLabel:`Navegação & Trilhas`,concept:`Barra visual que guia e ilustra o progresso do usuário ao longo de um fluxo de tarefas dividido em etapas sequenciais.`,purpose:`Checkouts de compras, cadastros extensos de onboarding ou configurações de conta.`,goodPractice:`Destaque visualmente passos concluídos (verde/check), passo ativo e próximos passos.`,commonPitfall:`Criar wizards com passos demais (mais de 5 passos causa abandono de checkout).`,mnemonic:`Pense em uma "Trilha de Pedras": você pisa em uma de cada vez até atravessar o rio.`,htmlSnippet:`<div class="ui-stepper">
  <div class="ui-step-item is-completed">
    <div class="ui-step-circle">✓</div>
    <div class="ui-step-line"></div>
  </div>
  <div class="ui-step-item is-active">
    <div class="ui-step-circle">2</div>
    <div class="ui-step-line"></div>
  </div>
  <div class="ui-step-item">
    <div class="ui-step-circle">3</div>
  </div>
</div>`,cssSnippet:`.ui-step-item.is-completed .ui-step-circle {
  background: #10b981;
  color: white;
}`,renderInteractive:e=>{e.innerHTML=`
        <div class="ui-stepper" style="max-width: 260px;">
          <div class="ui-step-item is-completed">
            <div class="ui-step-circle">✓</div>
            <div class="ui-step-line"></div>
          </div>
          <div class="ui-step-item is-active">
            <div class="ui-step-circle">2</div>
            <div class="ui-step-line"></div>
          </div>
          <div class="ui-step-item">
            <div class="ui-step-circle">3</div>
          </div>
        </div>
      `}},{id:`tooltip`,name:`Tooltip`,ptName:`Dica Flutuante Contextual`,category:`feedback`,categoryLabel:`Feedback & Overlays`,concept:`Pequeno balão textual informativo que surge ao passar o mouse ou focar sobre um gatilho de ação.`,purpose:`Explicar ícones que não têm texto adjacente ou atalhos de teclado (ex: [Ctrl + S]).`,goodPractice:`Mantenha o conteúdo ultra conciso (máximo 1 ou 2 sentenças) e puramente textual.`,commonPitfall:`Nunca coloque links clicáveis ou formulários dentro de um Tooltip (para isso use Popover).`,mnemonic:`Tooltip é o "Sussurro no Ouvido": só aparece quando você se aproxima e some em seguida.`,htmlSnippet:`<div class="ui-tooltip-trigger">
  <button class="ui-btn ui-btn-secondary">Passe o mouse aqui</button>
  <span class="ui-tooltip-box" role="tooltip">Atalho: Ctrl + K</span>
</div>`,cssSnippet:`.ui-tooltip-box {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
}`,renderInteractive:e=>{e.innerHTML=`
        <div class="ui-tooltip-trigger">
          <button class="ui-btn ui-btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            Passe o mouse aqui
          </button>
          <div class="ui-tooltip-box" role="tooltip">Dica: Exporta dados em SVG / JSON</div>
        </div>
      `}},{id:`modal`,name:`Modal / Dialog`,ptName:`Janela Sobreposta / Diálogo Bloqueante`,category:`feedback`,categoryLabel:`Feedback & Overlays`,concept:`Janela flutuante com fundo escurecido (scrim) que exige ação explícita antes do retorno ao fluxo.`,purpose:`Confirmação de exclusão, formulários críticos ou autenticação de segurança.`,goodPractice:`Permita fechar com a tecla ESC, clique no backdrop ou botão de fechar, e prenda o foco (focus trap).`,commonPitfall:`Usar modais para informações banais ou propagandas intrusivas (gera rejeição do usuário).`,mnemonic:`Modal vem de "Modo": a aplicação entra em um modo exclusivo que requer sua atenção total.`,htmlSnippet:`<div class="ui-dialog-backdrop is-open">
  <div class="ui-dialog-window" role="dialog" aria-modal="true">
    <h3>Confirmar Exclusão</h3>
    <p>Esta ação não pode ser desfeita.</p>
    <button class="ui-btn ui-btn-danger">Excluir</button>
  </div>
</div>`,cssSnippet:`.ui-dialog-backdrop {
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.7);
}`,renderInteractive:e=>{e.innerHTML=`
        <div>
          <button class="ui-btn ui-btn-primary" id="open-modal-demo">
            Testar Modal de Confirmação
          </button>
          <div class="ui-dialog-backdrop" id="demo-modal-backdrop">
            <div class="ui-dialog-window">
              <h3 style="margin-bottom: 0.5rem;">Excluir Componente?</h3>
              <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
                Esta ação é apenas uma demonstração do controle Modal / Dialog.
              </p>
              <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
                <button class="ui-btn ui-btn-secondary" id="close-modal-cancel">Cancelar</button>
                <button class="ui-btn ui-btn-danger" id="close-modal-confirm">Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      `;let t=e.querySelector(`#open-modal-demo`),n=e.querySelector(`#demo-modal-backdrop`),r=e.querySelector(`#close-modal-cancel`),i=e.querySelector(`#close-modal-confirm`);t?.addEventListener(`click`,()=>n?.classList.add(`is-open`)),r?.addEventListener(`click`,()=>n?.classList.remove(`is-open`)),i?.addEventListener(`click`,()=>n?.classList.remove(`is-open`)),n?.addEventListener(`click`,e=>{e.target===n&&n.classList.remove(`is-open`)})}},{id:`toast`,name:`Toast / Snackbar`,ptName:`Notificação Efêmera Flutuante`,category:`feedback`,categoryLabel:`Feedback & Overlays`,concept:`Mensagem de feedback temporária e não bloqueante exibida em um dos cantos da tela por poucos segundos.`,purpose:`Confirmar ações rápidas bem-sucedidas (ex: "Link copiado!", "E-mail enviado", "Item salvo").`,goodPractice:`Programe auto-dismiss entre 3 e 5 segundos e ofereça botão de desfazer (Undo) se aplicável.`,commonPitfall:`Não use toasts para erros catastróficos que impeçam o usuário de prosseguir.`,mnemonic:`Toast é como a torradeira que ejeta a torrada: sobe, avisa que está pronto e desaparece.`,htmlSnippet:`<div class="ui-toast">
  <span>✓</span>
  <span>Alterações salvas com sucesso!</span>
</div>`,cssSnippet:`.ui-toast {
  padding: 0.75rem 1rem;
  border-left: 4px solid #10b981;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.5);
}`,renderInteractive:e=>{e.innerHTML=`
        <button class="ui-btn ui-btn-secondary" id="trigger-toast-demo">
          🔔 Disparar Toast de Exemplo
        </button>
      `,e.querySelector(`#trigger-toast-demo`)?.addEventListener(`click`,()=>{let e=document.querySelector(`.ui-toast-container`)||(()=>{let e=document.createElement(`div`);return e.className=`ui-toast-container`,document.body.appendChild(e),e})(),t=document.createElement(`div`);t.className=`ui-toast`,t.innerHTML=`
          <span style="color: var(--color-success)">✓</span>
          <span>Ação executada com sucesso!</span>
        `,e.appendChild(t),setTimeout(()=>{t.style.opacity=`0`,t.style.transform=`translateY(10px)`,setTimeout(()=>t.remove(),300)},3e3)})}},{id:`alert`,name:`Alert / Banner`,ptName:`Aviso Contextual Estático`,category:`feedback`,categoryLabel:`Feedback & Overlays`,concept:`Caixa de mensagem destacada integrada ao fluxo da página para avisos permanentes ou instruções essenciais.`,purpose:`Avisar sobre manutenções de sistema, dados incompletos ou advertências de segurança.`,goodPractice:`Use cores semânticas padronizadas: Azul (Info), Amarelo (Atenção), Verde (Sucesso), Vermelho (Erro).`,commonPitfall:`Encher a tela com múltiplos banners coloridos, gerando cegueira a avisos no usuário.`,mnemonic:`Alert é a "Placa de Sinalização": fica fincada no lugar para avisar quem passar por ali.`,htmlSnippet:`<div class="ui-alert ui-alert-warning" role="alert">
  <span class="ui-alert-icon">⚠️</span>
  <div><strong>Atenção:</strong> Atualização programada às 22h.</div>
</div>`,cssSnippet:`.ui-alert-warning {
  background: rgba(245, 158, 11, 0.15);
  border-color: #f59e0b;
}`,renderInteractive:e=>{e.innerHTML=`
        <div class="ui-alert ui-alert-info" style="width: 100%;">
          <span class="ui-alert-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </span>
          <div>
            <strong>Dica de UI:</strong> O CSS moderno permite tematização completa com variáveis nativas.
          </div>
        </div>
      `}},{id:`accordion`,name:`Accordion`,ptName:`Acordeão Expansível / Sanfona`,category:`containers`,categoryLabel:`Containers & Estrutura`,concept:`Lista empilhada de itens onde cada cabeçalho pode ser clicado para expandir ou recolher seu painel de detalhes.`,purpose:`Perguntas Frequentes (FAQ), formulários com seções opcionais ou menus colapsáveis densos.`,goodPractice:`Gire um ícone chevron em 180° para indicar claramente a mudança de estado aberto/fechado.`,commonPitfall:`Não use acordeão se o usuário precisar comparar o conteúdo de todas as seções simultaneamente.`,mnemonic:`Pensa no instrumento sanfona/acordeão: você abre os foles para revelar o ar e fecha para compactar.`,htmlSnippet:`<div class="ui-accordion-item is-expanded">
  <button class="ui-accordion-header">
    <span>Como memorizar UI/UX?</span>
    <span class="ui-accordion-icon">▼</span>
  </button>
  <div class="ui-accordion-content">
    Associe a analogias do mundo real e pratique a construção direta.
  </div>
</div>`,cssSnippet:`.ui-accordion-item.is-expanded .ui-accordion-icon {
  transform: rotate(180deg);
}`,renderInteractive:e=>{e.innerHTML=`
        <div class="ui-accordion-item" id="demo-accordion-toggle" style="width: 100%;">
          <button class="ui-accordion-header" type="button">
            <span>O que torna um controle intuitivo?</span>
            <span class="ui-accordion-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </span>
          </button>
          <div class="ui-accordion-content">
            A previsibilidade: o usuário reconhece o <em>affordance</em> (sinalizador visual) e já deduz o comportamento antes de clicar.
          </div>
        </div>
      `;let t=e.querySelector(`#demo-accordion-toggle`);(t?.querySelector(`.ui-accordion-header`))?.addEventListener(`click`,()=>{t?.classList.toggle(`is-expanded`)})}},{id:`card`,name:`Card (Cartão)`,ptName:`Módulo de Superfície Contida`,category:`containers`,categoryLabel:`Containers & Estrutura`,concept:`Superfície com bordas e elevação que agrupa dados heterogêneos relacionados a uma única entidade.`,purpose:`Apresentar produtos, perfis de usuários, cards de dashboards ou itens de mídia com ações.`,goodPractice:`Mantenha hierarquia interna clara: Mídia/Ícone no topo, Título, Descrição e Ações na base.`,commonPitfall:`Sobrecarregar o card com links e botões concorrentes demais.`,mnemonic:`Card é como um "Cardápio individual": uma ficha fechada contendo tudo sobre aquele prato.`,htmlSnippet:`<article class="control-card" style="padding: 1rem;">
  <h4>Título do Card</h4>
  <p>Conteúdo condensado com ações.</p>
  <button class="ui-btn ui-btn-primary">Ver Mais</button>
</article>`,cssSnippet:`.control-card {
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-medium); border-radius: 8px; padding: 0.75rem 1rem; width: 100%;">
          <div style="font-weight: 700; font-size: 0.875rem;">Card de Produto</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); margin: 0.25rem 0 0.5rem;">
            Design System Nativo • TypeScript
          </div>
          <button class="ui-btn ui-btn-primary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">Explorar</button>
        </div>
      `}},{id:`avatar`,name:`Avatar & Avatar Group`,ptName:`Representação de Perfil & Grupo de Usuários`,category:`containers`,categoryLabel:`Containers & Estrutura`,concept:`Elemento circular ou arredondado com imagem ou iniciais representando um usuário ou entidade.`,purpose:`Exibir autores de artigos, participantes de uma reunião ou membros de equipe em grupo sobreposto.`,goodPractice:`Sempre inclua fallback elegante (iniciais ou SVG neutro) se a imagem falhar ao carregar.`,commonPitfall:'Deixar avatares sem texto alternativo `alt="Nome do Usuário"`.',mnemonic:`Avatar é o seu "Crachá com Foto": identifica instantaneamente quem é a pessoa.`,htmlSnippet:`<div class="ui-avatar-group">
  <div class="ui-avatar">JS</div>
  <div class="ui-avatar">TS</div>
  <div class="ui-avatar">+3</div>
</div>`,cssSnippet:`.ui-avatar {
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  border: 2px solid var(--bg-surface);
  margin-left: -8px;
}`,renderInteractive:e=>{e.innerHTML=`
        <div class="ui-avatar-group">
          <div class="ui-avatar" style="background: #4f46e5; color: white;">FE</div>
          <div class="ui-avatar" style="background: #059669; color: white;">UI</div>
          <div class="ui-avatar" style="background: #d97706; color: white;">UX</div>
          <div class="ui-avatar" style="background: var(--bg-surface-hover); font-size: 0.75rem;">+4</div>
        </div>
      `}},{id:`skeleton`,name:`Skeleton Loader (Ghost Screen)`,ptName:`Esqueleto de Carregamento Aramado`,category:`loading`,categoryLabel:`Carregamento & Status`,concept:`Representação em tons de cinza com animação pulsante que simula a silhueta do layout antes do dado carregar.`,purpose:`Reduzir a percepção de tempo de espera (perceived performance) durante requisições assíncronas.`,goodPractice:`Mantenha o esqueleto com dimensões idênticas às do conteúdo final para evitar Content Layout Shift (CLS).`,commonPitfall:`Não use spinner circular gigante no centro da tela se um skeleton puder manter a estrutura visível.`,mnemonic:`Skeleton é o "Esboço a Lápis" antes da pintura final a tinta.`,htmlSnippet:`<div class="ui-skeleton-box">
  <div class="ui-skeleton-line" style="width: 40%;"></div>
  <div class="ui-skeleton-line" style="width: 85%;"></div>
  <div class="ui-skeleton-line" style="width: 65%;"></div>
</div>`,cssSnippet:`@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`,renderInteractive:e=>{e.innerHTML=`
        <div class="ui-skeleton-box" style="width: 100%;">
          <div class="ui-skeleton-line" style="width: 45%; height: 14px;"></div>
          <div class="ui-skeleton-line" style="width: 90%;"></div>
          <div class="ui-skeleton-line" style="width: 70%;"></div>
        </div>
      `}},{id:`spinner-progress`,name:`Spinner & Progress Bar`,ptName:`Girador & Barra Linear de Progresso`,category:`loading`,categoryLabel:`Carregamento & Status`,concept:`Indicadores gráficos de operações em andamento: Spinner para tempo indeterminado; Barra para percentual medível.`,purpose:`Feedbacks de envio de formulário, downloads de arquivos ou inicialização assíncrona de recursos.`,goodPractice:'Sempre forneça atributo `role="progressbar"` ou `aria-busy="true"` para leitores de tela.',commonPitfall:`Deixar o usuário sem nenhum feedback visual por mais de 300ms dá a impressão de travamento.`,mnemonic:`Spinner = "Carregando... (sem previsão)". Progress Bar = "Você está em 75%".`,htmlSnippet:`<div class="ui-spinner" role="status"></div>
<div class="ui-progress-track">
  <div class="ui-progress-bar" style="width: 65%;"></div>
</div>`,cssSnippet:`@keyframes spin {
  to { transform: rotate(360deg); }
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="display: flex; align-items: center; gap: 1rem; width: 100%;">
          <div class="ui-spinner"></div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 4px;">
              <span>Progresso de Envio</span>
              <span id="demo-prog-val">68%</span>
            </div>
            <div class="ui-progress-track">
              <div class="ui-progress-bar" id="demo-prog-bar" style="width: 68%;"></div>
            </div>
          </div>
        </div>
      `;let t=e.querySelector(`#demo-prog-bar`),n=e.querySelector(`#demo-prog-val`),r=68;setInterval(()=>{r=r>=100?20:r+4,t&&(t.style.width=`${r}%`),n&&(n.textContent=`${r}%`)},700)}},{id:`popover`,name:`Popover`,ptName:`Balão Flutuante com Ações Interativas`,category:`feedback`,categoryLabel:`Feedback & Overlays`,concept:`Painel flutuante posicionado em relação a um gatilho, permitindo botões, formulários e interações ricas.`,purpose:`Filtros avançados rápidos, seletores de cor, caixas de compartilhamento ou confirmações com inputs.`,goodPractice:`Feche automaticamente se o usuário clicar fora (click outside / dismiss on blur).`,commonPitfall:`Não use Tooltip quando precisar de botões ou links dentro (use sempre Popover para interatividade).`,mnemonic:`Tooltip é só para ler; Popover é para agir.`,htmlSnippet:`<div class="ui-popover-wrapper">
  <button class="ui-btn ui-btn-secondary">Opções ▾</button>
  <div class="ui-popover-card is-open">
    <p>Conteúdo interativo</p>
    <button class="ui-btn ui-btn-primary">Aplicar</button>
  </div>
</div>`,cssSnippet:`.ui-popover-card {
  position: absolute;
  top: calc(100% + 8px);
  width: 220px;
  background: #111827;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.5);
}`,renderInteractive:e=>{e.innerHTML=`
        <div class="ui-popover-wrapper">
          <button class="ui-btn ui-btn-secondary" id="popover-btn-demo">
            Configurar Filtro ▾
          </button>
          <div class="ui-popover-card" id="popover-card-demo">
            <div style="font-weight: 600; font-size: 0.8125rem; margin-bottom: 0.5rem;">Visualização</div>
            <label class="ui-checkbox-label" style="font-size: 0.75rem; margin-bottom: 0.5rem;">
              <input type="checkbox" class="ui-checkbox" checked> Exibir miniaturas
            </label>
            <button class="ui-btn ui-btn-primary" style="width: 100%; font-size: 0.75rem; padding: 0.3rem;" id="popover-apply-demo">
              Aplicar Filtro
            </button>
          </div>
        </div>
      `;let t=e.querySelector(`#popover-btn-demo`),n=e.querySelector(`#popover-card-demo`),r=e.querySelector(`#popover-apply-demo`);t?.addEventListener(`click`,e=>{e.stopPropagation(),n?.classList.toggle(`is-open`)}),r?.addEventListener(`click`,()=>n?.classList.remove(`is-open`)),document.addEventListener(`click`,t=>{e.contains(t.target)||n?.classList.remove(`is-open`)})}},{id:`drawer`,name:`Drawer / Sheet (Off-Canvas)`,ptName:`Painel Deslizante Lateral ou Inferior`,category:`containers`,categoryLabel:`Containers & Estrutura`,concept:`Superfície que desliza de uma das bordas da tela (lateral ou base) para exibir navegação ou detalhes contextuais.`,purpose:`Menus de navegação responsiva em dispositivos móveis, carrinhos de compras ou painéis de filtros extensos.`,goodPractice:`Permita gesto de arrasto (swipe) ou clique fora para dispensar suavemente.`,commonPitfall:`Não use Drawer se um dropdown ou modal simples resolver sem cobrir metade do layout.`,mnemonic:`Drawer é a "Gaveta Lateral": você puxa da borda para pegar algo e empurra de volta.`,htmlSnippet:`<aside class="ui-drawer-panel is-open">
  <h4>Menu de Filtros</h4>
  <button class="ui-btn ui-btn-ghost">Fechar &times;</button>
</aside>`,cssSnippet:`.ui-drawer-panel {
  position: fixed;
  right: 0;
  transform: translateX(100%);
  transition: transform 250ms ease;
}
.ui-drawer-panel.is-open {
  transform: translateX(0);
}`,renderInteractive:e=>{e.innerHTML=`
        <div class="ui-drawer-container">
          <button class="ui-btn ui-btn-secondary" id="drawer-open-demo" style="font-size: 0.8125rem;">
            Abrir Gaveta Lateral ➔
          </button>
          <div class="ui-drawer-panel" id="drawer-panel-demo">
            <div>
              <div style="font-weight: 700; font-size: 0.75rem; margin-bottom: 4px;">Painel Drawer</div>
              <div style="font-size: 0.7rem; color: var(--text-secondary);">Gaveta contextual deslizante</div>
            </div>
            <button class="ui-btn ui-btn-ghost" id="drawer-close-demo" style="font-size: 0.75rem; padding: 0.25rem;">
              ✕ Fechar
            </button>
          </div>
        </div>
      `;let t=e.querySelector(`#drawer-open-demo`),n=e.querySelector(`#drawer-panel-demo`),r=e.querySelector(`#drawer-close-demo`);t?.addEventListener(`click`,()=>n?.classList.add(`is-open`)),r?.addEventListener(`click`,()=>n?.classList.remove(`is-open`))}},{id:`carousel`,name:`Carousel / Slider de Conteúdo`,ptName:`Carrossel Horizontal Rolável`,category:`containers`,categoryLabel:`Containers & Estrutura`,concept:`Contêiner que apresenta múltiplos blocos de conteúdo organizados em fila horizontal com suporte a rolagem ou paginação.`,purpose:`Destaques de banners, galerias de fotos ou produtos recomendados em espaço vertical limitado.`,goodPractice:"Use CSS nativo com `scroll-snap-type: x mandatory` para uma rolagem suave e sem dependências pesadas.",commonPitfall:`Evite autoplay acelerado com textos longos (prejudica a acessibilidade e frustra a leitura).`,mnemonic:`Carousel é o "Carrossel do Parque": os itens giram em roda e voltam para a frente.`,htmlSnippet:`<div class="ui-carousel">
  <div class="ui-carousel-slide">Slide 1</div>
  <div class="ui-carousel-slide">Slide 2</div>
  <div class="ui-carousel-slide">Slide 3</div>
</div>`,cssSnippet:`.ui-carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}
.ui-carousel-slide {
  scroll-snap-align: start;
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="width: 100%;">
          <div class="ui-carousel" id="demo-carousel-box">
            <div class="ui-carousel-slide" style="border-top: 3px solid var(--brand-primary);">
              <strong>HTML5</strong><br><span style="color: var(--text-muted);">Semântica</span>
            </div>
            <div class="ui-carousel-slide" style="border-top: 3px solid #10b981;">
              <strong>CSS3</strong><br><span style="color: var(--text-muted);">Flex & Grid</span>
            </div>
            <div class="ui-carousel-slide" style="border-top: 3px solid #3b82f6;">
              <strong>TypeScript</strong><br><span style="color: var(--text-muted);">Tipagem</span>
            </div>
            <div class="ui-carousel-slide" style="border-top: 3px solid #f59e0b;">
              <strong>SVG</strong><br><span style="color: var(--text-muted);">Vetores</span>
            </div>
          </div>
          <div style="font-size: 0.7rem; color: var(--text-muted); text-align: center; margin-top: 4px;">
            ↔ Arraste horizontalmente para rolar os slides
          </div>
        </div>
      `}},{id:`divider`,name:`Divider / Separator`,ptName:`Separador / Divisor de Conteúdo`,category:`containers`,categoryLabel:`Containers & Estrutura`,concept:`Linha fina horizontal ou vertical usada para separar grupos conceituais de conteúdo ou opções.`,purpose:`Delimitar blocos de formulário, itens em listas ou opções alternativas (ex: "OU").`,goodPractice:'Utilize a tag semântica `<hr>` ou elementos com `role="separator"`.',commonPitfall:`Usar divisores em excesso quando o espaçamento em branco (whitespace) bastaria.`,mnemonic:`Divider é a "Cerca": demarca onde um lote termina e o próximo começa.`,htmlSnippet:`<div class="ui-divider">
  <span class="ui-divider-text">OU</span>
</div>`,cssSnippet:`.ui-divider {
  display: flex;
  align-items: center;
}
.ui-divider::before, .ui-divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #334155;
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="width: 100%; display: flex; flex-direction: column; gap: 0.5rem;">
          <div style="font-size: 0.75rem; text-align: center; color: var(--text-secondary);">Entrar com e-mail</div>
          <div class="ui-divider">
            <span class="ui-divider-text">OU</span>
          </div>
          <div style="font-size: 0.75rem; text-align: center; color: var(--brand-primary); font-weight: 600;">Autenticação Social</div>
        </div>
      `}}],n=class{activeCategory=`all`;searchQuery=``;isLightMode=!1;categoryContainer=document.getElementById(`category-pills`);controlsGrid=document.getElementById(`controls-grid`);searchInput=document.getElementById(`search-input`);resultsCount=document.getElementById(`results-count`);themeToggleBtn=document.getElementById(`theme-toggle-btn`);backToTopBtn=document.getElementById(`back-to-top`);constructor(){this.initTheme(),this.setupEventListeners(),this.renderCategoryPills(),this.renderCards()}initTheme(){localStorage.getItem(`guia-theme`)===`light`&&(this.isLightMode=!0,document.documentElement.setAttribute(`data-theme`,`light`)),this.updateThemeButton()}toggleTheme(){this.isLightMode=!this.isLightMode;let e=this.isLightMode?`light`:`dark`;document.documentElement.setAttribute(`data-theme`,e),localStorage.setItem(`guia-theme`,e),this.updateThemeButton()}updateThemeButton(){this.themeToggleBtn&&(this.themeToggleBtn.innerHTML=this.isLightMode?`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,this.themeToggleBtn.title=this.isLightMode?`Alternar para Modo Escuro`:`Alternar para Modo Claro`)}setupEventListeners(){this.themeToggleBtn?.addEventListener(`click`,()=>this.toggleTheme()),this.searchInput?.addEventListener(`input`,e=>{this.searchQuery=e.target.value.trim().toLowerCase(),this.renderCards()}),window.addEventListener(`scroll`,()=>{window.scrollY>300?this.backToTopBtn?.classList.add(`is-visible`):this.backToTopBtn?.classList.remove(`is-visible`)}),this.backToTopBtn?.addEventListener(`click`,()=>{window.scrollTo({top:0,behavior:`smooth`})})}renderCategoryPills(){this.categoryContainer&&(this.categoryContainer.innerHTML=``,e.forEach(e=>{let n=e.id===`all`?t.length:t.filter(t=>t.category===e.id).length,r=document.createElement(`button`);r.type=`button`,r.className=`category-pill ${this.activeCategory===e.id?`is-active`:``}`,r.innerHTML=`
        ${e.iconSvg}
        <span>${e.label}</span>
        <span class="category-pill-count">${n}</span>
      `,r.addEventListener(`click`,()=>{this.activeCategory=e.id,this.renderCategoryPills(),this.renderCards()}),this.categoryContainer.appendChild(r)}))}getFilteredControls(){return t.filter(e=>{let t=this.activeCategory===`all`||e.category===this.activeCategory,n=!this.searchQuery||e.name.toLowerCase().includes(this.searchQuery)||e.ptName.toLowerCase().includes(this.searchQuery)||e.concept.toLowerCase().includes(this.searchQuery)||e.mnemonic.toLowerCase().includes(this.searchQuery);return t&&n})}renderCards(){if(!this.controlsGrid)return;this.controlsGrid.innerHTML=``;let e=this.getFilteredControls();if(this.resultsCount&&(this.resultsCount.textContent=`Mostrando ${e.length} de ${t.length} controles`),e.length===0){this.controlsGrid.innerHTML=`
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <p style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">Nenhum componente encontrado</p>
          <p style="font-size: 0.875rem;">Tente pesquisar por outros termos como "chip", "badge", "scroll", "modal"...</p>
        </div>
      `;return}e.forEach(e=>{let t=document.createElement(`article`);t.className=`control-card`,t.id=`card-${e.id}`,t.innerHTML=`
        <div class="card-header">
          <div class="card-title-group">
            <h3 class="card-title">${e.name}</h3>
            <span class="card-pt-name">${e.ptName}</span>
          </div>
          <span class="card-cat-badge">${e.categoryLabel}</span>
        </div>

        <div class="card-body">
          <div class="concept-box">
            <div class="concept-text">${e.concept}</div>
            <div class="purpose-text"><strong>Onde usar:</strong> ${e.purpose}</div>
          </div>

          <div class="interactive-stage" id="stage-${e.id}"></div>

          <div class="memorization-box">
            <div class="memo-item">
              <span class="memo-tag-good">✓ REGRA:</span>
              <span>${e.goodPractice}</span>
            </div>
            <div class="memo-item">
              <span class="memo-tag-bad">✕ EVITE:</span>
              <span>${e.commonPitfall}</span>
            </div>
            <div class="memo-item">
              <span class="memo-tag-tip">💡 FIXAÇÃO:</span>
              <span>${e.mnemonic}</span>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <button type="button" class="btn-code-toggle" id="toggle-code-${e.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            <span>Ver Snippet</span>
          </button>
          <button type="button" class="btn-copy-code" id="copy-code-${e.id}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copiar</span>
          </button>
        </div>

        <div class="code-drawer" id="drawer-${e.id}">
          <pre><code>${this.escapeHtml(e.htmlSnippet)}\n\n/* CSS */\n${this.escapeHtml(e.cssSnippet)}</code></pre>
        </div>
      `,this.controlsGrid.appendChild(t);let n=t.querySelector(`#stage-${e.id}`);n&&e.renderInteractive(n);let r=t.querySelector(`#toggle-code-${e.id}`),i=t.querySelector(`#drawer-${e.id}`);r?.addEventListener(`click`,()=>{i?.classList.toggle(`is-open`);let e=r.querySelector(`span`);e&&(e.textContent=i?.classList.contains(`is-open`)?`Ocultar Snippet`:`Ver Snippet`)});let a=t.querySelector(`#copy-code-${e.id}`);a?.addEventListener(`click`,async()=>{let t=`${e.htmlSnippet}\n\n/* CSS */\n${e.cssSnippet}`;try{await navigator.clipboard.writeText(t);let e=a.querySelector(`span`);e&&(e.textContent=`Copiado! ✓`,setTimeout(()=>e.textContent=`Copiar`,1500))}catch(e){console.warn(`Erro ao copiar`,e)}})})}escapeHtml(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`)}};document.addEventListener(`DOMContentLoaded`,()=>{new n});