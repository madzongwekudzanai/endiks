import EditProduct from "../../../../components/vendor/store/forms/EditProduct";
import Layout from "../../../../components/layout/Layout";
import Breadcrumb from "../../../../components/layout/Breadcrumb";
import PrivateSellerRoute from "../../../../components/routing/PrivateSellerRoute";
import { withTranslation } from "../../../../i18n";
import EditProductWrapper from "../../../../components/routing/EditProductWrapper";

const UpdateProduct = ({ t }) => {
  return (
    <Layout title={t("edit-product")} description={t("edit-product")}>
      <EditProductWrapper>
        <PrivateSellerRoute>
          <div className="ps-page--single" id="contact-us">
            <Breadcrumb
              page={t("edit-product")}
              pages={[
                {
                  text: t("dashboard"),
                  location: "/seller/dashboard",
                },
              ]}
            />
            <EditProduct />
          </div>
        </PrivateSellerRoute>
      </EditProductWrapper>
    </Layout>
  );
};

UpdateProduct.getInitialProps = async () => ({
  namespacesRequired: ["products"],
});

export default withTranslation("products")(UpdateProduct);
