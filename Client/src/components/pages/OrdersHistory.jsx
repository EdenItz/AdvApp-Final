import React, { useState, useEffect, useContext } from 'react';
import { Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'
import { useCookies } from 'react-cookie';

import Navbar from '../Navbar';
import Footer from '../Footer';
import ProductOrder from "../ProductOrder";
import { getHistory } from '../../services/orderService';
import { errorMsg, successMsg } from '../../services/feedbackService';
import { UserContext } from '../../App';

import '../../css/OrdersHistory.css'

function OrdersHistory({}) {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState();
    const [cookies] = useCookies();
    const userDetails = useContext(UserContext);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true)  
            
            if (!cookies.eShopToken){
                errorMsg('Please login and try again.')
                return setLoading(false)
            }

            const res = await getHistory(cookies.eShopToken);

            if(!res?.data) {
                errorMsg('Something went wrong! Please try again.')
            } else { // Add quantity to each product

                res.data.forEach((order)=>order.products.forEach((product)=>{
                    product.quantity=order.productIds.filter((currId) => currId == product._id).length
                }))
                setOrders(res.data)
            }
            setLoading(false)
          };
        
        fetchOrders()
    },[]);
   
    return (
        <>
            <Navbar />
            {loading ? <div className="spinner">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div> 
                :
                !orders.length ? <h1>It seems that you didn't make any orders yet</h1>
                :
                 <div>
                    <h1>{userDetails.name}' orders</h1>

                    {orders?.map((order)=> 
                     <Accordion className='orderAccordion' key={order._id} expanded={expandedOrder==order._id} onChange={()=>setExpandedOrder(order._id)} >
                        <AccordionSummary className="accordionTitle" expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                {new Date(parseInt(order.orderDate)).toLocaleDateString("en-US")}   
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>total: {order.totalPrice}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {order?.products?.map((product) => {
                                const { image, name, description, rate, catagory, price, _id, quantity } = product;
                                const props = { image, name, description, rate, catagory, price, _id, quantity};
                                return <ProductOrder key={product._id} {...props}/>
                            })}
                            </AccordionDetails>
                    </Accordion>)}
                </div>}
            
            <Footer />
        </>
    );
}

export default OrdersHistory;
