function inicializarFiltros() {

    document
        .getElementById("planFilter")
        .addEventListener("change", aplicarFiltros);

    document
        .getElementById("ageFilter")
        .addEventListener("change", aplicarFiltros);

    document
        .getElementById("contactFilter")
        .addEventListener("change", aplicarFiltros);

    document
        .getElementById("searchInput")
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

    const planos = [...new Set(
        state.clientes.map(c => c.plano)
    )].sort();

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