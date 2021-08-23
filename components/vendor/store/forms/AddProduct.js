import AvatarEditor from "react-avatar-editor";
import { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
  createProduct,
  getSellerCategories,
  getProductConditions,
} from "../../../../actions/product";
import { compose } from "redux";
import { withTranslation } from "../../../../i18n";

const AddProduct = ({
  product: {
    loadingSellerCategories,
    sellerCategories,
    conditions,
    conditionsLoading,
  },
  authSeller: { seller },
  language: { loc },
  createProduct,
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
    condition: "",
    weight: "",
    price: "",
    quantity: "",
    description: "",
  });
  const [subCategoryTitle, setSubCategoryTitle] = useState("")
  const [groupTitle, setGroupTitle] = useState("")
  const [categoryTitle, setCategoryTitle] = useState("")
  const {
    title,
    weight,
    price,
    quantity,
    description,
    condition,
    keywords,
  } = formData;
  const catObj = categoryTitle && sellerCategories.filter(cat => cat.category[locale] === categoryTitle)[0]
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    let obj = {};
    obj.title = title;
    obj.msg = t("product-added");
    obj.keywords = keywords;
    obj.condition = condition;
    obj.weight = weight;
    obj.price = price;
    obj.quantity = quantity;
    obj.description = description;
    obj.loc = loc;
    obj.enCategory = catObj.category.en;
    obj.zhCategory = catObj.category.zh;
    obj.subCategoryTitle = subCategoryTitle;
    obj.groupTitle = groupTitle;
    obj.productImages = images;
    // setFormData({ ...formData, storeImage: dataURL });
    createProduct(obj, seller && seller._id);
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
          <h3 className="final">{t("add-product")}</h3>
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
                <label htmlFor="price">{t("price")} *</label>
                <input
                  value={price}
                  className="form-control"
                  type="number"
                  name="price"
                  step="0.1"
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
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
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
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
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
            <div className={catObj ? "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12" : "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
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
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
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
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
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
              </div>
            </div>
          </div>
          <div className="form-group submit">
            <button disabled={formLoading} type="submit" className="ps-btn">
              {!formLoading ? (
                <Fragment>{t("add-product")}</Fragment>
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
    createProduct,
    getSellerCategories,
    getProductConditions,
  }),
  withTranslation("products")
)(AddProduct);
