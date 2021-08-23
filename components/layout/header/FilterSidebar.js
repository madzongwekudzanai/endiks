import LeftCategories from "../../shop/category/layout/LeftCategories";
import LeftBrands from "../../shop/category/layout/LeftBrands";
import LeftPriceOne from "../../shop/category/layout/LeftPriceOne";
import LeftPriceTwo from "../../shop/category/layout/LeftPriceTwo";
import ByColor from "../../shop/category/layout/ByColor";
import BySize from "../../shop/category/layout/BySize";
import Link from "next/link";

const FilterSidebar = () => {
  return (
    <div className="ps-filter--sidebar">
      <div className="ps-filter__header">
        <h3>Filter Products</h3>
        <Link href="#">
          <a className="ps-btn--close ps-btn--no-boder"></a>
        </Link>
      </div>
      <div className="ps-filter__content">
        <LeftCategories />
        <aside className="widget widget_shop">
          <LeftBrands />
          <LeftPriceOne />
          <LeftPriceTwo />
          <ByColor />
          <BySize />
        </aside>
      </div>
    </div>
  );
};

export default FilterSidebar;
