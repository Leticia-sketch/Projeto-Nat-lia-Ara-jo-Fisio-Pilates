const menuItems = document.querySelectorAll(".menu-item")
const secoes = document.querySelectorAll(".secao")

function mostrarSecao(id, event) {

    secoes.forEach(secao => {
        secao.classList.add("hidden")
    })

    document.getElementById(id).classList.remove("hidden")

    menuItems.forEach(item => {
        item.classList.remove("active")
    })

    event.currentTarget.classList.add("active")
}

let dados = {}

// =========================
// CARREGAR DADOS
// =========================

async function carregarDados() {

    try {

        const resposta = await fetch("http://localhost:3000/dados")

        dados = await resposta.json()

        console.log("Dados carregados:", dados)

        preencherHero()
        preencherEstudio()
        preencherSobre()
        preencherServicos()
        preencherPlanos()
        preencherDepoimentos()
        preencherFooter()

    } catch (erro) {

        console.error("Erro ao carregar dados:", erro)

    }
}

carregarDados()

// =========================
// HERO
// =========================

function preencherHero() {

    const inputs = document.querySelectorAll("#hero input")

    inputs[0].value = dados.hero?.titulo || ""
    inputs[1].value = dados.hero?.botao || ""
}

// =========================
// ESTÚDIO
// =========================

function preencherEstudio() {

    document.querySelector("#estudio input").value =
        dados.estudio?.titulo || ""

    document.querySelector("#estudio textarea").value =
        dados.estudio?.texto || ""
}

// =========================
// SOBRE
// =========================

function preencherSobre() {

    document.querySelector("#sobre input").value =
        dados.sobre?.titulo || ""

    document.querySelector("#sobre textarea").value =
        dados.sobre?.texto || ""
}

// =========================
// SERVIÇOS
// =========================

function preencherServicos() {

    const grid = document.querySelector("#servicos .grid")

    grid.innerHTML = ""

    dados.servicos?.forEach((servico, index) => {

        grid.innerHTML += `

        <div class="card">

            <div class="flex justify-between mb-6">

                <h3 class="text-2xl font-bold">
                    ${servico.titulo || ""}
                </h3>

                <button
                onclick="deletarServico(${index})"
                class="text-red-500">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

            <div class="space-y-4">

                <input
                class="input titulo-servico"
                value="${servico.titulo || ""}">

                <input
                class="input imagem-servico"
                value="${servico.img || ""}">

                <textarea
                class="input texto-servico h-[160px] resize-none">${servico.texto || ""}</textarea>

            </div>

        </div>
        `
    })
}

// =========================
// PLANOS
// =========================

function preencherPlanos() {

    const grid = document.querySelector("#planos .grid")

    grid.innerHTML = ""

    dados.planos?.forEach((plano, index) => {

        grid.innerHTML += `

        <div class="card border-2 border-[#1f7a55]">

            <div class="flex justify-between items-center mb-6">

                <h3 class="text-3xl font-bold">
                    ${plano.titulo || ""}
                </h3>

                <button
                onclick="deletarPlano(${index})"
                class="text-red-500 text-xl">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

            <div class="space-y-5">

                <input
                class="input titulo-plano"
                value="${plano.titulo || ""}">

                <input
                class="input preco-plano"
                value="${plano.preco || ""}">

                <textarea
                class="input beneficios-plano h-[150px] resize-none">${plano.beneficios?.join("\n") || ""}</textarea>

            </div>

        </div>
        `
    })
}

// =========================
// DEPOIMENTOS
// =========================

function preencherDepoimentos() {

    const grid = document.querySelector("#depoimentos .grid")

    grid.innerHTML = ""

    dados.depoimentos?.forEach((dep, index) => {

        grid.innerHTML += `

        <div class="card">

            <div class="flex justify-between mb-6">

                <h3 class="text-2xl font-bold">
                    ${dep.nome || ""}
                </h3>

                <button
                onclick="deletarDepoimento(${index})"
                class="text-red-500">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

            <div class="space-y-4">

                <input
                class="input"
                value="${dep.nome || ""}">

                <textarea
                class="input h-[140px] resize-none">${dep.texto || ""}</textarea>

                <input
                class="input"
                value="${dep.estrelas || 5}">

            </div>

        </div>
        `
    })
}

// =========================
// FOOTER
// =========================

function preencherFooter() {

    const inputs = document.querySelectorAll("#footer input")

    inputs[0].value = dados.footer?.titulo || ""
    inputs[1].value = dados.footer?.telefone || ""
    inputs[2].value = dados.footer?.instagram || ""
    inputs[3].value = dados.footer?.endereco || ""
}

// =========================
// NOVO SERVIÇO
// =========================

function novoServico() {

    dados.servicos.push({
        titulo: "Novo serviço",
        img: "",
        texto: "",
        link: ""
    })

    preencherServicos()
}

// =========================
// NOVO PLANO
// =========================

function novoPlano() {

    dados.planos.push({
        titulo: "Novo plano",
        preco: "",
        beneficios: []
    })

    preencherPlanos()
}

// =========================
// NOVO DEPOIMENTO
// =========================

function novoDepoimento() {

    dados.depoimentos.push({
        nome: "",
        texto: "",
        estrelas: 5
    })

    preencherDepoimentos()
}

// =========================
// DELETAR
// =========================

function deletarServico(index) {

    dados.servicos.splice(index, 1)

    preencherServicos()
}

function deletarPlano(index) {

    dados.planos.splice(index, 1)

    preencherPlanos()
}

function deletarDepoimento(index) {

    dados.depoimentos.splice(index, 1)

    preencherDepoimentos()
}

//botão estúdio salvar
async function carregarEstudio() {

  const res = await fetch(
    "http://localhost:3000/estudio"
  )

  const estudio = await res.json()

  document.getElementById(
    "tituloEstudioInput"
  ).value = estudio.titulo

  document.getElementById(
    "textoEstudioInput"
  ).value = estudio.texto
}

async function salvarEstudio() {

  const titulo = document.getElementById(
    "tituloEstudioInput"
  ).value

  const texto = document.getElementById(
    "textoEstudioInput"
  ).value

  await fetch(
    "http://localhost:3000/estudio",
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        titulo,
        texto
      })
    }
  )

  alert("Estúdio atualizado!")
}

carregarEstudio()

function mostrarSecao(id, event) {

  document.querySelectorAll(".secao")
    .forEach(secao => {
      secao.classList.add("hidden")
    })

  document.getElementById(id)
    .classList.remove("hidden")

  document.querySelectorAll(".menu-item")
    .forEach(item => {
      item.classList.remove("active")
    })

  event.currentTarget.classList.add("active")
}