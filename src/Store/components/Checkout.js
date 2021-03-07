import React, { useEffect, useState } from 'react';
import '../css/Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from '../../StateProvider';
import { Link, useHistory } from 'react-router-dom';

function Checkout() {
    const history = useHistory();
    const [{ basket, user }, dispatch] = useStateValue();
    const [subTotal, setSubTotal] = useState(0);
    const [update, setUpdate] = useState(false);

    const subtotal = () => {
        let sum = 0;
        basket.map((item) => {
            sum += item.price * item.quantity;
        });
        return sum;
    }

    useEffect(() => {
        setUpdate(false);
        setSubTotal(subtotal());
    }, [update]);

    return (
        <div className="checkout">
            <div className="checkout__left">
                <div className="checkout__left-content">
                    <Link to="/" className="link">
                        <div className="back-to-store"><span>&#8249;</span> BACK TO STORE</div>
                    </Link>
                    <div className="chechout__header">
                        <h2 className="checkout__header-title">Shopping cart</h2>
                        <h4 className="checkout__header-items">
                            <span className="checkout__header-numbers">{basket?.length}</span> ITEMS
                        </h4>
                    </div>             
                    {
                        basket.length > 0 ? (
                            <>
                                
                                <div className="chechout__titles" >
                                    <div className="checkout__header-titlesParts checkout__header-titlesPartsOne" style={{fontWeight: 300}}>Item</div>
                                    <div className="checkout__header-titlesParts checkout__header-titlesPartsTwo head" style={{fontWeight: 300}}>
                                        <div className="checkout__header-titlesPart">
                                            Size
                                        </div>
                                        <div className="checkout__header-titlesPart">
                                            #
                                        </div>
                                        <div className="checkout__header-titlesPart">
                                            Price
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="empty-cart-wrapper">
                                <img className="empty-cart" src="./images/empty.jpg" />
                                <p>Your cart is empty</p>
                                <Link to="/">
                                     <button className="home__collection-text-button" style={{marginTop: '30px'}}>Start shopping</button>
                                </Link>
                               
                            </div>
                        )
                    }
                    {/* <a href="https://www.freepik.com/vectors/character">Character vector created by vectorjuice - www.freepik.com</a> */}
 
                    {basket.map((item, index) => (
                        <CheckoutProduct
                            key={index}
                            id={item.id}
                            title={item.title}
                            photo={item.photo}
                            price={item.price}
                            quantity={item.quantity}
                            size={item.size}
                            setUpdate={setUpdate}
                        />
                    ))}
                </div>
            </div>
            <div className="checkout__right">
                <div className="checkout__right-content">
                    <div className="chechout__summary">
                        <h2 className="checkout__summary-title">Summary</h2>
                        <div className="checkout__summary-details">
                            <div className="checkout__summary-details-item">
                                <p>Subtotal</p>
                                <span>{basket.length > 0 ? subTotal.toFixed(2) : "0.00"} $</span>
                            </div>
                            <div className="checkout__summary-details-item">
                                <p>Shipping</p>
                                <span>{subTotal == 0 || subTotal > 99 ? "0.00" : 30} $</span>
                            </div>
                            <div className="checkout__summary-details-item">
                                <p>Tax</p>
                                <span>{basket.length > 0 ? (subTotal * 0.18).toFixed(2) : "0.00"} $</span>
                            </div>
                        </div>
                        
                        
                    </div> 
                </div>
                {
                    basket.length > 0 ? (
                        <div className="checkout__summary-details checkout__summary-details-total">
                            <div className="checkout__summary-details-item">
                                <p>Total</p>
                                <span>{basket.length > 0 ? subTotal.toFixed(2) : "0.00"} $</span>
                            </div>
                            <button className="checkout__button" onClick={() => history.push(user ? "/checkout-proceeded" : "/account/checkout")}>Checkout</button>
                        </div>
                    ) : ""
                }
            </div>
        </div>
    )
}

export default Checkout
