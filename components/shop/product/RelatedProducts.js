import { useState } from "react";
import OwlCarousel from "react-owl-carousel2";
const one = "/coverimages/productBox/technology/1.jpg";
import Link from "next/link";

const RelatedProducts = () => {
  const [items, setItems] = useState([
    <div className="ps-product">
      <div className="ps-product__thumbnail">
        <Link href="product-default.html">
          <a>
            <img src={one} alt="" />
          </a>
        </Link>
        <ul className="ps-product__actions">
          <li>
            <Link href="#">
              <a data-toggle="tooltip" data-placement="top" title="Read More">
                <i className="lnr lnr-cart"></i>
              </a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a
                data-placement="top"
                title="Quick View"
                data-toggle="modal"
                data-target="#product-quickview"
              >
                <i className="lnr lnr-eye"></i>
              </a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a
                data-toggle="tooltip"
                data-placement="top"
                title="Add to Whishlist"
              >
                <i className="lnr lnr-heart"></i>
              </a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a data-toggle="tooltip" data-placement="top" title="Compare">
                <i className="lnr lnr-chart-bars"></i>
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="ps-product__container">
        <Link href="#">
          <a className="ps-product__vendor">Robert's Store</a>
        </Link>
        <div className="ps-product__content">
          <Link href="product-default.html">
            <a className="ps-product__title">
              Men’s Sports Runnning Swim Board Shorts
            </a>
          </Link>
          <div className="ps-product__rating">
            <div className="br-wrapper br-theme-fontawesome-stars">
              <select
                style={{ display: "none" }}
                className="ps-rating"
                data-read-only="true"
              >
                <option value="1">1</option>
                <option value="1">2</option>
                <option value="1">3</option>
                <option value="1">4</option>
                <option value="2">5</option>
              </select>
              <div className="br-widget br-readonly">
                <Link href="#">
                  <a className="br-selected br-current">
                    <i className="fas fa-star"></i>
                  </a>
                </Link>
                <Link href="#">
                  <a className="br-selected br-current">
                    <i className="fas fa-star"></i>
                  </a>
                </Link>
                <Link href="#">
                  <a className="br-selected br-current">
                    <i className="fas fa-star"></i>
                  </a>
                </Link>
                <Link href="#">
                  <a className="br-selected br-current">
                    <i className="fas fa-star"></i>
                  </a>
                </Link>
                <Link href="#">
                  <a>
                    <i className="nonSelect fas fa-star"></i>
                  </a>
                </Link>
                <div className="br-current-rating">1</div>
                <span>02</span>
              </div>
            </div>
          </div>
          <p className="ps-product__price">$13.43</p>
        </div>
        <div className="ps-product__content hover">
          <Link href="product-default.html">
            <a className="ps-product__title">
              Men’s Sports Runnning Swim Board Shorts
            </a>
          </Link>
          <p className="ps-product__price">$13.43</p>
        </div>
      </div>
    </div>,
  ]);
  const options = {
    navText: ["&#xe875;", "&#xe876;"],
    items: 9,
    autoplayTimeout: 10000,
    autoplaySpeed: 1000,
    smartSpeed: 1000,
    dots: false,
    stagePadding: 0,
    loop: true,
    nav: true,
    mouseDrag: true,
    rewind: true,
    autoplay: true,
    responsive: {
      0: {
        items: 2,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  };
  return (
    <div className="ps-section--default">
      <div className="ps-section__header">
        <h3>Related products</h3>
      </div>
      <div className="ps-section__content">
        <OwlCarousel
          className="ps-carousel--nav owl-slider owl-carousel owl-theme owl-loaded"
          options={options}
        >
          {items}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default RelatedProducts;
