import React from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { handleResponse } from "../List/Helpers/handler";
import Loading from "./loading";
import { API_URL } from "../List/Helpers/config";
import "./Search.css";

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchResults: [],
      searchQuery: "",
      loading: false,
    };

    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const searchQuery = e.target.value;

    this.setState({ searchQuery });

    if (!searchQuery) {
      return false;
    }
    this.setState({ loading: true });

    fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
      .then(handleResponse)
      .then((result) => {
        this.setState({
          searchResults: result,
          loading: false,
        });
      });
  }

  handleRedirect(currencyId) {
    this.setState({
      searchQuery: "",
      searchResults: [],
    });

    this.props.history.push({ pathname: `/currency/${currencyId}` });
  }

  renderSearchResults() {
    const { searchResults, searchQuery, loading } = this.state;
    if (this.state.searchResults) {
      console.log(this.state.searchResults);
    }

    if (!searchQuery) {
      return "";
    }

    if (searchResults.length > 0) {
      return (
        <div className="Search-result-container">
          {searchResults.map((result) => (
            <Link
              to={{
                pathname: "/currency/" + result.id,
              }}
              key={result.id}
              onClick={() => this.handleRedirect(result.id)}
            >
              {console.log(result.id)}
              <div className="Search-result">
                {result.name} ({result.symbol})
              </div>
            </Link>
          ))}
        </div>
      );
    }

    if (!loading) {
      return (
        <div className="Search-result-container">
          <div className="Search-no-result">No results found.</div>
        </div>
      );
    }
  }

  render() {
    const { searchQuery, loading } = this.state;

    return (
      <div className="Search">
        <div>
          <span className="Search-icon" />
          <input
            onChange={this.handleChange}
            type="text"
            className="Search-input"
            placeholder="Currency name"
            value={searchQuery}
          />

          {loading && (
            <div className="Search-loading">
              <Loading width="12px" height="12px" />
            </div>
          )}
        </div>

        {this.renderSearchResults()}
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Search);
