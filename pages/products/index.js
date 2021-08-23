import Breadcrumb from "../../components/layout/Breadcrumb";
import ShopHeader from "../../components/layout/header/ShopHeader";
import Sidebar from "../../components/layout/header/Sidebar";
import CategoryLayout from "../../components/shop/category/CategoryLayout";
import { useRouter } from "next/router";
import AuthSellerWrapper from "../../components/routing/AuthSellerWrapper";
import AuthFreightWrapper from "../../components/routing/AuthFreightWrapper";
import { withTranslation } from "../../i18n";

const Category = ({ t }) => {
  const router = useRouter();
  const { category, sub_category, group } = router.query;
  return (
    <AuthSellerWrapper>
      <AuthFreightWrapper>
        <ShopHeader />
        <Sidebar />
        <Breadcrumb
          page={(group && sub_category && category) ? group.split("-").join("&") : (!group && sub_category && category) ? sub_category.split("-").join("&") : (!group && !sub_category && category) ? category.split("-").join("&") : null}
          pages={(group && sub_category && category) ? [
            {
              text: t("home"),
              location: "/",
            },
            {
              text: category && category.split("-").join("&"),
              location: "/",
            },
            {
              text: sub_category && sub_category.split("-").join("&"),
              location: "/",
            },
          ] : (!group && sub_category && category) ? [
            {
              text: t("home"),
              location: "/",
            },
            {
              text: category && category.split("-").join("&"),
              location: "/",
            },
          ] : (!group && !sub_category && category) ? [
            {
              text: t("home"),
              location: "/",
            },
          ] : null}
        />
        <div className="ps-page--shop pt-5">
          <div className="ps-container">
            <CategoryLayout />
          </div>
        </div>
      </AuthFreightWrapper>
    </AuthSellerWrapper>
  );
};

Category.getInitialProps = async () => ({
  namespacesRequired: ["shop"],
});

export default withTranslation("shop")(Category);