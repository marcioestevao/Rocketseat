import User from '../models/User';

class UserController {
  async store(req, res) {
    // Tratamento para verificar se o email do usuário ja existe
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // Deste modo retorna sempre todos os campos criados na tabela
    /*
    const user = await User.create(req.body);

    return res.json(user);
    */

    // Se desejar que só retorne alguns campos (evitando trafegar informações
    // desnecessárias), faz-se da seguinte maneira:
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      // Repete a validação de e-mail utilizada acima
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    /*
      Ele só vai verificar a senha antiga, caso ele tenha informado
      o campo oldPassword
    */
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
