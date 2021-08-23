import Link from "next/link";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

const LeftCategories = ({ product: { categories, loadingCategories }, language: { loc } }) => {
  const [active, setActive] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(null);
  const [subcategoryIndex, setSubCategoryIndex] = useState(null);
  const [subCatActive, setSubCatActive] = useState(false);
  const [locale, setLocale] = useState(loc === "english" ? "en" : "zh");
  useEffect(() => {
    setLocale(loc === "english" ? "en" : "zh");
  }, [loc])
  return (
    <aside className="widget widget_shop">
      <h4 className="widget-title">Categories</h4>
      {loadingCategories ? (
        <span className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">loading...</span>
          </div>
        </span>
      ) : (
        <ul className="ps-list--categories">
          {categories.map(({ _id, category, subCategory }, catIndex) => (
            <li key={_id} className="current-menu-item menu-item-has-children">
              <a>{category[locale]}</a>
              <span
                onClick={() => {
                  setActive(!active);
                  setCategoryIndex(catIndex);
                }}
                className={`sub-toggle ${
                  categoryIndex === catIndex && active ? "active" : null
                }`}
              >
                <i className="lnr lnr-chevron-down"></i>
              </span>
              <ul
                style={{
                  display: categoryIndex === catIndex && active && "block",
                }}
                className="sub-menu"
              >
                {Object.keys(subCategory[locale]).map((subCat, scIndex) => (
                  <li
                    key={scIndex}
                    className="current-menu-item menu-item-has-children"
                  >
                    <a>{subCat}</a>
                    <span
                      onClick={() => {
                        setSubCatActive(!subCatActive);
                        setSubCategoryIndex(scIndex);
                      }}
                      className={`sub-toggle ${
                        subcategoryIndex === scIndex && subCatActive
                          ? "active"
                          : null
                      }`}
                    >
                      <i className="lnr lnr-chevron-down"></i>
                    </span>
                    <ul
                      style={{
                        display:
                          subcategoryIndex === scIndex &&
                          subCatActive &&
                          "block",
                      }}
                      className="sub-menu"
                    >
                      {subCategory[locale][subCat].split("; ").map((group, index) => (
                        <li key={index} className="current-menu-item ">
                          <Link
                            href={`/products?category=${category[locale]
                              .split("&")
                              .join("-")}&sub_category=${subCat
                              .split("&")
                              .join("-")}&group=${group
                              .split("&")
                              .join("-")}&page_number=1`}
                          >
                            <a>{group}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
  language: state.language
});

export default connect(mapStateToProps, null)(LeftCategories);
