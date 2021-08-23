import { useRouter } from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import {
  getDestinationsByFreight,
  deleteDestination,
} from "../../../../actions/destination";
import { useEffect } from "react";
import { compose } from "redux";
import { Fragment, useState } from "react";
import { withTranslation } from "../../../../i18n";

const AllDestinations = ({
  language: { loc },
  destination: { freightDestinations, freightDestinationsLoading },
  formLoading: { deleteLoading },
  getDestinationsByFreight,
  deleteDestination,
  t,
}) => {
  const router = useRouter();
  const [locale, setLocale] = useState(loc === "english" ? "en" : "zh");
  useEffect(() => {
    getDestinationsByFreight();
    setLocale(loc === "english" ? "en" : "zh");
  }, [loc]);
  return (
    <div className="ps-block--vendor-dashboard">
      <div className="ps-block__header">
        <h3 className="figCap">{t("all-destinations")}</h3>
          <button
            type="button"
            className="btn btn-danger textBoxBtn btn-lg"
            onClick={() => {
              router.push("/freight/destinations/add-destination")
            }}
          >
            {t("add-destination")}
          </button>
      </div>
      <div className="ps-block__content">
        <div className="table-responsive">
          {!freightDestinationsLoading &&
          freightDestinations.length <= 0 ? (
            <span>
              {t("no-destinations")}{" "}
              <Link
                href="/freight/destinations/add-destination"
              >
                <a>{t("add-destination")}</a>
              </Link>
            </span>
          ) : (
            <Fragment>
              <table className="table products-table-min ps-table ps-table--vendor">
                <thead>
                  <tr>
                    <th>{t("freight-type")}</th>
                    <th>{t("destination-country")}</th>
                    <th>{t("destination-city")}</th>
                    <th>{t("destination-state")}</th>
                    <th>{t("destination-city-state")}</th>
                    <th>{t("edit-delete")}</th>
                  </tr>
                </thead>
                <tbody>
                  {freightDestinationsLoading ? (
                      <span className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="sr-only">{t("loading")}</span>
                        </div>
                      </span>
                  ) : (
                    <Fragment>
                      {freightDestinations.map(
                        ({
                          _id,
                          country,
                          freightType,
                          city,
                          stateObject,
                        }) => (
                          <tr key={_id}>
                            <td>
                              {freightType[locale]}
                            </td>
                            <td>
                              {country[locale]}
                            </td>
                            <td>{city ? city[locale] : t("null")}</td>
                            {
                              stateObject ? (
                                <Fragment>
                                  <td>
                                    {stateObject.state[locale]}
                                  </td>
                                  <td>
                                    {stateObject.city[locale]}
                                  </td>
                                </Fragment>
                              ) : (
                                <Fragment>
                                  <td>
                                    {t("null")}
                                  </td>
                                  <td>
                                    {t("null")}
                                  </td>
                                </Fragment>
                              )
                            }
                            <td>
                              {deleteLoading ? (
                                <Fragment>
                                  <span className="d-flex justify-content-center">
                                    <div
                                      className="spinner-border"
                                      role="status"
                                    >
                                      <span className="sr-only">
                                        {t("loading")}
                                      </span>
                                    </div>
                                  </span>
                                </Fragment>
                              ) : (
                                <Fragment>
                                  <Link
                                    href={`/freight/destinations/edit-destination?destination_id=${_id}`}
                                  >
                                    <a className="px-3">
                                      <i
                                        title={t("edit")}
                                        className="lnr lnr-pencil"
                                      ></i>
                                    </a>
                                  </Link>
                                  /
                                  <a
                                    onClick={() => {
                                      deleteDestination(_id, t("destination-deleted"));
                                    }}
                                    className="px-3 pointer-cursor"
                                  >
                                    <i
                                      style={{ color: "red" }}
                                      title={t("delete")}
                                      className="lnr lnr-trash"
                                    ></i>
                                  </a>
                                </Fragment>
                              )}
                            </td>
                          </tr>
                        )
                      )}
                    </Fragment>
                  )}
                </tbody>
              </table>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  destination: state.destination,
  formLoading: state.formLoading,
  language: state.language,
});

export default compose(
  connect(mapStateToProps, {
    getDestinationsByFreight,
    deleteDestination,
  }),
  withTranslation("dashboard")
)(AllDestinations);
