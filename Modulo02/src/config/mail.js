export default {
  host: '',
  port: '',
  secure: false,
  auth: {
    user: '',
    pass: '',
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
