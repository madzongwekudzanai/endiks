import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Link from "next/link";

const UserButton = ({ authSeller: { isAuthenticated } }) => {
  const router = useRouter();
  const { navigation } = router.query;
  const [bar, setBar] = useState(navigation);
  useEffect(() => {
    setBar(navigation);
  }, [navigation]);
  return (
    <div className="ps-block__left pointer-cursor">
      {router.pathname === "/seller/auth/[purpose]" || isAuthenticated ? (
        <a>
          <i className="lnr lnr-user white-links"></i>
        </a>
      ) : (
        <Link
          href={bar === "account" ? router.pathname : "?navigation=account"}
        >
          <a>
            <i className="lnr lnr-user white-links"></i>
          </a>
        </Link>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  authSeller: state.authSeller,
});

export default connect(mapStateToProps, null)(UserButton);
