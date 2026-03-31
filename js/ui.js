export function renderizarSite(conteudo) {

    // HERO
    document.getElementById("tituloHero").innerText = conteudo.hero.titulo
    document.getElementById("botaoHero").innerText = conteudo.hero.botao

    // ESTÚDIO
    document.getElementById("tituloEstudio").innerText = conteudo.estudio.titulo
    document.getElementById("textoEstudio").innerText = conteudo.estudio.texto

    // SOBRE
    document.getElementById("tituloSobre").innerText = conteudo.sobre.titulo
    document.getElementById("textoSobre").innerText = conteudo.sobre.texto

    const listaSobre = document.getElementById("listaSobre")
    listaSobre.innerHTML = ""

    conteudo.sobre.lista.forEach(item => {
        let li = document.createElement("li")
        li.innerText = item
        listaSobre.appendChild(li)
    })

    // SERVIÇOS
    document.getElementById("tituloServicos").innerText = "Nossos Serviços"

    const container = document.getElementById("servicosContainer")
    container.innerHTML = ""

    conteudo.servicos.forEach(servico => {

        let card = document.createElement("div")
        card.classList.add(
            "card",
            "transition",
            "duration-300",
            "hover:scale-105",
            "hover:shadow-xl",
            "cursor-pointer"
        )

        let img = servico.img && servico.img !== "#" ? servico.img : ""

        card.innerHTML = `
            <img src="${img}">
            <div class="texto text-center">
                <h3 class="font-bold text-lg mb-2">${servico.titulo || ""}</h3>
                <p>${servico.texto || ""}</p>
                <a href="${servico.link}" class="btn-saiba block mx-auto mt-4 w-fit">Saiba mais</a>
            </div>
        `

        container.appendChild(card)
    })

    // =========================
    // PLANOS (COM ANIMAÇÃO)
    // =========================

    const planosContainer = document.getElementById("planosContainer")
    planosContainer.innerHTML = ""

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("opacity-0", "translate-y-10")
            }
        })
    })

    conteudo.planos.forEach(plano => {

        let destaque = plano.tipo === "principal"

        let estiloCard = destaque
            ? "border-2 border-green-500 shadow-xl"
            : "border"

        let estiloBotao = destaque
            ? "bg-blue-600 text-white hover:bg-blue-[1500ms]"
            : "border border-blue-600 text-blue-600 hover:bg-blue-50"

        let card = document.createElement("div")
        card.className = `bg-white rounded-2xl p-8 ${estiloCard} opacity-0 translate-y-10 transition-all duration-700`

        card.innerHTML = `
            <h3 class="text-xl font-semibold mb-2">${plano.titulo}</h3>

            <p class="text-3xl font-bold mb-6">${plano.preco}</p>

            <ul class="space-y-2 mb-6 text-gray-600">
                ${plano.beneficios.map(b => `<li>✔ ${b}</li>`).join("")}
            </ul>

            <a href="${plano.link}" target="_blank"
               class="block text-center py-3 rounded-lg transition ${estiloBotao}">
               ${plano.botao}
            </a>
        `

        planosContainer.appendChild(card)

        // 🔥 animação aplicada aqui
        observer.observe(card)
    })

    // =========================
    // CARROSSEL DEPOIMENTOS
    // =========================

    const depoTrack = document.getElementById("depoTrack")
    depoTrack.innerHTML = ""

    conteudo.depoimentos.forEach(dep => {

        let estrelas = "★".repeat(dep.estrelas) + "☆".repeat(5 - dep.estrelas)

        let card = document.createElement("div")

        card.className = `min-w-[33.33%] p-4`

        card.innerHTML = `
            <div class="bg-white p-6 rounded-xl shadow text-center h-full">
                <h3 class="font-bold mb-2">${dep.nome}</h3>
                <p class="text-yellow-400 mb-2">${estrelas}</p>
                <p class="text-gray-600 italic">"${dep.texto}"</p>
            </div>
        `

        depoTrack.appendChild(card)
    })

    const depNext = document.getElementById("depNext")
    const depPrev = document.getElementById("depPrev")

    let depIndex = 0
    const totalDep = conteudo.depoimentos.length
    const visiveis = 3

    function updateDepo() {
        depoTrack.style.transform = `translateX(-${depIndex * (100 / visiveis)}%)`
    }

    depNext.addEventListener("click", () => {
        if (depIndex < totalDep - visiveis) {
            depIndex++
        } else {
            depIndex = 0
        }
        updateDepo()
    })

    depPrev.addEventListener("click", () => {
        if (depIndex > 0) {
            depIndex--
        } else {
            depIndex = totalDep - visiveis
        }
        updateDepo()
    })

    // =========================
    // FOOTER
    // =========================

    document.getElementById("footerTitulo").innerText = conteudo.footer.titulo
document.getElementById("footerDescricao").innerText = conteudo.footer.descricao

document.getElementById("footerEndereco").innerText = "📍 " + conteudo.footer.endereco
document.getElementById("footerTelefone").innerText = "📞 " + conteudo.footer.telefone

// 👇 redes no MESMO estilo
document.getElementById("footerInstagram").innerText = "📷 " + conteudo.footer.instagram
document.getElementById("footerFacebook").innerText = "📘 " + conteudo.footer.facebook

document.getElementById("footerEmail").innerText = "✉️ " + conteudo.footer.email

document.getElementById("footerMapa").src = conteudo.footer.mapa

//animação natália
const observerSobre = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            if (entry.target.id === "animSobreTexto") {
                entry.target.classList.remove("opacity-0", "-translate-x-20")
            }

            if (entry.target.id === "animSobreImg") {
                entry.target.classList.remove("opacity-0", "translate-x-20")
            }

        }
    })
})

// aplicando os elementos
observerSobre.observe(document.getElementById("animSobreTexto"))
observerSobre.observe(document.getElementById("animSobreImg"))
}