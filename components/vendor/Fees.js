const one = "/coverimages/vendor-4.png";

const Fees = () => {
  return (
    <div className="ps-section--vendor ps-vendor-best-fees">
      <div className="container">
        <div className="ps-section__header">
          <p>BEST FEES TO START</p>
          <h4>Affordable, transparent, and secure</h4>
        </div>
        <div className="ps-section__content">
          <h5>
            The buyer is responsible for the commission fee which depends on the
            item sold. We only deduct a{" "}
            <a
              className="link"
              href="https://developer.paypal.com/docs/payouts/reference/fees/"
              target="_blank"
            >
              PayPal payout fee
            </a>{" "}
            when you withdrawal funds.
          </h5>
          {/* <div className="ps-section__numbers">
            <figure>
              <h3>$0</h3>
              <span>List Fee</span>
            </figure>
            <figure>
              <h3>5%</h3>
              <span>Final Value Fee</span>
            </figure>
          </div>
          <div className="ps-section__desc">
            <figure>
              <figcaption>Here's what you get for your fee:</figcaption>
              <ul>
                <li>
                  A worldwide community of more than 160 million shoppers.
                </li>
                <li>
                  Shipping labels you can print at home, with big discounts on
                  postage.
                </li>
                <li>
                  Seller protection and customer support to help you sell your
                  stuff.
                </li>
              </ul>
            </figure>
          </div> */}
          <div className="ps-section__highlight">
            <img src={one} alt="" />
            <figure>
              <p>
                We process payments with PayPal, an external payments platform
                that allows you to process transactions with a variety of
                payment methods. Funds from PayPal sales on Endiks will be
                deposited into your PayPal account.
              </p>
            </figure>
          </div>
          <div className="ps-section__footer">
            <p>
              We only deduct{" "}
              <a
                className="link"
                href="https://developer.paypal.com/docs/payouts/reference/fees/"
                target="_blank"
              >
                PayPal payout fees
              </a>{" "}
              at transaction time. Fees vary by sending country, are calculated
              as a percentage of each transaction, and are capped.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fees;
