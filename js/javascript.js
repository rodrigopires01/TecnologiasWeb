document.addEventListener('DOMContentLoaded', function () {
    validarNewsletter();
    validarFormulario();
    botaoTopo();
    carrosselNoticias();
    hoverParceiros();
    initDNA3D();
});

function validarNewsletter() {
    const submitBtn = document.querySelector('.botao-submit-newsletter .enviar_newsletter');
    const emailInput = document.querySelector('.email_newsletter');

    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();
        
        const email = emailInput.value.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (email === '') {
            mostrarToast('Por favor, insira um e-mail!', 'error');
            emailInput.style.border = '1px solid #dc3545';
            emailInput.style.backgroundColor = '#fff8f8';
        } else if (!emailRegex.test(email)) {
            mostrarToast('E-mail inválido, use @ e . e certifique-se que o email existe!', 'error');
            emailInput.style.border = '1px solid #dc3545';
            emailInput.style.backgroundColor = '#fff8f8';
        } else {
            mostrarToast('Subscrito com sucesso!', 'success');
            emailInput.style.border = '1px solid #0f9d58';
            emailInput.style.backgroundColor = '#f8fff8';
            emailInput.value = '';
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
        // Verificar se a secção de notícias está visível na tela
        const noticiasSection = document.querySelector('.noticias');
        const rect = noticiasSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault(); // Prevenir scroll da página
                showSlide(slideAtual - 1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault(); // Prevenir scroll da página
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

    // Cores (iguais ao CodePen)
    const blue = 0x84D0F0;
    const yellow = 0xFED162;
    const purple = 0x651E59;

    // Scene
    const scene = new THREE.Scene();


    // Camera
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 15; // Aproximar um pouco para caber no círculo

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true // <-- MUDAR para true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Fundo completamente transparente
    container.appendChild(renderer.domElement);

    // Geometrias
    const tubeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3.5, 16); // Mais pequeno
    const ballGeometry = new THREE.SphereGeometry(0.5, 24, 24); // Mais pequeno

    const blueMaterial = new THREE.MeshBasicMaterial({ color: blue });
    const yellowMaterial = new THREE.MeshBasicMaterial({ color: yellow });

    // Grupo principal para rodar tudo
    const dnaGroup = new THREE.Group();

    // Criar a estrutura do DNA (adaptado do CodePen)
    const radius = 2.0; // Raio menor para caber no círculo
    const turns = 2;    // Número de voltas
    const segments = 24; // Número de pares de bases
    const heightTotal = 5.0;

    // Cores alternadas
    const colors = [blueMaterial, yellowMaterial];

    for (let i = 0; i <= segments; i++) {
        const progress = i / segments; // 0 a 1
        const angle = progress * Math.PI * 2 * turns;
        const y = (progress - 0.5) * heightTotal;

        // Posição das duas bolas (lados opostos)
        const x1 = Math.cos(angle) * radius;
        const z1 = Math.sin(angle) * radius;
        const x2 = Math.cos(angle + Math.PI) * radius;
        const z2 = Math.sin(angle + Math.PI) * radius;

        // Alternar material
        const materialIndex = i % 2;
        const material1 = colors[materialIndex];
        const material2 = colors[(materialIndex + 1) % 2];

        // Bola 1
        const ball1 = new THREE.Mesh(ballGeometry, material1);
        ball1.position.set(x1, y, z1);
        dnaGroup.add(ball1);

        // Bola 2
        const ball2 = new THREE.Mesh(ballGeometry, material2);
        ball2.position.set(x2, y, z2);
        dnaGroup.add(ball2);

        // Conectar com um cilindro (apenas em alguns pontos para não ficar poluído)
        if (i % 2 === 0) {
            // Conexão horizontal entre as duas bolas
            const midX = (x1 + x2) / 2;
            const midY = y;
            const midZ = (z1 + z2) / 2;

            const direction = new THREE.Vector3(x2 - x1, 0, z2 - z1);
            const length = direction.length();

            if (length > 0) {
                const cylinder = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.08, 0.08, length, 6),
                    new THREE.MeshBasicMaterial({ color: 0xffffff })
                );

                // Posicionar e rodar o cilindro para conectar as bolas
                cylinder.position.set(midX, y, midZ);
                cylinder.quaternion.setFromUnitVectors(
                    new THREE.Vector3(0, 1, 0),
                    direction.clone().normalize()
                );

                dnaGroup.add(cylinder);
            }
        }
    }

    // Adicionar coluna central (opcional, para dar mais estabilidade visual)
    const centerColumn = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, heightTotal + 1, 8),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    centerColumn.position.set(0, 0, 0);
    dnaGroup.add(centerColumn);

    scene.add(dnaGroup);

    // Animação
    function animate() {
        requestAnimationFrame(animate);

        // Rotação suave
        dnaGroup.rotation.y += 0.005;
        dnaGroup.rotation.x += 0.001;

        renderer.render(scene, camera);
    }

    animate();

    // Ajustar ao redimensionamento da janela
    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        const width = container.clientWidth;
        const height = container.clientHeight;

        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    // Observer para quando o container muda de tamanho (ex: mobile)
    const resizeObserver = new ResizeObserver(() => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
    resizeObserver.observe(container);
}
