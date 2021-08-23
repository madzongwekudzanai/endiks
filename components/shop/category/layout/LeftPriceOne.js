const LeftPriceOne = () => {
  return (
    <figure>
      <h4 className="widget-title">By Price</h4>
      <div
        className="ps-slider ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
        data-default-min="13"
        data-default-max="1300"
        data-max="1311"
        data-step="100"
        data-unit="$"
      >
        <div
          className="ui-slider-range ui-corner-all ui-widget-header"
          style={{ left: "0%", width: "100%" }}
        ></div>
        <span
          tabIndex="0"
          className="ui-slider-handle ui-corner-all ui-state-default"
          style={{ left: "0%" }}
        ></span>
        <span
          tabIndex="0"
          className="ui-slider-handle ui-corner-all ui-state-default"
          style={{ left: "100%" }}
        ></span>
      </div>
      <p className="ps-slider__meta">
        Price:<span className="ps-slider__value ps-slider__min">$13</span>-
        <span className="ps-slider__value ps-slider__max">$1300</span>
      </p>
    </figure>
  );
};

export default LeftPriceOne;
