export async function carregarDados() {

  const resposta = await fetch("/dados")

  const dados = await resposta.json()

  return dados
}