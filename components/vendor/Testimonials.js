import { useState } from "react";
import OwlCarousel from "react-owl-carousel2";
const one = "/coverimages/testimonial-vendor/1.jpg";
const two = "/coverimages/testimonial-vendor/2.png";
const three = "/coverimages/testimonial-vendor/3.jpg";

const Testimonials = () => {
  const [items, setItems] = useState([
    <div className="ps-block--testimonial">
      <div className="ps-block__header">
        <img src={one} alt="" />
      </div>
      <div className="ps-block__content">
        <i className="fas fa-quote-right"></i>
        <h4>
          Kanye West<span>Head Chef at BBQ Restaurant</span>
        </h4>
        <p>
          Sed elit quam, iaculis sed semper sit amet udin vitae nibh. at magna
          akal semperFusce commodo molestie luctus.Lorem ipsum Dolor tusima
          olatiup.
        </p>
      </div>
    </div>,
    <div className="ps-block--testimonial">
      <div className="ps-block__header">
        <img src={two} alt="" />
      </div>
      <div className="ps-block__content">
        <i className="fas fa-quote-right"></i>
        <h4>
          Anabella Kleva<span>Boss at TocoToco</span>
        </h4>
        <p>
          Sed elit quam, iaculis sed semper sit amet udin vitae nibh. at magna
          akal semperFusce commodo molestie luctus.Lorem ipsum Dolor tusima
          olatiup.
        </p>
      </div>
    </div>,
    <div className="ps-block--testimonial">
      <div className="ps-block__header">
        <img src={three} alt="" />
      </div>
      <div className="ps-block__content">
        <i className="fas fa-quote-right"></i>
        <h4>
          William Roles<span>Head Chef at BBQ Restaurant</span>
        </h4>
        <p>
          Sed elit quam, iaculis sed semper sit amet udin vitae nibh. at magna
          akal semperFusce commodo molestie luctus.Lorem ipsum Dolor tusima
          olatiup.
        </p>
      </div>
    </div>,
  ]);
  const options = {
    navText: ["&#xe875;", "&#xe876;"],
    items: 3,
    autoplayTimeout: 1000,
    autoplaySpeed: 1000,
    smartSpeed: 1000,
    dots: true,
    margin: 30,
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
        items: 2,
      },
      1200: {
        items: 2,
      },
    },
  };
  return (
    <div className="ps-section--vendor ps-vendor-testimonials">
      <div className="container">
        <div className="ps-section__header">
          <p>SELLER STORIES</p>
          <h4>See Seller share about their successful on Martfury</h4>
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
    </div>
  );
};

export default Testimonials;
