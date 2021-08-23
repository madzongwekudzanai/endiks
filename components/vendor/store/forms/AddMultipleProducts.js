import AvatarEditor from "react-avatar-editor";
import { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
  addMultipleProducts,
  getSellerCategories,
  getProductConditions,
} from "../../../../actions/product";
import { setAlert } from "../../../../actions/alert";
import { compose } from "redux";
import { withTranslation } from "../../../../i18n";

const AddMultipleProducts = ({
  product: {
    loadingSellerCategories,
    sellerCategories,
    conditions,
    conditionsLoading,
  },
  authSeller: { seller },
  language: { loc },
  addMultipleProducts,
  getSellerCategories,
  getProductConditions,
  formLoading,
  t,
}) => {
  const [locale, setLocale] = useState(loc === "english" ? "en" : "zh");
  useEffect(() => {
    getProductConditions();
    getSellerCategories();
    setFormData({
      ...formData,
      condition: "",
    });
    setSubCategoryTitle("")
    setGroupTitle("")
    setCategoryTitle("")
    setLocale(loc === "english" ? "en" : "zh");
  }, [seller, loc]);
  const [width, setWidth] = useState(
    typeof window !== "undefined" && window.innerWidth
  );

  const onFocus = (e) => {
    e.target.placeholder = "";
  };
  const onBlur = (e, text) => {
    e.target.placeholder = text;
  };
  const [formData, setFormData] = useState({
    title: "",
    keywords: "",
    description: "",
    separatorProperty: "",
    condition: "",
  });
  const [subCategoryTitle, setSubCategoryTitle] = useState("")
  const [groupTitle, setGroupTitle] = useState("")
  const [categoryTitle, setCategoryTitle] = useState("")
  const {
    title,
    keywords,
    description,
    condition,
    separatorProperty,
  } = formData;
  const catObj = categoryTitle && sellerCategories.filter(cat => cat.category[locale] === categoryTitle)[0]
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

  const defaultSlideshow = [{ scale: 1, filename: "", imageUrl: null }];
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
    let obj = {};
    obj.title = title;
    obj.keywords = keywords;
    obj.properties = properties;
    obj.separatorProperty = separatorProperty.trim();
    obj.description = description;
    obj.condition = condition;
    obj.subCategoryTitle = subCategoryTitle;
    obj.groupTitle = groupTitle;
    obj.loc = loc;
    obj.enCategory = catObj.category.en;
    obj.zhCategory = catObj.category.zh;
    obj.productImages = images;
    addMultipleProducts(obj, seller && seller._id, t("bulk-add-msg", {quantity: properties.split(";").length}));
  };
  return (
    <div className="ps-contact-form">
      <div className={width > 709 ? "container" : null}>
        <form
          autoComplete="off"
          onSubmit={(e) => {
            onSubmit(e);
          }}
          className="ps-form--contact-us"
        >
          <h3 className="final">{t("add-products")}</h3>
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
                  required
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
                <label htmlFor="title">{t("common-title")} *</label>
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
                <small className="form-text text-muted">
                  {t("multi-title-small")}
                </small>
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
                <label htmlFor="description">{t("spec")} *</label>
                <textarea
                  onFocus={(e) => onFocus(e)}
                  onBlur={(e) => {
                    onBlur(e, t("spec-common-placeholder"));
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
                  placeholder={t("spec-common-placeholder")}
                ></textarea>
                <small className="form-text text-muted">
                  {t("comma-separated-specs")}
                </small>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <label htmlFor="condition">{t("condition")} *</label>
                <select
                  className="form-control"
                  required
                  name="condition"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  disabled={formLoading || conditionsLoading ? true : false}
                  value={condition}
                >
                  <option value="" disabled selected>
                    {conditionsLoading ? t("loading") : t("select-condition")}
                  </option>
                  {conditions.length > 0 &&
                    conditions.map((cond) => (
                      <option key={cond._id} value={cond[locale]}>
                        {cond[locale]}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <label htmlFor="categoryTitle">{t("category")} *</label>
                <select
                  className="form-control"
                  required
                  name="categoryTitle"
                  onChange={(e) => {
                    setSubCategoryTitle("")
                    setGroupTitle("")
                    setCategoryTitle(e.target.value)
                  }}
                  disabled={
                    formLoading || loadingSellerCategories
                      ? true
                      : false
                  }
                  value={categoryTitle}
                >
                  <option value="" disabled selected>
                    {loadingSellerCategories
                      ? t("loading")
                      : t("select-category")}
                  </option>
                  {sellerCategories.length > 0 ?
                  (
                    <Fragment>
                      {sellerCategories.map((cat) => (
                        <option key={cat._id} value={cat.category[locale]}>
                          {cat.category[locale]}
                        </option>
                      ))}
                    </Fragment>
                  ) : null}
                </select>
              </div>
            </div>
            {
              (catObj && categoryTitle) && (
                <Fragment>
                  <div className={subCategoryTitle ? "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12" : "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                    <div className="form-group">
                      <label htmlFor="subCategoryTitle">{t("sub-category")} *</label>
                      <select
                        className="form-control"
                        required
                        name="subCategoryTitle"
                        onChange={(e) => {
                          setGroupTitle("")
                          setSubCategoryTitle(e.target.value)
                        }}
                        disabled={
                          formLoading || loadingSellerCategories
                            ? true
                            : false
                        }
                        value={subCategoryTitle}
                      >
                        <option value="" disabled selected>
                          {loadingSellerCategories
                            ? t("loading")
                            : t("select-sub-category")}
                        </option>
                        {categoryTitle ? (
                          <Fragment>
                            {Object.keys(catObj.subCategory[locale]).map((subCat, index) => (
                              <option key={index} value={subCat}>
                                {subCat}
                              </option>
                            ))}
                          </Fragment>
                        ) : null}
                      </select>
                    </div>
                  </div>
                  {
                    (subCategoryTitle && categoryTitle) && (
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="form-group">
                          <label htmlFor="groupTitle">{t("group")} *</label>
                          <select
                            className="form-control"
                            onChange={(e) => {
                              setGroupTitle(e.target.value)
                            }}
                            name="groupTitle"
                            value={groupTitle}
                            required
                            disabled={
                              formLoading || loadingSellerCategories ? true : false
                            }
                          >
                            <option value="" disabled selected>
                              {loadingSellerCategories ? t("loading") : t("select-group")}
                            </option>
                            {(subCategoryTitle && catObj) ?
                              catObj.subCategory[locale][subCategoryTitle].split("; ")
                                .map((group, index) => (
                                  <option key={index} value={group}>
                                    {group}
                                  </option>
                                )) : null}
                          </select>
                        </div>
                      </div>
                    )
                  }
                </Fragment>
              )
            }
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
            <button
              disabled={formLoading}
              type="submit"
              className="ps-btn btn-block"
            >
              {!formLoading ? (
                <Fragment>{t("add-products")}</Fragment>
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
    addMultipleProducts,
    setAlert,
    getSellerCategories,
    getProductConditions,
  }),
  withTranslation("products")
)(AddMultipleProducts);
