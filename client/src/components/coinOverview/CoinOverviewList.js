import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../../actions';
import { Table, Image } from 'semantic-ui-react';

class CoinOverviewList extends Component {
  componentDidMount() {
    this.props.fetchCurrencies();
  }

  renderCurrencies() {
    // console.log(this.props.currencies);
    return this.props.currencies.map(currency => {
      console.log(currency);
      return (
        <Table.Row key={ currency._id }>
          <Table.Cell>
            <Image avatar
                   src={ `https://www.cryptocompare.com/${currency.imageUrl}` } />
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
    );
  }
}

function mapStateToProps({ currencies }) {
  return { currencies };
}

export default connect(mapStateToProps, { fetchCurrencies })(CoinOverviewList);
