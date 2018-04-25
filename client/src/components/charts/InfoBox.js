import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import './InfoBox.css';
import { fetchCurrency } from '../../actions';

class InfoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPrice: null,
      monthChangeD: null,
      monthChangeP: null,
      updatedAt: null
    }
  }
  componentDidMount(){
    this.getData = () => {
      const {data} = this.props;
      console.log('Infobox', this.props);
      const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

      fetch(url).then(r => r.json())
        .then((bitcoinData) => {
          const price = bitcoinData.bpi.USD.rate_float;
          const change = price - data[0].y;
          const changeP = (price - data[0].y) / data[0].y * 100;

          this.setState({
            currentPrice: bitcoinData.bpi.USD.rate_float,
            monthChangeD: change.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
            monthChangeP: changeP.toFixed(2) + '%',
            updatedAt: bitcoinData.time.updated
          })
        })
        .catch((e) => {
          console.log(e);
        });
    }
    this.getData();
    this.refresh = setInterval(() => this.getData(), 90000);
  }
  componentWillUnmount(){
    clearInterval(this.refresh);
  }
  render(){
    const { prices } = this.props;
    console.log('Infobox 2', this.props);
    return (
      <div id="data-container">

          <div id="left" className='box'>
            <div className='heading'>Price History</div>
            {/*<div className="heading">{this.state.currentPrice.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' })}</div>*/}
          </div>

        { this.state.currentPrice ?
          <div id="middle" className='box'>
            <div className="heading">{this.state.monthChangeD}</div>
            <div className="subtext">Change Since Last Month (USD)</div>
          </div>
          : null}
        <div id="right" className='box'>
          <div className="heading">{this.state.monthChangeP}</div>
          <div className="subtext">Change Since Last Month (%)</div>
        </div>

      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   prices: state.prices,
// });

// function mapStateToProps(state) ({
  // const prices = state;
  // return prices;
  // prices: state.prices,
// });

// export default connect(mapStateToProps, { fetchCurrency })(InfoBox);

export default InfoBox;
