# UnirSoldas — Landing Page

Landing page institucional da **UnirSoldas** (montagem industrial e estruturas metálicas).
Construída como projeto de referência front-end: componentizada, tipada, acessível e testada.

## Stack

| Camada | Ferramenta |
|---|---|
| Framework | React 18 + TypeScript (strict) |
| Build | Vite |
| Estilo | Tailwind CSS (design tokens da marca) |
| Animação | Framer Motion + canvas (brasas) |
| Ícones | lucide-react |
| Testes | Vitest + Testing Library |
| Componentes | Storybook (+ addon a11y) |
| Qualidade | ESLint (jsx-a11y) + Prettier |
| CI | GitHub Actions (typecheck, lint, test, build) |
| Deploy | Vercel |

## Rodando localmente

```bash
npm install
npm run dev        # servidor de desenvolvimento
npm run storybook  # catálogo de componentes
npm test           # testes unitários
npm run build      # build de produção
```

## Estrutura

```
src/
  assets/          logo e imagens
  components/
    ui/            componentes reutilizáveis (Button, Section, Reveal, EmberCanvas...)
    layout/        Header, Footer, WhatsAppFab
    sections/      seções da página (Hero, Services, Process, Why, Gallery, Contact...)
  data/            conteúdo tipado (serviços, processo, stats, galeria)
  hooks/           useReducedMotion, useCountUp
  lib/             cn (merge de classes), site (config central)
  styles/          CSS global + tokens
```

## Antes de publicar

1. **WhatsApp**: editar `src/lib/site.ts` → `whatsapp` (só dígitos, com DDI 55).
2. **Contato**: e-mail, telefone, endereço e horário no mesmo arquivo.
3. **Fotos**: trocar as URLs em `src/data/gallery.ts` e os fundos do Hero/Why pelas fotos reais das obras.
4. **Números**: ajustar `src/data/stats.ts` para os dados reais da empresa.
5. **Formulário**: hoje ele encaminha os dados para o WhatsApp. Para receber por e-mail,
   integrar Formspree/EmailJS no `handleSubmit` de `src/components/sections/Contact.tsx`.

## Decisões de acessibilidade

- Navegação por teclado com foco visível (`focus-visible:ring`) em todos os interativos.
- `prefers-reduced-motion` respeitado (animações e canvas de brasas desligam).
- HTML semântico: `header`, `main`, `nav`, `section`, `figure/figcaption`, `address`, listas.
- Skip link ("Pular para o conteúdo") no topo.
- Imagens com `alt` descritivo e `loading="lazy"` na galeria.
