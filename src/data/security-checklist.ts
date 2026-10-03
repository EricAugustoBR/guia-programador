export type SecurityCategory =
  | 'secrets'
  | 'banco-rls'
  | 'backend-dados'
  | 'auth-sessao'
  | 'infra-rede'
  | 'defesa-ia';

export type SecuritySeverity = 'Crítica' | 'Alta' | 'Essencial';

export interface SecurityCheckItem {
  readonly id: string;
  readonly order: number;
  readonly name: string;
  readonly category: SecurityCategory;
  readonly categoryLabel: string;
  readonly severity: SecuritySeverity;
  readonly concept: string;
  readonly whyItMatters: string;
  readonly badSnippet: string;
  readonly goodSnippet: string;
  readonly pitfall: string;
  readonly mnemonic: string;
  readonly validationTip: string;
}

export interface SecurityCategoryMeta {
  readonly id: SecurityCategory | 'all';
  readonly label: string;
  readonly icon: string;
  readonly description: string;
}

export const SECURITY_CATEGORIES: readonly SecurityCategoryMeta[] = [
  {
    id: 'all',
    label: 'Todos os Itens',
    icon: '🛡️',
    description: 'Visão unificada de todos os 24 pilares de segurança web'
  },
  {
    id: 'secrets',
    label: 'Secrets & Chaves de API',
    icon: '🔑',
    description: 'Proteção de credenciais, bundles client-side e histórico git'
  },
  {
    id: 'banco-rls',
    label: 'Banco de Dados & RLS',
    icon: '🗄️',
    description: 'Row Level Security, chaves públicas e isolamento multi-tenant'
  },
  {
    id: 'backend-dados',
    label: 'Validação & SQL',
    icon: '⚡',
    description: 'Mass Assignment, queries parametrizadas e validação de schema'
  },
  {
    id: 'auth-sessao',
    label: 'Autenticação & Sessões',
    icon: '👤',
    description: 'RBAC, guards de telas, cookies blindados e hashing de senhas'
  },
  {
    id: 'infra-rede',
    label: 'Infra & Tráfego',
    icon: '🌐',
    description: 'HTTPS forçado, HSTS e cabeçalhos defensivos (CSP, X-Frame)'
  },
  {
    id: 'defesa-ia',
    label: 'Defesa Ativa & IA',
    icon: '🤖',
    description: 'Rate limit em rotas de LLM e proteção anti-bot em formulários'
  }
];

export const SECURITY_CHECKLIST_DATA: readonly SecurityCheckItem[] = [
  // 1. API KEYS FORA DO BUNDLE
  {
    id: 'api-keys-secrets',
    order: 1,
    name: '1. API Keys nunca visíveis, acessíveis ou hard coded',
    category: 'secrets',
    categoryLabel: 'Secrets & Chaves de API',
    severity: 'Crítica',
    concept: 'Chaves secretas de APIs terceiras (OpenAI, Stripe Secret, AWS, SendGrid) devem residir exclusivamente em variáveis de ambiente no servidor e jamais ser embutidas no código ou enviadas ao navegador.',
    whyItMatters: 'Qualquer string no código do frontend (React, Vue, Vite, Next.js client) fica 100% visível na aba Sources/Network do DevTools (`F12`), permitindo que invasores roubem cotas pagas ou sequestrem contas de terceiros.',
    badSnippet: `// ✕ VULNERÁVEL: Chave privada no frontend ou com prefixo público!
// src/services/ai.ts (executado no navegador)
const OPENAI_KEY = "sk-live-93821038102938102938120398"; // Hardcoded no bundle!

export async function askAi(prompt: string) {
  // A requisição vaza o header Authorization no DevTools Network do usuário!
  return fetch("https://api.openai.com/v1/chat/completions", {
    headers: { Authorization: \`Bearer \${OPENAI_KEY}\` }
  });
}
// OU no .env: VITE_STRIPE_SECRET=sk_live_... (VITE_ vaza pro bundle do browser!)`,
    goodSnippet: `// ✓ SEGURO: Frontend chama seu próprio backend/BFF; servidor usa process.env
// src/app/api/chat/route.ts (Server-side / Edge isolado)
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // process.env sem prefixo público só existe no runtime do servidor
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('Chave secreta não configurada no servidor');

  const { prompt } = await req.json();
  const data = await callAiProvider(apiKey, prompt);
  
  return NextResponse.json({ result: data });
}`,
    pitfall: 'Usar prefixos públicos de bundlers (ex: `NEXT_PUBLIC_`, `VITE_`, `NUXT_PUBLIC_`) para chaves que deveriam ser confidenciais. Esses prefixos forçam a injeção do valor dentro do bundle JS compilado!',
    mnemonic: 'O Segredo do Cofre dos Fundos: O cliente compra o produto no balcão (sua API backend), mas nunca recebe a chave do cofre dos fundos (API key do provedor).',
    validationTip: 'Gere o build de produção (`npm run build`) e execute: `grep -r "sk_" dist/` ou busque strings sensíveis nos arquivos `.js` gerados.'
  },

  // 2. LIMPAR SECRETS DO GIT
  {
    id: 'limpar-secrets-git',
    order: 2,
    name: '2. Limpar os secrets do repositório Git',
    category: 'secrets',
    categoryLabel: 'Secrets & Chaves de API',
    severity: 'Crítica',
    concept: 'Nenhum arquivo de configuração com credenciais reais (.env, certificados, chaves SSH) pode existir no histórico de commits do Git; se um secret foi comitado, deve ser revogado imediatamente no provedor.',
    whyItMatters: 'Fazer `git rm .env` ou um novo commit de deleção NÃO remove o arquivo dos commits anteriores. Bots de scraping escaneiam repositórios no GitHub em segundos e exploram credenciais quase que instantaneamente.',
    badSnippet: `# ✕ FALHA GRAVE: Subiu o .env e tentou "apagar" em outro commit
git add .env
git commit -m "add env"
git push origin main

# Tentativa inócua de apagar:
git rm .env
git commit -m "remove secrets"
git push origin main
# O segredo CONTINUA intacto em: git log -p .env! Bots clonam e leem!`,
    goodSnippet: `# ✓ SEGURO: Bloqueio estrito no .gitignore + expurgo de histórico + revogação
# 1. Adicionar imediatamente ao .gitignore:
echo ".env" >> .gitignore
echo ".env*.local" >> .gitignore
echo "!.env.example" >> .gitignore # Mantém apenas o template sem valores

# 2. SE JÁ SUBIU: Revogue e gere novas chaves no provedor IMEDIATAMENTE!
# 3. Expurgue do histórico com git-filter-repo:
git-filter-repo --path .env --invert-paths --force

# 4. Trave pré-commits com Gitleaks:
# npx husky add .husky/pre-commit "gitleaks protect --staged"`,
    pitfall: 'Achar que manter o repositório como "Privado" protege credenciais. Terceirizados, estagiários ou invasores que obtiverem acesso temporário de leitura clonam todo o histórico com um comando.',
    mnemonic: 'Vazou, Queimou: Chave commitada é chave queimada. Não basta apagar o arquivo do Git, é mandatório invalidar a chave no provedor e gerar uma nova.',
    validationTip: 'Instale e rode o Gitleaks localmente no repositório: `gitleaks detect --verbose` para escanear todo o histórico em busca de chaves residuais.'
  },

  // 3. SERVICE ROLE NUNCA NO CLIENT
  {
    id: 'service-role-client',
    order: 3,
    name: '3. Nunca expor a chave no service_role no client - somente anon/publishable no front',
    category: 'secrets',
    categoryLabel: 'Secrets & Chaves de API',
    severity: 'Crítica',
    concept: 'Chaves com perfil de superadministrador (ex: `SUPABASE_SERVICE_ROLE_KEY`, Firebase Admin SDK, Stripe Secret) ignoram todas as regras de segurança e RLS, devendo rodar exclusivamente no servidor.',
    whyItMatters: 'Se a chave `service_role` for enviada ao frontend, qualquer usuário pode abrir o DevTools e executar queries administrativas com bypass total do banco, apagando ou exportando toda a base de dados.',
    badSnippet: `// ✕ CATASTRÓFICO: Instanciar cliente com service_role no navegador!
// src/lib/supabase.ts (importado em componentes React/Vue client)
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // CHAVE MESTRA VAZADA NO NAVEGADOR!
);
// Qualquer usuário pode rodar no console: await supabase.from('users').delete()!`,
    goodSnippet: `// ✓ SEGURO: Frontend usa estritamente chave anônima pública; server-side isolado
// src/lib/supabase-client.ts (Navegador - respeita RLS)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Apenas escopo público / RLS
);

// src/lib/supabase-admin.ts (SOMENTE em APIs Node/Edge privadas)
import 'server-only'; // Gera erro de build se importado no client!
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Protegido no servidor
);`,
    pitfall: 'Criar um único arquivo centralizado `supabase.ts` e exportar tanto o client anônimo quanto o client admin, fazendo o bundler empacotar acidentalmente a chave mestra no build do client.',
    mnemonic: 'Crachá de Visitante vs. Chave Mestra: O frontend usa o crachá de visitante na catraca (`anon`); a chave mestra (`service_role`) nunca sai do bolso do guarda (servidor).',
    validationTip: 'Verifique no arquivo `.env` se `SERVICE_ROLE` possui o prefixo `VITE_` ou `NEXT_PUBLIC_`. Se possuir, renomeie imediatamente para remover o prefixo.'
  },

  // 4. PUBLIC KEY DB COM ESCOPO RLS
  {
    id: 'public-key-db-rls',
    order: 4,
    name: '4. Public Key DB - garantir que a chave pública não dá acesso além do RLS',
    category: 'banco-rls',
    categoryLabel: 'Banco de Dados & RLS',
    severity: 'Crítica',
    concept: 'Como a chave anônima pública (`anon_key`) do banco é acessível a qualquer um no front, assuma que atacantes farão chamadas cURL diretas na API REST/GraphQL do banco; sua segurança depende 100% das políticas de RLS.',
    whyItMatters: 'Se uma tabela não possuir RLS ativo, a chave pública terá privilégios plenos de leitura, inserção e deleção concedidos pelo PostgreSQL para a role `anon`, transformando seu banco num endpoint público aberto.',
    badSnippet: `-- ✕ PERIGOSO: Criar tabela e esquecer de isolar o papel 'anon'
CREATE TABLE leads_comerciais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT,
  orcamento_previsto NUMERIC
);
-- RLS esquecida! Qualquer um com a anon_key faz:
-- curl "https://xyz.supabase.co/rest/v1/leads_comerciais" -H "apikey: ANON_KEY"
-- E baixa a lista completa de leads e telefones!`,
    goodSnippet: `-- ✓ SEGURO: RLS ativada e forçada; anônimo só insere, não lê
ALTER TABLE leads_comerciais ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads_comerciais FORCE ROW LEVEL SECURITY;

-- Permite que o formulário público envie novos leads:
CREATE POLICY "Publico pode enviar novos leads"
ON leads_comerciais FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Leitura restrita estritamente a administradores autenticados:
CREATE POLICY "Apenas admins leem leads"
ON leads_comerciais FOR SELECT
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');`,
    pitfall: 'Achar que "esconder a URL da API do banco" ou "não criar tela de listagem no site" impede o acesso. A URL da API e a chave pública trafegam abertamente nos cabeçalhos de rede.',
    mnemonic: 'A Portaria do Condomínio: A chave da portaria (`anon_key`) deixa você entrar no hall de entrada, mas nunca abrir a porta de apartamentos privados sem autorização individual.',
    validationTip: 'Abra o terminal e execute uma requisição cURL direta na URL do banco com a chave `anon` sem token JWT para confirmar se retorna `[]` ou erro 401.'
  },

  // 5. RLS HABILITADA EM TABELAS SENSÍVEIS
  {
    id: 'rls-habilitada-tabelas',
    order: 5,
    name: '5. RLS habilitada em toda tabela com dado de cliente, lead, financeiro ou conversa',
    category: 'banco-rls',
    categoryLabel: 'Banco de Dados & RLS',
    severity: 'Crítica',
    concept: 'Toda e qualquer tabela do banco que armazene registros sensíveis deve conter explicitamente as instruções `ENABLE ROW LEVEL SECURITY` e `FORCE ROW LEVEL SECURITY`.',
    whyItMatters: 'Sem RLS ativada, as políticas de segurança não têm efeito algum e o banco opera no modo de permissões abertas do esquema PostgreSQL. Um único esquecimento expõe conversas particulares e dados de faturamento.',
    badSnippet: `-- ✕ FALHA GRAVE: Tabela criada sem cláusula de ativação de RLS
CREATE TABLE conversas_ia (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users,
  mensagem_usuario TEXT,
  resposta_ia TEXT,
  timestamp TIMESTAMPTZ DEFAULT now()
);
-- NENHUMA RLS FOI HABILITADA!
-- A API REST expõe todas as conversas privadas para qualquer cliente HTTP!`,
    goodSnippet: `-- ✓ SEGURO: RLS habilitada e forçada até para os owners das tabelas
ALTER TABLE conversas_ia ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversas_ia FORCE ROW LEVEL SECURITY;

-- Usuário logado lê somente as suas conversas:
CREATE POLICY "Usuario le somente suas conversas"
ON conversas_ia FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Inserção amarrada ao próprio ID do token:
CREATE POLICY "Usuario insere apenas com seu user_id"
ON conversas_ia FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());`,
    pitfall: 'Criar novas tabelas via extensões ou migrações manuais e esquecer de adicionar o comando de RLS na migração SQL de produção.',
    mnemonic: 'A Gaveta com Fechadura: Criar uma tabela sem RLS é como colocar gavetas transparentes sem chave no balcão da recepção.',
    validationTip: 'Rode no banco: `SELECT tablename FROM pg_tables WHERE schemaname = \'public\' AND rowsecurity = false;`. A consulta deve retornar ZERO tabelas sensíveis.'
  },

  // 6. POLICIES NUNCA COM QUAL=TRUE GENÉRICO
  {
    id: 'policies-sem-true-generico',
    order: 6,
    name: '6. Policies nunca com qual = true genérico em multi-tenant (escopar por auth.uid())',
    category: 'banco-rls',
    categoryLabel: 'Banco de Dados & RLS',
    severity: 'Crítica',
    concept: 'Em arquiteturas com múltiplos clientes ou multi-tenant, nunca crie políticas com `USING (true)` para `SELECT`, `UPDATE` ou `DELETE`. Toda consulta deve ser escopada por `auth.uid() = user_id` ou `tenant_id`.',
    whyItMatters: 'Uma política com `USING (true)` permite vazamento cruzado de dados entre clientes (Cross-Tenant Data Leak). O Inquilino A conseguirá ler e alterar dados da empresa concorrente B.',
    badSnippet: `-- ✕ VULNERABILIDADE MULTI-TENANT: "USING (true)" abre as portas para todos os clientes!
CREATE POLICY "Usuarios autenticados podem ver relatorios"
ON relatorios_financeiros FOR SELECT
TO authenticated
USING (true); -- FALHA CATASTRÓFICA! O Cliente A vê o extrato do Cliente B!`,
    goodSnippet: `-- ✓ SEGURO: Escopo estrito baseado no Tenant ID ou User ID autenticado
CREATE POLICY "Isolamento estrito por empresa e usuario"
ON relatorios_financeiros FOR SELECT
TO authenticated
USING (
  empresa_id = (
    SELECT u.empresa_id 
    FROM perfis_usuarios u 
    WHERE u.id = auth.uid()
  )
);

-- Para UPDATE e DELETE, garanta tanto USING quanto WITH CHECK:
CREATE POLICY "Atualizacao restrita a mesma organizacao"
ON relatorios_financeiros FOR UPDATE
TO authenticated
USING (empresa_id = (SELECT empresa_id FROM perfis_usuarios WHERE id = auth.uid()))
WITH CHECK (empresa_id = (SELECT empresa_id FROM perfis_usuarios WHERE id = auth.uid()));`,
    pitfall: 'Copiar snippets de tutoriais rápidos que colocam `USING (true)` para "simplificar os testes iniciais" e subir o código para homologação/produção.',
    mnemonic: 'O Cartão do Quarto: Você tem o cartão magnético do hotel, mas ele só abre a porta do seu quarto (302), nunca a porta de todos os hóspedes do andar (`true`).',
    validationTip: 'Audite as políticas existentes no PostgreSQL com: `SELECT schemaname, tablename, policyname, qual FROM pg_policies WHERE qual = \'true\';`.'
  },

  // 7. RESTRIÇÃO DE ACESSO POR PAPEL (RBAC)
  {
    id: 'rbac-menor-privilegio',
    order: 7,
    name: '7. Restringir acessos por papel (RBAC) / Menor privilégio necessário',
    category: 'auth-sessao',
    categoryLabel: 'Autenticação & Sessões',
    severity: 'Alta',
    concept: 'Controle de acesso baseado em papéis (RBAC - Admin, Editor, Viewer) deve ser validado no servidor a cada ação de negócio; nunca confie apenas em esconder botões na interface.',
    whyItMatters: 'Se o backend não verificar a permissão da função, qualquer usuário comum pode enviar uma chamada HTTP direta (ex: `DELETE /api/users/42`) e executar ações restritas de administrador (OWASP Broken Access Control).',
    badSnippet: `// ✕ ANTI-PADRÃO: Apenas oculta o botão na UI ou confia no corpo da requisição!
// Backend não valida se o usuário possui cargo de ADMIN:
app.delete('/api/users/:id', async (req, res) => {
  // Executa sem validar o papel do usuário na sessão:
  await db.users.delete({ where: { id: req.params.id } });
  res.json({ message: 'Usuário deletado' });
});`,
    goodSnippet: `// ✓ SEGURO: Middleware server-side verifica role autorizada no token/banco
type AppRole = 'ADMIN' | 'MANAGER' | 'VIEWER';

export function authorizeRole(allowedRoles: readonly AppRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Acesso negado: privilégio insuficiente.' });
    }
    next();
  };
}

// Rota protegida por autenticação E por papel específico:
app.delete('/api/users/:id', requireAuth, authorizeRole(['ADMIN']), async (req, res) => {
  await db.users.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});`,
    pitfall: 'Armazenar a role no `localStorage` do navegador e confiar no valor enviado no corpo de requisições subsequentes.',
    mnemonic: 'A Farda não é Crachá: Não basta a pessoa afirmar no balcão que é gerente; a central deve checar no registro oficial antes de destrancar a sala de controle.',
    validationTip: 'Crie testes automatizados simulando tokens de usuário com papel `VIEWER` chamando rotas de exclusão e certifique-se de receber HTTP 403 Forbidden.'
  },

  // 8. BLOQUEAR MASS ASSIGNMENT
  {
    id: 'bloquear-mass-assignment',
    order: 8,
    name: '8. Bloquear Mass Assignment - nunca aceitar payload inteiro sem allowlist',
    category: 'backend-dados',
    categoryLabel: 'Validação & SQL',
    severity: 'Alta',
    concept: 'Nunca repasse o objeto completo do cliente (`req.body`) diretamente para o ORM ou banco; defina uma lista explícita de campos permitidos (allowlist) filtrando propriedades perigosas como `role`, `isAdmin` ou `credits`.',
    whyItMatters: 'Um invasor pode inspecionar o formulário e injetar `{ "name": "Carlos", "role": "admin", "balance": 99999 }`. Se o backend aceitar o objeto cru, o usuário se autopromove a administrador da plataforma.',
    badSnippet: `// ✕ VULNERÁVEL: Mass Assignment cego direto no banco!
app.patch('/api/profile', async (req, res) => {
  // Invasor envia: { name: "Carlos", role: "admin", isVerified: true }
  // O ORM atualiza tudo o que vier no payload:
  const updatedUser = await db.user.update({
    where: { id: req.user.id },
    data: req.body // FALHA GRAVE: Atualiza colunas que não deveriam ser públicas!
  });
  res.json(updatedUser);
});`,
    goodSnippet: `// ✓ SEGURO: Schema estrito com Zod e extração de propriedades permitidas
import { z } from 'zod';

const UpdateProfileSchema = z.object({
  name: z.string().min(2).max(80),
  bio: z.string().max(300).optional(),
  avatarUrl: z.string().url().optional()
}).strict(); // strict() rejeita propriedades extras não declaradas

app.patch('/api/profile', async (req, res) => {
  const safeData = UpdateProfileSchema.parse(req.body);

  // Somente os campos da allowlist são enviados ao banco:
  const updated = await db.user.update({
    where: { id: req.user.id },
    data: {
      name: safeData.name,
      bio: safeData.bio,
      avatarUrl: safeData.avatarUrl
    }
  });
  res.json(updated);
});`,
    pitfall: 'Utilizar `Object.assign(user, req.body)` ou spread operator cego `const data = { ...user, ...req.body }` sem sanitizar previamente os atributos.',
    mnemonic: 'A Lista VIP na Entrada: Você não deixa entrar no evento todo mundo que se juntar na porta; apenas os nomes explicitamente registrados na lista VIP ganham passagem.',
    validationTip: 'Envie um teste POST/PATCH com o campo `{ "role": "admin", "balance": 9999 }` e confirme se a API responde com erro 400 ou ignora completamente o campo.'
  },

  // 9. QUERIES PARAMETRIZADAS
  {
    id: 'queries-parametrizadas-sqli',
    order: 9,
    name: '9. Queries parametrizadas - nunca concatenar input do usuário direto em SQL',
    category: 'backend-dados',
    categoryLabel: 'Validação & SQL',
    severity: 'Crítica',
    concept: 'Toda consulta enviada ao banco de dados relacional deve usar consultas preparadas (Prepared Statements) ou ORMs seguros, garantindo que o input do usuário seja tratado como dado puro, nunca como código SQL executável.',
    whyItMatters: 'A concatenação de strings em SQL (SQL Injection - SQLi) permite que atacantes alterem a estrutura lógica da query, ignorem autenticações (`\' OR \'1\'=\'1`), leiam tabelas inteiras ou apaguem o banco (`DROP TABLE`).',
    badSnippet: `// ✕ CATASTRÓFICO: Interpolação de strings em consultas SQL!
const userInput = req.body.email; // Entrada maliciosa: admin@site.com' OR '1'='1
const query = \`SELECT * FROM usuarios WHERE email = '\${userInput}'\`;

// O banco interpreta a string como lógica SQL:
// SELECT * FROM usuarios WHERE email = 'admin@site.com' OR '1'='1'
const result = await db.rawQuery(query); // Retorna todos os usuários e ignora a senha!`,
    goodSnippet: `// ✓ SEGURO: Prepared statements com parâmetros tipados ($1, $2 ou ?)
// Opção 1: Driver SQL com placeholders indexados:
const safeQuery = 'SELECT id, nome, email FROM usuarios WHERE email = $1';
const result = await db.query(safeQuery, [req.body.email]);

// Opção 2: ORM moderno (Prisma / Drizzle) que parametriza automaticamente:
const usuario = await prisma.usuario.findUnique({
  where: { email: req.body.email }
});`,
    pitfall: 'Tentar "sanitizar" SQL manualmente com `.replace("\'", "")` caseiro. Atacantes contornam filtros simples usando encoding hexadecimal, Unicode e comentários (`--`, `/*`).',
    mnemonic: 'O Envelope Lacrado: O input do usuário viaja selado em um envelope (parâmetro) para o banco; ele nunca é costurado na folha de ordens (comando SQL).',
    validationTip: 'Execute ferramentas SAST (Static Application Security Testing) como Semgrep (`semgrep --config=p/owasp-top-ten`) para detectar concatenações em chamadas raw SQL.'
  },

  // 10. VALIDAÇÃO DOS INPUTS EM TODA ROTA
  {
    id: 'validacao-inputs-rotas',
    order: 10,
    name: '10. Validação dos inputs em toda rota que recebe dado externo',
    category: 'backend-dados',
    categoryLabel: 'Validação & SQL',
    severity: 'Alta',
    concept: 'Todo payload externo (corpo da requisição, query strings, headers e parâmetros de URL) deve ser rigorosamente validado e parseado logo na borda de entrada da API antes de atingir qualquer serviço interno.',
    whyItMatters: 'Dados não validados causam quebras de tipo em runtime (`Cannot read property of undefined`), injeções de código, estouros de memória, ataques ReDoS e estados inconsistentes no banco de dados.',
    badSnippet: `// ✕ FRÁGIL: Supõe que o frontend sempre enviará os campos no formato correto
app.post('/api/pedidos', async (req, res) => {
  // Se preco for negativo, NaN ou um objeto, causa erro ou fraude contábil!
  const valorTotal = req.body.preco * req.body.quantidade;
  await processarPagamento(req.body.clienteId, valorTotal);
  res.json({ status: 'ok' });
});`,
    goodSnippet: `// ✓ SEGURO: Validação estruturada com Zod logo na entrada do endpoint
import { z } from 'zod';

const CriarPedidoSchema = z.object({
  clienteId: z.string().uuid('ID de cliente inválido'),
  preco: z.number().positive('Preço deve ser positivo'),
  quantidade: z.number().int().min(1, 'Mínimo de 1 item').max(50),
  codigoCupom: z.string().trim().regex(/^[A-Z0-9_-]{3,15}$/).optional()
});

app.post('/api/pedidos', async (req, res) => {
  const result = CriarPedidoSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ erros: result.error.flatten().fieldErrors });
  }

  const { clienteId, preco, quantidade } = result.data;
  const valorTotal = preco * quantidade;
  await processarPagamento(clienteId, valorTotal);
  res.status(201).json({ status: 'ok' });
});`,
    pitfall: 'Achar que a validação de formulário no frontend (`<input type="email" required>`) substitui a validação do backend. Qualquer atacante burla o front com 1 requisição cURL.',
    mnemonic: 'O Raio-X da Alfândega: Todo pacote que entra no território da aplicação passa pelo scanner de segurança antes de ser descarregado nos armazéns internos.',
    validationTip: 'Escreva testes de fuzzing disparando payloads com strings gigantescas, tipos invertidos e números negativos para checar se a API rejeita com HTTP 400 estruturado.'
  },

  // 11. AUTH SERVER SIDE
  {
    id: 'auth-server-side',
    order: 11,
    name: '11. Auth Server-Side - Validar sessão / token no backend - nunca só no client',
    category: 'auth-sessao',
    categoryLabel: 'Autenticação & Sessões',
    severity: 'Crítica',
    concept: 'A autenticação deve ser comprovada e verificada pelo servidor em cada requisição (via verificação criptográfica da assinatura do JWT ou lookup no Redis/banco); o frontend nunca deve ser a autoridade de validação.',
    whyItMatters: 'Se o backend apenas decodifica o token sem checar a assinatura criptográfica, invasores podem alterar o `user_id` no payload e acessar a conta de qualquer cliente da plataforma.',
    badSnippet: `// ✕ CATASTRÓFICO: Backend confia em payload não assinado ou só no client!
app.get('/api/usuario/dados', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  // Apenas decodifica a base64 SEM verificar a assinatura secreta:
  const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

  // Invasor forjou "user_id: 1" (conta do admin) e o backend aceita cegamente!
  const usuario = await db.buscarPorId(payload.user_id);
  res.json(usuario);
});`,
    goodSnippet: `// ✓ SEGURO: Verificação criptográfica com chave secreta e algoritmo travado
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não informado' });
  }

  const token = authHeader.substring(7);
  try {
    // Valida assinatura com chave secreta privada e confere prazo de validade (exp)
    const decoded = jwt.verify(token, process.env.JWT_SECRET!, {
      algorithms: ['HS256'] // Trava algoritmo para evitar vulnerabilidade 'alg: none'
    }) as { sub: string; role: string };

    req.user = { id: decoded.sub, role: decoded.role };
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}`,
    pitfall: 'Vulnerabilidade do algoritmo "none": bibliotecas JWT desatualizadas aceitavam tokens sem assinatura se o header contivesse `{"alg": "none"}`. Sempre declare explicitamente a lista de algoritmos aceitos.',
    mnemonic: 'O Carimbo Notarial Holográfico: Não basta o documento dizer que pertence ao João; o cartório central deve verificar se o selo holográfico criptográfico é autêntico.',
    validationTip: 'Modifique um único caractere da assinatura do JWT gerado e envie para a API; ela deve retornar imediatamente HTTP 401 Unauthorized.'
  },

  // 12. NENHUMA TELA SENSÍVEL SEM AUTENTICAÇÃO
  {
    id: 'telas-sensiveis-middleware-guard',
    order: 12,
    name: '12. Nenhuma tela com dado sensível acessada sem autenticação (Middlewares)',
    category: 'auth-sessao',
    categoryLabel: 'Autenticação & Sessões',
    severity: 'Crítica',
    concept: 'Rotas protegidas com dados privados devem ser bloqueadas no servidor ou na borda via Middleware/Guard antes de gerar qualquer HTML; nunca esconda dados apenas com CSS (`display: none`) ou verificação tardia no client.',
    whyItMatters: 'Se a tela carregar dados sensíveis e só verificar o login no `useEffect` do React, o HTML completo já viajou pela rede e pode ser inspecionado no código-fonte ou desativando o JavaScript do navegador.',
    badSnippet: `// ✕ VULNERÁVEL: Verificação tardia no useEffect do navegador!
export default function DashboardPage({ extratoFinanceiro }: Props) {
  const router = useRouter();

  useEffect(() => {
    // Enquanto o useEffect não executa no browser, o HTML com extratoFinanceiro JÁ FOI BAIXADO!
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, []);

  return <div>Saldo confidencial: {extratoFinanceiro.total}</div>;
}`,
    goodSnippet: `// ✓ SEGURO: Middleware na borda/servidor bloqueia a requisição ANTES da renderização
// middleware.ts (Next.js / servidor de borda)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get('session_token')?.value;
  const isRotaSensivel = req.nextUrl.pathname.startsWith('/dashboard') || 
                         req.nextUrl.pathname.startsWith('/financeiro');

  if (isRotaSensivel && !sessionToken) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl); // Bloqueia antes de renderizar qualquer HTML
  }

  return NextResponse.next();
}`,
    pitfall: 'Renderizar dados sensíveis em Server Components sem autenticar os cookies da requisição e supor que "como o cliente redireciona no front, ninguém vai ver".',
    mnemonic: 'A Catraca do Banco: Você não entra no cofre para depois um funcionário perguntar se você tem conta; a identificação acontece antes de girar a catraca da porta.',
    validationTip: 'Abra o DevTools, marque a opção "Disable JavaScript" e tente acessar `/dashboard`. A página deve ser bloqueada no servidor com redirect 307/302 para o login.'
  },

  // 13. PROTEGER COOKIES
  {
    id: 'proteger-cookies-flags',
    order: 13,
    name: '13. Proteger cookies - httpOnly, secure, sameSite',
    category: 'auth-sessao',
    categoryLabel: 'Autenticação & Sessões',
    severity: 'Crítica',
    concept: 'Cookies contendo tokens de sessão ou refresh tokens devem conter obrigatoriamente as três flags de blindagem: `HttpOnly` (inacessível a JavaScript), `Secure` (somente HTTPS) e `SameSite=Lax` ou `Strict` (proteção CSRF).',
    whyItMatters: 'Se o token estiver no `localStorage` ou em cookies sem `HttpOnly`, qualquer script malicioso injetado via XSS (Cross-Site Scripting) consegue executar `document.cookie` e sequestrar a conta do usuário.',
    badSnippet: `// ✕ VULNERÁVEL: Salvar credenciais no localStorage ou cookie sem flags!
// No frontend:
localStorage.setItem('auth_token', token); // 100% vulnerável a qualquer injeção XSS!

// Ou no backend:
res.setHeader('Set-Cookie', 'token=' + token + '; Path=/'); 
// Sem HttpOnly (JavaScript lê), sem Secure (trafega em HTTP aberto), sem SameSite!`,
    goodSnippet: `// ✓ SEGURO: Configuração completa com todas as flags defensivas
res.cookie('session_token', token, {
  httpOnly: true,                 // Impede leitura via document.cookie no JavaScript (anti-XSS)
  secure: process.env.NODE_ENV === 'production', // Exige conexão cifrada HTTPS
  sameSite: 'lax',               // Bloqueia envio em requisições de sites de terceiros (anti-CSRF)
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias de expiração controlada
});`,
    pitfall: 'Usar `sameSite: "none"` sem `secure: true` (a maioria dos navegadores modernos rejeita o cookie) ou usar `sameSite: "none"` sem real necessidade, abrindo brechas para CSRF.',
    mnemonic: 'O Tubo Blindado Submarino: HttpOnly é a armadura de metal contra scripts; Secure é a vedação que só navega em água segura (HTTPS); SameSite é a âncora que só atraca no próprio cais.',
    validationTip: 'Abra o DevTools -> Application -> Cookies e verifique se as colunas "HttpOnly" e "Secure" estão com checks ativos e "SameSite" configurado como "Lax" ou "Strict".'
  },

  // 14. HASH NAS SENHAS
  {
    id: 'hash-senhas-argon2-bcrypt',
    order: 14,
    name: '14. Hash nas senhas - nunca texto plano; infraestrutura e tráfego seguros',
    category: 'auth-sessao',
    categoryLabel: 'Autenticação & Sessões',
    severity: 'Crítica',
    concept: 'Senhas nunca devem ser salvas ou impressas em logs em texto puro; processe-as exclusivamente com funções criptográficas modernas de derivação de chaves lentas (Argon2id ou bcrypt com fator de custo >= 12).',
    whyItMatters: 'Se a base de dados for comprometida, senhas em texto puro ou com hashes rápidos obsoletos (MD5, SHA-1, SHA-256) são decifradas em minutos com ataques em massa de GPU e Rainbow Tables.',
    badSnippet: `// ✕ INADMISSÍVEL: Salvar em texto puro ou usar algoritmos rápidos como MD5/SHA256
import crypto from 'crypto';

// SHA-256 sem salt é computado bilhões de vezes por segundo em GPUs normais:
const hashFraco = crypto.createHash('sha256').update(senha).digest('hex');
await db.user.create({ data: { email, senha: hashFraco } });`,
    goodSnippet: `// ✓ SEGURO: Argon2id (recomendado pelo OWASP) ou bcrypt com salt rounds robusto
import argon2 from 'argon2';
// Ou alternativa clássica: import bcrypt from 'bcrypt'; const h = await bcrypt.hash(s, 12);

export async function gerarHashSenha(senhaPura: string): Promise<string> {
  return await argon2.hash(senhaPura, {
    type: argon2.argon2id, // Resistente a ataques de hardware dedicado (GPU/ASIC)
    memoryCost: 65536,     // 64 MB de memória requerida
    timeCost: 3            // 3 iterações de processamento
  });
}

export async function conferirSenha(hashBanco: string, tentativa: string): Promise<boolean> {
  return await argon2.verify(hashBanco, tentativa);
}`,
    pitfall: 'Esquecer de mascarar senhas em logs de debug (`console.log(req.body)`) ou trafegar requisições de login em rotas sem criptografia de transporte.',
    mnemonic: 'O Moedor de Carne Criptográfico: Depois que o bife passou pelo moedor com tempero (salt e hash lento), é matematicamente impossível reconstruir a carne original.',
    validationTip: 'Inspecione a coluna de senhas no banco de dados: senhas devem ter prefixos de algoritmos seguros (ex: `$argon2id$...` ou `$2b$12$...`) e comprimento seguro.'
  },

  // 15. FORÇAR HTTPS EM TODAS AS ROTAS
  {
    id: 'forcar-https-hsts',
    order: 15,
    name: '15. Forçar HTTPS em todas as rotas & cabeçalho HSTS',
    category: 'infra-rede',
    categoryLabel: 'Infra & Tráfego',
    severity: 'Crítica',
    concept: 'Todo o tráfego HTTP na porta 80 deve ser redirecionado permanentemente (301) para HTTPS na porta 443, com a inclusão mandatória do cabeçalho HTTP Strict Transport Security (HSTS).',
    whyItMatters: 'Sem HTTPS e HSTS, atacantes na mesma rede Wi-Fi (aeroportos, cafés) realizam ataques Man-in-the-Middle (MitM) e interceptam cookies de sessão, credenciais e payloads em texto aberto.',
    badSnippet: `# ✕ INSEGURO: Servidor Web respondendo HTTP plano sem redirecionamento
server {
    listen 80;
    server_name meusite.com;

    # Entrega a aplicação web diretamente em tráfego aberto não criptografado!
    location / {
        proxy_pass http://localhost:3000;
    }
}`,
    goodSnippet: `# ✓ SEGURO: Redirecionamento 301 forçado + HSTS na terminação TLS
server {
    listen 80;
    server_name meusite.com;
    # Redirecionamento permanente para a rota segura HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name meusite.com;

    # Cabeçalho HSTS de 2 anos com subdomínios e lista de pré-carregamento:
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
}`,
    pitfall: 'Deixar imagens, fontes ou scripts sendo carregados via `http://` dentro de páginas HTTPS (Mixed Content), o que quebra o cadeado de segurança nos navegadores.',
    mnemonic: 'O Túnel Fechado: O caminho de terra aberto (HTTP) está com a cancela fechada; todo trânsito é obrigado a passar pelo túnel pressurizado e blindado (HTTPS com HSTS).',
    validationTip: 'Execute: `curl -I http://seu-dominio.com` e valide se recebe `HTTP/1.1 301 Moved Permanently` apontando para `https://` com o cabeçalho `Strict-Transport-Security`.'
  },

  // 16. SECURITY HEADERS (CSP, X-FRAME, ETC)
  {
    id: 'security-headers-csp',
    order: 16,
    name: '16. Adicionar Security Headers (CSP, X-Frame-Options, X-Content-Type-Options)',
    category: 'infra-rede',
    categoryLabel: 'Infra & Tráfego',
    severity: 'Alta',
    concept: 'Configure cabeçalhos HTTP defensivos que ordenam ao navegador do visitante bloquear ataques comuns de injeção, clickjacking e MIME sniffing: CSP, X-Frame-Options, X-Content-Type-Options e Referrer-Policy.',
    whyItMatters: 'Sem CSP e X-Frame-Options, atacantes podem embutir seu site em iframes transparentes sobrepostos para roubar cliques (Clickjacking) ou executar scripts XSS injetados por terceiros.',
    badSnippet: `// ✕ VULNERÁVEL: Servidor entrega respostas sem nenhum cabeçalho de proteção
import express from 'express';
const app = express();

// O site pode ser colocado em um <iframe> de um site malicioso para roubo de cliques!
app.get('/', (req, res) => {
  res.send('<h1>Painel de Controle</h1>');
});`,
    goodSnippet: `// ✓ SEGURO: Uso do pacote Helmet ou headers defensivos nativos
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'trusted-scripts.com'"],
      styleSrc: ["'self'", "'fonts.googleapis.com'"],
      imgSrc: ["'self'", "data:", "https:"],
      frameAncestors: ["'none'"] // Bloqueia Clickjacking impedindo iframes
    }
  },
  crossOriginEmbedderPolicy: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

// Headers gerados automaticamente:
// X-Content-Type-Options: nosniff
// X-Frame-Options: DENY
// Referrer-Policy: strict-origin-when-cross-origin`,
    pitfall: 'Configurar uma CSP permissiva demais contendo "unsafe-inline" ou "unsafe-eval" em scripts, anulando a capacidade do navegador de barrar XSS.',
    mnemonic: 'As Regras de Guarda da Fortaleza: Os headers são o manual de ordens militares entregue aos sentinelas do navegador para barrar disfarces e invasões sorrateiras.',
    validationTip: 'Analise a URL pública da sua aplicação no site gratuito [securityheaders.com](https://securityheaders.com) e busque nota A ou A+.'
  },

  // 17. RATE LIMIT EM ROTAS DE IA E ENDPOINTS SENSÍVEIS
  {
    id: 'rate-limit-ia-endpoints',
    order: 17,
    name: '17. Rate limit em todas as rotas de IA e endpoints públicos sensíveis',
    category: 'defesa-ia',
    categoryLabel: 'Defesa Ativa & IA',
    severity: 'Crítica',
    concept: 'Aplique limitação de taxa de requisições por IP e por usuário em endpoints com alto custo financeiro (chamadas a LLMs, OpenAI, Anthropic, geração de mídia) e sensíveis (login, esqueci a senha, checkout).',
    whyItMatters: 'Rotas de IA cobram por token e consomem processamento pesado. Um loop automatizado malicioso de 5 minutos pode gerar faturas de milhares de dólares nos provedores e derrubar a infraestrutura.',
    badSnippet: `// ✕ DESASTROSO: Endpoint chamando API de IA sem limitação de taxa!
app.post('/api/ia/resumo', async (req, res) => {
  // Qualquer bot pode disparar 1.000 requisições por segundo e falir a empresa!
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: req.body.texto }]
  });
  res.json({ resposta: response.choices[0].message.content });
});`,
    goodSnippet: `// ✓ SEGURO: Rate limiting distribuído com Upstash Redis e algoritmo de Sliding Window
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimitIa = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 m'), // Máximo de 5 chamadas de IA por minuto por IP
  analytics: true
});

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? 'anon';
  const { success, limit, remaining, reset } = await ratelimitIa.limit(\`ia_\${ip}\`);

  if (!success) {
    return new Response(JSON.stringify({ error: 'Muitas requisições. Aguarde um minuto.' }), {
      status: 429,
      headers: {
        'Retry-After': reset.toString(),
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': '0'
      }
    });
  }

  // Prossegue com a chamada de IA protegida contra estouro de orçamento
  return processarChamadaIa(req);
}`,
    pitfall: 'Fazer rate limiting em memória volátil de um único processo Node.js em arquiteturas Serverless (Vercel, AWS Lambda) ou múltiplos contêineres Docker, onde o estado zera a cada requisição.',
    mnemonic: 'As Fichas da Montanha-Russa: Cada visitante só ganha 5 fichas por minuto; se pudesse usar ilimitado, a fila travaria e o brinquedo quebraria de sobrecarga.',
    validationTip: 'Rode um loop de teste via terminal: `for i in {1..10}; do curl -i https://sua-api.com/api/ia; done` e confira se a partir da 6ª tentativa retorna HTTP 429 Too Many Requests.'
  },

  // 18. BOT PROTECTION EM FORMULÁRIOS PÚBLICOS E LOGIN
  {
    id: 'bot-protection-turnstile',
    order: 18,
    name: '18. Bot protection em formulários públicos e login/cadastro',
    category: 'defesa-ia',
    categoryLabel: 'Defesa Ativa & IA',
    severity: 'Alta',
    concept: 'Formulários públicos (cadastro, login, contato, newsletters) devem conter defesas ativas contra automação maliciosa, combinando Cloudflare Turnstile ou reCAPTCHA invisível com campos Honeypot.',
    whyItMatters: 'Bots de Credential Stuffing testam milhões de combinações de senhas vazadas em telas de login, criam contas falsas em massa e inflam listas de email com spam prejudicando a reputação de envio do domínio.',
    badSnippet: `<!-- ✕ VULNERÁVEL: Formulário completamente exposto a scripts de bot -->
<form action="/api/login" method="POST">
  <input type="email" name="email" required />
  <input type="password" name="senha" required />
  <button type="submit">Entrar</button>
</form>
<!-- Spiders podem disparar milhares de tentativas de força bruta sem nenhum atrito! -->`,
    goodSnippet: `<!-- ✓ SEGURO: Honeypot invisível no front + Cloudflare Turnstile com validação server -->
<form id="login-form">
  <!-- Campo Honeypot: invisível para usuários legítimos, mas preenchido por bots -->
  <div style="display: none;" aria-hidden="true">
    <input type="text" name="b_honeypot_campo" tabindex="-1" autocomplete="off" />
  </div>

  <input type="email" name="email" required />
  <input type="password" name="senha" required />

  <!-- Cloudflare Turnstile: verificação inteligente e não intrusiva -->
  <div class="cf-turnstile" data-sitekey="SUA_CHAVE_PUBLICA_TURNSTILE"></div>

  <button type="submit">Entrar</button>
</form>

<script>
// No Backend:
// 1. Se req.body.b_honeypot_campo estiver preenchido -> Descarta silenciosamente (é bot).
// 2. Valida o token do Turnstile com a Cloudflare Siteverify API antes de processar login.
</script>`,
    pitfall: 'Utilizar CAPTCHAs antigos e frustrantes com letras distorcidas que afastam clientes reais, em vez de defesas modernas sem fricção como Cloudflare Turnstile.',
    mnemonic: 'O Alçapão Invisível do Honeypot: O bot guloso tenta preencher todos os campos do formulário e cai no alçapão invisível antes de alcançar a porta principal.',
    validationTip: 'Envie uma requisição POST direta sem o token de verificação ou preenchendo o campo honeypot e confirme que o servidor rejeita o processamento.'
  },

  // 19. RESTRINGIR UPLOADS
  {
    id: 'restringir-uploads-validacao',
    order: 19,
    name: '19. Restringir uploads - validar tipo real (magic bytes) e tamanho do arquivo',
    category: 'backend-dados',
    categoryLabel: 'Validação & Backend',
    severity: 'Crítica',
    concept: 'Todo arquivo enviado pelo usuário deve ser validado no servidor quanto ao tamanho máximo permitido e tipo MIME real através de magic bytes (assinatura binária do cabeçalho), nunca confiando na extensão do arquivo ou no header Content-Type do navegador.',
    whyItMatters: 'Um invasor pode renomear scripts maliciosos (.php, .js, executáveis ou SVGs com scripts XSS embutidos) para .jpg ou enviar arquivos gigantescos de vários gigabytes para esgotar o disco e derrubar o servidor por negação de serviço (DoS).',
    badSnippet: `// ✕ VULNERÁVEL: Validação ingênua baseada em extensão ou Content-Type do navegador!
app.post('/api/upload-avatar', upload.single('avatar'), async (req, res) => {
  // Confia no nome enviado pelo cliente ou no header Content-Type (facilmente falsificáveis):
  if (!req.file.originalname.endsWith('.png') && !req.file.originalname.endsWith('.jpg')) {
    return res.status(400).send('Apenas imagens permitidas!');
  }
  // Salva o arquivo diretamente com o nome original do usuário na pasta pública:
  // Invasor enviou: "malware.php.png" ou SVG com <script>alert(document.cookie)</script>!
  await fs.promises.writeFile(\`./public/uploads/\${req.file.originalname}\`, req.file.buffer);
  res.json({ url: \`/uploads/\${req.file.originalname}\` });
});`,
    goodSnippet: `// ✓ SEGURO: Verificação de Magic Bytes no buffer binário + tamanho estrito + UUID aleatório
import { fileTypeFromBuffer } from 'file-type';
import crypto from 'crypto';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // Limite rigoroso de 5MB
const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

app.post('/api/upload-avatar', upload.single('avatar'), async (req, res) => {
  if (!req.file || req.file.size > MAX_FILE_SIZE) {
    return res.status(400).json({ error: 'Arquivo ausente ou excede o limite de 5MB.' });
  }

  // Lê a assinatura binária real (magic bytes) do início do buffer:
  const detectedType = await fileTypeFromBuffer(req.file.buffer);
  if (!detectedType || !ALLOWED_MIME_TYPES.has(detectedType.mime)) {
    return res.status(400).json({ error: 'Tipo de arquivo inválido ou disfarçado.' });
  }

  // Gera nome aleatório único (UUID) e extensão segura pelo tipo detectado:
  const safeFilename = \`\${crypto.randomUUID()}.\${detectedType.ext}\`;
  
  // Armazena em S3/Cloud Storage privado sem permissão de execução de scripts:
  await uploadToPrivateBucket(safeFilename, req.file.buffer, detectedType.mime);
  res.json({ filename: safeFilename });
});`,
    pitfall: 'Permitir upload de arquivos SVG sem sanitização profunda com DOMPurify. Arquivos SVG são XMLs e podem conter tags <script> prontas para roubar sessões via XSS armazenado quando abertos no navegador!',
    mnemonic: 'O Raio-X da Bagagem: Você não confia na etiqueta que o passageiro colou na mala ("frágil - roupas"); você passa a bagagem no raio-X binário (magic bytes) e confere o peso na balança antes de autorizar o embarque.',
    validationTip: 'Crie um arquivo de texto com conteúdo "<?php phpinfo(); ?>" renomeado para "foto.jpg" e tente enviá-lo; o servidor deve rejeitar com erro 400 por não possuir os magic bytes de JPEG (FF D8 FF).'
  },

  // 20. TRIM RESPOSTAS DA API
  {
    id: 'trim-respostas-api-minimization',
    order: 20,
    name: '20. Trim respostas da API - nunca devolver mais dado do que a tela precisa (Data Minimization)',
    category: 'backend-dados',
    categoryLabel: 'Validação & Backend',
    severity: 'Alta',
    concept: 'Aplique o princípio da Minimização de Dados (LGPD/GDPR e OWASP API3): toda rota da API deve filtrar seu payload de resposta através de DTOs ou projeções explícitas de banco, devolvendo estritamente os campos necessários para aquela tela.',
    whyItMatters: 'Fazer res.json(user) ou SELECT * devolve colunas internas como password_hash, cpf, internal_notes, stripe_customer_id ou tokens de recuperação de senha no JSON, expondo dados sigilosos na aba Network do navegador de qualquer usuário curioso.',
    badSnippet: `// ✕ VULNERÁVEL: Devolver a entidade inteira do banco de dados (Over-fetching de dados)
app.get('/api/usuarios/:id', async (req, res) => {
  // Busca todas as colunas: id, nome, email, senha_hash, cpf, tentativas_login, token_recuperacao
  const usuario = await db.usuario.findUnique({ where: { id: req.params.id } });
  
  // VAZAMENTO! O JSON expõe senha_hash, CPF e dados bancários no browser!
  res.json(usuario);
});`,
    goodSnippet: `// ✓ SEGURO: Projeção seletiva no banco (select) ou DTO explícito tipado
import { z } from 'zod';

// DTO explícito para resposta pública de perfil:
const PublicUserProfileDto = z.object({
  id: z.string().uuid(),
  nome: z.string(),
  avatarUrl: z.string().nullable(),
  criadoEm: z.date()
});

app.get('/api/usuarios/:id', async (req, res) => {
  // 1. O banco seleciona APENAS as colunas necessárias (economia de banda e segurança):
  const usuario = await db.usuario.findUnique({
    where: { id: req.params.id },
    select: { id: true, nome: true, avatarUrl: true, criadoEm: true }
  });

  if (!usuario) return res.status(404).json({ error: 'Não encontrado' });

  // 2. Garante via schema que nenhum dado extra vaze por engano:
  const safeResponse = PublicUserProfileDto.parse(usuario);
  res.json(safeResponse);
});`,
    pitfall: 'Depender do frontend para "esconder" os campos. O front recebe o JSON completo com CPF e saldo e não exibe na tela, mas qualquer usuário que apertar F12 verá todos os dados vazados na aba Network.',
    mnemonic: 'O Garçom que Entrega a Comanda Certa: O garçom leva para a mesa apenas o prato pedido pelo cliente, nunca a pasta com as notas fiscais e a declaração de imposto de renda do restaurante.',
    validationTip: 'Abra o DevTools -> Network (F12), inspecione a resposta bruta das chamadas fetch e garanta que não existam campos como hash, token, cpf, role interna ou chaves de clientes.'
  },

  // 21. EVITAR VAZAMENTO EM ERROS E LOGS
  {
    id: 'evitar-vazamento-erros-logs',
    order: 21,
    name: '21. Evitar vazamento em erros & logs - zero stack traces, keys ou dados internos',
    category: 'infra-rede',
    categoryLabel: 'Infra & Tráfego',
    severity: 'Alta',
    concept: 'Em ambiente de produção, mensagens de erro enviadas ao cliente HTTP devem ser genéricas e opacas (com identificador de correlação como requestId), enquanto logs internos devem passar por sanitização automática para mascarar senhas, tokens e chaves de API.',
    whyItMatters: 'Exibir stack traces detalhados (Error at /var/app/src/db.ts:42, PostgreSQL error 42P01) entrega a invasores versões de bibliotecas, caminhos do sistema operacional, estrutura de tabelas e nomes de funções (OWASP Security Misconfiguration).',
    badSnippet: `// ✕ PERIGOSO: Middleware de erro que envia a exceção bruta com stack trace para o cliente!
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Vaza caminhos do servidor (/home/ubuntu/app/...), versões e query SQL quebrada:
  console.log('Erro na requisição:', req.headers, req.body, err); // Pode logar senhas!
  res.status(500).json({
    mensagem: err.message,
    stack: err.stack, // CATASTRÓFICO EM PRODUÇÃO!
    detalhes: err
  });
});`,
    goodSnippet: `// ✓ SEGURO: Handler global com requestId, log sanitizado e mensagem opaca em produção
import crypto from 'crypto';

// Middleware global de tratamento de exceções:
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  const errorId = crypto.randomUUID(); // Código de rastreio para o suporte

  // Log interno detalhado (com mascaramento de dados sensíveis):
  logger.error({
    errorId,
    message: err instanceof Error ? err.message : 'Erro desconhecido',
    stack: err instanceof Error ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method
  });

  // Ao cliente externo em produção: APENAS mensagem amigável e código de rastreio:
  res.status(500).json({
    error: 'Ocorreu uma instabilidade interna. Nossa equipe já foi notificada.',
    code: 'INTERNAL_SERVER_ERROR',
    requestId: errorId
  });
});`,
    pitfall: 'Fazer console.log(req.body) em endpoints de login ou checkout. Se esses logs forem despachados para serviços na nuvem (Datadog, CloudWatch, Sentry), as senhas e cartões ficam gravados em texto puro nos servidores de monitoramento.',
    mnemonic: 'A Janela de Vidro Fumê: O cliente vê apenas a placa elegante "Em Manutenção - Protocolo #9182"; ele nunca vê os fios desencapados e o maquinário quebrado nos bastidores da fábrica.',
    validationTip: 'Force um erro na API (enviando um UUID malformado para uma rota de banco) e confira se a resposta HTTP contém apenas mensagem genérica e requestId, sem qualquer linha de stack trace.'
  },

  // 22. SUPPLY CHAIN & TYPOSQUATTING
  {
    id: 'supply-chain-typosquatting',
    order: 22,
    name: '22. Checar pacotes antes de instalar (Supply Chain & Typosquatting em npm/pip)',
    category: 'secrets',
    categoryLabel: 'Secrets & Chaves de API',
    severity: 'Alta',
    concept: 'Antes de adicionar qualquer biblioteca de terceiros (npm install ou pip install), audite a autenticidade do pacote verificando grafia exata contra ataques de typosquatting (nomes quase idênticos a pacotes famosos), número de downloads semanais, reputação dos mantenedores e histórico no Socket.dev/Snyk.',
    whyItMatters: 'Atacantes criam pacotes com nomes similares (ex: cross-env vs crossenv, colors vs colorz, lodash vs lodas-js) contendo scripts postinstall maliciosos que roubam automaticamente variáveis de ambiente (.env), chaves SSH e credenciais no momento da instalação.',
    badSnippet: `# ✕ IMPRUDENTE: Instalar pacote de memória sem conferir o nome exato ou estatísticas
npm install recat # Digitou errado "react"! Pacote clonado com script ladrão de .env!

# Ou instalar biblioteca recém-criada sem downloads para uma tarefa simples:
npm install stripe-fast-payment-helper # Criado ontem, 12 downloads, pacote malicioso!
# O script "postinstall" executa com privilégios plenos da sua máquina de desenvolvimento!`,
    goodSnippet: `# ✓ SEGURO: Desabilitar scripts arbitrários por padrão + ferramentas de auditoria
# 1. Trave a execução cega de scripts com --ignore-scripts em dependências novas:
npm install pacote-verificado --ignore-scripts

# 2. Inspecione o pacote via Socket.dev ou npm view antes de confirmar:
npm view express author maintainers repository dist-tags

# 3. Use auditoria de vulnerabilidades de dependências no pipeline CI/CD:
npm audit --audit-level=high

# 4. Trave versões exatas no package.json (sem ^ ou ~ descontrolados) e commit do package-lock.json
npm ci # Em ambientes CI/CD, use "npm ci" para garantir lockfile estrito e imutável`,
    pitfall: 'Copiar e colar comandos de fóruns, tutoriais desatualizados ou gerados por IA sem checar se o pacote sugerido realmente existe no registro oficial ou se é uma alucinação registrada por atacantes (Hallucinated Package Takeover).',
    mnemonic: 'O Remédio sem Bula na Feira: Você não ingere um comprimido vendido na calçada só porque a caixa parece com a da aspirina; você confere o laboratório oficial e a procedência do lacre.',
    validationTip: 'Configure ferramentas como Socket.dev no GitHub ou rode "npm audit" em seu projeto; adicione "engine-strict": true e rode "npm ci" no Docker e nas esteiras de deploy.'
  },

  // 23. CRIPTOGRAFIA DE DADOS SENSÍVEIS ARMAZENADOS
  {
    id: 'criptografia-dados-armazenados-tokens',
    order: 23,
    name: '23. Criptografia em dados sensíveis armazenados (Tokens de terceiros, chaves OAuth)',
    category: 'banco-rls',
    categoryLabel: 'Banco de Dados & RLS',
    severity: 'Crítica',
    concept: 'Tokens de integração de terceiros (como Access Tokens do Google OAuth, Stripe Secret Keys de clientes, Webhook Secrets ou credenciais de integrações) devem ser criptografados em repouso (at-rest) com algoritmos autenticados (AES-256-GCM ou pgcrypto) antes de serem gravados no banco de dados.',
    whyItMatters: 'Se um dump do banco vazar ou um backup for exposto acidentalmente, tokens salvos em texto plano concedem a criminosos acesso imediato e irrestrito às contas do Google Workspace, canais de comunicação, repositórios de código ou gateways de pagamento dos seus clientes.',
    badSnippet: `-- ✕ VULNERABILIDADE GRAVE: Guardar tokens de terceiros em texto plano no banco!
CREATE TABLE integracoes_usuarios (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  servico TEXT, -- 'google_drive', 'mercadopago'
  access_token TEXT NOT NULL, -- TEXTO PURO! Vaza se o banco sofrer dump!
  refresh_token TEXT NOT NULL -- Se vazar, atacante tem acesso eterno à conta do cliente!
);`,
    goodSnippet: `// ✓ SEGURO: Criptografia simétrica autenticada com AES-256-GCM antes de persistir
import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
// MASTER_ENCRYPTION_KEY vem de variável de ambiente segura (32 bytes / 256 bits):
const MASTER_KEY = Buffer.from(process.env.DB_ENCRYPTION_KEY!, 'hex');

export function encryptSensitiveToken(plainText: string): string {
  const iv = crypto.randomBytes(12); // Vetor de inicialização de 96 bits recomendado
  const cipher = crypto.createCipheriv(ALGORITHM, MASTER_KEY, iv);
  
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex'); // Tag de autenticação anti-adulteração

  // Formato seguro: iv:authTag:encrypted
  return \`\${iv.toString('hex')}:\${authTag}:\${encrypted}\`;
}

export function decryptSensitiveToken(cipherPayload: string): string {
  const [ivHex, authTagHex, encryptedData] = cipherPayload.split(':');
  const decipher = crypto.createDecipheriv(ALGORITHM, MASTER_KEY, Buffer.from(ivHex, 'hex'));
  decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));

  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}`,
    pitfall: 'Confundir Hash com Criptografia. Senhas recebem Hash unidirecional (Argon2id/bcrypt) porque nunca precisam ser revertidas. Tokens de APIs de terceiros precisam ser descriptografados para você autenticar requisições; portanto, exigem Criptografia Bidirecional com chave mestra segura (AES-256-GCM).',
    mnemonic: 'O Diário Trancado a Sete Chaves: Mesmo que alguém consiga roubar o diário da gaveta (dump do banco), as páginas estão escritas em código cifrado indecifrável sem a chave dourada (chave mestra de criptografia).',
    validationTip: 'Abra a tabela de integrações no seu gerenciador de banco (DBeaver, Supabase Studio, pgAdmin) e verifique a coluna de tokens: ela deve conter apenas strings cifradas compostas por hash/IV (iv:authTag:encrypted), nunca o token puro legível.'
  },

  // 24. AUDITORIA PRÉ-DEPLOY DE RLS E POLICIES
  {
    id: 'auditoria-pre-deploy-rls-query',
    order: 24,
    name: '24. Antes do deploy - checar RLS e policies de todas as tabelas via query de auditoria',
    category: 'banco-rls',
    categoryLabel: 'Banco de Dados & RLS',
    severity: 'Crítica',
    concept: 'Antes de aprovar qualquer migração ou deploy em produção, execute um script automatizado de auditoria SQL no PostgreSQL que liste e valide se todas as tabelas do schema público possuem RLS ativado e políticas não triviais associadas.',
    whyItMatters: 'É muito comum um desenvolvedor adicionar uma tabela em uma migração de última hora e esquecer de aplicar ALTER TABLE ... ENABLE ROW LEVEL SECURITY;. Uma query automatizada na esteira de CI/CD barra o deploy caso detecte uma única tabela sensível desprotegida.',
    badSnippet: `# ✕ ARRISCADO: Confiar na memória da equipe ou em checklists manuais sem automação
git merge feature-novos-leads
npm run build
vercel --prod
# Ninguém checou o banco de produção!
# A tabela "novos_leads" subiu sem RLS e ficou aberta para a anon_key por 3 semanas!`,
    goodSnippet: `-- ✓ SEGURO: Script oficial de auditoria SQL pré-deploy (rode no PostgreSQL / Supabase)
-- 1. Verifica se existe ALGUMA tabela pública SEM Row Level Security:
SELECT 
  schemaname, 
  tablename, 
  rowsecurity AS rls_ativo
FROM pg_tables 
WHERE schemaname = 'public' 
  AND rowsecurity = false;
-- SE RETORNAR QUALQUER LINHA: BARRAR O DEPLOY IMEDIATAMENTE!

-- 2. Verifica tabelas com RLS habilitado mas que NÃO POSSUEM NENHUMA POLÍTICA:
SELECT 
  t.tablename 
FROM pg_tables t
LEFT JOIN pg_policies p ON t.tablename = p.tablename AND t.schemaname = p.schemaname
WHERE t.schemaname = 'public' 
  AND t.rowsecurity = true 
  AND p.policyname IS NULL;

-- 3. Verifica se alguma política permissiva perigosa ("qual = true") existe em tabelas sensíveis:
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  cmd, 
  qual 
FROM pg_policies 
WHERE schemaname = 'public' 
  AND qual = 'true';`,
    pitfall: 'Achar que só porque você roda os testes do backend em SQLite ou Postgres local os RLS policies foram validados. Migrações locais frequentemente usam superusuários (postgres) que ignoram RLS por padrão a menos que FORCE ROW LEVEL SECURITY esteja ativo.',
    mnemonic: 'O Check de Voo da Decolagem: Nenhum piloto de avião decola confiando na sorte; ele passa pelo checklist instrumental obrigatório na cabine antes de acelerar na pista de produção.',
    validationTip: 'Integre a query de auditoria em um teste automatizado ou script npm ("npm run audit:db") que retorne exit code 1 caso a consulta encontre tabelas com rowsecurity = false.'
  }
];
