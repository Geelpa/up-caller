function inicializarFiltros() {

    document.getElementById("planFilter")
        .addEventListener("change", aplicarFiltros);

    document.getElementById("ageFilter")
        .addEventListener("change", aplicarFiltros);

    document.getElementById("contactFilter")
        .addEventListener("change", aplicarFiltros);

    document.getElementById("searchInput")
        .addEventListener("input", aplicarFiltros);

}

function validarFaixaIdade(idade, faixa) {

    if (idade == null)
        return false;

    switch (faixa) {

        case "18-35":
            return idade >= 18 && idade <= 35;

        case "36-49":
            return idade >= 36 && idade <= 49;

        case "50-59":
            return idade >= 50 && idade <= 59;

        case "60+":
            return idade >= 60;

        default:
            return true;

    }

}

function popularFiltros() {
    const planos = [
        ...new Set(
            state.clientes
                .map(c => c.plano)
                .filter(Boolean)
        )
    ].sort();

    const selectPlano =
        document.getElementById("planFilter");

    selectPlano.innerHTML =
        `<option value="">Todos</option>`;

    planos.forEach(plano => {

        selectPlano.innerHTML +=
            `<option value="${plano}">
                ${plano}
            </option>`;

    });

    const status = [

        "Sem contato",
        "Em andamento",
        "Sucesso",
        "Sem retorno",
        "Recusou"

    ];

    const selectContato =
        document.getElementById("contactFilter");

    selectContato.innerHTML =
        `<option value="">Todos</option>`;

    status.forEach(item => {

        selectContato.innerHTML +=
            `<option value="${item}">
                ${item}
            </option>`;

    });
}

function aplicarFiltros() {

    const plan = document.getElementById("planFilter");
    const age = document.getElementById("ageFilter");
    const contact = document.getElementById("contactFilter");
    const search = document.getElementById("searchInput");

    if (!plan || !age || !contact || !search) return;

    const plano = plan.value;
    const idade = age.value;
    const contato = contact.value;
    const pesquisa = search.value.toLowerCase().trim();

    state.clientesFiltrados = state.clientes.filter(cliente => {

        if (plano && cliente.plano !== plano) return false;

        if (contato && cliente.contato !== contato) return false;

        if (pesquisa && !cliente.razao.toLowerCase().includes(pesquisa)) return false;

        if (idade && !validarFaixaIdade(cliente.idade, idade)) return false;

        return true;

    });

    renderizarTabela(state.clientesFiltrados);
}