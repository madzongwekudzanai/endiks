import Link from "next/link";
import { withTranslation } from "../../../i18n";

const Right = ({t}) => {
  return (
    <div className="ps-page__right">
      <aside className="widget widget_product widget_features">
        <p>
          <i className="fas fa-globe"></i> {t("worldwide-shipping")}
        </p>
        <p>
          <i className="fas fa-sync-alt"></i> {t("delivery-days")}
        </p>
        <p>
          <i className="fas fa-receipt"></i> {t("supplier-provides-bills")}
        </p>
        <p>
          <i className="far fa-credit-card"></i> {t("easy-checkout")}
        </p>
      </aside>
      <aside className="widget widget_sell-on-site">
        <p>
          <i className="lnr lnr-store"></i> {t("sell-on-endiks")}
          <Link href="/business/become-a-seller">
            <a> {t("register-now")}</a>
          </Link>
        </p>
      </aside>
      {/* <aside className="widget widget_ads">
        <a href="#">
          <img src={prodAds} alt="" />
        </a>
      </aside> */}
      {/* <aside className="widget widget_same-brand">
        <h3>Same Brand</h3>
        <div className="widget__content">
          <div className="ps-product">
            <div className="ps-product__thumbnail">
              <a href="product-default.html">
                <img src={five} alt="" />
              </a>
              <div className="ps-product__badge">-37%</div>
              <ul className="ps-product__actions">
                <li>
                  <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Read More"
                  >
                    <i className="lnr lnr-cart"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    data-placement="top"
                    title="Quick View"
                    data-toggle="modal"
                    data-target="#product-quickview"
                  >
                    <i className="lnr lnr-eye"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add to Whishlist"
                  >
                    <i className="lnr lnr-heart"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Compare"
                  >
                    <i className="lnr lnr-chart-bars"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="ps-product__container">
              <a className="ps-product__vendor" href="#">
                Robert's Store
              </a>
              <div className="ps-product__content">
                <a className="ps-product__title" href="product-default.html">
                  Grand Slam Indoor Of Show Jumping Novel
                </a>
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
                      <span>(01)</span>
                    </div>
                  </div>
                </div>
                <p className="ps-product__price sale">
                  $32.99 <del>$41.00 </del>
                </p>
              </div>
              <div className="ps-product__content hover">
                <a className="ps-product__title" href="product-default.html">
                  Grand Slam Indoor Of Show Jumping Novel
                </a>
                <p className="ps-product__price sale">
                  $32.99 <del>$41.00 </del>
                </p>
              </div>
            </div>
          </div>
          <div className="ps-product">
            <div className="ps-product__thumbnail">
              <a href="product-default.html">
                <img src={six} alt="" />
              </a>
              <div className="ps-product__badge">-5%</div>
              <ul className="ps-product__actions">
                <li>
                  <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Read More"
                  >
                    <i className="lnr lnr-cart"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    data-placement="top"
                    title="Quick View"
                    data-toggle="modal"
                    data-target="#product-quickview"
                  >
                    <i className="lnr lnr-eye"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add to Whishlist"
                  >
                    <i className="lnr lnr-heart"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Compare"
                  >
                    <i className="lnr lnr-chart-bars"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="ps-product__container">
              <a className="ps-product__vendor" href="#">
                Youngshop
              </a>
              <div className="ps-product__content">
                <a className="ps-product__title" href="product-default.html">
                  Sound Intone I65 Earphone White Version
                </a>
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
                      <span>(01)</span>
                    </div>
                  </div>
                </div>
                <p className="ps-product__price sale">
                  $100.99 <del>$106.00 </del>
                </p>
              </div>
              <div className="ps-product__content hover">
                <a className="ps-product__title" href="product-default.html">
                  Sound Intone I65 Earphone White Version
                </a>
                <p className="ps-product__price sale">
                  $100.99 <del>$106.00 </del>
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside> */}
    </div>
  );
};

export default withTranslation("product")(Right);
