import { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
  editDestination,
  getFreightTypes,
  getAllFreightDestinations,
} from "../../../../actions/destination";
import { useRouter } from "next/router";
import { compose } from "redux";
import { Button, Modal } from "react-bootstrap";
import { withTranslation } from "../../../../i18n";

const EditDestination = ({
  destination: {
    freightTypes,
    freightTypesLoading,
    freightDestinations,
    freightDestinationsLoading,
    allFreightDestinations,
    allFreightDestinationsLoading,
  },
  language: { loc },
  editDestination,
  getFreightTypes,
  getAllFreightDestinations,
  formLoading,
  t,
}) => {
  const router = useRouter()
  const { destination_id } = router.query
  const [locale, setLocale] = useState(loc === "english" ? "en" : "zh");
  const [singleDestination, setSingleDestination] = useState(
    freightDestinations.length > 0 &&
      !freightDestinationsLoading &&
      destination_id &&
      freightDestinations.filter(({ _id }) => _id === destination_id)[0]
  );
  useEffect(() => {
    getAllFreightDestinations();
    getFreightTypes();
    setLocale(loc === "english" ? "en" : "zh");
    setFormData({
      ...formData,
      originAddress: singleDestination ? singleDestination.originAddress : "",
      destinationAddress: singleDestination ? singleDestination.destinationAddress : "",
      price: singleDestination ? singleDestination.price : "",
      deliveryDays: singleDestination ? singleDestination.deliveryDays : "",
    });
    setFreightType(singleDestination ? singleDestination.freightType[locale] : "");
    setCountry(singleDestination ? singleDestination.country[locale] : "");
    setCity(singleDestination && singleDestination.city[locale] ? singleDestination.city[locale] : "");
    setState(singleDestination && !singleDestination.city[locale] ? singleDestination.stateObject.state[locale] : "");
    setStateCity(singleDestination && !singleDestination.city[locale] ? singleDestination.stateObject.city[locale] : "");
  }, [loc]);
  const onFocus = (e) => {
    e.target.placeholder = "";
  };
  const onBlur = (e, text) => {
    e.target.placeholder = text;
  };
  const [formData, setFormData] = useState({
    originAddress: "",
    price: "",
    deliveryDays: "",
    destinationAddress: "",
  });
  const {
    originAddress,
    destinationAddress,
    price,
    deliveryDays
  } = formData;
  const [showTable, setShowTable] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [freightType, setFreightType] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [stateCity, setStateCity] = useState("")
  const [title, setTitle] = useState("")
  const [format, setFormat] = useState("")
  const [note, setNote] = useState("")
  const [rows, setRows] = useState("")

  const [tables, setTables] = useState(singleDestination
    ? singleDestination.tables.map((sli) => ({
        tableTitle: sli.tableTitle.seller,
        weightFormat: sli.weightFormat,
        specialNote: sli.specialNote.seller,
        priceList: sli.priceList.map(singSli => {
          const sliObj = Object.keys(singSli)
          const objKey = sliObj[0]
          return (
            { weight: objKey, cost: singSli[objKey] }
          )
        })
      }))
    : []);

  const handleTableChange = (e, tabIndex) => {
    const _tempTables = [...tables];
    _tempTables[tabIndex].priceList[e.target.dataset.id][e.target.name] = e.target.value;
    setTables(_tempTables);
  };

  const addNewTable = (title, format, note, rows) => {
    const paRows = parseInt(rows)
    const priceListArr = [...Array(paRows).keys()].map(lis => ({ weight: "", cost: "" }))
    setTables((prevTables) => [
      ...prevTables,
      { tableTitle: title, weightFormat: format, specialNote: note, priceList: priceListArr },
    ]);
  };
  const destObj = country && allFreightDestinations.filter(dest => dest.country[locale] === country)[0]
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const charges = tables.map(pri => {
      const pricedStr = pri.priceList
      .map(singleList => `${singleList.weight.split(";").join(" ").split(",").join(" ").split("|").join(" ").split(":").join(" ").trim()}:${singleList.cost.split(";").join(" ").split(",").join(" ").split("|").join(" ").split(":").join(" ").trim()}`)
      .join("|")
      return (
        `${pri.tableTitle.split(";").join(" ").split(",").join(" ").split("|").join(" ").split(":").join(" ").trim()},${pri.weightFormat},${pri.specialNote.split(";").join(" ").split(",").join(" ").split("|").join(" ").split(":").join(" ").trim()},${pricedStr}`
      )
    }).join(";").trim()
    const cityIndex = destObj.city[locale].split("; ").indexOf(city)
    const stateIndex = state && Object.keys(destObj.state[locale]).indexOf(state)
    const stateCityIndex = state && destObj.state[locale][state].split("; ").indexOf(stateCity)
    let obj = {};
    obj.enCountry = destObj.country.en;
    obj.zhCountry = destObj.country.zh;
    obj.enFreightType = freightTypes.filter(fre => fre[locale] === freightType)[0].en;
    obj.zhFreightType = freightTypes.filter(fre => fre[locale] === freightType)[0].zh;
    obj.destinationAddress = destinationAddress;
    obj.originAddress = originAddress;
    obj.price = price;
    obj.charges = charges;
    obj.deliveryDays = deliveryDays;
    if (city) {
      obj.enCity = destObj.city.en.split("; ")[cityIndex];
      obj.zhCity = destObj.city.zh.split("; ")[cityIndex];
      editDestination(obj, destination_id, t("destination-updated"));
    } else {
      obj.enState = Object.keys(destObj.state.en)[stateIndex];
      obj.zhState = Object.keys(destObj.state.zh)[stateIndex];
      obj.enStateCity = destObj.state.en[state].split("; ")[stateCityIndex];
      obj.zhStateCity = destObj.state.zh[state].split("; ")[stateCityIndex];
      editDestination(obj, destination_id, t("destination-updated"));
    }
  };
  return (
    <div className="ps-contact-form">
      {
        !singleDestination ? (
          <span className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">{t("loading")}</span>
          </div>
        </span>
        ) : (
          <div className="container">
        <form
          autoComplete="off"
          onSubmit={(e) => {
            onSubmit(e);
          }}
          className="ps-form--contact-us"
        >
          <h3 className="final">{t("edit-destination")}</h3>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="form-group">
                <label htmlFor="originAddress">{t("origin-address")} *</label>
                <textarea
                  onFocus={(e) => onFocus(e)}
                  onBlur={(e) => {
                    onBlur(e, t("origin-address"));
                  }}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="form-control"
                  rows="5"
                  type="text"
                  name="originAddress"
                  disabled={formLoading}
                  value={originAddress}
                  required
                  placeholder={t("origin-address")}
                ></textarea>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="form-group">
                <label htmlFor="destinationAddress">{t("destination-address")} *</label>
                <textarea
                  onFocus={(e) => onFocus(e)}
                  onBlur={(e) => {
                    onBlur(e, t("destination-address"));
                  }}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="form-control"
                  rows="5"
                  type="text"
                  name="destinationAddress"
                  disabled={formLoading}
                  value={destinationAddress}
                  required
                  placeholder={t("destination-address")}
                ></textarea>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <label htmlFor="freightType">{t("freight-type")} *</label>
                <select
                  className="form-control"
                  required
                  name="freightType"
                  onChange={(e) => {
                    setCountry("")
                    setCity("")
                    setState("")
                    setStateCity("")
                    setFreightType(e.target.value)
                  }}
                  disabled={formLoading || freightTypesLoading ? true : false}
                  value={freightType}
                >
                  <option value="" disabled selected>
                    {freightTypesLoading ? t("loading") : t("select-freight-type")}
                  </option>
                  {freightTypes.length > 0 &&
                    freightTypes.map((fType) => (
                      <option key={fType._id} value={fType[locale]}>
                        {fType[locale]}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <label htmlFor="country">{t("destination-country")} *</label>
                <select
                  className="form-control"
                  required
                  name="country"
                  onChange={(e) => {
                    setCity("");
                    setState("");
                    setStateCity("");
                    setCountry(e.target.value);
                  }}
                  disabled={formLoading || allFreightDestinationsLoading
                      ? true
                      : false
                  }
                  value={country}
                >
                  <option value="" disabled selected>
                    {allFreightDestinationsLoading
                      ? t("loading")
                      : t("destination-country")}
                  </option>
                  {
                    allFreightDestinations.map(dest => (
                      <option key={dest._id} value={dest.country[locale]}>
                        {dest.country[locale]}
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>
            {
              destObj && (
                <Fragment>
                  {
                    destObj.city[locale] ? (
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="form-group">
                          <label htmlFor="city">{t("destination-city")} *</label>
                          <select
                            className="form-control"
                            required
                            name="city"
                            onChange={(e) => {
                              setCity(e.target.value);
                            }}
                            disabled={formLoading || allFreightDestinationsLoading
                                ? true
                                : false
                            }
                            value={city}
                          >
                            <option value="" disabled selected>
                              {allFreightDestinationsLoading
                                ? t("loading")
                                : t("select-destination-city")}
                            </option>
                            {
                              destObj.city[locale].split("; ").map((dest, index) => (
                                <option key={index} value={dest}>
                                  {dest}
                                </option>
                              ))
                            }
                          </select>
                        </div>
                      </div>
                    ) : (
                      <Fragment>
                        <div className={city ? "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12" : "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}>
                          <div className="form-group">
                            <label htmlFor="state">{t("destination-state")} *</label>
                            <select
                              className="form-control"
                              required
                              name="state"
                              onChange={(e) => {
                                setStateCity("");
                                setState(e.target.value);
                              }}
                              disabled={formLoading || allFreightDestinationsLoading
                                  ? true
                                  : false
                              }
                              value={state}
                            >
                              <option value="" disabled selected>
                                {allFreightDestinationsLoading
                                  ? t("loading")
                                  : t("destination-state")}
                              </option>
                              {
                                Object.keys(destObj.state[locale]).map((dest, index) => (
                                  <option key={index} value={dest}>
                                    {dest}
                                  </option>
                                ))
                              }
                            </select>
                          </div>
                        </div>
                      {
                        state && (
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="form-group">
                              <label htmlFor="stateCity">{t("destination-city-state")} *</label>
                              <select
                                className="form-control"
                                required
                                name="stateCity"
                                onChange={(e) => {
                                  setStateCity(e.target.value);
                                }}
                                disabled={formLoading || allFreightDestinationsLoading
                                    ? true
                                    : false
                                }
                                value={stateCity}
                              >
                                <option value="" disabled selected>
                                  {allFreightDestinationsLoading
                                    ? t("loading")
                                    : t("select-destination-city-state")}
                                </option>
                                {
                                  destObj.state[locale][state].split("; ").map((dest, index) => (
                                    <option key={index} value={dest}>
                                      {dest}
                                    </option>
                                  ))
                                }
                              </select>
                            </div>
                          </div>
                        )
                      }
                      </Fragment>
                    )
                  }
                </Fragment>
              )
            }
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <label htmlFor="price">{t("average-shipping")} *</label>
                <input
                  value={price}
                  className="form-control"
                  type="number"
                  name="price"
                  step="0.1"
                  min="0"
                  onFocus={(e) => onFocus(e)}
                  onBlur={(e) => {
                    onBlur(e, t("average-shipping"));
                  }}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  disabled={formLoading}
                  required
                  placeholder={t("average-shipping")}
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
              <div className="form-group">
                <label htmlFor="deliveryDays">{t("delivery-days")} *</label>
                <input
                  value={deliveryDays}
                  name="deliveryDays"
                  onFocus={(e) => onFocus(e)}
                  onBlur={(e) => {
                    onBlur(e, t("delivery-days"));
                  }}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="form-control"
                  type="number"
                  disabled={formLoading}
                  required
                  step="1"
                  min="1"
                  placeholder={t("delivery-days")}
                />
              </div>
            </div>
          </div>
          <div className="pb-5">
          <div className="ps-block__header pb-5">
            <h4 className="figCap">
              {t("freight-list")}
            </h4>
            <Fragment>
              <button
                type="button"
                onClick={handleShow}
                disabled={formLoading}
                className="ps-btn textBoxBtn"
              >
                {t("create-table")}
              </button>
              <Modal
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={show}
                  onHide={handleClose}
                >
                <Modal.Header closeButton>
                  <Modal.Title>{t("table-params")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="form-group">
                  <label htmlFor="title">{t("table-title")}</label>
                  <input
                    value={title}
                    className="form-control"
                    type="text"
                    name="title"
                    autoComplete="off"
                    disabled={formLoading}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rows">{t("table-rows")}</label>
                  <input
                    value={rows}
                    className="form-control"
                    type="number"
                    autoComplete="off"
                    step="1"
                    min="1"
                    name="rows"
                    disabled={formLoading}
                    onChange={(e) => {
                      setRows(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="format">{t("weight-form")}</label>
                  <select
                    className="form-control"
                    name="format"
                    onChange={(e) => {
                      setFormat(e.target.value);
                    }}
                    disabled={formLoading}
                    value={format}
                  >
                    <option value="" disabled selected>
                      {t("weight-form-select")}
                    </option>
                    <option value="range">
                      {t("range-form")}
                    </option>
                    <option value="absolute">
                      {t("absolute-form")}
                    </option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="note">{t("special-note")}</label>
                  <textarea
                    value={note}
                    className="form-control"
                    type="text"
                    name="note"
                    autoComplete="off"
                    disabled={formLoading}
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                  ></textarea>
                </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="danger"
                    type="button"
                    disabled={formLoading}
                    onClick={handleClose}
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    type="button"
                    disabled={(title && rows && format && note && !formLoading) ? false : true}
                    variant="success"
                    onClick={() => {
                      addNewTable(title, format, note, rows)
                      setTitle("")
                      setRows("")
                      setFormat("")
                      setNote("")
                      setShowTable(true)
                      handleClose();
                    }}
                  >
                    {t("create-table")}
                  </Button>
                </Modal.Footer>
              </Modal>
            </Fragment>
          </div>
          {
            showTable && (
              <div className="ps-block__content">
                {
                  tables.map((tab, index) => (
                    <div key={index} className="table table-responsive-sm">
                      <h4 className="text-center">{tab.tableTitle}</h4>
                      <table className="table table-bordered">
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col">{t("weight")}</th>
                            <th scope="col">{tab.weightFormat === "range" ? t("price-kg") : t("price")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tab.priceList.map((item, itIndex) => (
                            <tr key={itIndex}>
                              <td>
                                <input
                                  className="multiple-input form-control"
                                  type="text"
                                  data-id={itIndex}
                                  name="weight"
                                  disabled={formLoading}
                                  required
                                  value={item.weight}
                                  onChange={(e) => {
                                    handleTableChange(e, index)
                                  }}
                                />
                              </td>
                              <td>
                                <input
                                  className="multiple-input form-control"
                                  type="number"
                                  data-id={itIndex}
                                  name="cost"
                                  step="0.1"
                                  min="0"
                                  disabled={formLoading}
                                  required
                                  value={item.cost}
                                  onChange={(e) => {
                                    handleTableChange(e, index)
                                  }}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <small className="form-text text-muted">
                        {tab.specialNote}
                      </small>
                    </div>
                  ))
                }
              </div>
            )
          }
          </div>
          <div className="form-group submit">
            <button disabled={formLoading} type="submit" className="ps-btn">
              {!formLoading ? (
                <Fragment>{t("edit-destination")}</Fragment>
              ) : (
                <Fragment>
                  <span
                    className="spinner-border"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  {t("loading")}
                </Fragment>
              )}
            </button>
          </div>
        </form>
      </div>
        )
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  destination: state.destination,
  formLoading: state.formLoading.formLoading,
  language: state.language,
});

export default compose(
  connect(mapStateToProps, {
    editDestination,
    getFreightTypes,
    getAllFreightDestinations,
  }),
  withTranslation("products")
)(EditDestination);
