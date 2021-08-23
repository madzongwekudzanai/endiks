import React from "react";
import { Link } from "react-router-dom";
import one from "../../layout/coverimages/categories/brands/1.jpg";
import two from "../../layout/coverimages/categories/brands/2.jpg";
import three from "../../layout/coverimages/categories/brands/3.jpg";
import four from "../../layout/coverimages/categories/brands/4.jpg";
import five from "../../layout/coverimages/categories/brands/5.jpg";
import six from "../../layout/coverimages/categories/brands/6.jpg";
import seven from "../../layout/coverimages/categories/brands/7.jpg";
import eight from "../../layout/coverimages/categories/brands/8.jpg";

const CategoryShopBrand = () => {
  return (
    <div className="ps-shop-brand">
      <Link to="#">
        <img src={one} alt="" />
      </Link>
      <Link to="#">
        <img src={two} alt="" />
      </Link>
      <Link to="#">
        <img src={three} alt="" />
      </Link>
      <Link to="#">
        <img src={four} alt="" />
      </Link>
      <Link to="#">
        <img src={five} alt="" />
      </Link>
      <Link to="#">
        <img src={six} alt="" />
      </Link>
      <Link to="#">
        <img src={seven} alt="" />
      </Link>
      <Link to="#">
        <img src={eight} alt="" />
      </Link>
    </div>
  );
};

export default CategoryShopBrand;
