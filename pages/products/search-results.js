import AuthFreightWrapper from "../../components/routing/AuthFreightWrapper";
import AuthSellerWrapper from "../../components/routing/AuthSellerWrapper";
import Category from "../../components/shop/Category";
import { withTranslation } from "../../i18n";

const SearchResults = () => {
  return (
    <AuthFreightWrapper>
      <AuthSellerWrapper>
    <Category />
  </AuthSellerWrapper>
    </AuthFreightWrapper>
  );
};

SearchResults.getInitialProps = async () => ({
  namespacesRequired: ["shop"],
});

export default withTranslation()(SearchResults);