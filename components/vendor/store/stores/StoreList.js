const banner = "/coverimages/default-store-banner.png";
import Link from "next/link";
import Pagination from "../../../../components/layout/Pagination";
import { connect } from "react-redux";
import Router, { useRouter } from "next/router";
import {
  getProfiles,
  autocompleteProfiles,
} from "../../../../actions/sellerProfile";
import { useEffect, Fragment, useState } from "react";
import { withTranslation } from "../../../../i18n";
import { compose } from "redux";

const StoreList = ({
  sellerProfile: { profiles, loading, autocompletedProfiles },
  getProfiles,
  autocompleteProfiles,
  t
}) => {
  const router = useRouter();
  const { page_number } = router.query;
  const [term, setTerm] = useState("");
  useEffect(() => {
    getProfiles(page_number);
  }, [page_number]);
  return (
    <section className="ps-store-list">
      <div className="container">
        {/* <div className="ps-section__header">
          <h3>Store list</h3>
        </div> */}
        <div className="ps-section__content">
          <div className="ps-section__search row">
            <div className="col-md-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  Router.push(
                    `/sellers/search-results?search_query=${term}&page_number=1`
                  );
                }}
                className="form-group"
              >
                <input
                  autoComplete="off"
                  name="term"
                  value={term}
                  onChange={(e) => {
                    setTerm(e.target.value);
                    autocompleteProfiles(e.target.value);
                  }}
                  className="form-control"
                  type="text"
                  placeholder="Search seller..."
                />
                <button type={term ? "submit" : "button"}>
                  <i className="lnr lnr-magnifier"></i>
                </button>
              </form>
              <div
                style={{
                  display: !term && "none",
                }}
                className="sellers-autocomplete"
              >
                {autocompletedProfiles.map(({ _id, storeName }) => (
                  <Link
                    key={_id}
                    href={`/sellers/search-results?search_query=${storeName}&page_number=1`}
                  >
                    <a
                      onClick={() => {
                        setTerm("");
                      }}
                      className="autocomplete-text"
                    >
                      {storeName}
                    </a>
                  </Link>
                ))}
                <br />
              </div>
            </div>
          </div>
          {loading || profiles.length <= 0 ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">{t("loading")}</span>
              </div>
            </div>
          ) : (
            <Fragment>
              <div className="row">
                {profiles.map(
                  ({ storeImage, _id, storeAddress, storeName, seller }) => (
                    <div
                      key={_id}
                      className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12"
                    >
                      <article className="ps-block--store-2">
                        <div
                          className="ps-block__content bg--cover"
                          style={{
                            backgroundImage: `url(${banner})`,
                          }}
                        >
                          <figure>
                            <h4 className="text-capitalize">{storeName}</h4>
                            <div className="ps-block__rating">
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
                                {/* <div className="br-widget br-readonly">
                              <a className="br-selected br-current">
                                <i className="fas fa-star"></i>
                              </a>
                              <a className="br-selected br-current">
                                <i className="fas fa-star"></i>
                              </a>
                              <a className="br-selected br-current">
                                <i className="fas fa-star"></i>
                              </a>
                              <a className="br-selected br-current">
                                <i className="fas fa-star"></i>
                              </a>
                              <a>
                                <i className="nonSelect fas fa-star"></i>
                              </a>
                            </div> */}
                              </div>
                              {/* <p>
                            <strong>85% Positive</strong> (562 rating)
                          </p> */}
                            </div>
                            <p>{storeAddress}</p>
                            {/* <p>
                          <i className="icon-telephone"></i> (+053) 77-637-3300
                        </p> */}
                          </figure>
                        </div>
                        <div className="ps-block__author">
                          <Link
                            href={`/seller/store?store_id=${seller}&page_number=1`}
                          >
                            <a className="ps-block__user">
                              <img src={storeImage} alt={storeName} />
                            </a>
                          </Link>
                          <Link
                            href={`/seller/store?store_id=${seller}&page_number=1`}
                          >
                            <a className="ps-btn">{t("visit-store")}</a>
                          </Link>
                        </div>
                      </article>
                    </div>
                  )
                )}
              </div>
              <Pagination what="profiles" />
            </Fragment>
          )}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  sellerProfile: state.sellerProfile,
});

export default compose(
  connect(mapStateToProps, { getProfiles, autocompleteProfiles }),
  withTranslation("shop")
)(StoreList);