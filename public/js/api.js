export async function carregarDados() {

  const resposta = await fetch("http://localhost:3000/dados")

  const dados = await resposta.json()

  return dados
}