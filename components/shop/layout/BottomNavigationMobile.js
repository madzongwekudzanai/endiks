import { connect } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { addCartItem } from "../../../actions/cart";
import { Fragment } from "react";

const BottomNavigationMobile = ({
  auth: { isAuthenticated },
  authSeller,
  shopLoading: { cartLoading, wishlistLoading },
  addCartItem,
  formLoading,
  product: { productLoading, singleProduct },
}) => {
  const router = useRouter();
  const { product_id } = router.query;
  if (singleProduct && !productLoading && singleProduct.quantity <= 0) {
    return null;
  }
  return (
    <nav className="navigation--mobile-product">
      {cartLoading || wishlistLoading || formLoading ? (
        <Fragment>
          <a className="ps-btn ps-btn--black">
            <span className="spinner-border" role="status"></span> loading...
          </a>
          <a className="ps-btn white-hover">
            <span className="spinner-border" role="status"></span> loading...
          </a>
        </Fragment>
      ) : (
        <Fragment>
          {isAuthenticated ? (
            <Fragment>
              <a
                onClick={() => {
                  addCartItem(product_id);
                }}
                className="ps-btn ps-btn--black"
              >
                Add to cart
              </a>
              <a
                onClick={() => {
                  addCartItem(product_id);
                  router.push("/shop/checkout");
                }}
                className="ps-btn white-hover"
              >
                Buy Now
              </a>
            </Fragment>
          ) : (
            <Fragment>
              <Link href={authSeller.isAuthenticated ? `/seller/dashboard?page=products&store_id=${authSeller.seller && authSeller.seller._id}&page_number=1` : "/user/sign-in"}>
                <a className="ps-btn ps-btn--black">Add to cart</a>
              </Link>
              <Link href={authSeller.isAuthenticated ? `/seller/dashboard?page=products&store_id=${authSeller.seller && authSeller.seller._id}&page_number=1` : "/user/sign-in"}>
                <a className="ps-btn white-hover">Buy Now</a>
              </Link>
            </Fragment>
          )}
        </Fragment>
      )}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  authSeller: state.authSeller,
  product: state.product,
  shopLoading: state.shopLoading,
  formLoading: state.formLoading.loadingCart,
});

export default connect(mapStateToProps, { addCartItem })(
  BottomNavigationMobile
);
