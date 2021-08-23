// import RightSaleItems from "./RightSaleItems";
import CategoryItems from "../CategoryItems";

const Right = () => {
  return (
    <div className="ps-layout__right">
      {/* <RightSaleItems title="Best Sale Items" />
      <RightSaleItems title="Recommended Items" /> */}
      <CategoryItems />
    </div>
  );
};

export default Right;
