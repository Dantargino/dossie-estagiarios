# Dossie — Regras de Negocio

> Base de conhecimento do projeto **Dossie**, um sistema web de gestao de dossies de estagiarios com analise por Inteligencia Artificial.

---

## 1. Visao Geral do Sistema

O **Dossie** e uma aplicacao web multi-pagina (HTML + CSS + JavaScript) que permite:

- Cadastrar, editar e excluir estagiarios
- Avaliar desempenho com sistema de estrelas (1-5) em multiplos criterios
- Registrar anotacoes e timeline de eventos
- Gerar analises automatizadas via IA (API Claude da Anthropic)
- Exportar dossies em multiplos formatos
- Visualizar dashboard com KPIs e metricas agregadas

### 1.1 Arquitetura de Arquivos

| Arquivo                        | Responsabilidade                                           |
| ------------------------------ | ---------------------------------------------------------- |
| `dashboard_principal.html`     | Dashboard com KPIs, metricas agregadas e visao geral       |
| `listagem_estagiarios.html`    | Lista, busca, filtros e CRUD de estagiarios                |
| `perfil_estagiario.html`       | Perfil individual com avaliacao, notas e timeline          |
| `analise_ia_exportacao.html`   | Analise por IA (7 tipos + custom) e exportacao de dossies  |
| `styles.css`                   | Estilos compartilhados, temas dark/light, responsividade   |
| `script.js`                    | Logica de negocio compartilhada, estado, persistencia      |
| `proxy.js`                     | Proxy local Node.js para chamadas a API Anthropic          |
| `package.json`                 | Dependencias do proxy (express, cors, dotenv)              |
| `.env`                         | Variavel `ANTHROPIC_API_KEY` (nao versionado)              |

> Todas as paginas HTML importam `styles.css` e `script.js` como arquivos externos compartilhados.

### 1.2 Persistencia de Dados

- **Armazenamento**: `localStorage` do navegador (chave: `dossie_interns`)
- **Formato**: Array JSON de objetos de estagiarios
- **Estagiario selecionado**: `localStorage` (chave: `dossie_current_id`)
- **Tema do usuario**: `localStorage` (chave: `dossie_theme`)
- **Cache de IA**: `sessionStorage` (chave: `dossie_ia_cache`) — limpo ao trocar de estagiario
- **Configuracoes**: `localStorage` (chave: `dossie_settings`) — endpoint da API, preferencias

### 1.3 Navegacao entre Paginas

| Origem                       | Destino                      | Mecanismo                                    |
| ---------------------------- | ---------------------------- | -------------------------------------------- |
| Dashboard                    | Listagem                     | Link no menu lateral ou card de acao         |
| Listagem                     | Perfil                       | Clique no estagiario (URL: `?id=int_xxx`)    |
| Perfil                       | Analise IA                   | Link/botao na secao de IA (URL: `?id=int_xxx`) |
| Analise IA                   | Perfil                       | Link de voltar ao perfil                     |
| Qualquer pagina              | Qualquer pagina              | Menu lateral de navegacao (sidebar)          |

- O ID do estagiario e passado entre paginas via **URL query parameter** (`?id=`)
- Ao navegar para Perfil ou Analise IA sem `?id`, redireciona para Listagem
- Cada pagina le o estado do `localStorage` no evento `DOMContentLoaded`

---

## 2. Gerenciamento de Estado

### 2.1 Estado da Aplicacao

O estado e gerenciado via `localStorage` e compartilhado entre todas as paginas:

| Chave localStorage     | Tipo     | Descricao                                  |
| ---------------------- | -------- | ------------------------------------------ |
| `dossie_interns`       | `array`  | Lista completa de estagiarios              |
| `dossie_current_id`    | `string` | ID do estagiario selecionado               |
| `dossie_theme`         | `string` | Tema atual (`dark` ou `light`)             |
| `dossie_settings`      | `object` | Configuracoes (endpoint API, etc.)         |

### 2.2 Fluxo de Dados

```
Acao do usuario
    → Atualiza dados em memoria
    → Chama saveData() (grava no localStorage)
    → Chama render() (atualiza o DOM da pagina atual)
```

- Cada pagina possui sua propria funcao `render()` que le do `localStorage`
- Nao ha framework de reatividade — a manipulacao do DOM e direta
- Funcoes utilitarias compartilhadas ficam em `script.js`

### 2.3 Funcoes Compartilhadas (script.js)

| Funcao                  | Responsabilidade                                     |
| ----------------------- | ---------------------------------------------------- |
| `loadInterns()`         | Le estagiarios do localStorage, inicia demo se vazio |
| `saveInterns(interns)`  | Grava array no localStorage                          |
| `getInternById(id)`     | Busca estagiario por ID                              |
| `addIntern(data)`       | Cria novo estagiario com ID e campos auto            |
| `updateIntern(id, data)`| Atualiza estagiario preservando avaliacoes/notas     |
| `deleteIntern(id)`      | Remove estagiario apos confirmacao                   |
| `calcScore(avaliacao)`  | Calcula score percentual                             |
| `buildContext(intern)`  | Monta contexto textual para prompt de IA             |
| `formatDate(date)`      | Formata data no padrao pt-BR                         |
| `getInitials(nome)`     | Retorna iniciais para avatar (ate 2 letras)          |
| `getAvatarColor(nome)`  | Retorna paleta de cor baseada em hash do nome        |

---

## 3. Entidade: Estagiario

### 3.1 Estrutura de Dados

Cada estagiario e representado por um objeto com os seguintes campos:

| Campo        | Tipo            | Obrigatorio | Descricao                                |
| ------------ | --------------- | :---------: | ---------------------------------------- |
| `id`         | `string`        |     Sim     | Identificador unico (`int_` + timestamp) |
| `nome`       | `string`        |     Sim     | Nome completo do estagiario              |
| `email`      | `string`        |     Nao     | Email de contato                         |
| `tel`        | `string`        |     Nao     | Telefone de contato                      |
| `univ`       | `string`        |     Nao     | Universidade                             |
| `curso`      | `string`        |     Nao     | Curso universitario                      |
| `area`       | `string`        |     Nao     | Area/departamento do estagio             |
| `supervisor` | `string`        |     Nao     | Nome do supervisor responsavel           |
| `inicio`     | `string` (date) |     Nao     | Data de inicio do estagio                |
| `fim`        | `string` (date) |     Nao     | Data de termino previsto                 |
| `status`     | `string` (enum) |     Nao     | Status do estagio                        |
| `carga`      | `string`        |     Nao     | Carga horaria (ex: `30h/semana`)         |
| `skills`     | `string`        |     Nao     | Habilidades e competencias (texto livre) |
| `projetos`   | `string`        |     Nao     | Projetos e responsabilidades             |
| `obs`        | `string`        |     Nao     | Observacoes iniciais                     |
| `avaliacao`  | `object`        |    Auto     | Avaliacoes por criterio (0-5)            |
| `notas`      | `array`         |    Auto     | Anotacoes do supervisor                  |
| `timeline`   | `array`         |    Auto     | Historico de eventos                     |

### 3.2 Status do Estagiario

O campo `status` aceita os seguintes valores, cada um com indicador visual proprio:

| Status        |    Cor do Indicador    | CSS Class           |
| ------------- | :--------------------: | ------------------- |
| **Ativo**     |  Verde (`--accent3`)   | `.status-ativo`     |
| **Pendente**  |  Dourado (`--gold`)    | `.status-pendente`  |
| **Encerrado** |  Cinza (`--muted`)     | `.status-encerrado` |

> **Regra**: Se o status nao for informado, e tratado como `Pendente` por padrao.

### 3.3 Geracao de ID

- Formato: `int_` + `Date.now()` (timestamp em milissegundos)
- Gerado automaticamente no momento do cadastro
- IDs de dados demo seguem o padrao `int_demo_0`, `int_demo_1`, `int_demo_2`

---

## 4. Regras de Cadastro (CRUD)

### 4.1 Criar Estagiario

- **Campo obrigatorio**: apenas `nome` (validacao visual no formulario, campo destacado em vermelho se vazio)
- Todos os demais campos sao opcionais
- Ao criar, sao inicializados automaticamente:
  - `id`: gerado via timestamp
  - `avaliacao`: objeto vazio `{}`
  - `notas`: array vazio `[]`
  - `timeline`: array com primeiro evento "Dossie criado"
- Apos salvar, o estagiario e adicionado a lista e redireciona para o perfil

### 4.2 Editar Estagiario

- O modal de edicao e reutilizado (mesmo do cadastro), com titulo alterado para "Editar Estagiario"
- A edicao preserva dados existentes (`avaliacao`, `notas`, `timeline`) via spread operator
- Registra evento "Dossie atualizado" na timeline

### 4.3 Excluir Estagiario

- Exige confirmacao do usuario via `confirm()`
- Remove o estagiario do array e do `localStorage`
- Redireciona para a listagem

---

## 5. Sistema de Modais

### 5.1 Modal de Criar/Editar Estagiario

- Presente em `listagem_estagiarios.html` e `perfil_estagiario.html`
- Reutilizado para criacao e edicao (titulo muda dinamicamente)
- Campos do formulario mapeiam diretamente para a entidade Estagiario (Secao 3.1)
- Validacao: campo `nome` obrigatorio com feedback visual (borda vermelha + mensagem)

### 5.2 Modal de Configuracoes

- Acessivel via icone de engrenagem no header
- Permite configurar:
  - Endpoint da API (padrao: `http://localhost:3001/api/messages`)
  - Toggle de tema (atalho para o botao do header)
- Configuracoes salvas em `localStorage` (chave: `dossie_settings`)

### 5.3 Comportamento dos Modais

- Abrir: via evento de clique no botao correspondente
- Fechar: clique no botao X, clique no overlay (fundo escurecido), ou tecla `Escape`
- Ao abrir, o foco e movido para o primeiro campo do formulario
- Scroll da pagina e bloqueado enquanto o modal esta aberto

---

## 6. Sistema de Avaliacao

### 6.1 Criterios de Avaliacao

O sistema avalia estagiarios em **6 criterios** fixos:

| Criterio     |   Chave (`key`)   | Descricao                             |
| ------------ | :---------------: | ------------------------------------- |
| Pontualidade |  `pontualidade`   | Cumprimento de horarios e prazos      |
| Comunicacao  |   `comunicacao`   | Habilidade de comunicacao             |
| Proatividade |  `proatividade`   | Iniciativa e autonomia                |
| Tecnico      |     `tecnico`     | Competencia tecnica na area           |
| Equipe       | `trabalho_equipe` | Capacidade de trabalho em equipe      |
| Aprendizado  |   `aprendizado`   | Velocidade e qualidade de aprendizado |

### 6.2 Sistema de Estrelas

- Escala de **1 a 5** estrelas por criterio
- Interacao: clique na estrela desejada para atribuir a nota
- Efeito hover: ao passar o mouse, as estrelas ate a posicao atual ficam preenchidas visualmente
- Valor `0` = nao avaliado (padrao)
- Cada alteracao de avaliacao registra um evento na timeline
- Localizado em `perfil_estagiario.html`

### 6.3 Calculo do Score Geral

```
Score (%) = (soma de todas as avaliacoes) / (numero de criterios x 5) x 100
```

- **6 criterios x 5 pontos maximo = 30 pontos possiveis**
- Resultado arredondado para inteiro (`Math.round`)

**Faixas visuais do score:**

| Faixa     | Cor                         | Indicador |
| --------- | --------------------------- | :-------: |
| >= 80%    | Verde (`--accent3`)         |   Verde   |
| 60% - 79% | Dourado (`--gold`)          |  Dourado  |
| < 60%     | Rosa/Vermelho (`--accent2`) |  Vermelho |

### 6.4 Barras de Habilidade (Skill Bars)

Cada criterio e exibido como uma barra de progresso com cores distintas em ciclo:

| Posicao | Cor                      |
| :-----: | ------------------------ |
|    1    | `var(--accent)` — Azul   |
|    2    | `var(--accent2)` — Rosa  |
|    3    | `var(--accent3)` — Verde |
|    4    | `var(--gold)` — Dourado  |
|    5    | `#c26cff` — Roxo         |
|    6    | `#ff9f6c` — Laranja      |

---

## 7. Anotacoes

### 7.1 Estrutura

Cada anotacao contem:

| Campo  | Tipo     | Descricao                                                 |
| ------ | -------- | --------------------------------------------------------- |
| `text` | `string` | Conteudo da anotacao                                      |
| `date` | `string` | Data/hora no formato `pt-BR` (ex: `20/02/2026, 15:30:00`) |

### 7.2 Regras

- Texto vazio e ignorado (nao cria anotacao)
- Pode ser adicionada via botao + ou tecla Enter
- Cada nova anotacao gera evento "Anotacao adicionada" na timeline
- Anotacoes sao exibidas na ordem em que foram criadas (cronologica)
- Persistidas automaticamente no `localStorage`
- Localizado em `perfil_estagiario.html`

---

## 8. Timeline / Historico

### 8.1 Estrutura

Cada evento contem:

| Campo  | Tipo     | Descricao                    |
| ------ | -------- | ---------------------------- |
| `text` | `string` | Descricao do evento          |
| `date` | `string` | Data/hora no formato `pt-BR` |

### 8.2 Eventos Registrados Automaticamente

| Acao               | Texto do Evento                         |
| ------------------ | --------------------------------------- |
| Cadastro           | `Dossie criado`                         |
| Edicao             | `Dossie atualizado`                     |
| Avaliacao alterada | `Avaliacao de {Criterio}: {valor}/5`    |
| Nova anotacao      | `Anotacao adicionada`                   |
| Analise IA gerada  | `Analise de IA gerada: {tipo}`          |

### 8.3 Exibicao

- Eventos sao exibidos em **ordem cronologica reversa** (mais recente primeiro)
- Estilo visual de timeline com marcadores circulares
- Localizado em `perfil_estagiario.html`

---

## 9. Inteligencia Artificial (IA)

### 9.1 Arquitetura: Proxy Local

As chamadas a API Anthropic **nao podem ser feitas diretamente do navegador** devido a restricoes de CORS. O sistema utiliza um proxy local em Node.js.

**Arquivo `proxy.js`:**

| Configuracao     | Valor                                                   |
| ---------------- | ------------------------------------------------------- |
| **Runtime**      | Node.js com Express                                     |
| **Porta**        | `3001` (padrao)                                         |
| **Rota**         | `POST /api/messages`                                    |
| **Destino**      | `https://api.anthropic.com/v1/messages`                 |
| **API Key**      | Variavel de ambiente `ANTHROPIC_API_KEY` (via `.env`)   |
| **CORS**         | Habilitado para `localhost` via pacote `cors`            |

**Headers enviados pelo proxy:**

```
x-api-key: {ANTHROPIC_API_KEY}
anthropic-version: 2023-06-01
content-type: application/json
```

**Para executar o proxy:**
```bash
npm install
node proxy.js
```

### 9.2 Configuracao do Modelo

| Configuracao   | Valor                          |
| -------------- | ------------------------------ |
| **Modelo**     | `claude-sonnet-4-20250514`     |
| **Max Tokens** | `1000`                         |
| **Endpoint**   | `http://localhost:3001/api/messages` (configuravel) |

- O modelo e definido como constante no `script.js`: `const AI_MODEL = 'claude-sonnet-4-20250514'`
- O endpoint e configuravel via Modal de Configuracoes e salvo em `localStorage`

### 9.3 Tipos de Analise (Abas)

O sistema possui **7 tipos de analise** pre-configurados, localizados em `analise_ia_exportacao.html`:

| Aba                         |      Chave      | Prompt (resumo)                                                        |
| --------------------------- | :-------------: | ---------------------------------------------------------------------- |
| Resumo Executivo            |    `resumo`     | Resumo profissional com 3-4 paragrafos sobre desempenho e perspectivas |
| Pontos Fortes               | `pontos_fortes` | Lista de pontos fortes com exemplos praticos (bullet points)           |
| Areas de Melhoria           |   `melhorias`   | Areas de melhoria construtivas com acoes de desenvolvimento            |
| Plano de Desenvolvimento    |     `plano`     | PDI estruturado para 3 meses com metas SMART e recursos                |
| Carta de Recomendacao       |     `carta`     | Carta profissional formal para empregadores futuros                    |
| Potencial de Retencao       |   `retencao`    | Analise de retencao com score 0-10 e perfil de cargo ideal             |
| Script de Feedback          |   `feedback`    | Script de reuniao de avaliacao (modelo SBI/STAR)                       |

### 9.4 Contexto Enviado a IA

Cada prompt inclui um contexto completo do estagiario (`buildContext`):

- Nome, area, curso, universidade
- Supervisor, status, datas (inicio/termino), carga horaria
- Skills e projetos
- Observacoes
- Score geral (%) e avaliacoes detalhadas por criterio
- Anotacoes do supervisor

### 9.5 Prompt Personalizado

- O usuario pode digitar perguntas livres sobre o estagiario
- O prompt e automaticamente enriquecido com o contexto completo dos dados
- O prefixo fixo e: _"Sobre o estagiario abaixo, responda em portugues:"_

### 9.6 Cache de Resultados

- Resultados ficam armazenados em `sessionStorage` (chave: `dossie_ia_cache`)
- Cache e **limpo ao trocar de estagiario**
- Cache e indexado por tipo de analise (chave da aba)
- Resultados cacheados sao exibidos instantaneamente ao alternar entre abas

### 9.7 Efeito de Digitacao (Typing)

- Respostas da IA sao exibidas com efeito de digitacao caractere a caractere
- Velocidade adaptativa: `Math.max(5, Math.min(20, Math.round(3000 / text.length)))`
  - Textos longos -> digitacao mais rapida
  - Textos curtos -> digitacao mais lenta
- Cursor piscante (`.typing-cursor`) exibido durante a animacao

---

## 10. Exportacao

### 10.1 Formatos Disponiveis

Localizado em `analise_ia_exportacao.html`:

| Formato          | Funcao               | Conteudo                                              |
| ---------------- | -------------------- | ----------------------------------------------------- |
| **Texto (.txt)** | `exportTxt()`        | Relatorio formatado em texto puro com todas as secoes |
| **JSON**         | `exportJson()`       | Dados brutos do estagiario (estrutura completa)       |
| **HTML**         | `exportHtmlReport()` | Relatorio visual estilizado com tabelas e formatacao  |

### 10.2 Regras de Exportacao

- **Pre-requisito**: Um estagiario deve estar selecionado (valida `currentId` via URL param)
- O download e realizado via criacao de `Blob` + `URL.createObjectURL`
- Nome do arquivo: `dossie_{nome_com_underscores}.{extensao}`
- O relatorio **inclui a ultima analise IA** visivel no painel de saida
- A exportacao HTML gera um documento independente (self-contained) com CSS inline

### 10.3 Conteudo do Relatorio TXT

1. Cabecalho com dados cadastrais
2. Score geral (%)
3. Avaliacoes por criterio (estrelas visuais)
4. Skills e projetos
5. Observacoes
6. Anotacoes com data/hora
7. Analise IA mais recente

---

## 11. Interface e Layout

### 11.1 Estrutura Multi-Pagina

Todas as paginas compartilham um layout base com header sticky e sidebar de navegacao:

```
+------------------ Header (sticky) -------------------+
|  Dossie    [Nav Links]    [Tema] [Config] [+ Novo]   |
+----------+-------------------------------------------+
| Sidebar  |          Conteudo da Pagina                |
|  Menu    |  (varia por pagina — ver abaixo)           |
|  Nav     |                                            |
+----------+-------------------------------------------+
```

**Dashboard (`dashboard_principal.html`):**
- Cards de KPI: total de estagiarios, media de performance, avaliacoes pendentes
- Cards de destaque: top 3 estagiarios por score
- Visao geral por departamento/area

**Listagem (`listagem_estagiarios.html`):**
- Campo de busca com filtros
- Tabela/grid de estagiarios com avatar, nome, area, status, score
- Botoes de acao: ver perfil, editar, excluir
- Botao "+ Novo Estagiario" que abre modal de cadastro

**Perfil (`perfil_estagiario.html`):**
- Header com avatar, nome, status, dados do estagiario
- Grid de cards (2 colunas):
  - Dados cadastrais
  - Avaliacao por estrelas (6 criterios)
  - Score geral com skill bars
  - Anotacoes do supervisor
- Timeline (largura total)
- Link para analise IA

**Analise IA (`analise_ia_exportacao.html`):**
- 7 abas de tipos de analise + campo de prompt personalizado
- Area de saida com efeito de digitacao
- Botoes de exportacao (TXT, JSON, HTML)
- Indicador de loading durante chamada a API

### 11.2 Sistema de Temas

O sistema suporta **dois temas** alternados via toggle no header:

**Tema Dark (padrao):**

| Variavel CSS |    Cor    | Uso                        |
| :----------: | :-------: | -------------------------- |
|    `--bg`    | `#0d0f14` | Fundo principal            |
| `--surface`  | `#13161e` | Header, sidebar            |
|   `--card`   | `#181c26` | Cards de conteudo          |
|  `--border`  | `#252a38` | Bordas                     |
|  `--accent`  | `#6c7cff` | Acoes primarias (azul)     |
| `--accent2`  | `#ff6c8a` | Destaque secundario (rosa) |
| `--accent3`  | `#6cffcc` | Sucesso/ativo (verde)      |
|   `--text`   | `#e8eaf0` | Texto principal            |
|  `--muted`   | `#7a8099` | Texto secundario           |
|   `--gold`   | `#f5c842` | Status pendente            |

**Tema Light:**

| Variavel CSS |    Cor    | Uso                        |
| :----------: | :-------: | -------------------------- |
|    `--bg`    | `#F1F5F9` | Fundo principal            |
| `--surface`  | `#FFFFFF` | Header, sidebar            |
|   `--card`   | `#FFFFFF` | Cards de conteudo          |
|  `--border`  | `#E2E8F0` | Bordas                     |
|  `--accent`  | `#6366F1` | Acoes primarias (indigo)   |
| `--accent2`  | `#EF4444` | Destaque secundario (red)  |
| `--accent3`  | `#22C55E` | Sucesso/ativo (verde)      |
|   `--text`   | `#1E293B` | Texto principal            |
|  `--muted`   | `#64748B` | Texto secundario           |
|   `--gold`   | `#F59E0B` | Status pendente            |

**Implementacao:**
- Atributo `data-theme="dark"` ou `data-theme="light"` no elemento `<html>`
- Todas as cores sao referenciadas via `var(--nome)` no CSS
- Toggle via botao no header (icone sol/lua)
- Preferencia salva em `localStorage` (chave: `dossie_theme`)
- Padrao: `dark` (se nenhuma preferencia salva)

### 11.3 Responsividade

No breakpoint `768px`:

- Sidebar e oculta (acessivel via botao hamburger)
- Grids de conteudo passam para 1 coluna
- Header fica compacto
- Grid de avaliacao passa para 2 colunas
- Opcoes de exportacao passam para 2 colunas

### 11.4 Avatares

- Gerados automaticamente a partir das **iniciais do nome** (ate 2 letras)
- Cor determinada por hash simples: soma dos char codes do nome, modulo do numero de paletas
- **6 paletas de cores** (foreground + background):
  - Azul, Rosa, Verde, Dourado, Roxo, Laranja

---

## 12. Tratamento de Erros

### 12.1 Erros de API / IA

- Se o proxy estiver offline: exibir mensagem "Proxy nao encontrado. Execute `node proxy.js` para iniciar."
- Se a API retornar erro de autenticacao: exibir "API key invalida. Verifique o arquivo .env"
- Se a API retornar erro generico: exibir mensagem de erro com botao "Tentar novamente"
- Timeout de 30 segundos para chamadas a API

### 12.2 Erros de Dados

- `localStorage` cheio: alertar usuario com sugestao de exportar e limpar dados
- Dados corrompidos: tentar parse, se falhar, oferecer opcao de resetar para dados demo

### 12.3 Empty States

Cada pagina possui um estado vazio dedicado:

| Pagina    | Condicao                  | Mensagem/Acao                                      |
| --------- | ------------------------- | -------------------------------------------------- |
| Dashboard | Sem estagiarios           | "Nenhum estagiario cadastrado. Comece adicionando!" |
| Listagem  | Lista vazia               | "Nenhum estagiario encontrado." + botao criar       |
| Listagem  | Busca sem resultados      | "Nenhum estagiario corresponde a busca."            |
| Perfil    | Sem avaliacoes            | Estrelas vazias com texto "Clique para avaliar"     |
| Perfil    | Sem anotacoes             | "Nenhuma anotacao ainda. Adicione a primeira!"      |
| Analise   | Sem analise gerada        | "Selecione um tipo de analise e clique em Gerar"    |

---

## 13. Dados de Demonstracao

Na **primeira visita** (quando `localStorage` esta vazio), o sistema carrega 3 estagiarios demo:

| Nome              | Area                 | Universidade |  Status   |
| ----------------- | -------------------- | :----------: | :-------: |
| Ana Beatriz Silva | Marketing            |     USP      |   Ativo   |
| Bruno Lima Costa  | TI / Desenvolvimento |   UNICAMP    |   Ativo   |
| Carla Mendes      | Recursos Humanos     |    PUC-SP    | Encerrado |

Cada demo inclui:
- Avaliacoes pre-preenchidas em todos os 6 criterios
- 2-3 anotacoes com datas diferentes
- 3-4 eventos na timeline (criacao, avaliacoes, anotacoes)
- Dados cadastrais completos (email, universidade, curso, supervisor, datas, carga horaria)

O primeiro estagiario da lista (`int_demo_0`) e selecionado automaticamente ao acessar a Listagem.

---

## 14. Busca e Filtros

### 14.1 Campo de Busca

- Localizado na pagina de Listagem (`listagem_estagiarios.html`), acima da tabela/grid
- Filtra em **tempo real** (evento `oninput`)
- Busca por correspondencia parcial (case-insensitive) nos campos:
  - `nome` do estagiario
  - `area` do estagio
- Exibe mensagem "Nenhum estagiario encontrado" quando nao ha resultados

### 14.2 Filtros Adicionais (Listagem)

- Filtro por **status**: Todos, Ativo, Pendente, Encerrado
- Filtro por **area/departamento**: dropdown com valores unicos extraidos dos dados
- Filtros combinam com a busca por texto

---

## 15. Limitacoes Conhecidas e Melhorias Futuras

### Limitacoes Atuais

|  #  | Limitacao                                  | Impacto                                                       |
| :-: | ------------------------------------------ | ------------------------------------------------------------- |
|  1  | Proxy Node.js necessario para IA           | Requer Node.js instalado e proxy rodando localmente           |
|  2  | Dados apenas em `localStorage`             | Perda de dados ao limpar cache do navegador                   |
|  3  | Sem autenticacao/login                     | Qualquer pessoa com acesso ao navegador pode ver/editar dados |
|  4  | Sem validacao avancada de campos           | Email, telefone e datas nao sao validados por formato         |
|  5  | Exportacao nao inclui todas as analises IA | Apenas a analise visivel no momento e exportada               |
|  6  | Sem paginacao na lista de estagiarios      | Pode ter problemas de performance com muitos registros        |
|  7  | Navegacao multi-pagina recarrega a pagina  | Sem transicoes suaves entre telas (nao e SPA)                 |

### Sugestoes de Melhorias

|  #  | Melhoria                                                         | Prioridade |
| :-: | ---------------------------------------------------------------- | :--------: |
|  1  | Implementar backend com banco de dados (ex: PostgreSQL, MongoDB) |  Alta      |
|  2  | Adicionar autenticacao e controle de acesso por perfil           |  Alta      |
|  3  | Deploy do proxy em cloud (Vercel/Railway) para uso remoto        |  Alta      |
|  4  | Validacao de formularios (email, telefone, datas)                |  Media     |
|  5  | Exportacao em PDF com formatacao completa                        |  Media     |
|  6  | Migrar para SPA com framework (React/Vue) para melhor UX        |  Media     |
|  7  | Notificacoes para datas de termino proximas                      |  Baixa     |
|  8  | Import/export em lote de multiplos estagiarios                   |  Baixa     |

---

## 16. Roadmap de Implementacao

Ordem sugerida para implementacao:

| Fase | Descricao                     | Arquivos Principais                             | Dependencias |
| :--: | ----------------------------- | ----------------------------------------------- | ------------ |
|  1   | CSS compartilhado e temas     | `styles.css`                                    | Nenhuma      |
|  2   | JS compartilhado e dados      | `script.js`                                     | Fase 1       |
|  3   | Proxy Node.js                 | `proxy.js`, `package.json`, `.env`              | Nenhuma      |
|  4   | Listagem funcional            | `listagem_estagiarios.html`                     | Fases 1-2    |
|  5   | Perfil funcional              | `perfil_estagiario.html`                        | Fases 1-2    |
|  6   | Analise IA e Exportacao       | `analise_ia_exportacao.html`                    | Fases 1-3    |
|  7   | Dashboard                     | `dashboard_principal.html`                      | Fases 1-2    |
|  8   | Responsividade e polish       | `styles.css`, todas as paginas                  | Fases 1-7    |

**Detalhamento por fase:**

1. **CSS compartilhado**: custom properties para ambos os temas, componentes base (botoes, cards, modais, inputs, tabelas, badges, skill bars, timeline)
2. **JS compartilhado**: CRUD, localStorage, utilitarios, dados demo, funcoes de formatacao, gerenciamento de tema
3. **Proxy**: Express server com rota de proxy, CORS, dotenv para API key
4. **Listagem**: busca em tempo real, filtros por status/area, modal de criar/editar, exclusao com confirmacao, navegacao para perfil
5. **Perfil**: exibicao de dados, avaliacao por estrelas interativa, score com skill bars, anotacoes com Enter, timeline com eventos
6. **Analise IA**: 7 abas de analise, prompt customizado, cache em sessionStorage, efeito de digitacao, exportacao TXT/JSON/HTML
7. **Dashboard**: KPIs agregados (total, media, pendentes), cards de destaque, visao por area
8. **Polish**: breakpoint 768px, menu hamburger, transicoes, hover effects, testes cross-browser

---

> **Ultima atualizacao**: 18/03/2026
