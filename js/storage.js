const STORAGE_CLIENTES_KEY = "campanha-clientes";
const STORAGE_STATUS_KEY = "campanha-status";

function salvarClientes(clientes) {
    localStorage.setItem(
        STORAGE_CLIENTES_KEY,
        JSON.stringify(clientes)
    );
}

function recuperarClientes() {
    const dados = localStorage.getItem(STORAGE_CLIENTES_KEY);
    return dados ? JSON.parse(dados) : [];
}

function obterStatusSalvos() {
    const dados = localStorage.getItem(STORAGE_STATUS_KEY);
    return dados ? JSON.parse(dados) : {};
}

function salvarStatusSalvos(status) {
    localStorage.setItem(
        STORAGE_STATUS_KEY,
        JSON.stringify(status)
    );
}

/**
 * Retorna o status de um cliente.
 */
function recuperarStatus(id) {

    const status = obterStatusSalvos();

    return status[id] || "Sem contato";

}

/**
 * Salva o status de um cliente.
 */
function atualizarStatus(id, novoStatus) {

    const status = obterStatusSalvos();

    status[id] = novoStatus;

    salvarStatusSalvos(status);

}