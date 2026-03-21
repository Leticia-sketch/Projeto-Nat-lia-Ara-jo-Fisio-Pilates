export async function carregarDados() {
    const resposta = await fetch("data/dados.json")
    console.log(resposta)
    return await resposta.json()
}