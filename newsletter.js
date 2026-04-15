import { validarDadosNewsletter } from './validacoes.js';

export function configurarNewsletter() {
    const form = document.querySelector('.newsletter_form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Aqui pegamos no email e pais como o teu colega disse
        const dados = {
            email: document.querySelector('.email_newsletter').value,
            pais: document.getElementById('pais').value,
            dataSubscricao: new Date().toISOString()
        };

        // Validação (já feita pelos teus colegas)
        const resultado = validarDadosNewsletter(dados);

        if (resultado.valido) {
            try {
                // 1. Check de duplicados (o que o Rodrigo pediu)
                const existe = await window.db.verificarEmailExiste(dados.email);
                
                if (existe) {
                    alert("Email já está subscrito no newsletter");
                    return;
                }

                // 2. Se não existe, guarda na tabela
                await window.db.adicionarSubscritor(dados);
                alert("Subscrição guardada com sucesso!");
                form.reset();

            } catch (erro) {
                console.error("Erro ao processar newsletter:", erro);
            }
        } else {
            alert(resultado.erros.email || "Verifique os dados.");
        }
    });
}