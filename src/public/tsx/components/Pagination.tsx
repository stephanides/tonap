import * as React from "react";
import PaginationJS from "react-js-pagination";

const Pagination = (props) => {
  const {dataTotalLength, handleChangeItemsPerPage, handleChangePage, itemsPerPage, page, pagesMax} = props;
  
  return(
    <div className="position-fixed w-100" style={{
      bottom: 0,
      backgroundColor: "#fff",
    }}>
      <div className="row">
        <div className="col-12">
          <div className="row">
            <nav aria-label="Page navigation">
              <PaginationJS
                activePage={page}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={dataTotalLength}
                pageRangeDisplayed={pagesMax}
                onChange={handleChangePage}
                prevPageText={"Predošĺa"}
                nextPageText={"Ďalšia"}
                firstPageText={"Prvá strana"}
                lastPageText={"Posledná strana"}
                itemClass={"page-item"}
                linkClass={"page-link"}
              />
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
                <option value={5000000}>&infin;</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
