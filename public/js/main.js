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

//parte do botão do estúdio
const track = document.getElementById("carouselTrack")
const items = document.querySelectorAll(".carousel-item")

let index = 0

function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`

    items.forEach((item, i) => {
        item.classList.remove("active")
        if (i === index) {
            item.classList.add("active")
        }
    })
}

document.getElementById("next").onclick = () => {
    index = (index + 1) % items.length
    updateCarousel()
}

document.getElementById("prev").onclick = () => {
    index = (index - 1 + items.length) % items.length
    updateCarousel()
}


// inicia com o primeiro ativo
updateCarousel()