# Manual de Auditoria do Sistema — Playbook de Engenharia & Prompts Especializados

> **Origem:** Conversa e documentação técnica transferida do projeto Maestro para o **Guia do Programador**.
> **Foco:** Rastreabilidade, RBAC/ABAC, Qualidade Estática (.NET/C#), Princípios SOLID, Imutabilidade em DDD e Prevenção de Regressão de Deleção em Cascata.

---

## 1. O que os Principais Livros Dizem Sobre Auditoria de Aplicações

1. **Martin Fowler (*Patterns of Enterprise Application Architecture* e *Refactoring*)**:
   - **Fronteira Domínio vs Persistência**: A auditoria deve checar se a lógica de negócio está vazando para controllers/telas (*Transaction Script* desorganizado) em vez de residir em serviços e entidades coesas.
   - **Rastreabilidade**: Qualquer operação que altere estado contábil ou financeiro deve ter *Audit Trail* ou registro de evento imutável.

2. **Eric Evans & Vaughn Vernon (*Domain-Driven Design* / *Implementing DDD*)**:
   - **Limites de Agregados e Invariantes**: Uma entidade filha nunca deve ser alterada ou excluída sem passar pela Raiz do Agregado (*Aggregate Root*).
   - **Consistência Transacional**: Se um controller puder alterar um item de pedido diretamente sem que o pedido recalcule seu total ou valide seu status, a invariante de domínio foi violada.

3. **Robert C. Martin ("Uncle Bob" - *Clean Architecture* e *Clean Code*)**:
   - **Direção de Dependência**: O núcleo do negócio nunca depende de bibliotecas externas, frameworks ou detalhes de banco.
   - **Responsabilidade Única (SRP)**: Controllers são portas de entrada HTTP e não devem conter regras de cálculo ou persistência direta.

4. **OWASP (*ASVS*) & Michael Howard (*Writing Secure Code*)**:
   - **Controle de Acesso Fail-Closed**: A segurança deve falhar fechada. Ausência de atributo de permissão deve negar o acesso por padrão.
   - **Validação de Anti-CSRF e IDOR/BOLA**: Mutações precisam validar o token de formulário e garantir que o ID informado na requisição pertence ao tenant/empresa do usuário autenticado.

---

## 2. Seção A — O Que Deve Ser Auditado (Prompts Prontos por Item)

---

### Tarefa 1: Rastreabilidade (Audit Trail / Event Sourcing)

* **Objetivo:** Garantir que operações com impacto financeiro, contábil, fiscal ou de segurança gerem rastro auditável imutável, identificando quem, quando, o que mudou e o motivo.
* **Critérios de Reprovação (Violações):**
  - Mutações de estado (Create, Update, Delete, Cancelar, Estornar) sem gravar log de auditoria (`AuditLog`).
  - Atualizações em dados sensíveis (preços, limites de crédito, descontos, alíquotas) sem registrar valor anterior vs valor novo.
  - Omissão do ID do usuário responsável (`UserId`), IP ou data/hora UTC.
* **Prompt Especializado:**

```markdown
Atue como Auditor de Segurança e Compliance de Software.
Analise os arquivos do fluxo fornecido: [INSERIR ARQUIVOS/SERVIÇOS]

OBJETIVO: Auditar a rastreabilidade (Audit Trail) de operações sensíveis.

CRITÉRIOS DE AVALIAÇÃO:
1. Identifique todas as mutações de estado (Create, Update, Delete, Cancelar, Estornar).
2. Verifique se há gravação explícita de log de auditoria (ex: tabela AuditLog ou evento de domínio).
3. Verifique se o log armazena: Id do usuário autenticado, data/hora UTC, entidade afetada, Id do registro e valores (antes vs depois quando aplicável).
4. Verifique se operações com bypass de regras (ex: autorização especial de desconto ou liberação manual) registram o usuário que autorizou.

O QUE APONTAR COMO DEFEITO:
- Qualquer mutação de dados críticos sem rastro gravado.
- Gravação de logs genéricos sem identificação de quem executou ou sem os dados modificados.
- Truncamento silencioso de dados de log ou ausência de tratamento em caso de falha de auditoria.

Retorne os apontamentos listando: Arquivo, Linha, Método, Gravidade (Crítica/Alta/Média) e Ação Corretiva.
```

---

### Tarefa 2: Vazamento de Lógica de Negócio para Controllers ou Telas

* **Objetivo:** Assegurar que controllers ajam estritamente como adaptadores HTTP e que views Razor apenas renderizem dados, sem conter regras de negócio.
* **Critérios de Reprovação (Violações):**
  - Controllers chamando `_context.Database.ExecuteSqlRaw`, `_context.Add()`, `_context.Remove()` ou `_context.SaveChangesAsync()`.
  - Validações de negócio complexas feitas dentro do Controller com `ModelState.AddModelError` em vez de estarem no Serviço ou Entidade.
  - Controllers alterando status diretamente (ex: `pedido.Status = EStatus.Aprovado;`).
  - Telas Razor (`.cshtml`) com blocos `@functions`, cálculos matemáticos ou queries de banco.
* **Prompt Especializado:**

```markdown
Atue como Arquiteto de Software especialista em Clean Architecture e Vertical Slices.
Analise os seguintes Controllers e Views: [INSERIR ARQUIVOS]

OBJETIVO: Identificar vazamento de lógica de negócio em camadas de apresentação/HTTP.

CRITÉRIOS DE AVALIAÇÃO:
1. Controllers executando chamadas de escrita no banco (_context.SaveChangesAsync, Add, Remove, Update).
2. Controllers executando transações (_context.Database.BeginTransaction).
3. Controllers contendo regras de validação de negócio (ex: cálculo de saldo, validação de regras de faturamento, mudança de status de entidades).
4. Views (.cshtml) contendo cálculos matemáticos de negócio, condicionais complexas que deveriam vir pré-calculadas em DTOs/ViewModels, ou chamadas diretas a repositórios/banco.

O QUE APONTAR COMO DEFEITO:
- Qualquer persistência de escrita disparada diretamente pelo Controller.
- Regra de negócio implementada inline no Controller que impeça reuso ou testes unitários sem mockar o Controller.

Retorne: Arquivo, Linha, Trecho Infrator, Explicação da Violação e Como mover para o Service/Domain.
```

---

### Tarefa 3: Limites dos Agregados e Invariantes de Domínio (DDD)

* **Objetivo:** Garantir a consistência transacional e de estado através de agregados do DDD, impedindo que entidades filhas sejam manipuladas sem passar pela raiz do agregado.
* **Critérios de Reprovação (Violações):**
  - Buscar entidade filha no `DbContext` e alterá-la isoladamente sem carregar a raiz para validar invariantes e totais.
  - Permitir salvar estados inválidos (ex: lançamento contábil em que Débito != Crédito, nota fiscal sem destinatário).
* **Prompt Especializado:**

```markdown
Atue como Especialista em Domain-Driven Design (DDD).
Analise o modelo e os serviços deste agregado: [INSERIR ARQUIVOS DA FEATURE/AGREGADO]

OBJETIVO: Auditar os limites do agregado e a proteção de suas invariantes.

CRITÉRIOS DE AVALIAÇÃO:
1. Identifique qual é a Raiz do Agregado (Aggregate Root) e quais são suas entidades filhas e Value Objects.
2. Verifique se entidades filhas estão sendo persistidas ou alteradas diretamente no banco sem passar pelos métodos da Raiz do Agregado.
3. Inspecione se os métodos da Raiz garantem todas as invariantes antes de mudar de estado (ex: "um pedido faturado não pode ter itens adicionados", "a soma das parcelas deve ser exatamente igual ao valor líquido").
4. Verifique se o Aggregate Root mantém consistência imediata dentro de sua fronteira transacional.

O QUE APONTAR COMO DEFEITO:
- Serviços ou Controllers que injetam o DbSet da entidade filha para mutação direta (ex: _context.ItensPedido.Remove(item)).
- Invariantes de negócio delegadas para o banco disparar exceção em vez de serem validadas e protegidas pela raiz do agregado.

Retorne: Arquivo, Linha, Invariante Quebrada, Risco de Corrupção de Estado e Refatoração Recomendada.
```

---

### Tarefa 4: Controllers com Regras de Cálculo

* **Objetivo:** Assegurar que nenhum cálculo aritmético de negócio (impostos, descontos, juros, rateios, comissões, margens, saldos) seja executado na camada de Controller.
* **Critérios de Reprovação (Violações):**
  - Controllers aplicando operadores aritméticos (`*`, `/`, `+`, `-`, `Math.Round`) sobre valores monetários ou quantidades.
  - Controllers calculando totais de itens antes de enviar para salvar.
* **Prompt Especializado:**

```markdown
Atue como Revisor de Código Sênior focado em Separação de Preocupações (SoC).
Analise os seguintes Controllers: [INSERIR ARQUIVOS]

OBJETIVO: Auditar a presença de regras de cálculo aritmético de negócio no Controller.

CRITÉRIOS DE AVALIAÇÃO:
1. Procure por qualquer operação aritmética (+, -, *, /, Math.Round, Math.Floor) aplicada sobre valores fiscais, contábeis, estoque ou monetários.
2. Identifique regras de precificação, cálculo de parcelamento, apuração de tributos ou rateio de valores feitas inline dentro de actions.
3. Valide se os valores recebidos da requisição estão sendo apenas validados e repassados como DTOs para o motor de cálculo/serviço correspondente.

O QUE APONTAR COMO DEFEITO:
- Qualquer cálculo de negócio feito na Action do Controller, mesmo que simples (ex: valorTotal = itens.Sum(x => x.Preco * x.Qtd)).

Retorne: Arquivo, Linha, Ação/Método, Código Infrator e Sugestão de encapsulamento no Domain Service ou Rich Model.
```

---

### Tarefa 5: Autorização e Controle de Acesso (RBAC/ABAC, CSRF, IDOR/BOLA)

* **Objetivo:** Blindar o sistema contra acessos indevidos, execução de ações não autorizadas, bypass de tokens de formulário e manipulação de IDs de registros de terceiros.
* **Critérios de Reprovação (Violações):**
  - Controllers ou actions sem `[Authorize]` ou com actions públicas por esquecimento.
  - Actions POST/PUT/DELETE sem `[RequirePermission("...")]` ou sem `[ValidateAntiForgeryToken]`.
  - Códigos de permissão declarados que não constam no seed/catálogo central.
  - Queries que recebem ID e executam mutações sem conferir a empresa/tenant do usuário logado (BOLA/IDOR).
* **Prompt Especializado:**

```markdown
Atue como Especialista em Segurança de Aplicações (AppSec / OWASP ASVS).
Analise os seguintes arquivos de Controller, Views e Mapeamentos: [INSERIR ARQUIVOS]

OBJETIVO: Auditar RBAC, CSRF e vulnerabilidades de autorização direta a objetos (IDOR/BOLA).

CRITÉRIOS DE AVALIAÇÃO:
1. Verifique se a classe Controller ou as Actions possuem [Authorize] e [RequirePermission("modulo.acao")].
2. Verifique se todas as ações de mutação (POST, PUT, DELETE) possuem validação contra CSRF ([ValidateAntiForgeryToken]).
3. Se houver código de permissão em [RequirePermission], verifique se ele existe no catálogo central de permissões da aplicação.
4. Identifique se ações que recebem Id verificam se a entidade pertence à Empresa/Tenant do usuário autenticado (BOLA/IDOR).
5. Compare com as Views correspondentes: botões protegidos condicionalmente na tela possuem a barreira equivalente obrigatória no backend?

O QUE APONTAR COMO DEFEITO:
- Action de mutação sem RequirePermission ou sem ValidateAntiForgeryToken.
- Permissão declarada no Controller que não existe no seed/catálogo de permissões.
- Consulta de mutação que confia cegamente no ID vindo do cliente sem checar tenant ou dono.

Retorne: Arquivo, Linha, Ação HTTP, Tipo de Vulnerabilidade, Impacto e Código de Correção.
```

---

### Tarefa 6: Auditoria dos Princípios SOLID

* **Objetivo:** Identificar acoplamentos indevidos, classes sobrecarregadas, quebras de abstração e fragilidades de manutenção nos padrões orientados a objetos.
* **Critérios de Reprovação (Violações):**
  - **S:** Classes "God Object" que misturam regras de múltiplos domínios ou regras de negócio com I/O de infraestrutura.
  - **O:** Blocos de `switch (tipo)` ou `if-else` encadeados que exigem edição a cada nova variação de negócio.
  - **L:** Subclasses ou implementações que lançam `NotImplementedException` ou quebram o contrato esperado da base.
  - **I:** Interfaces com dezenas de métodos onde consumidores usam apenas 1 ou 2.
  - **D:** Instanciação direta (`new HttpClient()`, `new ClosedXML()`) dentro de regras de negócio em vez de injeção de dependências.
* **Prompt Especializado:**

```markdown
Atue como Arquiteto de Software Sênior.
Analise a estrutura das seguintes classes e interfaces: [INSERIR ARQUIVOS]

OBJETIVO: Auditar estritamente a conformidade com os princípios SOLID (S, O, L, I, D).

CRITÉRIOS DE AVALIAÇÃO:
- [S] Identifique classes "God Object" que misturam regras de múltiplos domínios ou misturam regras de negócio com I/O de infraestrutura.
- [O] Procure estruturas switch-case ou if-else encadeados que precisarão ser editados sempre que uma nova variação de negócio/tipo for criada.
- [L] Procure por métodos herdados/implementados que lançam NotImplementedException ou enfraquecem as pré-condições da interface/classe base.
- [I] Identifique interfaces com excesso de métodos onde os consumidores utilizam apenas um subconjunto reduzido.
- [D] Identifique instanciação direta (palavra-chave 'new') de classes de infraestrutura, utilitários externos ou acesso a disco/rede dentro das regras de negócio.

O QUE APONTAR COMO DEFEITO:
- Violações claras que gerem acoplamento rígido, impossibilidade de testes unitários ou fragilidade arquitetural.

Retorne: Princípio Violado, Arquivo, Linha, Diagnóstico da Violação e Estratégia de Refatoração.
```

---

### Tarefa 7: Auditoria de Imutabilidade e Invariantes de Estado

* **Objetivo:** Proteger o modelo de domínio corporativo contra corrupção acidental de dados, garantindo que o estado só possa ser modificado através de métodos explícitos de negócio e que registros históricos não sofram mutação.
* **Critérios de Reprovação (Violações):**
  - Entidades com setters públicos abertos (`public decimal Saldo { get; set; }`).
  - Coleções de navegação expostas como `public List<Item> Itens { get; set; }` em vez de `IReadOnlyList<Item>`.
  - Comandos de UPDATE alterando dados de fatos contábeis/fiscais históricos em vez de estorno.
* **Prompt Especializado:**

```markdown
Atue como Especialista em Modelagem de Domínio Rico e DDD.
Analise as entidades e serviços anexos: [INSERIR ARQUIVOS DE MODELOS E SERVIÇOS]

OBJETIVO: Auditar a imutabilidade do modelo de domínio e proteção contra corrupção de estado.

CRITÉRIOS DE AVALIAÇÃO:
1. Inspecione as propriedades das entidades: possuem setters públicos ('public set') em campos de estado sensível (Status, Saldo, Totais, Chaves)?
2. Inspecione as coleções de navegação: expõem 'List<T>' mutável em vez de 'IReadOnlyList<T>' ou 'IReadOnlyCollection<T>'?
3. Verifique se o estado da entidade é modificado exclusivamente através de métodos de negócio que aplicam regras de validação (Rich Model vs Anemic Model).
4. Verifique entidades que representam fatos históricos contábeis, fiscais ou de auditoria: existem comandos de UPDATE alterando dados dessas tabelas após sua finalização?

O QUE APONTAR COMO DEFEITO:
- Setters públicos em campos críticos de entidades de domínio.
- Coleções expostas que permitem adição/remoção de itens contornando o recalculo de totais da entidade pai.
- Métodos que alteram registros históricos em vez de criar lançamentos de estorno/ajuste.

Retorne: Arquivo, Linha, Propriedade/Método, Risco e Correção (código demonstrativo do Rich Model).
```

---

### Tarefa 8: Auditoria de Exclusão, Cascata e Fluxo Completo de Informação (Regressão de Deletação)

* **Objetivo:** Evitar perda destrutiva de dados históricos por deleções em cascata, garantir integridade referencial estrita e assegurar que cancelamentos revertam 100% dos efeitos colaterais de forma atômica.
* **Critérios de Reprovação (Violações):**
  - Mapeamentos EF Core configurados com `DeleteBehavior.Cascade` em entidades com valor histórico/fiscal/financeiro.
  - Exclusão física (`Remove()`) onde regras de negócio exigem exclusão lógica (`Soft Delete`).
  - Falha ao reverter efeitos satélites de um cancelamento (estoque, títulos a receber/pagar, comissão, crédito).
  - Reversão de múltiplos agregados sem `BeginTransactionAsync()`, permitindo inconsistência se uma das etapas falhar.
* **Prompt Especializado:**

```markdown
Atue como Engenheiro de Confiabilidade de Dados e Arquiteto de Software.
Analise os Mapeamentos EF Core, Entidades e Serviços deste fluxo: [INSERIR ARQUIVOS]

OBJETIVO: Auditar regras de exclusão, cascatas no banco e a reversão atômica de efeitos colaterais.

CRITÉRIOS DE AVALIAÇÃO:
1. Mapeamento de Deleção: Verifique o 'OnDelete' nos mappings. Existe 'DeleteBehavior.Cascade' configurado em entidades com valor histórico/fiscal/financeiro em vez de 'DeleteBehavior.Restrict'?
2. Soft Delete vs Hard Delete: Entidades com ciclo de vida crítico usam exclusão lógica (DeletedAt/IsDeleted) ou exclusão física (db.Remove)? Se usam Soft Delete, os índices UNIQUE no mapping são parciais (HasFilter("deleted_at IS NULL"))?
3. Efeito Dominó do Cancelamento/Exclusão:
   - Rastreie o método de Cancelar ou Excluir. Ele localiza e reverte TODAS as entidades afetadas (Estoque, Contas a Pagar/Receber, Comissões, Limites de Crédito, Contabilidade)?
4. Atomicidade Transacional:
   - As reversões ocorrem dentro de 'using var tx = await _context.Database.BeginTransactionAsync()'?
   - O código garante Rollback automático caso qualquer etapa do estorno falhe?

O QUE APONTAR COMO DEFEITO:
- Cascata destrutiva em tabelas críticas.
- Falta de reversão de uma ou mais etapas satélites ao cancelar um documento.
- Falta de transação atômica englobando a reversão de múltiplos agregados.

Retorne: Arquivo, Linha, Cenário de Falha, Impacto de Dessincronização e Implementação Segura Recomendada.
```

---

## 3. Seção B — Checklist Técnico Unificado (Prompt Único por Arquivo)

* **Objetivo:** Realizar uma auditoria estática minuciosa e rápida avaliando simultaneamente **Null Safety**, **Armadilhas Assíncronas**, **Ciclo de Vida de DI** e **Consultas N+1**.
* **Critérios de Reprovação (Violações):**
  1. *Null Safety:* Navegações encadeadas sem checagem (`a.B.C`), ausência de coalescência nula, métodos que podem retornar `null` sendo consumidos sem guard clauses, coleções retornando `null` em vez de vazias (`[]`).
  2. *Async Traps:* Bloqueio síncrono com `.Result` ou `.Wait()`; uso de `async void`; métodos assíncronos chamados sem `await`.
  3. *DI Scopes:* `DbContext` ou serviços `Scoped` injetados em `Singleton` ou consumidos em `IHostedService` sem `IServiceScope`.
  4. *N+1 Queries:* Laços de repetição (`foreach`) disparando queries no banco de dados.
* **Prompt Especializado:**

```markdown
Atue como Analista Estático de Código e Revisor Técnico Sênior em .NET e C#.
Analise minuciosamente o código do arquivo a seguir: [INSERIR CÓDIGO COMPLETO OU CAMINHO DO ARQUIVO]

OBJETIVO: Realizar uma auditoria estática rigorosa cobrindo simultaneamente os 4 eixos de risco técnico abaixo:

1. NULL REFERENCE SAFETY (Prevenção de NullReferenceException):
- Identifique acessos a propriedades encadeadas sem operador null-conditional (ex: 'obj.Prop.SubProp' sem '?.').
- Identifique métodos que retornam coleções nulas em vez de listas/arrays vazios ('[]').
- Identifique falta de validação de argumentos nulos (Guard Clauses) em métodos públicos de serviços.

2. ARMADILHAS ASSÍNCRONAS (Deadlocks e Async/Await):
- Identifique qualquer uso de '.Result', '.Wait()' ou '.GetAwaiter().GetResult()' bloqueando threads.
- Identifique métodos declarados como 'async void' (devem ser sempre 'async Task').
- Identifique invocações de métodos assíncronos que esqueceram o operador 'await' (disparo desatendido).

3. CICLO DE VIDA E VAZAMENTO DE RECURSOS (Injeção de Dependências e I/O):
- Verifique se o tempo de vida do serviço é compatível com suas dependências (ex: DbContext ou serviço Scoped injetado dentro de Singleton/Worker).
- Verifique se streams, conexões ou arquivos abertos estão corretamente encapsulados em blocos 'using' / 'await using'.
- Se for um IHostedService ou BackgroundService, verifique se está criando um IServiceScope antes de resolver serviços scoped.

4. CONSULTAS N+1 E EFICIÊNCIA DE ORM (EF Core / Dapper / SQL):
- Procure por loops ('foreach', 'for', 'while') que executam queries no banco dentro da repetição.
- Identifique onde há ausência de '.Include()' ou de projeção direta via '.Select()' que gere lazy loading ou idas repetidas ao banco.
- Identifique buscas de entidades completas no banco quando apenas campos pontuais de leitura eram necessários (falta de AsNoTracking ou projeção em DTO).

FORMATO DA SAÍDA:
Caso encontre violações, organize por gravidade:
- [CRÍTICO]: Risco iminente de crash em produção, deadlock ou corrupção de memória.
- [ALTO]: Degradação severa de performance (N+1) ou exceção de NullReference em fluxos reais.
- [MÉDIO]: Má prática assíncrona ou acoplamento de ciclo de vida.

Para cada item encontrado indique:
• Linha e Método
• Categoria (Null / Async / DI / N+1)
• O que está errado e o impacto real em runtime
• Código corrigido (como deve ficar)

Se o arquivo não apresentar nenhuma das 4 violações, declare: "ARQUIVO AUDITADO COM SUCESSO: Nenhuma violação detectada nos 4 eixos."
```
