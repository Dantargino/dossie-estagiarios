---
description: Passo a passo obrigatório para criação ou alteração de páginas no projeto utilizando as ferramentas do Stitch e as habilidades (skills) do assistente de IA.
---

# Fluxo de Trabalho: Criação e Alteração de Páginas com Stitch

Sempre que a sua tarefa for **criar uma nova página (interface)** ou **alterar significativamente o design de uma página existente**, você deve **OBRIGATORIAMENTE** seguir este fluxo utilizando o Stitch MCP. Nunca comece o código frontend diretamente do zero.

## 1. Planejamento Tático e Aprimoramento do Prompt
- **Ação:** Entenda a intenção de UI/UX do usuário.
- **Skill Associada:** Faça a leitura e aplique a skill `enhance-prompt` ou a `stitch-design` (usando o `view_file` na respectiva skill se necessário lembrar as orientações). 
- **Objetivo:** Transformar requisitos curtos (ex: "crie um painel de admins") em um prompt que especifique layout dinâmico, navegação clara, micro-interações, suporte a design moderno (premium) e aderência ao sistema do projeto.

## 2. Abstração e Recuperação do Design System
- **Ação:** Recupere o contexto de estilo ou telas já salvas.
- **Skill Associada:** Leia e aplique a skill `design-md`. Utilize para analisar projetos do Stitch na sua árvore ou criar a síntese (`.stitch/DESIGN.md`) que vai guiar as próximas telas, conferindo consistência com componentes de reuso.
- **Ferramentas úteis:** 
  - Call `mcp_StitchMCP_list_projects` para descobrir o seu `projectId`.
  - Call `mcp_StitchMCP_list_screens` para entender se já existem páginas padronizadas para puxar referências.

## 3. Ideação e Geração da Tela (Stitch MCP)
- **Ação:** Com um prompt rico e o contexto visual em mãos, chame as ferramentas do MCP.
  - Se for **Nova Página**: `mcp_StitchMCP_generate_screen_from_text` e forneça como `prompt` a descrição altamente aprimorada no passo 1.
  - Se for **Alteração / Nova Feature em Tela**: `mcp_StitchMCP_edit_screens` apontando para o(s) ID(s) correto(s).
- **Tratamento de Exceções:** 
  - Essas ferramentas podem demorar minutos para finalizar a geração (gerando desconexão na timeline do LLM).
  - Nunca perca a paciência re-testando ou fechando rapidamente a operação. Acostume-se a chamar futuramente o `mcp_StitchMCP_get_screen` da sua página gerada.
  - **Dica User-in-the-loop:** Se o campo `output_components` tiver opções variadas ("Yes, create a mobile variant / Make them all"), retorne as opções ao usuário e aguarde sua confirmação antes de seguir.

## 4. Transição Autônoma para o Código
- **Ação:** Uma vez que o design da tela no Stitch esteja finalizado e bonito.
- **Skill Associada:** Você dependerá da stack que o projeto está operando. Exemplo: se for em React, invoque os passos da skill `react:components` ou implemente manualmente. 
- **Fluxos Extensos:** Se o site for contínuo (requer construção constante), engate na skill `stitch-loop` transferindo a responsabilidade da UI de forma automatizada (baton-passing).

---
**Nota de Sucesso Estético:** Você será cobrado (como IA) por criar interfaces extremamente primorosas, harmoniosas e funcionais. Jamais pule esta etapa de arquitetar no Stitch.
