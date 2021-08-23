import Slider from "react-slick";
import { connect } from "react-redux";
import { Fragment, useState } from "react";
import LazyLoadImage from "../../layout/LazyLoadImage";

const ProductThumbnail = ({ product: { singleProduct } }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const settings = {
    dots: false,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <a className="slick-arrow slick-disabled">
        <i className="fas fa-angle-right"></i>
      </a>
    ),
    prevArrow: (
      <a className="slick-arrow slick-disabled">
        <i className="fas fa-angle-left"></i>
      </a>
    ),
    afterChange: function(index) {
      setActiveIndex(index);
    }
  };
  return (
    <Fragment>
      {singleProduct && (
        <div className="ps-product__thumbnail" data-vertical="true">
          <figure>
            <div className="ps-wrapper">
              <Slider className="ps-product__gallery" {...settings}>
                {singleProduct.slides.map((photo, index) => (
                  <img key={index} src={photo} alt={singleProduct.title} />
                ))}
              </Slider>
            </div>
          </figure>
          <div
            className="ps-product__variants slick-initialized slick-slider slick-vertical srink"
            data-item="4"
            data-md="4"
            data-sm="4"
            data-arrow="false"
          >
            <div
              aria-live="polite"
              className="slick-list draggable"
              style={{ height: "280px" }}
            >
              <div
                className="slick-track"
                role="listbox"
                style={{
                  opacity: "1",
                  height: "140px",
                  transform: "translate3d(0px, 0px, 0px)",
                }}
              >
                {singleProduct.slides.map((photo, index) => (
                  <div
                    key={index}
                    className={`item slick-slide ${
                      index === activeIndex ? "slick-current slick-active" : null
                    }`}
                    tabIndex="-1"
                    role="option"
                    aria-describedby="slick-slide10"
                    style={{ width: "60px" }}
                    data-slick-index="0"
                    aria-hidden="false"
                  >
                    <a>
                      <LazyLoadImage height={60} width={60}>
                        <img src={photo} alt={singleProduct.title} />
                      </LazyLoadImage>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, null)(ProductThumbnail);
