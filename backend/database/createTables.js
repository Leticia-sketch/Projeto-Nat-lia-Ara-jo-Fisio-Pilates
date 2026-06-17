const connect = require("./connection")

async function createTables() {

  const db = await connect()

  // ADMIN
  await db.execute(`
    CREATE TABLE IF NOT EXISTS admins (
      id INT PRIMARY KEY AUTO_INCREMENT,
      email VARCHAR(255),
      senha VARCHAR(255)
    )
  `)

  // HERO
  await db.execute(`
    CREATE TABLE IF NOT EXISTS hero (
      id INT PRIMARY KEY AUTO_INCREMENT,
      titulo VARCHAR(255),
      botao VARCHAR(255)
    )
  `)

  // ESTUDIO
  await db.execute(`
    CREATE TABLE IF NOT EXISTS estudio (
      id INT PRIMARY KEY AUTO_INCREMENT,
      titulo VARCHAR(255),
      texto TEXT
    )
  `)

  // SOBRE
  await db.execute(`
    CREATE TABLE IF NOT EXISTS sobre (
      id INT PRIMARY KEY AUTO_INCREMENT,
      titulo VARCHAR(255),
      texto TEXT,
      lista TEXT
    )
  `)

  // PLANOS
  await db.execute(`
    CREATE TABLE IF NOT EXISTS planos (
      id INT PRIMARY KEY AUTO_INCREMENT,
      titulo VARCHAR(255),
      preco VARCHAR(255),
      link VARCHAR(255),
      tipo VARCHAR(255),
      botao VARCHAR(255),
      beneficios TEXT
    )
  `)

  // SERVICOS (depois de planos por causa da FOREIGN KEY)
  await db.execute(`
    CREATE TABLE IF NOT EXISTS servicos (
      id INT PRIMARY KEY AUTO_INCREMENT,
      titulo VARCHAR(255),
      img VARCHAR(255),
      texto TEXT,
      link VARCHAR(255),
      plano_id INT,
      FOREIGN KEY (plano_id) REFERENCES planos(id)
    )
  `)

  // PLANOS DETALHADOS
  await db.execute(`
    CREATE TABLE IF NOT EXISTS planos_detalhados (
      id INT PRIMARY KEY AUTO_INCREMENT,
      titulo VARCHAR(255),
      opcoes TEXT
    )
  `)

  // DEPOIMENTOS
  await db.execute(`
    CREATE TABLE IF NOT EXISTS depoimentos (
      id INT PRIMARY KEY AUTO_INCREMENT,
      nome VARCHAR(255),
      texto TEXT,
      estrelas INT
    )
  `)

  // FOOTER
  await db.execute(`
    CREATE TABLE IF NOT EXISTS footer (
      id INT PRIMARY KEY AUTO_INCREMENT,
      titulo VARCHAR(255),
      descricao TEXT,
      telefone VARCHAR(255),
      instagram VARCHAR(255),
      facebook VARCHAR(255),
      email VARCHAR(255),
      endereco VARCHAR(255),
      mapa TEXT
    )
  `)

  console.log("Tabelas criadas com sucesso!")

}

createTables()