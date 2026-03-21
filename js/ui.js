export function renderizarSite(conteudo) {

    // hero
    document.getElementById("tituloHero").innerText = conteudo.hero.titulo
    document.getElementById("botaoHero").innerText = conteudo.hero.botao

    // estudio
    document.getElementById("tituloEstudio").innerText = conteudo.estudio.titulo
    document.getElementById("textoEstudio").innerText = conteudo.estudio.texto

    // sobre
    document.getElementById("tituloSobre").innerText = conteudo.sobre.titulo
    document.getElementById("textoSobre").innerText = conteudo.sobre.texto

    const listaSobre = document.getElementById("listaSobre")
    listaSobre.innerHTML = ""

    conteudo.sobre.lista.forEach(item => {
        let li = document.createElement("li")
        li.innerText = item
        listaSobre.appendChild(li)
    })

    // serviços
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
        <div class="texto">
            <h3 class="font-bold text-lg mb-2">${servico.titulo || ""}</h3>
            <p>${servico.texto || ""}</p>
            <a href="${servico.link}" class="btn-saiba">Saiba mais</a>
        </div>
    `

        container.appendChild(card)

        // planos
        const planosContainer = document.getElementById("planosContainer")
        planosContainer.innerHTML = ""

        conteudo.planos.forEach(plano => {

            let card = document.createElement("div")

            let destaque = plano.destaque
                ? "border-2 border-[#69D7DC] scale-105 shadow-lg"
                : "border shadow-md"

            let botao = plano.destaque
                ? "bg-[#69D7DC] text-black"
                : "border border-[#69D7DC] text-[#3986C5]"

            card.className = `plano bg-white rounded-2xl p-8 ${destaque}`

            card.innerHTML = `
        <h3 class="text-xl font-semibold mb-4">${plano.titulo}</h3>

        

        <ul class="space-y-3 mb-6 text-gray-700">
          ${plano.beneficios.map(b => `<li>✔ ${b}</li>`).join("")}
        </ul>

        <button class="w-full py-2 rounded-lg transition ${botao}">
          Assinar Plano
        </button>
    `

            planosContainer.appendChild(card)
        })
    })

    const track = document.getElementById("carouselTrack")
    const next = document.getElementById("next")
    const prev = document.getElementById("prev")

    let index = 0
    const total = track.children.length

    function updateCarousel() {
        track.style.transform = `translateX(-${index * 100}%)`
    }

    next.addEventListener("click", () => {
        index = (index + 1) % total
        updateCarousel()
    })

    prev.addEventListener("click", () => {
        index = (index - 1 + total) % total
        updateCarousel()
    })

    //depoimentos

    const depoContainer = document.getElementById("depoimentosContainer")
    depoContainer.innerHTML = ""

    conteudo.depoimentos.forEach(dep => {

        let estrelas = "★".repeat(dep.estrelas) + "☆".repeat(5 - dep.estrelas)

        let card = document.createElement("div")
        card.className = "bg-[#69D7DC] p-6 rounded-xl"

        card.innerHTML = `
        <div class="mb-4">
            <h3 class="font-bold text-lg">${dep.nome}</h3>
        </div>

        <p class="text-yellow-400 mb-2">${estrelas}</p>

        <p class="text-gray-700 italic">
            "${dep.texto}"
        </p>
    `

        depoContainer.appendChild(card)
    })

    // contatos

   const containerContato = document.getElementById("contatoContainer")
containerContato.innerHTML = ""

conteudo.contato.forEach(item => {

    let div = document.createElement("div")
    div.classList.add("bg-[#69D7DC]", "p-6", "rounded-xl", "shadow-sm")

    div.innerHTML = `
        <h3 class="font-semibold text-lg mb-2">${item.titulo}</h3>
        <p class="text-gray-600">${item.info}</p>
    `

    containerContato.appendChild(div)
})

}