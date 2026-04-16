/**
 * Adiciona um novo subscritor à newsletter
 * @param {string} email - Email do subscritor
 * @param {string} pais - País do subscritor
 * @returns {Promise} Resolve quando adicionado
 */
export async function adicionarSubscritor(email, pais) {
    return new Promise((resolve, reject) => {
        const transaction = db.db.transaction(["subscritores"], "readwrite");
        const store = transaction.objectStore("subscritores");
        
        const request = store.add({
            email: email,
            pais: pais,
            dataSubscricao: new Date().toISOString()
        });
        
        request.onsuccess = () => {
            console.log("Subscritor adicionado:", email);
            resolve();
        };
        
        request.onerror = () => {
            console.error("Erro ao adicionar subscritor:", request.error);
            reject(request.error);
        };
    });
}

/**
 * Verifica se um email já está subscrito
 * @param {string} email - Email a verificar
 * @returns {Promise<boolean>} True se já existir
 */
export async function verificarEmailSubscrito(email) {
    return new Promise((resolve, reject) => {
        const transaction = db.db.transaction(["subscritores"], "readonly");
        const store = transaction.objectStore("subscritores");
        const request = store.get(email);
        
        request.onsuccess = () => {
            resolve(request.result !== undefined);
        };
        
        request.onerror = () => {
            console.error("Erro ao verificar email:", request.error);
            reject(request.error);
        };
    });
}
