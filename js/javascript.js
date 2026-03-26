import { validarDadosNewsletter, validarDadosContacto } from '/js/validacoes.js';
import { processarDadosGrafico, definirDimensoesEEscalas, criarSVG } from '/js/graficoD3.js'
import { setupDNA3D, criarEstruturaDNA, iniciarAnimacaoDNA, configurarRedimensionamentoDNA } from '/js/dna.js'

/**
 * Primeiro event listener do site
 * Aguarda o carregamento total do DOM para executar as funções de setup do site.
 */
document.addEventListener('DOMContentLoaded', function () {
    fecharMenuHamburger();
    validarNewsletter();
    listaPaises();
    validarFormulario();
    configurarLimpezaAutomaticaErros();
    botaoTopo();
    carrosselNoticias();
    hoverParceiros();
    initDNA3D();
    criarGraficoProducao();
    expandirInvestigacao();
    popularIndicativosTelefone();
    configurarMensagensPredefinidas();
});


/**
 * Fecha o menu hambúrguer quando uma link da navbar é clicado.
 * @param {None} - Esta função não recebe parâmetros.
 * @returns {void} - Esta função não retorna qualquer valor.
 */
function fecharMenuHamburger() {
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function () {
            document.getElementById('menu-toggle').checked = false;
        });
    });
}


/**
 * Faz a validação dos dados na secção do newsletter. Valida se o pais está selecionado e se o e-mail está num formato correto.
 * @param {None} - Esta função não recebe parâmetros.
 * @returns {void} - Esta função não retorna qualquer valor.
 */
function validarNewsletter() {
    const submitBtn = document.querySelector('.newsletter-formulario .enviar_newsletter');
    const emailInput = document.querySelector('.email_newsletter');
    const paisSelect = document.querySelector('.pais_selector');

    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();

        const resultado = validarDadosNewsletter(emailInput.value, paisSelect.value);

        emailInput.style.border = '1px solid #ddd';
        emailInput.style.backgroundColor = 'white';
        paisSelect.style.border = '1px solid #ddd';
        paisSelect.style.backgroundColor = 'white';

        if (resultado.erros.includes("E-mail inválido!") || resultado.erros.includes("Por favor insira um e-mail!")) {
            emailInput.style.border = '1px solid #dc3545';
        }

        if (resultado.erros.includes("Por favor escolha um país!")) {
            paisSelect.style.border = '1px solid #dc3545';
        }

        if (!resultado.valido) {
            const mensagem = resultado.erros.join('<br>');
            mostrarToast(mensagem, 'error');

        } else {
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


/**
 * Faz a validação dos dados na secção do newsletter. Valida se o pais está selecionado e se o e-mail está num formato correto.
 * @param {string} mensagem - O texto que vai aparecer no toast.
 * @param {string} tipo - Classe do CSS, error ou success.
 * @returns {void} - Esta função não retorna qualquer valor.
 */
function mostrarToast(mensagem, tipo) {
    document.querySelectorAll('.toast').forEach(toast => toast.remove());

    const toast = document.createElement('div');

    toast.className = `toast ${tipo}`;
    toast.innerHTML = `<span>${mensagem}</span>`;

    document.body.appendChild(toast);
}


/**
 * Faz a validação dos dados na secção dos contactos. Valida se os campos não estão vazios, e valida se o e-mail está num formato correto.
 * @param {None} - Esta função não recebe parâmetros.
 * @returns {void} - Esta função não retorna qualquer valor.
 */
function validarFormulario() {
    const form = document.querySelector('.contacto-form form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const dados = {
            nome: document.getElementById('nome_contacto').value.trim(),
            email: document.getElementById('email_contacto').value.trim(),
            telemovel: document.getElementById('telemovel_contacto').value.trim(),
            assunto: document.getElementById('assunto_contacto').value.trim(),
            mensagem: document.getElementById('mensagem_contacto').value.trim()
        };

        const resultado = validarDadosContacto(dados);

        if (!resultado.valido) {
            if (resultado.erros.nome) {
                mostrarErro('nome', resultado.erros.nome);
            }
            if (resultado.erros.email) {
                mostrarErro('email', resultado.erros.email);
            }
            if (resultado.erros.telemovel) {
                mostrarErro('telemovel', resultado.erros.telemovel);
            }
            if (resultado.erros.assunto) {
                mostrarErro('assunto', resultado.erros.assunto);
            }
            if (resultado.erros.mensagem) {
                mostrarErro('mensagem', resultado.erros.mensagem);
            }
        } else {
            mostrarToast('Mensagem enviada com sucesso!', 'success');
            form.reset();
        }
    });
}


/**
 * Adiciona listeners aos campos do formulário para limpar o estado de erro
 * assim que o utilizador começa a interagir com o campo.
 * @param {None} - Esta função não recebe parâmetros.
 * @returns {void} - Esta função não retorna qualquer valor.
 */
function configurarLimpezaAutomaticaErros() {
    const campos = ['nome', 'email', 'telemovel', 'assunto', 'mensagem'];

    campos.forEach(campo => {
        document.getElementById(`${campo}_contacto`).addEventListener('input', function () {
            this.style.border = '1px solid #ccc';
            document.getElementById(`erro-${campo}`).style.visibility = 'hidden';
        });
    });
}


/**
 * Altera os estilos dos campos de input da secção do formulário para o caso de erro.
 * @param {string} campoNome - O nome do campo (nome, email, telemovel, assunto, mensagem).
 * @param {string} mensagem - A mensagem de erro a mostrar.
 * @returns {void} - Esta função não retorna qualquer valor.
 */
function mostrarErro(campoNome, mensagem) {
    document.getElementById(`${campoNome}_contacto`).style.border = '1px solid red';

    document.getElementById(`erro-${campoNome}`).textContent = mensagem;
    document.getElementById(`erro-${campoNome}`).style.visibility = 'visible';

    if (campoNome === 'telemovel') {
        document.getElementById(`erro-${campoNome}`).style.marginLeft = '103px';
    }
}


/**
 * Botão que aparece após dar scroll em 300 pixeis para voltar ao topo.
 * @param {None} - Esta função não recebe parâmetros.
 * @returns {void} - Esta função não retorna qualquer valor.
 */
function botaoTopo() {
    const btn = document.getElementById('toTop');

    function updateVisibility() {
        btn.hidden = window.scrollY <= 300;
    }
    window.addEventListener('scroll', updateVisibility);
    updateVisibility();

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


/**
 * Populates the telephone indicative select dropdown with all country options
 * @param {None} - Esta função não recebe parâmetros.
 * @returns {void} - Esta função não retorna qualquer valor.
 */
function popularIndicativosTelefone() {
    const indicativos = [
        { code: "+93", flag: "🇦🇫" }, { code: "+355", flag: "🇦🇱" }, { code: "+213", flag: "🇩🇿" },
        { code: "+376", flag: "🇦🇩" }, { code: "+244", flag: "🇦🇴" }, { code: "+1264", flag: "🇦🇮" },
        { code: "+1268", flag: "🇦🇬" }, { code: "+54", flag: "🇦🇷" }, { code: "+374", flag: "🇦🇲" },
        { code: "+297", flag: "🇦🇼" }, { code: "+61", flag: "🇦🇺" }, { code: "+43", flag: "🇦🇹" },
        { code: "+994", flag: "🇦🇿" }, { code: "+1242", flag: "🇧🇸" }, { code: "+973", flag: "🇧🇭" },
        { code: "+880", flag: "🇧🇩" }, { code: "+1246", flag: "🇧🇧" }, { code: "+375", flag: "🇧🇾" },
        { code: "+32", flag: "🇧🇪" }, { code: "+501", flag: "🇧🇿" }, { code: "+229", flag: "🇧🇯" },
        { code: "+1441", flag: "🇧🇲" }, { code: "+975", flag: "🇧🇹" }, { code: "+591", flag: "🇧🇴" },
        { code: "+387", flag: "🇧🇦" }, { code: "+267", flag: "🇧🇼" }, { code: "+55", flag: "🇧🇷" },
        { code: "+673", flag: "🇧🇳" }, { code: "+359", flag: "🇧🇬" }, { code: "+226", flag: "🇧🇫" },
        { code: "+257", flag: "🇧🇮" }, { code: "+855", flag: "🇰🇭" }, { code: "+237", flag: "🇨🇲" },
        { code: "+1", flag: "🇨🇦" }, { code: "+238", flag: "🇨🇻" }, { code: "+1345", flag: "🇰🇾" },
        { code: "+236", flag: "🇨🇫" }, { code: "+235", flag: "🇹🇩" }, { code: "+56", flag: "🇨🇱" },
        { code: "+86", flag: "🇨🇳" }, { code: "+57", flag: "🇨🇴" }, { code: "+269", flag: "🇰🇲" },
        { code: "+242", flag: "🇨🇬" }, { code: "+682", flag: "🇨🇰" }, { code: "+506", flag: "🇨🇷" },
        { code: "+225", flag: "🇨🇮" }, { code: "+385", flag: "🇭🇷" }, { code: "+53", flag: "🇨🇺" },
        { code: "+599", flag: "🇨🇼" }, { code: "+357", flag: "🇨🇾" }, { code: "+420", flag: "🇨🇿" },
        { code: "+45", flag: "🇩🇰" }, { code: "+253", flag: "🇩🇯" }, { code: "+1767", flag: "🇩🇲" },
        { code: "+1809", flag: "🇩🇴" }, { code: "+593", flag: "🇪🇨" }, { code: "+20", flag: "🇪🇬" },
        { code: "+503", flag: "🇸🇻" }, { code: "+240", flag: "🇬🇶" }, { code: "+291", flag: "🇪🇷" },
        { code: "+372", flag: "🇪🇪" }, { code: "+268", flag: "🇸🇿" }, { code: "+251", flag: "🇪🇹" },
        { code: "+500", flag: "🇫🇰" }, { code: "+298", flag: "🇫🇴" }, { code: "+679", flag: "🇫🇯" },
        { code: "+358", flag: "🇫🇮" }, { code: "+33", flag: "🇫🇷" }, { code: "+594", flag: "🇬🇫" },
        { code: "+689", flag: "🇵🇫" }, { code: "+241", flag: "🇬🇦" }, { code: "+220", flag: "🇬🇲" },
        { code: "+995", flag: "🇬🇪" }, { code: "+49", flag: "🇩🇪" }, { code: "+233", flag: "🇬🇭" },
        { code: "+350", flag: "🇬🇮" }, { code: "+30", flag: "🇬🇷" }, { code: "+299", flag: "🇬🇱" },
        { code: "+1473", flag: "🇬🇩" }, { code: "+590", flag: "🇬🇵" }, { code: "+1671", flag: "🇬🇺" },
        { code: "+502", flag: "🇬🇹" }, { code: "+224", flag: "🇬🇳" }, { code: "+245", flag: "🇬🇼" },
        { code: "+592", flag: "🇬🇾" }, { code: "+509", flag: "🇭🇹" }, { code: "+504", flag: "🇭🇳" },
        { code: "+852", flag: "🇭🇰" }, { code: "+36", flag: "🇭🇺" }, { code: "+354", flag: "🇮🇸" },
        { code: "+91", flag: "🇮🇳" }, { code: "+62", flag: "🇮🇩" }, { code: "+98", flag: "🇮🇷" },
        { code: "+964", flag: "🇮🇶" }, { code: "+353", flag: "🇮🇪" }, { code: "+972", flag: "🇮🇱" },
        { code: "+39", flag: "🇮🇹" }, { code: "+1876", flag: "🇯🇲" }, { code: "+81", flag: "🇯🇵" },
        { code: "+962", flag: "🇯🇴" }, { code: "+7", flag: "🇰🇿" }, { code: "+254", flag: "🇰🇪" },
        { code: "+686", flag: "🇰🇮" }, { code: "+383", flag: "🇽🇰" }, { code: "+965", flag: "🇰🇼" },
        { code: "+996", flag: "🇰🇬" }, { code: "+856", flag: "🇱🇦" }, { code: "+371", flag: "🇱🇻" },
        { code: "+961", flag: "🇱🇧" }, { code: "+266", flag: "🇱🇸" }, { code: "+231", flag: "🇱🇷" },
        { code: "+218", flag: "🇱🇾" }, { code: "+423", flag: "🇱🇮" }, { code: "+370", flag: "🇱🇹" },
        { code: "+352", flag: "🇱🇺" }, { code: "+853", flag: "🇲🇴" }, { code: "+261", flag: "🇲🇬" },
        { code: "+265", flag: "🇲🇼" }, { code: "+60", flag: "🇲🇾" }, { code: "+960", flag: "🇲🇻" },
        { code: "+223", flag: "🇲🇱" }, { code: "+356", flag: "🇲🇹" }, { code: "+692", flag: "🇲🇭" },
        { code: "+596", flag: "🇲🇶" }, { code: "+222", flag: "🇲🇷" }, { code: "+230", flag: "🇲🇺" },
        { code: "+52", flag: "🇲🇽" }, { code: "+691", flag: "🇫🇲" }, { code: "+373", flag: "🇲🇩" },
        { code: "+377", flag: "🇲🇨" }, { code: "+976", flag: "🇲🇳" }, { code: "+382", flag: "🇲🇪" },
        { code: "+1664", flag: "🇲🇸" }, { code: "+212", flag: "🇲🇦" }, { code: "+258", flag: "🇲🇿" },
        { code: "+95", flag: "🇲🇲" }, { code: "+264", flag: "🇳🇦" }, { code: "+674", flag: "🇳🇷" },
        { code: "+977", flag: "🇳🇵" }, { code: "+31", flag: "🇳🇱" }, { code: "+687", flag: "🇳🇨" },
        { code: "+64", flag: "🇳🇿" }, { code: "+505", flag: "🇳🇮" }, { code: "+227", flag: "🇳🇪" },
        { code: "+234", flag: "🇳🇬" }, { code: "+683", flag: "🇳🇺" }, { code: "+672", flag: "🇳🇫" },
        { code: "+850", flag: "🇰🇵" }, { code: "+389", flag: "🇲🇰" }, { code: "+47", flag: "🇳🇴" },
        { code: "+968", flag: "🇴🇲" }, { code: "+92", flag: "🇵🇰" }, { code: "+680", flag: "🇵🇼" },
        { code: "+970", flag: "🇵🇸" }, { code: "+507", flag: "🇵🇦" }, { code: "+675", flag: "🇵🇬" },
        { code: "+595", flag: "🇵🇾" }, { code: "+51", flag: "🇵🇪" }, { code: "+63", flag: "🇵🇭" },
        { code: "+48", flag: "🇵🇱" }, { code: "+1787", flag: "🇵🇷" }, { code: "+974", flag: "🇶🇦" },
        { code: "+262", flag: "🇷🇪" }, { code: "+40", flag: "🇷🇴" }, { code: "+7", flag: "🇷🇺" },
        { code: "+250", flag: "🇷🇼" }, { code: "+590", flag: "🇧🇱" }, { code: "+1869", flag: "🇰🇳" },
        { code: "+1758", flag: "🇱🇨" }, { code: "+590", flag: "🇲🇫" }, { code: "+508", flag: "🇵🇲" },
        { code: "+1784", flag: "🇻🇨" }, { code: "+685", flag: "🇼🇸" }, { code: "+378", flag: "🇸🇲" },
        { code: "+239", flag: "🇸🇹" }, { code: "+966", flag: "🇸🇦" }, { code: "+221", flag: "🇸🇳" },
        { code: "+381", flag: "🇷🇸" }, { code: "+248", flag: "🇸🇨" }, { code: "+232", flag: "🇸🇱" },
        { code: "+65", flag: "🇸🇬" }, { code: "+421", flag: "🇸🇰" }, { code: "+386", flag: "🇸🇮" },
        { code: "+677", flag: "🇸🇧" }, { code: "+252", flag: "🇸🇴" }, { code: "+27", flag: "🇿🇦" },
        { code: "+82", flag: "🇰🇷" }, { code: "+211", flag: "🇸🇸" }, { code: "+34", flag: "🇪🇸" },
        { code: "+94", flag: "🇱🇰" }, { code: "+249", flag: "🇸🇩" }, { code: "+597", flag: "🇸🇷" },
        { code: "+46", flag: "🇸🇪" }, { code: "+41", flag: "🇨🇭" }, { code: "+963", flag: "🇸🇾" },
        { code: "+886", flag: "🇹🇼" }, { code: "+992", flag: "🇹🇯" }, { code: "+255", flag: "🇹🇿" },
        { code: "+66", flag: "🇹🇭" }, { code: "+670", flag: "🇹🇱" }, { code: "+228", flag: "🇹🇬" },
        { code: "+690", flag: "🇹🇰" }, { code: "+676", flag: "🇹🇴" }, { code: "+1868", flag: "🇹🇹" },
        { code: "+216", flag: "🇹🇳" }, { code: "+90", flag: "🇹🇷" }, { code: "+993", flag: "🇹🇲" },
        { code: "+1649", flag: "🇹🇨" }, { code: "+688", flag: "🇹🇻" }, { code: "+256", flag: "🇺🇬" },
        { code: "+380", flag: "🇺🇦" }, { code: "+971", flag: "🇦🇪" }, { code: "+44", flag: "🇬🇧" },
        { code: "+1", flag: "🇺🇸" }, { code: "+598", flag: "🇺🇾" }, { code: "+998", flag: "🇺🇿" },
        { code: "+678", flag: "🇻🇺" }, { code: "+58", flag: "🇻🇪" }, { code: "+84", flag: "🇻🇳" },
        { code: "+681", flag: "🇼🇫" }, { code: "+967", flag: "🇾🇪" }, { code: "+260", flag: "🇿🇲" },
        { code: "+263", flag: "🇿🇼" }
    ];

    indicativos.forEach(item => {
        const option = document.createElement('option');
        option.value = item.code;
        option.textContent = `${item.flag} ${item.code}`;
        document.querySelector('.indicativo_contacto').appendChild(option);
    });
}


/**
 * Função que cria o carrossel para a secção das noticias. Garante que dá para passar as noticias usando o rato, ao clicar nas setas
 * laterais, com o TAB, tanto pressinando nas setas ou nos indicadores, ou então usando as setas para a esquerda e direita do computador.
 * Também garante o scroll para a direita e esquerda nos modos mobile / tablet.
 * @param {None} - Esta função não recebe parâmetros.
 * @returns {void} - Esta função não retorna qualquer valor.
 */
/**
 * Função que cria o carrossel para a secção das noticias. Garante que dá para passar as noticias usando o rato, ao clicar nas setas
 * laterais, com o TAB, tanto pressinando nas setas ou nos indicadores, ou então usando as setas para a esquerda e direita do computador.
 * Também garante o scroll para a direita e esquerda nos modos mobile / tablet.
 * @param {None} - Esta função não recebe parâmetros.
 * @returns {void} - Esta função não retorna qualquer valor.
 */
function carrosselNoticias() {
    const slides = document.querySelectorAll('.carrossel-item');
    const prevBtn = document.querySelector('.carrossel-btn.prev');
    const nextBtn = document.querySelector('.carrossel-btn.next');
    const indicadores = document.querySelectorAll('.indicador');

    let slideAtual = 0;

    const carrosselWrapper = document.querySelector('.carrossel-noticias');
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    showSlide(slideAtual, slides, indicadores);

    document.addEventListener('keydown', function (tecla) {
        const noticiasSection = document.querySelector('.carrossel-noticias');
        const rect = noticiasSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            if (tecla.key === 'ArrowLeft') {
                slideAtual = getNewSlideIndex(slideAtual - 1, slides.length);
                showSlide(slideAtual, slides, indicadores);
            } else if (tecla.key === 'ArrowRight') {
                slideAtual = getNewSlideIndex(slideAtual + 1, slides.length);
                showSlide(slideAtual, slides, indicadores);
            }
        }
    });

    prevBtn.addEventListener('click', () => {
        slideAtual = getNewSlideIndex(slideAtual - 1, slides.length);
        showSlide(slideAtual, slides, indicadores);
    });

    nextBtn.addEventListener('click', () => {
        slideAtual = getNewSlideIndex(slideAtual + 1, slides.length);
        showSlide(slideAtual, slides, indicadores);
    });

    indicadores.forEach((indicador, index) => {
        indicador.addEventListener('click', () => {
            slideAtual = index;
            showSlide(slideAtual, slides, indicadores);
        });
    });

    carrosselWrapper.addEventListener('touchstart', function (touch) {
        touchStartX = touch.changedTouches[0].screenX;
    });

    carrosselWrapper.addEventListener('touchend', function (touch) {
        touchEndX = touch.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                slideAtual = getNewSlideIndex(slideAtual + 1, slides.length);
            } else {
                slideAtual = getNewSlideIndex(slideAtual - 1, slides.length);
            }
            showSlide(slideAtual, slides, indicadores);
        }
    });
}

/**
 * Calcula o novo índice do slide com wrap-around.
 * @param {number} index - O índice proposto.
 * @param {number} totalSlides - Número total de slides.
 * @returns {number} - O novo índice válido.
 */
function getNewSlideIndex(index, totalSlides) {
    if (index < 0) {
        return totalSlides - 1;
    } else if (index >= totalSlides) {
        return 0;
    }
    return index;
}

/**
 * Mostra o slide correspondente ao índice fornecido.
 * @param {number} index - O índice do slide a mostrar.
 * @param {NodeList} slides - Lista de elementos do carrossel.
 * @param {NodeList} indicadores - Lista de elementos indicadores.
 * @returns {void} - Esta função não retorna qualquer valor.
 */
function showSlide(index, slides, indicadores) {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    slides[index].classList.add('active');

    indicadores.forEach((indicador, i) => {
        if (i === index) {
            indicador.classList.add('active');
        } else {
            indicador.classList.remove('active');
        }
    });
}


/**
 * Função que dá "vida" e animação às imagens que estão na secção dos parceiros. Ao passar o rato por cima, ou o TAB no modo de acessibilidade,
 * as imagens ganham um realce que mostra um nome e faz uma animação.
 * @param {None} - Esta função não recebe parâmetros.
 * @returns {void} - Esta função não retorna qualquer valor.
 */
function hoverParceiros() {
    const parceirosBoxes = document.querySelectorAll('.grid-parceiros .grid-box');

    const nomesCompletos = {
        'UAC': 'Universidade dos Açores',
        'HDES': 'Hospital do Divino Espírito Santo',
        'USISM': 'Unidade de Saúde da Ilha de São Miguel',
        'INOVA': 'Instituto de Inovação Tecnológica dos Açores',
    };

    parceirosBoxes.forEach((box) => {
        const img = box.querySelector('img');
        const altText = img.getAttribute('alt') || '';
        const nomeCompleto = nomesCompletos[altText] || altText || 'Parceiro CACA';

        let nomeEl = box.querySelector('.parceiro-nome');
        if (!nomeEl) {
            nomeEl = document.createElement('div');
            nomeEl.className = 'parceiro-nome';
            nomeEl.textContent = nomeCompleto;
            box.appendChild(nomeEl);
        }

        if (!box.querySelector('.parceiro-brilho')) {
            const brilhoEl = document.createElement('div');
            brilhoEl.className = 'parceiro-brilho';
            box.appendChild(brilhoEl);
        }

        box.addEventListener('mouseenter', function () {
            this.classList.add('hover-ativo');
            this.setAttribute('aria-label', `Parceiro: ${nomeCompleto} (em destaque)`);
        });

        box.addEventListener('mouseleave', function () {
            this.classList.remove('hover-ativo');
            this.setAttribute('aria-label', `Parceiro: ${nomeCompleto}`);
        });

        box.addEventListener('focusin', function () {
            this.classList.add('hover-ativo');
        });

        box.addEventListener('focusout', function () {
            this.classList.remove('hover-ativo');
        });

        if (!box.hasAttribute('tabindex')) {
            box.setAttribute('tabindex', '0');
        }
        box.setAttribute('role', 'button');
        box.setAttribute('aria-label', `Parceiro: ${nomeCompleto}`);
    });
}


/**
 * Função simples que vai buscar o elemento com o id "pais" e adiciona as opções de todos os países. Feito aqui para deixar o código HTML mais clean.
 * @param {None} - Esta função não recebe parâmetros.
 * @returns {void} - Esta função não retorna qualquer valor.
 */
function listaPaises() {
    const listaPaisesSimples = [
        { flag: "🇦🇫", name: "Afghanistan" }, { flag: "🇦🇽", name: "Åland Islands" }, { flag: "🇦🇱", name: "Albania" },
        { flag: "🇩🇿", name: "Algeria" }, { flag: "🇦🇸", name: "American Samoa" }, { flag: "🇦🇩", name: "Andorra" },
        { flag: "🇦🇴", name: "Angola" }, { flag: "🇦🇮", name: "Anguilla" }, { flag: "🇦🇶", name: "Antarctica" },
        { flag: "🇦🇬", name: "Antigua and Barbuda" }, { flag: "🇦🇷", name: "Argentina" }, { flag: "🇦🇲", name: "Armenia" },
        { flag: "🇦🇼", name: "Aruba" }, { flag: "🇦🇺", name: "Australia" }, { flag: "🇦🇹", name: "Austria" },
        { flag: "🇦🇿", name: "Azerbaijan" }, { flag: "🇧🇸", name: "Bahamas" }, { flag: "🇧🇭", name: "Bahrain" },
        { flag: "🇧🇩", name: "Bangladesh" }, { flag: "🇧🇧", name: "Barbados" }, { flag: "🇧🇾", name: "Belarus" },
        { flag: "🇧🇪", name: "Belgium" }, { flag: "🇧🇿", name: "Belize" }, { flag: "🇧🇯", name: "Benin" },
        { flag: "🇧🇲", name: "Bermuda" }, { flag: "🇧🇹", name: "Bhutan" }, { flag: "🇧🇴", name: "Bolivia (Plurinational State of)" },
        { flag: "🇧🇶", name: "Bonaire, Sint Eustatius and Saba" }, { flag: "🇧🇦", name: "Bosnia and Herzegovina" },
        { flag: "🇧🇼", name: "Botswana" }, { flag: "🇧🇻", name: "Bouvet Island" }, { flag: "🇧🇷", name: "Brazil" },
        { flag: "🇮🇴", name: "British Indian Ocean Territory" }, { flag: "🇧🇳", name: "Brunei Darussalam" },
        { flag: "🇧🇬", name: "Bulgaria" }, { flag: "🇧🇫", name: "Burkina Faso" }, { flag: "🇧🇮", name: "Burundi" },
        { flag: "🇨🇻", name: "Cabo Verde" }, { flag: "🇰🇭", name: "Cambodia" }, { flag: "🇨🇲", name: "Cameroon" },
        { flag: "🇨🇦", name: "Canada" }, { flag: "🇰🇾", name: "Cayman Islands" }, { flag: "🇨🇫", name: "Central African Republic" },
        { flag: "🇹🇩", name: "Chad" }, { flag: "🇨🇱", name: "Chile" }, { flag: "🇨🇳", name: "China" },
        { flag: "🇨🇽", name: "Christmas Island" }, { flag: "🇨🇨", name: "Cocos (Keeling) Islands" },
        { flag: "🇨🇴", name: "Colombia" }, { flag: "🇰🇲", name: "Comoros" }, { flag: "🇨🇬", name: "Congo" },
        { flag: "🇨🇩", name: "Congo (Democratic Republic of the)" }, { flag: "🇨🇰", name: "Cook Islands" },
        { flag: "🇨🇷", name: "Costa Rica" }, { flag: "🇨🇮", name: "Côte d'Ivoire" }, { flag: "🇭🇷", name: "Croatia" },
        { flag: "🇨🇺", name: "Cuba" }, { flag: "🇨🇼", name: "Curaçao" }, { flag: "🇨🇾", name: "Cyprus" },
        { flag: "🇨🇿", name: "Czechia" }, { flag: "🇩🇰", name: "Denmark" }, { flag: "🇩🇯", name: "Djibouti" },
        { flag: "🇩🇲", name: "Dominica" }, { flag: "🇩🇴", name: "Dominican Republic" }, { flag: "🇪🇨", name: "Ecuador" },
        { flag: "🇪🇬", name: "Egypt" }, { flag: "🇸🇻", name: "El Salvador" }, { flag: "🇬🇶", name: "Equatorial Guinea" },
        { flag: "🇪🇷", name: "Eritrea" }, { flag: "🇪🇪", name: "Estonia" }, { flag: "🇸🇿", name: "Eswatini" },
        { flag: "🇪🇹", name: "Ethiopia" }, { flag: "🇫🇰", name: "Falkland Islands (Malvinas)" }, { flag: "🇫🇴", name: "Faroe Islands" },
        { flag: "🇫🇯", name: "Fiji" }, { flag: "🇫🇮", name: "Finland" }, { flag: "🇫🇷", name: "France" },
        { flag: "🇬🇫", name: "French Guiana" }, { flag: "🇵🇫", name: "French Polynesia" }, { flag: "🇹🇫", name: "French Southern Territories" },
        { flag: "🇬🇦", name: "Gabon" }, { flag: "🇬🇲", name: "Gambia" }, { flag: "🇬🇪", name: "Georgia" },
        { flag: "🇩🇪", name: "Germany" }, { flag: "🇬🇭", name: "Ghana" }, { flag: "🇬🇮", name: "Gibraltar" },
        { flag: "🇬🇷", name: "Greece" }, { flag: "🇬🇱", name: "Greenland" }, { flag: "🇬🇩", name: "Grenada" },
        { flag: "🇬🇵", name: "Guadeloupe" }, { flag: "🇬🇺", name: "Guam" }, { flag: "🇬🇹", name: "Guatemala" },
        { flag: "🇬🇬", name: "Guernsey" }, { flag: "🇬🇳", name: "Guinea" }, { flag: "🇬🇼", name: "Guinea-Bissau" },
        { flag: "🇬🇾", name: "Guyana" }, { flag: "🇭🇹", name: "Haiti" }, { flag: "🇭🇲", name: "Heard Island and McDonald Islands" },
        { flag: "⛑️", name: "Holy See" }, { flag: "🇭🇳", name: "Honduras" }, { flag: "🇭🇰", name: "Hong Kong" },
        { flag: "🇭🇺", name: "Hungary" }, { flag: "🇮🇸", name: "Iceland" }, { flag: "🇮🇳", name: "India" },
        { flag: "🇮🇩", name: "Indonesia" }, { flag: "🇮🇷", name: "Iran (Islamic Republic of)" }, { flag: "🇮🇶", name: "Iraq" },
        { flag: "🇮🇪", name: "Ireland" }, { flag: "🇮🇲", name: "Isle of Man" }, { flag: "🇮🇱", name: "Israel" },
        { flag: "🇮🇹", name: "Italy" }, { flag: "🇯🇲", name: "Jamaica" }, { flag: "🇯🇵", name: "Japan" },
        { flag: "🇯🇪", name: "Jersey" }, { flag: "🇯🇴", name: "Jordan" }, { flag: "🇰🇿", name: "Kazakhstan" },
        { flag: "🇰🇪", name: "Kenya" }, { flag: "🇰🇮", name: "Kiribati" }, { flag: "🇰🇵", name: "Korea (Democratic People's Republic of)" },
        { flag: "🇰🇷", name: "Korea (Republic of)" }, { flag: "🇰🇼", name: "Kuwait" }, { flag: "🇰🇬", name: "Kyrgyzstan" },
        { flag: "🇱🇦", name: "Lao People's Democratic Republic" }, { flag: "🇱🇻", name: "Latvia" }, { flag: "🇱🇧", name: "Lebanon" },
        { flag: "🇱🇸", name: "Lesotho" }, { flag: "🇱🇷", name: "Liberia" }, { flag: "🇱🇾", name: "Libya" },
        { flag: "🇱🇮", name: "Liechtenstein" }, { flag: "🇱🇹", name: "Lithuania" }, { flag: "🇱🇺", name: "Luxembourg" },
        { flag: "🇲🇴", name: "Macao" }, { flag: "🇲🇬", name: "Madagascar" }, { flag: "🇲🇼", name: "Malawi" },
        { flag: "🇲🇾", name: "Malaysia" }, { flag: "🇲🇻", name: "Maldives" }, { flag: "🇲🇱", name: "Mali" },
        { flag: "🇲🇹", name: "Malta" }, { flag: "🇲🇭", name: "Marshall Islands" }, { flag: "🇲🇶", name: "Martinique" },
        { flag: "🇲🇷", name: "Mauritania" }, { flag: "🇲🇺", name: "Mauritius" }, { flag: "🇾🇹", name: "Mayotte" },
        { flag: "🇲🇽", name: "Mexico" }, { flag: "🇫🇲", name: "Micronesia (Federated States of)" }, { flag: "🇲🇩", name: "Moldova (Republic of)" },
        { flag: "🇲🇨", name: "Monaco" }, { flag: "🇲🇳", name: "Mongolia" }, { flag: "🇲🇪", name: "Montenegro" },
        { flag: "🇲🇸", name: "Montserrat" }, { flag: "🇲🇦", name: "Morocco" }, { flag: "🇲🇿", name: "Mozambique" },
        { flag: "🇲🇲", name: "Myanmar" }, { flag: "🇳🇦", name: "Namibia" }, { flag: "🇳🇷", name: "Nauru" },
        { flag: "🇳🇵", name: "Nepal" }, { flag: "🇳🇱", name: "Netherlands" }, { flag: "🇳🇨", name: "New Caledonia" },
        { flag: "🇳🇿", name: "New Zealand" }, { flag: "🇳🇮", name: "Nicaragua" }, { flag: "🇳🇪", name: "Niger" },
        { flag: "🇳🇬", name: "Nigeria" }, { flag: "🇳🇺", name: "Niue" }, { flag: "🇳🇫", name: "Norfolk Island" },
        { flag: "🇲🇰", name: "North Macedonia" }, { flag: "🇲🇵", name: "Northern Mariana Islands" }, { flag: "🇳🇴", name: "Norway" },
        { flag: "🇴🇲", name: "Oman" }, { flag: "🇵🇰", name: "Pakistan" }, { flag: "🇵🇼", name: "Palau" },
        { flag: "🇵🇸", name: "Palestine, State of" }, { flag: "🇵🇦", name: "Panama" }, { flag: "🇵🇬", name: "Papua New Guinea" },
        { flag: "🇵🇾", name: "Paraguay" }, { flag: "🇵🇪", name: "Peru" }, { flag: "🇵🇭", name: "Philippines" },
        { flag: "🇵🇳", name: "Pitcairn" }, { flag: "🇵🇱", name: "Poland" }, { flag: "🇵🇹", name: "Portugal" },
        { flag: "🇵🇷", name: "Puerto Rico" }, { flag: "🇶🇦", name: "Qatar" }, { flag: "🇷🇪", name: "Réunion" },
        { flag: "🇷🇴", name: "Romania" }, { flag: "🇷🇺", name: "Russian Federation" }, { flag: "🇷🇼", name: "Rwanda" },
        { flag: "🇧🇱", name: "Saint Barthélemy" }, { flag: "🇸🇭", name: "Saint Helena, Ascension and Tristan da Cunha" },
        { flag: "🇰🇳", name: "Saint Kitts and Nevis" }, { flag: "🇱🇨", name: "Saint Lucia" }, { flag: "🇲🇫", name: "Saint Martin (French part)" },
        { flag: "🇵🇲", name: "Saint Pierre and Miquelon" }, { flag: "🇻🇨", name: "Saint Vincent and the Grenadines" },
        { flag: "🇼🇸", name: "Samoa" }, { flag: "🇸🇲", name: "San Marino" }, { flag: "🇸🇹", name: "Sao Tome and Principe" },
        { flag: "🇸🇦", name: "Saudi Arabia" }, { flag: "🇸🇳", name: "Senegal" }, { flag: "🇷🇸", name: "Serbia" },
        { flag: "🇸🇨", name: "Seychelles" }, { flag: "🇸🇱", name: "Sierra Leone" }, { flag: "🇸🇬", name: "Singapore" },
        { flag: "🇸🇽", name: "Sint Maarten (Dutch part)" }, { flag: "🇸🇰", name: "Slovakia" }, { flag: "🇸🇮", name: "Slovenia" },
        { flag: "🇸🇧", name: "Solomon Islands" }, { flag: "🇸🇴", name: "Somalia" }, { flag: "🇿🇦", name: "South Africa" },
        { flag: "🇬🇸", name: "South Georgia and the South Sandwich Islands" }, { flag: "🇸🇸", name: "South Sudan" },
        { flag: "🇪🇸", name: "Spain" }, { flag: "🇱🇰", name: "Sri Lanka" }, { flag: "🇸🇩", name: "Sudan" },
        { flag: "🇸🇷", name: "Suriname" }, { flag: "🇸🇯", name: "Svalbard and Jan Mayen" }, { flag: "🇸🇪", name: "Sweden" },
        { flag: "🇨🇭", name: "Switzerland" }, { flag: "🇸🇾", name: "Syrian Arab Republic" }, { flag: "🇹🇼", name: "Taiwan (Province of China)" },
        { flag: "🇹🇯", name: "Tajikistan" }, { flag: "🇹🇿", name: "Tanzania, United Republic of" }, { flag: "🇹🇭", name: "Thailand" },
        { flag: "🇹🇱", name: "Timor-Leste" }, { flag: "🇹🇬", name: "Togo" }, { flag: "🇹🇰", name: "Tokelau" },
        { flag: "🇹🇴", name: "Tonga" }, { flag: "🇹🇹", name: "Trinidad and Tobago" }, { flag: "🇹🇳", name: "Tunisia" },
        { flag: "🇹🇷", name: "Turkey" }, { flag: "🇹🇲", name: "Turkmenistan" }, { flag: "🇹🇨", name: "Turks and Caicos Islands" },
        { flag: "🇹🇻", name: "Tuvalu" }, { flag: "🇺🇬", name: "Uganda" }, { flag: "🇺🇦", name: "Ukraine" },
        { flag: "🇦🇪", name: "United Arab Emirates" }, { flag: "🇬🇧", name: "United Kingdom of Great Britain and Northern Ireland" },
        { flag: "🇺🇸", name: "United States of America" }, { flag: "🇺🇲", name: "United States Minor Outlying Islands" },
        { flag: "🇺🇾", name: "Uruguay" }, { flag: "🇺🇿", name: "Uzbekistan" }, { flag: "678", name: "Vanuatu" },
        { flag: "🇻🇪", name: "Venezuela (Bolivarian Republic of)" }, { flag: "🇻🇳", name: "Viet Nam" },
        { flag: "🇻🇬", name: "Virgin Islands (British)" }, { flag: "🇻🇮", name: "Virgin Islands (U.S.)" },
        { flag: "🇼🇫", name: "Wallis and Futuna" }, { flag: "🇪🇭", name: "Western Sahara" }, { flag: "🇾🇪", name: "Yemen" },
        { flag: "🇿🇲", name: "Zambia" }, { flag: "🇿🇿", name: "Zimbabwe" }
    ];

    listaPaisesSimples.forEach(country => {
        const option = document.createElement('option');
        option.value = country.name;
        option.textContent = `${country.flag} ${country.name}`;
        document.getElementById('pais').appendChild(option);
    });
};


/**
 * Função que adiciona mais texto na secção das areas de investigação. Inicialmente o div com o texto extra está hidden e esta função vai alterando a sua visibilidade apenas.
 * @param {None} - Esta função não recebe parâmetros.
 * @returns {void} - Esta função não retorna qualquer valor.
 */
function expandirInvestigacao() {
    document.querySelectorAll('.grid-box-investigacao a.saiba-mais').forEach((link) => {
        const textoExtra = link.closest('.grid-box-investigacao').querySelector('.texto-extra');

        link.addEventListener('click', function () {
            if (textoExtra.style.display === 'none') {
                textoExtra.style.display = 'block';
                link.textContent = 'Mostrar menos';
            } else {
                textoExtra.style.display = 'none';
                link.textContent = 'Saiba mais';
            }
        });
    });
}


/**
 * Altera o conteúdo da textarea 'mensagem' com base na 'opção' selecionada no assunto.
 * @param {None} - Esta função não recebe parâmetros.
 * @returns {void} - Esta função não retorna qualquer valor.
 */
function configurarMensagensPredefinidas() {
    const mensagens = {
        "default": "",
        "opt1": "Solicito informações sobre o Centro Académico Clínico dos Açores, nomeadamente sobre os projetos em curso na área de investigação ",
        "opt2": "Venho apresentar uma proposta de parceria/colaboração com o Centro Académico Clínico dos Açores. Estou disponível para uma reunião. ",
        "opt3": "Venho manifestar interesse no recrutamento para ",
        "opt4": "Manifesto interesse em participar no evento/seminário ",
        "opt5": "Apresento a seguinte sugestão/reclamação: ",
        "opt6": ""
    };

    document.getElementById('assunto_contacto').addEventListener('change', function () {
        document.getElementById('mensagem_contacto').value = mensagens[this.value];
    });
}


/**
 * Função que gera o objeto DNA em 3D, utilizando o Three.js.
 * Apenas vai buscar o elemento que está preparado e estilizado no código HTML e CSS, e gera lá dentro o objeto.
 * @param {None} - Esta função não recebe parâmetros.
 * @returns {void} - Esta função não retorna qualquer valor.
 */
function initDNA3D() {
    const components = setupDNA3D();
    if (!components) return;

    criarEstruturaDNA(components);

    components.scene.add(components.dnaGroup);

    iniciarAnimacaoDNA(components);

    configurarRedimensionamentoDNA(components);
}


/**
 * Função que cria o gráfico de produção académica.
 * Apenas vai buscar o div que está preparado e estilizado no código HTML e CSS, e gera lá dentro o objeto.
 * @param {None} - Esta função não recebe parâmetros.
 * @returns {void} - Esta função não retorna qualquer valor.
 */
function criarGraficoProducao() {
    const { tipos, dadosAgrupados, series, alturaTotal } = processarDadosGrafico();

    const { width, marginTop, marginRight, marginBottom, marginLeft, x, y, color } = definirDimensoesEEscalas(series, dadosAgrupados, tipos, alturaTotal);

    const svg = criarSVG({ width, marginTop, marginRight, marginBottom, marginLeft }, alturaTotal);

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

    [
        { axis: d3.axisTop(x).ticks(4), transform: `translate(0,${marginTop})`, classe: "eixo-x" },
        { axis: d3.axisLeft(y).tickSizeOuter(0), transform: `translate(${marginLeft},0)`, classe: "eixo-y" },
    ].forEach(e => {
        svg.append("g")
            .attr("transform", e.transform)
            .call(e.axis)
            .call(g => g.selectAll(".domain").remove())
            .call(g => g.selectAll(".tick text")
                .attr("font-size", "14px")
                .attr("font-weight", "500"));
    });

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
