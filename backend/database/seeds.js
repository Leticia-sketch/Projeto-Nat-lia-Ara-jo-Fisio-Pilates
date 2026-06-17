const connect = require("./connection")

async function seeds() {

  const db = await connect()

  // HERO
  await db.execute(`
    INSERT INTO hero (titulo, botao) VALUES 
    ('Natália Araújo - FisioPilates', 'Agende agora')
  `)

  // ESTÚDIO
  await db.execute(`
    INSERT INTO estudio (titulo, texto) VALUES 
    ('Estúdio Natália Araújo FisioPilates', 'Nossa história começou em 2024, com o nascimento do Estúdio Natália Araújo Fisiopilates e um propósito bem definido: promover qualidade de vida por meio do movimento. O projeto teve início em um espaço de 24m², com poucos alunos, sempre com o compromisso de oferecer um atendimento humanizado e individualizado, respeitando as particularidades de cada paciente. Com o passar do tempo, crescemos e nos tornamos referência em João Pessoa no tratamento de escoliose e deformidades da coluna, utilizando abordagens como o Método Schroth aliado ao Pilates terapêutico. Hoje, já são mais de 150 vidas impactadas, marcadas por melhorias na saúde, na postura e no bem-estar. Porque, no fim, o que nos move são as pessoas — e o impacto positivo que podemos gerar na vida de cada uma delas.')
  `)

  // SOBRE
  await db.execute(
    `INSERT INTO sobre (titulo, texto, lista) VALUES (?, ?, ?)`,
    [
      'Sobre Natália Araújo',
      'Natália Araújo é fisioterapeuta, especialista no tratamento de escoliose e deformidades da coluna, e fundadora do Estúdio Natália Araújo Fisiopilates. Sua atuação é marcada por um atendimento individualizado e humanizado, utilizando métodos reconhecidos internacionalmente, como o Método Schroth (SSOL) aliado ao Pilates terapêutico. Mais do que conduzir atendimentos, acredita no acolhimento, na escuta ativa e na educação do paciente como pilares fundamentais para uma reabilitação eficaz. Seu compromisso está em ajudar cada paciente a recuperar sua autonomia, melhorar sua qualidade de vida e se reconectar com o próprio corpo por meio do movimento, sempre com responsabilidade e dedicação.',
      JSON.stringify(["", ""])
    ]
  )

  // SERVICOS 
  await db.execute(`
  INSERT INTO servicos (titulo, img, texto, link, plano_id) VALUES 
  ('Método Schroth', 'img/minipa3.jpeg', 'Esse Método corrige a coluna em três dimessões: Alinhmento estratégico, respiração direcionada, fortalecimento muscular específico! Além de outros benefícios.', '#', 1),
  ('Tratamento de Escoliose', 'img/resultado5.jpeg', 'O tratamento da escoliose se dá por meio de exercícios específicos de correção para escoliose. Tais exercícios sãaao eficientes para a  autocorreção tridimencional da coluna vertebral ', '#', 1),
  ('Pilates Terapêutico', 'img/paciente3.jpeg', 'Focado na reabilitação de lesões, alívio de dores crônicas (como hérnias de disco, dores lombares e cervicais), correção postural e fortalecimento profundo, respeitando os limites físicos de cada paciente!', '#', 2),
  ('Nossos resultados', 'img/resultado3.jpeg', 'No meu estúdio associamos ambos os métodos! Essa combinação potencializa os resultados com: Exercícios individualizados, mobilidade e consciência corporal, força e estabilidade funcional!', '#', 1)
`)

  // PLANOS
  await db.execute(
    `INSERT INTO planos (titulo, preco, link, tipo, botao, beneficios) VALUES (?, ?, ?, ?, ?, ?)`,
    ['Pilates', 'Planos flexíveis!', 'detalhes.html', 'secundario', 'Ver detalhes!',
      JSON.stringify(["Mensal (30 dias)", "Quadrimestral (4 meses)", "Semestral (6 meses)", "Os planos quadrimestrais e semestrais podem ser adquiridos via cartão de crédito, com opção de parcelamento sem juros."])]
  )

  await db.execute(
    `INSERT INTO planos (titulo, preco, link, tipo, botao, beneficios) VALUES (?, ?, ?, ?, ?, ?)`,
    ['Fisioterapia', 'Atendimento individualizado!', 'https://wa.me/558388435842', 'principal', 'Fale conosco no Whatsapp!',
      JSON.stringify(["Avaliação fisioterapêutica completa", "Plano de tratamento personalizado", "Acompanhamento contínuo"])]
  )

  // PLANOS DETALHADOS
  await db.execute(
    `INSERT INTO planos_detalhados (titulo, opcoes) VALUES (?, ?)`,
    ['1x por semana', JSON.stringify([
      { nome: "Mensal", preco: "R$ 180" },
      { nome: "Quadrimestral", preco: "R$ 170" },
      { nome: "Semestral", preco: "R$ 160" }
    ])]
  )

  await db.execute(
    `INSERT INTO planos_detalhados (titulo, opcoes) VALUES (?, ?)`,
    ['2x por semana', JSON.stringify([
      { nome: "Mensal", preco: "R$ 280" },
      { nome: "Quadrimestral", preco: "R$ 265" },
      { nome: "Semestral", preco: "R$ 250" }
    ])]
  )

  await db.execute(
    `INSERT INTO planos_detalhados (titulo, opcoes) VALUES (?, ?)`,
    ['3x por semana', JSON.stringify([
      { nome: "Mensal", preco: "R$ 370" },
      { nome: "Quadrimestral", preco: "R$ 360" },
      { nome: "Semestral", preco: "R$ 350" }
    ])]
  )

  // DEPOIMENTOS
  await db.execute(`
    INSERT INTO depoimentos (nome, texto, estrelas) VALUES 
    ('@gabibcunha', 'Natália é uma profissional incrível!', 5),
    ('@maosdefadaenf', 'Uma pessoa e profissional incrível!', 5),
    ('@layseformiga', 'Uma profissional excelente!', 5),
    ('@ryslania_santos', 'Profissional dedicada, amorosa, empática e entre muitos outos adjetivos!', 4),
    ('@profciencias', 'Pessoa meiga, cativante e acolhedora. A melhor profissional que conheço porque faz tudo com muito amor!', 4),
    ('@sabrina.imagemestilo', 'Uma profissional maravilhosa, dedicada e atenciosa! Amiga linda que eu amo que o pilates me deu!', 5)
  `)

  // FOOTER
  await db.execute(`
    INSERT INTO footer (titulo, descricao, telefone, instagram, facebook, email, endereco, mapa) VALUES 
    ('Studio Natália Araújo', 'Especialista em fisioterapia e pilates terapêutico...', '(83) 98843-5842', '@nataliaaraujofisiopilates', 'Natália Araújo Fisiopilates', 'nataliaaraujofisiopilates@gmail.com', 'João Pessoa - PB', 'https://www.google.com/maps?q=...')
  `)

  console.log("Seeds executados com sucesso!")

}

seeds()