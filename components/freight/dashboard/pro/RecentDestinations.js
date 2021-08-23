import Link from "next/link";
import { connect } from "react-redux";
import { getRecentFreightDestinations } from "../../../../actions/destination";
import { useEffect, Fragment, useState } from "react";
import Moment from "react-moment";
import Router from 'next/router';
import { compose } from "redux";
import { withTranslation } from "../../../../i18n";

const RecentDestinations = ({
  destination: { recentFreightDestinations, recentFreightDestinationsLoading },
  getRecentFreightDestinations,
  language: { loc },
  t,
}) => {
  const [locale, setLocale] = useState(loc === "english" ? "en" : "zh");
  useEffect(() => {
    getRecentFreightDestinations();
    setLocale(loc === "english" ? "en" : "zh");
  }, [loc]);
  return (
    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ">
      <figure className="ps-block--vendor-status table-responsive">
        <div className="text-box">
          <figcaption className="figCap">{t("recent-destinations")}</figcaption>
            <button
              type="button"
              className="btn btn-danger textBoxBtn btn-lg"
              onClick={() => {
                Router.push("/freight/destinations/add-destination")
              }}
            >
              {t("add-destination")}
            </button>
        </div>
        <table className="table ps-table ps-table--vendor">
          <thead>
            <tr>
              <th>{t("origin")}</th>
              <th>{t("destination")}</th>
            </tr>
          </thead>
          {!recentFreightDestinationsLoading && recentFreightDestinations.length <= 0 ? (
            <span>
              {t("no-destinations")}{" "}
              <Link href="/freight/destinations/add-destination">
                <a>{t("add-destination")}</a>
              </Link>
            </span>
          ) : (
            <Fragment>
              <tbody>
                {recentFreightDestinationsLoading ? (
                  <Fragment>
                    <span className="d-flex justify-content-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">{t("loading")}</span>
                      </div>
                    </span>
                  </Fragment>
                ) : (
                  <Fragment>
                    {recentFreightDestinations.map(
                      ({
                        _id,
                        country,
                        freightType,
                        destinationAddress,
                        originAddress
                      }) => (
                        <tr key={_id}>
                          <td>
                            <a>{freightType[locale]}</a>
                            <p className="text-trunk">
                              {originAddress}
                            </p>
                          </td>
                          <td>
                            {country[locale]}
                            <p className="text-trunk">
                              {destinationAddress}
                            </p>
                          </td>
                        </tr>
                      )
                    )}
                  </Fragment>
                )}
              </tbody>
            </Fragment>
          )}
        </table>
        {!recentFreightDestinationsLoading && recentFreightDestinations.length > 0 && (
          <div className="ps-block__footer">
            <Link
              href="?page=destinations"
            >
              <a>{t("view-all-destinations")}</a>
            </Link>
          </div>
        )}
      </figure>
    </div>
  );
};

const mapStateToProps = (state) => ({
  destination: state.destination,
  language: state.language,
});

export default compose(
  connect(mapStateToProps, { getRecentFreightDestinations }),
  withTranslation("dashboard")
)(RecentDestinations);
