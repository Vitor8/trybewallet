import React from 'react';
import '../css/Wallet.css';

function HeaderTable() {
  return (
    <tr className="header-table">
      <th className="header-title">Descrição</th>
      <th className="header-title">Tag</th>
      <th className="header-title">Método de pagamento</th>
      <th className="header-title">Valor</th>
      <th className="header-title">Moeda</th>
      <th className="header-title">Câmbio utilizado</th>
      <th className="header-title">Valor convertido</th>
      <th className="header-title">Moeda de conversão</th>
      <th className="header-title">Editar/Excluir</th>
    </tr>
  );
}

export default HeaderTable;
