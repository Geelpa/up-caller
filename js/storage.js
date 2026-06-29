const STORAGE_KEY = "campanha-upgrade-status";

/**
 * Retorna todos os status salvos.
 */
function obterStatusSalvos() {

    const dados = localStorage.getItem(STORAGE_KEY);

    return dados ? JSON.parse(dados) : {};

}

/**
 * Salva todos os status.
 */
function salvarStatusSalvos(status) {

    localStorage.setItem(
        STORAGE_KEY,
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