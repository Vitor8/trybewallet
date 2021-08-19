import React from 'react';
import PropTypes from 'prop-types';
import '../css/Wallet.css';

function HeaderWallet({ userEmail, totalExpense, currentCurrency }) {
  const linkLogo = 'https://res.cloudinary.com/crunchbase-production/image/upload/v7oifu5eirdxepzyg0p0';
  const totalExpenseRound = Math.round(totalExpense * 100) / 100;
  return (
    <header className="header-wallet">
      <img
        className="logo-header"
        src={ linkLogo }
        width="45px"
        height="45px"
        alt="logo-trybe"
      />

      <p data-testid="email-field">
        Email
        <label htmlFor="userEmail" className="data-header">
          { userEmail }
        </label>
      </p>
      <p data-testid="total-field">
        Despesa Total
        <label className="data-header" htmlFor="totalExpense">
          { totalExpenseRound }
        </label>
      </p>
      <p data-testid="header-currency-field">
        Câmbio Atual
        <label className="data-header" htmlFor="currentCurrency">
          { currentCurrency }
        </label>
      </p>
    </header>
  );
}

HeaderWallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  totalExpense: PropTypes.number.isRequired,
  currentCurrency: PropTypes.string.isRequired,
};

export default HeaderWallet;
