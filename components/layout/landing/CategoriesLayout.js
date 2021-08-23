import { Fragment } from "react";
import CategoryProducts from "./CategoryProducts";
import { connect } from "react-redux";
import { withTranslation } from "../../../i18n";
import { compose } from "redux";

const CategoriesLayout = ({ product: { categories, loadingCategories }, t }) => {
  return (
    <Fragment>
      {loadingCategories ? (
        <span className="col d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">{t("loading")}</span>
          </div>
        </span>
      ) : (
        <Fragment>
          {categories.map((category) => (
            <CategoryProducts key={category._id} cat={category} />
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default compose(
  connect(mapStateToProps, null),
  withTranslation("landing")
)(CategoriesLayout);