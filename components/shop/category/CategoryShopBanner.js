import React, { useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel2";
import one from "../../layout/coverimages/categories/sub-category/1.jpg";
import two from "../../layout/coverimages/categories/sub-category/2.jpg";

const CategoryShopBanner = () => {
  const [items, setItems] = useState([
    <Link to="#">
      <img src={one} alt="" />
    </Link>,
    <Link to="#">
      <img src={two} alt="" />
    </Link>,
  ]);
  const options = {
    navText: ["&#xe875;", "&#xe876;"],
    items: 2,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    smartSpeed: 1000,
    dots: true,
    stagePadding: 0,
    loop: true,
    nav: true,
    mouseDrag: true,
    rewind: true,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 1,
      },
      992: {
        items: 1,
      },
      1200: {
        items: 1,
      },
    },
  };
  return (
    <div className="ps-shop-banner">
      <OwlCarousel
        className="ps-carousel--nav-inside owl-slider owl-carousel owl-theme owl-loaded"
        options={options}
      >
        {items}
      </OwlCarousel>
    </div>
  );
};

export default CategoryShopBanner;
