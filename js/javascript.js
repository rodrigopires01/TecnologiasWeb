document.addEventListener('DOMContentLoaded', function () {
    fecharMenuHamburger();
    validarNewsletter();
    listaPaises();
    validarFormulario();
    botaoTopo();
    carrosselNoticias();
    hoverParceiros();
    initDNA3D();
    criarGraficoProducao();
    expandirInvestigacao(); 
});

function fecharMenuHamburger() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.checked = false;
        });
    });
}


function validarNewsletter() {
const submitBtn = document.querySelector('.newsletter-formulario .enviar_newsletter');
    const emailInput = document.querySelector('.email_newsletter');
    const paisSelect = document.querySelector('.pais_selector');

    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();
        
        const email = emailInput.value.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        const selectedCountry = paisSelect.value;
        
        // Resetar estilos para ficar branco
        emailInput.style.border = '1px solid #ddd';
        emailInput.style.backgroundColor = 'white';
        paisSelect.style.border = '1px solid #ddd';
        paisSelect.style.backgroundColor = 'white';
        
        const errors = [];
        
        // Validar email
        if (email === '') {
            errors.push('Por favor insira um e-mail!');
            emailInput.style.border = '1px solid #dc3545';
            emailInput.style.backgroundColor = '#fff8f8';
        } else if (!emailRegex.test(email)) {
            errors.push('E-mail inválido!');
            emailInput.style.border = '1px solid #dc3545';
            emailInput.style.backgroundColor = '#fff8f8';
        }
        
        // Validar pais
        if (selectedCountry === 'default' || selectedCountry === 'Selecione o seu pais.') {
            errors.push('Por favor escolha um país!');
            paisSelect.style.border = '1px solid #dc3545';
            paisSelect.style.backgroundColor = '#fff8f8';
        }
        
        // Mostrar erros
        if (errors.length > 0) {
            // Se for 1, mostra no toast apenas 1 erro
            if (errors.length === 1) {
                mostrarToast(errors[0], 'error');
            } else {
                // Se for mais q 1 erro, junta as mensagens de erros, com breakline a separa-las
                const combinedMessage = errors.join('<br>');
                mostrarToast(combinedMessage, 'error');
            }
        } else {
            // Se tiver tudo preenchido / correto, mostra toast de sucesso
            mostrarToast('Subscrito com sucesso!', 'success');
            emailInput.style.border = '1px solid #0f9d58';
            emailInput.style.backgroundColor = '#f8fff8';
            paisSelect.style.border = '1px solid #0f9d58';
            paisSelect.style.backgroundColor = '#f8fff8';
            
            emailInput.value = '';
            paisSelect.value = 'default';
        }
    });
}

// Função que cria um toast
function mostrarToast(mensagem, tipo) {
    // Remover toasts existentes
    const toastsExistentes = document.querySelectorAll('.toast');
    toastsExistentes.forEach(toast => toast.remove());

    // Criar novo toast
    const toast = document.createElement('div');

    toast.className = `toast ${tipo}`;
    toast.innerHTML = `<span>${mensagem}</span>`;
    
    document.body.appendChild(toast);
}

// Função para validar dados do formulario dos contactos
function validarFormulario() {
    const form = document.querySelector('.contacto-form form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // Limpar mensagens de erro anteriores 
        limparErros();

        // Pegar os valores dos campos pelas classes 
        const nome = document.querySelector('.nome_contacto').value.trim();
        const email = document.querySelector('.email_contacto').value.trim();
        const assunto = document.querySelector('.assunto_contacto').value.trim();
        const mensagem = document.querySelector('.mensagem_contacto').value.trim();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const isValidEmail = (email1) => emailRegex.test(email1);

        console.log(`${email} é ${isValidEmail(email) ? 'valido' : 'invalido'}`);

        let formValido = true;

        // Validação simples se o campo está vazio
        if (nome === '') {
            mostrarErro('.nome_contacto', 'Nome é obrigatório');
            formValido = false;
        }
        if (email === '') {
            mostrarErro('.email_contacto', 'Email é obrigatório');
            formValido = false;
        } else if (!isValidEmail(email)) {
            mostrarErro('.email_contacto', 'Email inválido (precisa ter @ e .)');
            formValido = false;
        }
        if (assunto === '') {
            mostrarErro('.assunto_contacto', 'Assunto é obrigatório');
            formValido = false;
        }
        if (mensagem === '') {
            mostrarErro('.mensagem_contacto', 'Mensagem é obrigatória');
            formValido = false;
        }

        if (formValido) {
            alert('Mensagem enviada com sucesso!');
            form.reset();
        }
    });
}

function mostrarErro(campoClass, mensagem) {
    const campo = document.querySelector(campoClass);
    const erroDiv = campo.nextElementSibling;

    // Configurar a div de erro
    erroDiv.style.visibility = 'visible';
    erroDiv.style.color = 'red';
    erroDiv.style.fontSize = '12px';
    erroDiv.style.marginTop = '-5px';
    erroDiv.style.marginBottom = '-5px';
    erroDiv.style.marginLeft = '5px';
    erroDiv.textContent = mensagem;
    
    campo.style.border = '1px solid red';
}

function limparErros() {
    // Remover a mensagem de erro
    document.querySelectorAll('.mensagem-erro').forEach(function (elemento) {
        elemento.style.visibility = 'hidden';
        elemento.textContent = '';
        elemento.style.marginTop = '3.5px';
        elemento.style.marginBottom = '3.5px';
    });
    
    // Restaurar bordas cinzentas
    const campos = document.querySelectorAll('.nome_contacto, .email_contacto, .assunto_contacto, .mensagem_contacto');
    campos.forEach(function (campo) {
        campo.style.border = '1px solid #ccc';
    });
}

// Função do botao para voltar para o topo da pagina
function botaoTopo() {
    const btn = document.getElementById('toTop');

    function updateVisibility() {
        btn.hidden = window.scrollY <= 300;
    }
    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


// Função do carrossel
function carrosselNoticias() {
    const slides = document.querySelectorAll('.carrossel-item');
    const prevBtn = document.querySelector('.carrossel-btn.prev');
    const nextBtn = document.querySelector('.carrossel-btn.next');
    const indicadores = document.querySelectorAll('.indicador');

    const totalSlides = slides.length;
    let slideAtual = 0;

    // Variveis para o touch
    const carrosselWrapper = document.querySelector('.carrossel-noticias');
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;
    
    // Função para mostrar o slide atual
    function showSlide(index) {
        
        // Garantir que o índice está dentro dos limites
         if (index < 0) {
            index = totalSlides - 1;
        } else if (index >= totalSlides) {
            index = 0;
        }
        
        slideAtual = index;
        
        // Esconder todos os slides e mostrar apenas o atual
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        // Mostrar slide atual
        slides[slideAtual].classList.add('active');
        
        // Atualizar indicadores
        indicadores.forEach((indicador, i) => {
            if (i === slideAtual) {
                indicador.classList.add('active');
            } else {
                indicador.classList.remove('active');
            }
        });
    }

    // Event listener para setas do teclado (acessibilidade)
    document.addEventListener('keydown', function(e) {

        // Verificar se o div do carrossel está visível no ecrã
        const noticiasSection = document.querySelector('.carrossel-noticias');
        const rect = noticiasSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            if (e.key === 'ArrowLeft') {
                showSlide(slideAtual - 1);
            } else if (e.key === 'ArrowRight') {
                showSlide(slideAtual + 1);
            }
        }
    });

    // Event listeners para as setas
    prevBtn.addEventListener('click', () => {
        showSlide(slideAtual - 1);
    });

    nextBtn.addEventListener('click', () => {
        showSlide(slideAtual + 1);
    });

    // Event listeners para os indicadores
    indicadores.forEach((indicador, index) => {
        indicador.addEventListener('click', () => {
            showSlide(index);
        });
    });

    if (carrosselWrapper) {
        carrosselWrapper.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carrosselWrapper.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    showSlide(slideAtual + 1); // Swipe esquerda
                } else {
                    showSlide(slideAtual - 1); // Swipe direita
                }
            }
        }, { passive: true });
    }

    // Inicializar primeiro slide
    showSlide(0);
}

// Função hover
function hoverParceiros() {
    const parceirosBoxes = document.querySelectorAll('.grid-parceiros .grid-box');

    // Mapeamento dos nomes completos (baseado nos alts das imagens)
    const nomesCompletos = {
        'UAC': 'Universidade dos Açores',
        'HDES': 'Hospital do Divino Espírito Santo',
        'USISM': 'Unidade de Saúde da Ilha de São Miguel',
        'INOVA': 'Instituto de Inovação Tecnológica dos Açores',
    };

    // Para cada parceiro, preparar o efeito
    parceirosBoxes.forEach((box) => {
        // Obter a imagem e o seu texto alternativo
        const img = box.querySelector('img');
        const altText = img.getAttribute('alt') || '';
        const nomeCompleto = nomesCompletos[altText] || altText || 'Parceiro CACA';

        // --- 1. Preparar o nome (se não existir) ---
        let nomeEl = box.querySelector('.parceiro-nome');
        if (!nomeEl) {
            nomeEl = document.createElement('div');
            nomeEl.className = 'parceiro-nome';
            nomeEl.textContent = nomeCompleto;
            box.appendChild(nomeEl);
        }

        // --- 2. Adicionar um overlay de brilho (se não existir) ---
        if (!box.querySelector('.parceiro-brilho')) {
            const brilhoEl = document.createElement('div');
            brilhoEl.className = 'parceiro-brilho';
            box.appendChild(brilhoEl);
        }

        // --- 3. Eventos para rato (hover) ---
        box.addEventListener('mouseenter', function () {
            this.classList.add('hover-ativo');
            this.setAttribute('aria-label', `Parceiro: ${nomeCompleto} (em destaque)`);
        });

        box.addEventListener('mouseleave', function () {
            this.classList.remove('hover-ativo');
            this.setAttribute('aria-label', `Parceiro: ${nomeCompleto}`);
        });

        // --- 4. Suporte para teclado (acessibilidade) ---
        box.addEventListener('focusin', function () {
            this.classList.add('hover-ativo');
        });

        box.addEventListener('focusout', function () {
            this.classList.remove('hover-ativo');
        });

        // --- 5. Tornar o box focável ---
        if (!box.hasAttribute('tabindex')) {
            box.setAttribute('tabindex', '0');
        }
        box.setAttribute('role', 'button');
        box.setAttribute('aria-label', `Parceiro: ${nomeCompleto}`);
    });
}

// ==================== DNA 3D NO NEWSLETTER ====================
function initDNA3D() {
    const container = document.getElementById('dna-container');
    if (!container) return;

    // Cores
    const blue = 0x84D0F0;
    const yellow = 0xFED162;
    const purple = 0x651E59;

    // Setup básico Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Geometrias simplificadas
    const tubeGeometry = new THREE.CylinderGeometry(0.3, 0.3, 6, 16);
    const ballGeometry = new THREE.SphereGeometry(0.8, 16, 16);

    // Materiais
    const blueMaterial = new THREE.MeshBasicMaterial({ color: blue });
    const yellowMaterial = new THREE.MeshBasicMaterial({ color: yellow });
    const purpleMaterial = new THREE.MeshBasicMaterial({ color: purple });

    // Grupo principal
    const dnaGroup = new THREE.Group();

    // Versão simplificada: apenas 20 camadas
    for (let i = 0; i <= 20; i++) {
        const row = new THREE.Group();
        const yPos = i * 2 - 20; // Centraliza verticalmente

        // Tubos laterais
        const blueTube = new THREE.Mesh(tubeGeometry, blueMaterial);
        blueTube.rotation.z = Math.PI/2;
        blueTube.position.set(-3, 0, 0);

        const yellowTube = new THREE.Mesh(tubeGeometry, yellowMaterial);
        yellowTube.rotation.z = Math.PI/2;
        yellowTube.position.set(3, 0, 0);

        // Esferas das pontas
        const ballLeft = new THREE.Mesh(ballGeometry, purpleMaterial);
        ballLeft.position.set(-6, 0, 0);

        const ballRight = new THREE.Mesh(ballGeometry, purpleMaterial);
        ballRight.position.set(6, 0, 0);

        // Monta a linha
        row.add(blueTube, yellowTube, ballLeft, ballRight);
        row.position.y = yPos;
        row.rotation.y = i * 0.5; // Rotação progressiva

        dnaGroup.add(row);
    }

    scene.add(dnaGroup);

    // Animação simples
    function animate() {
        requestAnimationFrame(animate);
        dnaGroup.rotation.x += 0.005;
        dnaGroup.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    // Redimensionamento
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

function listaPaises() {

    const countries = [
        "Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola",
        "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia",
        "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
        "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia (Plurinational State of)", "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory",
        "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
        "Canada", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island",
        "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo (Democratic Republic of the)",
        "Cook Islands", "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czechia",
        "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
        "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Falkland Islands (Malvinas)",
        "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia",
        "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar",
        "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea",
        "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See", "Honduras",
        "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq",
        "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan",
        "Kenya", "Kiribati", "Korea (Democratic People's Republic of)", "Korea (Republic of)", "Kuwait",
        "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia",
        "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Madagascar", "Malawi", "Malaysia",
        "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius",
        "Mayotte", "Mexico", "Micronesia (Federated States of)", "Moldova (Republic of)", "Monaco",
        "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru",
        "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria",
        "Niue", "Norfolk Island", "North Macedonia", "Northern Mariana Islands", "Norway", "Oman",
        "Pakistan", "Palau", "Palestine, State of", "Panama", "Papua New Guinea", "Paraguay", "Peru",
        "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania",
        "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
        "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch part)",
        "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
        "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan",
        "Suriname", "Svalbard and Jan Mayen", "Sweden", "Switzerland", "Syrian Arab Republic",
        "Taiwan (Province of China)", "Tajikistan", "Tanzania, United Republic of", "Thailand",
        "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
        "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
        "United Kingdom of Great Britain and Northern Ireland", "United States of America",
        "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu",
        "Venezuela (Bolivarian Republic of)", "Viet Nam", "Virgin Islands (British)",
        "Virgin Islands (U.S.)", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"
    ];

    const paisSelect = document.getElementById('pais');

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        paisSelect.appendChild(option);
    });
};


// ==================== GRÁFICO DE PRODUÇÃO ACADÊMICA ====================
function criarGraficoProducao() {
    // Dados para o gráfico
    const data = [
        {categoria: "Projetos", tipo: "Em curso", valor: 3},
        {categoria: "Projetos", tipo: "Concluídos", valor: 6},
        {categoria: "Estágios", tipo: "Em curso", valor: 8},
        {categoria: "Estágios", tipo: "Concluídos", valor: 14},
        {categoria: "Mestrados/Doutoramentos", tipo: "Em curso", valor: 4},
        {categoria: "Mestrados/Doutoramentos", tipo: "Concluídos", valor: 9},
        {categoria: "Publicações", tipo: "Indexadas", valor: 16},
        {categoria: "Publicações", tipo: "Não indexadas", valor: 5}
    ];

    // Configurações do gráfico
    const width = 1550;
    const marginTop = 30;
    const marginRight = 150;
    const marginBottom = 30;
    const marginLeft = 180;

    // Identificar tipos únicos
    const tipos = Array.from(new Set(data.map(d => d.tipo)));

    // Agrupar dados por categoria
    const dadosAgrupados = Array.from(d3.group(data, d => d.categoria), ([categoria, valores]) => {
        const obj = {categoria};
        valores.forEach(v => obj[v.tipo] = v.valor);
        return obj;
    });

    // Criar o stack
    const series = d3.stack().keys(tipos)(dadosAgrupados);

    // Calcular altura
    const height = series[0].length * 60 + marginTop + marginBottom;

    // Escalas
    const x = d3.scaleLinear()
        .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
        .range([marginLeft, width - marginRight]);

    const y = d3.scaleBand()
        .domain(dadosAgrupados.map(d => d.categoria))
        .range([marginTop, height - marginBottom])
        .padding(0.2);

    const color = d3.scaleOrdinal()
        .domain(tipos)
        .range(["#1E88E5", "#FFC107", "#4CAF50", "#F44336"]);

    // Criar SVG
    const svg = d3.select("#grafico-producao")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");

    // Adicionar barras
    svg.append("g")
        .selectAll()
        .data(series)
        .join("g")
        .attr("fill", d => color(d.key))
        .selectAll("rect")
        .data(D => D.map(d => (d.key = D.key, d)))
        .join("rect")
        .attr("x", d => x(d[0]))
        .attr("y", d => y(d.data.categoria))
        .attr("height", y.bandwidth())
        .attr("width", d => x(d[1]) - x(d[0]))
        .append("title")
        .text(d => `${d.data.categoria} - ${d.key}: ${d.data[d.key]}`);

    // Valores numéricos nas barras (alinhados à direita)
    svg.append("g")
        .selectAll()
        .data(series)
        .join("g")
        .selectAll("text")
        .data(D => D.map(d => (d.key = D.key, d)))
        .join("text")
        .attr("x", d => x(d[1]) - 5)
        .attr("y", d => y(d.data.categoria) + y.bandwidth() / 2 + 5)
        .attr("text-anchor", "end")
        .attr("fill", "white")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .text(d => d.data[d.key] || "");

    // Eixos (com array para aplicar configurações em ambos os eixos)
    [
        {axis: d3.axisTop(x).ticks(8), transform: `translate(0,${marginTop})`, classe: "eixo-x"},
        {axis: d3.axisLeft(y).tickSizeOuter(0), transform: `translate(${marginLeft},0)`, classe: "eixo-y"}
    ].forEach(e => {
        svg.append("g")
            .attr("transform", e.transform)
            .call(e.axis)
            .call(g => g.selectAll(".domain").remove())
            .call(g => g.selectAll(".tick text")
                .attr("font-size", "14px")
                .attr("font-weight", "500"));
    });

    // Legenda
    const legend = svg.append("g")
        .attr("transform", `translate(${width - marginRight + 20}, ${marginTop})`);

    tipos.forEach((tipo, i) => {
        const legendRow = legend.append("g")
            .attr("transform", `translate(0, ${i * 25})`);

        legendRow.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .attr("fill", color(tipo));

        legendRow.append("text")
            .attr("x", 25)
            .attr("y", 14)
            .attr("text-anchor", "start")
            .style("font-size", "14px")
            .text(tipo);
    });
}

function expandirInvestigacao() {
    // Vai buscar todos os elementos que contem
    const saibaMaisLinks = document.querySelectorAll('.grid-box-investigacao a.saiba-mais');
    
    // Para cada elemento
    saibaMaisLinks.forEach((link, index) => {

        // Texto adicional para cada área
        const textosExtras = [
            'A investigação nesta área procura identificar padrões de doença, fatores de risco e tendências de saúde na população açoriana. A análise de dados clínicos e demográficos permite apoiar políticas públicas, orientar programas de prevenção e melhorar a resposta dos serviços de saúde às necessidades da população. A colaboração entre investigadores, profissionais de saúde e instituições académicas permite desenvolver estudos populacionais, bases de dados regionais e metodologias de análise estatística aplicadas à saúde pública. Esta abordagem contribui para uma melhor compreensão das particularidades epidemiológicas de regiões insulares. A área de epidemiologia do CACA integra uma equipa multidisciplinar de investigadores e estudantes de pós-graduação. Atualmente estão em desenvolvimento vários projetos de investigação e estudos populacionais, que já resultaram em diversas publicações científicas e dissertações de mestrado e doutoramento dedicadas à saúde pública e às doenças genéticas na região.',
            'A investigação nesta área foca-se no desenvolvimento e avaliação de tecnologias digitais que permitam melhorar o acesso aos cuidados de saúde, especialmente em regiões geograficamente dispersas. As soluções incluem sistemas de teleconsulta, monitorização remota de pacientes e plataformas de apoio à decisão clínica. A aplicação de tecnologias digitais na saúde permite reduzir tempos de resposta, otimizar recursos médicos e facilitar a comunicação entre diferentes unidades de saúde. Em contextos insulares, estas ferramentas têm um papel particularmente relevante na melhoria da continuidade dos cuidados. A área de telemedicina do CACA envolve investigadores das áreas da saúde, informática e engenharia, desenvolvendo projetos de inovação tecnológica em colaboração com unidades de saúde regionais. Estes projetos já deram origem a várias publicações científicas, protótipos de plataformas digitais e trabalhos académicos de mestrado e doutoramento.',
            'A investigação nesta área procura compreender os fatores biológicos, psicológicos e sociais que influenciam o bem-estar mental da população. Estudos desenvolvidos no CACA analisam o impacto de estilos de vida, atividade física e contextos sociais na saúde mental. Um dos focos principais é a promoção de estratégias de prevenção e intervenção que possam melhorar a qualidade de vida das populações. Programas comunitários de exercício físico, educação para a saúde e promoção de hábitos saudáveis têm sido estudados como formas de reduzir fatores de risco associados à ansiedade, depressão e outros problemas de saúde mental. A equipa de investigação em saúde mental reúne investigadores, profissionais de saúde e estudantes de pós-graduação que desenvolvem projetos interdisciplinares na área da promoção da saúde. Estes trabalhos têm contribuído para a produção de artigos científicos, dissertações académicas e projetos aplicados em colaboração com instituições regionais.'
        ];
        
        // Criar elemento para o texto extra
        const textoExtra = document.createElement('div');
        textoExtra.className = 'texto-extra';
        textoExtra.style.display = 'none';
        textoExtra.style.marginTop = '15px';
        textoExtra.textContent = textosExtras[index];
        
        // Inserir após o saiba mais
        link.insertAdjacentElement('afterend', textoExtra);
        
        // Evento de click
        link.addEventListener('click', function() {
            // Alternar visibilidade
            if (textoExtra.style.display === 'none') {
                textoExtra.style.display = 'block';
                this.textContent = 'Mostrar menos';
            } else {
                textoExtra.style.display = 'none';
                this.textContent = 'Saiba mais';
            }
        });
    });
}
