import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import { autocompleteProducts } from "../../../actions/product";
import { withTranslation } from "../../../i18n";
import { compose } from "redux";

const Search = ({
  product: { autocompletedProducts },
  autocompleteProducts,
  t
}) => {
  const router = useRouter();
  const { navigation } = router.query;
  const [hash, setHash] = useState(navigation);
  const [content, setContent] = useState("");
  useEffect(() => {
    setHash(navigation);
  }, [navigation]);
  return (
    <div className={`ps-panel--sidebar ${hash === "search" ? "active" : null}`}>
      <div className="ps-panel__header">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(
              `/products/search-results?search=true&category=All&search_query=${content}&page_number=1`
            );
          }}
          className="ps-form--search-mobile"
        >
          <div className="form-group--nest">
            <input
              className="form-control"
              type="text"
              required
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                autocompleteProducts(e.target.value);
              }}
              placeholder={t("search-something")}
            />
            <button type="submit">
              <i className="lnr lnr-magnifier"></i>
            </button>
          </div>
        </form>
      </div>
      {content && (
        <div className="navigation__content container">
          {autocompletedProducts.map(({ _id, en }) => (
            <div
              key={_id}
              className="mobileAuto ps-product ps-product--wide ps-product--search-result"
            >
              <div className="ps-product__content">
                {/* <span>Not found! Try with another keyword.</span> */}
                <Link
                  href={`/products/search-results?search=false&category=All&search_query=${encodeURI(
                    en
                  )}&page_number=1`}
                >
                  <a className="ps-product__title mobAuto">{en}</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default compose(
  connect(mapStateToProps, { autocompleteProducts }),
  withTranslation("sidebar")
)(Search);