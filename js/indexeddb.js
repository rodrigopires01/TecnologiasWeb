/**
 * indexeddb.js
 * Gerencia todas as operações de IndexedDB para a aplicação CACA
 */

class DatabaseCACA {
    constructor() {
        this.db = null;
        this.dbName = "CACA_DB";
        this.dbVersion = 5; 
    }

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

            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                this.criarObjectStores();
            };
        });
    }

    criarObjectStores() {
        if (!this.db.objectStoreNames.contains("eventos")) {
            const eventoStore = this.db.createObjectStore("eventos", {
                keyPath: "id",
                autoIncrement: true
            });
            eventoStore.createIndex("data", "data", { unique: false });
            eventoStore.createIndex("titulo", "titulo", { unique: false });
        }

        if (!this.db.objectStoreNames.contains("newsletter")) {
            this.db.createObjectStore("newsletter", { 
                keyPath: "email" 
            });
        }
    }

    // --- MÉTODOS DE EVENTOS ---
    async obterTodosEventos() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["eventos"], "readonly");
            const store = transaction.objectStore("eventos");
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async adicionarEvento(evento) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["eventos"], "readwrite");
            const store = transaction.objectStore("eventos");
            const request = store.add(evento);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    // Este método é essencial para o formulário de edição funcionar!
    async atualizarEvento(evento) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["eventos"], "readwrite");
            const store = transaction.objectStore("eventos");
            const request = store.put(evento); // O put atualiza se o ID existir
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async removerEvento(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["eventos"], "readwrite");
            const store = transaction.objectStore("eventos");
            const request = store.delete(Number(id)); // Garante que o ID é número
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    // --- MÉTODOS DA NEWSLETTER ---
    async verificarEmailExiste(email) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["newsletter"], "readonly");
            const store = transaction.objectStore("newsletter");
            const request = store.get(email);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async adicionarSubscritor(dados) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["newsletter"], "readwrite");
            const store = transaction.objectStore("newsletter");
            const request = store.add(dados);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
}

const db = new DatabaseCACA();
window.db = db;