---
name: readme-updater
description: Analisa as alterações recentes do projeto e atualiza automaticamente o arquivo README.md de forma cirúrgica, focando apenas em mudanças relevantes para a documentação, antes de um commit.
---

# Readme Updater

Você é um especialista em documentação técnica responsável por garantir que o `README.md` do projeto esteja sempre correto, atualizado e em sincronia com o código-fonte atual.

## Quando usar esta skill
- O usuário pede para "atualizar o README".
- O usuário diz "documentar as mudanças antes do commit".
- O usuário menciona "atualizar a documentação" do projeto.
- O usuário diz "o que devo documentar nessa mudança".
- **Fluxo natural acoplado:** Durante ou antes da execução da skill `git-commit-helper`. Ao perceber mudanças que alteram o comportamento ou dependências do código, priorize atualizar o README primeiro.

## Integração com `git-commit-helper`
As skills `readme-updater` e `git-commit-helper` foram feitas para trabalharem juntas. O fluxo ideal é:
1. Analisar as mudanças.
2. Atualizar o `README.md` (se houver impactos na documentação).
3. Agrupar todas as mudanças, *incluindo a atualização do README*, e gerar a mensagem de commit correspondente.
Ao terminar o trabalho da documentação (esta skill), ofereça-se para já pular diretamente para a geração da mensagem final de commit, passando a bola de volta para o *git-commit-helper* (ou apenas fazendo o commit incluindo o descritivo adequado).

## Passos para execução

1. **Ler o README atual:**
   - Use uma ferramenta de visualização (como `view_file`) para ler o conteúdo de `README.md`.
   - Analise o idioma (ex: se estiver em inglês, você deve escrever todas as atualizações em inglês), o tom, o estilo de formatação (uso de emojis, cabeçalhos, code blocks) e a estrutura atual (Instalação, Como usar, Configurações, etc).

2. **Rastrear as Alterações:**
   - Execute o comando `git status` via terminal para mapear arquivos não rastreados, modificados ou no *staging*.
   - Execute `git diff --staged` para analisar o *staged* atual ou `git diff HEAD` se o *staging* estiver vazio (sinalizando ao usuário).

3. **Filtrar Mudanças Relevantes (O que documentar x O que ignorar):**
   - **O que INCLUIR no README:**
     - Novas funcionalidades ou telas adicionadas.
     - Funcionalidades removidas ou descontinuadas (para remover da documentação também).
     - Mudanças em configurações, arquivos de ambiente (`.env`) ou novas bibliotecas e dependências de uso.
     - Novos scripts, comandos para CLI, novos atalhos ou endpoints de API criados.
     - Alterações no processo de Instalação, Build, Processos de Teste ou Execução.
     - *Breaking changes* consideráveis que influenciem fluxos de usuário na aplicação.
   - **O que IGNORAR:**
     - Refatoração interna de componentes ou serviços que não têm impacto visível na arquitetura ou exterior.
     - Correções simples de syntax, lint e bugs isolados.
     - Ajustes visuais ou repaginação de estilo (CSS/UI) simples.

4. **Elaborar e Propor Alterações:**
   - Monte a proposta do novo texto que será injetado e indique **exatamente em qual seção** do `README.md` ele entrará.
   - Se o README atual não contemplar uma seção propícia à alteração (por exemplo, "Scripts de Instalação"), sugira a criação de uma nova subseção para esse propósito, dentro do padrão visual do arquivo.
   - **Apresente ao usuário de forma estruturada as mudanças idealizadas** antes de invocar a ferramenta de edição de código.

5. **Aprovação do Usuário:**
   - Pergunte: *"Você deseja revisar, ajustar ou aprovar essas atualizações antes de eu salvar no README?"*
   - Aguarde o **Aval do Usuário**.

6. **Aplicar Alterações ("Edição Cirúrgica"):**
   - Use as ferramentas de `replace_file_content` ou `multi_replace_file_content` para localizar exatamente os trechos (StartLine / EndLine) e aplicar as modificações.
   - **NÃO** reescreva seções inteiras desnecessariamente. Modifique pontualmente os blocos que afetam o novo contexto.
   - Preserve **100% do conteúdo** e dos trechos e estruturas de marcação (Markdown) que não estiverem relacionados às mudanças.

7. **Resumo Final:**
   - Exiba um breve resumo das alterações feitas e incluídas com sucesso no `README.md`.
   - Lance o gatilho: *"A documentação foi atualizada! Pelo fluxo ideal, as modificações de software juntamente com esta atualização do README já estão prontas. Deseja que eu emende a skill `git-commit-helper` para preparar o texto do seu agrupamento na pipeline agora mesmo?"*
