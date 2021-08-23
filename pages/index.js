import Head from "next/head";
import HeaderMobile from "../components/layout/header/HeaderMobile";
import Sidebar from "../components/layout/header/Sidebar";
import NewArrivals from "../components/layout/landing/NewArrivals";
import LandingWrapper from "../components/routing/LandingWrapper";
import { withTranslation } from "../i18n";
import CategoriesLayout from "../components/layout/landing/CategoriesLayout";
import AuthSellerWrapper from "../components/routing/AuthSellerWrapper";
import AuthFreightWrapper from "../components/routing/AuthFreightWrapper";

const Index = ({ t }) => {
  return (
    <LandingWrapper>
      <AuthFreightWrapper>
        <AuthSellerWrapper>
        <Head>
          <title>
            {t("title")}
          </title>
          <meta
            name="description"
            content={t("title")}
          />
        </Head>
        <HeaderMobile />
        <Sidebar />
        <div className="pt-5" id="homepage-7">
          <CategoriesLayout />
          <NewArrivals />
        </div>
        </AuthSellerWrapper>
      </AuthFreightWrapper>
    </LandingWrapper>
  );
};

Index.getInitialProps = async () => ({
  namespacesRequired: ["common", "footer", "header", "landing"],
});

export default withTranslation("landing")(Index);
