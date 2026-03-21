import { carregarDados } from "./api.js"
import { renderizarSite } from "./ui.js"

carregarDados().then(dados => {
    renderizarSite(dados)
})

document.addEventListener("click", (e) => {
    if (e.target.matches(".plano button")) {
        alert("Plano selecionado!")
    }
})