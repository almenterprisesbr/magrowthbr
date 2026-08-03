# Atualizações MA Growth

## 1. Sua foto na seção "Quem executa"
- Substituir o bloco atual com as letras "MA" por sua foto em preto-e-branco/alto contraste (a foto enviada), em card com borda vermelha e brilho neon, hover 3D suave.
- Foto hospedada como asset do projeto, com `alt` descritivo ("Matheus Almeida, fundador da MA Growth").

## 2. Logo nos espaços menores
- Aplicar o logo enviado (MA Growth Marketing) no lugar do quadradinho "MA" em: navbar, rodapé, card do fundador no hero e no loader inicial.
- Versão reduzida (apenas o símbolo MA) onde o espaço é pequeno; versão completa no rodapé.

## 3. FAQ — textos reescritos

**Preciso fechar um pacote mensal para começar?**
Não. Você contrata só o que precisa. Trabalhamos com serviços pontuais: criação e integração de landing page ou site, criação de posts, campanhas de tráfego, criação de reels, logo e identidade visual. Se fizer sentido evoluir para algo contínuo, isso é decisão sua — nunca uma exigência.

**Em quanto tempo o serviço fica pronto?**
O prazo varia conforme a demanda e o escopo do projeto. Ele é definido e confirmado após o pagamento da entrada (uma porcentagem do valor), e a partir daí o cronograma é fechado: entregas ágeis, com data marcada e sem atraso.

**Como funciona o acompanhamento depois da entrega?**
Você fala direto comigo, sem intermediários. Faço o alinhamento e os ajustes necessários para o que foi entregue realmente gerar retorno.

## 4. Contato e localização
- Remover "São Vicente · SP" do rodapé e de qualquer outro lugar (inclusive dos dados estruturados de SEO).
- Trocar o e-mail para `almenterprisesbr@gmail.com` em todo o site (rodapé, dados de SEO, configuração central).

## Detalhes técnicos
- Imagens enviadas via Lovable Assets (pointer `.asset.json`), sem binários no repositório.
- Novo componente `src/components/ds/Logo.tsx` reutilizável (variantes `mark` e `full`).
- Arquivos tocados: `src/lib/site.ts`, `src/components/sections/Authority.tsx`, `Navbar.tsx`, `Footer.tsx`, `Hero.tsx`, `Faq.tsx`, `src/routes/index.tsx`.
