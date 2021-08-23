import Breadcrumb from "../../../layout/Breadcrumb";
import StoreList from "./StoreList";

const Stores = () => {
  return (
    <div className="ps-page--single ps-page--vendor">
      <Breadcrumb
        page="Sellers"
        pages={[
          {
            text: "Home",
            location: "/",
          },
        ]}
      />
      <StoreList />
    </div>
  );
};

export default Stores;
