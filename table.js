function renderizarTabela(clientes) {

    const tbody = document.getElementById("tableBody");

    tbody.innerHTML = "";

    if (!clientes.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center p-8">
                    Nenhum cliente encontrado.
                </td>
            </tr>
        `;

        return;

    }

    clientes.forEach(cliente => {

        tbody.innerHTML += `

            <tr class="border-b">

                <td class="p-3">
                    📋
                </td>

                <td class="p-3">
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
                    ${cliente.contato}
                </td>

            </tr>

        `;

    });

}