import { Link } from 'react-router-dom';

function Card(props) {
    return (
        <>
            <div className="product-card ">
                {/* Hot Badge */}
                {props.hot ? <div className="badge">Hot</div> : null}

                <Link to={`/product/${props._id}`}>
                    <img className="productImg" src={props.image} alt="Item" />
                </Link>
                <div className="product-details">
                    <div className="row">
                        <div className="col-9">
                            <span className="product-category">
                                {' '}
                                <i className="fa-solid fa-tags"> </i>{' '}
                                {props.category}
                            </span>
                        </div>
                        <div className="rating col-3">
                            {' '}
                            <span>
                                <i
                                    className="fa-solid fa-star"
                                    style={{ color: '#FFD700' }}
                                ></i>{' '}
                                <strong className="rate">{props.rate}</strong>
                            </span>
                        </div>
                    </div>

                    <h4>
                        <Link to={`/product/${props._id}`}>{props.name}</Link>
                    </h4>
                    {/* In Stock / Out of stock Conditions */}
                    <p>{props.description}</p>
                    <div className="row">
                        <div className="col">
                            {' '}
                            <span className="product-price">
                                {props.price}₪
                            </span>
                        </div>
                        <div className="col">
                            {props.inStock ? (
                                <div className="inStock mt-1">
                                    <i className="fa-solid fa-check"></i> In
                                    Stock!
                                </div>
                            ) : (
                                <div className="outOfStock mt-1">
                                    Out Of Stock!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;
