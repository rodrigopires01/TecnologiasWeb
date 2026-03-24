/**
 * Verifica se um email é válido com base numa expressão regular.
 * @param {string} email - O endereço de e-mail a validar.
 * @returns {boolean} - Retorna true se o e-mail for válido, false caso contrário.
 */
export function eEmailValido(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,3}$/;
    return emailRegex.test(email.trim());
}

/**
 * Valida os dados da subscrição da newsletter.
 * @param {string} email - O e-mail introduzido pelo utilizador.
 * @param {string} pais - O valor selecionado no dropdown de países.
 * @returns {Object} - Objeto contendo o booleano 'valido' e o array de strings 'erros'.
 */
export function validarDadosNewsletter(email, pais) {
    const erros = [];
    
    if (email === '') {
        erros.push('Por favor insira um e-mail!');
    } else if (!eEmailValido(email)) {
        erros.push('E-mail inválido!');
    }
    
    if (pais === 'default' || pais === 'Selecione o seu pais.') {
        erros.push('Por favor escolha um país!');
    }
    
    return {
        valido: erros.length === 0,
        erros: erros
    };
}

/**
 * Valida os campos do formulário de contacto.
 * @param {Object} dados - Objeto contendo nome, email, assunto e mensagem.
 * @param {string} dados.nome - Nome do utilizador.
 * @param {string} dados.email - E-mail de contacto.
 * @param {string} dados.assunto - Assunto da mensagem.
 * @param {string} dados.mensagem - Conteúdo da mensagem.
 * @returns {Object} - Objeto contendo o booleano 'valido' e um objeto 'erros' com as mensagens por campo.
 */
export function validarDadosContacto(dados) {
    const erros = {};
    
    if (dados.nome === '') erros.nome = 'Nome é obrigatório';

    if (dados.telemovel === '') erros.telemovel = 'Número de telemovel é obrigatório';
    
    if (dados.email === '') {
        erros.email = 'Email é obrigatório';
    } else if (!eEmailValido(dados.email)) {
        erros.email = 'Email inválido (precisa ter @ e .)';
    }
    
    if (dados.assunto === 'default') erros.assunto = 'Assunto é obrigatório';
    if (dados.mensagem === '') erros.mensagem = 'Mensagem é obrigatória';
    
    return {
        valido: Object.keys(erros).length === 0,
        erros: erros
    };
}
