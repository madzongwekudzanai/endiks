import Link from "next/link";
import {useRouter} from "next/router";
import ProductThumbnail from "./ProductThumbnail";
import { connect } from "react-redux";
import { compose } from "redux";
import { addCartItem } from "../../../actions/cart";
import { getProduct } from "../../../actions/product";
import { setOptionFormData } from "../../../actions/common";
import { addWishlistItem } from "../../../actions/wishlist";
import { useState, Fragment } from "react";
import { useEffect } from "react";
import { withTranslation } from "../../../i18n";
import PriceFormat from "../../layout/landing/PriceFormat";

const Left = ({
  payment: { rate },
  product: { singleProduct },
  formLoading,
  auth: { isAuthenticated },
  shopLoading: { cartLoading, wishlistLoading },
  language: { loc },
  addCartItem,
  setOptionFormData,
  addWishlistItem,
  getProduct,
  authSeller,
  t
}) => {
  const [locale, setLocale] = useState(loc === "english" ? "en" : "zh");
  const [formData, setFormData] = useState({
    firstOptionProductRef: "",
    secondOptionProductRef: "",
    thirdOptionProductRef: "",
    fourthOptionProductRef: "",
  });
  const router = useRouter();
  const { product_id } = router.query
  useEffect(() => {
    setFormData({
      firstOptionProductRef: !singleProduct ? "" : singleProduct.firstOptionProductRef,
      secondOptionProductRef: !singleProduct ? "" : singleProduct.secondOptionProductRef,
      thirdOptionProductRef: !singleProduct ? "" : singleProduct.thirdOptionProductRef,
      fourthOptionProductRef: !singleProduct ? "" : singleProduct.fourthOptionProductRef,
    })
    setLocale(loc === "english" ? "en" : "zh");
  }, [loc, product_id]);
  const [quantity, setQuantity] = useState(1);
  const onChange = e => {
    setOptionFormData(e.target.name, e.target.value);
  }
  const commissionTwo = process.env.NEXT_PUBLIC_COMMISSION_TWO;
  return (
    <div className="ps-page__left">
      <div className="ps-product--detail ps-product--fullwidth">
        <div className="ps-product__header">
          <ProductThumbnail />
          {singleProduct && (
            <div className="ps-product__info">
              <h1 onClick={() => getProduct(singleProduct._id, formData)}>{authSeller.isAuthenticated ? singleProduct.titles.seller : singleProduct.title}</h1>
              {/* <div className="ps-product__meta">
                <p>
                  Brand:
                  <Link href="shop-default.html">
                    <a>Adidas</a>
                  </Link>
                </p>
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
                      <span>(1 review)</span>
                    </div>
                  </div>
                </div>
              </div> */}
              <h4 className="ps-product__price">
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
              </h4>
              <div className="ps-product__desc">
                <p>
                  {" "}
                  <Link
                    href={`/seller/store?store_id=${singleProduct.seller}&page_number=1`}
                  >
                    <a className="mr-20">
                      <strong> {t("view-seller")}</strong>
                    </a>
                  </Link>{" "}
                  {t("status")}
                  <a>
                    {singleProduct.quantity <= 0 ? (
                      <strong className="ps-tag--out-stock">
                        {" "}
                        {t("out-of-stock")}
                      </strong>
                    ) : (
                      <strong className="ps-tag--in-stock"> {t("in-stock")}</strong>
                    )}
                  </a>{" "}
                  <br />
                  <a>{singleProduct.condition[locale]}</a>
                </p>
                <ul className="ps-list--dot">
                  {authSeller.isAuthenticated ? (
                    <Fragment>
                      {
                        singleProduct.descriptions.seller.split(",").map((des, index) => (
                          <li key={index}> {des.trim()}</li>
                        ))
                      }
                    </Fragment>
                  ) : (
                    <Fragment>
                      {singleProduct.description.split(",").map((des, index) => (
                    <li key={index}> {des.trim()}</li>
                  ))}
                    </Fragment>
                  ) }
                </ul>
              </div>
              {singleProduct.optionsLevel > 0 && (
                  <div className="ps-product__variations">
                    {/* <figure>
                <figcaption>
                  Color: <strong> Choose an option</strong>
                </figcaption>
                <div className="ps-variant ps-variant--image">
                  <span className="ps-variant__tooltip">Blue</span>
                  <img src={smallOne} alt="" />
                </div>
                <div className="ps-variant ps-variant--image">
                  <span className="ps-variant__tooltip"> Dark</span>
                  <img src={smallTwo} alt="" />
                </div>
                <div className="ps-variant ps-variant--image">
                  <span className="ps-variant__tooltip"> pink</span>
                  <img src={smallThree} alt="" />
                </div>
              </figure> */}
                    {singleProduct.firstOptions.options.length > 0 && (<figure>
                      <figcaption>
                        {authSeller.isAuthenticated ? singleProduct.firstOptions.attribute.seller : singleProduct.firstOptions.attribute.en}{" "}
                        <strong> {t("choose-an-option")}</strong>
                      </figcaption>
                      <div class="form-group">
                        <select
                          onChange={(e) => {
                            getProduct({[e.target.name]: e.target.value})
                            onChange(e);
                          }}
                          name="firstOptionProductRef"
                          className="form-control"
                        >
                          {singleProduct.firstOptions.options.map(({ _id, productRef, seller, en }) => (
                            <option
                              key={_id}
                              id={_id}
                              selected={
                                productRef === singleProduct.firstOptionProductRef ? true : false
                              }
                              value={productRef}
                            >
                              {authSeller.isAuthenticated ? seller : en}
                            </option>
                          ))}
                        </select>
                      </div>
                    </figure>)}
                    {singleProduct.secondOptions.options.length > 0 && (<figure>
                      <figcaption>
                        {authSeller.isAuthenticated ? singleProduct.secondOptions.attribute.seller : singleProduct.firstOptions.attribute.en}{" "}
                        <strong> {t("choose-an-option")}</strong>
                      </figcaption>
                       <div class="form-group">
                        <select
                          onChange={(e) => {
                            getProduct({ ...formData, [e.target.name]: e.target.value, thirdOptionProductRef: "",
                            fourthOptionProductRef: "", })
                            onChange(e);
                          }}
                          name="secondOptionProductRef"
                          className="form-control"
                        >
                          {singleProduct.secondOptions.options.map(({ _id, productRef, seller, en }) => (
                            <option
                              key={_id}
                              id={_id}
                              selected={
                                productRef === singleProduct.secondOptionProductRef ? true : false
                              }
                              value={productRef}
                            >
                              {authSeller.isAuthenticated ? seller : en}
                            </option>
                          ))}
                        </select>
                      </div>
                    </figure>)}
                    {singleProduct.thirdOptions.options.length > 0 && (<figure>
                      <figcaption>
                        {authSeller.isAuthenticated ? singleProduct.thirdOptions.attribute.seller : singleProduct.firstOptions.attribute.en}{" "}
                        <strong> {t("choose-an-option")}</strong>
                      </figcaption>
                       <div class="form-group">
                        <select
                          onChange={(e) => {
                            getProduct({ ...formData, [e.target.name]: e.target.value,
                            fourthOptionProductRef: "", })
                            onChange(e);
                          }}
                          name="thirdOptionProductRef"
                          className="form-control"
                        >
                          {singleProduct.thirdOptions.options.map(({ _id, productRef, seller, en }) => (
                            <option
                              key={_id}
                              id={_id}
                              selected={
                                productRef === singleProduct.thirdOptionProductRef ? true : false
                              }
                              value={productRef}
                            >
                              {authSeller.isAuthenticated ? seller : en}
                            </option>
                          ))}
                        </select>
                      </div>
                    </figure>)}
                    {singleProduct.fourthOptions.options.length > 0 && (<figure>
                      <figcaption>
                        {authSeller.isAuthenticated ? singleProduct.fourthOptions.attribute.seller : singleProduct.firstOptions.attribute.en}{" "}
                        <strong> {t("choose-an-option")}</strong>
                      </figcaption>
                       <div class="form-group">
                        <select
                          onChange={(e) => {
                            getProduct({ ...formData, [e.target.name]: e.target.value })
                            onChange(e);
                          }}
                          name="fourthOptionProductRef"
                          className="form-control"
                        >
                          {singleProduct.fourthOptions.options.map(({ _id, productRef, seller, en }) => (
                            <option
                              key={_id}
                              id={_id}
                              selected={
                                productRef === singleProduct.fourthOptionProductRef ? true : false
                              }
                              value={productRef}
                            >
                              {authSeller.isAuthenticated ? seller : en}
                            </option>
                          ))}
                        </select>
                      </div>
                    </figure>)}
                  </div>
                )}
              {singleProduct.quantity > 0 ? (
                <div className="ps-product__shopping">
                  <figure>
                    <figcaption>{t("quantity")}</figcaption>
                    <div className="form-group--number">
                      <button
                        disabled={
                          quantity >= singleProduct.quantity || authSeller.isAuthenticated ? true : false
                        }
                        onClick={() => {
                          setQuantity(quantity + 1);
                        }}
                        className="up"
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                      <button
                        disabled={quantity <= 1 || authSeller.isAuthenticated ? true : false}
                        onClick={() => {
                          setQuantity(quantity - 1);
                        }}
                        className="down"
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                      <input
                        className="form-control"
                        type="number"
                        disabled={authSeller.isAuthenticated}
                        value={quantity}
                        onChange={(e) => {
                          setQuantity(e.target.value);
                        }}
                      />
                    </div>
                  </figure>
                  {cartLoading || wishlistLoading || formLoading ? (
                    <Fragment>
                      <a className="ps-btn ps-btn--black">
                        <span className="spinner-border" role="status"></span>{" "}
                        {t("loading")}
                      </a>
                      <a className="ps-btn white-hover">
                        <span className="spinner-border" role="status"></span>{" "}
                        {t("loading")}
                      </a>
                    </Fragment>
                  ) : (
                    <Fragment>
                      {isAuthenticated ? (
                        <Fragment>
                          <a
                            onClick={() => {
                              addCartItem(singleProduct._id, quantity);
                            }}
                            className="ps-btn ps-btn--black"
                          >
                            {t("add-to-cart")}
                          </a>
                          <a
                            onClick={() => {
                              addCartItem(singleProduct._id, quantity);
                              router.push("/shop/checkout");
                            }}
                            className="ps-btn white-hover"
                          >
                            {t("buy-now")}
                          </a>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <Link href={authSeller.isAuthenticated ? `/seller/dashboard?page=products&store_id=${authSeller.seller && authSeller.seller._id}&page_number=1` : "/user/sign-in"}>
                            <a className="ps-btn ps-btn--black">{t("add-to-cart")}</a>
                          </Link>
                          <Link href={authSeller.isAuthenticated ? `/seller/dashboard?page=products&store_id=${authSeller.seller && authSeller.seller._id}&page_number=1` : "/user/sign-in"}>
                            <a className="ps-btn white-hover">{t("buy-now")}</a>
                          </Link>
                        </Fragment>
                      )}
                    </Fragment>
                  )}
                  <div className="ps-product__actions">
                    {formLoading ? (
                      <a>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                        ></span>
                      </a>
                    ) : (
                      <Fragment>
                        {isAuthenticated ? (
                          <a
                            className="pointer-cursor"
                            onClick={() => {
                              addWishlistItem(singleProduct._id);
                            }}
                          >
                            <i
                              data-toggle="tooltip"
                              data-placement="top"
                              title={t("add-to-wishlist")}
                              className="lnr lnr-heart"
                            ></i>
                          </a>
                        ) : (
                          <Link href={authSeller.isAuthenticated ? `/seller/dashboard?page=products&store_id=${authSeller.seller && authSeller.seller._id}&page_number=1` : "/user/sign-in"}>
                            <a className="pointer-cursor">
                              <i
                                data-toggle="tooltip"
                                data-placement="top"
                                title={t("add-to-wishlist")}
                                className="lnr lnr-heart"
                              ></i>
                            </a>
                          </Link>
                        )}
                      </Fragment>
                    )}
                    {/* <Link href="#">
                  <a>
                    <i className="icon-chart-bars"></i>
                  </a>
                </Link> */}
                  </div>
                </div>
              ) : null}

              <div className="ps-product__specification">
                {/* <Link href="#">
                <a className="report">Report Abuse</a>
              </Link>
              <p>
                <strong>SKU:</strong> SF1133569600-1
              </p> */}
                <p>
                  <strong>{t("availability")}</strong> {singleProduct.quantity}
                </p>
                <p>
                  <strong>{t("weight")}</strong> {singleProduct.weight}{t("kg")}
                </p>
                <p className="categories">
                  <strong> {t("categories")}</strong>
                  <Link
                    href={authSeller.isAuthenticated ? `/seller/dashboard?page=products&store_id=${authSeller.seller && authSeller.seller._id}&page_number=1` : `/products?category=${singleProduct.category.categoryTitle[locale]
                      .split("&")
                      .join(
                        "-"
                      )}&sub_category=${singleProduct.category.subCategory.subCategoryTitle[locale]
                      .split("&")
                      .join(
                        "-"
                      )}&group=${singleProduct.category.subCategory.groupTitle[locale]
                      .split("&")
                      .join("-")}&page_number=1`}
                  >
                    <a>{singleProduct.category.categoryTitle[locale]}</a>
                  </Link>
                  ,
                  <Link
                    href={authSeller.isAuthenticated ? `/seller/dashboard?page=products&store_id=${authSeller.seller && authSeller.seller._id}&page_number=1` : `/products?category=${singleProduct.category.categoryTitle[locale]
                      .split("&")
                      .join(
                        "-"
                      )}&sub_category=${singleProduct.category.subCategory.subCategoryTitle[locale]
                      .split("&")
                      .join(
                        "-"
                      )}&group=${singleProduct.category.subCategory.groupTitle[locale]
                      .split("&")
                      .join("-")}&page_number=1`}
                  >
                    <a>
                      {" "}
                      {singleProduct.category.subCategory.subCategoryTitle[locale]}
                    </a>
                  </Link>
                  ,
                  <Link
                    href={authSeller.isAuthenticated ? `/seller/dashboard?page=products&store_id=${authSeller.seller && authSeller.seller._id}&page_number=1` : `/products?category=${singleProduct.category.categoryTitle[locale]
                      .split("&")
                      .join(
                        "-"
                      )}&sub_category=${singleProduct.category.subCategory.subCategoryTitle[locale]
                      .split("&")
                      .join(
                        "-"
                      )}&group=${singleProduct.category.subCategory.groupTitle[locale]
                      .split("&")
                      .join("-")}&page_number=1`}
                  >
                    <a> {singleProduct.category.subCategory.groupTitle[locale]}</a>
                  </Link>
                </p>
                {/* <p className="tags">
                <strong> Tags</strong>
                <Link href="#">
                  <a>sofa</a>
                </Link>
                ,
                <Link href="#">
                  <a>technologies</a>
                </Link>
                ,
                <Link href="#">
                  <a>wireless</a>
                </Link>
              </p> */}
              </div>
              {/* <div className="ps-product__sharing">
              <a className="facebook">
                <i className="fa fa-facebook"></i>
              </a>
              <a className="twitter">
                <i className="fa fa-twitter"></i>
              </a>
              <a className="google">
                <i className="fa fa-google-plus"></i>
              </a>
              <a className="linkedin">
                <i className="fa fa-linkedin"></i>
              </a>
              <a className="instagram">
                <i className="fa fa-instagram"></i>
              </a>
            </div> */}
            </div>
          )}
        </div>
        {/* <div className="ps-product__content ps-tab-root">
          <ul className="ps-tab-list">
            <li className="active">
              <Link href="#tab-1">
                <a>Description</a>
              </Link>
            </li>
            <li>
              <Link href="#tab-2">
                <a>Specification</a>
              </Link>
            </li>
            <li>
              <Link href="#tab-3">
                <a>Vendor</a>
              </Link>
            </li>
            <li>
              <Link href="#tab-4">
                <a>Reviews (1)</a>
              </Link>
            </li>
            <li>
              <Link href="#tab-5">
                <a>Questions and Answers</a>
              </Link>
            </li>
            <li>
              <Link href="#tab-6">
                <a>More Offers</a>
              </Link>
            </li>
          </ul>
          <div className="ps-tabs">
            <div className="ps-tab active" id="tab-1">
              <div className="ps-document">
                <h5>Embodying the Raw, Wayward Spirit of Rock 'N' Roll</h5>
                <p>
                  Embodying the raw, wayward spirit of rock ‘n’ roll, the
                  Kilburn portable active stereo speaker takes the unmistakable
                  look and sound of Marshall, unplugs the chords, and takes the
                  show on the road.
                </p>
                <ul className="pl-0">
                  <li>
                    No FM radio (except for T-Mobile units in the US, so far)
                  </li>
                  <li>No IR blaster</li>
                  <li>No stereo speakers</li>
                </ul>
                <p>
                  If you’ve taken the phone for a plunge in the bath, you’ll
                  need to dry the charging port before plugging in. Samsung
                  hasn’t reinvented the wheel with the design of the Galaxy S7,
                  but it didn’t need to. The Gala S6 was an excellently styled
                  device, and the S7 has managed to improve on that.
                </p>
              </div>
            </div>
            <div className="ps-tab" id="tab-2">
              <div className="table-responsive">
                <table className="table table-bordered ps-table ps-table--specification">
                  <tbody>
                    <tr>
                      <td>Color</td>
                      <td>Black, Gray</td>
                    </tr>
                    <tr>
                      <td>Style</td>
                      <td>Ear Hook</td>
                    </tr>
                    <tr>
                      <td>Wireless</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td>Dimensions</td>
                      <td>5.5 x 5.5 x 9.5 inches</td>
                    </tr>
                    <tr>
                      <td>Weight</td>
                      <td>6.61 pounds</td>
                    </tr>
                    <tr>
                      <td>Battery Life</td>
                      <td>20 hours</td>
                    </tr>
                    <tr>
                      <td>Bluetooth</td>
                      <td>Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="ps-tab" id="tab-3">
              <h4>GoPro</h4>
              <p>
                Digiworld US, New York’s no.1 online retailer was established in
                May 2012 with the aim and vision to become the one-stop shop for
                retail in New York with implementation of best practices both
                online
              </p>
              <Link href="#">
                <a>More Products from gopro</a>
              </Link>
            </div>
            <div className="ps-tab" id="tab-4">
              <div className="row">
                <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 ">
                  <div className="ps-block--average-rating">
                    <div className="ps-block__header">
                      <h3>4.00</h3>
                      <select className="ps-rating" data-read-only="true">
                        <option value="1">1</option>
                        <option value="1">2</option>
                        <option value="1">3</option>
                        <option value="1">4</option>
                        <option value="2">5</option>
                      </select>
                      <span>1 Review</span>
                    </div>
                    <div className="ps-block__star">
                      <span>5 Star</span>
                      <div className="ps-progress" data-value="100">
                        <span></span>
                      </div>
                      <span>100%</span>
                    </div>
                    <div className="ps-block__star">
                      <span>4 Star</span>
                      <div className="ps-progress" data-value="0">
                        <span></span>
                      </div>
                      <span>0</span>
                    </div>
                    <div className="ps-block__star">
                      <span>3 Star</span>
                      <div className="ps-progress" data-value="0">
                        <span></span>
                      </div>
                      <span>0</span>
                    </div>
                    <div className="ps-block__star">
                      <span>2 Star</span>
                      <div className="ps-progress" data-value="0">
                        <span></span>
                      </div>
                      <span>0</span>
                    </div>
                    <div className="ps-block__star">
                      <span>1 Star</span>
                      <div className="ps-progress" data-value="0">
                        <span></span>
                      </div>
                      <span>0</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 ">
                  <form
                    className="ps-form--review"
                    action="index.html"
                    method="get"
                  >
                    <h4>Submit Your Review</h4>
                    <p>
                      Your email address will not be published. Required fields
                      are marked<sup>*</sup>
                    </p>
                    <div className="form-group form-group__rating">
                      <label>Your rating of this product</label>
                      <select className="ps-rating" data-read-only="false">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        rows="6"
                        placeholder="Write your review here"
                      ></textarea>
                    </div>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Your Name"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="email"
                            placeholder="Your Email"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group submit">
                      <button className="ps-btn">Submit Review</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="ps-tab" id="tab-5">
              <div className="ps-block--questions-answers">
                <h3>Questions and Answers</h3>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Have a question? Search for answer?"
                  />
                </div>
              </div>
            </div>
            <div className="ps-tab active" id="tab-6">
              <p>Sorry no more offers available</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
  formLoading: state.formLoading.formLoading,
  auth: state.auth,
  shopLoading: state.shopLoading,
  payment: state.payment,
  authSeller: state.authSeller,
  language: state.language
});

export default compose(
  connect(mapStateToProps, {
    addCartItem,
    addWishlistItem,
    getProduct,
    setOptionFormData
  }),
  withTranslation("product")
)(Left);
