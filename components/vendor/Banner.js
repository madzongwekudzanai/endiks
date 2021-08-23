const vendor = "/background/vendor.jpg";
import Link from "next/link";

const Banner = ({ text, location, locationText }) => {
  return (
    <div
      className="ps-vendor-banner bg--cover"
      data-background={vendor}
      style={{ background: `url(${vendor})` }}
    >
      <div className="container">
        <h2>{text}</h2>
        <Link href={location}>
          <a className="ps-btn ps-btn--lg">{locationText}</a>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
