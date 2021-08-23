import "../css/owlCarousel.css";
import "../css/slick.css";
import "../css/fontAwesomeStars.css";
import "../css/style.css";
import "../css/marketPlace.css";
import "../css/electronic.css";
import SiteOverlay from "../components/layout/SiteOverlay";
import HeaderLarge from "../components/layout/header/HeaderLarge";
import Footer from "../components/layout/footer/Footer";
import App from "next/app";
import { loadForm, unloadForm, loadPage,
  unloadPage } from "../actions/common";
import { appWithTranslation } from "../i18n";

// Redux
import { Provider } from "react-redux";
import store from "../store";
import Alert from "../components/layout/Alert";

import Router from "next/router";
import nProgress from "nprogress";
import FilterSidebar from "../components/layout/header/FilterSidebar";
import Wrapper from "../components/routing/Wrapper";

Router.onRouteChangeStart = (url) => {
  nProgress.start();
  store.dispatch(loadForm());
  store.dispatch(loadPage());
};

Router.onRouteChangeComplete = () => {
  nProgress.done();
  store.dispatch(unloadForm());
  store.dispatch(unloadPage());
};
Router.onRouteChangeError = () => {
  nProgress.done();
  store.dispatch(unloadForm());
  store.dispatch(unloadPage());
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Wrapper>
        <HeaderLarge />
        <SiteOverlay />
        <Component {...pageProps} />
        <div
          style={{ position: "fixed" }}
          id="back2top"
          className="ps-btn--back-to-top"
        >
          <i className="lnr lnr-chevron-up"></i>
        </div>
        <FilterSidebar />
        <Footer />
        <Alert />
      </Wrapper>
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
