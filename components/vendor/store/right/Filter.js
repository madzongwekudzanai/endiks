import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { autocompleteSellerProducts } from "../../../../actions/product";
import { useState, Fragment } from "react";

const Filter = ({
  product: { autocompletedSellerProducts },
  autocompleteSellerProducts,
}) => {
  const router = useRouter();
  const { store_id } = router.query;
  const [content, setContent] = useState("");
  return (
    <div className="ps-block--vendor-filter">
      <div className="ps-block__left">
        <ul>
          <li className="active">Products</li>
          {/* <li>
            <Link href="#">
              <a>Reviews</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>About</a>
            </Link>
          </li> */}
        </ul>
      </div>
      <div className="ps-block__right">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(
              `/seller/store?store_id=${store_id}&search_query=${encodeURI(
                content
              )}&search=true&page_number=1`
            );
          }}
          className="ps-form--search"
        >
          <input
            className="form-control"
            type="text"
            name="content"
            autoComplete="off"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              autocompleteSellerProducts(e.target.value, store_id);
            }}
            required
            placeholder="Search in this shop"
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
        <div
          style={{ display: !content && "none" }}
          className="seller-products-autocomplete"
        >
          {autocompletedSellerProducts.map(({ _id, title }) => (
            <Fragment>
              <Link
                key={_id}
                href={`/seller/store?store_id=${store_id}&search_query=${title}&search=false&page_number=1`}
              >
                <a
                  onClick={() => {
                    setContent("");
                  }}
                  className="autocomplete-text"
                >
                  {title}
                </a>
              </Link>
              <br />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { autocompleteSellerProducts })(Filter);
