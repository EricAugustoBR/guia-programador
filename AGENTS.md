# AGENTS.md — Diretrizes e Contexto do Projeto

Bem-vindo ao repositório do **Guia do Programador**! Este documento serve como guia de contexto, padrões e diretrizes para agentes de Inteligência Artificial e desenvolvedores trabalhando neste projeto.

---

## 🎯 Visão Geral do Projeto

O **Guia do Programador** é uma plataforma e guia interativo de **aprendizado e memorização ativa** voltado para desenvolvedores de software. O projeto visa transformar conceitos densos da programação em referências práticas, visuais, diretas e de fácil retenção.

### Principais Pilares:
1. **Guia de Aprendizado & Memorização**:
   - Resumos visuais, cheatsheets, analogias e técnicas de repetição/retenção rápida.
   - Conceitos fundamentais e avançados explicados de forma clara e objetiva.
2. **Foco Forte em Front-End Moderno**:
   - Padrões de arquitetura de interface, boas práticas, acessibilidade (a11y), performance e semântica.
   - Aplicação web desenvolvida com **TypeScript**.
3. **Biblioteca de Componentes Vivos (HTML, CSS e SVG)**:
   - Catálogo modular e reutilizável de elementos de interface.
   - Foco em soluções nativas, robustas e elegantes sem dependência desnecessária de frameworks pesados para a camada base.

---

## 🏗️ Estrutura e Tecnologias

- **Linguagem Principal**: [TypeScript](https://www.typescriptlang.org/) (tipagem estrita, interfaces claras e legibilidade).
- **Camada de Interface**:
  - **HTML**: Marcação semântica, acessibilidade (WAI-ARIA), SEO e estruturação limpa.
  - **CSS**: CSS moderno (CSS Grid, Flexbox, Custom Properties/Variáveis, Animações, Container Queries, temas Claro/Escuro).
  - **SVG**: Gráficos vetoriais interativos, ícones otimizados, diagramas conceituais e ilustrações técnicas leves.

---

## 🤖 Diretrizes de Atuação para Agentes de IA

Ao propor, implementar ou refatorar recursos neste repositório, os agentes devem seguir as seguintes regras:

### 1. Filosofia de Design e Código
- **Imutabilidade (Regra Nº 1)**: Nunca modifique objetos, arrays ou estados existentes diretamente na memória. Crie novas instâncias usando o spread operator (`...`), métodos puros e tipos `readonly` no TypeScript para garantir previsibilidade e evitar efeitos colaterais.
- **Pedagógico e Prático**: Cada explicação ou componente deve ter utilidade real de aprendizado e memorização imediata.
- **Tipagem Estrita**: Escreva TypeScript idiomático, evitando `any` e aproveitando types literais, generics e interfaces descritivas.
- **Componentes Nativos & Independentes**:
  - Priorize HTML semântico e CSS nativo modular.
  - Mantenha os componentes isolados, acessíveis e fáceis de inspecionar e copiar.
- **SVGs Otimizados**:
  - Garanta que SVGs tenham atributos adequados (`viewBox`, `role="img"`, `aria-hidden` ou `aria-label`).
  - Mantenha o markup de vetores limpo e legível.

### 2. Padrões de Conteúdo do Guia
- **Estrutura de Tópico de Memorização**:
  1. **Conceito em 1 frase** (O que é?).
  2. **Por que importa?** (Onde usar / Problema que resolve).
  3. **Exemplo de Código / Snippet** (TypeScript / HTML / CSS / SVG).
  4. **Armadilha comum / Pegadinha** (O que evitar).
  5. **Mnemônico / Dica visual** (Para fixação rápida).

### 3. Convenções de Nomenclatura e Arquitetura
- Nomes de arquivos em `kebab-case` (ex: `memory-card.ts`, `button-base.css`).
- Componentes e tipos em `PascalCase` (ex: `ComponentCard`, `SvgIconProps`).
- Funções e variáveis em `camelCase`.
- CSS seguindo convenções semânticas e baseadas em tokens (ex: `--color-primary`, `--spacing-md`).

---

## 📌 Checklist para Novos Componentes ou Guias

Ao submeter novas contribuições:
- [ ] O código TypeScript está devidamente tipado e compilável?
- [ ] O HTML é estritamente semântico e acessível?
- [ ] O CSS utiliza boas práticas e propriedades modernas?
- [ ] O SVG está otimizado e legível?
- [ ] Há um exemplo prático de uso e explicação rápida para memorização?
