import { connect } from "react-redux";
import { useRouter } from "next/router";
import { addCartItem } from "../../../actions/cart";
import { Fragment } from "react";
import Link from "next/link";
import { compose } from "redux";
import { withTranslation } from "../../../i18n";
import PriceFormat from "../landing/PriceFormat";
import LazyLoadImage from "../LazyLoadImage";

const ProductHeader = ({
  product: { singleProduct, productLoading },
  formLoading,
  payment: { rate },
  auth: { isAuthenticated },
  authSeller,
  addCartItem,
  t,
}) => {
  const router = useRouter();
  const { product_id } = router.query;
  const commissionTwo = process.env.NEXT_PUBLIC_COMMISSION_TWO;
  if (singleProduct && !productLoading && singleProduct.quantity <= 0) {
    return null;
  }
  return (
    <header
      id={
        typeof window !== "undefined" && window.innerWidth > 1199
          ? "mobileHeader"
          : null
      }
      className="header header--product electronic"
      data-sticky="true"
    >
      {singleProduct && (
        <nav className="navigation">
          <div className="container">
            <article className="ps-product--header-sticky">
              <div className="ps-product__thumbnail">
                <LazyLoadImage height={60}>
                  <img src={singleProduct.slides[0]} alt={singleProduct.title} />
                </LazyLoadImage>
              </div>
              <div className="ps-product__wrapper">
                <div className="ps-product__content">
                  <a className="ps-product__title">{singleProduct.title}</a>
                  {/* <ul className="ps-tab-list">
                  <li className="active">
                    <Link href="#">
                      <a>Description</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>Specification</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>Reviews (1)</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>More Offers</a>
                    </Link>
                  </li>
                </ul> */}
                </div>
                <div className="ps-product__shopping">
                  <span className="ps-product__price">
                    {!rate ? (
                      <span className="spinner-border" role="status"></span>
                    ) : (
                      <span>
                        {
                          authSeller.isAuthenticated && authSeller.seller ? (
                            <PriceFormat 
                            locale={authSeller.seller.locale}
                            currencyCode={authSeller.seller.currencyCode}
                            price={singleProduct.price} />
                          ) : (
                            <PriceFormat 
                            locale="en-US"
                            currencyCode="USD"
                            price={singleProduct.price * rate * commissionTwo} />
                          )
                        }
                      </span>
                    )}
                    {/* <del>$106.22</del> */}
                  </span>
                  {formLoading ? (
                    <a className="ps-btn white-hover">
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                      ></span>{" "}
                      {t("loading")}
                    </a>
                  ) : (
                    <Fragment>
                      {isAuthenticated ? (
                        <a
                          onClick={() => {
                            addCartItem(product_id);
                          }}
                          className="ps-btn white-hover"
                        >
                          {" "}
                          {t("add-to-cart")}
                        </a>
                      ) : (
                        <Link href={authSeller.isAuthenticated ? `/seller/dashboard?page=products&store_id=${authSeller.seller && authSeller.seller._id}&page_number=1` : "/user/sign-in"}>
                          <a className="ps-btn white-hover">
                            {" "}
                            {t("add-to-cart")}
                          </a>
                        </Link>
                      )}
                    </Fragment>
                  )}
                </div>
              </div>
            </article>
          </div>
        </nav>
      )}
    </header>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
  auth: state.auth,
  authSeller: state.authSeller,
  formLoading: state.formLoading.formLoading,
  payment: state.payment,
});

export default compose(
  connect(mapStateToProps, { addCartItem }),
  withTranslation("header")
)(ProductHeader);
