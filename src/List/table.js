import React from "react";
import "./List.css";
import { withRouter } from "react-router-dom";
import { renderChangePercentage } from "./Helpers/handler";

const Table = props => {
  const { history } = props;
  return (
    <div className="Table-container">
      <table className="Table">
        <thead className="Table-head">
          <tr>
            <th>Cryptocurrencies</th>
            <th>Price</th>
            <th>Market cap</th>
            <th>24H change</th>
          </tr>
        </thead>
        <tbody className="Table-body">
          {props.currencies.map(currency => (
            <tr
              key={currency.id}
              onClick={() => history.push("/currency/" + currency.id)}
            >
              <td>
                <span className="Table-rank"> {currency.rank}</span>
                {currency.name}
              </td>
              <td>
                <span className="Table-dollar">$</span>
                {currency.price}
              </td>
              <td>
                <span className="Table-dollar">$</span>
                {currency.marketCap}
              </td>
              <td>{renderChangePercentage(currency.percentChange24h)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default withRouter(Table);
