import { connect } from "react-redux";
import Link from "next/link";
import { getNewArrivals } from "../../../actions/product";
import { Fragment, useEffect } from "react";
import { withTranslation } from "../../../i18n";
import { compose } from "redux";
import PriceFormat from "./PriceFormat";
import LazyLoadImage from "../LazyLoadImage";

const NewArrivals = ({
  product: { newArrivals, loadingNewArrivals },
  payment: { rate },
  getNewArrivals,
  t
}) => {
  const commissionTwo = process.env.NEXT_PUBLIC_COMMISSION_TWO;
  useEffect(() => {
    getNewArrivals();
  }, [getNewArrivals]);
  return (
    <div className="ps-product-list ps-new-arrivals">
      <div className="ps-container">
        <div className="ps-section__header">
          <h3>{t("hot-new-arrivals")}</h3>
          {/* <ul className="ps-section__links">
                        <li>
                            <Link href="#">
                                <a>Technologies</a></Link>
                        </li>
                    </ul> */}
        </div>
        <div className="ps-section__content">
          <div className="row">
            {loadingNewArrivals ? (
              <span className="col d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">{t("loading")}</span>
                </div>
              </span>
            ) : (
              <Fragment>
                {newArrivals.map(({ slides, title, price, _id }) => (
                  <div
                    key={_id}
                    className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12"
                  >
                    <div className="ps-product--horizontal">
                      <div className="ps-product__thumbnail">
                        <LazyLoadImage height={75}>
                          <Link href={`/products/product_detail?product_id=${_id}`}>
                            <a>
                              <img alt={title} src={slides[0]} />
                            </a>
                          </Link>
                        </LazyLoadImage> 
                      </div>
                      <div className="ps-product__content">
                        <Link href={`/products/product_detail?product_id=${_id}`}>
                          <a className="ps-product__title">{title}</a>
                        </Link>
                        <div
                          style={{ display: "none" }}
                          className="ps-product__rating"
                        >
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
                        <p className="ps-product__price">
                          {!rate ? (
                            <span
                              className="spinner-border"
                              role="status"
                            ></span>
                          ) : (
                            <PriceFormat 
                            locale="en-US"
                            currencyCode="USD"
                            price={price * rate * commissionTwo} />
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
  payment: state.payment,
});

export default compose(
  connect(mapStateToProps, { getNewArrivals }),
  withTranslation("landing")
)(NewArrivals);
