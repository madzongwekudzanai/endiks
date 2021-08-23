import Links from "../Links";
import { useRouter } from "next/router";
import RecentOrders from "./RecentOrders";
import RecentDestinations from "./RecentDestinations";
import AllOrders from "../free/RecentOrders";
import AllDestinations from "../free/AllDestinations";
import OrderDetail from "../free/OrderDetail";

const ProContent = () => {
  const router = useRouter();
  const { page } = router.query;
  return (
    <div className="ps-section__content">
      <Links />
      {!page ? (
        <div className="row">
          <RecentOrders />
          <RecentDestinations />
        </div>
      ) : page === "destinations" ? (
        <AllDestinations />
      ) : page === "order_detail" ? (
        <OrderDetail />
      ) : page === "orders" && (
         <AllOrders />
      )}
    </div>
  );
};

export default ProContent;
