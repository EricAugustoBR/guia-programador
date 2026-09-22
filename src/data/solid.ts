export interface SolidPrincipleItem {
  readonly id: string;
  readonly letter: 'S' | 'O' | 'L' | 'I' | 'D';
  readonly name: string;
  readonly portugueseTitle: string;
  readonly oneLiner: string;
  readonly realWorldAnalogy: {
    readonly title: string;
    readonly description: string;
    readonly iconSvg: string;
  };
  readonly whyItMatters: string;
  readonly badCode: {
    readonly title: string;
    readonly code: string;
    readonly explanation: string;
  };
  readonly goodCode: {
    readonly title: string;
    readonly code: string;
    readonly explanation: string;
  };
  readonly beginnerTrap: string;
  readonly mnemonic: string;
  readonly tagColor: 'primary' | 'success' | 'warning' | 'purple' | 'info';
}

export interface SolidQuizItem {
  readonly id: string;
  readonly principleLetter: 'S' | 'O' | 'L' | 'I' | 'D';
  readonly scenario: string;
  readonly question: string;
  readonly options: readonly {
    readonly letter: 'S' | 'O' | 'L' | 'I' | 'D';
    readonly label: string;
    readonly isCorrect: boolean;
  }[];
  readonly explanation: string;
}

export const SOLID_PRINCIPLES_DATA: readonly SolidPrincipleItem[] = [
  // 1. S - SINGLE RESPONSIBILITY PRINCIPLE
  {
    id: 'srp',
    letter: 'S',
    name: 'Single Responsibility Principle (SRP)',
    portugueseTitle: 'Princípio da Responsabilidade Única',
    oneLiner: 'Uma classe, função ou módulo deve ter apenas um motivo para mudar.',
    realWorldAnalogy: {
      title: 'O Cozinheiro do Restaurante',
      description: 'Imagine um restaurante onde a mesma pessoa cozinha os pratos, anota os pedidos no salão como garçom, cobra a conta no caixa e limpa o chão do banheiro. Se a maquininha de cartão travar no caixa, a comida queima no fogão! No código acontece o mesmo: divida o trabalho para que um problema não paralise o resto.',
      iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>`
    },
    whyItMatters: 'Evita a temida "Classe Deus" (God Class) que faz de tudo. Quando uma classe tem muitas funções, qualquer alteração simples para ajustar um formato de texto pode quebrar silenciosamente a gravação no banco de dados.',
    badCode: {
      title: '✕ Anti-Padrão: A classe faz de TUDO (regras, banco e e-mail juntos)',
      code: `// ✕ PROBLEMA: 3 motivos diferentes para esta classe ser alterada!
class GerenciadorUsuario {
  constructor(
    public readonly nome: string,
    public readonly email: string
  ) {}

  // Motivo 1: Mudança nas regras do usuário
  validarEmail(): boolean {
    return this.email.includes('@');
  }

  // Motivo 2: Mudança no banco de dados (ex: migrar de MySQL para PostgreSQL)
  salvarNoBanco(): void {
    console.log("Conectando ao SQL e salvando " + this.nome);
  }

  // Motivo 3: Mudança no servidor de e-mail ou no texto da mensagem
  enviarEmailBoasVindas(): void {
    console.log("Enviando e-mail SMTP para " + this.email);
  }
}`,
      explanation: 'Se o provedor de e-mail mudar ou o banco de dados for atualizado, temos que mexer na mesma classe Usuario, gerando risco de efeitos colaterais.'
    },
    goodCode: {
      title: '✓ Padrão SOLID: Cada classe cuida exclusivamente da sua tarefa',
      code: `// ✓ SOLUÇÃO: Cada parte do sistema tem uma ÚNICA responsabilidade!

// 1. Dados e validação pura (imutável)
interface Usuario {
  readonly nome: string;
  readonly email: string;
}

// 2. Especialista exclusivo em Banco de Dados
class RepositorioUsuario {
  salvar(usuario: Usuario): void {
    console.log("[Banco] Usuário salvo com segurança: " + usuario.nome);
  }
}

// 3. Especialista exclusivo em Comunicação / Notificações
class ServicoDeEmail {
  enviarBoasVindas(emailDestino: string): void {
    console.log("[E-mail] Mensagem enviada para: " + emailDestino);
  }
}

// Como usar:
const usuario: Usuario = { nome: "Ana", email: "ana@email.com" };
const repositorio = new RepositorioUsuario();
const emailService = new ServicoDeEmail();

repositorio.salvar(usuario);
emailService.enviarBoasVindas(usuario.email);`,
      explanation: 'Agora, se o layout do e-mail mudar, alteramos apenas ServicoDeEmail. O banco de dados e as regras do usuário nem tomam conhecimento da alteração.'
    },
    beginnerTrap: 'Exagerar e fragmentar o código em excesso (criar uma classe de 1 linha para cada operação minúscula). Responsabilidade Única significa ter um propósito de negócio coeso, e não espalhar variáveis à toa.',
    mnemonic: 'Cada macaco no seu galho: se uma classe tem mais de um motivo para ser editada, divida as tarefas.',
    tagColor: 'primary'
  },

  // 2. O - OPEN/CLOSED PRINCIPLE
  {
    id: 'ocp',
    letter: 'O',
    name: 'Open/Closed Principle (OCP)',
    portugueseTitle: 'Princípio Aberto / Fechado',
    oneLiner: 'Entidades de software devem estar abertas para extensão, mas fechadas para modificação.',
    realWorldAnalogy: {
      title: 'O Smartphone e os Fones de Ouvido',
      description: 'Você não precisa abrir a tampa traseira do seu celular com chave de fenda e soldar novos fios na placa-mãe toda vez que compra um fone de ouvido ou capinha nova. O celular possui portas e conexões padrão (Bluetooth, USB): ele está pronto para novos recursos (extensão) sem que ninguém mexa nos circuitos internos (modificação).',
      iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`
    },
    whyItMatters: 'Permite criar novas funcionalidades sem encostar em códigos antigos que já estão funcionando perfeitamente e testados em produção.',
    badCode: {
      title: '✕ Anti-Padrão: Modificar código existente com if/else a cada novidade',
      code: `// ✕ PROBLEMA: Toda nova forma de pagamento obriga a MODIFICAR este arquivo!
type FormaPagamento = 'boleto' | 'cartao' | 'pix';

class CaixaRegistradora {
  processar(valor: number, forma: FormaPagamento): void {
    if (forma === 'boleto') {
      console.log("Gerando código de barras para: R$ " + valor);
    } else if (forma === 'cartao') {
      console.log("Cobrando taxa de 3% no cartão: R$ " + valor);
    } else if (forma === 'pix') {
      console.log("Gerando QR Code instantâneo: R$ " + valor);
    }
    // E quando a empresa quiser aceitar Cripto, Vale-Refeição ou Pix Parcelado?
    // Teremos que abrir este arquivo, colocar mais "else if" e arriscar quebrar o Boleto!
  }
}`,
      explanation: 'Cada nova funcionalidade altera a classe CaixaRegistradora. Um erro de digitação pode derrubar todas as formas de pagamento anteriores de uma vez só.'
    },
    goodCode: {
      title: '✓ Padrão SOLID: Estenda com novas classes sem alterar as existentes',
      code: `// ✓ SOLUÇÃO: Criamos um contrato (interface) padronizado!

interface MetodoPagamento {
  readonly nome: string;
  pagar(valor: number): void;
}

// 1. Cada modalidade é uma classe isolada
class PagamentoBoleto implements MetodoPagamento {
  readonly nome = 'Boleto Bancário';
  pagar(valor: number): void {
    console.log("[Boleto] Código de barras gerado: R$ " + valor);
  }
}

class PagamentoPix implements MetodoPagamento {
  readonly nome = 'Pix';
  pagar(valor: number): void {
    console.log("[Pix] QR Code dinâmico criado: R$ " + valor);
  }
}

// 2. Quer adicionar Criptomoeda amanhã? Basta CRIAR uma nova classe!
class PagamentoCripto implements MetodoPagamento {
  readonly nome = 'Bitcoin';
  pagar(valor: number): void {
    console.log("[Cripto] Transação enviada para a blockchain: R$ " + valor);
  }
}

// 3. A caixa registradora NUNCA mais precisa ser modificada!
class CaixaRegistradora {
  processar(valor: number, metodo: MetodoPagamento): void {
    console.log("Iniciando pagamento via " + metodo.nome);
    metodo.pagar(valor);
  }
}`,
      explanation: 'A classe CaixaRegistradora está FECHADA para modificações, mas ABERTA para extensões: você pode plugar 50 novas formas de pagamento sem alterar uma linha dela.'
    },
    beginnerTrap: 'Achar que você nunca mais tem permissão para editar um arquivo existente. O princípio alerta contra a edição de regras estáveis para acomodar novidades; correções de bugs em um arquivo continuam perfeitamente normais!',
    mnemonic: 'Plugue sem quebrar: adicione novos recursos como um pendrive na porta USB.',
    tagColor: 'success'
  },

  // 3. L - LISKOV SUBSTITUTION PRINCIPLE
  {
    id: 'lsp',
    letter: 'L',
    name: 'Liskov Substitution Principle (LSP)',
    portugueseTitle: 'Princípio da Substituição de Liskov',
    oneLiner: 'Uma classe filha deve poder substituir sua classe pai sem quebrar o funcionamento do programa.',
    realWorldAnalogy: {
      title: 'O Pato de Borracha no Lago Natural',
      description: 'Se parece com um pato e faz barulho de pato, mas usa pilha e afunda se a bateria vazar, você não pode soltá-lo no lago esperando que ele nade e coma peixes como um pato de verdade. Se uma função espera um Pato vivo e recebe um de borracha que quebra na água, o sistema entra em colapso. Classes filhas devem honrar tudo o que a classe pai promete.',
      iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/></svg>`
    },
    whyItMatters: 'Permite que o polimorfismo seja seguro e previsível. Você pode passar qualquer subclasse para uma função e ter 100% de certeza de que ela não vai lançar erros inesperados por recusar métodos da classe mãe.',
    badCode: {
      title: '✕ Anti-Padrão: Subclasse que recusa ou quebra o método da classe pai',
      code: `// ✕ PROBLEMA: A classe filha Pinguim quebra a promessa da classe Ave!
class Ave {
  voar(): void {
    console.log("Batendo asas e voando alto...");
  }
}

class Gaviao extends Ave {
  // Voa normalmente
}

class Pinguim extends Ave {
  override voar(): void {
    // Pinguim é uma Ave na biologia, mas no software NÃO VOA!
    // Lançar um erro aqui quebra qualquer código que use Ave!
    throw new Error("Pânico! Pinguins não conseguem voar!");
  }
}

function fazerBandoVoar(aves: readonly Ave[]): void {
  // Quando chegar no Pinguim, a aplicação inteira vai TRAVAR!
  aves.forEach(ave => ave.voar());
}`,
      explanation: 'O Pinguim não pode substituir a Ave de forma transparente porque ele quebra o contrato de voar. Quem chamou a função achava que qualquer Ave saberia voar.'
    },
    goodCode: {
      title: '✓ Padrão SOLID: Hierarquia honesta onde cada tipo cumpre seu papel',
      code: `// ✓ SOLUÇÃO: Separamos o que é comum de todos do que é específico!

// 1. Contrato básico que TODA ave no planeta cumpre
interface Ave {
  readonly nome: string;
  comer(): void;
}

// 2. Contrato adicional APENAS para quem tem a habilidade de voar
interface AveVoadora extends Ave {
  voar(): void;
}

// 3. O Gavião implementa AveVoadora
class Gaviao implements AveVoadora {
  readonly nome = 'Gavião-real';
  comer(): void { console.log(this.nome + " comeu peixe."); }
  voar(): void { console.log(this.nome + " voando em círculos no céu."); }
}

// 4. O Pinguim implementa apenas Ave (e suas habilidades próprias como nadar)
class Pinguim implements Ave {
  readonly nome = 'Pinguim-imperador';
  comer(): void { console.log(this.nome + " comeu crustáceos."); }
  nadar(): void { console.log(this.nome + " mergulhando a 20 km/h no gelo."); }
}

// Agora nossa função só recebe quem REALMENTE sabe voar. Zero surpresas e zero erros!
function fazerDecolagem(aves: readonly AveVoadora[]): void {
  aves.forEach(ave => ave.voar());
}`,
      explanation: 'Todas as instâncias de AveVoadora podem ser substituídas por qualquer uma de suas subclasses ou implementações sem nenhum risco de quebrar o sistema.'
    },
    beginnerTrap: 'Usar herança apenas para "copiar e colar" código fácil. Só herde de uma classe pai se a classe filha puder cumprir TODAS as promessas da mãe sem exceção.',
    mnemonic: 'Filho de peixe, peixinho é: a classe filha nunca pode se recusar a fazer o que a mãe prometeu.',
    tagColor: 'warning'
  },

  // 4. I - INTERFACE SEGREGATION PRINCIPLE
  {
    id: 'isp',
    letter: 'I',
    name: 'Interface Segregation Principle (ISP)',
    portugueseTitle: 'Princípio da Segregação de Interfaces',
    oneLiner: 'Muitas interfaces específicas são melhores do que uma única interface geral e pesada.',
    realWorldAnalogy: {
      title: 'O Controle Remoto com 100 Botões',
      description: 'Imagine comprar uma lâmpada inteligente e receber um controle remoto com 100 botões que inclui botões para ligar o ar-condicionado, ejetar DVD e trocar a marcha do carro. Você só queria ligar e desligar a luz! Ninguém deve ser obrigado a implementar botões ou funções que não vai utilizar.',
      iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`
    },
    whyItMatters: 'Evita classes cheias de métodos fantasmas com corpos vazios ou que jogam erros do tipo "Não implementado". Mantém os contratos de código leves, modulares e fáceis de entender.',
    badCode: {
      title: '✕ Anti-Padrão: Uma interface "Gorda" que empurra métodos desnecessários',
      code: `// ✕ PROBLEMA: Interface gigantesca forçando todo aparelho a ter fax e scanner!
interface DispositivoDeEscritorio {
  imprimir(texto: string): void;
  escanearDocumento(): string;
  enviarFax(numero: string): void; // Aparelho de Fax em pleno século 21?!
}

// Uma impressora simples USB barata só sabe imprimir papel!
class ImpressoraEconomica implements DispositivoDeEscritorio {
  imprimir(texto: string): void {
    console.log("Imprimindo folhas: " + texto);
  }

  // É forçada pelo compilador a escrever métodos que não existem no aparelho:
  escanearDocumento(): string {
    throw new Error("Esta impressora simples não tem vidro de scanner!");
  }

  enviarFax(numero: string): void {
    throw new Error("Não tem linha telefônica para fax!");
  }
}`,
      explanation: 'A classe ImpressoraEconomica foi obrigada a fingir que possui scanner e fax apenas para satisfazer a interface genérica.'
    },
    goodCode: {
      title: '✓ Padrão SOLID: Interfaces pequenas e focadas que podem ser combinadas',
      code: `// ✓ SOLUÇÃO: Dividimos a interface em contratos menores e específicos!

interface Impressora {
  imprimir(texto: string): void;
}

interface Scanner {
  escanear(): string;
}

// 1. A impressora simples implementa apenas o que ela realmente faz!
class ImpressoraSimples implements Impressora {
  imprimir(texto: string): void {
    console.log("[Impressão Básica]: " + texto);
  }
}

// 2. Um modelo moderno topo de linha pode combinar as duas interfaces livremente!
class MultifuncionalModerna implements Impressora, Scanner {
  imprimir(texto: string): void {
    console.log("[Impressão Laser Rápida]: " + texto);
  }

  escanear(): string {
    return "[Arquivo PDF digitalizado em alta resolução]";
  }
}`,
      explanation: 'Ninguém é obrigado a depender de métodos que não utiliza. As classes ficam limpas, sem códigos mortos ou exceções artificiais.'
    },
    beginnerTrap: 'Criar interfaces genéricas gigantescas como "IGerenciadorGeral" achando que vai economizar arquivos. É infinitamente melhor ter 3 interfaces pequenas do que 1 monstro cheio de métodos inúteis.',
    mnemonic: 'Não me obrigue a assinar o que eu não vou usar: contratos sob medida para cada cliente.',
    tagColor: 'purple'
  },

  // 5. D - DEPENDENCY INVERSION PRINCIPLE
  {
    id: 'dip',
    letter: 'D',
    name: 'Dependency Inversion Principle (DIP)',
    portugueseTitle: 'Princípio da Inversão de Dependência',
    oneLiner: 'Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações.',
    realWorldAnalogy: {
      title: 'A Tomada na Parede da sua Casa',
      description: 'Você não solda os fios da sua televisão ou do ventilador diretamente no poste de energia da rua. Existe uma tomada com padrão de três pinos na parede (uma abstração/interface). Qualquer fabricante que faça um eletrodoméstico que encaixe nessa tomada funciona na sua casa. A tomada desacopla sua casa da empresa fornecedora de energia.',
      iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v6m0 8v6M4.93 4.93l4.24 4.24m5.66 5.66 4.24 4.24M2 12h6m8 0h6M4.93 19.07l4.24-4.24m5.66-5.66 4.24-4.24"/></svg>`
    },
    whyItMatters: 'Torna o código modular, fácil de testar com mocks em memória e pronto para trocar tecnologias (como trocar de banco de dados ou provedor de SMS) sem reescrever a lógica do negócio.',
    badCode: {
      title: '✕ Anti-Padrão: A regra de negócio cria e "solda" dependências com "new"',
      code: `// ✕ PROBLEMA: O serviço está "casado e colado" com o MySQL!
class BancoMySQL {
  salvar(dados: string): void {
    console.log("Conectado na porta 3306 salvando dados no MySQL: " + dados);
  }
}

class ServicoPedido {
  // Dependência rígida criada diretamente com new:
  private readonly banco = new BancoMySQL();

  criarPedido(descricao: string): void {
    // Regra de negócio...
    this.banco.salvar(descricao);

    // E se quisermos testar esse código sem ter o MySQL instalado? IMPOSSÍVEL!
    // E se quisermos trocar para MongoDB ou PostgreSQL? Teremos que reescrever tudo!
  }
}`,
      explanation: 'A lógica importante da sua empresa (criarPedido) depende rigidamente de detalhes técnicos de baixo nível (MySQL).'
    },
    goodCode: {
      title: '✓ Padrão SOLID: Dependa de uma interface e receba a dependência de fora',
      code: `// ✓ SOLUÇÃO: Criamos a "tomada" (interface abstrata)!

// 1. A abstração (contrato do banco de dados)
interface BancoDeDados {
  salvar(dados: string): void;
}

// 2. Implementação real para produção
class BancoPostgreSQL implements BancoDeDados {
  salvar(dados: string): void {
    console.log("[Produção - Postgres]: Dados gravados em disco -> " + dados);
  }
}

// 3. Implementação fake em memória super rápida para testes dos alunos
class BancoEmMemoriaParaTestes implements BancoDeDados {
  readonly itensSalvos: string[] = [];
  salvar(dados: string): void {
    this.itensSalvos.push(dados);
    console.log("[Teste Local]: Gravado em memória sem precisar de servidor!");
  }
}

// 4. O serviço agora RECEBE o banco pelo construtor (Injeção de Dependência)!
class ServicoPedido {
  constructor(private readonly banco: BancoDeDados) {}

  criarPedido(descricao: string): void {
    this.banco.salvar(descricao);
  }
}

// Em produção:
const servicoReal = new ServicoPedido(new BancoPostgreSQL());
servicoReal.criarPedido("Notebook Gamer");

// No computador do estudante (sem instalar nenhum banco pesado!):
const servicoTeste = new ServicoPedido(new BancoEmMemoriaParaTestes());
servicoTeste.criarPedido("Mouse Sem Fio");`,
      explanation: 'A classe de negócio não sabe nem quer saber qual banco está sendo usado. Ela apenas sabe que quem se conectar na "tomada" BancoDeDados sabe executar salvar().'
    },
    beginnerTrap: 'Achar que Inversão de Dependência exige frameworks mágicos complexos. Ela é simplesmente o ato de passar a dependência como argumento do construtor em vez de instanciar com new dentro da classe!',
    mnemonic: 'Ligue na tomada, não solde no poste: módulos importantes mandam no contrato, detalhes se adaptam.',
    tagColor: 'info'
  }
];

export const SOLID_QUIZ_DATA: readonly SolidQuizItem[] = [
  {
    id: 'quiz-1',
    principleLetter: 'S',
    scenario: 'Um aluno júnior criou uma classe chamada "RelatorioFinanceiro". Dentro dela, ele colocou o código para somar as vendas do mês, o código para conectar ao banco Oracle e o código para formatar o texto em arquivo PDF.',
    question: 'Qual princípio S.O.L.I.D. foi desrespeitado nessa classe?',
    options: [
      {
        letter: 'S',
        label: 'S — Single Responsibility (A classe tem mais de um motivo para mudar)',
        isCorrect: true
      },
      {
        letter: 'O',
        label: 'O — Open/Closed (A classe não tem métodos abertos)',
        isCorrect: false
      },
      {
        letter: 'L',
        label: 'L — Liskov Substitution (A classe não possui herança)',
        isCorrect: false
      },
      {
        letter: 'D',
        label: 'D — Dependency Inversion (O Oracle não é compatível)',
        isCorrect: false
      }
    ],
    explanation: 'Correto! A classe tem três responsabilidades distintas: cálculo financeiro, acesso ao banco e geração de PDF. Ela deve ser dividida para que uma alteração no visual do PDF não afete as regras do cálculo.'
  },
  {
    id: 'quiz-2',
    principleLetter: 'O',
    scenario: 'Para calcular o frete de uma loja virtual, um desenvolvedor usou um "switch/case" com os Correios e Transportadora A. Quando a empresa contratou a Transportadora B, ele precisou abrir o arquivo e colocar mais um "case". Mês que vem ele terá que alterar de novo para colocar a Transportadora C.',
    question: 'Qual princípio S.O.L.I.D. ensina a resolver isso permitindo novas transportadoras sem alterar o código original?',
    options: [
      {
        letter: 'L',
        label: 'L — Liskov Substitution',
        isCorrect: false
      },
      {
        letter: 'O',
        label: 'O — Open/Closed Principle (Aberto para extensão, fechado para modificação)',
        isCorrect: true
      },
      {
        letter: 'I',
        label: 'I — Interface Segregation',
        isCorrect: false
      },
      {
        letter: 'S',
        label: 'S — Single Responsibility',
        isCorrect: false
      }
    ],
    explanation: 'Exato! O princípio Aberto/Fechado (OCP) recomenda criar uma interface "CalculadoraFrete". Cada nova transportadora será uma nova classe que implementa essa interface, sem que você precise mexer no código das outras que já funcionam.'
  },
  {
    id: 'quiz-3',
    principleLetter: 'L',
    scenario: 'Uma classe base "ContaBancaria" tem o método "sacar(valor)". O programador criou a subclasse "ContaInvestimentoBloqueada" herdando de ContaBancaria. Ao tentar sacar, a subclasse lança a exceção "Erro: Não é permitido sacar nesta conta!". Uma função do sistema travou ao tentar sacar de uma lista de contas.',
    question: 'Qual princípio foi violado ao criar uma subclasse que quebra a expectativa da classe pai?',
    options: [
      {
        letter: 'S',
        label: 'S — Single Responsibility',
        isCorrect: false
      },
      {
        letter: 'L',
        label: 'L — Liskov Substitution Principle (A filha não pode quebrar a promessa da mãe)',
        isCorrect: true
      },
      {
        letter: 'I',
        label: 'I — Interface Segregation',
        isCorrect: false
      },
      {
        letter: 'D',
        label: 'D — Dependency Inversion',
        isCorrect: false
      }
    ],
    explanation: 'Muito bem! Pelo Princípio de Liskov (LSP), qualquer subclasse deve poder ser usada no lugar da classe pai sem causar erros inesperados. Se uma conta não permite saques, ela não deveria herdar cegamente de uma classe que promete saques livres.'
  },
  {
    id: 'quiz-4',
    principleLetter: 'I',
    scenario: 'Em um jogo, o criador definiu uma interface "Personagem" com os métodos "andar()", "atacar()", "voar()" e "lancarMagia()". O personagem "Guerreiro Anão" não voa e não sabe magia, mas foi obrigado a implementar esses dois métodos jogando erros no console.',
    question: 'Qual princípio diz que não devemos empurrar métodos inúteis para quem não precisa deles?',
    options: [
      {
        letter: 'I',
        label: 'I — Interface Segregation Principle (Interfaces menores e focadas)',
        isCorrect: true
      },
      {
        letter: 'O',
        label: 'O — Open/Closed Principle',
        isCorrect: false
      },
      {
        letter: 'D',
        label: 'D — Dependency Inversion',
        isCorrect: false
      },
      {
        letter: 'S',
        label: 'S — Single Responsibility',
        isCorrect: false
      }
    ],
    explanation: 'Perfeito! O Princípio da Segregação de Interfaces (ISP) prega que interfaces devem ser pequenas e especializadas (ex: "PersonagemTerrestre", "Voador", "Magico"), permitindo que o Guerreiro implemente apenas o que faz sentido para ele.'
  },
  {
    id: 'quiz-5',
    principleLetter: 'D',
    scenario: 'Um sistema de cadastro de clientes instancia diretamente "new ServicoEnvioSMS()" dentro da classe ClienteController. O professor pediu para o aluno testar o cadastro sem gastar créditos de SMS reais, mas o código não permite trocar o serviço de envio.',
    question: 'Qual princípio orienta a classe a depender de uma interface (abstração) para poder trocar o SMS real por um SMS simulado de teste?',
    options: [
      {
        letter: 'D',
        label: 'D — Dependency Inversion Principle (Depender de abstrações injetadas)',
        isCorrect: true
      },
      {
        letter: 'L',
        label: 'L — Liskov Substitution',
        isCorrect: false
      },
      {
        letter: 'O',
        label: 'O — Open/Closed Principle',
        isCorrect: false
      },
      {
        letter: 'S',
        label: 'S — Single Responsibility',
        isCorrect: false
      }
    ],
    explanation: 'Exatamente! Pelo Princípio da Inversão de Dependência (DIP), o ClienteController deve receber uma interface "Notificador" pelo construtor. Em produção você passa o SMS real; em testes, você passa um notificador falso que só imprime na tela.'
  }
];
