# Portfólio: vídeos de landing page + antes/depois de logos

Duas adições dentro da seção `#portfolio` que já existe, logo abaixo dos grids de Instagram. Sem criar tokens/classes novas — tudo usa o design system atual (vermelho neon, painéis de vidro, Reveal, TiltCard).

## 1. Abas dentro do Portfólio

No topo da seção, dois botões que alternam o conteúdo:

- **Social Media** — os grids de Instagram atuais, exatamente como estão hoje.
- **Landing Pages** — carrossel de vídeos.

A troca é animada (fade + slide curto), com o indicador deslizando entre as abas.

### Cards de vídeo (mockup de navegador)

Cada landing page vira um card com moldura de notebook/navegador:

- barra superior com os três pontinhos e uma "URL" do projeto
- vídeo dentro da tela, em loop, mudo, autoplay só quando o card entra na viewport
- clique abre em tela cheia (modal) com som opcional e botão de fechar
- hover com leve tilt e brilho vermelho, igual aos outros cards

Já deixo a estrutura pronta com 3 slots de exemplo. Quando você mandar os `.mp4` aqui no chat, eu subo pro CDN e troco os placeholders — sem mexer no layout.

## 2. Antes e Depois de logos

Bloco novo logo abaixo do portfólio, com título "Antes e depois" e um comparador arrastável:

- imagem do logo antigo à esquerda, novo à direita
- linha vertical no meio com um puxador circular e setas para os dois lados
- arrastar (mouse e toque) revela mais de um lado ou do outro
- rótulos "Antes" e "Depois" nos cantos, com opacidade acompanhando o arraste
- funciona também por teclado (setas), para acessibilidade
- animação de "convite": ao entrar na tela, a linha se move sozinha uma vez e volta ao centro

Começa com 2 ou 3 comparações de exemplo; você me manda os pares de imagem depois e eu substituo.

## Detalhes técnicos

- Novos arquivos: `src/components/sections/LandingPagesShowcase.tsx`, `src/components/ds/BrowserFrame.tsx`, `src/components/ds/BeforeAfter.tsx`, `src/components/sections/LogoBeforeAfter.tsx`.
- `InstagramPortfolio.tsx` passa a receber as abas e renderizar o conteúdo condicionalmente; o markup dos grids atuais não muda.
- `src/routes/index.tsx` ganha `<LogoBeforeAfter />` depois do portfólio.
- Vídeos: `playsInline`, `muted`, `loop`, `preload="metadata"`, tocando via IntersectionObserver e respeitando `prefers-reduced-motion`.
- Assets (vídeos e imagens de logo) vão para o CDN via Lovable Assets, com pointers `.asset.json`.
- Nenhuma alteração em `src/styles.css`.
