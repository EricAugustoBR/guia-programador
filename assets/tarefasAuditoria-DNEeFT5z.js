import"./main-CvY94YZ6.js";var e=[{id:`fowler`,author:`Martin Fowler`,bookTitle:`Patterns of Enterprise Application Architecture & Refactoring`,badge:`Arquitetura Corporativa`,avatarSvg:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,quote:`Lógica de negócio não deve vazar para controllers; estados críticos contábeis exigem trilha imutável.`,pillars:[{title:`Fronteira Domínio vs Persistência`,description:`A auditoria deve checar se a lógica de negócio está vazando para controllers/telas (Transaction Script desorganizado) em vez de residir em serviços e entidades coesas.`},{title:`Rastreabilidade (Audit Trail)`,description:`Qualquer operação que altere estado contábil ou financeiro deve ter Audit Trail ou registro de evento imutável (append-only).`}]},{id:`evans`,author:`Eric Evans & Vaughn Vernon`,bookTitle:`Domain-Driven Design (DDD) & Implementing DDD`,badge:`Consistência de Domínio`,avatarSvg:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/></svg>`,quote:`Entidades internas nunca mudam sem o aval da Raiz do Agregado; invariantes são sagradas.`,pillars:[{title:`Limites de Agregados e Invariantes`,description:`Uma entidade filha nunca deve ser alterada ou excluída sem passar pela Raiz do Agregado (Aggregate Root).`},{title:`Consistência Transacional`,description:`Se um controller puder alterar um item de pedido diretamente sem que o pedido recalcule seu total ou valide seu status, a invariante de domínio foi violada.`}]},{id:`uncle-bob`,author:`Robert C. Martin ("Uncle Bob")`,bookTitle:`Clean Architecture & Clean Code`,badge:`Arquitetura Limpa & SOLID`,avatarSvg:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,quote:`O núcleo do negócio não conhece banco nem HTTP; controllers são meros adaptadores de transporte.`,pillars:[{title:`Direção de Dependência`,description:`O núcleo do negócio nunca depende de bibliotecas externas, frameworks ou detalhes de banco. Dependências apontam sempre para o centro.`},{title:`Responsabilidade Única (SRP)`,description:`Controllers são portas de entrada HTTP e não devem conter regras de cálculo, persistência direta ou orquestração pesada.`}]},{id:`owasp`,author:`OWASP (ASVS) & Michael Howard`,bookTitle:`Writing Secure Code & OWASP Application Security Verification Standard`,badge:`Segurança & AppSec`,avatarSvg:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,quote:`Segurança deve ser fail-closed: ausência de atributo é acesso negado. Mutações sem anti-CSRF e IDOR são vulnerabilidades críticas.`,pillars:[{title:`Controle de Acesso Fail-Closed`,description:`A segurança deve falhar fechada. Ausência de atributo de permissão deve negar o acesso por padrão.`},{title:`Validação de Anti-CSRF e IDOR/BOLA`,description:`Mutações precisam validar o token de formulário e garantir que o ID informado na requisição pertence ao tenant/empresa do usuário autenticado.`}]}],t=[{id:`tarefa-1`,number:1,title:`Tarefa 1: Rastreabilidade (Audit Trail / Event Sourcing)`,shortTitle:`Rastreabilidade (Audit Trail)`,category:`tarefas`,riskLevel:`critico`,objective:`Garantir que operações com impacto financeiro, contábil, fiscal ou de segurança gerem rastro auditável imutável, identificando quem, quando, o que mudou e o motivo.`,failureCriteria:[`Mutações de estado (Create, Update, Delete, Cancelar, Estornar) sem gravar log de auditoria (AuditLog).`,`Atualizações em dados sensíveis (preços, limites de crédito, descontos, alíquotas) sem registrar valor anterior vs valor novo.`,`Omissão do ID do usuário responsável (UserId), IP ou data/hora UTC.`],mnemonicTip:`Mnemônico: "Quem, Quando, O Quê e Por Quê" — Sem estes 4 dados, a mutação é invisível e inauditável.`,promptText:`Atue como Auditor de Segurança e Compliance de Software.
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

Retorne os apontamentos listando: Arquivo, Linha, Método, Gravidade (Crítica/Alta/Média) e Ação Corretiva.`,codeExample:{language:`csharp`,badSnippet:`// ✕ VIOLAÇÃO: Alteração de dados financeiros sem trilha de auditoria
[HttpPost("atualizar-limite")]
public async Task<IActionResult> AtualizarLimite(int clienteId, decimal novoLimite)
{
    var cliente = await _context.Clientes.FindAsync(clienteId);
    cliente.LimiteCredito = novoLimite; // Quem alterou? Qual era o limite anterior? Qual o motivo?
    await _context.SaveChangesAsync();
    return Ok();
}`,badExplanation:`O limite é alterado silenciosamente. Em caso de auditoria externa ou investigação de fraude, é impossível rastrear o autor ou recuperar o valor anterior.`,goodSnippet:`// ✓ PADRÃO AUDITADO: Captura do operador, justificativa e snapshot antes/depois
[HttpPost("atualizar-limite")]
public async Task<IActionResult> AtualizarLimite(AtualizarLimiteCommand cmd)
{
    var operadorId = User.GetUserId();
    await _clienteService.AlterarLimiteCreditoAsync(cmd.ClienteId, cmd.NovoLimite, cmd.Justificativa, operadorId);
    // Dispara Domain Event ou grava em tabela append-only:
    // AuditLog(Entidade, RegistroId, OperadorId, DataUtc, ValorAnterior, ValorNovo, Motivo)
    return NoContent();
}`,goodExplanation:`A alteração passa por método semântico do serviço/entidade, gravando snapshot imutável com operador, timestamp UTC e justificativa.`}},{id:`tarefa-2`,number:2,title:`Tarefa 2: Vazamento de Lógica de Negócio para Controllers ou Telas`,shortTitle:`Vazamento de Lógica de Negócio`,category:`tarefas`,riskLevel:`alto`,objective:`Assegurar que controllers ajam estritamente como adaptadores HTTP e que views Razor apenas renderizem dados, sem conter regras de negócio.`,failureCriteria:[`Controllers chamando _context.Database.ExecuteSqlRaw, _context.Add(), _context.Remove() ou _context.SaveChangesAsync().`,`Validações de negócio complexas feitas dentro do Controller com ModelState.AddModelError em vez de estarem no Serviço ou Entidade.`,`Controllers alterando status diretamente (ex: pedido.Status = EStatus.Aprovado;).`,`Telas Razor (.cshtml) com blocos @functions, cálculos matemáticos ou queries de banco.`],mnemonicTip:`Mnemônico: "Controller é carteiro, não juiz". Ele entrega a mensagem e recebe a resposta, sem julgar as regras.`,promptText:`Atue como Arquiteto de Software especialista em Clean Architecture e Vertical Slices.
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

Retorne: Arquivo, Linha, Trecho Infrator, Explicação da Violação e Como mover para o Service/Domain.`,codeExample:{language:`csharp`,badSnippet:`// ✕ VIOLAÇÃO: Controller manipulando DbContext e validando regras de faturamento
[HttpPost("faturar")]
public async Task<IActionResult> Faturar(int pedidoId)
{
    var pedido = await _context.Pedidos.Include(p => p.Itens).FirstOrDefaultAsync(p => p.Id == pedidoId);
    if (pedido.ValorTotal > 5000 && !User.IsInRole("Diretoria"))
        return BadRequest("Acima de 5k exige diretoria.");

    pedido.Status = EStatusPedido.Faturado; // Mutação direta no controller!
    _context.NotasFiscais.Add(new NotaFiscal { PedidoId = pedido.Id, Total = pedido.ValorTotal });
    await _context.SaveChangesAsync();
    return Ok();
}`,badExplanation:`A regra de aprovação e a transição de faturamento estão presas na camada HTTP. Se uma rotina assíncrona for faturar o pedido, essa regra será burlada.`,goodSnippet:`// ✓ PADRÃO AUDITADO: Controller delega integralmente ao Handler de Negócio
[HttpPost("faturar")]
public async Task<IActionResult> Faturar(int pedidoId)
{
    var command = new FaturarPedidoCommand(pedidoId, User.GetUserId(), User.GetRoles());
    var resultado = await _mediator.Send(command);
    return resultado.Match<IActionResult>(
        sucesso => Ok(sucesso),
        erro => BadRequest(erro.Mensagem)
    );
}`,goodExplanation:`O endpoint apenas desserializa a entrada e despacha o comando. A consistência e as regras residem no núcleo de domínio.`}},{id:`tarefa-3`,number:3,title:`Tarefa 3: Limites dos Agregados e Invariantes de Domínio (DDD)`,shortTitle:`Limites dos Agregados & Invariantes`,category:`tarefas`,riskLevel:`alto`,objective:`Garantir a consistência transacional e de estado através de agregados do DDD, impedindo que entidades filhas sejam manipuladas sem passar pela raiz do agregado.`,failureCriteria:[`Buscar entidade filha no DbContext e alterá-la isoladamente sem carregar a raiz para validar invariantes e totais.`,`Permitir salvar estados inválidos (ex: lançamento contábil em que Débito != Crédito, nota fiscal sem destinatário).`],mnemonicTip:`Mnemônico: "Filho só pede autorização ao Pai" — Entidade interna nunca expõe Save próprio.`,promptText:`Atue como Especialista em Domain-Driven Design (DDD).
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

Retorne: Arquivo, Linha, Invariante Quebrada, Risco de Corrupção de Estado e Refatoração Recomendada.`,codeExample:{language:`csharp`,badSnippet:`// ✕ VIOLAÇÃO: Mutação direta de item filho contornando o agregado pai
public async Task RemoverItemAvulso(int itemId)
{
    var item = await _context.ItensPedido.FindAsync(itemId);
    _context.ItensPedido.Remove(item); // Perigo!
    await _context.SaveChangesAsync();
    // O Pedido pai continua com o ValorTotal antigo no banco! Quebra de invariante!
}`,badExplanation:`Ao remover o item diretamente sem a raiz (Pedido), os totais, descontos, fretes e validações de status do pedido não são recalculados.`,goodSnippet:`// ✓ PADRÃO AUDITADO: Mutação via Raiz do Agregado que mantém invariantes íntegras
public async Task RemoverItemDoPedido(Guid pedidoId, Guid itemId)
{
    var pedido = await _pedidoRepo.GetByIdAsync(pedidoId);
    pedido.RemoverItem(itemId); // Valida se pode editar, recalcula total, emite evento
    await _pedidoRepo.UnitOfWork.SaveChangesAsync();
}`,goodExplanation:`Apenas a raiz do agregado possui métodos de mutação, garantindo que suas regras matemáticas e invariantes de estado permaneçam 100% íntegras.`}},{id:`tarefa-4`,number:4,title:`Tarefa 4: Controllers com Regras de Cálculo`,shortTitle:`Sem Regras de Cálculo em Controllers`,category:`tarefas`,riskLevel:`medio`,objective:`Assegurar que nenhum cálculo aritmético de negócio (impostos, descontos, juros, rateios, comissões, margens, saldos) seja executado na camada de Controller.`,failureCriteria:[`Controllers aplicando operadores aritméticos (*, /, +, -, Math.Round) sobre valores monetários ou quantidades.`,`Controllers calculando totais de itens antes de enviar para salvar.`],mnemonicTip:`Mnemônico: "Calculadora não mora no Controller" — Fórmulas e rateios pertencem a Value Objects e Domain Services.`,promptText:`Atue como Revisor de Código Sênior focado em Separação de Preocupações (SoC).
Analise os seguintes Controllers: [INSERIR ARQUIVOS]

OBJETIVO: Auditar a presença de regras de cálculo aritmético de negócio no Controller.

CRITÉRIOS DE AVALIAÇÃO:
1. Procure por qualquer operação aritmética (+, -, *, /, Math.Round, Math.Floor) aplicada sobre valores fiscais, contábeis, estoque ou monetários.
2. Identifique regras de precificação, cálculo de parcelamento, apuração de tributos ou rateio de valores feitas inline dentro de actions.
3. Valide se os valores recebidos da requisição estão sendo apenas validados e repassados como DTOs para o motor de cálculo/serviço correspondente.

O QUE APONTAR COMO DEFEITO:
- Qualquer cálculo de negócio feito na Action do Controller, mesmo que simples (ex: valorTotal = itens.Sum(x => x.Preco * x.Qtd)).

Retorne: Arquivo, Linha, Ação/Método, Código Infrator e Sugestão de encapsulamento no Domain Service ou Rich Model.`,codeExample:{language:`csharp`,badSnippet:`// ✕ VIOLAÇÃO: Cálculo fiscal e rateio de comissão inline no Controller
[HttpPost("gerar-orcamento")]
public IActionResult GerarOrcamento([FromBody] OrcamentoDto dto)
{
    decimal subtotal = dto.Itens.Sum(i => i.Quantidade * i.Preco);
    decimal desconto = dto.AplicarCupom ? subtotal * 0.10m : 0m;
    decimal impostos = (subtotal - desconto) * 0.18m; // Alíquota mágica no controller!
    decimal total = Math.Round(subtotal - desconto + impostos, 2);
    // ...
}`,badExplanation:`Regras de arredondamento e alíquotas fiscais no controller não podem ser reutilizadas por jobs de faturamento e impedem testes unitários puros.`,goodSnippet:`// ✓ PADRÃO AUDITADO: Cálculo delegado a Value Objects e Domain Services
[HttpPost("gerar-orcamento")]
public IActionResult GerarOrcamento([FromBody] OrcamentoRequest request)
{
    var itens = request.Itens.Select(i => new ItemOrcamento(i.ProdutoId, i.Quantidade, Dinheiro.De(i.Preco)));
    var orcamento = _motorCalculo.CalcularOrcamento(itens, request.Cupom);
    return Ok(OrcamentoResponse.Mapear(orcamento));
}`,goodExplanation:`Os cálculos aritméticos ficam isolados no domínio com precisão monetária (Dinheiro/Value Object), fáceis de testar exaustivamente.`}},{id:`tarefa-5`,number:5,title:`Tarefa 5: Autorização e Controle de Acesso (RBAC/ABAC, CSRF, IDOR/BOLA)`,shortTitle:`RBAC, CSRF & IDOR/BOLA`,category:`tarefas`,riskLevel:`critico`,objective:`Blindar o sistema contra acessos indevidos, execução de ações não autorizadas, bypass de tokens de formulário e manipulação de IDs de registros de terceiros.`,failureCriteria:[`Controllers ou actions sem [Authorize] ou com actions públicas por esquecimento.`,`Actions POST/PUT/DELETE sem [RequirePermission("...")] ou sem [ValidateAntiForgeryToken].`,`Códigos de permissão declarados que não constam no seed/catálogo central.`,`Queries que recebem ID e executam mutações sem conferir a empresa/tenant do usuário logado (BOLA/IDOR).`],mnemonicTip:`Mnemônico: "Fechado por Padrão, Escopado por Tenant" — Se não tem permissão explícita, a porta não abre.`,promptText:`Atue como Especialista em Segurança de Aplicações (AppSec / OWASP ASVS).
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

Retorne: Arquivo, Linha, Ação HTTP, Tipo de Vulnerabilidade, Impacto e Código de Correção.`,codeExample:{language:`csharp`,badSnippet:`// ✕ VULNERABILIDADE CRÍTICA: Sem anti-CSRF, sem claim granular e com IDOR
[HttpPost("excluir-contrato")]
[Authorize] // Qualquer usuário logado pode chamar!
public async Task<IActionResult> ExcluirContrato(int contratoId)
{
    // IDOR: Busca direto pela PK sem filtrar pelo TenantId da empresa do usuário!
    var contrato = await _context.Contratos.FindAsync(contratoId);
    _context.Contratos.Remove(contrato);
    await _context.SaveChangesAsync();
    return Ok();
}`,badExplanation:`Um usuário mal-intencionado de uma empresa A pode passar o ID do contrato da empresa B e apagá-lo, além de estar vulnerável a CSRF.`,goodSnippet:`// ✓ PADRÃO AUDITADO: Anti-CSRF, Permissão granular e Tenant-Scope obrigatório
[HttpPost("excluir-contrato")]
[ValidateAntiForgeryToken]
[RequirePermission(PermissoesCatalogo.Contratos.Excluir)]
public async Task<IActionResult> ExcluirContrato(int contratoId)
{
    var tenantId = User.GetTenantId();
    var contrato = await _context.Contratos
        .FirstOrDefaultAsync(c => c.Id == contratoId && c.TenantId == tenantId);

    if (contrato is null) return NotFound("Contrato não encontrado.");
    
    contrato.MarcarComoCancelado(User.GetUserId());
    await _context.SaveChangesAsync();
    return NoContent();
}`,goodExplanation:`Protegido por token anti-CSRF, exige permissão explícita catalogada e força isolamento multi-tenant por construção.`}},{id:`tarefa-6`,number:6,title:`Tarefa 6: Auditoria dos Princípios SOLID`,shortTitle:`Princípios S.O.L.I.D.`,category:`tarefas`,riskLevel:`alto`,objective:`Identificar acoplamentos indevidos, classes sobrecarregadas, quebras de abstração e fragilidades de manutenção nos padrões orientados a objetos.`,failureCriteria:[`S: Classes "God Object" que misturam regras de múltiplos domínios ou regras de negócio com I/O de infraestrutura.`,`O: Blocos de switch (tipo) ou if-else encadeados que exigem edição a cada nova variação de negócio.`,`L: Subclasses ou implementações que lançam NotImplementedException ou quebram o contrato esperado da base.`,`I: Interfaces com dezenas de métodos onde consumidores usam apenas 1 ou 2.`,`D: Instanciação direta (new HttpClient(), new ClosedXML()) dentro de regras de negócio em vez de injeção de dependências.`],mnemonicTip:`Mnemônico: "SOLID: Simplicidade, Oportunidade polimórfica, Lealdade a contratos, Isolamento de interfaces e Dependência de abstrações".`,promptText:`Atue como Arquiteto de Software Sênior.
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

Retorne: Princípio Violado, Arquivo, Linha, Diagnóstico da Violação e Estratégia de Refatoração.`,codeExample:{language:`csharp`,badSnippet:`// ✕ VIOLAÇÕES DE SOLID (S, O, D):
public class PagamentoService
{
    public void Processar(string forma, decimal valor)
    {
        // Quebra O (Open/Closed): cada nova forma de pagamento força editar esta classe
        if (forma == "Pix") { /* ... */ }
        else if (forma == "Boleto") { /* ... */ }
        else if (forma == "Cartao") { /* ... */ }

        // Quebra D (Dependency Inversion): instanciação direta de infraestrutura
        using var client = new HttpClient();
        client.PostAsync("https://gateway.com/pay", null);
    }
}`,badExplanation:`Classe acoplada a implementações concretas e fechada para extensão. Adicionar um novo meio de pagamento exige modificar o arquivo testado.`,goodSnippet:`// ✓ PADRÃO AUDITADO: Polimorfismo (Strategy) e Injeção de Dependências
public interface IEstrategiaPagamento
{
    TipoPagamento Tipo { get; }
    Task<ResultadoPagamento> ProcessarAsync(Dinheiro valor, CancellationToken ct);
}

public class ProcessadorPagamentoService
{
    private readonly IEnumerable<IEstrategiaPagamento> _estrategias;
    public ProcessadorPagamentoService(IEnumerable<IEstrategiaPagamento> estrategias)
    {
        _estrategias = estrategias;
    }
    // Aberto para novas estratégias sem alterar este código!
}`,goodExplanation:`Cada forma de pagamento é uma classe isolada (SRP + OCP). As dependências são injetadas via interfaces abstratas (DIP).`}},{id:`tarefa-7`,number:7,title:`Tarefa 7: Auditoria de Imutabilidade e Invariantes de Estado`,shortTitle:`Imutabilidade & Invariantes de Estado`,category:`tarefas`,riskLevel:`critico`,objective:`Proteger o modelo de domínio corporativo contra corrupção acidental de dados, garantindo que o estado só possa ser modificado através de métodos explícitos de negócio e que registros históricos não sofram mutação.`,failureCriteria:[`Entidades com setters públicos abertos (public decimal Saldo { get; set; }).`,`Coleções de navegação expostas como public List<Item> Itens { get; set; } em vez de IReadOnlyList<Item>.`,`Comandos de UPDATE alterando dados de fatos contábeis/fiscais históricos em vez de estorno.`],mnemonicTip:`Mnemônico: "Passado não se edita, se estorna" — Fatos contábeis são gravados em pedras imutáveis.`,promptText:`Atue como Especialista em Modelagem de Domínio Rico e DDD.
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

Retorne: Arquivo, Linha, Propriedade/Método, Risco e Correção (código demonstrativo do Rich Model).`,codeExample:{language:`csharp`,badSnippet:`// ✕ MODELO ANÊMICO E VULNERÁVEL: Setters abertos e coleção mutável
public class ContaCorrente
{
    public int Id { get; set; }
    public decimal Saldo { get; set; } // Qualquer classe pode fazer: conta.Saldo = 0;
    public string Status { get; set; }
    public List<Lancamento> Lancamentos { get; set; } // conta.Lancamentos.Clear(); sem auditoria!
}`,badExplanation:`Qualquer serviço pode alterar diretamente o saldo ou limpar a lista de lançamentos contornando as invariantes contábeis.`,goodSnippet:`// ✓ PADRÃO AUDITADO: Encapsulamento estrito com readonly e métodos de negócio
public class ContaCorrente : AggregateRoot
{
    public Guid Id { get; }
    public decimal Saldo { get; private set; }
    public StatusConta Status { get; private set; }

    private readonly List<Lancamento> _lancamentos = new();
    public IReadOnlyCollection<Lancamento> Lancamentos => _lancamentos.AsReadOnly();

    public void Creditar(Dinheiro valor, string justificativa, Guid operadorId)
    {
        ValidarContaAtiva();
        Saldo += valor.Quantia;
        _lancamentos.Add(Lancamento.CriarCredito(valor, justificativa, operadorId));
    }
}`,goodExplanation:`Setters privados, coleção exposta como read-only e modificações restritas a transações auditadas de negócio.`}},{id:`tarefa-8`,number:8,title:`Tarefa 8: Auditoria de Exclusão, Cascata e Fluxo Completo de Informação (Regressão de Deletação)`,shortTitle:`Exclusão, Cascata & Fluxo Reverso`,category:`tarefas`,riskLevel:`critico`,objective:`Evitar perda destrutiva de dados históricos por deleções em cascata, garantir integridade referencial estrita e assegurar que cancelamentos revertam 100% dos efeitos colaterais de forma atômica.`,failureCriteria:[`Mapeamentos EF Core configurados com DeleteBehavior.Cascade em entidades com valor histórico/fiscal/financeiro.`,`Exclusão física (Remove()) onde regras de negócio exigem exclusão lógica (Soft Delete).`,`Falha ao reverter efeitos satélites de um cancelamento (estoque, títulos a receber/pagar, comissão, crédito).`,`Reversão de múltiplos agregados sem BeginTransactionAsync(), permitindo inconsistência se uma das etapas falhar.`],mnemonicTip:`Mnemônico: "Cascata destrói, Transação constrói" — Nunca use Cascade em dados fiscais e sempre englobe reversões em transação atômica.`,promptText:`Atue como Engenheiro de Confiabilidade de Dados e Arquiteto de Software.
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

Retorne: Arquivo, Linha, Cenário de Falha, Impacto de Dessincronização e Implementação Segura Recomendada.`,codeExample:{language:`csharp`,badSnippet:`// ✕ VULNERABILIDADE: Cascade delete destrutivo e cancelamento não atômico
// No Mapping:
builder.HasMany(c => c.NotasFiscais).WithOne().OnDelete(DeleteBehavior.Cascade); // Deleta anos de histórico fiscal!

// No Service:
public async Task CancelarPedido(int pedidoId) {
    var pedido = await _db.Pedidos.FindAsync(pedidoId);
    pedido.Status = "Cancelado";
    await _db.SaveChangesAsync(); // Se houver timeout abaixo, o estoque NUNCA foi devolvido!

    await _estoqueService.DevolverAsync(pedido.Itens); // Fora de transação!
    await _financeiroService.EstornarTitulosAsync(pedido.Id); // Fora de transação!
}`,badExplanation:`Cascade delete apaga registros fiscais irrevogáveis. Cancelamento sem transação unificada deixa o sistema permanentemente dessincronizado se houver falha de rede.`,goodSnippet:`// ✓ PADRÃO AUDITADO: Delete Restrito, Índice Parcial e Transação Atômica
builder.HasMany(c => c.NotasFiscais).WithOne().OnDelete(DeleteBehavior.Restrict);

// Cancelamento em transação atômica:
await using var tx = await _db.Database.BeginTransactionAsync();
try {
    await _estoque.DevolverEstoqueReservadoAsync(pedido);
    await _financeiro.EstornarContasAReceberAsync(pedido);
    await _comissao.EstornarComissoesAsync(pedido);
    pedido.MarcarComoCancelado(motivo, usuarioId);

    await _db.SaveChangesAsync();
    await tx.CommitAsync();
} catch {
    await tx.RollbackAsync(); // Nada é executado pela metade
    throw;
}`,goodExplanation:`O banco recusa exclusões destrutivas, e o estorno completo ocorre dentro de fronteira transacional com Rollback garantido em caso de falha.`}}],n={id:`checklist-unificado`,title:`Checklist Técnico Unificado (Prompt Único por Arquivo)`,objective:`Realizar uma auditoria estática minuciosa e rápida avaliando simultaneamente Null Safety, Armadilhas Assíncronas, Ciclo de Vida de DI e Consultas N+1.`,axes:[{id:`null-safety`,title:`1. Null Reference Safety (Prevenção de NullReferenceException)`,iconSvg:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`,points:[`Acessos a propriedades encadeadas sem operador null-conditional (ex: obj.Prop.SubProp sem ?.).`,`Métodos que retornam coleções nulas em vez de listas/arrays vazios ([]).`,`Falta de validação de argumentos nulos (Guard Clauses) em métodos públicos de serviços.`]},{id:`async-traps`,title:`2. Armadilhas Assíncronas (Deadlocks e Async/Await)`,iconSvg:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,points:[`Uso de .Result, .Wait() ou .GetAwaiter().GetResult() bloqueando threads síncronas.`,`Métodos declarados como async void (devem ser sempre async Task).`,`Invocações de métodos assíncronos sem o operador await (disparo desatendido / fire-and-forget acidental).`]},{id:`di-scopes`,title:`3. Ciclo de Vida e Vazamento de Recursos (DI e I/O)`,iconSvg:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,points:[`Tempo de vida de serviço incompatível: DbContext ou serviço Scoped injetado dentro de Singleton ou BackgroundService.`,`Streams, conexões SQL ou arquivos abertos sem encapsulamento em blocos using / await using.`,`IHostedService ou BackgroundService resolvendo serviços scoped sem criar explicitamente um IServiceScope.`]},{id:`n-plus-one`,title:`4. Consultas N+1 e Eficiência de ORM (EF Core / Dapper / SQL)`,iconSvg:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,points:[`Laços de repetição (foreach, for, while) executando consultas no banco dentro da repetição.`,`Ausência de .Include() ou de projeção direta via .Select() que gere lazy loading ou idas repetidas ao banco.`,`Buscas de entidades completas no banco quando apenas campos pontuais de leitura eram necessários (falta de AsNoTracking ou projeção em DTO).`]}],outputFormat:[{level:`[CRÍTICO]`,description:`Risco iminente de crash em produção, deadlock ou corrupção de memória.`},{level:`[ALTO]`,description:`Degradação severa de performance (N+1) ou exceção de NullReference em fluxos reais.`},{level:`[MÉDIO]`,description:`Má prática assíncrona ou acoplamento de ciclo de vida.`}],promptText:`Atue como Analista Estático de Código e Revisor Técnico Sênior em .NET e C#.
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

Se o arquivo não apresentar nenhuma das 4 violações, declare: "ARQUIVO AUDITADO COM SUCESSO: Nenhuma violação detectada nos 4 eixos."`},r=[{id:`all`,label:`Todos os Tópicos`,iconSvg:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`},{id:`livros`,label:`Fundamentos & Livros`,iconSvg:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`},{id:`tarefas`,label:`8 Tarefas de Auditoria`,iconSvg:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`},{id:`checklist-unificado`,label:`Checklist Unificado`,iconSvg:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`},{id:`rbac`,label:`RBAC & Controle de Acesso`,iconSvg:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`},{id:`estatico`,label:`Checklist Estático & Sintaxe`,iconSvg:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`},{id:`solid`,label:`Princípios S.O.L.I.D.`,iconSvg:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`},{id:`imutabilidade`,label:`Imutabilidade & Invariantes`,iconSvg:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`},{id:`exclusao`,label:`Exclusão, Cascata & Reversão`,iconSvg:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`}],i=[{id:`guide-rbac`,sectionLetter:`A`,sectionTitle:`Guia Técnico 1: Auditoria de RBAC (Role-Based Access Control)`,category:`rbac`,description:`O objetivo do RBAC é garantir que nenhum usuário execute uma ação ou visualize um dado para o qual não possua autorização expressa e verificada no servidor.`,iconSvg:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,items:[{id:`rbac-1`,index:`A.1`,title:`Falta de Barreiras em Ações de Mutação (POST/PUT/DELETE)`,riskLevel:`critico`,whatToLookFor:`Controllers com [HttpGet] protegido por atributo de permissão, mas com o método [HttpPost], [HttpPut] ou [HttpDelete] correspondente esquecido sem nenhum atributo ou apenas com [Authorize] genérico.`,realRisk:`Um invasor ou usuário comum que descubra a rota consegue enviar requisições diretas via Postman, cURL ou console do navegador e forçar alterações administrativas.`,goldenRule:`Toda ação de mutação de estado (Create, Update, Delete) deve possuir validação explícita de permissão específica.`,codeLanguage:`csharp`,badCode:`[HttpGet]
[RequirePermission("usuarios.gerenciar")]
public IActionResult Editar(int id) => View();

[HttpPost] // ✕ ESQUECIDO SEM PERMISSÃO ESPECÍFICA!
public async Task<IActionResult> Salvar(UsuarioDto dto) { ... }`,goodCode:`[HttpGet]
[RequirePermission("usuarios.gerenciar")]
public IActionResult Editar(int id) => View();

[HttpPost]
[ValidateAntiForgeryToken]
[RequirePermission("usuarios.gerenciar")] // ✓ DEVIDAMENTE BLINDADO
public async Task<IActionResult> Salvar(UsuarioDto dto) { ... }`,mnemonicTip:`Mnemônico: "Se muda estado, exige salvo-conduto dobrado" (POST/PUT/DELETE sempre auditado).`},{id:`rbac-2`,index:`A.2`,title:`Discrepância entre Tela (UI) e Backend`,riskLevel:`critico`,whatToLookFor:`Botões ou menus escondidos na view com @if (User.HasPermission("x")), mas o método no Controller que executa o comando aceita qualquer usuário autenticado.`,realRisk:`Esconder botão no front-end é apenas cosmético (UX), NÃO é segurança. Se o endpoint aceitar a requisição, o sistema está 100% vulnerável a chamadas manuais.`,goldenRule:`A interface apenas reflete permissões para guiar o usuário. A segurança reside estritamente na autorização do backend.`,codeLanguage:`csharp`,badCode:`<!-- View Razor: Botão escondido na tela -->
@if (User.HasPermission("vendas.cancelar")) {
    <button class="btn-cancelar">Cancelar Venda</button>
}

// Controller: Aceita qualquer usuário logado!
[HttpPost("cancelar")]
[Authorize] // ✕ Não exige a claim 'vendas.cancelar'!
public IActionResult Cancelar(int id) => ...`,goodCode:`// Controller: Validação mandatória no backend
[HttpPost("cancelar")]
[Authorize]
[RequirePermission("vendas.cancelar")] // ✓ Exige explicitamente a permissão
public IActionResult Cancelar(int id) => ...`,mnemonicTip:`Mnemônico: "Front oculta, Backend executa e multa". Nunca confie na ausência de clique da UI.`},{id:`rbac-3`,index:`A.3`,title:`Permissões Órfãs ou Não Semeadas`,riskLevel:`alto`,whatToLookFor:`Atributos de permissão usando strings soltas no controller (ex: [RequirePermission("vendas.cancelar")]) que não estão catalogadas na fonte da verdade (tabela mestre / enum / seed centralizado de permissões).`,realRisk:`Se a chave de permissão não existir no catálogo administrativo, nenhum usuário jamais conseguirá receber a claim. O endpoint fica permanentemente inacessível (bloqueio fantasma) ou gera bypass silencioso em fallbacks defeituosos.`,goldenRule:`Nunca use strings mágicas para claims; use constantes ou enums tipados com validação de seed em tempo de compilação ou inicialização.`,codeLanguage:`csharp`,badCode:`// ✕ String mágica sujeita a erro de digitação e descompasso com o banco
[RequirePermission("relatorios.fiananceiro.exportar")] // Note o erro de digitação ("fiananceiro")!`,goodCode:`// ✓ Constantes catalogadas e validadas em teste de integração de seed
[RequirePermission(PermissoesCatalogo.Financeiro.ExportarRelatorios)]`,mnemonicTip:`Mnemônico: "Permissão sem semente é porta trancada para sempre".`},{id:`rbac-4`,index:`A.4`,title:`Ausência de Anti-Forgery Token (CSRF)`,riskLevel:`alto`,whatToLookFor:`Métodos POST/PUT que consomem cookies de autenticação sem anotação [ValidateAntiForgeryToken] ou sem o filtro global AutoValidateAntiforgeryTokenAttribute habilitado.`,realRisk:`Ataques Cross-Site Request Forgery (CSRF): um usuário autenticado clica num link malicioso em outro site e seu navegador dispara uma requisição legítima contra a aplicação transferindo fundos ou alterando senhas.`,goldenRule:`Toda aplicação que usa autenticação via Cookie deve validar token anti-CSRF em qualquer mutação.`,codeLanguage:`csharp`,badCode:`[HttpPost]
public async Task<IActionResult> TransferirFundos(decimal valor) { ... }`,goodCode:`[HttpPost]
[ValidateAntiForgeryToken] // ✓ Requer token gerado na view
public async Task<IActionResult> TransferirFundos(decimal valor) { ... }`,mnemonicTip:`Mnemônico: "Post sem token é carimbo falso em cheque em branco".`},{id:`rbac-5`,index:`A.5`,title:`Vulnerabilidades IDOR / BOLA (Insecure Direct Object Reference)`,riskLevel:`critico`,whatToLookFor:`Queries que recebem Id via URL ou body (ex: /pedidos/123/cancelar) e realizam mutações diretamente no registro sem validar se o registro pertence ao Tenant/Empresa do usuário autenticado.`,realRisk:`Um usuário de uma filial acessa ou corrompe registros de outra filial/empresa simplesmente trocando o número sequencial na requisição.`,goldenRule:`Toda busca por chave primária em ambiente multi-inquilino deve incluir a cláusula de isolamento (ex: Where(x => x.Id == id && x.EmpresaId == user.EmpresaId)).`,codeLanguage:`csharp`,badCode:`[HttpPost("pedidos/{id}/cancelar")]
public async Task<IActionResult> Cancelar(int id) {
    var pedido = await _db.Pedidos.FindAsync(id); // ✕ IDOR: Não filtra por empresa!
    pedido.Cancelar();
    await _db.SaveChangesAsync();
}`,goodCode:`[HttpPost("pedidos/{id}/cancelar")]
public async Task<IActionResult> Cancelar(int id) {
    var empresaId = User.GetEmpresaId();
    var pedido = await _db.Pedidos.FirstOrDefaultAsync(p => p.Id == id && p.EmpresaId == empresaId); // ✓ Escopado
    if (pedido == null) return NotFound();
    pedido.Cancelar();
    await _db.SaveChangesAsync();
}`,mnemonicTip:`Mnemônico: "ID sem Tenant é invasão garantida".`}]},{id:`guide-estatico`,sectionLetter:`B`,sectionTitle:`Guia Técnico 2: Checklist Estático & Sintaxe (.NET / C#)`,category:`estatico`,description:`Detalhamento minucioso dos 4 eixos de risco: Null Safety, Armadilhas Assíncronas, Ciclo de Vida de DI e Otimização de Consultas ORM.`,iconSvg:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,items:[{id:`estatico-1`,index:`B.1`,title:`Navegação Encadeada sem Null-Conditional`,riskLevel:`alto`,whatToLookFor:`Acessos a propriedades encadeadas (ex: pedido.Cliente.Endereco.Cep) onde qualquer nível intermediário pode ser nulo caso o relacionamento não tenha sido carregado pelo ORM.`,realRisk:`NullReferenceException catastrófica em produção no momento em que um registro tiver relacionamento ausente ou nulo.`,goldenRule:`Utilize o operador de navegação segura (?.) e coalescência nula (??) ou pattern matching com guard clauses.`,codeLanguage:`csharp`,badCode:`string cep = pedido.Cliente.Endereco.Cep; // ✕ Se Cliente ou Endereco for null: crash imediato!`,goodCode:`string cep = pedido?.Cliente?.Endereco?.Cep ?? "CEP não informado"; // ✓ Seguro e tolerante`,mnemonicTip:`Mnemônico: "Três pontos sem interrogação é ponto final na aplicação".`},{id:`estatico-2`,index:`B.2`,title:`Bloqueio Síncrono em Código Assíncrono (.Result / .Wait())`,riskLevel:`critico`,whatToLookFor:`Uso de .Result, .Wait() ou .GetAwaiter().GetResult() em controllers ou serviços ASP.NET Core.`,realRisk:`Esgotamento do ThreadPool e Deadlocks em ambientes de alto tráfego sob SynchronizationContext.`,goldenRule:`Código assíncrono deve ser assíncrono de ponta a ponta (async/await all the way).`,codeLanguage:`csharp`,badCode:`public IActionResult ObterDados() {
    var resultado = _servico.ObterDadosAsync().Result; // ✕ Bloqueia thread do pool!
    return Ok(resultado);
}`,goodCode:`public async Task<IActionResult> ObterDados(CancellationToken ct) {
    var resultado = await _servico.ObterDadosAsync(ct); // ✓ Libera thread para atender outras requisições
    return Ok(resultado);
}`,mnemonicTip:`Mnemônico: "Result bloqueia, Await passeia".`},{id:`estatico-3`,index:`B.3`,title:`Métodos com Assinatura "async void"`,riskLevel:`critico`,whatToLookFor:`Métodos declarados como async void que não sejam event handlers de interface desktop.`,realRisk:`Exceções disparadas em async void não podem ser capturadas por blocos try/catch externos e derrubam o processo do ASP.NET Core.`,goldenRule:`Nunca use async void em serviços backend ou controllers; use sempre async Task.`,codeLanguage:`csharp`,badCode:`public async void ProcessarNotificacao(string mensagem) { // ✕ Qualquer throw aqui derruba a aplicação!
    await _emailSender.EnviarAsync(mensagem);
}`,goodCode:`public async Task ProcessarNotificacao(string mensagem) { // ✓ Erros fluem pela Task
    await _emailSender.EnviarAsync(mensagem);
}`,mnemonicTip:`Mnemônico: "Void assíncrono é bomba-relógio sem pino".`},{id:`estatico-4`,index:`B.4`,title:`Incompatibilidade de Ciclo de Vida (Scoped dentro de Singleton)`,riskLevel:`critico`,whatToLookFor:`Serviço Singleton ou BackgroundService injetando diretamente DbContext ou outro serviço Scoped no construtor.`,realRisk:`DbContext mantido vivo indefinidamente em memória acumulando entidades no ChangeTracker gerando vazamento severo de memória e concorrência multithread ilegal no DbContext.`,goldenRule:`Serviços Singleton e workers devem criar um escopo manual usando IServiceScopeFactory para consumir instâncias Scoped temporárias.`,codeLanguage:`csharp`,badCode:`public class MonitorWorker : BackgroundService {
    private readonly MeuDbContext _db; // ✕ Scoped capturado em Singleton!
    public MonitorWorker(MeuDbContext db) { _db = db; }
}`,goodCode:`public class MonitorWorker : BackgroundService {
    private readonly IServiceScopeFactory _scopeFactory;
    public MonitorWorker(IServiceScopeFactory scopeFactory) { _scopeFactory = scopeFactory; }
    
    protected override async Task ExecuteAsync(CancellationToken ct) {
        using var scope = _scopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<MeuDbContext>(); // ✓ Escopo limpo por iteração
    }
}`,mnemonicTip:`Mnemônico: "Singleton não casa com Scoped sem aliança do ScopeFactory".`},{id:`estatico-5`,index:`B.5`,title:`Consultas N+1 dentro de Loops de Repetição`,riskLevel:`alto`,whatToLookFor:`Laços de repetição (foreach) disparando consultas de banco de dados para buscar itens filhos ou registros relacionados um a um.`,realRisk:`Degradação extrema de desempenho: uma lista de 500 registros gera 501 idas ao banco, sobrecarregando a rede e gerando timeouts.`,goldenRule:`Carregue todos os dados necessários de forma antecipada com .Include() ou faça uma única consulta agrupada com Contains().`,codeLanguage:`csharp`,badCode:`foreach (var cliente in clientes) {
    var pedidos = await _db.Pedidos.Where(p => p.ClienteId == cliente.Id).ToListAsync(); // ✕ N queries!
}`,goodCode:`var clienteIds = clientes.Select(c => c.Id).ToList();
var todosPedidos = await _db.Pedidos.Where(p => clienteIds.Contains(p.ClienteId)).ToListAsync(); // ✓ 1 query!`,mnemonicTip:`Mnemônico: "Query no loop é viagem de caminhão para buscar uma única maçã por vez".`}]},{id:`guide-solid`,sectionLetter:`C`,sectionTitle:`Guia Técnico 3: Auditoria dos Princípios SOLID`,category:`solid`,description:`Diagnóstico aprofundado dos 5 princípios da orientação a objetos, evitando acoplamento destrutivo e garantindo facilidade de manutenção.`,iconSvg:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,items:[{id:`solid-1`,index:`C.1`,title:`[S] Responsabilidade Única (SRP) e "God Classes"`,riskLevel:`alto`,whatToLookFor:`Classes com mais de 300 linhas ou com dezenas de dependências injetadas que orquestram persistência, envio de email, validação de documento e regras contábeis simultaneamente.`,realRisk:`Qualquer mudança em regras fiscais quebra o envio de emails; testes unitários tornam-se impossíveis sem dezenas de mocks complexos.`,goldenRule:`Uma classe deve ter apenas uma razão para mudar (um único ator ou interesse de negócio).`,codeLanguage:`csharp`,badCode:`public class VendaManager { // ✕ Mistura orquestração, regras fiscais, IO e emails!
    public void FecharVenda() { ValidarEstoque(); EmitirNFe(); CobrarCartao(); EnviarEmail(); GerarLog(); }
}`,goodCode:`// ✓ Separado em classes focadas orquestradas por Mediator ou Workflow
public class FecharVendaCommandHandler : IRequestHandler<FecharVendaCommand> {
    // Apenas delega para serviços especializados com responsabilidade estrita
}`,mnemonicTip:`Mnemônico: "Quem faz tudo não faz nada direito e quebra por qualquer motivo".`},{id:`solid-2`,index:`C.2`,title:`[O] Aberto para Extensão, Fechado para Modificação (OCP)`,riskLevel:`alto`,whatToLookFor:`Estruturas switch-case ou if/else gigantescas avaliando strings de "Tipo" para executar regras de negócio divergentes.`,realRisk:`A inclusão de uma nova regra exige editar e testar novamente todos os fluxos anteriores, com risco de regressão acidental.`,goldenRule:`Substitua switches extensíveis por polimorfismo, interfaces e o padrão Strategy.`,codeLanguage:`csharp`,badCode:`switch(tipoFrete) {
    case "Sedex": return peso * 1.5m;
    case "PAC": return peso * 0.8m;
    // Cada novo frete exige alterar este método já testado!
}`,goodCode:`public interface ICalculadorFrete { decimal Calcular(decimal peso); }
// Cada estratégia é uma nova classe: zero alteração no código legado`,mnemonicTip:`Mnemônico: "Plugue novos módulos como portas USB; não abra o gabinete para soldar fios novos".`},{id:`solid-3`,index:`C.3`,title:`[L] Substituição de Liskov (LSP)`,riskLevel:`alto`,whatToLookFor:`Subclasses que sobrescrevem métodos da classe base apenas para lançar NotImplementedException ou enfraquecer invariantes.`,realRisk:`Código que consome a classe base quebra inesperadamente quando recebe uma instância derivada em tempo de execução.`,goldenRule:`Subtipos devem ser substituíveis por seus tipos base sem alterar o comportamento correto do programa.`,codeLanguage:`csharp`,badCode:`public class ContaPoupanca : ContaBancaria {
    public override void CobrarTarifaManutencao() => throw new NotImplementedException(); // ✕ Viola LSP!
}`,goodCode:`// ✓ Segregue a funcionalidade em interfaces adequadas (ex: ITarifavel)
public interface ITarifavel { void CobrarTarifa(); }`,mnemonicTip:`Mnemônico: "Se parece pato, grasna como pato mas precisa de pilhas, você tem a abstração errada".`},{id:`solid-4`,index:`C.4`,title:`[I] Segregação de Interfaces (ISP)`,riskLevel:`medio`,whatToLookFor:`Interfaces gigantes ("gordas") com 15 a 20 métodos onde classes clientes implementam apenas 2 ou 3 e deixam o restante com throw ou vazios.`,realRisk:`Acoplamento indesejado: alterações em métodos não utilizados forçam recompilação e quebram contratos dos consumidores.`,goldenRule:`Muitas interfaces específicas são melhores que uma única interface genérica.`,codeLanguage:`csharp`,badCode:`public interface IRepositorioTotal<T> {
    void Salvar(T e); void Excluir(T e); void ExportarPdf(); void EnviarWebhook(); // ✕ Interface sobrecarregada!
}`,goodCode:`public interface ILeituraRepositorio<T> { Task<T> GetByIdAsync(int id); }
public interface IEscritaRepositorio<T> { Task AdicionarAsync(T e); } // ✓ Granular`,mnemonicTip:`Mnemônico: "Ninguém deve ser forçado a pedir o menu degustação completo quando quer apenas café".`},{id:`solid-5`,index:`C.5`,title:`[D] Inversão de Dependências (DIP)`,riskLevel:`alto`,whatToLookFor:`Classes de serviço instanciando dependências concretas diretamente com o operador new (ex: new SmtpClient(), new SqlConnection(), new HttpClient()).`,realRisk:`Acoplamento rígido à infraestrutura, impedindo criação de testes unitários sem servidores reais ativos.`,goldenRule:`Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações.`,codeLanguage:`csharp`,badCode:`public class NotificadorService {
    private SmtpClient _client = new SmtpClient("smtp.mail.com"); // ✕ Dependência concreta soldada!
}`,goodCode:`public class NotificadorService {
    private readonly IServicoEnvioEmail _emailService; // ✓ Depende de abstração injetada
    public NotificadorService(IServicoEnvioEmail emailService) { _emailService = emailService; }
}`,mnemonicTip:`Mnemônico: "Você não solda o cabo do abajur direto na fiação da parede; você usa uma tomada (abstração)".`}]},{id:`guide-imutabilidade`,sectionLetter:`D`,sectionTitle:`Guia Técnico 4: Imutabilidade e Invariantes de Estado (DDD)`,category:`imutabilidade`,description:`Blindagem do modelo de domínio corporativo contra mutações acidentais, modelos anêmicos e corrupção de estado histórico.`,iconSvg:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,items:[{id:`imut-1`,index:`D.1`,title:`Modelo Anêmico com Setters Públicos em Campos Críticos`,riskLevel:`critico`,whatToLookFor:`Entidades contendo propriedades sensíveis (Status, Saldo, Totais, Limites) com { get; set; } públicos abertos para alteração direta por qualquer camada.`,realRisk:`Corrupção de dados: qualquer programador ou rotina externa pode forçar status inválidos ou valores negativos sem validação.`,goldenRule:`Propriedades de entidades de negócio devem ter setters privados ou protegidos; o estado só deve ser alterado por métodos semânticos da entidade.`,codeLanguage:`csharp`,badCode:`public class Pedido {
    public decimal Total { get; set; } // ✕ Qualquer um faz: pedido.Total = 0;
    public StatusPedido Status { get; set; } // ✕ pedido.Status = StatusPedido.Faturado;
}`,goodCode:`public class Pedido {
    public decimal Total { get; private set; } // ✓ Protegido
    public StatusPedido Status { get; private set; }
    
    public void Faturar(ComprovantePagamento comprovante) { // ✓ Mutação via método semântico
        if (Status != StatusPedido.Aprovado) throw new DomainException("Pedido precisa estar aprovado.");
        Status = StatusPedido.Faturado;
    }
}`,mnemonicTip:`Mnemônico: "Entidade não é saco de variáveis; é guardiã das suas próprias regras".`},{id:`imut-2`,index:`D.2`,title:`Coleções Expostas Mutáveis (List<T> vs IReadOnlyCollection<T>)`,riskLevel:`alto`,whatToLookFor:`Entidades expondo listas internas como public List<ItemPedido> Itens { get; set; } permitindo que consumidores chamem .Add() ou .Clear() diretamente.`,realRisk:`Adição ou remoção de itens sem recalcular os impostos, subtotais ou descontos da entidade pai.`,goldenRule:`Encapsule listas internas em campos privados e exponha apenas IReadOnlyCollection<T>; adicione itens exclusivamente via métodos semânticos do pai.`,codeLanguage:`csharp`,badCode:`public class Carrinho {
    public List<Item> Itens { get; set; } = new(); // ✕ carrinho.Itens.Clear(); quebra cálculos!
}`,goodCode:`public class Carrinho {
    private readonly List<Item> _itens = new();
    public IReadOnlyCollection<Item> Itens => _itens.AsReadOnly(); // ✓ Leitura protegida
    
    public void AdicionarItem(Produto produto, int quantidade) {
        // Valida estoque, adiciona e recalcula total na mesma operação
    }
}`,mnemonicTip:`Mnemônico: "Quem expõe a lista perde o controle do total".`},{id:`imut-3`,index:`D.3`,title:`Comandos de UPDATE Alterando Fatos Contábeis Históricos`,riskLevel:`critico`,whatToLookFor:`Operações de alteração (UPDATE) executadas sobre registros de pagamentos, lançamentos contábeis ou emissões fiscais já finalizados.`,realRisk:`Destruição do histórico contábil e crime fiscal. Fatos contábeis ocorridos no passado nunca devem ser alterados na mesma linha.`,goldenRule:`Fatos contábeis e fiscais são imutáveis (append-only); qualquer correção exige lançamento de estorno ou compensação.`,codeLanguage:`csharp`,badCode:`// ✕ Modificação destrutiva do passado:
lancamentoAntigo.Valor = novoValor;
await _db.SaveChangesAsync();`,goodCode:`// ✓ Correção contábil legítima com estorno e contrapartida:
var estorno = Lancamento.CriarEstorno(lancamentoAntigo, motivo, operadorId);
var novoLancamento = Lancamento.CriarAjuste(novoValor, motivo, operadorId);
await _db.Lancamentos.AddRangeAsync(estorno, novoLancamento);`,mnemonicTip:`Mnemônico: "Passado se estorna, não se reforma".`}]},{id:`guide-exclusao`,sectionLetter:`E`,sectionTitle:`Guia Técnico 5: Auditoria de Exclusão, Cascata e Fluxo Completo de Informação`,category:`exclusao`,description:`Prevenção de regressão de deleção em cascata, integridade de exclusão lógica e consistência estrita no cancelamento com reversão total.`,iconSvg:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,items:[{id:`exc-1`,index:`E.1`,title:`DeleteBehavior.Cascade em Entidades Históricas ou Fiscais`,riskLevel:`critico`,whatToLookFor:`Mapeamentos relacionais no EF Core com DeleteBehavior.Cascade configurado em tabelas como NotasFiscais, Contratos, Faturas ou Pagamentos.`,realRisk:`Se um cliente ou produto for excluído acidentalmente, todo o histórico legal, tributário e fiscal associado é deletado do banco sem aviso.`,goldenRule:`Utilize DeleteBehavior.Restrict em qualquer entidade com valor legal, contábil ou fiscal.`,codeLanguage:`csharp`,badCode:`builder.HasMany(c => c.NotasFiscais)
    .WithOne(n => n.Cliente)
    .OnDelete(DeleteBehavior.Cascade); // ✕ Deletar o cliente apaga todas as notas!`,goodCode:`builder.HasMany(c => c.NotasFiscais)
    .WithOne(n => n.Cliente)
    .OnDelete(DeleteBehavior.Restrict); // ✓ O banco recusa a deleção se houver notas`,mnemonicTip:`Mnemônico: "Cascade em fiscal é suicídio contábil".`},{id:`exc-2`,index:`E.2`,title:`Exclusão Física (Hard Delete) em Entidades Críticas`,riskLevel:`alto`,whatToLookFor:`Uso de _context.Remove(entidade) em registros de clientes, produtos, contas ou transações.`,realRisk:`Perda irreparável de rastreabilidade. Em caso de auditoria forense ou investigação, os dados desapareceram da base.`,goldenRule:`Utilize Soft Delete (IsDeleted = true, DeletedAtUtc = DateTime.UtcNow) acompanhado de filtros globais de consulta (HasQueryFilter).`,codeLanguage:`csharp`,badCode:`_context.Clientes.Remove(cliente); // ✕ Deleção física destrutiva`,goodCode:`cliente.MarcarComoExcluido(User.GetUserId()); // ✓ Soft delete com autor e timestamp
// No DbContext: builder.Entity<Cliente>().HasQueryFilter(c => !c.IsDeleted);`,mnemonicTip:`Mnemônico: "Dados corporativos não morrem; entram em arquivo morto".`},{id:`exc-3`,index:`E.3`,title:`Índices Únicos Quebrados por Soft Delete`,riskLevel:`alto`,whatToLookFor:`Índices UNIQUE simples sobre campos como Email, CNPJ ou CPF em tabelas que utilizam exclusão lógica.`,realRisk:`Impossibilidade de recadastro: se um cliente for excluído logicamente, o sistema impede cadastrar novamente aquele mesmo CNPJ porque o índice único bloqueia o registro desativado.`,goldenRule:`Configure índices UNIQUE com filtro parcial (Filtered Index) desconsiderando registros com exclusão lógica.`,codeLanguage:`csharp`,badCode:`builder.HasIndex(c => c.Cnpj).IsUnique(); // ✕ Bloqueia recadastros futuros de CNPJ desativado!`,goodCode:`builder.HasIndex(c => c.Cnpj)
    .IsUnique()
    .HasFilter("[DeletedAtUtc] IS NULL"); // ✓ SQL Server / Postgres: índice único apenas para ativos`,mnemonicTip:`Mnemônico: "Índice sem filtro parcial confunde o defunto com o recém-nascido".`},{id:`exc-4`,index:`E.4`,title:`Efeito Dominó Desatendido no Cancelamento (Fluxo Reverso)`,riskLevel:`critico`,whatToLookFor:`Rotina de cancelamento de pedido que altera o status para "Cancelado", mas falha em localizar e estornar todas as etapas satélites (estoque reservado, títulos a receber, comissão de vendedor, limite de crédito).`,realRisk:`Saldos fantasmas em estoque, faturamento indevido cobrado do cliente no banco e pagamento de comissão por venda inexistente.`,goldenRule:`O fluxo de cancelamento deve ter um checklist formal de estorno reverso cobrindo 100% dos efeitos colaterais gerados na criação.`,codeLanguage:`csharp`,badCode:`pedido.Status = "Cancelado";
await _db.SaveChangesAsync(); // ✕ O estoque e o financeiro foram esquecidos!`,goodCode:`// ✓ Reversão completa de todas as ramificações:
await _estoque.DevolverReservaAsync(pedido);
await _financeiro.CancelarContasAReceberAsync(pedido);
await _comissoes.EstornarComissoesAsync(pedido);
pedido.MarcarComoCancelado(motivo, usuarioId);`,mnemonicTip:`Mnemônico: "Cancelar não é mudar etiqueta; é desfazer cada nó amarrado na criação".`},{id:`exc-5`,index:`E.5`,title:`Ausência de Transação Atômica na Reversão Múltipla`,riskLevel:`critico`,whatToLookFor:`Estorno de múltiplos agregados ou serviços externos executado sem uma transação de banco de dados explícita englobando todas as etapas.`,realRisk:`Inconsistência parcial: se o estorno de contas a receber der timeout ou erro, o estoque já foi devolvido mas o financeiro permaneceu ativo.`,goldenRule:`Toda operação de compensação/estorno composta deve ocorrer dentro de uma transação com garantia de Rollback integral.`,codeLanguage:`csharp`,badCode:`await _estoque.EstornarAsync(id); // Gravou no banco
// Se cair a energia aqui, o financeiro NUNCA foi estornado!
await _financeiro.EstornarAsync(id);`,goodCode:`await using var tx = await _db.Database.BeginTransactionAsync();
try {
    await _estoque.EstornarAsync(id);
    await _financeiro.EstornarAsync(id);
    await _db.SaveChangesAsync();
    await tx.CommitAsync(); // ✓ Tudo ou nada
} catch {
    await tx.RollbackAsync();
    throw;
}`,mnemonicTip:`Mnemônico: "Sem transação, o estorno pela metade é duas vezes pior que o erro original".`}]}],a=class{activeCategory=`all`;searchQuery=``;auditedItems=new Set;isLightMode=!1;themeToggleBtn=document.getElementById(`theme-toggle-btn`);backToTopBtn=document.getElementById(`back-to-top`);searchInput=document.getElementById(`search-input`);pillsContainer=document.getElementById(`audit-category-pills`);booksSection=document.getElementById(`section-livros`);booksContainer=document.getElementById(`books-list`);tasksSection=document.getElementById(`section-tarefas-auditoria`);tasksContainer=document.getElementById(`tasks-list`);unifiedSection=document.getElementById(`section-checklist-unificado`);unifiedContainer=document.getElementById(`unified-checklist-container`);guidesSection=document.getElementById(`section-como-auditar`);guidesContainer=document.getElementById(`guides-list`);progressFill=document.getElementById(`progress-bar-fill`);progressStat=document.getElementById(`progress-stat`);celebrateBanner=document.getElementById(`celebrate-banner`);resetBtn=document.getElementById(`btn-reset-audited`);toastElement=document.getElementById(`audit-toast`);constructor(){this.initTheme(),this.loadSavedAudited(),this.setupEventListeners(),this.renderCategoryPills(),this.renderBooks(),this.renderTasks(),this.renderUnifiedChecklist(),this.renderGuides(),this.updateProgress()}initTheme(){localStorage.getItem(`guia-theme`)===`light`&&(this.isLightMode=!0,document.documentElement.setAttribute(`data-theme`,`light`)),this.updateThemeButton()}toggleTheme(){this.isLightMode=!this.isLightMode;let e=this.isLightMode?`light`:`dark`;document.documentElement.setAttribute(`data-theme`,e),localStorage.setItem(`guia-theme`,e),this.updateThemeButton()}updateThemeButton(){this.themeToggleBtn&&(this.themeToggleBtn.innerHTML=this.isLightMode?`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,this.themeToggleBtn.title=this.isLightMode?`Alternar para Modo Escuro`:`Alternar para Modo Claro`)}loadSavedAudited(){try{let e=localStorage.getItem(`guia-auditoria-checked`);if(e){let t=JSON.parse(e);Array.isArray(t)&&(this.auditedItems=new Set(t))}}catch(e){console.warn(`Erro ao carregar itens auditados do localStorage`,e)}}saveAudited(){localStorage.setItem(`guia-auditoria-checked`,JSON.stringify(Array.from(this.auditedItems)))}toggleAudited(e){this.auditedItems.has(e)?this.auditedItems.delete(e):this.auditedItems.add(e),this.saveAudited(),this.updateProgress();let t=document.getElementById(`audit-card-${e}`);if(t){let n=this.auditedItems.has(e);t.classList.toggle(`is-audited`,n);let r=t.querySelector(`.btn-toggle-audited`);r&&(r.classList.toggle(`is-checked`,n),r.innerHTML=n?`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Auditado`:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Marcar como Auditado`)}}resetAudited(){confirm(`Deseja realmente desmarcar todas as tarefas e auditorias concluídas?`)&&(this.auditedItems.clear(),this.saveAudited(),this.updateProgress(),document.querySelectorAll(`.audit-card`).forEach(e=>{e.classList.remove(`is-audited`);let t=e.querySelector(`.btn-toggle-audited`);t&&(t.classList.remove(`is-checked`),t.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Marcar como Auditado`)}))}updateProgress(){let e=t.length;i.forEach(t=>{e+=t.items.length});let n=this.auditedItems.size,r=e>0?Math.round(n/e*100):0;this.progressStat&&(this.progressStat.textContent=`${n} de ${e} verificados (${r}%)`),this.progressFill&&(this.progressFill.style.width=`${r}%`),this.celebrateBanner&&(r===100?this.celebrateBanner.classList.add(`is-active`):this.celebrateBanner.classList.remove(`is-active`))}async copyPrompt(e,t){try{await navigator.clipboard.writeText(e);let n=t.innerHTML;t.classList.add(`is-copied`),t.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Prompt Copiado!`,this.showToast(`Prompt especializado copiado com sucesso! Cole na sua IA favorita.`),setTimeout(()=>{t.classList.remove(`is-copied`),t.innerHTML=n},3e3)}catch(e){console.error(`Falha ao copiar prompt`,e),this.showToast(`Erro ao copiar. Selecione o texto manualmente.`)}}showToast(e){this.toastElement&&(this.toastElement.textContent=e,this.toastElement.classList.add(`is-active`),setTimeout(()=>{this.toastElement.classList.remove(`is-active`)},3500))}renderCategoryPills(){this.pillsContainer&&(this.pillsContainer.innerHTML=``,r.forEach(n=>{let r=document.createElement(`button`);r.type=`button`,r.className=`audit-pill ${n.id===this.activeCategory?`is-active`:``}`,r.dataset.category=n.id;let a=0;if(n.id===`all`)a=t.length+i.reduce((e,t)=>e+t.items.length,0);else if(n.id===`livros`)a=e.length;else if(n.id===`tarefas`)a=t.length;else if(n.id===`checklist-unificado`)a=4;else{let e=i.find(e=>e.category===n.id);e&&(a=e.items.length)}r.innerHTML=`
        ${n.iconSvg}
        <span>${n.label}</span>
        <span class="audit-pill-count">${a}</span>
      `,r.addEventListener(`click`,()=>{this.activeCategory=n.id,document.querySelectorAll(`.audit-pill`).forEach(e=>e.classList.remove(`is-active`)),r.classList.add(`is-active`),this.filterAll()}),this.pillsContainer.appendChild(r)}))}renderBooks(){this.booksContainer&&(this.booksContainer.innerHTML=``,e.forEach(e=>{let t=document.createElement(`article`);t.className=`audit-book-card`,t.dataset.id=e.id;let n=e.pillars.map(e=>`
        <div class="audit-book-pillar-item">
          <div class="audit-book-pillar-title">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            ${e.title}
          </div>
          <div class="audit-book-pillar-desc">${e.description}</div>
        </div>
      `).join(``);t.innerHTML=`
        <div class="audit-book-header">
          <div class="audit-book-avatar">${e.avatarSvg}</div>
          <div class="audit-book-meta">
            <span class="audit-book-author">${e.author}</span>
            <span class="audit-book-title">${e.bookTitle}</span>
          </div>
        </div>
        <span class="audit-book-badge">${e.badge}</span>
        <blockquote class="audit-book-quote">"${e.quote}"</blockquote>
        <div class="audit-book-pillars">${n}</div>
      `,this.booksContainer.appendChild(t)}))}renderTasks(){this.tasksContainer&&(this.tasksContainer.innerHTML=``,t.forEach(e=>{let t=document.createElement(`article`),n=this.auditedItems.has(e.id);t.className=`audit-card ${n?`is-audited`:``}`,t.id=`audit-card-${e.id}`,t.dataset.id=e.id,t.dataset.risk=e.riskLevel;let r=e.failureCriteria.map(e=>`<li>${e}</li>`).join(``);t.innerHTML=`
        <div class="audit-card-top">
          <div class="audit-card-meta">
            <span class="audit-index-badge">Tarefa ${e.number}</span>
            <span class="audit-risk-badge risk-${e.riskLevel}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Risco ${e.riskLevel.toUpperCase()}
            </span>
          </div>

          <button
            type="button"
            class="btn-toggle-audited ${n?`is-checked`:``}"
            aria-label="Marcar tarefa ${e.number} como auditada"
          >
            ${n?`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Auditado`:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Marcar como Auditado`}
          </button>
        </div>

        <h3 class="audit-card-title">${e.title}</h3>

        <div class="audit-objective-box">
          <div class="audit-objective-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            Objetivo da Auditoria:
          </div>
          <div>${e.objective}</div>
        </div>

        <div class="audit-failure-criteria">
          <div class="audit-failure-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            Critérios de Reprovação (Violações):
          </div>
          <ul class="audit-failure-list">
            ${r}
          </ul>
        </div>

        <div class="audit-prompt-box">
          <div class="audit-prompt-header">
            <span class="audit-prompt-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Prompt Especializado para IA (Tarefa ${e.number})
            </span>
            <button type="button" class="btn-copy-prompt" aria-label="Copiar prompt da tarefa ${e.number}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              Copiar Prompt
            </button>
          </div>
          <div class="audit-prompt-content">${this.escapeHtml(e.promptText)}</div>
        </div>

        <div class="audit-code-comparison">
          <div class="audit-code-block is-bad">
            <div class="audit-code-header is-bad">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              ✕ Exemplo Incorreto / Violação
            </div>
            <pre class="audit-code-pre"><code>${this.escapeHtml(e.codeExample.badSnippet)}</code></pre>
            <div class="audit-code-footer">${e.codeExample.badExplanation}</div>
          </div>

          <div class="audit-code-block is-good">
            <div class="audit-code-header is-good">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              ✓ Padrão Auditado / Conformidade
            </div>
            <pre class="audit-code-pre"><code>${this.escapeHtml(e.codeExample.goodSnippet)}</code></pre>
            <div class="audit-code-footer">${e.codeExample.goodExplanation}</div>
          </div>
        </div>

        <div class="audit-mnemonic-box">
          <span class="audit-mnemonic-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/><line x1="10" y1="22" x2="14" y2="22"/></svg>
          </span>
          <span><strong>Dica Mnemônica:</strong> ${e.mnemonicTip}</span>
        </div>
      `;let i=t.querySelector(`.btn-toggle-audited`);i&&i.addEventListener(`click`,()=>this.toggleAudited(e.id));let a=t.querySelector(`.btn-copy-prompt`);a&&a.addEventListener(`click`,()=>this.copyPrompt(e.promptText,a)),this.tasksContainer.appendChild(t)}))}renderUnifiedChecklist(){if(!this.unifiedContainer)return;let e=n,t=e.axes.map(e=>`
      <div class="audit-axis-card">
        <div class="audit-axis-title">
          ${e.iconSvg}
          ${e.title}
        </div>
        <ul class="audit-axis-points">
          ${e.points.map(e=>`<li>${e}</li>`).join(``)}
        </ul>
      </div>
    `).join(``),r=e.outputFormat.map(e=>`
      <div class="audit-severity-pill">
        <span class="audit-severity-tag ${e.level.toLowerCase().replace(/[[\]]/g,``)}">${e.level}</span>
        <span>${e.description}</span>
      </div>
    `).join(``);this.unifiedContainer.innerHTML=`
      <div class="audit-unified-box">
        <div class="audit-unified-header">
          <div class="audit-unified-title-group">
            <h3 class="audit-unified-title">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--brand-primary);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              ${e.title}
            </h3>
            <p class="audit-unified-subtitle">${e.objective}</p>
          </div>
          <button type="button" class="btn-copy-prompt" id="btn-copy-unified-prompt" aria-label="Copiar Prompt Unificado">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copiar Prompt Unificado
          </button>
        </div>

        <div class="audit-axes-grid">${t}</div>

        <div class="audit-severity-legend">${r}</div>

        <div class="audit-prompt-box">
          <div class="audit-prompt-header">
            <span class="audit-prompt-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Prompt Completo por Arquivo (.NET / C#)
            </span>
          </div>
          <div class="audit-prompt-content">${this.escapeHtml(e.promptText)}</div>
        </div>
      </div>
    `;let i=document.getElementById(`btn-copy-unified-prompt`);i&&i.addEventListener(`click`,()=>this.copyPrompt(e.promptText,i))}renderGuides(){this.guidesContainer&&(this.guidesContainer.innerHTML=``,i.forEach(e=>{let t=document.createElement(`div`);t.className=`audit-guide-section`,t.dataset.category=e.category,t.style.marginBottom=`3rem`;let n=e.items.map(e=>{let t=this.auditedItems.has(e.id),n=e.badCode&&e.goodCode?`
            <div class="audit-code-comparison" style="margin-top: 1rem;">
              <div class="audit-code-block is-bad">
                <div class="audit-code-header is-bad">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  ✕ Exemplo Incorreto / Anti-padrão
                </div>
                <pre class="audit-code-pre"><code>${this.escapeHtml(e.badCode)}</code></pre>
              </div>
              <div class="audit-code-block is-good">
                <div class="audit-code-header is-good">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  ✓ Padrão Seguro / Código Auditado
                </div>
                <pre class="audit-code-pre"><code>${this.escapeHtml(e.goodCode)}</code></pre>
              </div>
            </div>
          `:``,r=e.mnemonicTip?`
            <div class="audit-mnemonic-box" style="margin-top: 0.75rem;">
              <span class="audit-mnemonic-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/><line x1="10" y1="22" x2="14" y2="22"/></svg>
              </span>
              <span><strong>Mnemônico:</strong> ${e.mnemonicTip}</span>
            </div>
          `:``;return`
            <article class="audit-card ${t?`is-audited`:``}" id="audit-card-${e.id}" data-id="${e.id}" data-risk="${e.riskLevel}" style="margin-bottom: 1.5rem;">
              <div class="audit-card-top">
                <div class="audit-card-meta">
                  <span class="audit-index-badge">${e.index}</span>
                  <span class="audit-risk-badge risk-${e.riskLevel}">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    Risco ${e.riskLevel.toUpperCase()}
                  </span>
                </div>
                <button
                  type="button"
                  class="btn-toggle-audited ${t?`is-checked`:``}"
                  data-audit-id="${e.id}"
                  aria-label="Marcar item ${e.index} como auditado"
                >
                  ${t?`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Auditado`:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Marcar como Auditado`}
                </button>
              </div>

              <h4 class="audit-card-title">${e.title}</h4>

              <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.875rem; line-height: 1.5;">
                <div>
                  <strong style="color: var(--text-main);">🔍 O Que Procurar:</strong>
                  <span style="color: var(--text-muted);">${e.whatToLookFor}</span>
                </div>
                <div>
                  <strong style="color: #ef4444;">⚠️ Risco Real em Produção:</strong>
                  <span style="color: var(--text-muted);">${e.realRisk}</span>
                </div>
                ${e.goldenRule?`
                  <div style="background: rgba(16, 185, 129, 0.08); border-left: 3px solid #10b981; padding: 0.5rem 0.75rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
                    <strong style="color: #10b981;">🛡️ Regra de Ouro:</strong>
                    <span style="color: var(--text-main); font-weight: 500;">${e.goldenRule}</span>
                  </div>
                `:``}
              </div>

              ${n}
              ${r}
            </article>
          `}).join(``);t.innerHTML=`
        <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 1.25rem;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: var(--radius-md); background: rgba(99, 102, 241, 0.12); color: var(--brand-primary);">
            ${e.iconSvg}
          </div>
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-main);">${e.sectionTitle}</h3>
            <p style="font-size: 0.875rem; color: var(--text-muted);">${e.description}</p>
          </div>
        </div>
        <div class="audit-guide-items-grid">
          ${n}
        </div>
      `,t.querySelectorAll(`.btn-toggle-audited`).forEach(e=>{let t=e.dataset.auditId;t&&e.addEventListener(`click`,()=>this.toggleAudited(t))}),this.guidesContainer.appendChild(t)}))}filterAll(){let e=this.searchQuery.toLowerCase().trim();if(this.booksSection){if(this.activeCategory!==`all`&&this.activeCategory!==`livros`)this.booksSection.style.display=`none`;else{let t=!1;document.querySelectorAll(`.audit-book-card`).forEach(n=>{let r=n.textContent?.toLowerCase()||``,i=!e||r.includes(e);n.style.display=i?`flex`:`none`,i&&(t=!0)}),this.booksSection.style.display=t?`block`:`none`}}if(this.tasksSection){if(this.activeCategory!==`all`&&this.activeCategory!==`tarefas`)this.tasksSection.style.display=`none`;else{let t=!1;document.querySelectorAll(`#tasks-list .audit-card`).forEach(n=>{let r=n.textContent?.toLowerCase()||``,i=!e||r.includes(e);n.style.display=i?`flex`:`none`,i&&(t=!0)}),this.tasksSection.style.display=t?`block`:`none`}}if(this.unifiedSection){if(this.activeCategory!==`all`&&this.activeCategory!==`checklist-unificado`)this.unifiedSection.style.display=`none`;else{let t=this.unifiedContainer?.textContent?.toLowerCase()||``,n=!e||t.includes(e);this.unifiedSection.style.display=n?`block`:`none`}}if(this.guidesSection){let t=[`rbac`,`estatico`,`solid`,`imutabilidade`,`exclusao`].includes(this.activeCategory);if(!(this.activeCategory===`all`||t))this.guidesSection.style.display=`none`;else{let t=!1;document.querySelectorAll(`.audit-guide-section`).forEach(n=>{let r=n.dataset.category;if(this.activeCategory!==`all`&&this.activeCategory!==r)n.style.display=`none`;else{let r=!1;n.querySelectorAll(`.audit-card`).forEach(t=>{let n=t.textContent?.toLowerCase()||``,i=!e||n.includes(e);t.style.display=i?`flex`:`none`,i&&(r=!0)}),n.style.display=r?`block`:`none`,r&&(t=!0)}}),this.guidesSection.style.display=t?`block`:`none`}}}setupEventListeners(){this.themeToggleBtn&&this.themeToggleBtn.addEventListener(`click`,()=>this.toggleTheme()),this.resetBtn&&this.resetBtn.addEventListener(`click`,()=>this.resetAudited()),this.searchInput&&this.searchInput.addEventListener(`input`,e=>{this.searchQuery=e.target.value,this.filterAll()}),this.backToTopBtn&&(window.addEventListener(`scroll`,()=>{window.scrollY>400?this.backToTopBtn.classList.add(`is-visible`):this.backToTopBtn.classList.remove(`is-visible`)}),this.backToTopBtn.addEventListener(`click`,()=>{window.scrollTo({top:0,behavior:`smooth`})}))}escapeHtml(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`)}};document.addEventListener(`DOMContentLoaded`,()=>{new a});