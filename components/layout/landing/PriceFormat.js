import { Fragment } from "react";

const PriceFormat = ({ locale, currencyCode, price }) => {
    return (
        <Fragment>
            {new Intl.NumberFormat(
            locale,
            {
                style: "currency",
                currency: currencyCode,
            }
            ).format(price)}
        </Fragment>
    )
}

export default PriceFormat
