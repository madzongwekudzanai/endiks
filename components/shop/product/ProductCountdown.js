import { useEffect, useState, Fragment } from "react";

const ProductCountdown = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2020-07-11") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(timeLeft[interval]);
  });

  return (
    <div className="ps-product__countdown">
      <figure>
        {timerComponents.length ? (
          <Fragment>
            <figcaption>
              {" "}
              Don't Miss Out! This promotion will expires in
            </figcaption>
            <ul className="ps-countdown">
              <li>
                <span className="days">{timerComponents[0]}</span>
                <p>Days</p>
              </li>
              <li>
                <span className="hours">{timerComponents[1]}</span>
                <p>Hours</p>
              </li>
              <li>
                <span className="minutes">{timerComponents[2]}</span>
                <p>Minutes</p>
              </li>
              <li>
                <span className="seconds">{timerComponents[3]}</span>
                <p>Seconds</p>
              </li>
            </ul>
          </Fragment>
        ) : (
          <figcaption> Time's up!</figcaption>
        )}
      </figure>
      <figure>
        <figcaption>Sold Items</figcaption>
        <div className="ps-product__progress-bar ps-progress" data-value="97">
          <div className="ps-progress__value">
            <span></span>
          </div>
          <p>
            <b>20/85</b> Sold
          </p>
        </div>
      </figure>
    </div>
  );
};

export default ProductCountdown;
