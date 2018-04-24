import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, searchCurrency } from '../../actions';
import { Table, Image, Loader, Dimmer } from 'semantic-ui-react';
import SearchBar  from '../SearchBar';

class CoinOverviewList extends Component {
  componentDidMount() {
    this.props.fetchCurrencies();
  }

  renderImage(currency) {
    if (!currency.imageUrl) return null;
    try {
      return (
        <Image avatar
               src={ require(`../../resources${currency.imageUrl}`) }
        />
      );
    } catch (err) {
      return null;
    }
  }

  searchValue = (e) => {
    this.props.searchCurrency(e);
  };

  // TODO: Display Statistics
  renderCurrencies() {
    return this.props.coins.map(currency => {
      return (
        <Table.Row key={ currency._id }>
          <Table.Cell>
            {this.renderImage(currency)}
          </Table.Cell>
          <Table.Cell>{ currency.fullName } ({ currency.shortName })</Table.Cell>
          <Table.Cell>{ currency.priceEUR } EUR</Table.Cell>
          <Table.Cell>--</Table.Cell>
          <Table.Cell positive>--</Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    return (
      <div>
        <SearchBar searchCurrency={searchCurrency} onSearch={ this.searchValue } />
        { this.props.isFetching || this.props.isEmpty ?
          <Dimmer active>
            <Loader />
          </Dimmer>
          :
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Logo</Table.HeaderCell>
                <Table.HeaderCell>Currency</Table.HeaderCell>
                <Table.HeaderCell>Market Price</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>Total</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{ this.renderCurrencies() }</Table.Body>
          </Table>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { currencies, coins, value } = state.currencies;
  const { isFetching, isEmpty } = state.currencies || {
    isFetching: true,
    isEmpty: true,
    currencies: [],
    value: '',
  };
  return {
    currencies,
    isFetching,
    isEmpty,
    value,
    coins,
  };
}

export default connect(mapStateToProps, { fetchCurrencies, searchCurrency })(CoinOverviewList);
