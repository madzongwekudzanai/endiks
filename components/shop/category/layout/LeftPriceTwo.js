const LeftPriceTwo = () => {
  return (
    <figure>
      <h4 className="widget-title">By Price</h4>
      <div className="ps-checkbox">
        <input
          className="form-control"
          type="checkbox"
          id="review-1"
          name="review"
        />
        <label htmlFor="review-1">
          <span>
            <i className="fas fa-star rate"></i>
            <i className="fas fa-star rate"></i>
            <i className="fas fa-star rate"></i>
            <i className="fas fa-star rate"></i>
            <i className="fas fa-star rate"></i>
          </span>
          <small>(13)</small>
        </label>
      </div>
      <div className="ps-checkbox">
        <input
          className="form-control"
          type="checkbox"
          id="review-2"
          name="review"
        />
        <label htmlFor="review-2">
          <span>
            <i className="fas fa-star rate"></i>
            <i className="fas fa-star rate"></i>
            <i className="fas fa-star rate"></i>
            <i className="fas fa-star rate"></i>
            <i className="fas fa-star"></i>
          </span>
          <small>(13)</small>
        </label>
      </div>
      <div className="ps-checkbox">
        <input
          className="form-control"
          type="checkbox"
          id="review-3"
          name="review"
        />
        <label htmlFor="review-3">
          <span>
            <i className="fas fa-star rate"></i>
            <i className="fas fa-star rate"></i>
            <i className="fas fa-star rate"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </span>
          <small>(5)</small>
        </label>
      </div>
      <div className="ps-checkbox">
        <input
          className="form-control"
          type="checkbox"
          id="review-4"
          name="review"
        />
        <label htmlFor="review-4">
          <span>
            <i className="fas fa-star rate"></i>
            <i className="fas fa-star rate"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </span>
          <small>(5)</small>
        </label>
      </div>
      <div className="ps-checkbox">
        <input
          className="form-control"
          type="checkbox"
          id="review-5"
          name="review"
        />
        <label htmlFor="review-5">
          <span>
            <i className="fas fa-star rate"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </span>
          <small>(1)</small>
        </label>
      </div>
    </figure>
  );
};

export default LeftPriceTwo;
