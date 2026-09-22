export interface DevRuleItem {
  id: string;
  order: number;
  name: string;
  category: 'dados' | 'arquitetura' | 'a11y' | 'css';
  categoryLabel: string;
  severity: 'Crítica' | 'Recomendada' | 'Essencial';
  concept: string;
  whyItMatters: string;
  badSnippet: string;
  goodSnippet: string;
  mnemonic: string;
  practicalTip: string;
}

export const DEV_RULES_DATA: DevRuleItem[] = [
  // 1. IMUTABILIDADE (Regra Obrigatória e Primeira do Checklist)
  {
    id: 'imutabilidade',
    order: 1,
    name: '1. Imutabilidade (Immutability)',
    category: 'dados',
    categoryLabel: 'Estado & Dados',
    severity: 'Crítica',
    concept: 'Nunca altere objetos, arrays ou estados existentes diretamente na memória; crie sempre uma nova cópia contendo as modificações.',
    whyItMatters: 'Mutações diretas geram efeitos colaterais silenciosos, quebram a reatividade de bibliotecas, impossibilitam a memoização e destroem a rastreabilidade do fluxo de dados.',
    badSnippet: `// ✕ ANTI-PADRÃO (Mutação direta na memória)
const state = { user: 'Ana', tags: ['Front-End'] };

// Mutação destrutiva:
state.tags.push('TypeScript'); 
state.user = 'Ana Clara';`,
    goodSnippet: `// ✓ PADRÃO CORRETO (Criação de novos estados imutáveis)
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
};`,
    mnemonic: 'Folha de Caderno com Caneta Permanente: o que já foi registrado não se rasura; para atualizar, escreve-se em uma nova página.',
    practicalTip: 'Defina propriedades como `readonly` no TypeScript e congele objetos críticos com `Object.freeze()` em testes.'
  },

  // 2. ACESSIBILIDADE E SEMÂNTICA
  {
    id: 'semantica-a11y',
    order: 2,
    name: '2. HTML Semântico & Acessibilidade (A11y)',
    category: 'a11y',
    categoryLabel: 'Acessibilidade & Web',
    severity: 'Crítica',
    concept: 'Utilize tags nativas do HTML5 antes de qualquer div genérica e assegure navegabilidade total via teclado e leitores de tela.',
    whyItMatters: 'Melhora o SEO, garante acesso a usuários com deficiência motora/visual e economiza dezenas de linhas de JavaScript desnecessário.',
    badSnippet: `<!-- ✕ ANTI-PADRÃO: Div clicável sem semântica -->
<div class="botao" onclick="enviarDados()">
  Salvar
</div>`,
    goodSnippet: `<!-- ✓ PADRÃO CORRETO: Botão nativo com foco e teclado -->
<button type="button" class="ui-btn ui-btn-primary">
  Salvar
</button>`,
    mnemonic: 'Acessibilidade é a "Rampa de Acesso": o que é construído para quem precisa de rampa beneficia a todos.',
    practicalTip: 'Navegue pelo seu próprio site usando apenas as teclas [Tab], [Enter] e [Space] sem tocar no mouse.'
  },

  // 3. TIPAGEM ESTRITA
  {
    id: 'tipagem-estrita',
    order: 3,
    name: '3. Tipagem Estrita (Zero `any`)',
    category: 'arquitetura',
    categoryLabel: 'TypeScript & Arquitetura',
    severity: 'Essencial',
    concept: 'Proíba o uso do tipo `any` e nunca force conversões cegas (`as unknown as X`); deixe o compilador verificar 100% dos fluxos.',
    whyItMatters: 'O `any` desativa todo o sistema de proteção do TypeScript, transformando erros de tempo de compilação em falhas graves em produção.',
    badSnippet: `// ✕ ANTI-PADRÃO: Fuga de tipagem
function processarResposta(data: any) {
  return data.usuario.endereco.cidade; // Pode quebrar em runtime!
}`,
    goodSnippet: `// ✓ PADRÃO CORRETO: Tipagem descritiva e segura
interface RespostaAPI {
  usuario: {
    endereco?: {
      cidade: string;
    };
  };
}

function processarResposta(data: RespostaAPI): string {
  return data.usuario.endereco?.cidade ?? 'Cidade não informada';
}`,
    mnemonic: 'Tipagem é o "Cinto de Segurança": desativá-lo com `any` não torna a viagem mais rápida, apenas fatal no primeiro impacto.',
    practicalTip: 'Mantenha no tsconfig.json: `"strict": true` e `"noImplicitAny": true`.'
  },

  // 4. RESILIÊNCIA DE ESTADOS
  {
    id: 'resiliencia-estados',
    order: 4,
    name: '4. Resiliência de Estados (Os 4 Estados da UI)',
    category: 'arquitetura',
    categoryLabel: 'TypeScript & Arquitetura',
    severity: 'Essencial',
    concept: 'Toda tela ou componente assíncrono deve prever e tratar visualmente: Carregamento (Loading), Erro (Error), Vazio (Empty) e Sucesso (Success).',
    whyItMatters: 'Projetar apenas o "caminho feliz" (happy path) deixa o usuário preso em telas brancas ou congeladas quando a rede falha ou a lista está vazia.',
    badSnippet: `// ✕ ANTI-PADRÃO: Presume que os dados sempre chegam perfeitos
if (dados.length > 0) {
  renderizarLista(dados);
}`,
    goodSnippet: `// ✓ PADRÃO CORRETO: Tratamento explícito de todos os cenários
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'empty' }
  | { status: 'success'; data: T };`,
    mnemonic: 'Os Quatro Pilares: se uma das quatro pernas da mesa quebrar, a interface inteira tomba.',
    practicalTip: 'Crie componentes reutilizáveis para `<SkeletonLoader>`, `<EmptyState>` e `<ErrorMessage>`.'
  },

  // 5. DESIGN TOKENS E CSS MODULAR
  {
    id: 'design-tokens',
    order: 5,
    name: '5. Design Tokens (Zero Valores Mágicos)',
    category: 'css',
    categoryLabel: 'CSS & Estilização',
    severity: 'Recomendada',
    concept: 'Nunca declare cores hexadecimais soltas ou espaçamentos arbitrários; utilize sempre variáveis CSS semânticas (`var(--token)`).',
    whyItMatters: 'Facilita suporte imediato a Dark/Light mode, garante consistência estética e torna refatorações globais instantâneas.',
    badSnippet: `/* ✕ ANTI-PADRÃO: Cores e espaçamentos soltos */
.card {
  background: #1e293b;
  color: #6366f1;
  padding: 17px;
  border-radius: 7px;
}`,
    goodSnippet: `/* ✓ PADRÃO CORRETO: Tokens semânticos e consistentes */
.card {
  background: var(--bg-surface-elevated);
  color: var(--brand-primary);
  padding: var(--space-md);
  border-radius: var(--radius-md);
}`,
    mnemonic: 'Tokens são o "Lego Padronizado": todas as peças encaixam porque respeitam a mesma medida universal.',
    practicalTip: 'Agrupe todas as variáveis no arquivo central `:root` dentro de `tokens.css`.'
  },

  // 6. RESPONSABILIDADE ÚNICA (SRP)
  {
    id: 'responsabilidade-unica',
    order: 6,
    name: '6. Responsabilidade Única (SRP)',
    category: 'arquitetura',
    categoryLabel: 'TypeScript & Arquitetura',
    severity: 'Recomendada',
    concept: 'Cada função, módulo ou componente de interface deve resolver apenas um problema bem delineado.',
    whyItMatters: 'Componentes gigantescos ("God Components") de 800 linhas são impossíveis de testar, causam bugs colaterais e desencorajam a reutilização.',
    badSnippet: `// ✕ ANTI-PADRÃO: Um único arquivo faz busca de API, calcula impostos e desenha a tela inteira`,
    goodSnippet: `// ✓ PADRÃO CORRETO: Separação em camadas
// 1. Data Fetcher (serviço)
// 2. State Controller (regras de negócio)
// 3. UI Component (pura apresentação visual)`,
    mnemonic: 'Canivete Suíço vs Faca do Chef: uma ferramenta especializada corta com perfeição; tentar fazer tudo gera ferramentas desajeitadas.',
    practicalTip: 'Se o componente passou de 200 linhas ou tem mais de 3 responsabilidades, quebre-o em subcomponentes.'
  },

  // 7. PREVENÇÃO DE CLS (CUMULATIVE LAYOUT SHIFT)
  {
    id: 'prevencao-cls',
    order: 7,
    name: '7. Prevenção de CLS (Estabilidade Visual)',
    category: 'css',
    categoryLabel: 'CSS & Estilização',
    severity: 'Essencial',
    concept: 'Reserve espaço prévio para imagens, fontes e conteúdos dinâmicos com `aspect-ratio` ou skeleton loaders.',
    whyItMatters: 'Evita que elementos na tela pulem de posição enquanto carregam, prevenindo cliques acidentais e melhorando a pontuação Core Web Vitals do Google.',
    badSnippet: `<!-- ✕ ANTI-PADRÃO: Imagem sem dimensões reservadas -->
<img src="/foto.jpg" alt="Avatar">`,
    goodSnippet: `<!-- ✓ PADRÃO CORRETO: Dimensões explícitas no CSS/HTML -->
<img src="/foto.jpg" alt="Avatar" width="300" height="200" style="aspect-ratio: 3/2;">`,
    mnemonic: 'Vaga de Garagem Demarcada: o espaço do carro já está desenhado no chão mesmo antes de ele chegar.',
    practicalTip: 'Teste o site em conexões simuladas de "Slow 3G" nas ferramentas de desenvolvedor do navegador.'
  },

  // 8. MOBILE-FIRST
  {
    id: 'mobile-first',
    order: 8,
    name: '8. Filosofia Mobile-First',
    category: 'css',
    categoryLabel: 'CSS & Estilização',
    severity: 'Recomendada',
    concept: 'Estruture o CSS base para a menor tela primeiro e utilize `@media (min-width: ...)` para expandir o layout em telas maiores.',
    whyItMatters: 'Garante que dispositivos móveis (que têm conexões mais lentas e telas restritas) recebam o CSS mais limpo e leve possível.',
    badSnippet: `/* ✕ EVITE: Escrever estilos para 4K e depois sobrescrever tudo com max-width */
.sidebar { width: 300px; }
@media (max-width: 600px) { .sidebar { display: none; } }`,
    goodSnippet: `/* ✓ PADRÃO CORRETO: Mobile-First natural */
.sidebar { display: none; }
@media (min-width: 768px) {
  .sidebar { display: block; width: 280px; }
}`,
    mnemonic: 'Mala de Viagem Pequena: coloque primeiro o essencial; se sobrar espaço na mala maior, adicione os extras.',
    practicalTip: 'Inicie todo teste de interface reduzindo a janela do navegador para 360px de largura.'
  }
];
