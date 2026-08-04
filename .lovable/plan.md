# Remover o card @clinica.glow do portfólio

As imagens da clínica aparecem quebradas no seu navegador. Como você optou por remover, o portfólio passa a mostrar apenas os dois cases que carregam corretamente.

## O que muda

- O perfil `@clinica.glow` sai da seção "Trabalhos que já entregamos".
- Restam dois cards: `@acai.freshbr` e `@barbearia.elite`.
- O grid passa a centralizar dois cards em vez de três, mantendo o mesmo tamanho e espaçamento visual (uma coluna no mobile, duas a partir do tablet, com largura máxima centralizada no desktop para não ficarem esticados).
- O modal de visualização dos posts continua funcionando igual para os dois cases restantes.
- Os arquivos de imagem da clínica em `public/portfolio/clinica/` são apagados, já que ficam sem uso.

## Detalhes técnicos

- `src/components/sections/InstagramPortfolio.tsx`: remover a entrada da clínica do array `profiles` e ajustar as classes do grid de `sm:grid-cols-2 lg:grid-cols-3` para um layout de 2 colunas centralizado (`sm:grid-cols-2` + `max-w-3xl mx-auto`).
- Remover o diretório `public/portfolio/clinica/`.
- Verificação: screenshot da seção no preview confirmando os dois cards com todas as imagens carregando.
