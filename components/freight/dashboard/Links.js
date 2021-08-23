import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "../../../i18n";

const Links = ({
  t,
  cargoProfile: { loading, profile },
}) => {
  const router = useRouter();
  const { page } = router.query;
  return (
    <ul className="ps-section__links mt-3">
      <li className={!page ? "active" : undefined}>
        <Link href="#">
          <a>{t("dashboard")}</a>
        </Link>
      </li>
      <li className={page === "orders" ? "active" : undefined}>
        <Link href="?page=orders">
          <a>{t("orders")}</a>
        </Link>
      </li>
      <li className={page === "destinations" ? "active" : undefined}>
        <Link href="?page=destinations">
          <a>{t("destinations")}</a>
        </Link>
      </li>
      <li>
        {!profile && !loading ? (
          <Link href="/freight/dashboard/create-profile">
            <a>{t("create-profile")}</a>
          </Link>
        ) : (
          <Link href="/freight/dashboard/edit-profile">
            <a>{t("edit-profile")}</a>
          </Link>
        )}
      </li>
    </ul>
  );
};

const mapStateToProps = (state) => ({
  cargoProfile: state.cargoProfile,
});

export default compose(
  connect(mapStateToProps, null),
  withTranslation("common")
)(Links);
