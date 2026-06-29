function renderizarTabela(clientes) {

    const tbody = document.getElementById("tableBody");

    tbody.innerHTML = "";

    if (!clientes.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center p-8 text-gray-400">
                    Nenhum cliente encontrado.
                </td>
            </tr>
        `;

        atualizarContadores();

        return;

    }

    clientes.forEach(cliente => {

        const linha = document.createElement("tr");

        linha.className = "border-b hover:bg-slate-50";

        linha.innerHTML = `

            <td class="p-3">

                <button
                    class="copy-btn bg-slate-200 px-3 py-1 rounded hover:bg-slate-300"
                    data-razao="${cliente.razao}">

                    📋

                </button>

            </td>

            <td class="p-3 font-medium">

                ${cliente.razao}

            </td>

            <td class="p-3">

                ${cliente.plano}

            </td>

            <td class="p-3">

                ${cliente.idade ?? "Sem dados"}

            </td>

            <td class="p-3">

                ${cliente.ativacao || "Sem dados"}

            </td>

            <td class="p-3">

                ${cliente.pagoAte || "Sem dados"}

            </td>

            <td class="p-3">

                ${cliente.statusContrato}

            </td>

            <td class="p-3">

                <select
                    class="status-select border rounded px-2 py-1"
                    data-id="${cliente.id}">

                    ${criarOpcoesStatus(cliente.contato)}

                </select>

            </td>

        `;

        tbody.appendChild(linha);

    });

    configurarBotoesCopiar();

    configurarSelects();

    atualizarContadores();

}

function criarOpcoesStatus(statusAtual) {

    const opcoes = [

        "Sem contato",
        "Em andamento",
        "Sucesso",
        "Sem retorno",
        "Recusou"

    ];

    return opcoes.map(status => `

        <option
            value="${status}"
            ${status === statusAtual ? "selected" : ""}>

            ${status}

        </option>

    `).join("");

}

function configurarBotoesCopiar() {

    document
        .querySelectorAll(".copy-btn")
        .forEach(botao => {

            botao.onclick = async () => {

                await navigator.clipboard.writeText(
                    botao.dataset.razao
                );

                const antigo = botao.innerHTML;

                botao.innerHTML = "✔";

                setTimeout(() => {

                    botao.innerHTML = antigo;

                }, 1200);

            };

        });

}

function configurarSelects() {

    document
        .querySelectorAll(".status-select")
        .forEach(select => {

            select.onchange = () => {

                const id = select.dataset.id;
                const novoStatus = select.value;

                // Salva no localStorage
                atualizarStatus(id, novoStatus);

                // Atualiza o objeto em memória
                const cliente = state.clientes.find(c => c.id == id);

                if (cliente) {
                    cliente.contato = novoStatus;
                }

                atualizarContadores();

                aplicarFiltros();

            };

        });

}

function atualizarContadores() {

    const total = state.clientes.length;

    document.getElementById("totalClients").textContent = total;

    const status = obterStatusSalvos();

    let semContato = 0;
    let andamento = 0;
    let sucesso = 0;
    let semRetorno = 0;
    let recusou = 0;

    state.clientes.forEach(cliente => {

        switch (status[cliente.id] || "Sem contato") {

            case "Sem contato":
                semContato++;
                break;

            case "Em andamento":
                andamento++;
                break;

            case "Sucesso":
                sucesso++;
                break;

            case "Sem retorno":
                semRetorno++;
                break;

            case "Recusou":
                recusou++;
                break;

        }

    });

    document.getElementById("countSemContato").textContent = semContato;
    document.getElementById("countSemRetorno").textContent = semRetorno;
    document.getElementById("countAndamento").textContent = andamento;
    document.getElementById("countSucesso").textContent = sucesso;
    document.getElementById("countRecusou").textContent = recusou;

}