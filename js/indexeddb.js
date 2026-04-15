/**
 * indexeddb.js
 * Gerencia todas as operações de IndexedDB para a aplicação CACA
 */

class DatabaseCACA {
    constructor() {
        this.db = null;
        this.dbName = "CACA_DB";
        this.dbVersion = 1;
    }

    /**
     * Inicializa a conexão com a base de dados
     * @returns {Promise} Resolve quando a BD estiver pronta
     */
    async iniciarBD() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => {
                console.error("Erro ao abrir BD:", request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                console.log("Base de dados aberta com sucesso");
                resolve(this.db);
            };

            // Criar/atualizar estrutura da BD
            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                this.criarObjectStores();
            };
        });
    }

    /**
     * Cria os Object Stores (tabelas) da BD
     */
    criarObjectStores() {
        // Object Store para Eventos
        if (!this.db.objectStoreNames.contains("eventos")) {
            const eventoStore = this.db.createObjectStore("eventos", {
                keyPath: "id",
                autoIncrement: true
            });
            eventoStore.createIndex("data", "data", { unique: false });
            eventoStore.createIndex("titulo", "titulo", { unique: false });
            console.log("Object Store 'eventos' criado");
        }

        // Object Store para Subscritores da Newsletter
        if (!this.db.objectStoreNames.contains("subscritores")) {
            const subsStore = this.db.createObjectStore("subscritores", {
                keyPath: "email"
            });
            subsStore.createIndex("pais", "pais", { unique: false });
            subsStore.createIndex("dataSubscricao", "dataSubscricao", { unique: false });
            console.log("Object Store 'subscritores' criado");
        }
    }

    // ===== OPERAÇÕES COM EVENTOS =====

    /**
     * Adiciona um novo evento à BD
     * @param {Object} evento - Objeto com dados do evento
     * @returns {Promise} Resolve com o ID do evento criado
     */
    async adicionarEvento(evento) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["eventos"], "readwrite");
            const eventoStore = transaction.objectStore("eventos");

            const request = eventoStore.add({
                titulo: evento.titulo,
                descricao: evento.descricao,
                data: evento.data,
                hora: evento.hora,
                local: evento.local,
                dataCriacao: new Date().toISOString()
            });

            request.onsuccess = () => {
                console.log("Evento adicionado com ID:", request.result);
                resolve(request.result);
            };

            request.onerror = () => {
                console.error("Erro ao adicionar evento:", request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Obtém todos os eventos da BD
     * @returns {Promise} Resolve com array de eventos
     */
    async obterTodosEventos() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["eventos"], "readonly");
            const eventoStore = transaction.objectStore("eventos");
            const request = eventoStore.getAll();

            request.onsuccess = () => {
                // Ordena por data (ascendente)
                const eventos = request.result.sort((a, b) => 
                    new Date(a.data) - new Date(b.data)
                );
                resolve(eventos);
            };

            request.onerror = () => {
                console.error("Erro ao obter eventos:", request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Obtém um evento específico pelo ID
     * @param {number} id - ID do evento
     * @returns {Promise} Resolve com o evento
     */
    async obterEvento(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["eventos"], "readonly");
            const eventoStore = transaction.objectStore("eventos");
            const request = eventoStore.get(id);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                console.error("Erro ao obter evento:", request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Atualiza um evento existente
     * @param {Object} evento - Objeto com dados atualizados (deve incluir id)
     * @returns {Promise} Resolve quando atualizado
     */
    async atualizarEvento(evento) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["eventos"], "readwrite");
            const eventoStore = transaction.objectStore("eventos");

            const request = eventoStore.put({
                id: evento.id,
                titulo: evento.titulo,
                descricao: evento.descricao,
                data: evento.data,
                hora: evento.hora,
                local: evento.local,
                dataAtualizacao: new Date().toISOString()
            });

            request.onsuccess = () => {
                console.log("Evento atualizado");
                resolve();
            };

            request.onerror = () => {
                console.error("Erro ao atualizar evento:", request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Remove um evento
     * @param {number} id - ID do evento
     * @returns {Promise} Resolve quando removido
     */
    async removerEvento(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["eventos"], "readwrite");
            const eventoStore = transaction.objectStore("eventos");
            const request = eventoStore.delete(id);

            request.onsuccess = () => {
                console.log("Evento removido");
                resolve();
            };

            request.onerror = () => {
                console.error("Erro ao remover evento:", request.error);
                reject(request.error);
            };
        });
    }
}

// Criar instância global
const db = new DatabaseCACA();