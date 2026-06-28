import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.hero.create({
    data: { titulo: "Natália Araújo - FisioPilates", botao: "Agende agora" }
  })

  await prisma.estudio.create({
    data: {
      titulo: "Estúdio Natália Araújo FisioPilates",
      texto: "Nossa história começou em 2024, com o nascimento do Estúdio Natália Araújo Fisiopilates e um propósito bem definido: promover qualidade de vida por meio do movimento. O projeto teve início em um espaço de 24m², com poucos alunos, sempre com o compromisso de oferecer um atendimento humanizado e individualizado, respeitando as particularidades de cada paciente. Com o passar do tempo, crescemos e nos tornamos referência em João Pessoa no tratamento de escoliose e deformidades da coluna, utilizando abordagens como o Método Schroth aliado ao Pilates terapêutico. Hoje, já são mais de 150 vidas impactadas, marcadas por melhorias na saúde, na postura e no bem-estar. Porque, no fim, o que nos move são as pessoas — e o impacto positivo que podemos gerar na vida de cada uma delas."
    }
  })

  await prisma.sobre.create({
    data: {
      titulo: "Sobre Natália Araújo",
      texto: "Natália Araújo é fisioterapeuta, especialista no tratamento de escoliose e deformidades da coluna, e fundadora do Estúdio Natália Araújo Fisiopilates. Sua atuação é marcada por um atendimento individualizado e humanizado, utilizando métodos reconhecidos internacionalmente, como o Método Schroth (SSOL) aliado ao Pilates terapêutico. Mais do que conduzir atendimentos, acredita no acolhimento, na escuta ativa e na educação do paciente como pilares fundamentais para uma reabilitação eficaz. Seu compromisso está em ajudar cada paciente a recuperar sua autonomia, melhorar sua qualidade de vida e se reconectar com o próprio corpo por meio do movimento, sempre com responsabilidade e dedicação.",
      lista: JSON.stringify(["", ""])
    }
  })

  const plano1 = await prisma.plano.create({
    data: {
      titulo: "Pilates",
      preco: "Planos flexíveis!",
      link: "detalhes.html",
      tipo: "secundario",
      botao: "Ver detalhes!",
      beneficios: JSON.stringify(["Mensal (30 dias)", "Quadrimestral (4 meses)", "Semestral (6 meses)"])
    }
  })

  const plano2 = await prisma.plano.create({
    data: {
      titulo: "Fisioterapia",
      preco: "Atendimento individualizado!",
      link: "https://wa.me/558388435842",
      tipo: "principal",
      botao: "Fale conosco no Whatsapp!",
      beneficios: JSON.stringify(["Avaliação fisioterapêutica completa", "Plano de tratamento personalizado", "Acompanhamento contínuo"])
    }
  })

  await prisma.servico.createMany({
    data: [
      { titulo: "Método Schroth", img: "img/minipa3.jpeg", texto: "Esse Método corrige a coluna em três dimensões.", link: "#", planoId: plano1.id },
      { titulo: "Tratamento de Escoliose", img: "img/resultado5.jpeg", texto: "O tratamento da escoliose se dá por meio de exercícios específicos.", link: "#", planoId: plano1.id },
      { titulo: "Pilates Terapêutico", img: "img/paciente3.jpeg", texto: "Focado na reabilitação de lesões e alívio de dores crônicas.", link: "#", planoId: plano2.id },
      { titulo: "Nossos resultados", img: "img/resultado3.jpeg", texto: "No meu estúdio associamos ambos os métodos!", link: "#", planoId: plano1.id }
    ]
  })

  await prisma.planoDetalhado.createMany({
    data: [
      { titulo: "1x por semana", opcoes: JSON.stringify([{ nome: "Mensal", preco: "R$ 180" }, { nome: "Quadrimestral", preco: "R$ 170" }, { nome: "Semestral", preco: "R$ 160" }]) },
      { titulo: "2x por semana", opcoes: JSON.stringify([{ nome: "Mensal", preco: "R$ 280" }, { nome: "Quadrimestral", preco: "R$ 265" }, { nome: "Semestral", preco: "R$ 250" }]) },
      { titulo: "3x por semana", opcoes: JSON.stringify([{ nome: "Mensal", preco: "R$ 370" }, { nome: "Quadrimestral", preco: "R$ 360" }, { nome: "Semestral", preco: "R$ 350" }]) }
    ]
  })

  await prisma.depoimento.createMany({
    data: [
      { nome: "@gabibcunha", texto: "Natália é uma profissional incrível!", estrelas: 5 },
      { nome: "@maosdefadaenf", texto: "Uma pessoa e profissional incrível!", estrelas: 5 },
      { nome: "@layseformiga", texto: "Uma profissional excelente!", estrelas: 5 },
      { nome: "@ryslania_santos", texto: "Profissional dedicada, amorosa e empática!", estrelas: 4 },
      { nome: "@profciencias", texto: "Pessoa meiga, cativante e acolhedora.", estrelas: 4 },
      { nome: "@sabrina.imagemestilo", texto: "Uma profissional maravilhosa, dedicada e atenciosa!", estrelas: 5 }
    ]
  })

  await prisma.footer.create({
    data: {
      titulo: "Studio Natália Araújo",
      descricao: "Especialista em fisioterapia e pilates terapêutico...",
      telefone: "(83) 98843-5842",
      instagram: "@nataliaaraujofisiopilates",
      facebook: "Natália Araújo Fisiopilates",
      email: "nataliaaraujofisiopilates@gmail.com",
      endereco: "João Pessoa - PB",
      mapa: "https://www.google.com/maps?q=..."
    }
  })

  console.log("Seed executado com sucesso!")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())