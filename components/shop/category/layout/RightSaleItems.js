import React, { useState } from "react";
import OwlCarousel from "react-owl-carousel2";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import one from "../../../layout/coverimages/categories/1.jpg";
import two from "../../../layout/coverimages/categories/2.jpg";
import three from "../../../layout/coverimages/categories/3.jpg";
import four from "../../../layout/coverimages/categories/4.jpg";
import five from "../../../layout/coverimages/categories/5.jpg";
import six from "../../../layout/coverimages/categories/6.jpg";
import seven from "../../../layout/coverimages/categories/7.jpg";

const RightSaleItems = ({ title }) => {
  const [items, setItems] = useState([
    <div className="ps-product">
      <div className="ps-product__thumbnail">
        <Link to="product-default.html">
          <img src={one} alt="" />
        </Link>
        <ul className="ps-product__actions">
          <li>
            <Link
              to="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Read More"
            >
              <i className="lnr lnr-cart"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              data-placement="top"
              title="Quick View"
              data-toggle="modal"
              data-target="#product-quickview"
            >
              <i className="lnr lnr-eye"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Add to Whishlist"
            >
              <i className="lnr lnr-heart"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Compare"
            >
              <i className="lnr lnr-chart-bars"></i>
            </Link>
          </li>
        </ul>
      </div>
      <div className="ps-product__container">
        <Link className="ps-product__vendor" to="#">
          Young Shop
        </Link>
        <div className="ps-product__content">
          <Link className="ps-product__title" to="product-default.html">
            Sleeve Linen Blend Caro Pane Shirt
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
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link>
                  <i className="nonSelect fas fa-star"></i>
                </Link>
                <div className="br-current-rating">1</div>
                <span>02</span>
              </div>
            </div>
          </div>
          <p className="ps-product__price">$22.99 - $32.99</p>
        </div>
        <div className="ps-product__content hover">
          <Link className="ps-product__title" to="product-default.html">
            Sleeve Linen Blend Caro Pane Shirt
          </Link>
          <p className="ps-product__price">$22.99 - $32.99</p>
        </div>
      </div>
    </div>,
    <div className="ps-product">
      <div className="ps-product__thumbnail">
        <Link to="product-default.html">
          <img src={two} alt="" />
        </Link>
        <div className="ps-product__badge">-7%</div>
        <ul className="ps-product__actions">
          <li>
            <Link
              to="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Read More"
            >
              <i className="lnr lnr-cart"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              data-placement="top"
              title="Quick View"
              data-toggle="modal"
              data-target="#product-quickview"
            >
              <i className="lnr lnr-eye"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Add to Whishlist"
            >
              <i className="lnr lnr-heart"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Compare"
            >
              <i className="lnr lnr-chart-bars"></i>
            </Link>
          </li>
        </ul>
      </div>
      <div className="ps-product__container">
        <Link className="ps-product__vendor" to="#">
          Young Shop
        </Link>
        <div className="ps-product__content">
          <Link className="ps-product__title" to="product-default.html">
            MVMTH ClassNclassNameical Leather Watch In Black
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
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link>
                  <i className="nonSelect fas fa-star"></i>
                </Link>
                <div className="br-current-rating">1</div>
                <span>02</span>
              </div>
            </div>
          </div>
          <p className="ps-product__price sale">
            $57.99 <del>$62.99 </del>
          </p>
        </div>
        <div className="ps-product__content hover">
          <Link className="ps-product__title" to="product-default.html">
            MVMTH ClassNclassNameical Leather Watch In Black
          </Link>
          <p className="ps-product__price sale">
            $57.99 <del>$62.99 </del>
          </p>
        </div>
      </div>
    </div>,
    <div className="ps-product">
      <div className="ps-product__thumbnail">
        <Link to="product-default.html">
          <img src={three} alt="" />
        </Link>
        <div className="ps-product__badge">-16%</div>
        <ul className="ps-product__actions">
          <li>
            <Link
              to="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Read More"
            >
              <i className="lnr lnr-cart"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              data-placement="top"
              title="Quick View"
              data-toggle="modal"
              data-target="#product-quickview"
            >
              <i className="lnr lnr-eye"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Add to Whishlist"
            >
              <i className="lnr lnr-heart"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Compare"
            >
              <i className="lnr lnr-chart-bars"></i>
            </Link>
          </li>
        </ul>
      </div>
      <div className="ps-product__container">
        <Link className="ps-product__vendor" to="#">
          Young Shop
        </Link>
        <div className="ps-product__content">
          <Link className="ps-product__title" to="product-default.html">
            Unero Military ClassNclassNameical Backpack
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
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link>
                  <i className="nonSelect fas fa-star"></i>
                </Link>
                <div className="br-current-rating">1</div>
                <span>02</span>
              </div>
            </div>
          </div>
          <p className="ps-product__price sale">
            $35.00 <del>$60.00 </del>
          </p>
        </div>
        <div className="ps-product__content hover">
          <Link className="ps-product__title" to="product-default.html">
            Unero Military ClassNclassNameical Backpack
          </Link>
          <p className="ps-product__price sale">
            $35.00 <del>$60.00 </del>
          </p>
        </div>
      </div>
    </div>,
    <div className="ps-product">
      <div className="ps-product__thumbnail">
        <Link to="product-default.html">
          <img src={four} alt="" />
        </Link>
        <div className="ps-product__badge">-5%</div>
        <ul className="ps-product__actions">
          <li>
            <Link
              to="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Read More"
            >
              <i className="lnr lnr-cart"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              data-placement="top"
              title="Quick View"
              data-toggle="modal"
              data-target="#product-quickview"
            >
              <i className="lnr lnr-eye"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Add to Whishlist"
            >
              <i className="lnr lnr-heart"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Compare"
            >
              <i className="lnr lnr-chart-bars"></i>
            </Link>
          </li>
        </ul>
      </div>
      <div className="ps-product__container">
        <Link className="ps-product__vendor" to="#">
          Go Pro
        </Link>
        <div className="ps-product__content">
          <Link className="ps-product__title" to="product-default.html">
            Sound Intone I65 Earphone White Version
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
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link>
                  <i className="nonSelect fas fa-star"></i>
                </Link>
                <div className="br-current-rating">1</div>
                <span>02</span>
              </div>
            </div>
          </div>
          <p className="ps-product__price sale">
            $100.00 <del>$105.00 </del>
          </p>
        </div>
        <div className="ps-product__content hover">
          <Link className="ps-product__title" to="product-default.html">
            Sound Intone I65 Earphone White Version
          </Link>
          <p className="ps-product__price sale">
            $100.00 <del>$105.00 </del>
          </p>
        </div>
      </div>
    </div>,
    <div className="ps-product">
      <div className="ps-product__thumbnail">
        <Link to="product-default.html">
          <img src={five} alt="" />
        </Link>
        <ul className="ps-product__actions">
          <li>
            <Link
              to="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Read More"
            >
              <i className="lnr lnr-cart"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              data-placement="top"
              title="Quick View"
              data-toggle="modal"
              data-target="#product-quickview"
            >
              <i className="lnr lnr-eye"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Add to Whishlist"
            >
              <i className="lnr lnr-heart"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Compare"
            >
              <i className="lnr lnr-chart-bars"></i>
            </Link>
          </li>
        </ul>
      </div>
      <div className="ps-product__container">
        <Link className="ps-product__vendor" to="#">
          Global Office
        </Link>
        <div className="ps-product__content">
          <Link className="ps-product__title" to="product-default.html">
            Herschel Leather Duffle Bag In Brown Color
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
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link>
                  <i className="nonSelect fas fa-star"></i>
                </Link>
                <div className="br-current-rating">1</div>
                <span>02</span>
              </div>
            </div>
          </div>
          <p className="ps-product__price">$125.30</p>
        </div>
        <div className="ps-product__content hover">
          <Link className="ps-product__title" to="product-default.html">
            Herschel Leather Duffle Bag In Brown Color
          </Link>
          <p className="ps-product__price">$125.30</p>
        </div>
      </div>
    </div>,
    <div className="ps-product">
      <div className="ps-product__thumbnail">
        <Link to="product-default.html">
          <img src={six} alt="" />
        </Link>
        <div className="ps-product__badge hot">Hot</div>
        <ul className="ps-product__actions">
          <li>
            <Link
              to="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Read More"
            >
              <i className="lnr lnr-cart"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              data-placement="top"
              title="Quick View"
              data-toggle="modal"
              data-target="#product-quickview"
            >
              <i className="lnr lnr-eye"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Add to Whishlist"
            >
              <i className="lnr lnr-heart"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Compare"
            >
              <i className="lnr lnr-chart-bars"></i>
            </Link>
          </li>
        </ul>
      </div>
      <div className="ps-product__container">
        <Link className="ps-product__vendor" to="#">
          Global Office
        </Link>
        <div className="ps-product__content">
          <Link className="ps-product__title" to="product-default.html">
            Xbox One Wireless Controller Black Color
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
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link>
                  <i className="nonSelect fas fa-star"></i>
                </Link>
                <div className="br-current-rating">1</div>
                <span>02</span>
              </div>
            </div>
          </div>
          <p className="ps-product__price sale">
            $1025.00 <del>$1422.00 </del>
          </p>
        </div>
        <div className="ps-product__content hover">
          <Link className="ps-product__title" to="product-default.html">
            Xbox One Wireless Controller Black Color
          </Link>
          <p className="ps-product__price sale">
            $1025.00 <del>$1422.00 </del>
          </p>
        </div>
      </div>
    </div>,
    <div className="ps-product">
      <div className="ps-product__thumbnail">
        <Link to="product-default.html">
          <img src={seven} alt="" />
        </Link>
        <ul className="ps-product__actions">
          <li>
            <Link
              to="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Read More"
            >
              <i className="lnr lnr-cart"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              data-placement="top"
              title="Quick View"
              data-toggle="modal"
              data-target="#product-quickview"
            >
              <i className="lnr lnr-eye"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Add to Whishlist"
            >
              <i className="lnr lnr-heart"></i>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Compare"
            >
              <i className="lnr lnr-chart-bars"></i>
            </Link>
          </li>
        </ul>
      </div>
      <div className="ps-product__container">
        <Link className="ps-product__vendor" to="#">
          Robert's Store
        </Link>
        <div className="ps-product__content">
          <Link className="ps-product__title" to="product-default.html">
            Samsung UHD TV 24inch
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
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link className="br-selected br-current">
                  <i className="fas fa-star"></i>
                </Link>
                <Link>
                  <i className="nonSelect fas fa-star"></i>
                </Link>
                <div className="br-current-rating">1</div>
                <span>02</span>
              </div>
            </div>
          </div>
          <p className="ps-product__price">$599.00</p>
        </div>
        <div className="ps-product__content hover">
          <Link className="ps-product__title" to="product-default.html">
            Samsung UHD TV 24inch
          </Link>
          <p className="ps-product__price">$599.00</p>
        </div>
      </div>
    </div>,
  ]);
  const options = {
    navText: ["", ""],
    items: 7,
    autoplayTimeout: 10000,
    autoplaySpeed: 1000,
    smartSpeed: 1000,
    dots: false,
    stagePadding: 0,
    loop: true,
    nav: false,
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
    <div className="ps-block--shop-features">
      <div className="ps-block__header">
        <h3>{title}</h3>
        <div className="ps-block__navigation">
          <Link className="ps-carousel__prev" to="#recommended1">
            <i className="lnr lnr-chevron-left"></i>
          </Link>
          <Link className="ps-carousel__next" to="#recommended1">
            <i className="lnr lnr-chevron-right"></i>
          </Link>
        </div>
      </div>
      <div className="ps-block__content">
        <OwlCarousel
          className="owl-slider owl-carousel owl-theme owl-loaded"
          options={options}
        >
          {items}
        </OwlCarousel>
      </div>
    </div>
  );
};

RightSaleItems.propTypes = {
  title: PropTypes.string.isRequired,
};

export default RightSaleItems;
