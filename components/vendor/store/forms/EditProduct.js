import AvatarEditor from "react-avatar-editor";
import { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import {
  updateProduct,
  getProductConditions,
} from "../../../../actions/product";
import { compose } from "redux";
import { withTranslation } from "../../../../i18n";

const EditProduct = ({
  product: {
    conditions,
    conditionsLoading,
    paginatedSellerProducts,
    loadingPaginatedSellerProducts,
  },
  authSeller: { seller },
  language: { loc },
  updateProduct,
  formLoading,
  getProductConditions,
  t,
}) => {
  const router = useRouter();
  const { product_id } = router.query;
  const [width, setWidth] = useState(
    typeof window !== "undefined" && window.innerWidth
  );
  const singleProduct = (paginatedSellerProducts.length > 0 && !loadingPaginatedSellerProducts && product_id) && paginatedSellerProducts.filter(({ _id }) => _id === product_id)[0]
  const onFocus = (e) => {
    e.target.placeholder = "";
  };
  const onBlur = (e, text) => {
    e.target.placeholder = text;
  };
  const [formData, setFormData] = useState({
    title: "",
    keywords: "",
    condition: "",
    weight: "",
    price: "",
    quantity: "",
    description: "",
  });
  const [locale, setLocale] = useState(loc === "english" ? "en" : "zh");
  useEffect(() => {
    getProductConditions();
    setFormData({
      title: !singleProduct ? "" : singleProduct.titles.seller,
      keywords:
        !singleProduct || !singleProduct.keywords
          ? ""
          : singleProduct.keywords.seller,
      weight: !singleProduct ? "" : singleProduct.weight,
      price: !singleProduct ? "" : singleProduct.price,
      quantity: !singleProduct ? "" : singleProduct.quantity,
      condition: !singleProduct ? "" : singleProduct.condition[locale],
      description: !singleProduct ? "" : singleProduct.descriptions.seller,
    });
    setLocale(loc === "english" ? "en" : "zh");
  }, [product_id, loc]);

  const {
    title,
    weight,
    price,
    quantity,
    description,
    keywords,
    condition
  } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const defaultSlideshow = singleProduct
    ? singleProduct.slides.map((sli) => ({
        scale: 1,
        filename: "",
        imageUrl: sli,
      }))
    : [{ scale: 1, filename: "", imageUrl: null }];
  const [slides, setSlides] = useState(defaultSlideshow);

  const handleSlidesScale = (e) => {
    const _tempSlides = [...slides];
    const scale = parseFloat(e.target.value);
    _tempSlides[e.target.dataset.id].scale = scale;
    setSlides(_tempSlides);
  };
  const handleSlidesFile = (e) => {
    const _tempSlides = [...slides];
    _tempSlides[e.target.dataset.id].imageUrl = e.target.files[0];
    _tempSlides[e.target.dataset.id].filename = e.target.files[0].name;
    setSlides(_tempSlides);
  };
  const addNewImage = () => {
    setSlides((prevSlides) => [
      ...prevSlides,
      { scale: 1, filename: "", imageUrl: null },
    ]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const images = slides
      .map((item, index) =>
        document.getElementById(index).childNodes[0].toDataURL()
      )
      .join("|");
    let obj = {};
    obj.title = title;
    obj.msg = t("product-updated");
    obj.keywords = keywords;
    obj.weight = weight;
    obj.price = price;
    obj.quantity = quantity;
    obj.description = description;
    obj.enCategory = singleProduct.category.categoryTitle.en;
    obj.zhCategory = singleProduct.category.categoryTitle.zh;
    obj.productImages = images;
    // setFormData({ ...formData, storeImage: dataURL });
    updateProduct(obj, product_id, seller && seller._id);
  };
  return (
    <div className="ps-contact-form">
      {formLoading.loadingProd && !singleProduct ? (
        <span className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">{t("loading")}</span>
          </div>
        </span>
      ) : (
        <div className={width > 709 ? "container" : null}>
          <form
            autoComplete="off"
            onSubmit={(e) => {
              onSubmit(e);
            }}
            className="ps-form--contact-us"
          >
            <h3 className="final">{t("edit-product")}</h3>
            {slides.map((item, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <div id={index} style={{ display: !item.imageUrl && "none" }}>
                  <AvatarEditor
                    image={item.imageUrl}
                    width={width <= 709 ? width - 20 : 690}
                    height={width <= 709 ? width - 20 : 690}
                    scale={item.scale}
                    rotate={0}
                    border={0}
                  />
                </div>
                {item.imageUrl && t("zoom")}
                <input
                  style={{ display: !item.imageUrl && "none" }}
                  onChange={(e) => handleSlidesScale(e)}
                  type="range"
                  data-id={index}
                  disabled={formLoading}
                  min="1"
                  max="2"
                  value={item.scale}
                  step="0.01"
                />
                <br />
                <div className="custom-file mb-3">
                  <input
                    className="custom-file-input"
                    type="file"
                    data-id={index}
                    name="imageUrl"
                    disabled={formLoading}
                    accept="image/*"
                    onChange={(e) => {
                      handleSlidesFile(e);
                    }}
                  />
                  <label className="custom-file-label" htmlFor="imageUrl">
                    {item.filename ? item.filename : t("product-image")}
                  </label>
                </div>
              </div>
            ))}
            <div className="mb-5">
              <button
                className="btn btn-outline-dark btn-lg"
                disabled={formLoading}
                type="button"
                style={{
                  margin: "0 auto",
                  display: "block",
                }}
                onClick={addNewImage}
              >
                {t("add-another-image")}
              </button>
            </div>
            <div className={`row ${width <= 709 ? "noRow" : null} table-responsive-md`}>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="form-group">
                  <label htmlFor="title">{t("title")} *</label>
                  <input
                    value={title}
                    className="form-control"
                    type="text"
                    name="title"
                    disabled={formLoading}
                    required
                    onFocus={(e) => onFocus(e)}
                    onBlur={(e) => {
                      onBlur(e, t("title-placeholder"));
                    }}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder={t("title-placeholder")}
                  />
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="form-group">
                  <label htmlFor="keywords">{t("keywords")} *</label>
                  <textarea
                    value={keywords}
                    className="form-control"
                    type="text"
                    name="keywords"
                    rows="2"
                    disabled={formLoading}
                    required
                    onFocus={(e) => onFocus(e)}
                    onBlur={(e) => {
                      onBlur(e, t("keywords-placeholder"));
                    }}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder={t("keywords-placeholder")}
                  ></textarea>
                  <small className="form-text text-muted">
                    {t("comma-separated-keywords")}
                  </small>
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="form-group">
                  <label htmlFor="condition">{t("condition")} *</label>
                  <select
                    className="form-control"
                    required
                    disabled
                    value={condition}
                  >
                    <option selected value={condition}>
                      {condition}
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="form-group">
                  <label htmlFor="price">{t("price")} *</label>
                  <input
                    value={price}
                    className="form-control"
                    type="number"
                    name="price"
                    min="0"
                    onFocus={(e) => onFocus(e)}
                    onBlur={(e) => {
                      onBlur(e, t("price-placeholder"));
                    }}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    disabled={formLoading}
                    required
                    placeholder={t("price-placeholder")}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="form-group">
                  <label htmlFor="quantity">{t("quantity")} *</label>
                  <input
                    value={quantity}
                    name="quantity"
                    onFocus={(e) => onFocus(e)}
                    onBlur={(e) => {
                      onBlur(e, t("quantity-placeholder"));
                    }}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="form-control"
                    type="number"
                    disabled={formLoading}
                    required
                    step="1"
                    min="1"
                    placeholder={t("quantity-placeholder")}
                  />
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="form-group">
                  <label htmlFor="weight">{t("weight")} *</label>
                  <input
                    value={weight}
                    className="form-control"
                    type="text"
                    onFocus={(e) => onFocus(e)}
                    onBlur={(e) => {
                      onBlur(e, t("weight-placeholder"));
                    }}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    name="weight"
                    disabled={formLoading}
                    required
                    placeholder={t("weight-placeholder")}
                  />
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="form-group">
                  <label htmlFor="description">{t("spec")} *</label>
                  <textarea
                    onFocus={(e) => onFocus(e)}
                    onBlur={(e) => {
                      onBlur(e, t("spec-placeholder"));
                    }}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="form-control"
                    rows="5"
                    type="text"
                    name="description"
                    disabled={formLoading}
                    value={description}
                    required
                    placeholder={t("spec-placeholder")}
                  ></textarea>
                  <small className="form-text text-muted">
                    {t("comma-separated-specs")}
                  </small>
                </div>
              </div>
            </div>
            <div className="form-group submit">
              <button disabled={formLoading || !singleProduct ? true : false} type="submit" className="ps-btn">
                {!formLoading ? (
                  <Fragment>{t("save-changes")}</Fragment>
                ) : (
                  <Fragment>
                    <span
                      className="spinner-border"
                      role="status"
                      aria-hidden="true"
                    ></span>{" "}
                    {t("loading")}
                  </Fragment>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  sellerProfile: state.sellerProfile,
  product: state.product,
  formLoading: state.formLoading.formLoading,
  authSeller: state.authSeller,
  language: state.language,
});

export default compose(
  connect(mapStateToProps, {
    updateProduct,
    getProductConditions,
  }),
  withTranslation("products")
)(EditProduct);
