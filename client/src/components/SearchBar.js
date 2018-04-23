import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { searchPortfolio, searchCurrency } from '../actions';

class SearchBar extends Component {
  handleSearch = (e) => {
    this.props.onSearch(e);
  };

  render() {
    const { value } = this.props;

    return (
      <div>
        <Input
          className="search-field"
          placeholder = "Search"
          onChange={ (e) => this.handleSearch(e.target.value) }
          icon='search'
          value={ value } />
      </div>
    );
  }
}

function mapStateToProps({ coins }) {
  return {
    value: coins,
  };
}

export default connect(mapStateToProps, {
  searchPortfolio,
  searchCurrency,
})(SearchBar);
