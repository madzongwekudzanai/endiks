import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "../../../i18n";

const Links = ({
  t,
  authSeller: { seller },
  sellerProfile: { loading, profile },
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
      <li className={page === "products" ? "active" : undefined}>
        <Link
          href={`?page=products&store_id=${seller && seller._id}&page_number=1`}
        >
          <a>{t("all-products")}</a>
        </Link>
      </li>
      <li className={page === "orders" ? "active" : undefined}>
        <Link href="?page=orders">
          <a>{t("orders")}</a>
        </Link>
      </li>
      <li>
        {!profile && !loading ? (
          <Link href="/seller/dashboard/create-profile">
            <a>{t("create-profile")}</a>
          </Link>
        ) : (
          <Link href="/seller/dashboard/edit-profile">
            <a>{t("edit-profile")}</a>
          </Link>
        )}
      </li>
      <li>
        {seller ? (
          <Link href={`/seller/store?store_id=${seller._id}&page_number=1`}>
            <a>{t("view-store")}</a>
          </Link>
        ) : null}
      </li>
    </ul>
  );
};

const mapStateToProps = (state) => ({
  authSeller: state.authSeller,
  sellerProfile: state.sellerProfile,
});

export default compose(
  connect(mapStateToProps, null),
  withTranslation("common")
)(Links);
