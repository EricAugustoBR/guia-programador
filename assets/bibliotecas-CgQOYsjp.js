import"./main-CvY94YZ6.js";var e=[{id:`all`,label:`Todos os Conjuntos`,iconSvg:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`},{id:`headless`,label:`Headless & Código Próprio`,iconSvg:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`},{id:`css-in-js`,label:`CSS-in-JS & Runtime`,iconSvg:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`},{id:`utility-semantic`,label:`Utility & Component Classes`,iconSvg:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`},{id:`enterprise`,label:`All-in-One & Enterprise`,iconSvg:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`},{id:`zero-runtime`,label:`Zero-Runtime & Tipado`,iconSvg:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/></svg>`}],t=[{id:`shadcn`,name:`shadcn/ui`,paradigm:`Primitivas Headless + Tailwind + CVA (Código Próprio)`,philosophy:`Você não instala como dependência npm. O código-fonte vive no seu repositório (/components/ui). Total controle e zero lock-in.`,code:`// components/ui/button.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export function Button({ className, variant, size, ...props }) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}`,pros:[`Propriedade integral do código (você edita como quiser)`,`Sem breaking changes surpresas de dependências externas`,`Excelente performance (CSS estático do Tailwind compilado)`,`Acessibilidade WAI-ARIA fornecida pelo Radix UI`],cons:[`Você é responsável pela manutenção e upgrades manuais`,`Exige Tailwind CSS configurado no projeto`],renderSample:e=>{e.innerHTML=`
        <div style="display: flex; gap: 0.75rem; align-items: center; justify-content: center; flex-wrap: wrap;">
          <button style="
            background: #6366f1;
            color: #ffffff;
            border: none;
            padding: 0.55rem 1.2rem;
            border-radius: 6px;
            font-size: 0.875rem;
            font-weight: 600;
            box-shadow: 0 1px 2px rgba(0,0,0,0.1);
            cursor: pointer;
            transition: background 0.15s;
          " onmouseover="this.style.background='#4f46e5'" onmouseout="this.style.background='#6366f1'">
            Primary (Default)
          </button>
          <button style="
            background: transparent;
            color: var(--text-primary);
            border: 1px solid var(--border-medium);
            padding: 0.55rem 1.2rem;
            border-radius: 6px;
            font-size: 0.875rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.15s;
          " onmouseover="this.style.background='var(--bg-surface-hover)'" onmouseout="this.style.background='transparent'">
            Outline
          </button>
          <button style="
            background: #ef4444;
            color: #ffffff;
            border: none;
            padding: 0.55rem 1.2rem;
            border-radius: 6px;
            font-size: 0.875rem;
            font-weight: 600;
            cursor: pointer;
          ">
            Destructive
          </button>
        </div>
      `}},{id:`styled-components`,name:`Styled Components`,paradigm:`CSS-in-JS Tradicional com Tagged Template Literals`,philosophy:`Escreva CSS nativo dentro do JavaScript, encapsulado automaticamente por componente com injeção de estilos em tempo de execução via props.`,code:`// Button.styled.ts
import styled, { css } from 'styled-components';

interface ButtonProps {
  $variant?: 'primary' | 'outline' | 'danger';
  $isLoading?: boolean;
}

export const StyledButton = styled.button<ButtonProps>\`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  \${({ $variant, theme }) => {
    switch ($variant) {
      case 'outline':
        return css\`
          background: transparent;
          border: 1px solid \${theme.colors.border};
          color: \${theme.colors.text};
        \`;
      case 'danger':
        return css\`
          background: \${theme.colors.danger};
          color: #fff;
          border: none;
        \`;
      default:
        return css\`
          background: \${theme.colors.primary};
          color: #fff;
          border: none;
        \`;
    }
  }}

  \${({ $isLoading }) => $isLoading && css\`
    opacity: 0.6;
    pointer-events: none;
  \`}
\`;`,pros:[`Estilos e lógica co-localizados no mesmo componente`,`Zero vazamento ou colisão de classes (hashes únicos gerados)`,`Suporte maduro a temas dinâmicos via ThemeProvider`],cons:[`Overhead de execução em JavaScript para injetar tags <style>`,`Incompatível nativamente com React Server Components (RSC)`,`Aumenta o bundle inicial da aplicação`],renderSample:e=>{e.innerHTML=`
        <div style="display: flex; gap: 0.75rem; align-items: center; justify-content: center; flex-wrap: wrap;">
          <button style="
            background: linear-gradient(135deg, #ec4899, #8b5cf6);
            color: #ffffff;
            border: none;
            padding: 0.6rem 1.3rem;
            border-radius: 8px;
            font-size: 0.875rem;
            font-weight: 600;
            box-shadow: 0 4px 10px rgba(236, 72, 153, 0.3);
            cursor: pointer;
          ">
            💅 Styled Primary
          </button>
          <button style="
            background: transparent;
            border: 1px solid #ec4899;
            color: #ec4899;
            padding: 0.6rem 1.3rem;
            border-radius: 8px;
            font-size: 0.875rem;
            font-weight: 600;
            cursor: pointer;
          ">
            💅 Styled Outline
          </button>
        </div>
      `}},{id:`daisyui`,name:`DaisyUI (Tailwind Semântico)`,paradigm:`Classes de Componentes em CSS Puro sobre Tailwind`,philosophy:`Elimina as pilhas de 20 classes utilitárias substituindo-as por nomes semânticos como "btn", "btn-primary", "card" sem adicionar 1KB de JavaScript.`,code:`<!-- HTML / JSX com classes do DaisyUI -->
<button class="btn btn-primary">
  Primary Button
</button>

<button class="btn btn-outline btn-secondary">
  Outline Button
</button>

<!-- Estado de Loading nativo com spinner embutido -->
<button class="btn btn-primary btn-square">
  <span class="loading loading-spinner"></span>
</button>`,pros:[`Zero JavaScript obrigatório (100% CSS puro)`,`Código limpo no JSX/HTML sem dezenas de classes repetidas`,`Mais de 30 temas prontos com alternador claro/escuro nativo`,`Totalmente compatível com Tailwind CSS`],cons:[`Menos liberdade de customização milimétrica do que Tailwind puro`,`Depende de convenções predefinidas do plugin`],renderSample:e=>{e.innerHTML=`
        <div style="display: flex; gap: 0.75rem; align-items: center; justify-content: center; flex-wrap: wrap;">
          <button style="
            background: #570df8;
            color: #ffffff;
            border: none;
            padding: 0 1.25rem;
            height: 2.75rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 600;
            cursor: pointer;
          ">
            .btn.btn-primary
          </button>
          <button style="
            background: transparent;
            border: 2px solid #f000b8;
            color: #f000b8;
            padding: 0 1.25rem;
            height: 2.75rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 600;
            cursor: pointer;
          ">
            .btn.btn-outline
          </button>
          <button style="
            background: #2a323c;
            color: #a6adba;
            border: none;
            padding: 0 1.25rem;
            height: 2.75rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 600;
            cursor: pointer;
          ">
            .btn.btn-neutral
          </button>
        </div>
      `}},{id:`mui`,name:`Material UI (MUI)`,paradigm:`Biblioteca Baterias-Inclusas Enterprise com Prop sx`,philosophy:`O ecossistema corporativo completo baseado no Material Design do Google. Traz centenas de componentes prontos para uso imediato.`,code:`// Componente com Material UI
import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

export function ActionGroup({ isLoading }: { isLoading?: boolean }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        color="primary"
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={16} /> : null}
        sx={{ textTransform: 'none', borderRadius: 2 }}
      >
        MUI Contained
      </Button>

      <Button variant="outlined" color="primary" sx={{ textTransform: 'none' }}>
        MUI Outlined
      </Button>
    </Stack>
  );
}`,pros:[`Pronto para produção com centenas de componentes e ícones`,`Sistema robusto de Grid, Tabelas e Formulários`,`Prop "sx" permite customizações rápidas sem sair do JSX`],cons:[`Bundle size inicial pesado`,`Difícil de escapar do visual rígido do Material Design`,`Utiliza Emotion por baixo dos panos (overhead de runtime)`],renderSample:e=>{e.innerHTML=`
        <div style="display: flex; gap: 0.75rem; align-items: center; justify-content: center; flex-wrap: wrap;">
          <button style="
            background: #1976d2;
            color: #ffffff;
            border: none;
            padding: 6px 16px;
            border-radius: 4px;
            font-size: 0.875rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.02857em;
            box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14);
            cursor: pointer;
          ">
            MUI Contained
          </button>
          <button style="
            background: transparent;
            color: #1976d2;
            border: 1px solid rgba(25, 118, 210, 0.5);
            padding: 5px 15px;
            border-radius: 4px;
            font-size: 0.875rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.02857em;
            cursor: pointer;
          ">
            MUI Outlined
          </button>
        </div>
      `}},{id:`antd`,name:`Ant Design (antd)`,paradigm:`Biblioteca Enterprise Especializada em Dashboards B2B`,philosophy:`Focada em fluxos de trabalho corporativos densos: formulários intrincados, tabelas com paginação e ordenação automáticas, árvores de dados.`,code:`// Componente com Ant Design
import React from 'react';
import { Button, Space } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

export function AntdButtons() {
  return (
    <Space wrap>
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="primary" danger>Danger Button</Button>
      <Button type="primary" loading icon={<PoweroffOutlined />}>
        Loading
      </Button>
    </Space>
  );
}`,pros:[`Melhor ecossistema do mercado para tabelas, filtros e dashboards`,`Riquíssimo em estados funcionais e componentes avançados de formulário`,`Internacionalização (i18n) pronta e acessível`],cons:[`Estética corporativa muito característica e difícil de reformar`,`Alto acoplamento com o ecossistema interno da biblioteca`],renderSample:e=>{e.innerHTML=`
        <div style="display: flex; gap: 0.6rem; align-items: center; justify-content: center; flex-wrap: wrap;">
          <button style="
            background: #1677ff;
            color: #ffffff;
            border: 1px solid #1677ff;
            height: 32px;
            padding: 4px 15px;
            border-radius: 6px;
            font-size: 14px;
            box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
            cursor: pointer;
          ">
            Primary
          </button>
          <button style="
            background: var(--bg-surface);
            color: var(--text-primary);
            border: 1px solid var(--border-medium);
            height: 32px;
            padding: 4px 15px;
            border-radius: 6px;
            font-size: 14px;
            cursor: pointer;
          ">
            Default
          </button>
          <button style="
            background: transparent;
            color: var(--text-primary);
            border: 1px dashed var(--border-medium);
            height: 32px;
            padding: 4px 15px;
            border-radius: 6px;
            font-size: 14px;
            cursor: pointer;
          ">
            Dashed
          </button>
        </div>
      `}},{id:`vanilla-css`,name:`CSS Nativo Moderno`,paradigm:`HTML Semântico + Custom Properties + Data Attributes`,philosophy:`A abordagem padrão da web: zero dependências, zero bundler obrigatório, compatibilidade perpétua e velocidade absoluta do motor do navegador.`,code:`/* styles/button.css */
.btn-native {
  --btn-bg: var(--brand-primary, #6366f1);
  --btn-color: #ffffff;
  
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  border: 1px solid transparent;
  background: var(--btn-bg);
  color: var(--btn-color);
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.btn-native[data-variant="outline"] {
  --btn-bg: transparent;
  --btn-color: var(--text-primary);
  border-color: var(--border-medium);
}

.btn-native:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`,pros:[`Dependência zero (funciona em qualquer framework ou sem nenhum)`,`Máxima performance e menor tamanho de página possível`,`À prova de futuro (funciona daqui a 10 anos sem npm install)`],cons:[`Requer escrever a lógica de acessibilidade e foco manualmente`,`Não há catálogo pré-fabricado de dezenas de componentes complexos`],renderSample:e=>{e.innerHTML=`
        <div style="display: flex; gap: 0.75rem; align-items: center; justify-content: center; flex-wrap: wrap;">
          <button style="
            background: var(--brand-primary);
            color: #ffffff;
            border: 1px solid transparent;
            padding: 0.6rem 1.2rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.875rem;
            cursor: pointer;
          ">
            Native Primary
          </button>
          <button style="
            background: transparent;
            color: var(--text-primary);
            border: 1px solid var(--border-medium);
            padding: 0.6rem 1.2rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.875rem;
            cursor: pointer;
          ">
            Native Outline
          </button>
        </div>
      `}}],n=[{id:`shadcn-ui`,name:`shadcn/ui`,ptName:`Coleção de Componentes com Radix UI, Tailwind e CVA`,category:`headless`,categoryLabel:`Headless & Código Próprio`,badge:`Tendência Nº 1`,concept:`Não é uma dependência do node_modules; é uma coleção de código aberto que você copia diretamente para seu projeto via CLI, unindo acessibilidade com Tailwind.`,purpose:`SaaS modernos, aplicações que exigem design system 100% customizado e projetos com Next.js ou Vite que desejam autonomia contra quebras de API.`,goodPractice:"Personalize o arquivo `components.json` e sinta-se livre para refatorar o código copiado para atender às necessidades exatas do seu produto.",commonPitfall:"Esperar que comandos `npm update` atualizem automaticamente os componentes como se fossem um pacote externo.",mnemonic:`"shadcn não é hóspede do node_modules, é dono da casa no seu src/components/ui".`,architecture:{distribution:`CLI Copy-Paste (Código Local)`,stylingApproach:`Tailwind CSS + CVA`,bundleImpact:`Mínimo (Zero Runtime Overhead)`,rscSupport:`Totalmente Compatível com RSC`,lockIn:`Nenhum / Baixo`},codeSnippet:`// 1. Instale o componente desejado no seu terminal:
// npx shadcn@latest add dialog

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function ExportModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Abrir Modal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmar Ação</DialogTitle>
          <DialogDescription>
            Seu código está hospedado no seu próprio projeto.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem; width: 100%;">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-align: center;">
            Experimente as variantes dinâmicas criadas com <strong>Class Variance Authority (CVA)</strong>:
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center;" id="shadcn-buttons-stage">
            <button class="stage-btn-pill is-active" data-variant="default">Default</button>
            <button class="stage-btn-pill" data-variant="secondary">Secondary</button>
            <button class="stage-btn-pill" data-variant="destructive">Destructive</button>
            <button class="stage-btn-pill" data-variant="ghost">Ghost</button>
          </div>
          <div id="shadcn-live-preview" style="
            margin-top: 0.5rem;
            padding: 0.6rem 1.4rem;
            border-radius: 6px;
            font-weight: 600;
            font-size: 0.875rem;
            background: var(--brand-primary);
            color: #ffffff;
            transition: all 0.2s ease;
          ">
            Botão shadcn/ui
          </div>
        </div>
      `;let t=e.querySelectorAll(`.stage-btn-pill`),n=e.querySelector(`#shadcn-live-preview`);t.forEach(e=>{e.addEventListener(`click`,e=>{t.forEach(e=>e.classList.remove(`is-active`));let r=e.currentTarget;r.classList.add(`is-active`);let i=r.dataset.variant;i===`secondary`?(n.style.background=`var(--bg-surface-hover)`,n.style.color=`var(--text-primary)`,n.style.border=`1px solid var(--border-medium)`):i===`destructive`?(n.style.background=`var(--color-danger)`,n.style.color=`#ffffff`,n.style.border=`none`):i===`ghost`?(n.style.background=`transparent`,n.style.color=`var(--text-secondary)`,n.style.border=`none`):(n.style.background=`var(--brand-primary)`,n.style.color=`#ffffff`,n.style.border=`none`)})})}},{id:`styled-components-item`,name:`Styled Components & Emotion`,ptName:`CSS-in-JS Tradicional com Tagged Template Literals`,category:`css-in-js`,categoryLabel:`CSS-in-JS & Runtime`,badge:`Padrão Clássico`,concept:`Permite escrever CSS puro dentro de arquivos JavaScript/TypeScript interpolando variáveis e props tipadas dinamicamente via template strings.`,purpose:`Aplicações React consolidadas que utilizam ThemeProvider centralizado e demandam isolamento estrito de classes sem conflito de nomes.`,goodPractice:"Utilize o prefixo `$` nas props (transient props, ex: `$isActive`) para evitar que propriedades de estilo vazem para o elemento HTML nativo do DOM.",commonPitfall:`Ignorar o impacto no First Contentful Paint (FCP) e tentar usar em React Server Components sem suporte a streaming de estilos.`,mnemonic:`"Props viram CSS no voo, mas pesam a mala de hidratação no servidor".`,architecture:{distribution:`Pacote npm (styled-components / @emotion/react)`,stylingApproach:`CSS-in-JS Runtime (Gera <style> dinâmico)`,bundleImpact:`Médio (+12KB gzipped + custo de compilação)`,rscSupport:`Incompatível com Server Components Diretos`,lockIn:`Médio`},codeSnippet:`import styled, { css } from 'styled-components';

interface CardProps {
  $isFeatured?: boolean;
}

export const ProductCard = styled.article<CardProps>\`
  background: \${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid \${({ theme }) => theme.colors.border};
  transition: transform 0.2s ease;

  \${({ $isFeatured }) =>
    $isFeatured &&
    css\`
      border-color: #f59e0b;
      box-shadow: 0 0 20px rgba(245, 158, 11, 0.2);
      transform: scale(1.02);
    \`}
\`;`,renderInteractive:e=>{e.innerHTML=`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem; width: 100%;">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-align: center;">
            Alterne a transient prop <code>$isFeatured</code>:
          </div>
          <button class="stage-btn-pill is-active" id="btn-toggle-sc-prop">
            $isFeatured: FALSE
          </button>
          <div id="sc-card-preview" style="
            width: 180px;
            padding: 1rem;
            background: var(--bg-surface-elevated);
            border: 1px solid var(--border-medium);
            border-radius: 10px;
            text-align: center;
            font-size: 0.8125rem;
            font-weight: 600;
            transition: all 0.3s ease;
          ">
            💅 Styled Card
          </div>
        </div>
      `;let t=e.querySelector(`#btn-toggle-sc-prop`),n=e.querySelector(`#sc-card-preview`),r=!1;t.addEventListener(`click`,()=>{r=!r,t.textContent=`$isFeatured: ${r?`TRUE`:`FALSE`}`,r?(t.classList.add(`is-active`),n.style.borderColor=`#f59e0b`,n.style.boxShadow=`0 0 20px rgba(245, 158, 11, 0.35)`,n.style.transform=`scale(1.05)`):(t.classList.remove(`is-active`),n.style.borderColor=`var(--border-medium)`,n.style.boxShadow=`none`,n.style.transform=`scale(1)`)})}},{id:`radix-ui`,name:`Radix UI Primitives & Headless UI`,ptName:`Primitivas Acessíveis Sem Estilos Embutidos (Headless)`,category:`headless`,categoryLabel:`Headless & Código Próprio`,badge:`Base dos Design Systems`,concept:`Componentes invisíveis que implementam os padrões WAI-ARIA, foco de teclado, armadilhas de foco (focus traps) e portais, sem nenhum CSS obrigatório.`,purpose:`A base sobre a qual você constrói o seu próprio Design System personalizado sem ter que programar comportamentos complexos de acessibilidade do zero.`,goodPractice:"Utilize a prop `asChild` para mesclar o comportamento do Radix com seus próprios elementos ou componentes sem criar divs extras no DOM.",commonPitfall:"Tentar criar acessibilidade para dropdowns e modais do zero com `<div>` e `onClick`, esquecendo navegação por setas e leitores de tela.",mnemonic:`"O cérebro e o esqueleto sem a pele: você escolhe como vestir".`,architecture:{distribution:`Pacotes npm modulares (@radix-ui/react-*)`,stylingApproach:`Zero Estilos (Traga seu Tailwind ou CSS)`,bundleImpact:`Baixo e Tree-shakeable`,rscSupport:`Client Components leves`,lockIn:`Nenhum / Baixo`},codeSnippet:`import * as Popover from '@radix-ui/react-popover';

export function UserPopover() {
  return (
    <Popover.Root>
      {/* asChild evita criar wrappers inúteis */}
      <Popover.Trigger asChild>
        <button className="my-trigger-button">Perfil</button>
      </Popover.Trigger>
      
      {/* Renderiza via Portal no fim do document.body */}
      <Popover.Portal>
        <Popover.Content className="my-popover-panel" sideOffset={5}>
          <p>Configurações da Conta</p>
          <Popover.Arrow className="my-popover-arrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem; width: 100%;">
          <div style="font-size: 0.75rem; color: var(--text-muted);">
            Exemplo de anatomia modular por composição:
          </div>
          <div style="
            background: var(--bg-surface-elevated);
            padding: 0.75rem 1.25rem;
            border-radius: 8px;
            font-size: 0.75rem;
            font-family: var(--font-mono);
            border: 1px solid var(--border-medium);
            color: var(--brand-primary);
          ">
            &lt;Popover.Root&gt;<br/>
            &nbsp;&nbsp;&lt;Popover.Trigger /&gt;<br/>
            &nbsp;&nbsp;&lt;Popover.Portal&gt;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;Popover.Content /&gt;<br/>
            &nbsp;&nbsp;&lt;/Popover.Portal&gt;<br/>
            &lt;/Popover.Root&gt;
          </div>
        </div>
      `}},{id:`daisyui-item`,name:`DaisyUI & Tailwind Component Classes`,ptName:`Plugin Semântico de Classes Puramente em CSS`,category:`utility-semantic`,categoryLabel:`Utility & Component Classes`,badge:`Produtividade Pura`,concept:"Adiciona classes de alto nível (`btn`, `card`, `modal`, `badge`) em CSS puro sobre o Tailwind CSS, sem exigir nenhum JavaScript em tempo de execução.",purpose:`MVPs ultra-rápidos, prototipagem ágil e projetos onde escrever 15 classes utilitárias por botão polui excessivamente a legibilidade do HTML.`,goodPractice:"Configure os temas nativos do DaisyUI no seu `tailwind.config.js` para alternar entre dark, light, cupcake, retro e cyber com 1 atributo HTML.",commonPitfall:`Tentar forçar comportamentos interativos complexos de acessibilidade (como focus trap em modais) sem o JS adequado, dependendo apenas de hacks com checkbox.`,mnemonic:`"O atalho semântico do Tailwind: uma classe que substitui dez utilitários".`,architecture:{distribution:`Plugin Tailwind (npm install daisyui)`,stylingApproach:`CSS Puro (Utility + Component Classes)`,bundleImpact:`Zero Runtime JS (Purge automático via Tailwind)`,rscSupport:`100% Nativo`,lockIn:`Baixo`},codeSnippet:`// tailwind.config.js
module.exports = {
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "synthwave"],
  },
}

// No seu HTML/JSX:
<div class="card w-96 bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Título com DaisyUI</h2>
    <p>Sem JS, sem dependência de framework.</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Comprar Agora</button>
    </div>
  </div>
</div>`,renderInteractive:e=>{e.innerHTML=`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem; width: 100%;">
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; justify-content: center;">
            <button class="stage-btn-pill is-active" data-daisy="primary">btn-primary</button>
            <button class="stage-btn-pill" data-daisy="secondary">btn-secondary</button>
            <button class="stage-btn-pill" data-daisy="accent">btn-accent</button>
          </div>
          <div id="daisy-sample-badge" style="
            display: inline-flex;
            align-items: center;
            padding: 0.4rem 1rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 700;
            background: #570df8;
            color: #ffffff;
            transition: all 0.2s;
          ">
            badge badge-primary
          </div>
        </div>
      `;let t=e.querySelectorAll(`.stage-btn-pill`),n=e.querySelector(`#daisy-sample-badge`);t.forEach(e=>{e.addEventListener(`click`,e=>{t.forEach(e=>e.classList.remove(`is-active`));let r=e.currentTarget;r.classList.add(`is-active`);let i=r.dataset.daisy;i===`secondary`?(n.style.background=`#f000b8`,n.textContent=`badge badge-secondary`):i===`accent`?(n.style.background=`#37cdbe`,n.textContent=`badge badge-accent`):(n.style.background=`#570df8`,n.textContent=`badge badge-primary`)})})}},{id:`material-ui`,name:`Material UI (MUI)`,ptName:`Ecossistema Enterprise Completo baseado em Material Design`,category:`enterprise`,categoryLabel:`All-in-One & Enterprise`,badge:`Gigante Corporativo`,concept:'Biblioteca "baterias-inclusas" com centenas de componentes pré-construídos, temas customizáveis e o prop `sx` para estilização direta.',purpose:`Aplicações empresariais de grande escala, portais de clientes corporativos e times que precisam de estabilidade sem inventar nova identidade visual.`,goodPractice:"Configure um `theme.ts` bem delineado com tokens semânticos de cor e tipografia em vez de espalhar valores arbitrários dentro da prop `sx`.",commonPitfall:`Tentar descaracterizar o visual do Material Design para parecer um site moderno minimalista; o esforço de sobrescrita se torna gigantesco.`,mnemonic:`"O caminhão blindado do front-end: vem com tudo pronto, mas custa caro mudar a lataria".`,architecture:{distribution:`Pacotes npm (@mui/material, @mui/icons-material)`,stylingApproach:`Emotion (CSS-in-JS Runtime) + sx prop`,bundleImpact:`Alto (Requer tree-shaking rigoroso)`,rscSupport:`Parcial com adaptadores`,lockIn:`Alto (Opinião Forte)`},codeSnippet:`import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Card, CardContent, Typography, Button } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
  },
});

export function EnterpriseCard() {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6">Painel Corporativo</Typography>
          <Button variant="contained" sx={{ mt: 2 }}>
            Acessar Relatório
          </Button>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem; width: 100%;">
          <div style="font-size: 0.75rem; color: var(--text-muted);">
            Ripple Effect & Elevação tátil clássica do Material Design:
          </div>
          <button style="
            background: #1976d2;
            color: #ffffff;
            border: none;
            padding: 8px 18px;
            border-radius: 4px;
            font-size: 0.8125rem;
            font-weight: 500;
            letter-spacing: 0.03em;
            text-transform: uppercase;
            box-shadow: 0 3px 6px rgba(25, 118, 210, 0.3);
            cursor: pointer;
          ">
            MUI Button
          </button>
        </div>
      `}},{id:`ant-design`,name:`Ant Design (antd)`,ptName:`O Especialista em Back-Offices, Tabelas e Dashboards B2B`,category:`enterprise`,categoryLabel:`All-in-One & Enterprise`,badge:`Rei dos Back-Offices`,concept:`Sistema de design e biblioteca com o maior arsenal de componentes para gerenciamento de dados complexos: tabelas com filtros, ordenação e árvores hierárquicas.`,purpose:`Sistemas internos, ERPs, CRMs, ferramentas de operação financeira e painéis onde a densidade de informação é prioridade absoluta.`,goodPractice:"Utilize o componente `Form` com seu hook `Form.useForm()` para orquestrar validações automáticas e submissões sem boilerplate de estado.",commonPitfall:`Usar Ant Design para criar websites institucionais ou landing pages de marketing; o peso e a linguagem visual foram pensados para sistemas.`,mnemonic:`"O cockpit de avião do desenvolvedor: mil comandos e tabelas densas prontas para decolar".`,architecture:{distribution:`Pacote npm (antd)`,stylingApproach:`CSS-in-JS nativo do antd (@ant-design/cssinjs)`,bundleImpact:`Alto (Otimizado para desktops internos)`,rscSupport:`Requer Client Boundary`,lockIn:`Alto (Opinião Forte)`},codeSnippet:`import { Table, Tag, Space, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface UserRecord {
  key: string;
  name: string;
  role: string;
  status: 'active' | 'suspended';
}

const columns: ColumnsType<UserRecord> = [
  { title: 'Nome', dataIndex: 'name', key: 'name', sorter: true },
  { title: 'Cargo', dataIndex: 'role', key: 'role' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === 'active' ? 'green' : 'volcano'}>{status.toUpperCase()}</Tag>
    ),
  },
];`,renderInteractive:e=>{e.innerHTML=`
        <div style="width: 100%; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.75rem;">
          <div style="display: flex; justify-content: space-between; padding: 0.4rem 0.6rem; background: var(--bg-surface-elevated); border-radius: 4px; font-weight: 700; border: 1px solid var(--border-medium);">
            <span>Usuário</span>
            <span>Status</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.4rem 0.6rem; border-bottom: 1px solid var(--border-subtle);">
            <span>Admin</span>
            <span style="background: rgba(16, 185, 129, 0.15); color: #10b981; padding: 0.1rem 0.4rem; border-radius: 4px; font-weight: 700;">ATIVO</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.4rem 0.6rem;">
            <span>Suporte</span>
            <span style="background: rgba(239, 68, 68, 0.15); color: #ef4444; padding: 0.1rem 0.4rem; border-radius: 4px; font-weight: 700;">SUSPENSO</span>
          </div>
        </div>
      `}},{id:`chakra-mantine`,name:`Chakra UI & Mantine`,ptName:`DX Obsessivo com Style Props e Hooks Utilitários Ricos`,category:`enterprise`,categoryLabel:`All-in-One & Enterprise`,badge:`DX Campeã`,concept:'Bibliotecas focadas na velocidade de codificação que permitem passar regras de estilo diretamente no JSX (`<Box p={4} m={2} bg="teal.500">`) com suporte nativo a acessibilidade.',purpose:`Desenvolvimento ágil de aplicações completas por equipes pequenas que querem evitar a curva de configuração de Tailwind ou CSS Modules.`,goodPractice:`Evite poluir os componentes com 20 style props; extraia padrões recorrentes em componentes compostos reutilizáveis.`,commonPitfall:`Ignorar o custo de processamento das style props em loops de listas com centenas de itens (render overhead).`,mnemonic:`"Estilo na ponta dos dedos: o JSX é o seu arquivo de estilo".`,architecture:{distribution:`Pacote npm (@chakra-ui/react ou @mantine/core)`,stylingApproach:`Style Props + Design Tokens`,bundleImpact:`Médio`,rscSupport:`Mantine v7 migrou para zero-runtime CSS Modules!`,lockIn:`Médio`},codeSnippet:`import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';

export function DashboardHeader() {
  return (
    // Style Props no próprio JSX
    <Flex align="center" justify="space-between" p={6} bg="gray.800" borderRadius="lg">
      <Box>
        <Heading size="md" color="white">Visão Geral</Heading>
        <Text fontSize="sm" color="gray.400">Dados atualizados agora</Text>
      </Box>
      <Button colorScheme="teal" size="sm">Atualizar</Button>
    </Flex>
  );
}`,renderInteractive:e=>{e.innerHTML=`
        <div style="
          width: 100%;
          padding: 0.85rem;
          background: var(--bg-surface-elevated);
          border-radius: 8px;
          border: 1px solid var(--border-medium);
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
          <div>
            <div style="font-weight: 700; font-size: 0.8125rem;">Box + Flex</div>
            <div style="font-size: 0.7rem; color: var(--text-muted);">Style Props no JSX</div>
          </div>
          <button style="
            background: #319795;
            color: white;
            border: none;
            padding: 0.4rem 0.8rem;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 600;
            cursor: pointer;
          ">
            teal.500
          </button>
        </div>
      `}},{id:`vanilla-extract`,name:`Vanilla Extract (Zero-Runtime CSS)`,ptName:`TypeScript Estilizado Extraído em Build Time para CSS Estático`,category:`zero-runtime`,categoryLabel:`Zero-Runtime & Tipado`,badge:`O Futuro Tipado`,concept:"Escreva estilos com TypeScript estrito (`style({ ... })`) que são extraídos em tempo de compilação em arquivos `.css` puros, com impacto zero de JavaScript em runtime.",purpose:`Aplicações que exigem type-safety completo com TypeScript e performance máxima com React Server Components (RSC) sem injeção de runtime.`,goodPractice:"Utilize `@vanilla-extract/recipes` para criar variantes atômicas semelhantes ao CVA com total tipagem estática.",commonPitfall:`Esperar interpolação dinâmica livre de props em runtime como no Styled Components; estilos dinâmicos devem ser feitos via CSS Custom Properties.`,mnemonic:`"Escreva em TypeScript no build, sirva em CSS puro na produção".`,architecture:{distribution:`Compilador no Bundler (Vite / Webpack plugin)`,stylingApproach:`Zero-Runtime CSS (Gera .css estático no build)`,bundleImpact:`Mínimo (0KB de JavaScript de runtime)`,rscSupport:`100% Compatível e Recomendado para RSC`,lockIn:`Baixo`},codeSnippet:`// button.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const buttonStyle = style({
  backgroundColor: vars.color.brand,
  color: '#ffffff',
  padding: '10px 20px',
  borderRadius: vars.radii.medium,
  fontWeight: 600,
  ':hover': {
    filter: 'brightness(1.1)',
  },
});

// Em Button.tsx:
// import { buttonStyle } from './button.css';
// export const Button = (props) => <button className={buttonStyle} {...props} />;`,renderInteractive:e=>{e.innerHTML=`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; width: 100%;">
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <span style="background: #10b981; width: 8px; height: 8px; border-radius: 50%;"></span>
            <span style="font-size: 0.75rem; font-weight: 700; color: #10b981;">0KB RUNTIME JS</span>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted); text-align: center;">
            CSS extraído no build + Autocomplete total de variáveis no VS Code.
          </div>
        </div>
      `}}],r=class{activeCategory=`all`;searchQuery=``;isLightMode=!1;activeRosettaId=`shadcn`;themeToggleBtn=document.getElementById(`theme-toggle-btn`);backToTopBtn=document.getElementById(`back-to-top`);searchInput=document.getElementById(`search-input`);categoryContainer=document.getElementById(`category-pills`);cardsGrid=document.getElementById(`libraries-grid`);resultsCount=document.getElementById(`results-count`);rosettaTabsContainer=document.getElementById(`rosetta-tabs-list`);rosettaBadge=document.getElementById(`rosetta-paradigm-badge`);rosettaTitle=document.getElementById(`rosetta-paradigm-title`);rosettaPhilosophy=document.getElementById(`rosetta-philosophy`);rosettaLiveStage=document.getElementById(`rosetta-live-stage`);rosettaProsList=document.getElementById(`rosetta-pros-list`);rosettaConsList=document.getElementById(`rosetta-cons-list`);rosettaCodeBlock=document.getElementById(`rosetta-code-block`);btnCopyRosetta=document.getElementById(`btn-copy-rosetta`);constructor(){this.initTheme(),this.setupEventListeners(),this.initRosettaStone(),this.renderCategoryPills(),this.renderCards()}initTheme(){localStorage.getItem(`guia-theme`)===`light`&&(this.isLightMode=!0,document.documentElement.setAttribute(`data-theme`,`light`)),this.updateThemeButton()}toggleTheme(){this.isLightMode=!this.isLightMode;let e=this.isLightMode?`light`:`dark`;document.documentElement.setAttribute(`data-theme`,e),localStorage.setItem(`guia-theme`,e),this.updateThemeButton()}updateThemeButton(){this.themeToggleBtn&&(this.themeToggleBtn.innerHTML=this.isLightMode?`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,this.themeToggleBtn.title=this.isLightMode?`Alternar para Modo Escuro`:`Alternar para Modo Claro`)}setupEventListeners(){this.themeToggleBtn?.addEventListener(`click`,()=>this.toggleTheme()),this.searchInput?.addEventListener(`input`,e=>{this.searchQuery=e.target.value.trim().toLowerCase(),this.renderCards()}),window.addEventListener(`scroll`,()=>{window.scrollY>300?this.backToTopBtn?.classList.add(`is-visible`):this.backToTopBtn?.classList.remove(`is-visible`)}),this.backToTopBtn?.addEventListener(`click`,()=>{window.scrollTo({top:0,behavior:`smooth`})})}initRosettaStone(){this.renderRosettaTabs(),this.updateRosettaView(),this.btnCopyRosetta?.addEventListener(`click`,async()=>{let e=this.rosettaCodeBlock?.textContent||``;try{await navigator.clipboard.writeText(e);let t=this.btnCopyRosetta?.querySelector(`span`);t&&(t.textContent=`Copiado! ✓`,setTimeout(()=>t.textContent=`Copiar Código`,1500))}catch(e){console.warn(`Erro ao copiar código rosetta`,e)}})}renderRosettaTabs(){let e=this.rosettaTabsContainer;e&&(e.innerHTML=``,t.forEach(t=>{let n=document.createElement(`button`);n.type=`button`,n.className=`rosetta-tab-btn ${this.activeRosettaId===t.id?`is-active`:``}`,n.innerHTML=`
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        <span>${t.name}</span>
      `,n.addEventListener(`click`,()=>{this.activeRosettaId=t.id,this.renderRosettaTabs(),this.updateRosettaView()}),e.appendChild(n)}))}updateRosettaView(){let e=t.find(e=>e.id===this.activeRosettaId)||t[0];this.rosettaBadge&&(this.rosettaBadge.textContent=e.paradigm),this.rosettaTitle&&(this.rosettaTitle.textContent=e.name),this.rosettaPhilosophy&&(this.rosettaPhilosophy.textContent=e.philosophy),this.rosettaLiveStage&&e.renderSample(this.rosettaLiveStage),this.rosettaProsList&&(this.rosettaProsList.innerHTML=`
        <div class="pros-title">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          <span>VANTAGENS</span>
        </div>
        ${e.pros.map(e=>`<div class="pros-item">• ${e}</div>`).join(``)}
      `),this.rosettaConsList&&(this.rosettaConsList.innerHTML=`
        <div class="cons-title">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          <span>ATENÇÃO / TRADE-OFFS</span>
        </div>
        ${e.cons.map(e=>`<div class="cons-item">• ${e}</div>`).join(``)}
      `),this.rosettaCodeBlock&&(this.rosettaCodeBlock.textContent=e.code)}renderCategoryPills(){let t=this.categoryContainer;t&&(t.innerHTML=``,e.forEach(e=>{let r=e.id===`all`?n.length:n.filter(t=>t.category===e.id).length,i=document.createElement(`button`);i.type=`button`,i.className=`category-pill ${this.activeCategory===e.id?`is-active`:``}`,i.innerHTML=`
        ${e.iconSvg}
        <span>${e.label}</span>
        <span class="category-pill-count">${r}</span>
      `,i.addEventListener(`click`,()=>{this.activeCategory=e.id,this.renderCategoryPills(),this.renderCards()}),t.appendChild(i)}))}getFilteredItems(){return n.filter(e=>{let t=this.activeCategory===`all`||e.category===this.activeCategory,n=!this.searchQuery||e.name.toLowerCase().includes(this.searchQuery)||e.ptName.toLowerCase().includes(this.searchQuery)||e.concept.toLowerCase().includes(this.searchQuery)||e.mnemonic.toLowerCase().includes(this.searchQuery)||e.architecture.distribution.toLowerCase().includes(this.searchQuery)||e.architecture.stylingApproach.toLowerCase().includes(this.searchQuery);return t&&n})}renderCards(){let e=this.cardsGrid;if(!e)return;e.innerHTML=``;let t=this.getFilteredItems();if(this.resultsCount&&(this.resultsCount.textContent=`Mostrando ${t.length} de ${n.length} conjuntos e ecossistemas`),t.length===0){e.innerHTML=`
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <p style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">Nenhum conjunto encontrado</p>
          <p style="font-size: 0.875rem;">Tente pesquisar por termos como "shadcn", "styled", "tailwind", "mui", "antd", "radix", "headless"...</p>
        </div>
      `;return}t.forEach(t=>{let n=document.createElement(`article`);n.className=`control-card`,n.id=`card-${t.id}`,n.innerHTML=`
        <div class="card-header">
          <div class="card-title-group">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <h3 class="card-title">${t.name}</h3>
              <span class="badge-card-rank">${t.badge}</span>
            </div>
            <span class="card-pt-name">${t.ptName}</span>
          </div>
          <span class="card-cat-badge">${t.categoryLabel}</span>
        </div>

        <div class="card-body">
          <div class="concept-box">
            <div class="concept-text">${t.concept}</div>
            <div class="purpose-text"><strong>Onde usar:</strong> ${t.purpose}</div>

            <div class="arch-summary-bar">
              <span class="arch-pill">📦 ${t.architecture.distribution}</span>
              <span class="arch-pill">🎨 ${t.architecture.stylingApproach}</span>
              <span class="arch-pill">⚡ ${t.architecture.rscSupport}</span>
              <span class="arch-pill">🔒 Lock-in: ${t.architecture.lockIn}</span>
            </div>
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
            <span>Ver Código</span>
          </button>
          <button type="button" class="btn-copy-code" id="copy-code-${t.id}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copiar</span>
          </button>
        </div>

        <div class="code-drawer" id="drawer-${t.id}">
          <pre><code>${this.escapeHtml(t.codeSnippet)}</code></pre>
        </div>
      `,e.appendChild(n);let r=n.querySelector(`#stage-${t.id}`);r&&t.renderInteractive(r);let i=n.querySelector(`#toggle-code-${t.id}`),a=n.querySelector(`#drawer-${t.id}`);i?.addEventListener(`click`,()=>{a?.classList.toggle(`is-open`);let e=i.querySelector(`span`);e&&(e.textContent=a?.classList.contains(`is-open`)?`Ocultar Código`:`Ver Código`)});let o=n.querySelector(`#copy-code-${t.id}`);o?.addEventListener(`click`,async()=>{try{await navigator.clipboard.writeText(t.codeSnippet);let e=o.querySelector(`span`);e&&(e.textContent=`Copiado! ✓`,setTimeout(()=>e.textContent=`Copiar`,1500))}catch(e){console.warn(`Erro ao copiar snippet`,e)}})})}escapeHtml(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`)}};document.addEventListener(`DOMContentLoaded`,()=>{new r});