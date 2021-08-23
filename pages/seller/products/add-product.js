import CreateProduct from "../../../components/vendor/store/forms/AddProduct";
import Layout from "../../../components/layout/Layout";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import PrivateSellerRoute from "../../../components/routing/PrivateSellerRoute";
import { withTranslation } from "../../../i18n";
import { useRouter } from "next/router";
import AddProductsWrapper from "../../../components/routing/AddProductsWrapper";
import AddMultipleProducts from "../../../components/vendor/store/forms/AddMultipleProducts";
import AddProductOptions from "../../../components/vendor/store/forms/AddProductOptions";

const AddProduct = ({ t }) => {
  const router = useRouter();
  const { quantity } = router.query;
  return (
    <Layout
      title={
        quantity === "multiple" ? t("add-multiple-products") : quantity === "options" ? t("add-product-options") : t("add-product")
      }
      description={quantity === "multiple" ? t("add-multiple-products") : quantity === "options" ? t("add-product-options") : t("add-product")}
    >
      <AddProductsWrapper>
        <PrivateSellerRoute>
          <div className="ps-page--single" id="contact-us">
            <Breadcrumb
              page={
                quantity === "multiple" ? t("add-multiple-products") : quantity === "options" ? t("add-product-options") : t("add-product")
              }
              pages={[
                {
                  text: t("dashboard"),
                  location: "/seller/dashboard",
                },
              ]}
            />
            {quantity === "multiple" ? (
              <AddMultipleProducts />
            ) : quantity === "options" ? (
              <AddProductOptions />
            ) : (
              <CreateProduct />
            )}
          </div>
        </PrivateSellerRoute>
      </AddProductsWrapper>
    </Layout>
  );
};

AddProduct.getInitialProps = async () => ({
  namespacesRequired: ["products"],
});

export default withTranslation("products")(AddProduct);
