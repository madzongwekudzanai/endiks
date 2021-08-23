import Link from "next/link";
const one = "/coverimages/productBox/technology/1.jpg";
const two = "/coverimages/productBox/technology/2.jpg";
const three = "/coverimages/productBox/technology/3.jpg";
const four = "/coverimages/productBox/technology/4.jpg";
const five = "/coverimages/productBox/technology/5.jpg";
const six = "/coverimages/productBox/technology/6.jpg";

const CustomerBought = () => {
  return (
    <div className="ps-section--default ps-customer-bought">
      <div className="ps-section__header">
        <h3>Customers who bought this item also bought</h3>
      </div>
      <div className="ps-section__content">
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 ">
            <div className="ps-product">
              <div className="ps-product__thumbnail">
                <Link href="product-default.html">
                  <a>
                    <img src={one} alt="" />
                  </a>
                </Link>
                <div className="ps-product__badge hot">hot</div>
                <ul className="ps-product__actions">
                  <li>
                    <Link href="#">
                      <a
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Read More"
                      >
                        <i className="lnr lnr-cart"></i>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a
                        data-placement="top"
                        title="Quick View"
                        data-toggle="modal"
                        data-target="#product-quickview"
                      >
                        <i className="lnr lnr-eye"></i>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Add to Whishlist"
                      >
                        <i className="lnr lnr-heart"></i>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Compare"
                      >
                        <i className="lnr lnr-chart-bars"></i>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="ps-product__container">
                <Link href="#">
                  <a className="ps-product__vendor">Global Office</a>
                </Link>
                <div className="ps-product__content">
                  <Link href="product-default.html">
                    <a className="ps-product__title">
                      Xbox One Wireless Controller Black Color
                    </a>
                  </Link>
                  <div className="ps-product__rating">
                    <div className="br-wrapper br-theme-fontawesome-stars">
                      <select
                        style={{ display: "none" }}
                        className="ps-rating"
                        data-read-only="true"
                      >
                        <option value="1">1</option>
                        <option value="1">2</option>
                        <option value="1">3</option>
                        <option value="1">4</option>
                        <option value="2">5</option>
                      </select>
                      <div className="br-widget br-readonly">
                        <Link href="#">
                          <a className="br-selected br-current">
                            <i className="fas fa-star"></i>
                          </a>
                        </Link>
                        <Link href="#">
                          <a className="br-selected br-current">
                            <i className="fas fa-star"></i>
                          </a>
                        </Link>
                        <Link href="#">
                          <a className="br-selected br-current">
                            <i className="fas fa-star"></i>
                          </a>
                        </Link>
                        <Link href="#">
                          <a className="br-selected br-current">
                            <i className="fas fa-star"></i>
                          </a>
                        </Link>
                        <Link href="#">
                          <a>
                            <i className="nonSelect fas fa-star"></i>
                          </a>
                        </Link>
                        <div className="br-current-rating">1</div>
                        <span>02</span>
                      </div>
                    </div>
                  </div>
                  <p className="ps-product__price">$55.99</p>
                </div>
                <div className="ps-product__content hover">
                  <Link href="product-default.html">
                    <a className="ps-product__title">
                      Xbox One Wireless Controller Black Color
                    </a>
                  </Link>
                  <p className="ps-product__price">$55.99</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerBought;
