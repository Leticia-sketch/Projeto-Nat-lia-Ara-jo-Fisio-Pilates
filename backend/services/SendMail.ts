import nodemailer from "nodemailer"

interface EnviarEmailParams {
  para: string
  assunto: string
  html: string
  texto: string
}

async function criarTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

  // Configuração via .env (produção/apresentação com conta Ethereal fixa)
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    })
  }

  // Fallback: gera uma conta de teste Ethereal automaticamente (dev sem .env configurado)
  const contaTeste = await nodemailer.createTestAccount()

  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: contaTeste.user,
      pass: contaTeste.pass
    }
  })
}

async function enviarEmail({ para, assunto, html, texto }: EnviarEmailParams): Promise<void> {
  try {
    const transporter = await criarTransporter()

    const info = await transporter.sendMail({
      from: '"Estúdio Natália Araújo FisioPilates" <no-reply@fisiopilates.com>',
      to: para,
      subject: assunto,
      text: texto,
      html: html
    })

    const previewUrl = nodemailer.getTestMessageUrl(info)
    if (previewUrl) {
      console.log("E-mail enviado! URL de preview:", previewUrl)
    } else {
      console.log("E-mail enviado para:", para)
    }
  } catch (erro) {
    console.error("Erro ao enviar e-mail:", erro)
  }
}

export default { enviarEmail }