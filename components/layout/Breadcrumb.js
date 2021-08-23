import Link from "next/link";

const Breadcrumb = ({ page, pages }) => {
  return (
    <div className="ps-breadcrumb">
      <div className="container">
        <ul className="breadcrumb">
          {pages.map(({ text, location }, index) => (
            <li key={index}>
              <Link href={location}>
                <a>{text}</a>
              </Link>
            </li>
          ))}
          <li>{page}</li>
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumb;
