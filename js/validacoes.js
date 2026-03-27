/**
 * Verifica se um email é válido com base numa expressão regular.
 * @param {string} email - O endereço de e-mail a validar.
 * @returns {boolean} - Retorna true se o e-mail for válido, false caso contrário.
 */
function eEmailValido(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,3}$/;
    return emailRegex.test(email.trim());
}


/**
 * Valida o número de telemóvel com base no indicativo do país selecionado.
 * @param {string} telemovel - O número de telemóvel a validar.
 * @param {string} indicativo - O código do país.
 * @returns {Object} - Objeto contendo o booleano 'valido' e a mensagem de erro.
 */
function validarTelemovelPorPais(telemovel, indicativo) {
    
    const apenasNumeros = /^\d+$/.test(telemovel);
    
    if (!apenasNumeros) {
        return {valido: false, mensagem: 'Insira apenas números (sem espaços, letras ou caracteres especiais)!'};
    }
    
    const validacoes = {
        '+351': /^9[1236][0-9]{7}$/,  // Portugal   - 9 dígitos
        '+33': /^[67][0-9]{8}$/,      // França     - 9 dígitos
        '+44': /^7[0-9]{9}$/,         // Inglaterra - 10 dígitos
        '+34': /^[67][0-9]{8}$/,      // Espanha    - 9 dígitos
        '+49': /^1[5-7][0-9]{8}$/     // Alemanha   - 10 dígitos
    };
    
    const pattern = validacoes[indicativo];

    if (pattern) {
        if (!pattern.test(telemovel)) {
            const mensagens = {
                '+351': 'Número 🇵🇹 inválido. Deve ter 9 dígitos e começar com 9 (ex: 912345678)',
                '+33': 'Número 🇫🇷 inválido. Deve ter 9 dígitos e começar com 6 ou 7 (ex: 612345678)',
                '+44': 'Número 🇬🇧 inválido. Deve ter 10 dígitos e começar com 7 (ex: 7123456789)',
                '+34': 'Número 🇪🇸 inválido. Deve ter 9 dígitos e começar com 6 ou 7 (ex: 612345678)',
                '+49': 'Número 🇩🇪 inválido. Deve ter 10 dígitos e começar com 15, 16 ou 17 (ex: 1512345678)'};
                
            return { valido: false, mensagem: mensagens[indicativo] };
        }
        return {valido: true, mensagem: ''};
    }

    if (telemovel.length < 6) {
        return {valido: false, mensagem: 'Número inválido. Deve ter pelo menos 6 dígitos.'};
    }
    
    return {valido: true, mensagem: ''};
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
 * @param {string} dados.telemovel - Número de telemóvel.
 * @param {string} dados.indicativo - Código do país do telemóvel.
 * @param {string} dados.assunto - Assunto da mensagem.
 * @param {string} dados.mensagem - Conteúdo da mensagem.
 * @returns {Object} - Objeto contendo o booleano 'valido' e um objeto 'erros' com as mensagens por campo.
 */
export function validarDadosContacto(dados) {
    const erros = {};
    
    if (dados.nome === '') erros.nome = 'Nome é obrigatório';
    
    if (dados.email === '') {
        erros.email = 'Email é obrigatório';
    } else if (!eEmailValido(dados.email)) {
        erros.email = 'Email inválido (precisa ter @ e .)';
    }

    if (dados.telemovel === '') {
        erros.telemovel = 'Número de telemóvel é obrigatório';
    } else {
        if (!validarTelemovelPorPais(dados.telemovel, dados.indicativo).valido) {
            erros.telemovel = validarTelemovelPorPais(dados.telemovel, dados.indicativo).mensagem;
        }
    }
    
    if (dados.assunto === 'default') erros.assunto = 'Assunto é obrigatório';
    if (dados.mensagem === '') erros.mensagem = 'Mensagem é obrigatória';
    
    return {
        valido: Object.keys(erros).length === 0,
        erros: erros
    };
}
