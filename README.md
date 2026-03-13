Centro Académico Clínico dos Açores (CACA) - Landing Page
Grupo 5: Daniela Gabriel | Newton Pereira | Rodrigo Pires
Descrição
Landing page institucional para o Centro Académico Clínico dos Açores, com informação sobre notícias, áreas de investigação (com texto expansível), instituições parceiras, oportunidades, contactos e visualização de dados da produção académica.
Funcionalidades JavaScript
- Newsletter: Validação de email (regex) e seleção de país obrigatórios com feedback visual (bordas verdes/vermelhas), com mensagens de erro/sucesso em formato toast
- Contactos: Validação de nome, email (regex), assunto e mensagem obrigatórios com feedback visual (bordas vermelhas) e mensagens de erro abaixo de cada campo, com mensagem de confirmação em formato alert
Animações e Efeitos
- DNA 3D (Three.js): Animação contextual que representa inovação na área da saúde, posicionada no formulário da newsletter
- Efeitos hover nos parceiros: Transformação 3D com brilho e revelação do nome da instituição
- Expansão de conteúdo: Funcionalidade "Saiba mais" nas áreas de investigação para mostrar texto adicional
Visualização de Dados
- Gráfico D3.js: Gráfico de barras empilhadas mostrando a produção académica (projetos, estágios, mestrados/doutoramentos, publicações) com valores numéricos nas barras
Eventos DOM
- Submissão de formulários
- Scroll (botão "voltar ao topo")
- Click (botão topo, indicadores do carrossel, "Saiba mais")
- Hover e focus (parceiros - acessibilidade)
- Touch (swipe no carrossel para mobile)
- Teclado (setas no carrossel quando visível)
Validações
- Email: regex para formato válido (com @ e domínio)
- Campos obrigatórios com destaque visual (bordas vermelhas)
- Toast notifications para mensagens de sucesso/erro
- Feedback visual em tempo real
Design
- Cores: Branco e azul claro para contraste e legibilidade, verde para elementos de ação
- Tipografia: Poppins (títulos) e Source Sans 3 (corpo) para melhor legibilidade
- Responsividade: Adaptado para computador, tablet e telemóvel com media queries
- Header sticky: Navegação sempre acessível
- Acessibilidade: Atributos ARIA, suporte para teclado e focus visível
Tecnologias
- HTML5 semântico
- CSS3 (Grid, Flexbox, Media Queries)
- JavaScript (ES6+)
- Three.js (animação 3D)
- D3.js (visualização de dados)
- Google Fonts (Poppins e Source Sans 3)
Como testar
1. Abrir index.html no browser
2. Navegar pelas secções via menu
3. Testar formulários (email inválido, campos vazios)
4. Usar setas do teclado ou swipe no carrossel
5. Passar rato ou dar focus nos parceiros para ver efeito 3D
6. Scroll para ver botão "voltar ao topo" após 300px
7. Clicar em "Saiba mais" nas áreas de investigação para ver texto expandido
8. Verificar gráfico D3.js com dados da produção académica
9. Testar responsividade reduzindo a largura do ecrã
10. Clicar no menu hamburger em mobile e verificar que fecha após clique
