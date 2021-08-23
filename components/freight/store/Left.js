// import Link from "next/link";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { getProfileById } from "../../../actions/sellerProfile";
import { useEffect } from "react";

const Left = ({ sellerProfile: { profile, loading }, getProfileById }) => {
  const router = useRouter();
  const { store_id } = router.query;
  useEffect(() => {
    getProfileById(store_id);
  }, [store_id]);
  return (
    <div className="ps-section__left">
      {loading || !profile ? (
        <span className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">载入中...</span>
          </div>
        </span>
      ) : (
        <div className="ps-block--vendor">
          <div className="ps-block__thumbnail">
            <img src={profile.storeImage} alt={profile.storeName} />
          </div>
          <div className="ps-block__container">
            <div className="ps-block__header">
              <h4>{profile.storeName}</h4>
              {/* <div className="ps-product__rating">
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
                <Link href="#"><a className="br-selected br-current">
                  <i className="fas fa-star"></i></a>
                </Link>
                <Link href="#"><a className="br-selected br-current">
                  <i className="fas fa-star"></i></a>
                </Link>
                <Link href="#"><a className="br-selected br-current">
                  <i className="fas fa-star"></i></a>
                </Link>
                <Link href="#"><a className="br-selected br-current">
                  <i className="fas fa-star"></i></a>
                </Link>
                <Link href="#"><a><i className="nonSelect fas fa-star"></i></a>
                  
                </Link>
              </div>
              <p>
                <strong>85% Positive</strong> (562 rating)
              </p>
            </div> */}
            </div>
            <span className="ps-block__divider"></span>
            <div className="ps-block__content">
              <p>
                <strong>{profile.storeName}</strong>, {profile.bio}
              </p>
              <span className="ps-block__divider"></span>
              <p>
                <strong>Address</strong> {profile.storeAddress}
              </p>
              {/* <figure>
              <figcaption>Follow us on social</figcaption>
              <ul className="ps-list--social-color">
                <li>
                  <Link href="#">
                    <a className="facebook">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a className="twitter">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a className="linkedin">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a className="feed">
                      <i className="fa fa-feed"></i>
                    </a>
                  </Link>
                </li>
              </ul>
            </figure> */}
            </div>
            {/* <div className="ps-block__footer">
            <p>
              Call us directly<strong>(+053) 77-637-3300</strong>
            </p>
            <p>or Or if you have any question</p>
            <Link href="#">
              <a className="ps-btn ps-btn--fullwidth">Contact Seller</a>
            </Link>
          </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  sellerProfile: state.sellerProfile,
});

export default connect(mapStateToProps, { getProfileById })(Left);
