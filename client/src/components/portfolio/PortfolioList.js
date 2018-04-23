import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPortfolio } from '../../actions';
import { Table, Image, Dimmer, Loader, Icon, Button } from 'semantic-ui-react';
import { deleteCurrency } from '../../actions';

class PortfolioList extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state
  // }
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

  renderPortfolio() {
    return this.props.portfolio.portfolio.map(portfolio => {
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
  const { portfolio } = state;
  const { isFetching, isEmpty } = portfolio || {
    isFetching: true,
    isEmpty: true,
    portfolio: [],
  };
  return { portfolio, isFetching, isEmpty };
}

export default connect(mapStateToProps, { fetchPortfolio, deleteCurrency })(PortfolioList);
