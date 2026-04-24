export async function carregarDados() {
  const res = await fetch("http://localhost:3000/dados")
  return res.json()
}