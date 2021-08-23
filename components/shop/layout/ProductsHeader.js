import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { connect } from "react-redux";
import { withTranslation } from "../../../i18n";
import { compose } from "redux";

const ProductsHeader = ({
  documentCount: { categorySubCategoryGroupCount },
  t
}) => {
  const router = useRouter();
  const { search_query, category, sub_category, group } = router.query;
  return (
    <div className="ps-shopping__header">
      <p>
        {search_query ? (
          <Fragment>{t("showing-results-for")} "{search_query.trim()}"</Fragment>
        ) : (
          <Fragment>
            {/* <strong>
              {" "}
              {category && sub_category && group
                ? categorySubCategoryGroupCount
                : 36}
            </strong>{" "} */}
            {t("products")}
          </Fragment>
        )}
      </p>
      {/* <div className="ps-shopping__actions">
        <select
          style={{ padding: "6px 20px" }}
          className="ps-select select2-hidden-accessible hideSel"
          data-select2-id="4"
          tabIndex="-1"
          data-placeholder="Sort Items"
          aria-hidden="true"
        >
          <option data-select2-id="6">Sort by latest</option>
          <option>Sort by popularity</option>
          <option>Sort by average rating</option>
          <option>Sort by price: low to high</option>
          <option>Sort by price: high to low</option>
        </select>
        <div className="ps-shopping__view">
          <p>View</p>
          <ul className="ps-tab-list">
            <li className="active">
              <Link href="#tab-1">
                <a>
                  <i className="lnr lnr-list"></i>
                </a>
              </Link>
            </li>
            <li>
              <Link href="#tab-2">
                <a>
                  <i className="lnr lnr-list"></i>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  documentCount: state.documentCount,
});

export default compose(
  connect(mapStateToProps, null),
  withTranslation("shop")
)(ProductsHeader);