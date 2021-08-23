import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";

const SingleCategory = ({ categories, language: { loc }, }) => {
  const [locale, setLocale] = useState(loc === "english" ? "en" : "zh");
  useEffect(() => {
    setLocale(loc === "english" ? "en" : "zh");
  }, [loc])
  const [active, setActive] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(null);
  const [subcategoryIndex, setSubCategoryIndex] = useState(null);
  const [subCatActive, setSubCatActive] = useState(false);
  return (
    <Fragment>
      {categories.map(({ _id, category, subCategory }, catIndex) => (
        <li
          key={_id}
          className="current-menu-item menu-item-has-children has-mega-menu"
        >
          <a className="pointer-cursor">
            {/*<i className="lnr lnr-star"></i>*/} {category[locale]}
          </a>
          <span
            onClick={() => {
              setActive(!active);
              setCategoryIndex(catIndex);
            }}
            className={`sub-toggle ${
              categoryIndex === catIndex && active ? "active" : null
            }`}
          ></span>
          <div
            style={{
              display: categoryIndex === catIndex && active && "block",
            }}
            className="mega-menu"
          >
            {Object.keys(subCategory[locale]).map((subCat, scIndex) => (
              <div key={scIndex} className="mega-menu__column">
                <h4>
                  {subCat}{" "}
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
                  ></span>
                </h4>
                <ul
                  style={{
                    display:
                      subcategoryIndex === scIndex && subCatActive && "block",
                  }}
                  className="mega-menu__list"
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
              </div>
            ))}
          </div>
        </li>
      ))}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  language: state.language
})

export default connect(mapStateToProps, null)(SingleCategory);
