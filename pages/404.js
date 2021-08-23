import Link from "next/link";
import Layout from "../components/layout/Layout";

export default function Custom404() {
  return (
    <Layout title="404 Page" description="Page not found">
      <div className="ps-page--404">
        <div className="container">
          <div className="ps-section__content">
            <img src="/coverimages/404.jpg" alt="" />
            <h3>ohh! page not found</h3>
            <p>
              It seems we can't find what you're looking for. Perhaps searching
              can help or go back to
              <Link href="/">
                <a> Homepage</a>
              </Link>
            </p>
            <form className="ps-form--widget-search">
              <input
                className="form-control"
                type="text"
                placeholder="Search..."
              />
              <button>
                <i className="lnr lnr-magnifier"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
