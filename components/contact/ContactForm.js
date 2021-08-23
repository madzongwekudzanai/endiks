import { useState, Fragment } from "react";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import { withTranslation } from "../../i18n";
import { compose } from "redux";
import { connect } from "react-redux";

const ContactForm = ({ setAlert, t }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { name, email, subject, message } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const user = await axios.post(
        "/api/contact",
        {
          name,
          email,
          subject,
          message,
        },
        config
      );
      setLoading(false);
      setAlert(user.data, "success", 10000);
      setFormData({
        ...formData,
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setLoading(false);
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => setAlert(error.msg, "danger"));
      }
      setAlert(err.response.data, "danger");
    }
  };

  return (
    <div className="ps-contact-form">
      <div className="container">
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
          className="ps-form--contact-us"
        >
          <h3>{t("get-in-touch")}</h3>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
              <div className="form-group">
                <input
                  onChange={(e) => {
                    onChange(e);
                  }}
                  disabled={loading}
                  value={name}
                  name="name"
                  className="form-control"
                  type="text"
                  required
                  placeholder={t("full-name")}
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
              <div className="form-group">
                <input
                  className="form-control"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  value={email}
                  disabled={loading}
                  name="email"
                  type="email"
                  required
                  placeholder={t("email")}
                />
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
              <div className="form-group">
                <input
                  className="form-control"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  value={subject}
                  disabled={loading}
                  name="subject"
                  type="text"
                  required
                  placeholder={t("subject")}
                />
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
              <div className="form-group">
                <textarea
                  className="form-control"
                  rows="5"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  value={message}
                  disabled={loading}
                  name="message"
                  required
                  placeholder={t("message")}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="form-group submit">
            <button disabled={loading} type="submit" className="ps-btn">
              {loading ? (
                <Fragment>
                  <span
                    className="spinner-border"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  {t("loading")}
                </Fragment>
              ) : (
                <Fragment>{t("send-message")}</Fragment>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default compose(
  connect(null, { setAlert }),
  withTranslation("contact")
)(ContactForm);