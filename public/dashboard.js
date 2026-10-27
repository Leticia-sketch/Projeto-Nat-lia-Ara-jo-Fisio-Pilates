const menuItems = document.querySelectorAll(".menu-item")
const secoes = document.querySelectorAll(".secao")

function mostrarSecao(id, event) {
    secoes.forEach(secao => secao.classList.add("hidden"))
    document.getElementById(id).classList.remove("hidden")
    menuItems.forEach(item => item.classList.remove("active"))
    event.currentTarget.classList.add("active")
}

let dados = {}

async function carregarDados() {
    try {
        const resposta = await fetch("/dados", { credentials: "include" })
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

// =========================
// AUTENTICAÇÃO
// =========================

async function verificarAutenticacao() {
    try {
        const resposta = await fetch("/auth/me", { credentials: "include" })

        if (!resposta.ok) {
            window.location.href = "/login.html"
            return
        }

        const { admin } = await resposta.json()
        const elementoNome = document.getElementById("nomeAdminLogado")
        if (elementoNome) {
            elementoNome.textContent = admin.nome
        }
    } catch (erro) {
        console.error("Erro ao verificar autenticação:", erro)
        window.location.href = "/login.html"
    }
}

async function logout() {
    try {
        await fetch("/auth/logout", { method: "POST", credentials: "include" })
    } catch (erro) {
        console.error("Erro ao fazer logout:", erro)
    } finally {
        window.location.href = "/login.html"
    }
}

verificarAutenticacao()
carregarDados()

// =========================
// HERO
// =========================

function preencherHero() {
    const inputs = document.querySelectorAll("#hero input")
    inputs[0].value = dados.hero?.titulo || ""
    inputs[1].value = dados.hero?.botao || ""
}

async function salvarHero() {
    const inputs = document.querySelectorAll("#hero input")
    const titulo = inputs[0].value
    const botao = inputs[1].value

    await fetch("/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ titulo, botao })
    })

    alert("Hero salvo!")
}

// =========================
// ESTÚDIO
// =========================

function preencherEstudio() {
    document.querySelector("#estudio input").value = dados.estudio?.titulo || ""
    document.querySelector("#estudio textarea").value = dados.estudio?.texto || ""
}

async function carregarEstudio() {
    const res = await fetch("/estudio", { credentials: "include" })
    const estudio = await res.json()
    document.getElementById("tituloEstudioInput").value = estudio.titulo
    document.getElementById("textoEstudioInput").value = estudio.texto
}

async function salvarEstudio() {
    const titulo = document.getElementById("tituloEstudioInput").value
    const texto = document.getElementById("textoEstudioInput").value

    await fetch("/estudio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ titulo, texto })
    })

    alert("Estúdio atualizado!")
}

carregarEstudio()

// =========================
// SOBRE
// =========================

function preencherSobre() {
    document.querySelector("#sobre input").value = dados.sobre?.titulo || ""
    document.querySelector("#sobre textarea").value = dados.sobre?.texto || ""
}

async function salvarSobre() {
    const titulo = document.querySelector("#sobre input").value
    const texto = document.querySelector("#sobre textarea").value

    await fetch("/sobre", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ titulo, texto })
    })

    alert("Sobre salvo!")
}

// =========================
// SERVIÇOS
// =========================

async function preencherServicos() {
    const res = await fetch("/servicos", { credentials: "include" })
    dados.servicos = await res.json()

    const grid = document.querySelector("#servicos .grid")
    grid.innerHTML = ""

    dados.servicos.forEach((servico) => {
        grid.innerHTML += `
        <div class="card" data-id="${servico.id}">
            <div class="flex justify-between mb-6">
                <h3 class="text-2xl font-bold">${servico.titulo || ""}</h3>
                <button onclick="deletarServico(${servico.id})" class="text-red-500">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="space-y-4">
                <input class="input titulo-servico" value="${servico.titulo || ""}" placeholder="Título do serviço (ex: Pilates Terapêutico)">
                <input class="input imagem-servico" value="${servico.img || ""}" placeholder="Caminho da imagem (ex: img/servico1.jpeg)">
                <textarea class="input texto-servico h-[160px] resize-none" placeholder="Descrição do serviço">${servico.texto || ""}</textarea>
            </div>
            <button onclick="salvarServico(${servico.id})" class="btn w-full mt-6">Salvar</button>
        </div>
        `
    })
}

async function salvarServico(id) {
    const card = document.querySelector(`.card[data-id="${id}"]`)
    const titulo = card.querySelector(".titulo-servico").value
    const img = card.querySelector(".imagem-servico").value
    const texto = card.querySelector(".texto-servico").value

    await fetch(`/servicos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ titulo, img, texto })
    })

    alert("Serviço salvo!")
    preencherServicos()
}

async function novoServico() {
    await fetch("/servicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ titulo: "Novo serviço", img: "", texto: "" })
    })
    preencherServicos()
}

async function deletarServico(id) {
    if (!confirm("Tem certeza que deseja deletar este serviço?")) return
    await fetch(`/servicos/${id}`, { method: "DELETE", credentials: "include" })
    preencherServicos()
}

// =========================
// PLANOS
// =========================

async function preencherPlanos() {
    const res = await fetch("/planos", { credentials: "include" })
    dados.planos = await res.json()

    const grid = document.querySelector("#planos .grid")
    grid.innerHTML = ""

    dados.planos.forEach((plano) => {
        grid.innerHTML += `
        <div class="card border-2 border-[#1f7a55]" data-id="${plano.id}">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-3xl font-bold">${plano.titulo || ""}</h3>
                <button onclick="deletarPlano(${plano.id})" class="text-red-500 text-xl">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="space-y-5">
                <input class="input titulo-plano" value="${plano.titulo || ""}" placeholder="Título do plano (ex: Pilates)">
                <input class="input preco-plano" value="${plano.preco || ""}" placeholder="Texto de preço (ex: Planos flexíveis!)">
                <textarea class="input beneficios-plano h-[150px] resize-none" placeholder="Descrição do plano">${plano.beneficios?.join("\n") || ""}</textarea>
            </div>
            <button onclick="salvarPlano(${plano.id})" class="btn w-full mt-6">Salvar</button>
        </div>
        `
    })
}
async function salvarPlano(id) {
    const card = document.querySelector(`#planos .card[data-id="${id}"]`)
    const titulo = card.querySelector(".titulo-plano").value
    const preco = card.querySelector(".preco-plano").value
    const beneficios = card.querySelector(".beneficios-plano").value.split("\n").filter(b => b.trim() !== "")

    await fetch(`/planos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ titulo, preco, beneficios })
    })

    alert("Plano salvo!")
    preencherPlanos()
}

async function novoPlano() {
    await fetch("/planos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ titulo: "Novo plano", preco: "", beneficios: [] })
    })
    preencherPlanos()
}

async function deletarPlano(id) {
    if (!confirm("Tem certeza que deseja deletar este plano?")) return
    await fetch(`/planos/${id}`, { method: "DELETE", credentials: "include" })
    preencherPlanos()
}

// =========================
// DEPOIMENTOS
// =========================

async function preencherDepoimentos() {
    const res = await fetch("/depoimentos", { credentials: "include" })
    dados.depoimentos = await res.json()

    const grid = document.querySelector("#depoimentos .grid")
    grid.innerHTML = ""

    dados.depoimentos.forEach((dep) => {
        grid.innerHTML += `
        <div class="card" data-id="${dep.id}">
            <div class="flex justify-between mb-6">
                <h3 class="text-2xl font-bold">${dep.nome || ""}</h3>
                <button onclick="deletarDepoimento(${dep.id})" class="text-red-500">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="space-y-4">
                <input class="input nome-dep" value="${dep.nome || ""}" placeholder="Nome ou @usuário (ex: @gabibcunha)">
                <textarea class="input texto-dep h-[140px] resize-none" placeholder="Texto do depoimento">${dep.texto || ""}</textarea>
                <input class="input estrelas-dep" value="${dep.estrelas || 5}" placeholder="Número de estrelas (1 a 5)">
            </div>
            <button onclick="salvarDepoimento(${dep.id})" class="btn w-full mt-6">Salvar</button>
        </div>
        `
    })
}
async function salvarDepoimento(id) {
    const card = document.querySelector(`#depoimentos .card[data-id="${id}"]`)
    const nome = card.querySelector(".nome-dep").value
    const texto = card.querySelector(".texto-dep").value
    const estrelas = parseInt(card.querySelector(".estrelas-dep").value)

    await fetch(`/depoimentos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ nome, texto, estrelas })
    })

    alert("Depoimento salvo!")
    preencherDepoimentos()
}

async function novoDepoimento() {
    await fetch("/depoimentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ nome: "", texto: "", estrelas: 5 })
    })
    preencherDepoimentos()
}

async function deletarDepoimento(id) {
    if (!confirm("Tem certeza que deseja deletar este depoimento?")) return
    await fetch(`/depoimentos/${id}`, { method: "DELETE", credentials: "include" })
    preencherDepoimentos()
}

// =========================
// FOOTER
// =========================

function preencherFooter() {
  document.getElementById("footerTitulo").value = dados.footer?.titulo || ""
  document.getElementById("footerTelefone").value = dados.footer?.telefone || ""
  document.getElementById("footerInstagram").value = dados.footer?.instagram || ""
  document.getElementById("footerEndereco").value = dados.footer?.endereco || ""
  document.getElementById("footerMapa").value = dados.footer?.mapa || ""
}

async function salvarFooter() {
  const titulo = document.getElementById("footerTitulo").value
  const telefone = document.getElementById("footerTelefone").value
  const instagram = document.getElementById("footerInstagram").value
  const endereco = document.getElementById("footerEndereco").value
  const mapa = document.getElementById("footerMapa").value

  await fetch("/footer", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ titulo, telefone, instagram, endereco, mapa })
  })

  alert("Footer salvo!")
}

// =========================
// PLANOS DETALHADOS
// =========================

let planosDetalhados = []

async function carregarPlanosDetalhados() {
    const res = await fetch("/planos-detalhados", { credentials: "include" })
    const dados = await res.json()
    planosDetalhados = dados.lista
    preencherPlanosDetalhados()
}

function preencherPlanosDetalhados() {
    const grid = document.getElementById("planosDetalhadosGrid")
    grid.innerHTML = ""

    planosDetalhados.forEach((plano, index) => {
        grid.innerHTML += `
        <div class="card">
            <div class="flex justify-between mb-6">
                <h3 class="text-2xl font-bold">${plano.titulo}</h3>
                <button onclick="deletarPlanoDetalhado(${index})" class="text-red-500">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="space-y-4">
                <input class="input titulo-pd" value="${plano.titulo}">
                ${plano.opcoes.map((op, i) => `
                    <div class="flex gap-3">
                        <input class="input nome-opcao-${index}" value="${op.nome}" placeholder="Nome (ex: Mensal)">
                        <input class="input preco-opcao-${index}" value="${op.preco}" placeholder="Preço (ex: R$ 180)">
                    </div>
                `).join("")}
                <button onclick="adicionarOpcao(${index})" class="text-[#1f7a55] text-sm font-semibold">
                    + Adicionar opção
                </button>
            </div>
            <button onclick="salvarPlanoDetalhado(${index})" class="btn w-full mt-6">Salvar</button>
        </div>
        `
    })
}

function novoPlanoDetalhado() {
    planosDetalhados.push({ titulo: "Nova frequência", opcoes: [{ nome: "", preco: "" }] })
    preencherPlanosDetalhados()
}

function adicionarOpcao(index) {
    planosDetalhados[index].opcoes.push({ nome: "", preco: "" })
    preencherPlanosDetalhados()
}

async function deletarPlanoDetalhado(index) {
    if (!confirm("Tem certeza que deseja deletar esta frequência?")) return

    const plano = planosDetalhados[index]

    if (plano.id) {
        await fetch(`/planos-detalhados/${plano.id}`, {
            method: "DELETE",
            credentials: "include"
        })
    }

    planosDetalhados.splice(index, 1)
    preencherPlanosDetalhados()
}

async function salvarPlanoDetalhado(index) {
    const card = document.getElementById("planosDetalhadosGrid").children[index]
    const titulo = card.querySelector(".titulo-pd").value
    const nomes = [...card.querySelectorAll(`.nome-opcao-${index}`)]
    const precos = [...card.querySelectorAll(`.preco-opcao-${index}`)]
    const opcoes = nomes.map((n, i) => ({ nome: n.value, preco: precos[i].value }))
    const plano = planosDetalhados[index]

    if (plano.id) {
        await fetch(`/planos-detalhados/${plano.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ titulo, opcoes })
        })
    } else {
        await fetch("/planos-detalhados", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ titulo, opcoes })
        })
    }

    alert("Salvo com sucesso!")
    carregarPlanosDetalhados()
}

carregarPlanosDetalhados()