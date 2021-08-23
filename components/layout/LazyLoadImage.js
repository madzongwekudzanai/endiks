import LazyLoad from "react-lazyload";

const LazyLoadImage = ({ children, height }) => {
    return (
        <LazyLoad height={height}>
            {children}
        </LazyLoad>
    )
}

export default LazyLoadImage
