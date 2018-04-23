import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExchanges, searchExchange } from '../../actions';
import { Table, Loader, Dimmer } from 'semantic-ui-react';
import SearchBar  from '../SearchBar';

class ExchangeOverviewList extends Component {
  componentDidMount() {
    this.props.fetchExchanges();
  }

  searchValue = (e) => {
    this.props.searchExchange(e);
  };

  renderExchanges() {
    const { coins } = this.props;
    return this.props.coins.map(exchange => {
      return (
        <Table.Row key={ exchange._id }>
          <Table.Cell>{ exchange.name }</Table.Cell>
          <Table.Cell positive>--</Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    return (
      <div>
        <SearchBar searchExchange={ searchExchange } onSearch={ this.searchValue } />
        { this.props.isFetching || this.props.isEmpty ?
          <Dimmer active>
            <Loader />
          </Dimmer>
          :
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Something</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{ this.renderExchanges() }</Table.Body>
          </Table>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { exchanges, value, coins } = state.exchanges;
  const { isFetching, isEmpty } = state.exchanges || {
    isFetching: true,
    isEmpty: true,
    exchanges: [],
    value: '',
  }
  return {
    exchanges,
    isFetching,
    isEmpty,
    value,
    coins,
  };
}

export default connect(mapStateToProps, {
  fetchExchanges,
  searchExchange,
})(ExchangeOverviewList);
