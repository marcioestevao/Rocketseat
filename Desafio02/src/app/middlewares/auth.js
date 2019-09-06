import jwt from 'jsonwebtoken';
import { promisify } from 'util'; // util já padrão da instalação do node

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // O split vai ser separado em um array, e cada parte do script vai
  // ser atribuido a uma variável
  // const [bearer, token] = authHeader.split(' ');

  // Mas como eu vou utilizar somente o token, posso fazer da seguinte maneira na
  // desestruturação:
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    console.log(decoded);

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
