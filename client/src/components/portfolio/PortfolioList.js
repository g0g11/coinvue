import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPortfolio } from '../../actions';
import { Table, Image, Dimmer, Loader, Icon } from 'semantic-ui-react';
import { deleteCurrency, searchPortfolio } from '../../actions';
import SearchBar  from '../SearchBar';
import PieChartByCoin from '../charts/PieChartByCoin';
import PieChartByExchange from '../charts/PieChartByExchange';

class PortfolioList extends Component {
  componentDidMount() {
    this.props.fetchPortfolio();
  }

  renderImage(portfolio) {
    if (!portfolio.currency.imageUrl) return null;
    try {
      return (
        <Image avatar
               src={ require(`../../resources${portfolio.currency.imageUrl}`) }
        />
      );
    } catch (err) {
      return null;
    }
  }

  deleteCoin(id) {
    this.props.deleteCurrency(id);
  }

  searchValue = (e) => {
    this.props.searchPortfolio(e);
  };

  renderPortfolio() {
    const { coins } = this.props;

    return coins.map(portfolio => {
      return (
        <Table.Row key={ portfolio.currency._id }>
          <Table.Cell>
            { this.renderImage(portfolio) }
          </Table.Cell>
          <Table.Cell>{ portfolio.currency.fullName } ({ portfolio.currency.shortName })</Table.Cell>
          <Table.Cell>{ portfolio.currency.priceEUR } EUR</Table.Cell>
          <Table.Cell>{ portfolio.amount }</Table.Cell>
          <Table.Cell positive>{ portfolio.amount * portfolio.currency.priceEUR } EUR</Table.Cell>
          <Table.Cell>{ portfolio.exchange.name }</Table.Cell>
          <Table.Cell><Icon link
            onClick={ this.deleteCoin.bind(this, portfolio._id) }
            name='delete' /></Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    return (
      <div>
        <SearchBar searchPortfolio={searchPortfolio} onSearch={ this.searchValue } />
        <PieChartByCoin data={ this.props.coins } />
        <PieChartByExchange data={ this.props.coins } />
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
              <Table.HeaderCell>Exchange</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{ this.renderPortfolio() }</Table.Body>
        </Table>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { portfolio, coins, value } = state.portfolio;
  const { isFetching, isEmpty } = state.portfolio || {
    isFetching: true,
    isEmpty: true,
    portfolio: [],
    value: '',
  };
  return {
    portfolio,
    isFetching,
    isEmpty,
    value,
    coins,
  };
}

export default connect(mapStateToProps, {
  fetchPortfolio,
  deleteCurrency,
  searchPortfolio,
})(PortfolioList);
