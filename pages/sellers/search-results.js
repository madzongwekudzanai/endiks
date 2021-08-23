import Layout from "../../components/layout/Layout";
import SearchResult from "../../components/vendor/store/stores/SearchResult";
import { useRouter } from "next/router";
import AuthSellerWrapper from "../../components/routing/AuthSellerWrapper";
import { withTranslation } from "../../i18n";
import AuthFreightWrapper from "../../components/routing/AuthFreightWrapper";

const SearchResults = () => {
  const router = useRouter();
  const { search_query } = router.query;
  return (
    <Layout title={search_query} description={search_query}>
      <AuthFreightWrapper>
        <AuthSellerWrapper>
          <SearchResult />
        </AuthSellerWrapper>
      </AuthFreightWrapper>
    </Layout>
  );
};

SearchResults.getInitialProps = async () => ({
  namespacesRequired: ["shop"],
});

export default withTranslation()(SearchResults);