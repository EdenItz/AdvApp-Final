function ProductOrder(props) {
    return (
        <div className="card shadow-0 border mb-4">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-2">
                        <img
                            src={props.image}
                            className="img-fluid"
                            alt="Product"
                        ></img>
                    </div>
                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0">{props.name}</p>
                    </div>
                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0 small">{props.description}</p>
                    </div>
                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0 small">Rate: {props.rate}</p>
                    </div>
                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0 small">category: {props.category}</p>
                    </div>
                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0 small">{props.price}₪</p>
                    </div>
                </div>
                {/* <hr className="mb-4" style="background-color: #e0e0e0; opacity: 1;"> */}
                <div className="row d-flex align-items-center">
                    <div className="col-md-2">
                        <p className="text-muted mb-0 small">Track Order</p>
                    </div>
                    <div className="col-md-10">
                        <div
                            className="progress"
                            style={{ height: '6px', 'border-radius': '16px' }}
                        >
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                    width: '100%',
                                    'border-radius': '16px',
                                    'background-color': '#a8729a',
                                }}
                                aria-valuenow="20"
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                        <div className="d-flex justify-content-around mb-1">
                            <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                Out for delivary
                            </p>
                            <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                Delivered
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductOrder;