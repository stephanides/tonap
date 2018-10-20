import * as React from "react";

const Pagination = (props) => {
  const {handleChangeItemsPerPage, handleChangePage, itemsPerPage, page, pagesCount} = props;
  let pageItemBtn: Array<JSX.Element> = [];

  for(let i: number = 0; i < pagesCount; i++) {
    pageItemBtn.push(
      <li className={page === (i+1) ? "page-item active" : "page-item"} key={i+1}>
        <button
          type="button"
          className="page-link btn-link"
          onClick={() => handleChangePage(i+1)}
        >{i+1}</button>
      </li>
    );
  }

  return(
    <div className="position-fixed w-100" style={{
      bottom: 0,
      backgroundColor: "#fff",
    }}>
      <div className="row">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className={page > 1 ? "page-item" : "page-item disabled"}>
              <button
                type="button"
                disabled={page > 1 ? false : true}
                className="page-link btn-link"
                onClick={() => handleChangePage(page-1)}
              >Previous</button>
            </li>
            {pageItemBtn}
            <li className={page === pagesCount ? "page-item disabled" : "page-item"}>
              <button
                type="button"
                disabled={page === (pagesCount) ? true : false}
                className="page-link btn-link"
                onClick={() => handleChangePage(page+1)}
              >Next</button>
            </li>
          </ul>
        </nav>
        <div className="form-group ml-2">
          <select
            className="form-control"
            onChange={(e) => {
              const itemsPerPage: number = parseInt(e.currentTarget.value);

              handleChangeItemsPerPage(itemsPerPage);
            }}
            value={itemsPerPage}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={51}>&infin;</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
