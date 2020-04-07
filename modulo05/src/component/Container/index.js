import styled from 'styled-components';

// Este container estava estilizado para a utilização somente no
// Main. Como precisava utilizá-lo também na rota repository, criou-se ele
// como um componente, que pode ser reaproveitado em vários locais

// Para cada componente utilizado, cria-se uma pasta dentro de components.
// Assim se precisar de uma reestilização, fica mais fácil

const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

export default Container;
