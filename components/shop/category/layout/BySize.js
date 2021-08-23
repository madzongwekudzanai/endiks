import Link from "next/link";

const BySize = () => {
  return (
    <figure className="sizes">
      <h4 className="widget-title">BY SIZE</h4>
      <Link href="#">
        <a>L</a>
      </Link>
      <Link href="#">
        <a>M</a>
      </Link>
      <Link href="#">
        <a>S</a>
      </Link>
      <Link href="#">
        <a>XL</a>
      </Link>
    </figure>
  );
};

export default BySize;
