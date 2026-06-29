const state = {
    clientes: [],
    clientesFiltrados: []
};

document.addEventListener("DOMContentLoaded", () => {
    atualizarContadores();
});

function aplicarFiltros() {

    const plano = document.getElementById("planFilter").value;
    const idade = document.getElementById("ageFilter").value;
    const contato = document.getElementById("contactFilter").value;
    const pesquisa = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    state.clientesFiltrados = state.clientes.filter(cliente => {

        // Plano
        if (plano && cliente.plano !== plano)
            return false;

        // Contato
        if (contato && cliente.contato !== contato)
            return false;

        // Pesquisa
        if (
            pesquisa &&
            !cliente.razao.toLowerCase().includes(pesquisa)
        )
            return false;

        // Idade
        if (idade && !validarFaixaIdade(cliente.idade, idade))
            return false;

        return true;

    });

    renderizarTabela(state.clientesFiltrados);

}