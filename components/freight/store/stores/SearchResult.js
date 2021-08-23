import Breadcrumb from "../../../layout/Breadcrumb";
import SearchList from "./SearchList";

const SearchResult = () => {
  return (
    <div className="ps-page--single ps-page--vendor">
      <Breadcrumb
        page="Search Results"
        pages={[
          {
            text: "Home",
            location: "/",
          },
        ]}
      />
      <SearchList />
    </div>
  );
};

export default SearchResult;
