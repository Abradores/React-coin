import React from "react";
import "./pagination.css";

const pagination = props => {
  const { page, totalPages, HandlePaginationClick } = props;
  return (
    <div className="Pagination">
      <button
        className="Pagination-button"
        onClick={() => HandlePaginationClick("prev")}
        disabled={page <= 1}
      >
        &larr;
      </button>
      <span className="Pagination-info">
        {" "}
        page <b>{page}</b> of <b>{totalPages}</b>
      </span>
      <button
        className="Pagination-button"
        onClick={() => HandlePaginationClick("next")}
        disabled={page >= totalPages}
      >
        {" "}
        &rarr;
      </button>
    </div>
  );
};

export default pagination;
