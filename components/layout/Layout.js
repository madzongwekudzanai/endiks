import Head from "next/head";
import { Fragment } from "react";
import HeaderMobile from "../layout/header/HeaderMobile";
import Sidebar from "../layout/header/Sidebar";

const Layout = ({ children, title, description }) => (
  <Fragment>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
    <HeaderMobile />
    <Sidebar />
    {children}
  </Fragment>
);

export default Layout;
