import nodemailer from "nodemailer"

interface EnviarEmailParams {
  para: string
  assunto: string
  html: string
  texto: string
}

const NOME_REMETENTE = process.env.MAIL_FROM_NAME || "Estúdio Natália Araújo FisioPilates"

// Produção (grátis): Brevo via API HTTPS. Não usa porta SMTP, então funciona no Render grátis.
async function enviarPorBrevo({ para, assunto, html, texto }: EnviarEmailParams): Promise<void> {
  const remetente = process.env.MAIL_FROM

  if (!remetente) {
    throw new Error("MAIL_FROM não definido (use o e-mail remetente verificado no Brevo)")
  }

  const resposta = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY as string,
      "content-type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify({
      sender: { name: NOME_REMETENTE, email: remetente },
      to: [{ email: para }],
      subject: assunto,
      htmlContent: html,
      textContent: texto
    })
  })

  if (!resposta.ok) {
    throw new Error(`Brevo respondeu ${resposta.status}: ${await resposta.text()}`)
  }

  console.log("E-mail enviado via Brevo para:", para)
}

// Desenvolvimento: SMTP configurado no .env ou, se vazio, conta de teste Ethereal
async function criarTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: false,
      auth: { user: SMTP_USER, pass: SMTP_PASS }
    })
  }

  const contaTeste = await nodemailer.createTestAccount()

  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: { user: contaTeste.user, pass: contaTeste.pass }
  })
}

async function enviarPorSmtp({ para, assunto, html, texto }: EnviarEmailParams): Promise<void> {
  const transporter = await criarTransporter()

  const info = await transporter.sendMail({
    from: `"${NOME_REMETENTE}" <${process.env.MAIL_FROM || "no-reply@fisiopilates.com"}>`,
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
}

async function enviarEmail(params: EnviarEmailParams): Promise<void> {
  try {
    if (process.env.BREVO_API_KEY) {
      await enviarPorBrevo(params)
    } else {
      await enviarPorSmtp(params)
    }
  } catch (erro) {
    // Falha de envio nunca derruba a requisição: só vai para o log
    console.error("Erro ao enviar e-mail:", erro)
  }
}

export default { enviarEmail }