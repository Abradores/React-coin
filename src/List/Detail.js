import React, { Component } from "react";
import "./Detail.css";
import { API_URL } from "./Helpers/config";
import { handleResponse, renderChangePercentage } from "./Helpers/handler";
import Loading from "../common/loading";

export class Detail extends Component {
  constructor() {
    super();
    this.state = { currency: {}, loading: false, error: false };
  }

  componentDidMount() {
    const currencyid = this.props.match.params.id;
    this.fetchCurrency(currencyid);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      const newCurrencyId = nextProps.match.params.id;
      this.fetchCurrency(newCurrencyId);
    }
  }

  fetchCurrency(currencyId) {
    const currencyid = this.props.match.params.id;
    this.setState({ loading: true });
    fetch(API_URL + "/cryptocurrencies/" + currencyid)
      .then(handleResponse)
      .then(currency =>
        this.setState({ loading: false, error: null, currency: currency })
      )
      .catch(error =>
        this.setState({ loading: false, error: error.errorMessage })
      );
  }
  render() {
    const { loading, error, currency } = this.state;

    if (loading) {
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );
    }
    if (error) {
      return <div className="error">{error}</div>;
    }
    return (
      <div className="Detail">
        <h1 className="Detail-heading">
          {" "}
          {currency.name} ({currency.symbol})
        </h1>
        <div className="Detail-container">
          <div className="Detail-item">
            Price<span className="Detail-value">${currency.price}</span>
          </div>
          <div className="Detail-item">
            Rank<span className="Detail-value">${currency.rank}</span>
          </div>
          <div className="Detail-item">
            24hr Change
            <span className="Detail-value">
              {renderChangePercentage(currency.percentChange24h)}
            </span>
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Market Cap</span>
            <span className="Detail-dollar">$</span>
            {currency.marketCap}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">24H Volume</span>
            <span className="Detail-dollar">$</span>
            {currency.volume24h}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Total Supply</span>
            {currency.totalSupply}
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
