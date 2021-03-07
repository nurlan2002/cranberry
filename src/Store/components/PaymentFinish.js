import React from 'react';
import '../css/PaymentFinish.css';
import { useStateValue } from '../../StateProvider';
import { Link, useHistory } from 'react-router-dom';

function PaymentFinish({order}) {
    const history = useHistory();
    const [{ user }, dispatch] = useStateValue();

    const date = (_date) => {
        try {
            const nextWeek = new Date(order.created.getTime() + 7 * 24 * 60 * 60 * 1000);
            return nextWeek.toLocaleDateString();
        }
        catch(er) {
            console.warn(er.message);
        }
    }

    return (
        <div className="checkout">
            <div className="checkout__left">
                <div className="checkout__left-content">
                    <Link className="router-link" to="/">
                        <div className="header__logo" style={{fontFamily: "Playfair Display, sans-serif", marginBottom: "30px"}}>
                            <span>CRANBERRY</span>
                        </div>
                    </Link>
                    <div className="chechout__header">
                        <h2 className="checkout__header-title">Thank you for shopping with Cranberry<br/>You've made a great choice</h2>
                    </div> 

                    <div style={{paddingTop: "45px"}}>
                        <div className="checkout__header-titlesParts checkout__header-titlesPartsOne" style={{fontWeight: 300, width: "100%"}}>
                            Your order has been successfully completed and will be delivered to you in the near future.
                            You can track the delivery status in the My Orders page.
                            Confirmation letter has been sent to {user?.email}
                        </div>

                        <button className="checkout__button half-inverted" onClick={() => history.push("/")}>Back to store</button>
                    </div>                      
                        
                </div>
            </div>
            <div className="checkout__right finished">
                <div className="checkout__right-content">
                    <div className="chechout__summary">
                        <div className="checkout__summary-details-item checkout__summary-details-item-edit">
                            <h2 className="checkout__summary-title">Order summary</h2>
                        </div>
                        <div className="checkout__summary-details">
                            <div className="checkout__summary-details-item">
                                <p>Order No</p>
                                <span>{order?.id}</span>
                            </div>
                            <div className="checkout__summary-details-item">
                                <p>Est delivery date</p>
                                <span>{date()}</span>
                            </div>
                        </div>
                        <div className="checkout__summary-details">
                            <div className="checkout__summary-details-item">
                                <p>Total</p>
                                <span style={{fontWeight: "700"}}>{order?.amount?.toFixed(2)} $</span>
                            </div>
                            {order?.basket?.map((item, index) => {
                                return (
                                    <div className="checkout__summary-details-item checkout__summary-details-item2" key={index}>
                                        <p>{item.title}</p>
                                        <div className="checkout__summary-details-item-quantity">
                                            <span>{item.quantity}x</span>
                                            <span>{item.price.toFixed(2)} $</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div> 
                </div>                
            </div>
        </div>
    )
}

export default PaymentFinish
