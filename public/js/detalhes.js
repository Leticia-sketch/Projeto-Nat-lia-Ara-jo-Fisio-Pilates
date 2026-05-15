import { carregarDados } from "./api.js"

carregarDados().then(dados => {

    const titulo = document.getElementById("tituloDetalhes")
    const container = document.getElementById("detalhesContainer")

    titulo.innerText = dados.planosDetalhados.titulo

    dados.planosDetalhados.lista.forEach(plano => {

        let card = document.createElement("div")

        card.className = `
bg-[#112e27] 
border border-green-500/20 
p-8 rounded-3xl 
shadow-xl 
hover:scale-105 
hover:shadow-green-500/20
transition duration-500
`

        card.innerHTML = `
<h2 class="text-2xl font-semibold mb-6 text-green-300">
    ${plano.titulo}
</h2>

<div class="space-y-4">
    ${plano.opcoes.map(op => `
        <div class="flex justify-between border-b border-green-500/20 pb-2 text-gray-300">
            <span>${op.nome}</span>
            <span class="font-semibold text-white">${op.preco}</span>
        </div>
    `).join("")}
</div>

<a href="https://wa.me/558388435842"
   class="mt-8 block text-center bg-green-500 text-black py-3 rounded-xl font-medium hover:bg-green-400 transition">
   Quero este plano
</a>
`
        container.appendChild(card)
    })

})