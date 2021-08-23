import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SingleCategory from "../header/SingleCategory";
import { withTranslation } from "../../../i18n";
import { compose } from "redux";

const Categories = ({ product: { categories }, t }) => {
  const router = useRouter();
  const { navigation } = router.query;
  const [hash, setHash] = useState(navigation);
  useEffect(() => {
    setHash(navigation);
  }, [navigation]);
  return (
    <div className={`ps-panel--sidebar ${hash === "mobile" ? "active" : null}`}>
      <div className="ps-panel__header">
        <h3>{t("categories")}</h3>
      </div>
      <div className="ps-panel__content">
        <ul className="menu--mobile">
          <SingleCategory categories={categories} />
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default compose(
  connect(mapStateToProps, null),
  withTranslation("sidebar")
)(Categories);