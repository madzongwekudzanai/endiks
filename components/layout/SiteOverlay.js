import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const SiteOverlay = ({shopLoading: {pageLoading}}) => {
  const router = useRouter();
  const { navigation } = router.query;
  const [hash, setHash] = useState("");
  useEffect(() => {
    setHash(navigation);
  }, [navigation]);
  return (
    <div
      className={`ps-site-overlay ${
        (hash === "mobile" ||
          hash === "search" ||
          hash === "account" ||
          hash === "cart" || pageLoading) &&
        "active"
      }`}
    >
      {
        pageLoading && (
          <span style={{
            position: "fixed",
            top: "25vh",
            left: "25vw",
            width: "50vw",
            height: "50vh",
            overflowY: "auto",
            zIndex: "10001",
            
          }} className="col d-flex justify-content-center">
            <div style={{
              width: "12rem",
              height: "12rem",
            }} className="spinner-border" role="status">
              <span className="sr-only">loading...</span>
            </div>
          </span>
        )
      }
    </div>
  );
};

const mapStateToProps = state => ({
  shopLoading: state.shopLoading
})

export default connect(mapStateToProps, null)(SiteOverlay);
