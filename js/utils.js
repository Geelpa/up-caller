function obterCampo(objeto, possibilidades) {

    const mapa = {};

    Object.keys(objeto).forEach(chave => {

        mapa[normalizarTexto(chave)] = objeto[chave];

    });

    for (const possibilidade of possibilidades) {

        const chave = normalizarTexto(possibilidade);

        if (mapa[chave] !== undefined)
            return mapa[chave];

    }

    return "";

}

function calcularIdade(data) {

    if (!data)
        return null;

    const nascimento = new Date(data);

    if (isNaN(nascimento))
        return null;

    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const mes = hoje.getMonth() - nascimento.getMonth();

    if (
        mes < 0 ||
        (mes === 0 && hoje.getDate() < nascimento.getDate())
    ) {

        idade--;

    }

    return idade;

}

function normalizarTexto(texto) {

    return String(texto)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "")
        .toLowerCase()
        .trim();

}