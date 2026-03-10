// javascript.js (completo com formulário, voltar ao topo, carrossel e hover dos parceiros)

document.addEventListener('DOMContentLoaded', function () {
    validarFormulario();
    initFixedBackToTop();
    initCarrosselNoticias();
    initHoverParceiros(); // Adicionada função dos parceiros
});

// ==================== FUNÇÕES DO FORMULÁRIO ====================
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

        let formValido = true;

        // Validação simples se o campo está vazio
        if (nome === '') {
            mostrarErro('.nome_contacto', 'Nome é obrigatório');
            formValido = false;
        }
        if (email === '') {
            mostrarErro('.email_contacto', 'Email é obrigatório');
            formValido = false;
        } else if (!email.includes('@') || !email.includes('.')) {
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

    const erroDiv = document.createElement('div');
    erroDiv.className = 'mensagem-erro';
    erroDiv.style.color = 'red';
    erroDiv.style.fontSize = '12px';
    erroDiv.style.marginTop = '-5px';
    erroDiv.style.marginBottom = '-5px';
    erroDiv.style.marginLeft = '5px';
    erroDiv.style.visibility = 'visible';
    erroDiv.textContent = mensagem;

    campo.parentNode.insertBefore(erroDiv, campo.nextSibling);
    campo.style.border = '1px solid red';
}

function limparErros() {
    document.querySelectorAll('.mensagem-erro').forEach(function (elemento) {
        elemento.remove();
    });
    const campos = document.querySelectorAll('.nome_contacto, .email_contacto, .assunto_contacto, .mensagem_contacto');
    campos.forEach(function (campo) {
        campo.style.border = '1px solid #ccc';
    });
}

// ==================== BOTÃO VOLTAR AO TOPO ====================
function initFixedBackToTop() {
    const btn = document.getElementById('toTop');
    if (!btn) return;

    function updateVisibility() {
        btn.hidden = window.scrollY <= 300;
    }
    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.querySelector('header')?.focus?.();
    });
}

// ==================== CARROSSEL DE NOTÍCIAS ====================
function initCarrosselNoticias() {
    const carrosselWrapper = document.querySelector('.carrossel-noticias');
    if (!carrosselWrapper) return;

    const slides = document.querySelectorAll('.carrossel-item');
    const prevBtn = document.querySelector('.carrossel-btn.prev');
    const nextBtn = document.querySelector('.carrossel-btn.next');
    const indicadores = document.querySelectorAll('.indicador');
    
    let slideAtual = 0;
    const totalSlides = slides.length;
    let autoPlayInterval = null;
    const autoPlayDelay = 5000;
    let touchStartX = 0;
    let touchEndX = 0;

    if (totalSlides === 0) return;

    function showSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;

        slideAtual = index;

        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        slides[slideAtual].classList.add('active');
        
        indicadores.forEach((indicador, i) => {
            if (i === slideAtual) {
                indicador.classList.add('active');
            } else {
                indicador.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        showSlide(slideAtual + 1);
        resetAutoPlay();
    }

    function prevSlide() {
        showSlide(slideAtual - 1);
        resetAutoPlay();
    }

    function goToSlide(index) {
        showSlide(index);
        resetAutoPlay();
    }

    function startAutoPlay() {
        if (!autoPlayInterval) {
            autoPlayInterval = setInterval(() => {
                nextSlide();
            }, autoPlayDelay);
        }
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // CSS para o carrossel (caso não exista no stylesheet)
    function addCarrosselCSS() {
        const styleExists = document.querySelector('#carrossel-style');
        if (!styleExists) {
            const style = document.createElement('style');
            style.id = 'carrossel-style';
            style.textContent = `
                .carrossel-slides {
                    position: relative;
                    overflow: hidden;
                }
                .carrossel-item {
                    display: none;
                }
                .carrossel-item.active {
                    display: block;
                }
            `;
            document.head.appendChild(style);
        }
    }

    addCarrosselCSS();
    showSlide(slideAtual);
    startAutoPlay();

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    indicadores.forEach((indicador, index) => {
        indicador.addEventListener('click', () => {
            goToSlide(index);
        });
        
        if (!indicador.hasAttribute('data-slide')) {
            indicador.setAttribute('data-slide', index);
        }
    });

    carrosselWrapper.addEventListener('mouseenter', stopAutoPlay);
    carrosselWrapper.addEventListener('mouseleave', startAutoPlay);

    document.addEventListener('keydown', (e) => {
        const rect = carrosselWrapper.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        }
    });

    carrosselWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carrosselWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

// ==================== HOVER DOS PARCEIROS ====================
function initHoverParceiros() {
    const parceirosBoxes = document.querySelectorAll('.grid-parceiros .grid-box');

    if (parceirosBoxes.length === 0) {
        console.log('Nenhum parceiro encontrado');
        return;
    }

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
        if (!img) return;

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
