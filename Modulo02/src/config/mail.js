export default {
  host: 'smtp.mailtrap.io',
  port: '2525',
  secure: false,
  auth: {
    user: '1a26d1e1724461',
    pass: '0681fcb3b6d233',
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
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
