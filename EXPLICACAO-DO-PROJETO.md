# UnirSoldas — Guia Completo do que foi feito

Documento de referência do projeto. Explica **cada arquivo, cada decisão e o porquê**.
Use junto com o código (o `.zip`). Aqui você entende *o que existe e por que existe*;
para *aprender a fazer sozinho*, use o outro documento (Guia de Estudo) com os exercícios.

---

## Índice

1. Visão geral e stack
2. Fluxo: do navegador até a tela
3. Arquivos de configuração (raiz)
4. A camada de dados (`data/`)
5. Utilitários e hooks (`lib/`, `hooks/`)
6. Componentes de UI (`components/ui/`)
7. Layout (`components/layout/`)
8. Seções da página (`components/sections/`)
9. Estilos globais e design tokens
10. Qualidade: TypeScript, ESLint, testes, CI
11. Acessibilidade — o que foi feito e por quê
12. Como rodar, testar e publicar
13. Checklist antes de entregar ao cliente

---

## 1. Visão geral e stack

É a landing page institucional da UnirSoldas, reescrita em nível profissional:
componentizada, tipada, acessível, testada e com deploy automatizado.

| Camada | Ferramenta | Por que essa escolha |
|---|---|---|
| Framework | React 18 + TypeScript (strict) | Componentização + segurança de tipos |
| Build | Vite | Rápido, padrão de mercado hoje |
| Estilo | Tailwind CSS | Design tokens centralizados, sem CSS solto |
| Animação | Framer Motion + Canvas | Reveal declarativo + faíscas (assinatura) |
| Ícones | lucide-react | SVG leve, tree-shakeable |
| Testes | Vitest + Testing Library | Rápido, integra com Vite |
| Componentes | Storybook (+ addon a11y) | Documentar e testar peças isoladas |
| Qualidade | ESLint (jsx-a11y) + Prettier | Erros e a11y pegos automaticamente |
| CI | GitHub Actions | Barreira de qualidade a cada push |
| Deploy | Vercel | Deploy + HTTPS + preview por PR |

**Total:** 51 arquivos de fonte (sem `node_modules`).

---

## 2. Fluxo: do navegador até a tela

Entender a ordem em que as coisas rodam desmistifica o projeto inteiro:

```
index.html            ← o navegador abre isto primeiro
   └─ carrega /src/main.tsx
        └─ main.tsx cria a raiz React e renderiza <App/>
             └─ App.tsx monta, em ordem:
                  Header → Hero → Marquee → Stats → Services
                  → Process → Why → Gallery → CtaBand → Contact → Footer
                  + WhatsAppFab (botão flutuante)
```

- **`index.html`** — casca mínima. Só tem uma `<div id="root">` e carrega as fontes do
  Google e o `main.tsx`. Todo o conteúdo é injetado pelo React.
- **`main.tsx`** — ponto de entrada. Pega a `div#root`, cria a raiz React e renderiza o
  `<App/>` dentro de `<StrictMode>` (modo que ajuda a pegar bugs no desenvolvimento).
- **`App.tsx`** — o "índice" da página. Importa cada seção e as empilha na ordem certa.
  Não tem lógica; só composição. Isso é proposital: quem lê o App entende a página inteira
  em 15 linhas.

---

## 3. Arquivos de configuração (raiz)

### `package.json`
Lista as dependências e os comandos (`scripts`). Os principais:
- `dev` — servidor local com hot reload
- `build` — gera a versão de produção (roda o TypeScript antes: `tsc -b && vite build`)
- `lint` / `typecheck` / `test` — as três checagens de qualidade
- `storybook` — abre o catálogo de componentes

Separar dependências (`dependencies`) das ferramentas de desenvolvimento
(`devDependencies`) é intencional: o site em produção não carrega ESLint, Storybook, etc.

### `tsconfig.json`
Configura o TypeScript. Os pontos que importam:
- `"strict": true` — o modo rigoroso. Sem ele, metade da segurança de tipos some.
- `"noUnusedLocals"` / `"noUnusedParameters"` — reclama de variável não usada (código limpo).
- `"paths": { "@/*": ["./src/*"] }` — permite importar com `@/components/...` em vez de
  `../../../components/...`. Muito mais legível.

### `vite.config.ts`
- Ativa o plugin do React.
- Registra o alias `@` (o mesmo do tsconfig — os dois precisam concordar).
- Configura o Vitest (ambiente `jsdom` pra simular o navegador nos testes).

### `tailwind.config.ts` — **o coração do design**
Aqui vivem os **design tokens**: as cores e fontes da marca em um único lugar.
```ts
colors: {
  brand: { DEFAULT: '#e2681d', hi: '#ff8534', ember: '#ffb673' },
  steel: { DEFAULT: '#82878e', light: '#b9bec4' },
  // black, ink, charcoal, plate, line, paper...
}
```
**Por que centralizar:** se o cliente quiser um laranja diferente, você troca UM valor e o
site inteiro se atualiza. É a "paleta padronizada" da obra.

### `.eslintrc.cjs`, `.prettierrc`
ESLint com o plugin `jsx-a11y` (inspetor de acessibilidade automático) e o Prettier
(formatação consistente). Juntos, garantem que qualquer pessoa no time escreva no mesmo
padrão.

### `.github/workflows/ci.yml`
Roda `typecheck → lint → test → build` a cada push/PR. Se qualquer um falhar, o PR fica
vermelho. É a rede de segurança que impede código quebrado de entrar.

### `vercel.json`
Diz à Vercel como buildar (`npm run build`) e onde está o resultado (`dist`). Deploy vira
um `git push`.

---

## 4. A camada de dados (`data/`)

Decisão central do projeto: **conteúdo separado da aparência.** Os textos não estão dentro
dos componentes — estão em arquivos de dados tipados.

### `data/services.ts`
```ts
export interface Service {
  readonly id: string;
  readonly icon: LucideIcon;
  readonly title: string;
  readonly description: string;
}
export const services: readonly Service[] = [ /* 6 serviços */ ];
```
- A `interface` define o **formato** de um serviço. Se você esquecer um campo, o TS avisa.
- `readonly` = esses dados não devem ser alterados em tempo de execução (são conteúdo fixo).
- Cada serviço carrega o próprio ícone (`LucideIcon`) — o componente só renderiza.

### `data/process.ts`, `data/stats.ts`, `data/gallery.ts`
Mesma ideia para as etapas do processo, os números e as fotos. **Benefício prático:** o
cliente pede pra mudar um texto → você edita um arquivo de dados, sem tocar em layout, sem
risco de quebrar nada. E no futuro dá pra puxar isso de um CMS/banco sem reescrever telas.

---

## 5. Utilitários e hooks

### `lib/cn.ts`
Junta classes CSS condicionais e resolve conflitos do Tailwind (`p-4 p-8` → fica `p-8`).
Padrão do shadcn/ui. Usado em quase todo componente.

### `lib/site.ts`
Fonte única de verdade do contato: WhatsApp, e-mail, endereço, horário. Mais a função
`whatsappUrl()` que monta o link com a mensagem já codificada (`encodeURIComponent` cuida
de espaços e acentos). **Trocar o número do WhatsApp = editar uma linha aqui.**

### `hooks/useReducedMotion.ts`
Retorna `true` se o usuário pediu menos animação nas configurações do sistema. Usado para
desligar as faíscas e os reveals. Acessibilidade real: pessoas com labirintite/enxaqueca
dependem disso.

### `hooks/useCountUp.ts`
Anima um número de 0 até o alvo quando ele entra na tela. Junta duas APIs do navegador:
- `IntersectionObserver` — detecta quando o elemento aparece (eficiente, sem escutar scroll).
- `requestAnimationFrame` — anima suave (~60fps).
Com uma curva de *easing* (`1-(1-p)³`) pra o número desacelerar no fim, parecendo natural.
Respeita `prefers-reduced-motion` (mostra o valor final direto se preciso).

---

## 6. Componentes de UI (`components/ui/`)

São as peças "burras" e genéricas — não sabem nada sobre soldas, servem pra qualquer
projeto.

### `Button.tsx` — o componente mais avançado
Um botão que vira `<button>` **ou** `<a>` (link/WhatsApp) sem duplicar estilo:
- **União de tipos** (`ButtonProps | LinkProps`): o TS obriga a passar `as="a"` para usar
  `href`. Erro pego em tempo de escrita.
- **`forwardRef`**: deixa o componente pai acessar o elemento HTML real — necessário para
  foco e bibliotecas de UI.
- **Foco visível** (`focus-visible:ring-2`): anel laranja ao navegar por teclado (Tab).
- 3 variantes: `primary`, `ghost`, `dark`.

### `Button.stories.tsx`
Documentação viva no Storybook: mostra as 3 variantes isoladas, com controles interativos.
Facilita revisar o componente sem rodar o site inteiro.

### `Button.test.tsx`
Dois testes: o clique dispara `onClick`; com `as="a"` vira um link com `href`. Usa
`getByRole` (testa como o usuário/leitor de tela enxerga, não por classe CSS).

### `Section.tsx`
Container semântico (`<section>`) com largura máxima e espaçamento padrão. Aceita `label`
para dar nome a seções sem título visível (acessibilidade).

### `SectionHeading.tsx`
O cabeçalho reutilizável (olho + título + subtítulo). Aparece em Serviços, Processo,
Galeria, Contato. Escrito uma vez, reusado em vários lugares.

### `Reveal.tsx`
Envolve conteúdo e o revela suavemente ao entrar na tela (Framer Motion). Se o usuário
prefere menos movimento, renderiza sem animação — a decisão fica encapsulada aqui, então
nenhuma seção precisa se preocupar com isso.

### `EmberCanvas.tsx` — o **elemento de assinatura**
As partículas de brasa subindo sobre o hero, em `<canvas>`. É o toque memorável que amarra
a página ao ofício (solda). Pontos de engenharia:
- Cria ~70 partículas, cada uma com posição, velocidade, vida e cor.
- Anima com `requestAnimationFrame`.
- **Limpa tudo no `return` do useEffect** (cancela o frame, remove o listener de resize) —
  sem isso, vazaria memória.
- Renderiza `null` se o usuário prefere menos movimento.

---

## 7. Layout (`components/layout/`)

Peças específicas deste site (sabem que é a UnirSoldas).

### `Header.tsx`
Topo fixo. Fica transparente no início e ganha fundo escuro ao rolar (estado `scrolled`
via `useEffect` + evento de scroll). Navegação semântica (`<nav>` + `<ul>`), com foco
visível nos links. Botão de orçamento sempre à mão.

### `Footer.tsx`
Faixa dos três pilares (Qualidade · Segurança · Compromisso), logo, mini-navegação e o
copyright com ano dinâmico (`new Date().getFullYear()`).

### `WhatsAppFab.tsx`
Botão flutuante de WhatsApp, verde, sempre visível. Ícone do lucide, `aria-label` para
leitores de tela, foco visível.

---

## 8. Seções da página (`components/sections/`)

Os blocos que compõem a página. Cada um monta os componentes de UI + os dados.

- **`Hero.tsx`** — a primeira dobra. Foto de fundo tratada, gradiente escuro para
  legibilidade, faíscas por cima (EmberCanvas), título entrando linha por linha (animação
  `slide-up`), com a palavra "peso" em destaque laranja, e dois CTAs.
- **`Marquee.tsx`** — faixa rolando os serviços; puxa a lista de `data/services`. É
  decorativa, por isso `aria-hidden` (leitor de tela ignora).
- **`Stats.tsx`** — os quatro números, com contadores animados (`useCountUp`). Números
  contam de 0 ao valor ao aparecer; o "NR-35" (texto) aparece direto.
- **`Services.tsx`** — grade dos 6 serviços a partir de `data/services`. Barra laranja
  surge na lateral no hover. Usa `<ul>/<li>` (é uma lista de verdade).
- **`Process.tsx`** — as 4 etapas (Levantamento → Projeto → Fabricação → Montagem) em uma
  `<ol>` numerada (ordem importa, então lista ordenada).
- **`Why.tsx`** — layout dividido: foto + os três pilares com ícones. A imagem tem
  `role="img"` e `aria-label` porque é um fundo CSS com significado.
- **`Gallery.tsx`** — mosaico assimétrico com `<figure>/<figcaption>`. Hover tira o
  preto-e-branco e revela a legenda. Imagens com `loading="lazy"` (performance).
- **`CtaBand.tsx`** — faixa laranja de chamada para ação antes do contato.
- **`Contact.tsx`** — formulário funcional. Ao enviar, monta uma mensagem com os dados e
  abre o WhatsApp já preenchido (`handleSubmit`). Campos com `<label>` associado (`htmlFor`),
  validação nativa (`required`), foco visível, e um aviso de status (`role="status"`).

---

## 9. Estilos globais e design tokens

### `styles/index.css`
- Importa as três camadas do Tailwind (`base`, `components`, `utilities`).
- Define o fundo escuro e a fonte padrão do `body`.
- Adiciona um **grão de filme** sutil sobre a página inteira (via `body::after` com um SVG
  de ruído) — dá textura industrial sem pesar.
- Um bloco `@media (prefers-reduced-motion: reduce)` que **desliga animações globalmente**
  para quem pediu — reforço da acessibilidade, além do que os componentes já fazem.

Todas as cores/fontes vêm dos tokens do `tailwind.config.ts`. Não há cor "chumbada" solta
espalhada pelo código — isso é o que mantém o design consistente e fácil de mudar.

---

## 10. Qualidade: TypeScript, ESLint, testes, CI

O que faz este projeto ser "profissional" e não só bonito:

- **TypeScript strict** — erros de tipo pegos no editor, antes de rodar. Ex.: passar número
  onde se espera texto acusa na hora.
- **ESLint + jsx-a11y** — regras automáticas, inclusive de acessibilidade (imagem sem
  `alt`, clique em elemento não interativo, etc.).
- **Prettier** — formatação idêntica em todo o código.
- **Vitest + Testing Library** — testes que simulam o usuário. Já há testes do Button;
  o próximo passo natural é cobrir o formulário e os hooks.
- **CI (GitHub Actions)** — roda tudo isso a cada push. Nada quebrado entra na `main`.

**Provado, não prometido:** no momento da entrega, o projeto passou em `typecheck`, `lint`,
`test` (2 testes) e `build` de produção (~99 kB de JS gzip).

---

## 11. Acessibilidade — o que foi feito e por quê

Acessibilidade não é enfeite; é o que separa júnior de sênior no front. Feito aqui:

- **Skip link** ("Pular para o conteúdo") no topo do `App` — quem usa teclado pula direto
  ao conteúdo sem tabular por toda a navegação.
- **Foco visível** (`focus-visible:ring`) em todos os elementos interativos.
- **HTML semântico** — `header`, `main`, `nav`, `section`, `figure/figcaption`, `address`,
  `<ul>`/`<ol>`. Leitores de tela entendem a estrutura.
- **`prefers-reduced-motion`** respeitado em três níveis: nos hooks, nos componentes e no
  CSS global.
- **Imagens com `alt` descritivo** e `loading="lazy"` na galeria.
- **Formulário** com `<label>` associado a cada campo e feedback de status.
- **ESLint jsx-a11y** garantindo que isso não regrida no futuro.

---

## 12. Como rodar, testar e publicar

```bash
# 1. instalar dependências (uma vez)
npm install

# 2. desenvolver
npm run dev          # abre em localhost com hot reload

# 3. ver os componentes isolados
npm run storybook

# 4. checagens de qualidade
npm run typecheck
npm run lint
npm test

# 5. build de produção
npm run build        # gera a pasta dist/
npm run preview      # testa o build localmente
```

**Publicar na Vercel:** suba o projeto no GitHub, conecte o repositório na Vercel. O
`vercel.json` já está pronto — cada push na `main` publica automaticamente, com HTTPS e
domínio grátis. Depois é só apontar o domínio próprio da empresa.

---

## 13. Checklist antes de entregar ao cliente

Estes são os únicos ajustes que faltam para ir ao ar de verdade:

1. **WhatsApp** — em `src/lib/site.ts`, troque `whatsapp` pelo número real (só dígitos, com
   o 55 na frente). Ex.: `5531999998888`.
2. **Contato** — no mesmo arquivo: e-mail, telefone exibido, endereço e horário reais.
3. **Fotos** — troque as URLs em `src/data/gallery.ts` e os fundos do Hero/Why pelas fotos
   reais das obras da empresa. (Enquanto não tem, as de banco seguram.)
4. **Números** — ajuste `src/data/stats.ts` para os dados verdadeiros (anos de mercado,
   obras entregues).
5. **Formulário** — hoje ele encaminha os dados para o WhatsApp. Se quiser receber por
   e-mail também, integre Formspree ou EmailJS no `handleSubmit` de
   `src/components/sections/Contact.tsx`.
6. **Favicon/OG** — o favicon já usa a logo; confira o texto de compartilhamento
   (Open Graph) no `index.html`.

---

## Palavra final

O projeto é uma base sólida e entregável. Como engenharia, é um **pleno bem-feito**: a
disciplina (tipos, acessibilidade, testes, CI) está em bom nível; a complexidade de
programação é baixa porque é uma página estática.

Este documento te dá o mapa completo do que existe. Para de fato *subir de nível como
programador*, o caminho é reconstruir as peças sem olhar (está no Guia de Estudo) e depois
partir para um projeto com estado, dados assíncronos e roteamento — onde mora a lógica que
prova o nível sênior.
