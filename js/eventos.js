let eventoEmEdicao = null; // Rastreia qual evento está sendo editado

/**
 * Inicializa a secção de eventos
 */
async function inicializarSecaoEventos() {
    await validarFormularioEventos();
    await carregarListaEventos();
    configurarEventListenersFormulario();
}

async function carregarListaEventos() {
    try {
        const eventos = await db.obterTodosEventos();
        const listaContainer = document.getElementById('lista-eventos');

        if (eventos.length === 0) {
            listaContainer.innerHTML = '<p class="sem-eventos">Nenhum evento registado ainda.</p>';
            return;
        }

        let htmlEventos = '';
        eventos.forEach(evento => {
            const dataFormatada = new Date(evento.data).toLocaleDateString('pt-PT');
            htmlEventos += `
            <div class="evento-card" data-id="${evento.id}">
                <div class="evento-header">
                    <h3>${evento.titulo}</h3>
                    <div class="evento-actions">
                        <button class="btn-editar" data-id="${evento.id}" aria-label="Editar evento">Editar</button>
                        <button class="btn-remover" data-id="${evento.id}" aria-label="Remover evento">Remover </button>
                    </div>
                </div>
                
                <div class="evento-info">
                    <p><strong> Data:</strong> ${dataFormatada}</p>
                    <p><strong> Hora:</strong> ${evento.hora}</p>
                    <p><strong> Local:</strong> ${evento.cidade}, ${evento.local}</p>
                    <p><strong> Descrição:</strong> ${evento.descricao}</p>
                </div>
            </div>
            `;
        });

        listaContainer.innerHTML = htmlEventos;
        configurarBotoesEventos();

    } catch (erro) {
        console.error("Erro ao carregar eventos:", erro);
        mostrarToast("Erro ao carregar eventos", "error");
    }
}

/**
 * Configura os event listeners do formulário
 */
function configurarEventListenersFormulario() {
    const formulario = document.getElementById('formulario-eventos');
    
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validar campos
        if (!validarFormularioEventos()) {
            return;
        }

        const dados = {
            titulo: document.getElementById('evento-titulo').value.trim(),
            descricao: document.getElementById('evento-descricao').value.trim(),
            data: document.getElementById('evento-data').value,
            hora: document.getElementById('evento-hora').value,
            cidade: document.getElementById('evento-cidade').value.trim(),
            local: document.getElementById('evento-local').value.trim()
        };

        try {
            if (eventoEmEdicao) {
                // Modo edição
                dados.id = eventoEmEdicao;
                await db.atualizarEvento(dados);
                document.getElementById('btn-submit-evento').textContent = 'Adicionar Evento';
                //mostrarToast("Evento atualizado com sucesso!", "success");
                eventoEmEdicao = null;
                document.getElementById('titulo-formulario').textContent = "Adicionar Novo Evento";
                document.getElementById('btn-cancelar-evento').style.display = 'none';
            } else {
                // Modo adição
                await db.adicionarEvento(dados);
                //mostrarToast("Evento adicionado com sucesso!", "success");
            }

            formulario.reset();
            await carregarListaEventos();

        } catch (erro) {
            console.error("Erro ao salvar evento:", erro);
            //mostrarToast("Erro ao salvar evento", "error");
        }
    });

    // Botão cancelar edição
    document.getElementById('btn-cancelar-evento').addEventListener('click', () => {
        eventoEmEdicao = null;
        formulario.reset();
        document.getElementById('titulo-formulario').textContent = "Adicionar Novo Evento";
        document.getElementById('btn-cancelar-evento').style.display = 'none';
        document.getElementById('btn-submit-evento').textContent = 'Adicionar Evento';
    });
}

/**
 * Configura os botões de editar e remover dos eventos
 */
function configurarBotoesEventos() {
    // Botões de editar
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = parseInt(e.target.dataset.id);
            await carregarEventoParaEdicao(id);
        });
    });

    // Botões de remover
    document.querySelectorAll('.btn-remover').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = parseInt(e.target.dataset.id);
            if (confirm('Tem a certeza que deseja remover este evento?')) {
                try {
                    await db.removerEvento(id);
                    //mostrarToast("Evento removido com sucesso!", "success");
                    await carregarListaEventos();
                } catch (erro) {
                    console.error("Erro ao remover evento:", erro);
                    mostrarToast("Erro ao remover evento", "error");
                }
            }
        });
    });
}

/**
 * Carrega um evento nos campos do formulário para edição
 */
async function carregarEventoParaEdicao(id) {
    try {
        const evento = await db.obterEvento(id);

        document.getElementById('evento-titulo').value = evento.titulo;
        document.getElementById('evento-descricao').value = evento.descricao;
        document.getElementById('evento-data').value = evento.data;
        document.getElementById('evento-hora').value = evento.hora;
        document.getElementById('evento-cidade').value = evento.cidade;
        document.getElementById('evento-local').value = evento.local;

        eventoEmEdicao = id;
        document.getElementById('titulo-formulario').textContent = "Editar Evento";
        document.getElementById('btn-cancelar-evento').style.display = 'inline-block';
        document.getElementById('btn-submit-evento').textContent = 'Atualizar Evento';

        // Scroll para o formulário
        document.getElementById('formulario-eventos').scrollIntoView({ behavior: 'smooth' });

    } catch (erro) {
        console.error("Erro ao carregar evento:", erro);
        mostrarToast("Erro ao carregar evento", "error");
    }
}

/**
 * Valida o formulário de eventos
 */
function validarFormularioEventos() {
    let valido = true;

    // Limpar erros anteriores
    document.querySelectorAll('.erro-validacao').forEach(el => el.textContent = '');

    const titulo = document.getElementById('evento-titulo').value.trim();
    const descricao = document.getElementById('evento-descricao').value.trim();
    const data = document.getElementById('evento-data').value;
    const hora = document.getElementById('evento-hora').value;
    const cidade = document.getElementById('evento-cidade').value.trim();
    const local = document.getElementById('evento-local').value.trim();

    if (!titulo || !descricao || !cidade || !local || !data || !hora) {
        document.getElementById('erro-evento').textContent = 'Todos os campos são obrigatórios';
        valido = false;
    };

    return valido;
}