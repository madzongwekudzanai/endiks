import Breadcrumb from "../layout/Breadcrumb";
import { connect } from "react-redux";
import { getCartItems } from "../../actions/cart";
import { createOrder } from "../../actions/orders";
import { getAllUserDestinations, getFreightTypes, getCheckoutShippingCompanies } from "../../actions/destination";
import { setAlert } from "../../actions/alert";
import { getCurrentRate } from "../../actions/payment";
import { Fragment, useEffect, useState } from "react";
import SingleItem from "./SingleItem";
import { Button, Modal } from "react-bootstrap";
import { compose } from "redux";
import { withTranslation } from "../../i18n";
import SingleItemTotal from "./SingleItemTotal";
import PriceFormat from "../layout/landing/PriceFormat";

const Checkout = ({
  t,
  auth: { cartItems, user },
  destination: { allUserDestinations, allUserDestinationsLoading, freightTypes, freightTypesLoading, checkoutFreightCompanies, checkoutFreightCompaniesLoading },
  language: { loc },
  shopLoading,
  formLoading,
  payment: { rate },
  getCartItems,
  createOrder,
  getCurrentRate,
  getAllUserDestinations,
  getFreightTypes,
  getCheckoutShippingCompanies
}) => {
  const [locale, setLocale] = useState(loc === "english" ? "en" : "zh");
  const arr =
    user &&
    cartItems.map(
      ({ _id, price }) =>
        price *
        user.cart.items[
          user.cart.items.map((item) => item.productId).indexOf(_id)
        ].quantity
    );
  const subTotal = user && arr.reduce((a, b) => a + b, 0);
  const weightArray =
    user &&
    cartItems.map(
      ({ _id, weight }) =>
        weight *
        user.cart.items[
          user.cart.items.map((item) => item.productId).indexOf(_id)
        ].quantity
    );
  const netWeight = user && weightArray.reduce((a, b) => a + b, 0);
  let sellers = new Set();
  cartItems.forEach(({ seller }) => sellers.add(seller));
  const sellersArr = Array.from(sellers);
  const shippingArr = sellersArr.map(
    (sell) => cartItems.filter(({ seller }) => seller === sell)[0].shipping
  );
  const shippingTotal = shippingArr.reduce((a, b) => a + b, 0);
  const commissionTwo = process.env.NEXT_PUBLIC_COMMISSION_TWO;
  useEffect(() => {
    getCartItems();
    getAllUserDestinations();
    getFreightTypes(),
    getCurrentRate();
    setFormData({
      ...formData,
      freightType: "",
      country: "",
      city: "",
      state: "",
      stateCity: "",
      depositToken: "",
    });
    setLocale(loc === "english" ? "en" : "zh");
  }, [subTotal, loc]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    state: "",
    stateCity: "",
    freightCompany: "",
    depositToken: "",
  });
  const [freightType, setFreightType] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [stateCity, setStateCity] = useState("")
  const [freightCompany, setFreightCompany] = useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { name, email, phone, address, depositToken } = formData;
  const totalOrderPrice = (
    subTotal * commissionTwo * rate +
    shippingTotal * rate
  ).toFixed(2);

  const [destObj, setDestObj] = useState(null);
  const [companyObj, setCompanyObj] = useState(null);
  const [shippingObj, setShippingObj] = useState(null);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="ps-page--simple">
      <Breadcrumb
        page={t("checkout")}
        pages={[
          {
            text: t("home"),
            location: "/",
          },
        ]}
      />
      <div className="ps-checkout ps-section--shopping">
        <div className="container">
          <div className="ps-section__header">
            <h1>{t("checkout")}</h1>
          </div>
          <div className="ps-section__content">
            <form
              autoComplete="off"
              onSubmit={async (e) => {
                e.preventDefault();
                let obj = {};
                obj.enFreightType = freightTypes.filter(fre => fre[locale] === freightType)[0].en;
                obj.zhFreightType = freightTypes.filter(fre => fre[locale] === freightType)[0].zh;
                obj.destinationId = companyObj._id;
                obj.freightId = companyObj.freight;
                obj.name = name;
                obj.email = email;
                obj.phone = phone;
                obj.address = address;
                obj.depositToken = depositToken;
                createOrder(obj);
              }}
              className="ps-form--checkout"
            >
              <div className="row">
                <div className="col-xl-7 col-lg-8 col-md-12 col-sm-12">
                  <div className="ps-form__billing-info">
                    <h3 className="ps-form__heading">{t("recipient-details")}</h3>
                    <div className="form-group">
                      <label>
                        {t("full-name")}<sup>*</sup>
                      </label>
                      <div className="form-group__content">
                        <input
                          onChange={(e) => {
                            onChange(e);
                          }}
                          disabled={
                            shopLoading ||
                            formLoading
                              ? true
                              : false
                          }
                          className="form-control"
                          name="name"
                          required
                          value={name}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>
                        Deposit Token<sup>*</sup>
                      </label>
                      <div className="form-group__content">
                        <input
                          onChange={(e) => {
                            onChange(e);
                          }}
                          disabled={
                            shopLoading ||
                            formLoading
                              ? true
                              : false
                          }
                          className="form-control"
                          name="depositToken"
                          required
                          value={depositToken}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>
                        {t("phone-number")}<sup>*</sup>
                      </label>
                      <div className="form-group__content">
                        <input
                          onChange={(e) => {
                            onChange(e);
                          }}
                          required
                          disabled={
                            shopLoading ||
                            formLoading
                              ? true
                              : false
                          }
                          className="form-control"
                          name="phone"
                          value={phone}
                          type="tel"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>
                        {t("email-address")}<sup>*</sup>
                      </label>
                      <div className="form-group__content">
                        <input
                          onChange={(e) => {
                            onChange(e);
                          }}
                          className="form-control"
                          name="email"
                          required
                          disabled={
                            shopLoading ||
                            formLoading
                              ? true
                              : false
                          }
                          value={email}
                          type="email"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>
                        {t("freight-method")}<sup>*</sup>
                      </label>
                      <div className="form-group__content">
                        <select
                          onChange={(e) => {
                            setCountry("")
                            setCity("")
                            setState("")
                            setStateCity("")
                            setFreightCompany("")
                            setFreightType(e.target.value)
                          }}
                          required
                          disabled={
                            freightTypesLoading ||
                            shopLoading ||
                            formLoading
                              ? true
                              : false
                          }
                          name="freightType"
                          className="form-control"
                          value={freightType}
                        >
                          <option value="" disabled selected>
                            {freightTypesLoading ? t("loading") : t("choose-freight-method")}
                          </option>
                          {freightTypes.length > 0 &&
                            freightTypes.map((freight) => (
                              <option key={freight._id} value={freight[locale]}>
                                {freight[locale]}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>
                        {t("country")}<sup>*</sup>
                      </label>
                      <div className="form-group__content">
                        <select
                          onChange={(e) => {
                            setCity("")
                            setState("")
                            setStateCity("")
                            setFreightCompany("")
                            setCountry(e.target.value)
                            setDestObj(allUserDestinations.filter(dest => dest.country[locale] === e.target.value)[0])
                          }}
                          required
                          disabled={
                            allUserDestinationsLoading ||
                            shopLoading ||
                            formLoading
                              ? true
                              : false
                          }
                          className="form-control"
                          value={country}
                          name="country"
                        >
                          <option value="" disabled selected>
                            {allUserDestinationsLoading ? t("loading") : t("choose-country")}
                          </option>
                          {allUserDestinations.length > 0 &&
                            allUserDestinations.map((dest) => (
                              <option key={dest._id} value={dest.country[locale]}>
                                {dest.country[locale]}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    {
                      (destObj && freightType && country) && (
                        <Fragment>
                          {
                            destObj.hasState ? (
                              <Fragment>
                                <div className="form-group">
                                  <label>
                                    {t("state")}<sup>*</sup>
                                  </label>
                                  <div className="form-group__content">
                                    <select
                                      onChange={(e) => {
                                        setCity("")
                                        setStateCity("")
                                        setFreightCompany("")
                                        setState(e.target.value)
                                      }}
                                      disabled={
                                        allUserDestinationsLoading || shopLoading || formLoading
                                          ? true
                                          : false
                                      }
                                      required
                                      className="form-control"
                                      name="state"
                                      value={state}
                                    >
                                      <option value="" disabled selected>
                                        {allUserDestinationsLoading ? t("loading") : t("select-state")}
                                      </option>
                                      {country &&
                                        Object.keys(destObj.state[locale]).map((dest, index) => (
                                            <option key={index} value={dest}>
                                              {dest}
                                            </option>
                                          ))}
                                    </select>
                                  </div>
                                </div>
                                {
                                  state && (
                                    <div className="form-group">
                                      <label>
                                        {t("state-city")}<sup>*</sup>
                                      </label>
                                      <div className="form-group__content">
                                        <select
                                          onChange={(e) => {
                                            setFreightCompany("")
                                            setStateCity(e.target.value)
                                            let obj = {};
                                            const stateIndex = Object.keys(destObj.state[locale]).indexOf(e.target.value)
                                            const stateCityIndex = destObj.state[locale][e.target.value].split("; ").indexOf(stateCity)
                                            obj.enCountry = destObj.country.en;
                                            obj.enFreightType = freightTypes.filter(fre => fre[locale] === freightType)[0].en;
                                            obj.enState = Object.keys(destObj.state.en)[stateIndex];
                                            obj.enStateCity = destObj.state.en[state].split("; ")[stateCityIndex];
                                            getCheckoutShippingCompanies(obj)
                                          }}
                                          disabled={
                                            allUserDestinationsLoading || shopLoading || formLoading
                                              ? true
                                              : false
                                          }
                                          required
                                          className="form-control"
                                          name="stateCity"
                                          value={stateCity}
                                        >
                                          <option value="" disabled selected>
                                            {allUserDestinationsLoading ? t("loading") : t("select-state-city")}
                                          </option>
                                          {state &&
                                            destObj.state[locale][state].split("; ").map((dest, index) => (
                                                <option key={index} value={dest}>
                                                  {dest}
                                                </option>
                                              ))}
                                        </select>
                                      </div>
                                    </div>
                                  )
                                }
                              </Fragment>
                            ) : (
                              <div className="form-group">
                                <label>
                                  {t("city")}<sup>*</sup>
                                </label>
                                <div className="form-group__content">
                                  <select
                                    onChange={(e) => {
                                      setFreightCompany("")
                                      setCity(e.target.value)
                                      let obj = {};
                                      const cityIndex = destObj.city[locale].split("; ").indexOf(e.target.value)
                                      obj.enCountry = destObj.country.en;
                                      obj.enFreightType = freightTypes.filter(fre => fre[locale] === freightType)[0].en;
                                      obj.enCity = destObj.city.en.split("; ")[cityIndex];
                                      getCheckoutShippingCompanies(obj)
                                    }}
                                    disabled={
                                      allUserDestinationsLoading || shopLoading || formLoading
                                        ? true
                                        : false
                                    }
                                    required
                                    autoComplete="false"
                                    className="form-control"
                                    name="city"
                                    value={city}
                                  >
                                    <option value="" disabled selected>
                                      {allUserDestinationsLoading ? t("loading") : t("select-city")}
                                    </option>
                                    {country &&
                                        destObj.city[locale].split("; ")
                                        .map((dest, index) => (
                                          <option key={index} value={dest}>
                                            {dest}
                                          </option>
                                        ))}
                                  </select>
                                </div>
                              </div>
                            )
                          }
                        </Fragment>
                      )
                    }
                    {
                      (country && freightType && checkoutFreightCompanies.length) > 0 && (
                        <div className="form-group">
                          <label>
                            {t("freight-company")}<sup>*</sup>
                          </label>
                          <select
                            onChange={(e) => {
                              setFreightCompany(e.target.value)
                              setShippingObj(checkoutFreightCompanies.filter(comp => comp._id === e.target.value)[0])
                              setCompanyObj(checkoutFreightCompanies.filter(company => company._id === e.target.value)[0])
                            }}
                            required
                            disabled={
                              checkoutFreightCompaniesLoading ||
                              shopLoading ||
                              formLoading
                                ? true
                                : false
                            }
                            className="form-control"
                            value={freightCompany}
                            name="freightCompany"
                          >
                            <option value="" disabled selected>
                              {checkoutFreightCompaniesLoading ? t("loading") : t("select-freight-company")}
                            </option>
                            {checkoutFreightCompanies.length > 0 &&
                              checkoutFreightCompanies.map((company) => (
                                <option key={company._id} value={company._id}>
                                  {company.freightName} 
                                  {new Intl.NumberFormat(
                                  "en-US",
                                  {
                                      style: "currency",
                                      currency: "USD",
                                  }
                                  ).format(company.price * rate)}{t("per-kg")} {company.deliveryDays}-{company.deliveryDays + 7}{t("days")}
                                </option>
                              ))}
                          </select>
                        </div>
                      )
                    }
                    {
                      freightCompany && shippingObj && (
                        <div style={{ textAlign: "center" }} className="form-group">
                          <a 
                          style={{ color: "blue" }}
                          onClick={handleShow} 
                          className="pointer-cursor">
                            {t("view-pricing")}
                          </a>
                          <Modal
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            show={show}
                            onHide={handleClose}
                          >
                          <Modal.Header closeButton>
                            <Modal.Title>{shippingObj.freightName}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                          {
                            shippingObj.tables.map((tab, ind) => (
                              <div key={ind} className="table table-responsive-sm">
                                <h4 onClick={() => {
                              console.log(shippingObj)
                            }} className="text-center">{tab.tableTitle.en}</h4>
                                <table className="table table-bordered table-sm">
                                  <thead className="thead-dark">
                                    <tr>
                                      <th scope="col">{t("weight-kg")}</th>
                                      <th scope="col">{tab.weightFormat === "range" ? t("price-kg") : t("price")}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {tab.priceList.map((item, itIndex) => {
                                      const key = Object.keys(item)[0];
                                      return (
                                        <tr key={itIndex}>
                                        <td>
                                          {key}
                                        </td>
                                        <td>
                                        <PriceFormat 
                                        locale="en-US"
                                        currencyCode="USD"
                                        price={item[key] * rate} />
                                        </td>
                                      </tr>
                                      )
                                    })}
                                  </tbody>
                                </table>
                                <small className="form-text text-muted">
                                  {tab.specialNote.en}
                                </small>
                              </div>
                            ))
                          }
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              type="button"
                              variant="success"
                              onClick={() => {
                                handleClose();
                              }}
                            >
                              {t("close")}
                            </Button>
                          </Modal.Footer>
                        </Modal>
                        </div>
                      )
                    }
                    <div className="form-group">
                      <label>
                        {t("address")}<sup>*</sup>
                      </label>
                      <div className="form-group__content">
                        <input
                          onChange={(e) => {
                            onChange(e);
                          }}
                          required
                          disabled={
                            shopLoading ||
                            formLoading
                              ? true
                              : false
                          }
                          className="form-control"
                          name="address"
                          value={address}
                          type="text"
                        />
                      </div>
                    </div>
                    {/* <div className="form-group">
                      <div className="ps-checkbox">
                        <input
                          className="form-control"
                          type="checkbox"
                          id="create-account"
                        />
                        <label htmlFor="create-account">
                          Create an account?
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="ps-checkbox">
                        <input
                          className="form-control"
                          type="checkbox"
                          id="cb01"
                        />
                        <label htmlFor="cb01">
                          Ship to a different address?
                        </label>
                      </div>
                    </div>
                    <h3 className="mt-40"> Addition information</h3>
                    <div className="form-group">
                      <label>Order Notes</label>
                      <div className="form-group__content">
                        <textarea
                          className="form-control"
                          rows="7"
                          placeholder="Notes about your order, e.g. special notes for delivery."
                        ></textarea>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="col-xl-5 col-lg-4 col-md-12 col-sm-12">
                  <div className="ps-form__total">
                    <h3 className="ps-form__heading">{t("your-order")}</h3>
                    <div className="content">
                      <div className="ps-block--checkout-total">
                        <div className="ps-block__header">
                          <p>{t("product")}</p>
                          <p>{t("total")}</p>
                        </div>
                        <div className="ps-block__content">
                          <table className="table ps-block__products">
                            <tbody>
                              {cartItems.map((item) => (
                                <SingleItem
                                  key={item._id}
                                  item={item}
                                  user={user}
                                />
                              ))}
                            </tbody>
                          </table>
                          <h5 className="ps-block__title">
                            {t("net-weight")}{" "}
                            {!netWeight ? (
                              <span
                                className="spinner-border"
                                role="status"
                              ></span>
                            ) : (
                              <span> {netWeight.toFixed(2)}{t("kg")}</span>
                            )}
                          </h5>
                          <h4 className="ps-block__title">
                            {t("sub-total")}{" "}
                            {!rate || !subTotal ? (
                              <span
                                className="spinner-border"
                                role="status"
                              ></span>
                            ) : (
                              <span>
                                {" "}
                                <PriceFormat 
                                locale="en-US"
                                currencyCode="USD"
                                price={subTotal * commissionTwo * rate} />
                              </span>
                            )}
                          </h4>
                          <div className="ps-block__shippings">
                            {sellersArr.map((sell) => (
                              <SingleItemTotal
                                key={sell}
                                sell={sell}
                                cartItems={cartItems}
                                user={user}
                              />
                            ))}
                          </div>
                          <h3>
                            {t("total")}{" "}
                            {!rate || !subTotal ? (
                              <span
                                className="spinner-border"
                                role="status"
                              ></span>
                            ) : (
                              <span> <PriceFormat 
                              locale="en-US"
                              currencyCode="USD"
                              price={totalOrderPrice} />
                              </span>
                            )}
                          </h3>
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={
                          shopLoading ||
                          formLoading
                            ? true
                            : false
                        }
                        className="ps-btn ps-btn--fullwidth white-hover"
                      >
                        {t("purchase")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  payment: state.payment,
  orders: state.orders,
  destination: state.destination,
  formLoading: state.formLoading.formLoading,
  shopLoading: state.shopLoading.orderLoading,
  language: state.language,
});

export default compose(
  connect(mapStateToProps, {
    getCartItems,
    setAlert,
    getCurrentRate,
    createOrder,
    getAllUserDestinations,
    getFreightTypes,
    getCheckoutShippingCompanies
  }),
  withTranslation("checkout")
)(Checkout);
