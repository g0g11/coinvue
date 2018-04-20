import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPortfolio } from '../../actions';
import { Table, Image } from 'semantic-ui-react';

class PortfolioList extends Component {
  componentDidMount() {
    this.props.fetchPortfolio();
  }

  renderPortfolio() {
    return this.props.portfolio.map(portfolio => {
      return (
        <Table.Row key={ portfolio.currency._id }>
          <Table.Cell>
            <Image avatar
                   src={ `https://www.cryptocompare.com/${portfolio.currency.imageUrl}` } />
          </Table.Cell>
          <Table.Cell>{ portfolio.currency.fullName } ({ portfolio.currency.shortName })</Table.Cell>
          <Table.Cell>{ portfolio.currency.priceEUR } EUR</Table.Cell>
          <Table.Cell>{ portfolio.amount }</Table.Cell>
          <Table.Cell positive>{ portfolio.amount } EUR</Table.Cell>
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
        <Table.Body>{ this.renderPortfolio() }</Table.Body>
      </Table>
    );
  }
}

function mapStateToProps({ portfolio }) {
  return { portfolio };
}

export default connect(mapStateToProps, { fetchPortfolio })(PortfolioList);
