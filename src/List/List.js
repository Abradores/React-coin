import React, { Component } from "react";
import { handleResponse } from "./Helpers/handler";
import { API_URL } from "./Helpers/config";
import Loading from "../common/loading";
import Table from "./table";
import Pagination from "./pagination";

export class List extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      array1: [],
      error: null,
      totalPages: 0,
      page: 1,
    };
  }
  componentDidMount() {
    this.FetchCurrencies();
  }

  HandlePaginationClick = (direction) => {
    let NextPage = this.state.page;
    if (direction === "next") {
      NextPage++;
    } else {
      NextPage--;
    }
    this.setState({ page: NextPage }, () => this.FetchCurrencies());
  };

  FetchCurrencies() {
    const { page } = this.state;
    this.setState({ loading: true });

    fetch(API_URL + "/cryptocurrencies?page=" + page + "&perPage=20")
      .then(handleResponse)
      .then((data) => {
        const { currencies, totalPages } = data;
        this.setState({
          array1: currencies,
          totalPages: totalPages,
          loading: false,
        });
        console.log("Success", data);
      })
      .catch((error) => {
        this.setState({ error: error.errorMessage, loading: false });
        console.log("Error", error);
      });
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );
    }
    if (this.state.error) {
      return <div className="error"> {this.state.error}</div>;
    }
    return (
      <div>
        <Table currencies={this.state.array1} />
        <Pagination
          page={this.state.page}
          totalPages={this.state.totalPages}
          HandlePaginationClick={this.HandlePaginationClick}
        />
      </div>
    );
  }
}

export default List;
