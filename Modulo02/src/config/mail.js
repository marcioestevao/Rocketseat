export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
  proxy: 'http://10.10.190.25:3128',
};

/**
 * Se precisar enviar e-mail, pesquisar sober os seguintes serviços:
 * Amazon SES
 * Mailgun
 * Sparkpost
 * Mandril (mailchimp)
 *
 * Gmail (não recomendado, pois tem limite de envio)
 * para teste dev, vamos utilizar Mailtrap (que funciona apenas para ambiente de desenvolvimento)
 */
