import"./main-CvY94YZ6.js";var e=[{id:`all`,label:`Todos os Tópicos`,iconSvg:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`},{id:`prompts`,label:`O Que Auditar (8 Prompts)`,iconSvg:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`},{id:`rbac`,label:`RBAC & Controle de Acesso`,iconSvg:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`},{id:`estatico`,label:`Checklist Estático & Sintaxe`,iconSvg:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`},{id:`solid`,label:`Princípios S.O.L.I.D.`,iconSvg:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`},{id:`imutabilidade`,label:`Imutabilidade & Invariantes`,iconSvg:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`},{id:`exclusao`,label:`Exclusão, Cascata & Reversão`,iconSvg:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`}],t=[{id:`prompt-rastreabilidade`,number:1,title:`Rastreabilidade (Audit Trail / Event Sourcing) para Operações`,shortTitle:`Rastreabilidade & Audit Trail`,category:`prompts`,riskLevel:`critico`,conceptOneLiner:`Toda mutação de dados críticos deve registrar de forma indelével quem alterou, quando alterou, o que mudou e o estado anterior/novo.`,whyItMatters:`Em caso de fraude, estorno indevido ou corrupção de dados, a ausência de trilha de auditoria impede determinar responsabilidades e torna impossível recompor o histórico financeiro ou fiscal da aplicação.`,commonTraps:[`Executar updates diretos no banco (UPDATE ... SET) sem capturar valores antigos no log.`,`Logs que salvam apenas "Registro alterado com sucesso" sem o ID do usuário autenticado ou IP.`,`Auditorias gravadas na mesma tabela que podem ser apagadas acidentalmente com DELETE cascata.`],promptText:`Você é um Auditor Sênior de Segurança de Software e Conformidade (Compliance).
Analise o código-fonte fornecido em busca de falhas de RASTREABILIDADE (Audit Trail / Event Sourcing).

Critérios de Inspeção:
1. Identifique todas as operações de mutação (Criação, Atualização, Exclusão, Aprovação, Cancelamento).
2. Verifique se existe gravação automática do autor da ação (UserId, UserName, TenantId), timestamp UTC e IP de origem.
3. Cheque se os valores anteriores (Snapshot Pré-Alteração) e novos valores (Snapshot Pós-Alteração) são salvos de forma estruturada (ex: JSON Diff).
4. Verifique se os logs de auditoria são imutáveis (append-only) e se há proteção contra exclusão direta ou edição do histórico.
5. Se for Event Sourcing: garanta que eventos de domínio sejam imutáveis e persistidos antes da publicação externa.

Formato de Resposta:
- Tabela com: [Arquivo/Método] | [Operação de Mutação] | [Status de Rastreabilidade] | [Gravidade]
- Apontamento de trechos vulneráveis com exemplo de correção usando interceptor de DbContext / Event Store.`,codeExample:{language:`csharp`,badSnippet:`// ✕ VULNERABILIDADE: Update silencioso sem nenhum rastro de auditoria
[HttpPost("atualizar-limite")]
public async Task<IActionResult> AtualizarLimite(int clienteId, decimal novoLimite)
{
    var cliente = await _context.Clientes.FindAsync(clienteId);
    cliente.LimiteCredito = novoLimite; // Quem mudou? Qual era o limite anterior? Por que mudou?
    await _context.SaveChangesAsync();
    return Ok();
}`,badExplanation:`O saldo/limite é alterado diretamente na base. Se houver desvio ou fraude, ninguém saberá qual operador executou a ação nem qual era o valor prévio.`,goodSnippet:`// ✓ PADRÃO AUDITADO: Trilha imutável com interceptor e evento de domínio
[HttpPost("atualizar-limite")]
public async Task<IActionResult> AtualizarLimite(AtualizarLimiteCommand cmd)
{
    var operadorId = User.GetUserId();
    await _clienteService.AlterarLimiteCreditoAsync(cmd.ClienteId, cmd.NovoLimite, cmd.Justificativa, operadorId);
    // O DbContext/Service grava automaticamente o AuditLog(Entidade, Chave, Operador, DataUtc, ValorAntigo, ValorNovo)
    return NoContent();
}`,goodExplanation:`A alteração passa por um método explícito que captura operador, justificativa e gera registro imutável com o snapshot anterior e posterior.`}},{id:`prompt-vazamento-logica`,number:2,title:`Vazamento da Lógica de Negócio para Controller ou Telas`,shortTitle:`Vazamento de Lógica de Negócio`,category:`prompts`,riskLevel:`alto`,conceptOneLiner:`Controllers e Views devem ser camadas finas de transporte e interface; regras de negócio e validações de domínio devem residir estritamente nos Serviços e Entidades.`,whyItMatters:`Quando lógica de negócio vaza para controllers ou telas, qualquer novo canal de entrada (ex: App Mobile, API parceira, fila de mensagens) duplicará ou burlará essas regras, gerando inconsistência catastrófica no banco de dados.`,commonTraps:[`Validações cruciais feitas apenas via JavaScript no front-end ou em diretivas @if do Razor/React.`,`Controllers com mais de 300 linhas contendo regras de elegibilidade, loops de validação e decisões de desconto.`,`Serviços atuando como meros repassadores anêmicos enquanto o Controller orquestra 5 repositórios diferentes.`],promptText:`Você é um Arquiteto de Software Sênior especializado em Clean Architecture e DDD.
Analise os Controllers e Camadas de Apresentação/Telas em busca de VAZAMENTO DE LÓGICA DE NEGÓCIO.

Critérios de Inspeção:
1. Detecte validações de negócio presentes no Controller ou na View (ex: if (cliente.Idade < 18), if (pedido.Total > 5000)).
2. Identifique regras de aprovação, cálculo de taxas, concessão de privilégios ou decisões de workflow dentro de endpoints HTTP.
3. Verifique se o Controller coordena múltiplos repositórios e executa persistência intermediária em vez de delegar para um Application Service / Command Handler.
4. O Controller deve ter apenas responsabilidades HTTP: desserializar input, invocar o caso de uso, e mapear para status HTTP (200, 201, 404, etc.).

Formato de Resposta:
- Lista dos Controllers/Telas com infração identificada.
- Código problemático destacado.
- Refatoração recomendada extraindo a lógica para a camada de Serviço/Domínio.`,codeExample:{language:`csharp`,badSnippet:`// ✕ ANTI-PADRÃO: Controller orquestrando regras de negócio e limites
[HttpPost("aprovar")]
public async Task<IActionResult> AprovarPedido(int id)
{
    var pedido = await _repo.GetByIdAsync(id);
    // VAZAMENTO: Regra de negócio fiscal/comercial dentro do Controller!
    if (pedido.ValorTotal > 10000 && !User.IsInRole("Diretor"))
        return BadRequest("Pedidos acima de 10k exigem aprovação de Diretor.");

    pedido.Status = "Aprovado";
    pedido.DataAprovacao = DateTime.UtcNow;
    await _repo.UpdateAsync(pedido);
    return Ok();
}`,badExplanation:`Se uma rotina de fila ou integração de API parceira aprovar um pedido, essa regra de valor máximo será ignorada por estar presa ao Controller HTTP.`,goodSnippet:`// ✓ PADRÃO SEGURO: Controller delega para o caso de uso no serviço de domínio
[HttpPost("aprovar")]
public async Task<IActionResult> AprovarPedido(int id)
{
    var command = new AprovarPedidoCommand(id, User.GetUserId(), User.GetRoles());
    var resultado = await _mediator.Send(command);
    return resultado.Match<IActionResult>(
        sucesso => Ok(sucesso),
        falha => BadRequest(falha.Mensagem)
    );
}`,goodExplanation:`Toda regra de limite por cargo e transição de estado é blindada dentro do serviço ou da própria entidade de domínio.`}},{id:`prompt-limite-agregados`,number:3,title:`O Limite dos Agregados e Invariantes (DDD)`,shortTitle:`Limites de Agregados & Invariantes`,category:`prompts`,riskLevel:`alto`,conceptOneLiner:`Agregados definem fronteiras de consistência transacional: entidades internas nunca devem ser salvas ou modificadas diretamente sem passar pela Raiz de Agregação (Aggregate Root).`,whyItMatters:`Permitir que itens internos de um pedido ou lançamentos de uma conta sejam gravados isoladamente destrói as invariantes do agregado (como soma total, limite de crédito e travas de status).`,commonTraps:[`Existência de repositórios para entidades-filhas (ex: ItemPedidoRepository.Save(item)) em vez de apenas PedidoRepository.`,`Modificar status ou preço de um item individual sem recalcular os totais e descontos da raiz.`,`Agregados gigantescos que carregam milhares de registros na memória para alterar um único booleano.`],promptText:`Você é um Especialista em Domain-Driven Design (DDD).
Analise o modelo de domínio e as camadas de persistência buscando violações de LIMITES DE AGREGADOS E INVARIANTES.

Critérios de Inspeção:
1. Verifique se existem Repositórios expostos para entidades que não são Raízes de Agregação (Aggregate Roots).
2. Busque acessos externos que manipulam coleções ou propriedades de entidades-filhas sem passar pelos métodos da Raiz.
3. Inspecione se as invariantes de negócio (regras que devem ser SEMPRE verdadeiras ao término da transação) estão sendo garantidas no Aggregate Root.
4. Cheque se um único caso de uso está modificando múltiplos agregados na mesma transação direta (sinal de fronteiras mal desenhadas).

Formato de Resposta:
- Mapeamento das violações de raiz de agregação.
- Diagnóstico de invariantes corrompidas.
- Plano de refatoração garantindo que toda mutação ocorra via métodos semânticos da Raiz.`,codeExample:{language:`csharp`,badSnippet:`// ✕ QUEBRA DE INVARIANTE: Repositório para entidade-filha salva item diretamente
public class ItemPedidoService
{
    private readonly IItemPedidoRepository _itemRepo; // Repositório de entidade interna!
    public async Task AtualizarPrecoItem(int itemId, decimal novoPreco)
    {
        var item = await _itemRepo.GetByIdAsync(itemId);
        item.PrecoUnitario = novoPreco;
        await _itemRepo.UpdateAsync(item); 
        // ERRO GRAVE: O Pedido pai não recalculou o ValorTotal nem os impostos!
    }
}`,badExplanation:`Ao atualizar o item de forma avulsa, o Pedido permanece com o total antigo, quebrando a consistência matemática do sistema.`,goodSnippet:`// ✓ PADRÃO DDD ROBUSTO: Apenas a Raiz de Agregação modifica e garante a consistência
public class Pedido : AggregateRoot
{
    private readonly List<ItemPedido> _itens = new();
    public IReadOnlyCollection<ItemPedido> Itens => _itens.AsReadOnly();
    public decimal ValorTotal { get; private set; }

    public void AtualizarPrecoItem(Guid itemId, decimal novoPreco)
    {
        ValidarStatusEdicaoPermitida(); // Garante invariante de status
        var item = _itens.FirstOrDefault(i => i.Id == itemId) 
            ?? throw new DomainException("Item inexistente no pedido.");
        item.AlterarPreco(novoPreco);
        RecalcularTotaisEImpostos(); // Mantém invariante matemática íntegra
    }
}`,goodExplanation:`A entidade pai protege seus itens, valida se o pedido pode ser editado e recalcula o total na mesma operação atômica.`}},{id:`prompt-controllers-sem-calculos`,number:4,title:`Controllers Não Devem Ter Regras de Cálculo`,shortTitle:`Sem Regras de Cálculo em Controllers`,category:`prompts`,riskLevel:`medio`,conceptOneLiner:`Fórmulas matemáticas, rateios, juros, descontos, fretes e impostos devem estar encapsulados em Value Objects ou Entidades de Domínio, nunca em Controllers.`,whyItMatters:`Cálculos espalhados em controllers criam redundância, erros de arredondamento divergentes e incapacidade de testar a lógica fiscal ou contábil sem disparar uma requisição HTTP falsa.`,commonTraps:[`Fórmulas com números mágicos hardcoded no Controller (ex: total = subtotal * 1.12m;).`,`Arredondamentos inconsistentes (Math.Round com MidpointRounding divergente entre endpoints).`,`Calcular o total a pagar no front-end e enviar para o controller que simplesmente confia no valor recebido.`],promptText:`Você é um Revisor de Código Sênior focado em Arquitetura Limpa e Testabilidade.
Analise os Controllers em busca de REGRAS DE CÁLCULO, fórmulas matemáticas ou rateios.

Critérios de Inspeção:
1. Encontre operações aritméticas (+, -, *, /) calculando preços, impostos, taxas, descontos, juros, parcelas ou comissões dentro de Controllers.
2. Identifique valores monetários e percentuais 'mágicos' (ex: 0.05m, 1.10m, 12) hardcoded em métodos de ação HTTP.
3. Verifique se o Controller confia no valor total calculado enviado pelo front-end em vez de recalcular no backend.
4. Sugira a extração de cada cálculo para um Value Object puro (ex: Dinheiro, Imposto, Desconto) ou método na Entidade/Domain Service com testes unitários cobrindo casos de borda.

Formato de Resposta:
- Trechos exatos dos Controllers que realizam cálculos.
- Value Object ou Classe de Domínio proposta para encapsular a regra.
- Exemplo de teste unitário para garantir a precisão do cálculo isolado.`,codeExample:{language:`csharp`,badSnippet:`// ✕ ANTI-PADRÃO: Cálculo de juros e comissão soltos dentro do Controller
[HttpPost("checkout")]
public async Task<IActionResult> FinalizarCompra([FromBody] CheckoutDto dto)
{
    decimal total = 0;
    foreach(var item in dto.Itens) {
        total += item.Preco * item.Qtd;
    }
    if (dto.Parcelas > 1) {
        total += total * (0.0299m * dto.Parcelas); // Número mágico e fórmula no Controller!
    }
    decimal comissao = total * 0.05m; // Regra financeira perdida no endpoint
    // ...
}`,badExplanation:`Cálculo de juros compostos ou comissão dentro do controller impede testes unitários puros e expõe o sistema a divergências.`,goodSnippet:`// ✓ PADRÃO SEGURO: Cálculo encapsulado em Value Object rico e testável
[HttpPost("checkout")]
public async Task<IActionResult> FinalizarCompra([FromBody] CheckoutRequest request)
{
    var condicaoPagamento = CondicaoPagamento.Criar(request.Parcelas);
    var resultado = await _checkoutService.ProcessarAsync(request.CarrinhoId, condicaoPagamento);
    return Ok(resultado);
}

// Domínio:
public record CondicaoPagamento(int Parcelas, TaxaJuros Taxa)
{
    public Dinheiro CalcularAcrescimo(Dinheiro valorBase) => ...;
}`,goodExplanation:`A regra de juros é expressa num Value Object com semântica rica, passível de centenas de testes unitários sem mock.`}},{id:`prompt-rbac-abac-seguranca`,number:5,title:`Autorização e Controle de Acesso (RBAC/ABAC)`,shortTitle:`RBAC, ABAC & Controle de Acesso`,category:`prompts`,riskLevel:`critico`,conceptOneLiner:`Auditar se a segurança falha em modo fechado (fail-closed), se mutações exigem permissões explícitas com tokens anti-CSRF e se não há vulnerabilidades IDOR/BOLA.`,whyItMatters:`Falhas de RBAC e IDOR permitem que qualquer usuário logado manipule recursos de outras empresas (tenants) ou force operações administrativas críticas simplesmente trocando o ID na URL ou requisição.`,commonTraps:[`Segurança fail-open: endpoints novos sem atributo [Authorize] ficando públicos por padrão.`,`Proteger GET e esquecer o POST/DELETE correspondente aberto a qualquer usuário autenticado.`,`Validar se o usuário tem permissão para editar, mas esquecer de validar se o registro pertence ao Tenant dele (IDOR).`],promptText:`Você é um Auditor Especialista em Segurança de Aplicações Web (AppSec) e OWASP Top 10.
Analise a esteira de AUTORIZAÇÃO, CONTROLE DE ACESSO (RBAC/ABAC) e ENDPOINTS DE MUTAÇÃO.

Critérios de Inspeção:
1. Fail-Open vs Fail-Closed: Verifique se os endpoints sem anotação explícita são negados por padrão (FallbackPolicy = RequireAuthenticatedUser).
2. Endpoints de Mutação (POST, PUT, PATCH, DELETE): Inspecione se exigem permissões explícitas ([RequirePermission("...")] ou [Authorize(Policy = "...")]).
3. Proteção Anti-CSRF: Cheque se formulários e requisições stateful de mutação exigem e validam token anti-falsificação ([ValidateAntiForgeryToken] / AutoValidateAntiforgeryTokenAttribute).
4. IDOR / BOLA (Insecure Direct Object Reference): Detecte endpoints que recebem IDs (ex: /pedidos/{id}) e executam ações sem validar se o registro pertence à conta/filial/empresa do usuário autenticado.
5. Permissões Órfãs: Compare se as strings de permissão usadas nos Controllers estão semeadas no banco e catálogo mestre do sistema.

Formato de Resposta:
- Lista de vulnerabilidades ordenadas por CVSS/Gravidade (Crítica, Alta, Média).
- PoC (Proof of Concept) hipotético de exploração de IDOR ou bypass de RBAC.
- Patch de código demonstrando o uso correto de políticas, filtros e escopo de tenant.`,codeExample:{language:`csharp`,badSnippet:`// ✕ VULNERABILIDADE GRAVE: Falha aberta + IDOR clássico
[HttpGet]
[Authorize(Roles = "Gerente")] // GET está protegido, mas o POST abaixo não herdou permissão específica!
public IActionResult Editar(int id) => View(...);

[HttpPost] // Faltou [ValidateAntiForgeryToken] e [RequirePermission]!
public async Task<IActionResult> Salvar([FromBody] AlterarNotaDto dto)
{
    var nota = await _db.Notas.FindAsync(dto.Id); // IDOR: Não filtra por EmpresaId do usuário!
    nota.Valor = dto.NovoValor;
    await _db.SaveChangesAsync();
    return Ok();
}`,badExplanation:`Qualquer usuário autenticado de qualquer empresa pode enviar POST direto para Salvar com o ID de outra filial e alterar notas alheias sem token CSRF.`,goodSnippet:`// ✓ PADRÃO SEGURO: Fail-closed, Anti-CSRF, Permissão granular e Tenant-Scope
[HttpPost]
[ValidateAntiForgeryToken]
[RequirePermission(Permissoes.Fiscal.NotasEditar)]
public async Task<IActionResult> Salvar([FromBody] AlterarNotaCommand cmd)
{
    var tenantId = User.GetTenantId();
    // Consulta escopada: impede IDOR por design
    var nota = await _db.Notas
        .FirstOrDefaultAsync(n => n.Id == cmd.Id && n.TenantId == tenantId);

    if (nota is null) return NotFound("Nota não encontrada ou acesso negado.");
    
    nota.Atualizar(cmd, User.GetUserId());
    await _db.SaveChangesAsync();
    return NoContent();
}`,goodExplanation:`Protegido contra CSRF, claim explícita validada e filtro forçado pelo tenant do usuário logado.`}},{id:`prompt-principios-solid`,number:6,title:`Auditoria dos Princípios SOLID`,shortTitle:`Auditoria Completa de SOLID`,category:`prompts`,riskLevel:`alto`,conceptOneLiner:`Auditar o design orientado a objetos: responsabilidade única, código aberto para extensão via estratégias, contratos íntegros de Liskov, interfaces segregadas e inversão de controle.`,whyItMatters:`Código que viola o SOLID apodrece rapidamente com acoplamento rígido: qualquer pequena modificação causa um efeito cascata de bugs em módulos não relacionados.`,commonTraps:[`God Classes com 15 dependências injetadas no construtor.`,`Switches gigantescos que precisam ser alterados toda vez que surge um novo tipo ou regra.`,`Classes concretas sendo instanciadas com new HttpClient() ou new SqlConnection() no meio da lógica de negócio.`],promptText:`Você é um Arquiteto de Software Sênior e Especialista em Clean Code e SOLID.
Realize uma AUDITORIA ESTRUTURAL COMPLETA DOS PRINCÍPIOS SOLID no código fornecido.

Critérios de Inspeção:
- S (Single Responsibility): Localize God Classes (> 300 linhas, > 4 dependências injetadas, misturando IO, regras e apresentação).
- O (Open/Closed): Identifique blocos gigantes de if/else ou switch sobre 'Tipo' que deveriam ser polimórficos ou Strategy patterns.
- L (Liskov Substitution): Encontre classes derivadas que lançam NotImplementedException, ignoram métodos da base ou alteram pré-condições.
- I (Interface Segregation): Busque interfaces 'gordas' onde classes clientes são forçadas a depender de métodos que não utilizam.
- D (Dependency Inversion): Procure instâncias diretas de infraestrutura usando 'new' (ex: new SmtpClient, new SqlConnection) dentro de serviços de aplicação.

Formato de Resposta:
- Tabela de Diagnóstico SOLID: [Princípio Violado] | [Classe/Arquivo] | [Evidência] | [Impacto no Ciclo de Vida]
- Sugestão prática de refatoração para cada princípio violado.`,codeExample:{language:`csharp`,badSnippet:`// ✕ VIOLAÇÕES MÚLTIPLAS DE SOLID (S, O, D):
public class ProcessadorGeralService 
{
    public void Processar(string tipo, object dados) {
        if (tipo == "Pix") { /* 100 linhas */ }
        else if (tipo == "Cartao") { /* 150 linhas */ }
        else if (tipo == "Boleto") { /* 80 linhas */ }
        
        var client = new HttpClient(); // Quebra D (acoplamento concreto)
        client.PostAsync("...", null);
    }
}`,badExplanation:`Uma única classe cuida de todos os pagamentos (quebra S), exige alteração direta para adicionar uma nova forma (quebra O) e instancia HttpClient na marreta (quebra D).`,goodSnippet:`// ✓ PADRÃO SOLID: Inversão de dependência e Strategy pattern extensível
public interface IProcessadorPagamento {
    bool Suporta(TipoPagamento tipo);
    Task<ResultadoPagamento> ProcessarAsync(Pagamento pagamento);
}

public class CheckoutService {
    private readonly IEnumerable<IProcessadorPagamento> _processadores;
    public CheckoutService(IEnumerable<IProcessadorPagamento> processadores) => _processadores = processadores;

    public async Task ProcessarAsync(Pagamento p) {
        var proc = _processadores.FirstOrDefault(x => x.Suporta(p.Tipo)) 
            ?? throw new NotSupportedException();
        await proc.ProcessarAsync(p);
    }
}`,goodExplanation:`Para aceitar Apple Pay ou Cripto, basta adicionar uma nova classe sem tocar no código existente (Open/Closed pleno).`}},{id:`prompt-imutabilidade-invariantes`,number:7,title:`Auditoria de Imutabilidade e Invariantes de Estado`,shortTitle:`Imutabilidade & Invariantes de Estado`,category:`prompts`,riskLevel:`critico`,conceptOneLiner:`Garantir que objetos de domínio não tenham setters públicos abertos, que coleções não possam ser manipuladas pelas costas da raiz e que registros contábeis/fiscais nunca sofram mutação direta.`,whyItMatters:`Setters públicos e coleções desprotegidas permitem que qualquer desenvolvedor júnior corrompa o saldo de uma conta ou mude o status de uma nota aprovada para cancelada sem disparar validações ou histórico.`,commonTraps:[`Entidades com public decimal Saldo { get; set; } permitindo saldo = -999999 sem validação.`,`Coleções expostas como public List<Item> Itens { get; set; } permitindo Clear() ou Add() externos.`,`Executar UPDATE direto em lançamentos contábeis já fechados em vez de emitir estorno contábil compensatório.`],promptText:`Você é um Especialista em Modelagem de Domínio Rico e Engenharia de Software Financeiro.
Analise as Entidades, Agregados e Modelos de Dados buscando VIOLAÇÕES DE IMUTABILIDADE E INVARIANTES DE ESTADO.

Critérios de Inspeção:
1. Modelos Anêmicos com Setters Públicos: Localize propriedades públicas mutáveis com get; set; irrestrito em entidades críticas.
2. Coleções Expostas: Identifique propriedades do tipo List<T>, IList<T> ou Collection<T> que permitem .Add(), .Remove() ou .Clear() externos sem validação do pai.
3. Métodos Semânticos Ausentes: Verifique se mutações de estado ocorrem via métodos de negócio (ex: conta.Depositar(valor)) ou via atribuição direta de propriedade.
4. Registros Históricos Imutáveis: Verifique se registros fiscais, contábeis ou de auditoria possuem proteções de imutabilidade (proibição de UPDATE/DELETE e obrigatoriedade de estorno lançamento espelhado).
5. Tipos Imutáveis e Value Objects: Cheque se conceitos como Dinheiro, CPF, Email e Endereço são modelados como records ou classes com campos readonly.

Formato de Resposta:
- Relatório de Entidades Anêmicas e Coleções Vazadas.
- Modelo de Domínio Rico refatorado com encapsulation estrito e IReadOnlyCollection.
- Regra de estorno para dados fiscais/contábeis históricos.`,codeExample:{language:`csharp`,badSnippet:`// ✕ MODELO ANÊMICO VULNERÁVEL: Qualquer classe corrompe o estado
public class ContaBancaria
{
    public int Id { get; set; }
    public decimal Saldo { get; set; } // Qualquer um faz: conta.Saldo = -50000;
    public string Status { get; set; } // Qualquer um faz: conta.Status = "Encerrada";
    public List<Lancamento> Lancamentos { get; set; } // conta.Lancamentos.Clear();
}`,badExplanation:`Não há invariantes. O saldo pode ficar negativo arbitrariamente e lançamentos podem ser apagados da memória sem registro.`,goodSnippet:`// ✓ PADRÃO IMUTÁVEL E RICO: Estado protegido por métodos de negócio
public class ContaBancaria
{
    public Guid Id { get; }
    public decimal Saldo { get; private set; }
    public StatusConta Status { get; private set; }

    private readonly List<Lancamento> _lancamentos = new();
    public IReadOnlyCollection<Lancamento> Lancamentos => _lancamentos.AsReadOnly();

    public void Creditar(decimal valor, string motivo, Guid operadorId)
    {
        if (Status != StatusConta.Ativa) throw new DomainException("Conta inativa.");
        if (valor <= 0) throw new DomainException("Valor de crédito deve ser positivo.");

        Saldo += valor;
        _lancamentos.Add(new Lancamento(valor, TipoLancamento.Credito, motivo, operadorId));
    }
}`,goodExplanation:`Setters privados, lista interna protegida por IReadOnlyCollection e alterações apenas por transações semânticas auditadas.`}},{id:`prompt-exclusao-cascata-reversao`,number:8,title:`Auditoria de Exclusão, Cascata e Fluxo Completo de Informação (Regressão de Deletação)`,shortTitle:`Exclusão, Cascata & Fluxo Reverso`,category:`prompts`,riskLevel:`critico`,conceptOneLiner:`Evitar exclusões destrutivas cegas em cascata, assegurar soft delete com índices únicos parciais e garantir que a reversão de eventos colaterais ocorra de forma estritamente atômica.`,whyItMatters:`Deletar um cliente e apagar em cascata todas as notas fiscais emitidas gera crime fiscal e perda irreparável; além disso, cancelar um pedido sem reverter estoque e financeiro em transação gera saldos fantasmas.`,commonTraps:[`Configurar DeleteBehavior.Cascade em tabelas com impacto legal/fiscal/contábil.`,`Soft Delete que quebra restrições UNIQUE (não conseguir cadastrar novamente um CNPJ deletado porque o índice não é parcial).`,`Cancelar uma venda devolvendo o estoque, mas sofrer timeout ao estornar a comissão, deixando os módulos dessincronizados.`],promptText:`Você é um Especialista em Arquitetura de Banco de Dados, Transações Distribuídas e Resiliência.
Audite o sistema quanto a EXCLUSÃO DE DADOS, INTEGRIDADE REFERENCIAL, CASCATA E FLUXO REVERSO.

Critérios de Inspeção:
1. Cascata Destrutiva Cega: Verifique os mapeamentos do ORM (EF Core/NHibernate/Prisma/TypeORM) procurando por Cascade Delete em tabelas transacionais, clientes, fornecedores ou produtos. Garanta DeleteBehavior.Restrict.
2. Soft Delete vs Hard Delete: Inspecione se entidades com histórico legal são excluídas via 'db.Remove()' (física) em vez de Soft Delete ('IsDeleted = true', 'DeletedAtUtc').
3. Índices Únicos com Soft Delete: Cheque se índices exclusivos (ex: CNPJ, Email, SKU) possuem cláusula de filtro parcial (WHERE DeletedAtUtc IS NULL), evitando bloqueio indevido de recadastros.
4. Efeito Dominó do Fluxo Reverso: Ao cancelar ou estornar uma operação mestra (ex: Cancelar Pedido), audite se:
   - O estoque reservado é devolvido ao saldo físico disponível.
   - Os títulos a receber/pagar são cancelados ou estornados.
   - As comissões são estornadas.
   - O limite de crédito do cliente é recalculado.
5. Atomicidade da Reversão: Garanta que todas as etapas de compensação/reversão rodem dentro de uma transação explícita de banco com Rollback em caso de falha parcial.

Formato de Resposta:
- Tabela de Mapeamentos de Risco de Cascata.
- Análise de Índices Únicos vs Soft Delete.
- Checklist de Fluxo Reverso com verificação de transação atômica.`,codeExample:{language:`csharp`,badSnippet:`// ✕ PERIGO DE CASCATA E FALTA DE ATOMICIDADE:
// 1. Mapeamento perigoso:
modelBuilder.Entity<Cliente>()
    .HasMany(c => c.NotasFiscais)
    .WithOne()
    .OnDelete(DeleteBehavior.Cascade); // Se deletar o cliente, APAGA TODO O HISTÓRICO FISCAL!

// 2. Cancelamento quebrado sem transação:
public async Task CancelarPedido(int pedidoId) {
    var pedido = await _db.Pedidos.FindAsync(pedidoId);
    pedido.Status = "Cancelado";
    await _db.SaveChangesAsync(); // Se cair a luz aqui, o estoque NUNCA foi devolvido!

    await _estoqueService.DevolverAsync(pedido.Itens); // Fora da transação!
    await _financeiroService.EstornarTitulosAsync(pedido.Id); // Fora da transação!
}`,badExplanation:`Cascade delete apaga anos de notas fiscais ao deletar um cliente, e operações de reversão sem transação causam saldos fantasmas permanentes no financeiro.`,goodSnippet:`// ✓ PADRÃO SEGURO: Delete Restrito, Índice Parcial e Transação Atômica:
// 1. Proteção de integridade referencial:
builder.HasMany(c => c.NotasFiscais)
    .WithOne()
    .OnDelete(DeleteBehavior.Restrict); // Impede exclusão se houver notas

// 2. Índice único parcial para Soft Delete (SQL Server / PostgreSQL):
builder.HasIndex(p => p.Sku)
    .IsUnique()
    .HasFilter("[DeletedAtUtc] IS NULL");

// 3. Reversão em transação atômica completa:
await using var tx = await _db.Database.BeginTransactionAsync();
try {
    await _estoque.DevolverEstoqueReservadoAsync(pedido);
    await _financeiro.EstornarContasAReceberAsync(pedido);
    await _comissao.EstornarComissoesAsync(pedido);
    pedido.MarcarComoCancelado(motivo, usuarioId);
    
    await _db.SaveChangesAsync();
    await tx.CommitAsync();
} catch {
    await tx.RollbackAsync(); // Nada é alterado pela metade!
    throw;
}`,goodExplanation:`O banco recusa deleção de fornecedores com histórico, índices aceitam reativação e qualquer falha na reversão desfaz todas as etapas de forma íntegra.`}}],n=[{id:`guide-rbac`,sectionLetter:`A`,sectionTitle:`Auditoria de RBAC (Role-Based Access Control)`,category:`rbac`,description:`O objetivo do RBAC é garantir que nenhum usuário execute uma ação ou visualize um dado para o qual não possua autorização expressa e verificada no servidor.`,iconSvg:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,items:[{id:`rbac-1`,index:`A.1`,title:`Falta de Barreiras em Ações de Mutação (POST/PUT/DELETE)`,riskLevel:`critico`,whatToLookFor:`Controllers com [HttpGet] protegido por atributo de permissão, mas com o método [HttpPost], [HttpPut] ou [HttpDelete] correspondente esquecido sem nenhum atributo ou apenas com [Authorize] genérico.`,realRisk:`Um invasor ou usuário comum que descubra a rota consegue enviar requisições diretas via Postman, cURL ou console do navegador e forçar alterações administrativas.`,goldenRule:`Toda ação de mutação de estado (Create, Update, Delete) deve possuir validação explícita de permissão específica.`,codeLanguage:`csharp`,badCode:`[HttpGet]
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
// ✕ Ausência de token anti-falsificação
public async Task<IActionResult> TransferirFundos(decimal valor, string destino) { ... }`,goodCode:`[HttpPost]
[ValidateAntiForgeryToken] // ✓ Rejeita requisições originadas de domínios terceiros
public async Task<IActionResult> TransferirFundos(decimal valor, string destino) { ... }`,mnemonicTip:`Mnemônico: "Sem token anti-forgery, o cookie do usuário vira fantoche de site externo".`},{id:`rbac-5`,index:`A.5`,title:`IDOR / BOLA (Insecure Direct Object Reference)`,riskLevel:`critico`,whatToLookFor:`O usuário tem permissão para editar orçamentos (orcamento.editar), envia POST /Orcamentos/Salvar { id: 99 }, mas o sistema não valida se o orçamento 99 pertence à filial/empresa do usuário autenticado ou se está com status "Fechado".`,realRisk:`Quebra completa de isolamento entre empresas (Multitenancy). Um cliente consegue consultar ou alterar dados confidencias de concorrentes hospedados na mesma base.`,goldenRule:`Autorização não é apenas saber "o que" o usuário pode fazer (ação), mas sobre "qual" recurso ele tem autoridade (propriedade e tenant).`,codeLanguage:`csharp`,badCode:`// ✕ IDOR: Confia cegamente no ID vindo do payload
var orcamento = await _db.Orcamentos.FindAsync(dto.Id);
orcamento.Valor = dto.NovoValor; // E se for de outra filial ou empresa?`,goodCode:`// ✓ SEGURO: Escopo forçado pelo TenantId do usuário logado
var tenantId = User.GetTenantId();
var orcamento = await _db.Orcamentos
    .FirstOrDefaultAsync(o => o.Id == dto.Id && o.TenantId == tenantId);

if (orcamento is null) return NotFound("Recurso não encontrado.");
if (orcamento.EstaFechado) return BadRequest("Orçamento encerrado não aceita edições.");`,mnemonicTip:`Mnemônico: "Permissão autoriza o verbo; o Tenant restringe o substantivo".`}]},{id:`guide-estatico`,sectionLetter:`B`,sectionTitle:`Checklist Técnico: Auditoria de Sintaxe, Compilação e Qualidade Estática`,category:`estatico`,description:`Auditoria estática busca armadilhas que escapam em tempo de desenvolvimento mas explodem em runtime ou causam vazamento de memória e deadlocks sob carga real.`,iconSvg:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,unifiedPrompt:{title:`Prompt Mestre Unificado para Auditoria de Arquivo Completo`,promptText:`Você é um Analista Estático de Código e Engenheiro de Compilação Sênior.
Analise o arquivo de código-fonte fornecido de forma exaustiva contra os 4 PILARES DE QUALIDADE ESTÁTICA:

1. NULL REFERENCE SAFETY:
   - Identifique navegações encadeadas sem verificação (ex: a.B.C.D).
   - Procure métodos que retornam null onde coleções ou arrays vazios ([]) deveriam ser retornados.
   - Aponte ausência de operadores null-conditional (?.) e null-coalescing (??).

2. ARMADILHAS ASSÍNCRONAS (ASYNC/AWAIT):
   - Localize chamadas a .Result, .GetAwaiter().GetResult() ou .Wait() bloqueando threads de I/O.
   - Detecte qualquer uso de 'async void' fora de manipuladores de eventos de UI.
   - Encontre chamadas a métodos assíncronos (*Async) esquecidas sem 'await' (fire-and-forget acidental).

3. VAZAMENTO DE RECURSOS E CICLO DE VIDA (DI SCOPES):
   - Verifique injeção indevida de serviços Scoped (ex: DbContext) em serviços Singleton.
   - Detecte consumo de DbContext em BackgroundService/IHostedService sem uso de 'IServiceScopeFactory'.
   - Localize classes IDisposable instanciadas manualmente sem bloco 'using' ou 'await using'.

4. CONSULTAS N+1 NO ORM (EF CORE / DAPPER):
   - Encontre laços (foreach, for, while) executando queries no banco a cada iteração.
   - Verifique ausência de carregamento adiantado (.Include) ou projeções explícitas (.Select()).

Formato de Resposta:
- Tabela de Achados: [Linha] | [Item do Checklist] | [Gravidade] | [Diagnóstico Técnico]
- Código corrigido com explicações objetivas.`},items:[{id:`estatico-1`,index:`B.1`,title:`Null Reference Safety (NullReferenceException)`,riskLevel:`alto`,whatToLookFor:`Navegações sem verificação de nulidade (ex: pedido.Cliente.Endereco.Cidade), métodos retornando null onde coleções vazias deveriam ser retornadas ([]), e ausência de null-coalescing (??) ou null-conditional (?.).`,realRisk:`NullReferenceException é a falha de runtime número 1 do mundo corporativo. Derruba requisições em produção no momento em que um campo opcional não é preenchido.`,goldenRule:`Nunca retorne null para listas ou arrays; prefira coleções vazias e habilite <Nullable>enable</Nullable>.`,codeLanguage:`csharp`,badCode:`// ✕ Explosão em potencial se Endereco ou Cidade for nulo
var cidade = pedido.Cliente.Endereco.Cidade.Nome;

// ✕ Retorno nulo em método de coleção
public List<Item> ObterItens() {
    if (semDados) return null; // Obriga o chamador a checar nulo
}`,goodCode:`// ✓ Safe navigation e fallback seguro
var cidade = pedido?.Cliente?.Endereco?.Cidade?.Nome ?? "Não informado";

// ✓ Retorno de lista vazia imutável
public IReadOnlyList<Item> ObterItens() {
    if (semDados) return Array.Empty<Item>();
    return _itens;
}`,mnemonicTip:`Mnemônico: "Lista vazia não quebra foreach; null explode na cara do dev".`},{id:`estatico-2`,index:`B.2`,title:`Armadilhas Assíncronas (Async/Await)`,riskLevel:`critico`,whatToLookFor:`Uso de .Result ou .Wait() bloqueando threads de threadpool; uso de "async void" em controllers/serviços; e chamadas de métodos assíncronos sem operador await.`,realRisk:`.Result causa Thread Pool Starvation e Deadlock fatal sob carga média/alta; async void não permite capturar exceções com try/catch e derruba o processo inteiro do IIS/Kestrel.`,goldenRule:`Async é viral: é await até o topo (async Task, nunca async void e nunca .Result).`,codeLanguage:`csharp`,badCode:`// ✕ Risco iminente de Deadlock sob carga:
var dados = _servico.ObterDadosAsync().Result;

// ✕ async void derruba o processo em caso de exceção:
public async void ProcessarFila() {
    await OperacaoCriticaAsync(); // Se falhar, processo aborta!
}`,goodCode:`// ✓ Padrão assíncrono não bloqueante:
var dados = await _servico.ObterDadosAsync();

// ✓ Retornando Task para captura de falhas pelo runtime:
public async Task ProcessarFilaAsync() {
    await OperacaoCriticaAsync();
}`,mnemonicTip:`Mnemônico: "Quem usa .Result bloqueia o pool; async void é o crash mais tolo".`},{id:`estatico-3`,index:`B.3`,title:`Vazamento de Recursos e Ciclo de Vida (DI Scopes)`,riskLevel:`critico`,whatToLookFor:`Injeção de dependências incorreta: serviços Scoped (como DbContext) injetados diretamente dentro de Singletons ou em IHostedService/Workers sem criação de escopo temporário.`,realRisk:`DbContext é desenhado para ciclos curtos. Injetado em Singleton, ele acumula entidades na memória infinitamente (Memory Leak), compartilha estado entre requisições concorrentes e gera exceções de concorrência simultânea.`,goldenRule:`Singletons e Background Workers nunca injetam Scoped diretamente; injetam IServiceScopeFactory e abrem escopo sob demanda.`,codeLanguage:`csharp`,badCode:`// ✕ VAZAMENTO E CONCORRÊNCIA: DbContext injetado em Worker Singleton
public class FilaWorker : BackgroundService {
    private readonly AppDbContext _db; // ERRO: DbContext não é thread-safe!
    public FilaWorker(AppDbContext db) => _db = db;
}`,goodCode:`// ✓ CORRETO: Criando escopo controlado para cada lote de processamento
public class FilaWorker : BackgroundService {
    private readonly IServiceScopeFactory _scopeFactory;
    public FilaWorker(IServiceScopeFactory sf) => _scopeFactory = sf;

    protected override async Task ExecuteAsync(CancellationToken ct) {
        using var scope = _scopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        // Processa e descarta a memória do DbContext ao sair do bloco
    }
}`,mnemonicTip:`Mnemônico: "Singleton com Scoped é casamento proibido; use ScopeFactory para o serviço ser mantido".`},{id:`estatico-4`,index:`B.4`,title:`Consultas N+1 no ORM (EF Core / Dapper)`,riskLevel:`alto`,whatToLookFor:`Laços foreach executando queries no banco de dados para buscar itens filhos a cada iteração, em vez de usar projeções explícitas (Select) ou carregamento adiantado (Include).`,realRisk:`Para 1.000 clientes, o sistema dispara 1.001 consultas ao banco. O que funcionava instantaneamente na máquina local com 5 registros trava o banco de dados em homologação ou produção.`,goldenRule:`Nunca execute await _context dentro de um laço; faça o join ou projeção em uma única consulta.`,codeLanguage:`csharp`,badCode:`// ✕ CONSULTA N+1: 1 query para pedidos + N queries para os itens
var pedidos = await _db.Pedidos.ToListAsync();
foreach (var pedido in pedidos) {
    // DISPARA 1 QUERY NO BANCO PARA CADA PEDIDO!
    pedido.Itens = await _db.Itens.Where(i => i.PedidoId == pedido.Id).ToListAsync();
}`,goodCode:`// ✓ CARREGAMENTO OTIMIZADO: Apenas 1 ou 2 queries via Include/Select
var pedidos = await _db.Pedidos
    .AsNoTracking()
    .Include(p => p.Itens) // Carrega em lote otimizado
    .ToListAsync();`,mnemonicTip:`Mnemônico: "Query em foreach é suicídio de banco; projete com Select ou traga com Include no arranco".`}]},{id:`guide-solid`,sectionLetter:`C`,sectionTitle:`Auditoria de Princípios S.O.L.I.D.`,category:`solid`,description:`Auditar SOLID é auditar a saúde do design do código, a testabilidade e sua resistência a regressões conforme a aplicação cresce.`,iconSvg:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,items:[{id:`solid-s`,index:`C.1`,title:`S — Single Responsibility Principle (Responsabilidade Única)`,riskLevel:`alto`,whatToLookFor:`Controllers ou Serviços gigantes ("God Classes") com milhares de linhas que recebem requisição, validam CPF, calculam ICMS, geram PDF, salvam no banco e disparam e-mail.`,realRisk:`Qualquer ajuste na formatação do PDF pode quebrar a gravação do banco ou o cálculo de ICMS. Impossível testar de forma isolada.`,goldenRule:`O Controller lida apenas com HTTP e entrada/saída. O Serviço orquestra o caso de uso. O Modelo/Entidade calcula suas regras intrínsecas.`,codeLanguage:`csharp`,badCode:`public class PedidoController : ControllerBase {
    // ✕ Mistura HTTP + Validação de CPF + Cálculo de Imposto + Envio SMTP
    public async Task<IActionResult> Criar(PedidoDto dto) {
        if (!ValidarCpf(dto.Cpf)) return BadRequest();
        decimal imposto = dto.Total * 0.18m;
        SalvarSql(dto);
        EnviarSmtp("pedido@email.com", "Criado");
        return Ok();
    }
}`,goodCode:`public class PedidoController : ControllerBase {
    // ✓ Controller fino e desacoplado
    public async Task<IActionResult> Criar(CriarPedidoCommand cmd) {
        var id = await _mediator.Send(cmd);
        return CreatedAtAction(nameof(ObterPorId), new { id }, id);
    }
}`,mnemonicTip:`Mnemônico: "Uma classe, um motivo para mudar; não faça o cozinheiro o banheiro lavar".`},{id:`solid-o`,index:`C.2`,title:`O — Open/Closed Principle (Aberto para Extensão, Fechado para Modificação)`,riskLevel:`medio`,whatToLookFor:`Blocos gigantescos de switch (tipo) ou if-else encadeados para tratar variações de um mesmo comportamento (ex: cálculo de taxa por tipo de pagamento, emissão por tipo de frete).`,realRisk:`Adicionar uma nova forma de pagamento exige alterar um método existente de 500 linhas, gerando alto risco de quebrar as formas existentes já em produção.`,goldenRule:`Adicionar uma nova variação deve exigir criar uma nova classe (Strategy Pattern), e nunca alterar métodos legados já testados.`,codeLanguage:`csharp`,badCode:`// ✕ Cada novo frete exige alterar este método:
public decimal CalcularFrete(string tipo, decimal peso) {
    if (tipo == "Sedex") return peso * 1.5m;
    if (tipo == "PAC") return peso * 0.8m;
    if (tipo == "Transportadora") return peso * 1.2m + 15;
    throw new NotSupportedException();
}`,goodCode:`// ✓ Aberto para novas estratégias sem alterar o orquestrador:
public interface ICalculadorFrete {
    bool Suporta(TipoFrete tipo);
    decimal Calcular(decimal peso);
}
public class FreteSedex : ICalculadorFrete { ... }
public class FreteTransportadora : ICalculadorFrete { ... }`,mnemonicTip:`Mnemônico: "Tomada não muda para cada aparelho novo; use adaptadores e plugue sem transtorno".`},{id:`solid-l`,index:`C.3`,title:`L — Liskov Substitution Principle (Substituição de Liskov)`,riskLevel:`alto`,whatToLookFor:`Classes que herdam de classes base ou implementam interfaces e sobrescrevem métodos lançando throw new NotImplementedException(), alterando as pré-condições da classe pai.`,realRisk:`Se uma função espera a classe base Funcionario e recebe Voluntario que lança exceção em CalcularSalario(), o sistema explode em tempo de execução.`,goldenRule:`Subclasses devem cumprir integralmente as expectativas e contratos de sua classe pai, sem enfraquecer pré-condições nem lançar NotImplementedException.`,codeLanguage:`csharp`,badCode:`public class ContaPoupanca : ContaBancaria {
    // ✕ Quebra Liskov: herdou saque mas lança exceção se for dia não permitido!
    public override void Sacar(decimal valor) {
        throw new NotImplementedException("Poupança só saca no aniversário!");
    }
}`,goodCode:`// ✓ Modelagem correta segregando os contratos
public interface IContaComSaque {
    void Sacar(decimal valor);
}
public class ContaCorrente : IContaComSaque { ... }
public class ContaInvestimentoBloqueada : IConta { ... }`,mnemonicTip:`Mnemônico: "Se parece pato mas precisa de bateria, não herde de Pato de verdade".`},{id:`solid-i`,index:`C.4`,title:`I — Interface Segregation Principle (Segregação de Interfaces)`,riskLevel:`medio`,whatToLookFor:`Interfaces "gordas" (ex: ISistemaService com 50 métodos). Uma classe consumidora que só precisa ler um dado acaba dependendo de métodos de escrita, exclusão e disparo de relatórios.`,realRisk:`Qualquer mudança na assinatura de um método não utilizado força a recompilação e retestagem de centenas de classes que só queriam ler uma propriedade.`,goldenRule:`Muitas interfaces específicas e enxutas são infinitamente melhores do que uma interface única universal.`,codeLanguage:`csharp`,badCode:`// ✕ Interface inchada que força implementações fakes
public interface IRepositorioCompleto<T> {
    Task<T> ObterAsync(int id);
    Task SalvarAsync(T entidade);
    Task ExcluirAsync(int id);
    Task ExportarParaExcelAsync();
    Task EnviarPorFtpAsync();
}`,goodCode:`// ✓ Interfaces coesas e segregadas
public interface ILeituraRepository<T> {
    Task<T?> ObterPorIdAsync(int id);
}
public interface IEscritaRepository<T> {
    Task SalvarAsync(T entidade);
}`,mnemonicTip:`Mnemônico: "Não me force a assinar um contrato com cláusulas que eu nunca vou usar".`},{id:`solid-d`,index:`C.5`,title:`D — Dependency Inversion Principle (Inversão de Dependência)`,riskLevel:`alto`,whatToLookFor:`Código de alto nível instanciando classes de infraestrutura com new (ex: new HttpClient(), new ClosedXML(), new SqlConnection()) dentro do meio de uma regra de negócio.`,realRisk:`Impede testes unitários com mocks, cria acoplamento viscoso com bibliotecas de terceiros e inviabiliza a troca de banco de dados ou provedores de nuvem.`,goldenRule:`Módulos de alto nível não devem depender de módulos de baixo nível; ambos devem depender de abstrações (interfaces).`,codeLanguage:`csharp`,badCode:`public class FechamentoCaixaService {
    public void Fechar() {
        // ✕ Acoplamento direto com biblioteca de infraestrutura concreta
        var gerador = new ClosedXML.Excel.XLWorkbook();
        var smtp = new System.Net.Mail.SmtpClient("smtp.host.com");
    }
}`,goodCode:`public class FechamentoCaixaService {
    private readonly IGeradorPlanilha _planilha;
    private readonly IServicoNotificacao _notificacao;

    // ✓ Depende de abstrações injetadas no construtor
    public FechamentoCaixaService(IGeradorPlanilha p, IServicoNotificacao n) {
        _planilha = p;
        _notificacao = n;
    }
}`,mnemonicTip:`Mnemônico: "Você não solda a torradeira direto nos fios da parede; usa uma tomada padronizada".`}]},{id:`guide-imutabilidade`,sectionLetter:`D`,sectionTitle:`Auditoria de Imutabilidade e Invariantes de Estado`,category:`imutabilidade`,description:`Na literatura de DDD e sistemas ERP/Financeiros, o estado nunca pode ser corrompido arbitrariamente por terceiros fora de transações de negócio explícitas.`,iconSvg:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,items:[{id:`imut-1`,index:`D.1`,title:`Modelos Anêmicos com Setters Públicos Irrestritos`,riskLevel:`alto`,whatToLookFor:`Propriedades como public decimal Saldo { get; set; } ou public EStatusNota Status { get; set; }. Qualquer controller ou helper consegue alterar o saldo de uma conta ou marcar uma nota como "Aprovada" sem disparar as validações e sem gerar o rastro correspondente.`,realRisk:`Perda total de integridade dos dados. Regras de transição de estado são ignoradas e auditorias não são notificadas.`,goldenRule:`Setters privados/protegidos e métodos de negócio explícitos (ex: nota.Aprovar(usuarioId, data) ou estoque.DarBaixa(quantidade, motivo)).`,codeLanguage:`csharp`,badCode:`// ✕ Anêmico: Qualquer um altera o status sem checar se já foi faturada
public class NotaFiscal {
    public decimal Total { get; set; }
    public string Status { get; set; } // nota.Status = "Cancelada";
}`,goodCode:`// ✓ Encapsulado com transição semântica:
public class NotaFiscal {
    public StatusNota Status { get; private set; }
    
    public void Cancelar(string motivo, Guid usuarioId) {
        if (Status == StatusNota.Faturada) 
            throw new DomainException("Nota já faturada não pode ser cancelada diretamente.");
        Status = StatusNota.Cancelada;
        RegistrarEvento(new NotaCanceladaEvent(Id, motivo, usuarioId));
    }
}`,mnemonicTip:`Mnemônico: "Se o setter é público, qualquer um vira dono da sua regra".`},{id:`imut-2`,index:`D.2`,title:`Coleções Internas Mutáveis Expostas`,riskLevel:`alto`,whatToLookFor:`Propriedades públicas expondo listas mutáveis: public List<ItemPedido> Itens { get; set; }. Isso permite que código externo faça pedido.Itens.Add(...) ou pedido.Itens.Clear() pelas costas da entidade pai, sem que o total do pedido seja atualizado.`,realRisk:`A soma dos itens diverge do total do pedido salvo no banco de dados, gerando faturamento incorreto e notas fiscais com valor divergente dos itens.`,goldenRule:`Expor IReadOnlyList<Item> ou IReadOnlyCollection<Item> e fornecer métodos semânticos AdicionarItem() e RemoverItem() na raiz.`,codeLanguage:`csharp`,badCode:`// ✕ Coleção exposta permitindo mutação pelas costas
public class Pedido {
    public List<ItemPedido> Itens { get; set; } = new();
    public decimal ValorTotal { get; set; }
}`,goodCode:`// ✓ Coleção protegida com métodos de negócio:
public class Pedido {
    private readonly List<ItemPedido> _itens = new();
    public IReadOnlyCollection<ItemPedido> Itens => _itens.AsReadOnly();
    public decimal ValorTotal { get; private set; }

    public void AdicionarItem(Produto produto, int quantidade) {
        _itens.Add(new ItemPedido(produto.Id, produto.Preco, quantidade));
        ValorTotal += produto.Preco * quantidade; // Mantém invariante sincronizada
    }
}`,mnemonicTip:`Mnemônico: "Proteja seus itens; exponha como ReadOnly e mute com métodos limpos".`},{id:`imut-3`,index:`D.3`,title:`Violação de Registros Históricos Imutáveis`,riskLevel:`critico`,whatToLookFor:`Edição ou exclusão direta de tabelas contábeis, logs de auditoria, movimentações de estoque ou notas fiscais já faturadas.`,realRisk:`Crime fiscal, descalabro em auditorias externas (SOX, ISO, Banco Central) e impossibilidade matemática de conciliação de caixa.`,goldenRule:`Em sistemas corporativos, lançamentos contábeis, movimentações fiscais e estoque oficial nunca são editados ou deletados; eles sofrem estorno (lançamento espelhado com sinal invertido).`,codeLanguage:`csharp`,badCode:`// ✕ CRIME FISCAL/CONTÁBIL: Editar lançamento já consolidado
var lancamento = await _db.LancamentosContabeis.FindAsync(id);
lancamento.Valor = 1500; // Modificando o passado contábil!
await _db.SaveChangesAsync();`,goodCode:`// ✓ REGRA CONTÁBIL DE ESTORNO: Novo lançamento inverso
public async Task EstornarLancamento(Guid lancamentoOriginalId, string justificativa, Guid operadorId) {
    var original = await _db.Lancamentos.FindAsync(lancamentoOriginalId);
    if (original.EstaEstornado) throw new DomainException("Já estornado.");

    var estorno = LancamentoContabil.CriarEstorno(original, justificativa, operadorId);
    original.MarcarComoEstornado(estorno.Id);
    
    await _db.Lancamentos.AddAsync(estorno);
    await _db.SaveChangesAsync();
}`,mnemonicTip:`Mnemônico: "O passado financeiro não se apaga; se corrige com estorno na mesma balança".`}]},{id:`guide-exclusao`,sectionLetter:`E`,sectionTitle:`Auditoria de Exclusão, Cascata e Fluxo Completo de Informação (Regressão de Deletação)`,category:`exclusao`,description:`Aqui reside o maior perigo em sistemas de gestão: a exclusão destrutiva que quebra a integridade referencial ou deixa saldos e reservas fantasmas.`,iconSvg:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,items:[{id:`exc-1`,index:`E.1`,title:`Cascata Destrutiva Cega (Cascade Delete)`,riskLevel:`critico`,whatToLookFor:`Mapeamentos de banco configurados com OnDelete(DeleteBehavior.Cascade) em entidades críticas de negócio.`,realRisk:`Bug clássico catastrófico: deletar um Fornecedor apaga em cascata todas as Ordens de Compra e Notas Fiscais emitidas por ele no ano passado, destruindo o histórico legal da base.`,goldenRule:`Entidades com peso fiscal/financeiro devem ter integridade estrita (DeleteBehavior.Restrict), impedindo a exclusão se houver qualquer dependência registrada.`,codeLanguage:`csharp`,badCode:`// ✕ PERIGO MÁXIMO: Apagar cliente apaga suas faturas
builder.Entity<Cliente>()
    .HasMany(c => c.Faturas)
    .WithOne(f => f.Cliente)
    .OnDelete(DeleteBehavior.Cascade);`,goodCode:`// ✓ PROTEGIDO: O banco recusa a exclusão se houver faturas vinculadas
builder.Entity<Cliente>()
    .HasMany(c => c.Faturas)
    .WithOne(f => f.Cliente)
    .OnDelete(DeleteBehavior.Restrict);`,mnemonicTip:`Mnemônico: "Cascade em entidade fiscal é dinamite no banco; use Restrict e proteja seu patrimônio".`},{id:`exc-2`,index:`E.2`,title:`Soft Delete vs Hard Delete e Índices Parciais`,riskLevel:`alto`,whatToLookFor:`Entidades que deveriam ser apenas inativadas sendo deletadas com db.Remove(entidade). E quando há Soft Delete, verificar se os índices UNIQUE consideram os registros deletados.`,realRisk:`Se o índice único de CPF ou SKU não for parcial (WHERE DeletedAtUtc IS NULL), tentar cadastrar novamente um produto com o mesmo código após ter deletado o anterior falhará com violação de chave primária/única.`,goldenRule:`Soft Delete exige índices únicos parciais no banco de dados para permitir a reciclagem saudável de códigos e identificadores.`,codeLanguage:`csharp`,badCode:`// ✕ Índice único tradicional que trava recadastro de itens com soft delete
builder.Entity<Produto>()
    .HasIndex(p => p.Sku)
    .IsUnique(); // Se deletar o SKU "ABC" e tentar criar novo, FALHA!`,goodCode:`// ✓ Índice parcial: unicidade restrita apenas a registros ativos
builder.Entity<Produto>()
    .HasIndex(p => p.Sku)
    .IsUnique()
    .HasFilter("[DeletedAtUtc] IS NULL"); // SQL Server / Postgres partial index`,mnemonicTip:`Mnemônico: "Soft delete sem índice parcial é ressuscitado bloqueando o canal".`},{id:`exc-3`,index:`E.3`,title:`Quebra do Fluxo Reversivo (Efeito Dominó da Exclusão) & Atomicidade`,riskLevel:`critico`,whatToLookFor:`Quando um registro primário é cancelado ou excluído, verificar se todos os efeitos colaterais foram revertidos (estoque devolvido, títulos a receber cancelados, comissões estornadas, limite recalculado) E se tudo ocorre dentro de uma única transação atômica.`,realRisk:`Se o sistema falhar no meio do cancelamento (ex: estoque devolvido, mas timeout no financeiro), a base fica desbalanceada para sempre com mercadoria sobrando e dívida cobrada indevidamente.`,goldenRule:`Qualquer reversão de processo com múltiplos efeitos colaterais deve rodar sob IDbContextTransaction com Rollback automático em falha.`,codeLanguage:`csharp`,badCode:`// ✕ SEM TRANSAÇÃO: Se falhar no estorno de comissão, o estoque já foi alterado!
public async Task CancelarPedido(Guid pedidoId) {
    var pedido = await _db.Pedidos.FindAsync(pedidoId);
    await _estoque.DevolverEstoqueAsync(pedido); // Executou e salvou no banco
    throw new TimeoutException(); // Caiu aqui! O estoque subiu mas o financeiro não estornou!
    await _financeiro.EstornarAsync(pedido);
}`,goodCode:`// ✓ ATOMICIDADE GARANTIDA: Tudo ou nada!
await using var tx = await _db.Database.BeginTransactionAsync();
try {
    await _estoque.DevolverEstoqueAsync(pedido);
    await _financeiro.EstornarTitulosAsync(pedido);
    await _comissao.EstornarComissoesAsync(pedido);
    pedido.Cancelar(motivo, usuarioId);

    await _db.SaveChangesAsync();
    await tx.CommitAsync(); // Só grava tudo se nenhuma linha falhar
} catch (Exception) {
    await tx.RollbackAsync(); // Reverte tudo ao estado anterior
    throw;
}`,mnemonicTip:`Mnemônico: "Efeito dominó sem transação deixa rombo na conciliação".`}]}],r=class{activeCategory=`all`;searchQuery=``;auditedItems=new Set;isLightMode=!1;themeToggleBtn=document.getElementById(`theme-toggle-btn`);backToTopBtn=document.getElementById(`back-to-top`);searchInput=document.getElementById(`search-input`);pillsContainer=document.getElementById(`audit-category-pills`);promptsContainer=document.getElementById(`prompts-list`);guidesContainer=document.getElementById(`guides-list`);progressFill=document.getElementById(`progress-bar-fill`);progressStat=document.getElementById(`progress-stat`);celebrateBanner=document.getElementById(`celebrate-banner`);resetBtn=document.getElementById(`btn-reset-audited`);toastElement=document.getElementById(`audit-toast`);constructor(){this.initTheme(),this.loadSavedAudited(),this.setupEventListeners(),this.renderCategoryPills(),this.renderPrompts(),this.renderGuides(),this.updateProgress()}initTheme(){localStorage.getItem(`guia-theme`)===`light`&&(this.isLightMode=!0,document.documentElement.setAttribute(`data-theme`,`light`)),this.updateThemeButton()}toggleTheme(){this.isLightMode=!this.isLightMode;let e=this.isLightMode?`light`:`dark`;document.documentElement.setAttribute(`data-theme`,e),localStorage.setItem(`guia-theme`,e),this.updateThemeButton()}updateThemeButton(){this.themeToggleBtn&&(this.themeToggleBtn.innerHTML=this.isLightMode?`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,this.themeToggleBtn.title=this.isLightMode?`Alternar para Modo Escuro`:`Alternar para Modo Claro`)}loadSavedAudited(){try{let e=localStorage.getItem(`guia-auditoria-checked`);if(e){let t=JSON.parse(e);Array.isArray(t)&&(this.auditedItems=new Set(t))}}catch(e){console.warn(`Erro ao carregar itens auditados do localStorage`,e)}}saveAudited(){localStorage.setItem(`guia-auditoria-checked`,JSON.stringify(Array.from(this.auditedItems)))}toggleAudited(e){this.auditedItems.has(e)?this.auditedItems.delete(e):this.auditedItems.add(e),this.saveAudited(),this.updateProgress();let t=document.getElementById(`audit-card-${e}`);if(t){let n=this.auditedItems.has(e);t.classList.toggle(`is-audited`,n);let r=t.querySelector(`.btn-toggle-audited`);r&&(r.classList.toggle(`is-checked`,n),r.innerHTML=n?`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Auditado`:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Marcar como Auditado`)}}resetAudited(){confirm(`Deseja realmente desmarcar todas as auditorias concluídas?`)&&(this.auditedItems.clear(),this.saveAudited(),this.updateProgress(),document.querySelectorAll(`.audit-card`).forEach(e=>{e.classList.remove(`is-audited`);let t=e.querySelector(`.btn-toggle-audited`);t&&(t.classList.remove(`is-checked`),t.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Marcar como Auditado`)}))}getTotalItemsCount(){return t.length+n.reduce((e,t)=>e+t.items.length,0)}updateProgress(){let e=this.getTotalItemsCount(),t=this.auditedItems.size,n=e>0?Math.round(t/e*100):0;this.progressStat&&(this.progressStat.textContent=`${t} de ${e} verificados (${n}%)`),this.progressFill&&(this.progressFill.style.width=`${n}%`),this.celebrateBanner&&this.celebrateBanner.classList.toggle(`is-active`,n===100)}showToast(e){this.toastElement&&(this.toastElement.innerHTML=`
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span>${this.escapeHtml(e)}</span>
    `,this.toastElement.classList.add(`show`),setTimeout(()=>{this.toastElement.classList.remove(`show`)},3200))}copyPromptToClipboard(e,t){navigator.clipboard.writeText(e).then(()=>{if(this.showToast(`Prompt copiado! Cole na sua IA (ChatGPT, Claude, Cursor ou Copilot).`),t){let e=t.innerHTML;t.classList.add(`copied`),t.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copiado!`,setTimeout(()=>{t.classList.remove(`copied`),t.innerHTML=e},2e3)}}).catch(e=>{console.error(`Falha ao copiar prompt:`,e),alert(`Não foi possível copiar automaticamente para a área de transferência.`)})}setupEventListeners(){this.themeToggleBtn?.addEventListener(`click`,()=>this.toggleTheme()),this.resetBtn?.addEventListener(`click`,()=>this.resetAudited()),this.searchInput?.addEventListener(`input`,e=>{this.searchQuery=e.target.value.trim().toLowerCase(),this.applyFilters()}),window.addEventListener(`scroll`,()=>{this.backToTopBtn&&(window.scrollY>400?this.backToTopBtn.classList.add(`is-visible`):this.backToTopBtn.classList.remove(`is-visible`))}),this.backToTopBtn?.addEventListener(`click`,()=>{window.scrollTo({top:0,behavior:`smooth`})})}renderCategoryPills(){this.pillsContainer&&(this.pillsContainer.innerHTML=``,e.forEach(e=>{let r=document.createElement(`button`);r.type=`button`,r.className=`audit-pill ${e.id===this.activeCategory?`is-active`:``}`,r.setAttribute(`data-category`,e.id);let i=0;if(e.id===`all`)i=this.getTotalItemsCount();else if(e.id===`prompts`)i=t.length;else{let t=n.find(t=>t.category===e.id);i=t?t.items.length:0}r.innerHTML=`
        ${e.iconSvg}
        <span>${e.label}</span>
        <span class="audit-pill-count">${i}</span>
      `,r.addEventListener(`click`,()=>{this.activeCategory=e.id,document.querySelectorAll(`.audit-pill`).forEach(e=>e.classList.remove(`is-active`)),r.classList.add(`is-active`),this.applyFilters()}),this.pillsContainer.appendChild(r)}))}applyFilters(){let e=this.activeCategory===`all`||this.activeCategory===`prompts`,r=document.getElementById(`section-o-que-auditar`);r&&(r.style.display=e?`block`:`none`);let i=0;t.forEach(t=>{let n=document.getElementById(`audit-card-${t.id}`);if(!n)return;let r=this.searchQuery===``||t.title.toLowerCase().includes(this.searchQuery)||t.conceptOneLiner.toLowerCase().includes(this.searchQuery)||t.whyItMatters.toLowerCase().includes(this.searchQuery)||t.promptText.toLowerCase().includes(this.searchQuery)||t.commonTraps.some(e=>e.toLowerCase().includes(this.searchQuery)),a=e&&r;n.style.display=a?`flex`:`none`,a&&i++}),n.forEach(e=>{let t=document.getElementById(`section-guide-${e.id}`);if(!t)return;let n=this.activeCategory===`all`||this.activeCategory===e.category,r=0;e.items.forEach(e=>{let t=document.getElementById(`audit-card-${e.id}`);if(!t)return;let i=this.searchQuery===``||e.title.toLowerCase().includes(this.searchQuery)||e.whatToLookFor.toLowerCase().includes(this.searchQuery)||e.realRisk.toLowerCase().includes(this.searchQuery)||e.goldenRule&&e.goldenRule.toLowerCase().includes(this.searchQuery)||e.mnemonicTip&&e.mnemonicTip.toLowerCase().includes(this.searchQuery),a=n&&i;t.style.display=a?`flex`:`none`,a&&r++});let i=t.querySelector(`.audit-master-prompt-box`);if(i&&e.unifiedPrompt){let t=this.searchQuery===``||e.unifiedPrompt.title.toLowerCase().includes(this.searchQuery)||e.unifiedPrompt.promptText.toLowerCase().includes(this.searchQuery);i.style.display=n&&t?`flex`:`none`}t.style.display=n&&(r>0||this.searchQuery===``)?`block`:`none`});let a=document.getElementById(`section-como-auditar`);if(a){let e=this.activeCategory===`all`||this.activeCategory!==`prompts`;a.style.display=e?`block`:`none`}}renderPrompts(){this.promptsContainer&&(this.promptsContainer.innerHTML=``,t.forEach(e=>{let t=this.auditedItems.has(e.id),n=document.createElement(`article`);n.className=`audit-card ${t?`is-audited`:``}`,n.id=`audit-card-${e.id}`,n.innerHTML=`
        <div class="audit-card-top">
          <div class="audit-card-meta">
            <span class="audit-index-badge">#${e.number}</span>
            <span class="audit-risk-badge risk-${e.riskLevel}">${this.getRiskBadgeText(e.riskLevel)}</span>
          </div>
          <button type="button" class="btn-toggle-audited ${t?`is-checked`:``}" data-id="${e.id}">
            ${t?`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Auditado`:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Marcar como Auditado`}
          </button>
        </div>

        <h3 class="audit-card-title">${this.escapeHtml(e.title)}</h3>

        <div class="audit-one-liner">
          <strong>Conceito:</strong> ${this.escapeHtml(e.conceptOneLiner)}
        </div>

        <div class="audit-why-matters">
          <strong>Por que importa?</strong> ${this.escapeHtml(e.whyItMatters)}
        </div>

        <!-- Prompt de IA Pronto para Uso -->
        <div class="audit-prompt-box">
          <div class="audit-prompt-header">
            <span class="audit-prompt-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Prompt Pronto para IA / Auditor
            </span>
            <button type="button" class="btn-copy-prompt" data-prompt-id="${e.id}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              Copiar Prompt
            </button>
          </div>
          <div class="audit-prompt-content">${this.escapeHtml(e.promptText)}</div>
        </div>

        <!-- Armadilhas comuns -->
        <div class="audit-detail-box">
          <div class="audit-detail-title" style="color: #ef4444;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Pegadinhas & Armadilhas Comuns
          </div>
          <ul style="margin: 0.25rem 0 0 1.25rem; font-size: 0.84rem; color: var(--text-muted); line-height: 1.45;">
            ${e.commonTraps.map(e=>`<li>${this.escapeHtml(e)}</li>`).join(``)}
          </ul>
        </div>

        <!-- Código Comparativo -->
        <div class="audit-code-comparison">
          <div class="audit-code-block audit-code-block-bad">
            <div class="audit-code-header audit-code-header-bad">
              ✕ Código Vulnerável / Anti-Padrão
            </div>
            <pre class="audit-code-body"><code>${this.escapeHtml(e.codeExample.badSnippet)}</code></pre>
            <div class="audit-code-note">${this.escapeHtml(e.codeExample.badExplanation)}</div>
          </div>

          <div class="audit-code-block audit-code-block-good">
            <div class="audit-code-header audit-code-header-good">
              ✓ Padrão Seguro / Código Auditado
            </div>
            <pre class="audit-code-body"><code>${this.escapeHtml(e.codeExample.goodSnippet)}</code></pre>
            <div class="audit-code-note">${this.escapeHtml(e.codeExample.goodExplanation)}</div>
          </div>
        </div>
      `,n.querySelector(`.btn-toggle-audited`)?.addEventListener(`click`,()=>this.toggleAudited(e.id));let r=n.querySelector(`.btn-copy-prompt`);r?.addEventListener(`click`,()=>{this.copyPromptToClipboard(e.promptText,r)}),this.promptsContainer.appendChild(n)}))}renderGuides(){this.guidesContainer&&(this.guidesContainer.innerHTML=``,n.forEach(e=>{let t=document.createElement(`section`);t.id=`section-guide-${e.id}`,t.className=`audit-guide-section-block`,t.style.marginBottom=`3rem`;let n=`
        <div class="audit-section-header">
          <span class="audit-section-tag">
            ${e.iconSvg}
            Subseção ${e.sectionLetter}
          </span>
          <h3 class="audit-section-title">${this.escapeHtml(e.sectionTitle)}</h3>
          <p class="audit-section-subtitle">${this.escapeHtml(e.description)}</p>
        </div>
      `;if(e.unifiedPrompt&&(n+=`
          <div class="audit-master-prompt-box">
            <div class="audit-master-header">
              <div class="audit-master-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--brand-primary);"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span>${this.escapeHtml(e.unifiedPrompt.title)}</span>
              </div>
              <button type="button" class="btn-copy-prompt btn-copy-master" data-section="${e.id}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                Copiar Prompt Mestre de Arquivo Único
              </button>
            </div>
            <div class="audit-prompt-content" style="max-height: 220px; background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); padding: 0.75rem;">${this.escapeHtml(e.unifiedPrompt.promptText)}</div>
          </div>
        `),n+=`<div class="audit-cards-grid" id="grid-${e.id}"></div>`,t.innerHTML=n,e.unifiedPrompt){let n=t.querySelector(`.btn-copy-master`);n?.addEventListener(`click`,()=>{this.copyPromptToClipboard(e.unifiedPrompt.promptText,n)})}let r=t.querySelector(`#grid-${e.id}`);e.items.forEach(e=>{let t=this.auditedItems.has(e.id),n=document.createElement(`article`);n.className=`audit-card ${t?`is-audited`:``}`,n.id=`audit-card-${e.id}`;let i=``;e.badCode&&e.goodCode&&(i=`
            <div class="audit-code-comparison">
              <div class="audit-code-block audit-code-block-bad">
                <div class="audit-code-header audit-code-header-bad">✕ O que NÃO fazer / Código Suspeito</div>
                <pre class="audit-code-body"><code>${this.escapeHtml(e.badCode)}</code></pre>
              </div>
              <div class="audit-code-block audit-code-block-good">
                <div class="audit-code-header audit-code-header-good">✓ Padrão Recomendado / Código Seguro</div>
                <pre class="audit-code-body"><code>${this.escapeHtml(e.goodCode)}</code></pre>
              </div>
            </div>
          `);let a=``;e.mnemonicTip&&(a=`
            <div class="audit-mnemonic-box">
              <svg class="audit-mnemonic-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              <span><strong>Fixação Rápida:</strong> ${this.escapeHtml(e.mnemonicTip)}</span>
            </div>
          `);let o=``;e.goldenRule&&(o=`
            <div class="audit-detail-box" style="border-left: 3px solid #10b981;">
              <div class="audit-detail-title" style="color: #10b981;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Regra de Ouro
              </div>
              <div class="audit-detail-desc" style="color: var(--text-main); font-weight: 500;">${this.escapeHtml(e.goldenRule)}</div>
            </div>
          `),n.innerHTML=`
          <div class="audit-card-top">
            <div class="audit-card-meta">
              <span class="audit-index-badge">${e.index}</span>
              <span class="audit-risk-badge risk-${e.riskLevel}">${this.getRiskBadgeText(e.riskLevel)}</span>
            </div>
            <button type="button" class="btn-toggle-audited ${t?`is-checked`:``}" data-id="${e.id}">
              ${t?`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Auditado`:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Marcar como Auditado`}
            </button>
          </div>

          <h4 class="audit-card-title">${this.escapeHtml(e.title)}</h4>

          <div class="audit-details-grid">
            <div class="audit-detail-box">
              <div class="audit-detail-title" style="color: var(--brand-primary);">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                O Que Procurar no Código
              </div>
              <div class="audit-detail-desc">${this.escapeHtml(e.whatToLookFor)}</div>
            </div>

            <div class="audit-detail-box">
              <div class="audit-detail-title" style="color: #ef4444;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                Risco Real em Produção
              </div>
              <div class="audit-detail-desc">${this.escapeHtml(e.realRisk)}</div>
            </div>
          </div>

          ${o}
          ${i}
          ${a}
        `,n.querySelector(`.btn-toggle-audited`)?.addEventListener(`click`,()=>this.toggleAudited(e.id)),r.appendChild(n)}),this.guidesContainer.appendChild(t)}))}getRiskBadgeText(e){switch(e){case`critico`:return`Risco Crítico`;case`alto`:return`Risco Alto`;case`medio`:return`Risco Médio`;default:return`Risco Baixo`}}escapeHtml(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`)}};document.addEventListener(`DOMContentLoaded`,()=>{new r});