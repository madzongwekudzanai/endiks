import Breadcrumb from "../../../layout/Breadcrumb";
import StoreList from "./StoreList";
import { withTranslation } from "../../../../i18n";

const Stores = ({ t }) => {
  return (
    <div className="ps-page--single ps-page--vendor">
      <Breadcrumb
        page={t(sellers)}
        pages={[
          {
            text: t("home"),
            location: "/",
          },
        ]}
      />
      <StoreList />
    </div>
  );
};

export default withTranslation("shop")(Stores);