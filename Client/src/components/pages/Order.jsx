import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import Navbar from '../Navbar';
import ProductOrder from '../ProductOrder';
import Footer from '../Footer';
import { errorMsg, successMsg } from '../../services/feedbackService';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from 'react-bootstrap';
import { deleteOrder } from '../../services/orderService';
import { useCookies } from 'react-cookie';

function Order() {
    const { orderId } = useParams();
    const api = 'http://localhost:3000/api/';
    const [cookies] = useCookies();
    const [order] = useFetch(`${api}order/${orderId}`);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
        }, 500);
    }, []);

    const handleDeleteOrder = async () => {
        setIsLoading(true);
        const res = await deleteOrder(
            orderId,
            cookies.eShopToken,
            cookies.eShopUserID,
        );
        console.log(res);
        if (res.status !== 200 || !res?.data) {
            return errorMsg('Something went wrong! Please try again.');
        } else {
            successMsg('Your order deleted');
            setIsLoading(false);
            navigate('/');
        }
    };

    return (
        <>
            <Navbar />
            {isLoading ? (
                <div className="h-100 gradient-custom">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-lg-10 col-xl-10">
                                <div
                                    className="card"
                                    style={{ borderRadius: '10px' }}
                                >
                                    <div className="card-header px-4 py-5">
                                        <h5 className="text-muted mb-0 d-flex flex-row justify-content-between">
                                            <span>
                                                Thanks for your Order
                                                <span
                                                    style={{ color: '#a8729a' }}
                                                >
                                                    {order.fullName}
                                                </span>
                                                !
                                            </span>
                                            <Button onClick={handleDeleteOrder}>
                                                <DeleteIcon />
                                                Delete
                                            </Button>
                                        </h5>
                                    </div>
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <p
                                                className="lead fw-normal mb-0"
                                                style={{ color: '#a8729a' }}
                                            >
                                                Receipt
                                            </p>
                                        </div>

                                        {order?.products?.map(
                                            (product, idx) => {
                                                const {
                                                    image,
                                                    name,
                                                    description,
                                                    rate,
                                                    category,
                                                    price,
                                                    _id,
                                                } = product;
                                                const props = {
                                                    image,
                                                    name,
                                                    description,
                                                    rate,
                                                    category,
                                                    price,
                                                    _id,
                                                };
                                                return (
                                                    <ProductOrder
                                                        key={product._id}
                                                        {...props}
                                                        quantity={
                                                            order.productIds.filter(
                                                                currId =>
                                                                    currId ==
                                                                    product._id,
                                                            ).length
                                                        }
                                                        showProgress={true}
                                                    />
                                                );
                                            },
                                        )}

                                        <div className="d-flex justify-content-between pt-2">
                                            <p className="fw-bold mb-0">
                                                Order Details
                                            </p>
                                            <p className="text-muted mb-0">
                                                <span className="fw-bold me-4">
                                                    Total
                                                </span>
                                                {order.totalPrice}₪
                                            </p>
                                        </div>

                                        <div className="d-flex justify-content-between pt-2">
                                            <p className="text-muted mb-0">
                                                Invoice Number : {orderId}
                                            </p>
                                            {/* <p className="text-muted mb-0">
                                            <span className="fw-bold me-4">
                                                Discount
                                            </span>{' '}
                                            $19.00
                                        </p> */}
                                            <p className="text-muted mb-0">
                                                <span className="fw-bold me-4">
                                                    Delivery Charges
                                                </span>{' '}
                                                15₪
                                            </p>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                            <p className="text-muted mb-0">
                                                Invoice Date :{' '}
                                                {new Date(
                                                    parseInt(order.orderDate),
                                                ).toLocaleDateString('en-US')}
                                            </p>
                                            {/* <p className="text-muted mb-0">
                                            <span className="fw-bold me-4">
                                                GST 18%
                                            </span>{' '}
                                            123
                                        </p> */}
                                        </div>

                                        {/* <div className="d-flex justify-content-between mb-5">
                                        <p className="text-muted mb-0">
                                            Recepits Voucher : 18KU-62IIK
                                        </p>
                                    </div> */}
                                    </div>
                                    <div
                                        className="card-footer border-0 px-4 py-5"
                                        style={{
                                            backgroundColor: '#a8729a',
                                            borderBottomLeftRadius: '10px',
                                            borderBottomRightRadius: '10px',
                                        }}
                                    >
                                        <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                                            Total paid:{' '}
                                            <span className="h2 mb-0 ms-2">
                                                {15 +
                                                    parseFloat(
                                                        order.totalPrice,
                                                    )}
                                                ₪
                                            </span>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="spinner">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}

export default Order;
