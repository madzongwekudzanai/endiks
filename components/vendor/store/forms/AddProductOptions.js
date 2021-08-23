import AvatarEditor from "react-avatar-editor";
import { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import {
  addProductOptions,
} from "../../../../actions/product";
import { compose } from "redux";
import { withTranslation } from "../../../../i18n";

const AddProductOptions = ({
  product: {
    paginatedSellerProducts,
    loadingPaginatedSellerProducts,
  },
  authSeller: { seller },
  language: { loc },
  addProductOptions,
  formLoading,
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
    description: "",
    separatorProperty: "",
  });
  const [locale, setLocale] = useState(loc === "english" ? "en" : "zh");
  useEffect(() => {
    setFormData({
      title: !singleProduct ? "" : singleProduct.titles.seller,
      keywords:
        !singleProduct || !singleProduct.keywords
          ? ""
          : singleProduct.keywords.seller,
      condition: !singleProduct ? "" : singleProduct.condition[locale],
      description: !singleProduct ? "" : singleProduct.descriptions.seller,
    });
    setLocale(loc === "english" ? "en" : "zh");
  }, [product_id, loc]);

  const {
    title,
    description,
    condition,
    keywords,
    separatorProperty
  } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const defaultSeparators = [
    { separator: "", price: "", weight: "", quantity: "" },
  ];

  const [separators, setSeparators] = useState(defaultSeparators);

  const handleSeparatorsChange = (e) => {
    const _tempSeparators = [...separators];
    _tempSeparators[e.target.dataset.id][e.target.name] = e.target.value;
    setSeparators(_tempSeparators);
  };

  const addNewSeparator = () => {
    setSeparators((prevSeparators) => [
      ...prevSeparators,
      { separator: "", price: "", weight: "", quantity: "" },
    ]);
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
      const properties = separators
      .map((sep) => Object.values(sep).map(sepProp => sepProp.split(";").join(" ").split(",").join(" ").split(":").join(" ").trim()).join(","))
      .join(";");
      const { optionsLevel, firstOptionProductRef,
        secondOptionProductRef,
        thirdOptionProductRef,
        fourthOptionProductRef } = singleProduct
    let obj = {};
    obj.separatorProperty = separatorProperty.trim();
    obj.keywords = keywords;
    obj.slides = singleProduct.slides.join(";");
    obj.optionsLevel = optionsLevel;
    obj.optionsRef = optionsLevel === 1 ? firstOptionProductRef : optionsLevel === 2 ? secondOptionProductRef : optionsLevel === 3 ? thirdOptionProductRef : optionsLevel === 4 && fourthOptionProductRef;
    obj.sellerID = singleProduct.seller;
    obj.sellerTitle = singleProduct.titles.seller;
    obj.sellerDescriptions = singleProduct.descriptions.seller;
    obj.enCondition = singleProduct.condition.en;
    obj.zhCondition = singleProduct.condition.zh;
    obj.enCategoryTitle = singleProduct.category.categoryTitle.en;
    obj.zhCategoryTitle = singleProduct.category.categoryTitle.zh;
    obj.enSubCategoryTitle = singleProduct.category.subCategory.subCategoryTitle.en;
    obj.zhSubCategoryTitle = singleProduct.category.subCategory.subCategoryTitle.zh;
    obj.enGroupTitle = singleProduct.category.subCategory.groupTitle.en;
    obj.zhGroupTitle = singleProduct.category.subCategory.groupTitle.zh;
    obj.loc = loc;
    obj.productID = singleProduct._id;
    obj.properties = properties;
    obj.productImages = images;
    // setFormData({ ...formData, storeImage: dataURL });
    addProductOptions(obj, seller && seller._id, t("bulk-add-msg", {quantity: properties.split(";").length}));
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
            <h3 className="final">{t("add-options", {title})}</h3>
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
            <div className={`row ${width <= 709 ? "noRow" : null}`}>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="form-group">
                  <label htmlFor="title">{t("title")} *</label>
                  <input
                    value={title}
                    className="form-control"
                    type="text"
                    disabled
                    required
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
                    rows="2"
                    name="keywords"
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
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="form-group">
                  <label htmlFor="description">{t("spec")} *</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    type="text"
                    disabled
                    value={description}
                    required
                    placeholder={t("spec-placeholder")}
                  ></textarea>
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="form-group">
                <label htmlFor="separatorProperty">
                  {t("separating-property")} *
                </label>
                <input
                  value={separatorProperty}
                  className="form-control"
                  type="text"
                  name="separatorProperty"
                  disabled={formLoading}
                  required
                  onFocus={(e) => onFocus(e)}
                  onBlur={(e) => {
                    onBlur(e, t("separating-property-placeholder"));
                  }}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder={t("separating-property-placeholder")}
                />
              </div>
            </div>
            {separatorProperty && (
              <div className="col table-responsive-md">
                <table className="table product-forms-min table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">{separatorProperty.trim()}</th>
                      <th scope="col">{t("price")}</th>
                      <th scope="col">{t("weight")}</th>
                      <th scope="col">{t("quantity")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {separators.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            className="multiple-input form-control"
                            type="text"
                            data-id={index}
                            name="separator"
                            disabled={formLoading}
                            required
                            value={item.separator}
                            onChange={handleSeparatorsChange}
                          />
                        </td>
                        <td>
                          <input
                            className="multiple-input form-control"
                            type="number"
                            data-id={index}
                            name="price"
                            step="0.1"
                            min="0"
                            disabled={formLoading}
                            required
                            value={item.price}
                            onChange={handleSeparatorsChange}
                          />
                        </td>
                        <td>
                          <input
                            className="multiple-input form-control"
                            type="text"
                            data-id={index}
                            name="weight"
                            disabled={formLoading}
                            required
                            value={item.weight}
                            onChange={handleSeparatorsChange}
                          />
                        </td>
                        <td>
                          <input
                            className="multiple-input form-control"
                            name="quantity"
                            data-id={index}
                            type="number"
                            disabled={formLoading}
                            required
                            value={item.quantity}
                            onChange={handleSeparatorsChange}
                            step="1"
                            min="1"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            </div>
            {separatorProperty && (
            <div className="mb-5">
              <button
                className="btn btn-outline-dark btn-lg"
                disabled={formLoading}
                type="button"
                style={{
                  margin: "0 auto",
                  display: "block",
                }}
                onClick={addNewSeparator}
              >
                {t("add-another-row")}
              </button>
            </div>
          )}
            <div className="form-group submit">
              <button disabled={formLoading || !singleProduct ? true : false} type="submit" className="ps-btn">
                {!formLoading ? (
                  <Fragment>{t("add-product-options")}</Fragment>
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
    addProductOptions,
  }),
  withTranslation("products")
)(AddProductOptions);
