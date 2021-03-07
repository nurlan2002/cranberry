import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import { CheckoutContext } from '../CheckoutStateProvider';
import '../css/Checkout2Step.css';
import PaymentFinish from './PaymentFinish';
import PaymentForm from './PaymentForm';
import WhereForm from './WhereForm';
import WhoForm from './WhoForm';

function Checkout2Step() {
    const history = useHistory();
    const [{ basket, user }, dispatch] = useStateValue();
    const [subTotal, setSubTotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [step, setStep] = useState(2); 
    const [{}, dispatchAction] = useContext(CheckoutContext);

    const [order, setOrder] = useState({});

    const subtotal = () => {
        let sum = 0;
        basket.map((item) => {
            sum += item.price * item.quantity;
        });
        sum < 99 && setShipping(30);
        return sum;
    }

    useEffect(() => {
        if(basket.length === 0 && (step !== 4 && step !== 5)) {
            history.push("/")
        }
        setSubTotal(parseFloat(subtotal().toFixed(2)));
        db.collection("users").doc(user?.uid).onSnapshot((doc) => {
            const profile = doc.data();
            for(var key in profile) {
                let query = { type: `SET_${key.toUpperCase()}` };
                query[key] = profile[key];
                dispatchAction(query);
            }
        });
    }, [user, basket]);

    return (
        <>
        {
            step === 5 ? <PaymentFinish order={order}/> : (
                <div className="checkout">
            <div className="checkout__left inverted">
                <div className="checkout__left-content">
                    {
                        step === 2 && <WhoForm user={user} setStep={setStep}/>
                    }
                    {
                        step === 3 && <WhereForm user={user} setStep={setStep}/>
                    }
                    {
                        step === 4 && <PaymentForm setOrder={setOrder} total={shipping + subTotal} setStep={setStep}/>
                    }
                </div>
            </div>
            <div className="checkout__right inverted">
                <div className="checkout__right-content">
                    <div className="chechout__summary">
                        <div className="checkout__summary-details-item checkout__summary-details-item-edit">
                            <h2 className="checkout__summary-title">Items</h2>
                            <p className="chechout__summary-edit" onClick={() => {history.replace("/checkout")}}>Edit Cart</p>
                        </div>
                        <div className="checkout__summary-details">
                            {basket.map((item, index) => {
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
                
                <div className="checkout__summary-details checkout__summary-details-total">
                    <div className="checkout__summary-details-item">
                        <p>Total</p>
                        <span>{basket.length > 0 ? (subTotal + shipping).toFixed(2) : "0.00"} $</span>
                    </div>
                </div>
                
            </div>
        </div>
            )
        }
        </>
        
    )
}

export default Checkout2Step
