import { Fragment } from "react";

const LeftBrands = () => {
  return (
    <Fragment>
      <h4 className="widget-title">BY BRANDS</h4>
      <form className="ps-form--widget-search" action="do_action" method="get">
        <input className="form-control" type="text" placeholder="" />
        <button>
          <i className="icon-magnifier"></i>
        </button>
      </form>
      <div
        className="slimScrollDiv"
        style={{
          position: "relative",
          overflowY: "scroll",
          width: "auto",
          height: "250px",
        }}
      >
        <figure
          className="ps-custom-scrollbar"
          data-height="250"
          // style={{ overflow: "hidden", width: "auto", height: "250px" }}
        >
          <div className="ps-checkbox">
            <input
              className="form-control"
              type="checkbox"
              id="brand-1"
              name="brand"
            />
            <label htmlFor="brand-1">Adidas (3)</label>
          </div>
          <div className="ps-checkbox">
            <input
              className="form-control"
              type="checkbox"
              id="brand-2"
              name="brand"
            />
            <label htmlFor="brand-2">Amcrest (1)</label>
          </div>
          <div className="ps-checkbox">
            <input
              className="form-control"
              type="checkbox"
              id="brand-3"
              name="brand"
            />
            <label htmlFor="brand-3">Apple (2)</label>
          </div>
          <div className="ps-checkbox">
            <input
              className="form-control"
              type="checkbox"
              id="brand-4"
              name="brand"
            />
            <label htmlFor="brand-4">Asus (19)</label>
          </div>
          <div className="ps-checkbox">
            <input
              className="form-control"
              type="checkbox"
              id="brand-5"
              name="brand"
            />
            <label htmlFor="brand-5">Baxtex (20)</label>
          </div>
          <div className="ps-checkbox">
            <input
              className="form-control"
              type="checkbox"
              id="brand-6"
              name="brand"
            />
            <label htmlFor="brand-6">Adidas (11)</label>
          </div>
          <div className="ps-checkbox">
            <input
              className="form-control"
              type="checkbox"
              id="brand-7"
              name="brand"
            />
            <label htmlFor="brand-7">Casio (9)</label>
          </div>
          <div className="ps-checkbox">
            <input
              className="form-control"
              type="checkbox"
              id="brand-8"
              name="brand"
            />
            <label htmlFor="brand-8">Electrolux (0)</label>
          </div>
          <div className="ps-checkbox">
            <input
              className="form-control"
              type="checkbox"
              id="brand-9"
              name="brand"
            />
            <label htmlFor="brand-9">Gallaxy (0)</label>
          </div>
          <div className="ps-checkbox">
            <input
              className="form-control"
              type="checkbox"
              id="brand-10"
              name="brand"
            />
            <label htmlFor="brand-10">Samsung (0)</label>
          </div>
          <div className="ps-checkbox">
            <input
              className="form-control"
              type="checkbox"
              id="brand-11"
              name="brand"
            />
            <label htmlFor="brand-11">Sony (0)</label>
          </div>
        </figure>
        {/* <div
          className="slimScrollBar"
          style={{
            background: "rgb(0, 0, 0)",
            width: "6px",
            position: "absolute",
            top: "0px",
            opacity: "0.4",
            display: "block",
            borderRadius: "7px",
            zIndex: "99",
            right: "1px",
            height: "166.667px",
          }}
        ></div>
        <div
          className="slimScrollRail"
          style={{
            width: "6px",
            height: "100%",
            position: "absolute",
            top: "0px",
            display: "block",
            borderRadius: "7px",
            background: "rgb(51, 51, 51)",
            opacity: "0.2",
            zIndex: "90",
            right: "1px",
          }}
        ></div> */}
      </div>
    </Fragment>
  );
};

export default LeftBrands;
