document.addEventListener("DOMContentLoaded", () => {
    inicializarFiltros();
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

        if (plano && cliente.plano !== plano)
            return false;

        if (contato && cliente.contato !== contato)
            return false;

        if (
            pesquisa &&
            !cliente.razao.toLowerCase().includes(pesquisa)
        )
            return false;

        if (
            idade &&
            !validarFaixaIdade(cliente.idade, idade)
        )
            return false;

        return true;
    });

    renderizarTabela(state.clientesFiltrados);
}