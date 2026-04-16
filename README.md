# Centro Académico Clínico dos Açores (CACA) – Website Institucional

## Descrição do Projeto

Este projeto consiste no desenvolvimento de um website institucional para o **Centro Académico Clínico dos Açores (CACA)**, uma unidade de cooperação entre instituições de ensino superior, unidades de saúde e centros de investigação da Região Autónoma dos Açores.

O site tem como objetivo divulgar a atividade do CACA, incluindo áreas de investigação (Epidemiologia, Telemedicina, Saúde Mental), notícias, eventos, parceiros, oportunidades de recrutamento e um formulário de contacto. Inclui ainda funcionalidades interativas como:

- **Carrossel de notícias** com navegação por setas, indicadores, teclado e toque (mobile).
- **Gestão de eventos** (CRUD completo) com persistência local em IndexedDB.
- **Previsão meteorológica** para cada evento, obtida da OpenWeatherMap.
- **Mapa interativo** (Leaflet) com localização da cidade do evento via geocoding (Nominatim).
- **Gráfico de produção académica** (D3.js) com dados empilhados.
- **Animação 3D de uma molécula de ADN** (Three.js) na secção da newsletter.
- **Validação de formulários** (newsletter e contactos) com feedback visual.
- **Design responsivo** e acessível (teclado, leitores de ecrã).

## Tecnologias Utilizadas

- HTML5, CSS3, JavaScript (ES6+)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) – armazenamento local
- [Leaflet](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/) – mapas
- [OpenWeatherMap API](https://openweathermap.org/forecast5) – previsão meteorológica
- [Nominatim (OSM)](https://nominatim.org/) – geocodificação
- [Three.js](https://threejs.org/) – modelo 3D do ADN
- [D3.js](https://d3js.org/) – gráfico de barras empilhadas

## Configuração e Execução Local

### Pré‑requisitos

- Navegador moderno (Chrome, Firefox, Edge) com suporte a ES6, IndexedDB e WebGL.
- Servidor web local (por exemplo, [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) para VS Code, ou `python -m http.server`).