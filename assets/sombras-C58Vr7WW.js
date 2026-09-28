import"./main-CvY94YZ6.js";var e=[{id:`all`,label:`Todas as Técnicas`,iconSvg:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/></svg>`},{id:`fundamentals`,label:`Fundamentos & Parâmetros`,iconSvg:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`},{id:`realism`,label:`Profundidade & Camadas`,iconSvg:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`},{id:`lighting`,label:`Efeitos de Luz & Estilos`,iconSvg:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`}],t=[{id:`clean-card`,name:`Card Clean (Sutil)`,description:`Sombra suave de contato para cards em repouso.`,cssValue:`0 4px 12px rgba(0, 0, 0, 0.15)`,isInset:!1,x:0,y:4,blur:12,spread:0,color:`#000000`,opacity:15},{id:`hover-lift`,name:`Hover Elevado (Flutuação)`,description:`Sensação de altura no eixo Z para botões e cards ativos.`,cssValue:`0 16px 32px -4px rgba(0, 0, 0, 0.35)`,isInset:!1,x:0,y:16,blur:32,spread:-4,color:`#000000`,opacity:35},{id:`apple-rim`,name:`Borda Chanfrada (Rim Light)`,description:`Borda iluminada de luz especular superior no estilo Apple/Linear.`,cssValue:`inset 0 1px 0 0 rgba(255, 255, 255, 0.2), 0 8px 24px rgba(0, 0, 0, 0.4)`,isInset:!1,x:0,y:8,blur:24,spread:0,color:`#000000`,opacity:40},{id:`inset-pressed`,name:`Rebaixo Côncavo (Inset)`,description:`Sensação de botão pressionado ou campo afundado na superfície.`,cssValue:`inset 0 4px 8px rgba(0, 0, 0, 0.45)`,isInset:!0,x:0,y:4,blur:8,spread:0,color:`#000000`,opacity:45},{id:`brand-glow`,name:`Glow Bioluminescente`,description:`Luz emitida a partir da cor de marca para foco e status.`,cssValue:`0 0 25px rgba(99, 102, 241, 0.65)`,isInset:!1,x:0,y:0,blur:25,spread:4,color:`#6366f1`,opacity:65},{id:`neumorphic`,name:`Soft UI Neumórfico`,description:`Esculpido com fonte de luz dupla: clara no topo-esq e escura na base.`,cssValue:`-6px -6px 14px rgba(255, 255, 255, 0.07), 6px 6px 14px rgba(0, 0, 0, 0.5)`,isInset:!1,x:6,y:6,blur:14,spread:0,color:`#000000`,opacity:50}],n=[{id:`five-values`,name:`Anatomia dos 5 Valores do Box-Shadow`,ptName:`X-Offset, Y-Offset, Blur, Spread e Cor`,category:`fundamentals`,categoryLabel:`Fundamentos`,concept:`A propriedade box-shadow projeta sombras externas ou internas recebendo: [horizontal] [vertical] [desfoque] [expansão] [cor].`,purpose:`Criar desde sombras pontuais até difusões amplas com total controle de proporção e intensidade.`,goodPractice:`Use sempre cores no formato RGBA, HSLA ou com opacidade para evitar manchas duras e permitir que o fundo transpareça.`,commonPitfall:`Usar nomes de cores sólidas como #000 ou black puro com blur baixo, gerando um bloco escuro que parece um erro de renderização.`,mnemonic:`Pense na regra X-Y-B-S-C: "Xuxa e Yuri Buscam Sombras Claras" (Horizontal, Vertical, Blur, Spread, Cor).`,htmlSnippet:`<div class="shadow-box-demo">
  <p>Objeto Iluminado</p>
</div>`,cssSnippet:`/* box-shadow: [x-offset] [y-offset] [blur-radius] [spread-radius] [color]; */
.shadow-box-demo {
  background: var(--bg-surface-elevated);
  border-radius: 12px;
  /* Projeta 8px para a direita, 12px para baixo, 20px de desfoque e 2px de expansão */
  box-shadow: 8px 12px 20px 2px rgba(0, 0, 0, 0.35);
}`,renderInteractive:e=>{e.innerHTML=`
        <div class="stage-shadow-interactive" style="display: flex; flex-direction: column; align-items: center; gap: 1rem; width: 100%;">
          <div class="interactive-sample-box" id="sample-five-values" style="
            width: 140px;
            height: 90px;
            background: var(--bg-surface-elevated);
            border: 1px solid var(--border-medium);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8125rem;
            font-weight: 600;
            color: var(--text-primary);
            box-shadow: 8px 12px 20px 0 rgba(0, 0, 0, 0.4);
            transition: all 0.2s ease;
          ">
            5 Valores
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center; font-size: 0.75rem;">
            <button class="stage-btn-pill" data-mode="sharp">Nítida (Blur 0)</button>
            <button class="stage-btn-pill is-active" data-mode="soft">Suave (Blur 20)</button>
            <button class="stage-btn-pill" data-mode="spread">Expandida (Spread 8)</button>
          </div>
        </div>
      `;let t=e.querySelector(`#sample-five-values`),n=e.querySelectorAll(`.stage-btn-pill`);n.forEach(e=>{e.addEventListener(`click`,e=>{n.forEach(e=>e.classList.remove(`is-active`));let r=e.currentTarget;r.classList.add(`is-active`);let i=r.dataset.mode;i===`sharp`?t.style.boxShadow=`8px 8px 0px 0px rgba(0, 0, 0, 0.4)`:i===`spread`?t.style.boxShadow=`4px 8px 15px 8px rgba(0, 0, 0, 0.3)`:t.style.boxShadow=`8px 12px 20px 0px rgba(0, 0, 0, 0.4)`})})}},{id:`inset-shadows`,name:`Sombras Internas (Palavra-chave Inset)`,ptName:`Simulação de Rebaixo Côncavo e Botão Pressionado`,category:`fundamentals`,categoryLabel:`Fundamentos`,concept:`Ao prefixar a regra com "inset", a sombra é desenhada para o lado de dentro da borda, simulando corte em relevo ou afundamento na tela.`,purpose:`Inputs de texto digitáveis, botões em estado ativo/clicado, cavidades de sliders, switches e contêineres de scroll.`,goodPractice:`Combine uma leve sombra inset no topo de um botão quando ele for clicado (:active) para transmitir retorno tátil imediato.`,commonPitfall:`Aplicar inset muito forte em caixas com texto escuro, prejudicando o contraste e a legibilidade nas bordas interiores.`,mnemonic:`"IN-set joga a sombra para DENTRO (INside)": transforma elevações salientes em poços escavados.`,htmlSnippet:`<button class="btn-tactile">Clique e segure</button>
<div class="input-well">Campo Afundado</div>`,cssSnippet:`.btn-tactile {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-medium);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.15s ease;
}

/* Quando pressionado, inverte para inset */
.btn-tactile:active {
  transform: translateY(2px);
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.4);
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; width: 100%;">
          <button class="stage-tactile-btn" id="interactive-inset-btn" style="
            padding: 0.8rem 1.6rem;
            background: var(--bg-surface-elevated);
            color: var(--text-primary);
            border: 1px solid var(--border-medium);
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.875rem;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
            transition: all 0.12s ease;
            user-select: none;
          ">
            Pressione Aqui (Simular Clique)
          </button>
          <span style="font-size: 0.75rem; color: var(--text-muted);" id="inset-state-label">
            Estado atual: <strong>Elevado (Outset)</strong>
          </span>
        </div>
      `;let t=e.querySelector(`#interactive-inset-btn`),n=e.querySelector(`#inset-state-label`),r=!1,i=()=>{r?(t.style.boxShadow=`inset 0 4px 8px rgba(0, 0, 0, 0.55)`,t.style.transform=`translateY(2px)`,t.style.borderColor=`var(--brand-primary)`,n.innerHTML=`Estado atual: <strong style="color: var(--brand-primary);">Pressionado (Inset)</strong>`):(t.style.boxShadow=`0 4px 8px rgba(0, 0, 0, 0.25)`,t.style.transform=`translateY(0)`,t.style.borderColor=`var(--border-medium)`,n.innerHTML=`Estado atual: <strong>Elevado (Outset)</strong>`)};t.addEventListener(`mousedown`,()=>{r=!0,i()}),window.addEventListener(`mouseup`,()=>{r&&(r=!1,i())})}},{id:`multi-layer`,name:`Sombras em Múltiplas Camadas`,ptName:`Oclusão de Contato + Penumbra Ambiente`,category:`realism`,categoryLabel:`Profundidade & Camadas`,concept:`Na física óptica, objetos projetam múltiplas sombras simultâneas: uma oclusão densa rente à base e uma penumbra ampla e suave iluminada pelo céu.`,purpose:`Eliminar sombras toscas e conferir estética de alta gama (estilo Stripe, Apple e Vercel) a cards e janelas modais.`,goodPractice:`Declare de 2 a 4 camadas separadas por vírgula no box-shadow, dobrando o desfoque e reduzindo a opacidade a cada nível.`,commonPitfall:`Tentar simular profundidade alta aumentando apenas o blur de uma única sombra, criando uma auréola embaçada e artificial.`,mnemonic:`"Camada de Contato abraça a base; Camada de Ambiente pinta o ar": 2 sombras sempre batem 1.`,htmlSnippet:`<div class="card-multi-layer">
  <h4>Card com Sombras Compostas</h4>
  <p>Transição natural e orgânica de luz.</p>
</div>`,cssSnippet:`/* Camada 1: Oclusão rente e nítida */
/* Camada 2: Penumbra intermediária */
/* Camada 3: Difusão suave da luz ambiente */
.card-multi-layer {
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.08),
    0 4px 8px rgba(0, 0, 0, 0.12),
    0 16px 32px rgba(0, 0, 0, 0.16);
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="display: flex; gap: 1rem; width: 100%; justify-content: center; flex-wrap: wrap;">
          <div style="
            flex: 1;
            min-width: 130px;
            max-width: 150px;
            padding: 1rem;
            background: var(--bg-surface-elevated);
            border-radius: 10px;
            text-align: center;
            font-size: 0.75rem;
            box-shadow: 0 16px 20px rgba(0, 0, 0, 0.45);
          ">
            <strong style="display: block; margin-bottom: 0.25rem; color: #ef4444;">1 Camada</strong>
            <span style="color: var(--text-muted);">Borda opaca artificial</span>
          </div>

          <div style="
            flex: 1;
            min-width: 130px;
            max-width: 150px;
            padding: 1rem;
            background: var(--bg-surface-elevated);
            border-radius: 10px;
            text-align: center;
            font-size: 0.75rem;
            box-shadow:
              0 1px 2px rgba(0, 0, 0, 0.2),
              0 4px 10px rgba(0, 0, 0, 0.25),
              0 18px 36px rgba(0, 0, 0, 0.35);
          ">
            <strong style="display: block; margin-bottom: 0.25rem; color: #10b981;">3 Camadas</strong>
            <span style="color: var(--text-muted);">Difusão hiper-realista</span>
          </div>
        </div>
      `}},{id:`elevation-lift`,name:`Elevação & Efeito Hover Lift`,ptName:`Simulação de Eixo Z com Luz Fixa Superior`,category:`realism`,categoryLabel:`Profundidade & Camadas`,concept:`Ao combinar transform: translateY(-Npx) com o aumento do desfoque (blur) e deslocamento vertical (Y), cria-se a ilusão óptica de aproximação do usuário.`,purpose:`Sinalizar interatividade tátil em cards clicáveis, botões primários e itens de listagem.`,goodPractice:`Utilize transições com cubic-bezier suave (ex: cubic-bezier(0.2, 0.8, 0.2, 1)) para que a subida e descida pareçam ter massa física.`,commonPitfall:`Subir o card sem aumentar a sombra correspondente, quebrando a consistência física da fonte de luz.`,mnemonic:`"Mais perto dos olhos = Sombra mais distante e mais difusa na mesa".`,htmlSnippet:`<div class="card-hover-lift">
  <span class="badge">Interativo</span>
  <h3>Passe o mouse aqui</h3>
</div>`,cssSnippet:`.card-hover-lift {
  transform: translateY(0);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1),
              box-shadow 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.card-hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 30px -6px rgba(0, 0, 0, 0.45);
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%;">
          <div class="stage-hover-card" style="
            width: 180px;
            padding: 1.25rem;
            background: var(--bg-surface-elevated);
            border: 1px solid var(--border-medium);
            border-radius: 12px;
            text-align: center;
            cursor: pointer;
            transform: translateY(0);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
            transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          ">
            <div style="font-size: 1.5rem; margin-bottom: 0.25rem;">🚀</div>
            <div style="font-weight: 700; font-size: 0.875rem; color: var(--text-primary);">Passe o Mouse</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">Efeito Flutuação Z</div>
          </div>
        </div>
      `;let t=e.querySelector(`.stage-hover-card`);t.addEventListener(`mouseenter`,()=>{t.style.transform=`translateY(-10px)`,t.style.borderColor=`var(--brand-primary)`,t.style.boxShadow=`0 24px 36px -8px rgba(0, 0, 0, 0.5), 0 8px 16px -4px rgba(99, 102, 241, 0.2)`}),t.addEventListener(`mouseleave`,()=>{t.style.transform=`translateY(0)`,t.style.borderColor=`var(--border-medium)`,t.style.boxShadow=`0 4px 6px -1px rgba(0, 0, 0, 0.2)`})}},{id:`global-light`,name:`Regra da Fonte de Luz Global`,ptName:`Consistência de Iluminação (Convenção dos 135°)`,category:`realism`,categoryLabel:`Profundidade & Camadas`,concept:`Todas as sombras de uma interface devem compartilhar a mesma fonte imaginária de luz (geralmente vindo do topo ou do topo-esquerdo a ~135°).`,purpose:`Manter a coerência espacial do cérebro humano, evitando a sensação de estranhamento cognitivo ou náusea visual.`,goodPractice:`Mantenha valores de Y sempre positivos (luz de cima) e valores de X com o mesmo sinal em todos os elementos da página.`,commonPitfall:`Fazer um botão com sombra para a direita e o card vizinho com sombra para a esquerda, fingindo haver dois sóis opostos no layout.`,mnemonic:`"O Sol da interface nunca se divide": a luz vem sempre de cima (+Y para baixo).`,htmlSnippet:`<div class="scene">
  <div class="light-source">☀️ Fonte de Luz</div>
  <div class="element e1">Item A (+X, +Y)</div>
  <div class="element e2">Item B (+X, +Y)</div>
</div>`,cssSnippet:`/* Sistema de design consistente: luz no topo-esquerdo */
:root {
  --shadow-standard: 3px 6px 14px rgba(0, 0, 0, 0.25);
}

.item-a, .item-b, .item-c {
  /* Todos recebem a mesma projeção angular */
  box-shadow: var(--shadow-standard);
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem; width: 100%;">
          <div style="font-size: 0.75rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.4rem;">
            <span>☀️ Luz Global em</span>
            <span id="light-angle-label" style="font-weight: 700; color: var(--color-warning);">135° (Topo-Esquerdo)</span>
          </div>
          <div style="display: flex; gap: 1rem; justify-content: center; width: 100%;">
            <div class="consistent-box" style="
              width: 80px;
              height: 60px;
              background: var(--bg-surface-elevated);
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 0.75rem;
              font-weight: 600;
              box-shadow: 6px 8px 14px rgba(0, 0, 0, 0.35);
              transition: box-shadow 0.3s ease;
            ">Card A</div>
            <div class="consistent-box" style="
              width: 80px;
              height: 60px;
              background: var(--bg-surface-elevated);
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 0.75rem;
              font-weight: 600;
              box-shadow: 6px 8px 14px rgba(0, 0, 0, 0.35);
              transition: box-shadow 0.3s ease;
            ">Card B</div>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="stage-btn-pill is-active" id="btn-light-tl">Topo-Esq</button>
            <button class="stage-btn-pill" id="btn-light-top">Direto Acima</button>
            <button class="stage-btn-pill" id="btn-light-tr">Topo-Dir</button>
          </div>
        </div>
      `;let t=e.querySelectorAll(`.consistent-box`),n=e.querySelector(`#btn-light-tl`),r=e.querySelector(`#btn-light-top`),i=e.querySelector(`#btn-light-tr`),a=e.querySelector(`#light-angle-label`),o=(e,o,s,c)=>{[n,r,i].forEach(e=>e.classList.remove(`is-active`)),c.classList.add(`is-active`),a.textContent=s,t.forEach(t=>{t.style.boxShadow=`${e}px ${o}px 14px rgba(0, 0, 0, 0.35)`})};n.addEventListener(`click`,()=>o(6,8,`Topo-Esquerdo (Natural)`,n)),r.addEventListener(`click`,()=>o(0,10,`Direto de Cima (Zenital)`,r)),i.addEventListener(`click`,()=>o(-6,8,`Topo-Direito`,i))}},{id:`rim-light`,name:`Borda Iluminada & Rim Light`,ptName:`Reflexo Especular Superior (Inset Highlight)`,category:`lighting`,categoryLabel:`Efeitos de Luz & Estilos`,concept:`Ao aplicar uma sombra interna de 1 pixel no topo da caixa com tom branco semitransparente, simula-se a quina física do vidro ou metal que reflete luz.`,purpose:`Conferir acabamento "ultra-premium", nitidez geométrica em temas escuros e profundidade tátil sem usar bordas grossas.`,goodPractice:`Use box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.15) combinado com sombra externa regular.`,commonPitfall:`Usar branco com opacidade muito alta (> 0.4), transformando o reflexo sutil em uma linha branca grosseira.`,mnemonic:`"Rim Light é o colar brilhante do cartão escuro": 1px que separa o amador do profissional.`,htmlSnippet:`<div class="apple-style-card">
  <div class="card-icon">⚡</div>
  <h3>Linear / Apple Specular Finish</h3>
</div>`,cssSnippet:`.apple-style-card {
  background: #181b24;
  border-radius: 12px;
  /* Destaque especular no topo + sombra suave embaixo */
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.18),
    0 12px 24px -4px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="display: flex; gap: 1rem; width: 100%; justify-content: center; flex-wrap: wrap;">
          <div style="
            flex: 1;
            min-width: 130px;
            max-width: 150px;
            padding: 1.25rem 1rem;
            background: #141a29;
            border-radius: 10px;
            text-align: center;
            font-size: 0.75rem;
            border: 1px solid #243048;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
          ">
            <span style="color: var(--text-muted);">Sem Rim Light</span>
            <div style="margin-top: 0.5rem; font-weight: 600; color: #94a3b8;">Borda Apagada</div>
          </div>

          <div style="
            flex: 1;
            min-width: 130px;
            max-width: 150px;
            padding: 1.25rem 1rem;
            background: #141a29;
            border-radius: 10px;
            text-align: center;
            font-size: 0.75rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow:
              inset 0 1px 0 0 rgba(255, 255, 255, 0.25),
              0 10px 20px rgba(0, 0, 0, 0.5);
          ">
            <span style="color: #6366f1; font-weight: 700;">Com Rim Light ✨</span>
            <div style="margin-top: 0.5rem; font-weight: 600; color: #ffffff;">Quina Refletora</div>
          </div>
        </div>
      `}},{id:`colored-shadows`,name:`Sombras Coloridas & Luz Rebatida`,ptName:`Ambient Bounce Light com a Cor de Marca`,category:`lighting`,categoryLabel:`Efeitos de Luz & Estilos`,concept:`Objetos reais com cores vivas refletem sua própria tonalidade sobre a mesa. No CSS, usa-se a cor do próprio elemento com opacidade na sombra.`,purpose:`Botões primários magnéticos, cards de produtos em destaque, tags ativas e efeitos de iluminação holográfica.`,goodPractice:`Misture uma sombra preta sutil (para peso) com a sombra colorida expansiva (para brilho atmosférico).`,commonPitfall:`Usar cor pura 100% saturada sem desfoque suficiente, gerando a sensação de mancha de tinta em vez de luz emanada.`,mnemonic:`"Luz viva rebate cor viva": substitua o preto fosco pelo DNA de cor do elemento.`,htmlSnippet:`<button class="btn-glow-primary">
  Começar Agora
</button>`,cssSnippet:`.btn-glow-primary {
  background: #6366f1;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  /* Sombra de oclusão + sombra colorida rebatida */
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.2),
    0 10px 20px -2px rgba(99, 102, 241, 0.45);
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; width: 100%;">
          <div id="sample-colored-btn" style="
            padding: 0.75rem 1.5rem;
            background: #6366f1;
            color: #ffffff;
            font-weight: 700;
            font-size: 0.875rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px -4px rgba(99, 102, 241, 0.55);
            transition: all 0.3s ease;
          ">
            Botão com Luz Rebatida
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="stage-btn-pill is-active" data-color="#6366f1" data-rgba="rgba(99, 102, 241, 0.55)">Índigo</button>
            <button class="stage-btn-pill" data-color="#10b981" data-rgba="rgba(16, 185, 129, 0.55)">Esmeralda</button>
            <button class="stage-btn-pill" data-color="#ec4899" data-rgba="rgba(236, 72, 153, 0.55)">Pink Glow</button>
          </div>
        </div>
      `;let t=e.querySelector(`#sample-colored-btn`),n=e.querySelectorAll(`.stage-btn-pill`);n.forEach(e=>{e.addEventListener(`click`,e=>{n.forEach(e=>e.classList.remove(`is-active`));let r=e.currentTarget;r.classList.add(`is-active`);let i=r.dataset.color||`#6366f1`,a=r.dataset.rgba||`rgba(99, 102, 241, 0.55)`;t.style.background=i,t.style.boxShadow=`0 10px 25px -4px ${a}`})})}},{id:`drop-shadow-vs-box-shadow`,name:`Drop-Shadow vs Box-Shadow`,ptName:`Filtro de Contorno Alfa vs Caixa Retangular`,category:`fundamentals`,categoryLabel:`Fundamentos`,concept:`box-shadow projeta sombra sobre a bounding-box retangular; filter: drop-shadow(...) respeita a transparência alfa real de SVGs e ponteiros de balões.`,purpose:`Tooltips com ponta triangular, logos SVG transparentes, badges recortados e imagens PNG sem fundo.`,goodPractice:`Utilize filter: drop-shadow() em balões de fala (speech bubbles) para que o triângulo e o corpo compartilhem a mesma sombra unificada.`,commonPitfall:`Colocar box-shadow em um container com triângulo em :after; a sombra do retângulo corta de forma bizarra sobre o ponteiro.`,mnemonic:`"Box-Shadow cuida da CAIXA; Drop-Shadow cuida da SILHUETA".`,htmlSnippet:`<div class="tooltip-bubble">
  Mensagem do Tooltip
  <div class="triangle-pointer"></div>
</div>`,cssSnippet:`/* ERRADO com box-shadow: o triângulo fica sem sombra contínua */
/* CERTO com filter: drop-shadow */
.tooltip-bubble {
  position: relative;
  background: var(--bg-surface-elevated);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  /* O filtro aplica a sombra em todo o contorno visível (corpo + seta) */
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.35));
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="display: flex; gap: 1.5rem; justify-content: center; width: 100%; flex-wrap: wrap;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <div style="
              position: relative;
              background: var(--bg-surface-elevated);
              padding: 0.6rem 0.9rem;
              border-radius: 8px;
              font-size: 0.75rem;
              font-weight: 600;
              box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
            ">
              Com Box-Shadow
              <div style="
                position: absolute;
                bottom: -6px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 6px solid var(--bg-surface-elevated);
              "></div>
            </div>
            <span style="font-size: 0.7rem; color: #ef4444;">✕ Ponta fica sem sombra</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <div style="
              position: relative;
              background: var(--bg-surface-elevated);
              padding: 0.6rem 0.9rem;
              border-radius: 8px;
              font-size: 0.75rem;
              font-weight: 600;
              filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.45));
            ">
              Com Drop-Shadow
              <div style="
                position: absolute;
                bottom: -6px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 6px solid var(--bg-surface-elevated);
              "></div>
            </div>
            <span style="font-size: 0.7rem; color: #10b981;">✓ Silhueta perfeita</span>
          </div>
        </div>
      `}},{id:`neumorphism`,name:`Neumorfismo Suave (Dual-Light)`,ptName:`Escultura com Duas Fontes Opostas de Luz e Sombra`,category:`lighting`,categoryLabel:`Efeitos de Luz & Estilos`,concept:`Técnica visual em que o elemento parece moldado a partir do mesmo plástico ou material do fundo, combinando uma sombra clara no topo-esq e escura na base-dir.`,purpose:`Dashboards futuristas, players de música, controles de smart home e interfaces conceituais.`,goodPractice:`Mantenha a cor de fundo do elemento EXATAMENTE igual à cor de fundo da página para que o relevo se forme unicamente pela luz.`,commonPitfall:`Usar neumorfismo em botões críticos de acessibilidade sem borda de contraste, violando as regras WCAG para pessoas com baixa visão.`,mnemonic:`"Luz branca sobe ao norte, sombra escura cai ao sul": a forma emerge do mesmo tecido da tela.`,htmlSnippet:`<div class="neu-card">
  <div class="neu-icon">📻</div>
  <span>Painel Extrudado</span>
</div>`,cssSnippet:`.neu-card {
  background: #1e2536; /* Idêntico ao fundo da página */
  border-radius: 16px;
  /* Luz refletida no topo-esq + Sombra projetada embaixo-dir */
  box-shadow:
    -6px -6px 14px rgba(255, 255, 255, 0.05),
    6px 6px 14px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.03);
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; width: 100%;">
          <div id="neu-sample" style="
            width: 100px;
            height: 100px;
            background: var(--bg-surface-elevated);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow:
              -6px -6px 14px rgba(255, 255, 255, 0.08),
              6px 6px 14px rgba(0, 0, 0, 0.5);
            transition: all 0.2s ease;
          ">
            🎛️
          </div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">Clique no botão para alternar entre Extrudado e Escavado</span>
        </div>
      `;let t=e.querySelector(`#neu-sample`),n=!1;t.addEventListener(`click`,()=>{n=!n,n?t.style.boxShadow=`inset -4px -4px 10px rgba(255, 255, 255, 0.06), inset 4px 4px 10px rgba(0, 0, 0, 0.6)`:t.style.boxShadow=`-6px -6px 14px rgba(255, 255, 255, 0.08), 6px 6px 14px rgba(0, 0, 0, 0.5)`})}},{id:`backlight-glow`,name:`Glow Neon & Backlight`,ptName:`Iluminação Difusa Sem Deslocamento (0 Offset)`,category:`lighting`,categoryLabel:`Efeitos de Luz & Estilos`,concept:`Ao zerar os deslocamentos X e Y (0 0) e usar um blur alto com cor saturada, a caixa deixa de projetar sombra e passa a emitir luz como uma lâmpada neon.`,purpose:`Indicadores de status "Online/Ao Vivo", contornos de foco acessível com estilo e elementos no estilo Cyberpunk/Gamer.`,goodPractice:`Combine um blur intermediário de alta opacidade com um segundo blur gigante de opacidade suave para uma dispersão de luz natural.`,commonPitfall:`Exagerar na quantidade de elementos com glow na mesma página, transformando a interface em um letreiro ofuscante.`,mnemonic:`"0 no X, 0 no Y: o objeto é o sol, não o anteparo".`,htmlSnippet:`<span class="badge-live">
  <span class="dot-beacon"></span>
  SISTEMA OPERACIONAL
</span>`,cssSnippet:`.dot-beacon {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  /* 0 X e 0 Y criam o halo radial omnidirecional */
  box-shadow:
    0 0 10px #10b981,
    0 0 20px rgba(16, 185, 129, 0.5);
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; width: 100%;">
          <div style="display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 1.2rem; background: var(--bg-surface-elevated); border: 1px solid var(--border-medium); border-radius: 9999px;">
            <div id="neon-glow-dot" style="
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: #10b981;
              box-shadow: 0 0 12px #10b981, 0 0 24px rgba(16, 185, 129, 0.6);
              transition: all 0.3s ease;
            "></div>
            <span style="font-size: 0.8125rem; font-weight: 700; color: var(--text-primary);">STATUS ONLINE</span>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="stage-btn-pill is-active" data-pulse="green">Operacional</button>
            <button class="stage-btn-pill" data-pulse="amber">Alerta</button>
            <button class="stage-btn-pill" data-pulse="purple">Mágico</button>
          </div>
        </div>
      `;let t=e.querySelector(`#neon-glow-dot`),n=e.querySelectorAll(`.stage-btn-pill`);n.forEach(e=>{e.addEventListener(`click`,e=>{n.forEach(e=>e.classList.remove(`is-active`));let r=e.currentTarget;r.classList.add(`is-active`);let i=r.dataset.pulse;i===`amber`?(t.style.background=`#f59e0b`,t.style.boxShadow=`0 0 12px #f59e0b, 0 0 24px rgba(245, 158, 11, 0.6)`):i===`purple`?(t.style.background=`#a855f7`,t.style.boxShadow=`0 0 12px #a855f7, 0 0 24px rgba(168, 85, 247, 0.6)`):(t.style.background=`#10b981`,t.style.boxShadow=`0 0 12px #10b981, 0 0 24px rgba(16, 185, 129, 0.6)`)})})}}],r=class{activeCategory=`all`;searchQuery=``;isLightMode=!1;studioState={x:0,y:8,blur:24,spread:0,color:`#000000`,opacity:35,isInset:!1,activePresetId:`clean-card`};themeToggleBtn=document.getElementById(`theme-toggle-btn`);backToTopBtn=document.getElementById(`back-to-top`);searchInput=document.getElementById(`search-input`);categoryContainer=document.getElementById(`category-pills`);cardsGrid=document.getElementById(`shadows-grid`);resultsCount=document.getElementById(`results-count`);presetsContainer=document.getElementById(`studio-presets-list`);sliderX=document.getElementById(`slider-x`);sliderY=document.getElementById(`slider-y`);sliderBlur=document.getElementById(`slider-blur`);sliderSpread=document.getElementById(`slider-spread`);sliderOpacity=document.getElementById(`slider-opacity`);colorPicker=document.getElementById(`color-picker`);checkboxInset=document.getElementById(`checkbox-inset`);valBadgeX=document.getElementById(`val-x`);valBadgeY=document.getElementById(`val-y`);valBadgeBlur=document.getElementById(`val-blur`);valBadgeSpread=document.getElementById(`val-spread`);valBadgeOpacity=document.getElementById(`val-opacity`);studioTargetBox=document.getElementById(`studio-target-box`);studioCodeText=document.getElementById(`studio-code-text`);btnCopyStudio=document.getElementById(`btn-copy-studio`);constructor(){this.initTheme(),this.setupEventListeners(),this.initStudio(),this.renderCategoryPills(),this.renderCards()}initTheme(){localStorage.getItem(`guia-theme`)===`light`&&(this.isLightMode=!0,document.documentElement.setAttribute(`data-theme`,`light`)),this.updateThemeButton()}toggleTheme(){this.isLightMode=!this.isLightMode;let e=this.isLightMode?`light`:`dark`;document.documentElement.setAttribute(`data-theme`,e),localStorage.setItem(`guia-theme`,e),this.updateThemeButton()}updateThemeButton(){this.themeToggleBtn&&(this.themeToggleBtn.innerHTML=this.isLightMode?`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,this.themeToggleBtn.title=this.isLightMode?`Alternar para Modo Escuro`:`Alternar para Modo Claro`)}setupEventListeners(){this.themeToggleBtn?.addEventListener(`click`,()=>this.toggleTheme()),this.searchInput?.addEventListener(`input`,e=>{this.searchQuery=e.target.value.trim().toLowerCase(),this.renderCards()}),window.addEventListener(`scroll`,()=>{window.scrollY>300?this.backToTopBtn?.classList.add(`is-visible`):this.backToTopBtn?.classList.remove(`is-visible`)}),this.backToTopBtn?.addEventListener(`click`,()=>{window.scrollTo({top:0,behavior:`smooth`})})}initStudio(){this.renderPresets(),this.bindStudioInputs(),this.updateStudioUI()}renderPresets(){let e=this.presetsContainer;e&&(e.innerHTML=``,t.forEach(t=>{let n=document.createElement(`button`);n.type=`button`,n.className=`preset-pill-btn ${this.studioState.activePresetId===t.id?`is-active`:``}`,n.innerHTML=`
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg>
        <span>${t.name}</span>
      `,n.addEventListener(`click`,()=>{this.applyPreset(t)}),e.appendChild(n)}))}applyPreset(e){this.studioState={...this.studioState,x:e.x,y:e.y,blur:e.blur,spread:e.spread,color:e.color,opacity:e.opacity,isInset:e.isInset,activePresetId:e.id},this.sliderX&&(this.sliderX.value=String(e.x)),this.sliderY&&(this.sliderY.value=String(e.y)),this.sliderBlur&&(this.sliderBlur.value=String(e.blur)),this.sliderSpread&&(this.sliderSpread.value=String(e.spread)),this.sliderOpacity&&(this.sliderOpacity.value=String(e.opacity)),this.colorPicker&&(this.colorPicker.value=e.color),this.checkboxInset&&(this.checkboxInset.checked=e.isInset),this.renderPresets(),this.updateStudioUI(e.cssValue)}bindStudioInputs(){let e=()=>{this.studioState={...this.studioState,x:Number(this.sliderX?.value||0),y:Number(this.sliderY?.value||0),blur:Number(this.sliderBlur?.value||0),spread:Number(this.sliderSpread?.value||0),opacity:Number(this.sliderOpacity?.value||35),color:this.colorPicker?.value||`#000000`,isInset:!!this.checkboxInset?.checked,activePresetId:null},this.renderPresets(),this.updateStudioUI()};this.sliderX?.addEventListener(`input`,e),this.sliderY?.addEventListener(`input`,e),this.sliderBlur?.addEventListener(`input`,e),this.sliderSpread?.addEventListener(`input`,e),this.sliderOpacity?.addEventListener(`input`,e),this.colorPicker?.addEventListener(`input`,e),this.checkboxInset?.addEventListener(`change`,e),this.btnCopyStudio?.addEventListener(`click`,async()=>{let e=this.studioCodeText?.textContent||``;try{await navigator.clipboard.writeText(e);let t=this.btnCopyStudio?.querySelector(`span`);t&&(t.textContent=`Copiado! ✓`,setTimeout(()=>t.textContent=`Copiar CSS`,1500))}catch(e){console.warn(`Erro ao copiar código do studio`,e)}})}hexToRgba(e,t){let n=e.replace(`#`,``),r=0,i=0,a=0;n.length===6?(r=parseInt(n.substring(0,2),16),i=parseInt(n.substring(2,4),16),a=parseInt(n.substring(4,6),16)):n.length===3&&(r=parseInt(n[0]+n[0],16),i=parseInt(n[1]+n[1],16),a=parseInt(n[2]+n[2],16));let o=(t/100).toFixed(2);return`rgba(${r}, ${i}, ${a}, ${o})`}updateStudioUI(e){let{x:t,y:n,blur:r,spread:i,color:a,opacity:o,isInset:s}=this.studioState;this.valBadgeX&&(this.valBadgeX.textContent=`${t}px`),this.valBadgeY&&(this.valBadgeY.textContent=`${n}px`),this.valBadgeBlur&&(this.valBadgeBlur.textContent=`${r}px`),this.valBadgeSpread&&(this.valBadgeSpread.textContent=`${i}px`),this.valBadgeOpacity&&(this.valBadgeOpacity.textContent=`${o}%`);let c=this.hexToRgba(a,o),l=e||`${s?`inset `:``}${t}px ${n}px ${r}px ${i}px ${c}`;this.studioTargetBox&&(this.studioTargetBox.style.boxShadow=l),this.studioCodeText&&(this.studioCodeText.textContent=`box-shadow: ${l};`)}renderCategoryPills(){let t=this.categoryContainer;t&&(t.innerHTML=``,e.forEach(e=>{let r=e.id===`all`?n.length:n.filter(t=>t.category===e.id).length,i=document.createElement(`button`);i.type=`button`,i.className=`category-pill ${this.activeCategory===e.id?`is-active`:``}`,i.innerHTML=`
        ${e.iconSvg}
        <span>${e.label}</span>
        <span class="category-pill-count">${r}</span>
      `,i.addEventListener(`click`,()=>{this.activeCategory=e.id,this.renderCategoryPills(),this.renderCards()}),t.appendChild(i)}))}getFilteredItems(){return n.filter(e=>{let t=this.activeCategory===`all`||e.category===this.activeCategory,n=!this.searchQuery||e.name.toLowerCase().includes(this.searchQuery)||e.ptName.toLowerCase().includes(this.searchQuery)||e.concept.toLowerCase().includes(this.searchQuery)||e.mnemonic.toLowerCase().includes(this.searchQuery);return t&&n})}renderCards(){let e=this.cardsGrid;if(!e)return;e.innerHTML=``;let t=this.getFilteredItems();if(this.resultsCount&&(this.resultsCount.textContent=`Mostrando ${t.length} de ${n.length} técnicas de sombra e iluminação`),t.length===0){e.innerHTML=`
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <p style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">Nenhuma técnica encontrada</p>
          <p style="font-size: 0.875rem;">Tente pesquisar por termos como "inset", "camadas", "lift", "rim", "glow", "neumorphism"...</p>
        </div>
      `;return}t.forEach(t=>{let n=document.createElement(`article`);n.className=`control-card`,n.id=`card-${t.id}`,n.innerHTML=`
        <div class="card-header">
          <div class="card-title-group">
            <h3 class="card-title">${t.name}</h3>
            <span class="card-pt-name">${t.ptName}</span>
          </div>
          <span class="card-cat-badge">${t.categoryLabel}</span>
        </div>

        <div class="card-body">
          <div class="concept-box">
            <div class="concept-text">${t.concept}</div>
            <div class="purpose-text"><strong>Onde usar:</strong> ${t.purpose}</div>
          </div>

          <div class="interactive-stage" id="stage-${t.id}"></div>

          <div class="memorization-box">
            <div class="memo-item">
              <span class="memo-tag-good">✓ REGRA:</span>
              <span>${t.goodPractice}</span>
            </div>
            <div class="memo-item">
              <span class="memo-tag-bad">✕ EVITE:</span>
              <span>${t.commonPitfall}</span>
            </div>
            <div class="memo-item">
              <span class="memo-tag-tip">💡 FIXAÇÃO:</span>
              <span>${t.mnemonic}</span>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <button type="button" class="btn-code-toggle" id="toggle-code-${t.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            <span>Ver Snippet</span>
          </button>
          <button type="button" class="btn-copy-code" id="copy-code-${t.id}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copiar</span>
          </button>
        </div>

        <div class="code-drawer" id="drawer-${t.id}">
          <pre><code>${this.escapeHtml(t.htmlSnippet)}\n\n/* CSS */\n${this.escapeHtml(t.cssSnippet)}</code></pre>
        </div>
      `,e.appendChild(n);let r=n.querySelector(`#stage-${t.id}`);r&&t.renderInteractive(r);let i=n.querySelector(`#toggle-code-${t.id}`),a=n.querySelector(`#drawer-${t.id}`);i?.addEventListener(`click`,()=>{a?.classList.toggle(`is-open`);let e=i.querySelector(`span`);e&&(e.textContent=a?.classList.contains(`is-open`)?`Ocultar Snippet`:`Ver Snippet`)});let o=n.querySelector(`#copy-code-${t.id}`);o?.addEventListener(`click`,async()=>{let e=`${t.htmlSnippet}\n\n/* CSS */\n${t.cssSnippet}`;try{await navigator.clipboard.writeText(e);let t=o.querySelector(`span`);t&&(t.textContent=`Copiado! ✓`,setTimeout(()=>t.textContent=`Copiar`,1500))}catch(e){console.warn(`Erro ao copiar snippet`,e)}})})}escapeHtml(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`)}};document.addEventListener(`DOMContentLoaded`,()=>{new r});