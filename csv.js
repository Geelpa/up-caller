const inputCSV = document.getElementById("csvFile");

inputCSV.addEventListener("change", importarCSV);

function importarCSV(event) {

    const arquivo = event.target.files[0];

    if (!arquivo) return;

    Papa.parse(arquivo, {

        header: true,
        skipEmptyLines: true,

        complete(resultado) {

            state.clientes = resultado.data.map(processarCliente);

            state.clientesFiltrados = [...state.clientes];

            renderizarTabela(state.clientesFiltrados);

            console.log(state.clientes);

        }

    });

}

function processarCliente(linha) {

    return {

        id: obterCampo(linha, ["ID"]),

        razao: obterCampo(linha, [
            "Razão",
            "Razao"
        ]),

        nascimento: obterCampo(linha, [
            "Data nascimento",
            "Data de nascimento"
        ]),

        idade: calcularIdade(
            obterCampo(linha, [
                "Data nascimento",
                "Data de nascimento"
            ])
        ),

        plano: obterCampo(linha, [
            "Descrição do plano",
            "Plano"
        ]),

        statusContrato: obterCampo(linha, [
            "Status do contrato",
            "Status"
        ]),

        pagoAte: obterCampo(linha, [
            "Pago até data",
            "Pago ate data"
        ]),

        ativacao: obterCampo(linha, [
            "Data ativação",
            "Data ativacao"
        ]),

        contato: recuperarStatus(
            obterCampo(linha, ["ID"])
        )

    };

}