const ShopFilter = () => {
  return (
    <div className="header__filter">
      <button className="ps-shop__filter-mb" id="filter-sidebar">
        <i className="lnr lnr-funnel"></i>
        <span>Filter</span>
        <i className="lnr lnr-chevron-down chev"></i>
      </button>
      <div className="header__sort">
        <i className="lnr lnr-sort-amount-asc"></i>
        <select
          style={{ padding: "6px 0px" }}
          className="ps-select select2-hidden-accessible"
          data-select2-id="1"
          tabIndex="-1"
          aria-hidden="true"
        >
          <option value="1" data-select2-id="3">
            Sort by
          </option>
          <option value="2" data-select2-id="9">
            Sort by average rating
          </option>
          <option value="3" data-select2-id="10">
            Sort by latest
          </option>
          <option value="4" data-select2-id="11">
            Sort by price: low to high
          </option>
          <option value="5" data-select2-id="12">
            Sort by price: high to low
          </option>
        </select>
      </div>
    </div>
  );
};

export default ShopFilter;
