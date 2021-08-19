import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as currenciesActions from '../actions/index';
import HeaderTable from '../components/HeaderTable';
import HeaderWallet from '../components/HeaderWallet';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalExpense: 0,
      currentCurrency: 'BRL',
      shouldRenderForm: false,
      value: '',
      description: '',
      chosenCurrency: 'USD',
      method: '',
      tag: '',
    };
    this.showCurrencies = this.showCurrencies.bind(this);
  }

  componentDidMount() {
    this.showCurrencies();
  }

  removeExpense(id) {
    const { expenses, removeExpense } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    let totalExpense = 0;
    newExpenses.forEach((expense) => {
      const expnseValue = expense.value * expense.exchangeRates[expense.currency].ask;
      totalExpense += expnseValue;
    });
    this.setState((prevState) => ({
      ...prevState,
      totalExpense,
    }));
    removeExpense(newExpenses);
  }

  showCurrencies() {
    const { getCurrencies } = this.props;
    getCurrencies();
    this.setState({ shouldRenderForm: true });
  }

  addExpense() {
    const { getCurrencies } = this.props;
    getCurrencies(); // getCurrencies atualiza valor de currencies na store do redux
    const { value, description, chosenCurrency, method, tag } = this.state;
    const { currencies, addNewExpense, expenses } = this.props;
    const newExpense = {
      id: expenses.length,
      value,
      currency: chosenCurrency,
      method,
      tag,
      description,
      exchangeRates: currencies,
    };
    addNewExpense(newExpense);
    const askToConvert = currencies[chosenCurrency].ask;
    this.setState((prevState) => ({
      ...prevState,
      totalExpense: prevState.totalExpense + (value * askToConvert),
    }));
  }

  renderMethodAndTag() {
    return (
      <div className="method-tag-wallet">
        <label htmlFor="pagamento">
          Método de pagamento
          <select
            id="pagamento"
            onChange={ (e) => this.setState({ method: e.target.value }) }
            className="input-wallet-method"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            id="tag"
            onChange={ (e) => this.setState({ tag: e.target.value }) }
            className="input-wallet-tag"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }

  renderTable() {
    const { expenses } = this.props;
    return (
      <div>
        <table className="table">
          <HeaderTable />
          { expenses.map((expense, index) => {
            const valueToConvert = expense.value;
            const exchangeRate = expense.exchangeRates[expense.currency].ask;
            const convertedValue = valueToConvert * exchangeRate;
            return (
              <tr key={ index } className="row-table">
                <td className="table-content">{ expense.description }</td>
                <td className="table-content">{ expense.tag }</td>
                <td className="table-content">{ expense.method }</td>
                <td className="table-content">{ expense.value }</td>
                <td className="table-content">
                  { expense.exchangeRates[expense.currency].name }
                </td>
                <td className="table-content">
                  { (Math.round(exchangeRate * 100) / 100) }
                </td>
                <td className="table-content">
                  {
                    Math.round(convertedValue * 100) / 100
                  }
                </td>
                <td className="table-content">Real</td>
                <td className="table-content">
                  <button
                    id={ expense.id }
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.removeExpense(index, convertedValue) }
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }

  renderHeader() {
    const { userEmail } = this.props;
    const { totalExpense, currentCurrency } = this.state;
    return (
      <HeaderWallet
        userEmail={ userEmail }
        totalExpense={ totalExpense }
        currentCurrency={ currentCurrency }
      />
    );
  }

  renderForm() {
    const { currencies } = this.props;
    return (
      <form className="form-wallet">
        <label htmlFor="value">
          Valor
          <input
            id="value"
            type="text"
            name="valor"
            onChange={ (e) => this.setState({ value: e.target.value }) }
            className="input-wallet-value"
          />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select
            id="moeda"
            onChange={ (e) => this.setState({ chosenCurrency: e.target.value }) }
            className="input-wallet-currency"
          >
            { Object.keys(currencies).map((currency) => {
              if (currency !== 'USDT' && currency !== 'DOGE') {
                return (
                  <option key={ currency } value={ currency }>{ currency }</option>
                );
              } return null;
            }) }
          </select>
        </label>
        { this.renderMethodAndTag() }
        <label htmlFor="description" className="label-wallet-description">
          <span>Descrição</span>
          <textarea
            id="description"
            type="text"
            name="description"
            onChange={ (e) => this.setState({ description: e.target.value }) }
            className="input-wallet-description"
          />
        </label>
        <button type="button" onClick={ () => this.addExpense() } className="button">
          Adicionar despesa
        </button>
      </form>
    );
  }

  render() {
    const { shouldRenderForm } = this.state;
    const { expenses } = this.props;
    return (
      <div>
        <span>{ this.renderHeader() }</span>
        <span>{ !shouldRenderForm ? <p>Carregando...</p> : this.renderForm() }</span>
        <div>
          { expenses.length === 0 ? <div /> : this.renderTable() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => { dispatch(currenciesActions.getCurrencies()); },
  addNewExpense: (newExpense) => dispatch(currenciesActions.addExpense(newExpense)),
  removeExpense: (newExpenses) => dispatch(currenciesActions.removeExpense(newExpenses)),
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  addNewExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
