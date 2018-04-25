import React, { Component } from 'react';
import moment from 'moment';
import './PriceHistory';
import LineChart from './LineChart';
import ToolTip from './ToolTip';
import InfoBox from './InfoBox';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Button } from 'semantic-ui-react';
import { fetchCurrency } from '../../actions';

class PriceHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingData: true,
      data: null,
      hoverLoc: null,
      activePoint: null,
    };
  }

  handleChartHover(hoverLoc, activePoint) {
    this.setState({
      hoverLoc: hoverLoc,
      activePoint: activePoint,
    });
  }

  componentDidMount() {
    this.props.fetchCurrency(this.props.match.params.id);
  }

  render() {
    const { data, fetchingData } = this.props;

    return (
      <Container className='content'>
        <div className='row'>
          {/*{ !fetchingData ?*/}
            {/*<InfoBox data={data} />*/}
            {/*: null }*/}
        </div>
        <div className='row'>
          <div className='popup'>
            {this.state.hoverLoc ? <ToolTip hoverLoc={this.state.hoverLoc} activePoint={this.state.activePoint}/> : null}
          </div>
        </div>
        <div className='row'>
          <div className='chart'>
            { !fetchingData ?
              <LineChart data={data} onChartHover={ (a, b) => this.handleChartHover(a, b) }/>
              : null }
          </div>
        </div>
        <div className="row">
          <Button
            labelPosition='left'
            as={ Link }
            to='/dashboard'
            icon='left chevron'
            content='Back' />
        </div>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { data, fetchingData } = state.currencies;
  return {
    data,
    fetchingData,
  };
}

export default connect(mapStateToProps, { fetchCurrency })(PriceHistory);
