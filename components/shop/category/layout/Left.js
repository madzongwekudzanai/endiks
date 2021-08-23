import LeftCategories from "./LeftCategories";
// import LeftBrands from "./LeftBrands";
// import LeftPriceOne from "./LeftPriceOne";
// import LeftPriceTwo from "./LeftPriceTwo";
// import ByColor from "./ByColor";
// import BySize from "./BySize";

const Left = () => {
  return (
    <div className="ps-layout__left">
      <LeftCategories />
      {/* <aside className="widget widget_shop">
        <LeftBrands />
        <LeftPriceOne />
        <LeftPriceTwo />
        <ByColor />
        <BySize />
      </aside> */}
    </div>
  );
};

export default Left;
