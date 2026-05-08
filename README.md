# Busca de Artistas Musicais

## Descrição

Este projeto é uma aplicação web simples desenvolvida para a disciplina de Desenvolvimento Web. Utiliza a API pública TheAudioDB para exibir uma lista de artistas musicais populares ao carregar a página. Ao clicar em "Ver detalhes" em um artista, um modal é exibido mostrando o nome e o gênero musical do artista.

## Tecnologias Usadas

- **HTML5**: Estrutura semântica das páginas.
- **CSS3**: Estilização personalizada, incluindo efeitos hover e responsividade.
- **Bootstrap 5**: Framework CSS para layout responsivo, componentes como cards, botões e formulários.
- **JavaScript Puro**: Lógica de interação, consumo da API usando Fetch API, manipulação do DOM, async/await para operações assíncronas e tratamento de JSON.
- **Fetch API**: Para fazer requisições HTTP à API.
- **Async/Await**: Para lidar com operações assíncronas de forma limpa.
- **JSON**: Manipulação de dados retornados pela API.

Não foram utilizados frameworks JavaScript como React, Vue ou Angular, nem bibliotecas como jQuery.

## Funcionalidades

### Página Principal (index.html)
- Carregamento automático de artistas populares ao abrir a página (Pitty, Evanescence, Charlie Brown Jr., Legião Urbana, Skank).
- Exibição de artistas em cards responsivos usando Bootstrap Grid.
- Cada card contém:
  - Imagem do artista (ou placeholder se não disponível).
  - Nome do artista.
  - País de origem.
  - Gênero musical.
  - Botão "Ver detalhes" que abre um modal com nome e gênero.
- Loading spinner durante o carregamento.
- Tratamento de erros: exibe mensagem se nenhum artista for encontrado ou se houver erro na requisição.
- Design moderno com cores escuras relacionadas à música, sombras e efeitos hover.

## Como Executar

1. Baixe ou clone o repositório do projeto.
2. Adicione as imagens placeholder na pasta `images/` (placeholder.jpg) - você pode usar imagens genéricas de música ou baixar de sites como Unsplash.
3. Abra o arquivo `index.html` em um navegador web moderno (Chrome, Firefox, Edge, etc.).
4. A página carregará automaticamente uma lista de artistas populares (Pitty, Evanescence, Charlie Brown Jr., Legião Urbana, Skank).
5. Clique em "Ver detalhes" em qualquer artista para ver um modal com nome e gênero.

**Nota**: Como a aplicação consome uma API externa, é necessário conexão com a internet para funcionar corretamente.

## Estrutura de Pastas

```
av1-dwb-luiza-viginotti-2bimestre/
├── index.html                 # Página principal com lista de artistas
├── detalhes.html              # (Não utilizado - página antiga)
├── README.md                  # Este arquivo
├── css/
│   └── style.css              # Estilos personalizados
├── js/
│   ├── script.js              # Lógica da página principal
│   └── detalhes.js            # (Não utilizado - lógica antiga)
└── images/
    └── placeholder.jpg        # Imagem placeholder para artistas sem foto
```

## Prints (Exemplos)

### Página Principal
![Página Principal](https://via.placeholder.com/800x600?text=Página+Principal+-+Lista+de+Artistas)

*Exemplo: Tela com lista de artistas carregados automaticamente, em cards.*

### Modal de Detalhes
![Modal de Detalhes](https://via.placeholder.com/800x600?text=Modal+de+Detalhes+-+Nome+e+Gênero)

*Exemplo: Modal exibindo nome e gênero do artista selecionado.*

## Link da API

- **TheAudioDB API**: [https://www.theaudiodb.com/api_guide.php](https://www.theaudiodb.com/api_guide.php)
- Endpoint de busca: `https://www.theaudiodb.com/api/v1/json/2/search.php?s={nome_do_artista}`
- Endpoint de detalhes: `https://www.theaudiodb.com/api/v1/json/2/artist.php?i={id_do_artista}`

## Autor

Luiza Viginotti

## Observações

- O projeto foi desenvolvido de forma acadêmica, com código organizado, comentado e seguindo boas práticas.
- Todas as funcionalidades foram implementadas usando apenas as tecnologias obrigatórias.
- O design é responsivo e moderno, adequado para dispositivos móveis e desktop.
- Tratamento completo de erros e estados de loading para melhor experiência do usuário.