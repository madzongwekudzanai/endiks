const DatePicker = () => {
  return (
    <form className="ps-form--vendor-datetimepicker">
      <div className="row">
        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 ">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="time-from">
                From
              </span>
            </div>
            <input
              className="form-control ps-datepicker"
              aria-label="Username"
              aria-describedby="time-from"
            />
            <i className="lnr lnr-calendar-full dateCal"></i>
          </div>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 ">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="time-form">
                To
              </span>
            </div>
            <input
              className="form-control ps-datepicker"
              aria-label="Username"
              aria-describedby="time-to"
            />
            <i className="lnr lnr-calendar-full dateCal"></i>
          </div>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 ">
          <button className="ps-btn">
            <i className="lnr lnr-sync"></i> Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default DatePicker;
