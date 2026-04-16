# Centro Académico Clínico dos Açores (CACA) - Landing Page

Esta é a landing page institucional para o **Centro Académico Clínico dos Açores (CACA)**, desenvolvida como projeto prático para a unidade curricular de Tecnologias Web. A plataforma serve como um hub de informação sobre investigação, produção académica e eventos na área da saúde na Região Autónoma dos Açores.

## Descrição do Projeto
A aplicação é uma landing page dinâmica e responsiva que combina uma interface institucional com funcionalidades avançadas de gestão de dados no cliente e integrações externas.

**Principais Funcionalidades:**
* **Gestão de Eventos:** Sistema completo de CRUD (Criar, Ler, Atualizar, Eliminar) para eventos locais.
* **Visualização de Dados:** Gráfico de barras empilhadas interativo (D3.js) que apresenta a produção académica.
* **Experiência Visual:** Animação 3D de uma hélice de DNA (Three.js) e efeitos de transformação nos parceiros.
* **Interatividade:** Carrossel de notícias, sistema de "Saiba mais" expansível e meteorologia dinâmica.
* **Validações Robustas:** Formulários de contacto e newsletter com validação via Regex e feedback visual em tempo real.

---

## Configuração e Execução Local

Devido à utilização de **Módulos JavaScript (ES6)** e à integração com a **IndexedDB**, o navegador bloqueia o acesso direto ao ficheiro `index.html` (erro de CORS) se este for aberto apenas com um clique duplo. É necessário utilizar um servidor local.

### Passos para executar:
1.  Certifica-te de que tens o **Python** instalado no teu computador.
2.  Abre o terminal ou linha de comandos na pasta raiz do projeto.
3.  Executa o seguinte comando:
    ```bash
    python3 -m http.server 8000
    ```
4.  Abre o browser e acede a: `http://localhost:8000`

---

## Arquitetura de Dados (IndexedDB)

A aplicação utiliza a API **IndexedDB** para armazenamento persistente de dados no lado do cliente, permitindo que os eventos criados pelo utilizador sejam mantidos mesmo após fechar o navegador.

* **Base de Dados:** `CACA_DB` (versão 1).
* **Object Store:** `eventos`.
* **Chave Primária:** `id` (auto-incremento).
* **Índices:** Indexação pelo campo `data` para ordenação cronológica.
* **Estrutura do Objeto:**
    ```json
    {
      "id": Number,
      "titulo": String,
      "descricao": String,
      "data": DateString,
      "hora": String,
      "cidade": String,
      "local": String,
      "dataAtualizacao": ISOString
    }
    ```

---

## APIs Externas e Integração

A aplicação integra serviços externos para enriquecer a informação disponível na secção de eventos:

1.  **OpenWeatherMap API:** Obtém previsões meteorológicas em tempo real.
    * **Integração:** Ao visualizar um evento, o sistema consulta a previsão de 5 dias (intervalos de 3h) e apresenta o ícone e a temperatura correspondente à data e hora do evento.
2.  **Nominatim (OpenStreetMap):**
    * **Uso:** Geocodificação nominativa.
    * **Integração:** Converte o nome da cidade introduzido no formulário de eventos em coordenadas geográficas (latitude e longitude).
3.  **Leaflet.js:**
    * **Uso:** Renderização de mapas interativos.
    * **Integração:** Utiliza as coordenadas obtidas para desenhar um mapa dinâmico com um marcador no local exato do evento.

---

## Tecnologias Utilizadas
* **Frontend:** HTML5 Semântico, CSS3 (Grid e Flexbox), JavaScript (ES6).
* **Gráficos:** [D3.js](https://d3js.org/).
* **3D:** [Three.js](https://threejs.org/).
* **Mapas:** [Leaflet](https://leafletjs.com/).
* **Tipografia:** Poppins e Source Sans 3 (Google Fonts).

---

## Equipa (Grupo 12)
* Hugo Raposo
* Rafael Dias
* Rodrigo Pires
