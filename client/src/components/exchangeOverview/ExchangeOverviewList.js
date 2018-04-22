import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExchanges } from '../../actions';
import { Table, Image, Loader, Dimmer } from 'semantic-ui-react';

class ExchangeOverviewList extends Component {
  componentDidMount() {
    this.props.fetchExchanges();
  }

  renderExchanges() {
    return this.props.exchanges.exchanges.map(exchange => {
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
  const { exchanges } = state;
  const { isFetching, isEmpty } = exchanges || {
    isFetching: true,
    isEmpty: true,
    exchanges: [],
  }
  return { exchanges, isFetching, isEmpty };
}

export default connect(mapStateToProps, { fetchExchanges })(ExchangeOverviewList);
