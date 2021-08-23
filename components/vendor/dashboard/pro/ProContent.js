// import DatePicker from "../DatePicker";
import Links from "../Links";
import { useRouter } from "next/router";
// import CommissionDue from "./CommissionDue";
// import CommissionPaid from "./CommissionPaid";
import RecentOrders from "./RecentOrders";
import RecentProducts from "./RecentProducts";
import AllOrders from "../free/RecentOrders";
import AllProducts from "../free/AllProducts";
import OrderDetail from "../free/OrderDetail";
// import TotalOrders from "./charts/TotalOrders";
// import TotalProducts from "./charts/TotalProducts";

const ProContent = () => {
  const router = useRouter();
  const { page } = router.query;
  return (
    <div className="ps-section__content">
      <Links />
      {/* <DatePicker /> */}
      {!page ? (
        <div className="row">
          {/* <CommissionDue />
        <CommissionPaid />
        <TotalOrders />
        <TotalProducts /> */}
          <RecentOrders />
          <RecentProducts />
        </div>
      ) : page === "products" ? (
        <AllProducts />
      ) : page === "order_detail" ? (
        <OrderDetail />
      ) : (
        page === "orders" && <AllOrders />
      )}
    </div>
  );
};

export default ProContent;
