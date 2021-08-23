import AuthFreightWrapper from "../../components/routing/AuthFreightWrapper";
import ProdDet from "../../components/shop/ProductDetail";
import { withTranslation } from "../../i18n";

const ProductDetail = () => {
  return (
    <AuthFreightWrapper>
      <ProdDet />
    </AuthFreightWrapper>
  );
};

ProductDetail.getInitialProps = async () => ({
  namespacesRequired: ["product"],
});

export default withTranslation()(ProductDetail);
