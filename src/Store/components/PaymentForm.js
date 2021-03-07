import React from 'react';
import { db, getTimeStamp } from '../../firebase';
import { useStateValue } from '../../StateProvider';

function PaymentForm({total, setStep, setOrder}) {
    const [{ basket, user }, dispatch] = useStateValue();

    const handlePayment = async () => {
        const timeStamp = getTimeStamp();
        
        var paymentId = "A" + Date.now();

        setOrder({
            id: paymentId,
            basket: basket,
            amount: total,
            created: new Date()
        });
        
        for(let item of basket) {
            const doc =  await db.collection("products").doc(item.id).get();
            const prod = doc.data();

            const sizes = prod.sizes;

            const updatedSizes = sizes.map((size) => {
                const sizeArr = size.split(":");
                if(sizeArr[0].toLowerCase() === item.size.toLowerCase()) {
                    const newSize = sizeArr[0] + ":" + (parseInt(sizeArr[1]) - item.quantity);
                    return newSize;
                }
                return size;
            })

            await db.collection("products").doc(item.id).update({
                sizes: updatedSizes
            });
        }

        await db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentId)
        .set({
            basket: basket,
            amount: total,
            created: timeStamp
        });

        dispatch({
            type: 'EMPTY_BASKET'
        });  
        
        setStep(5);        
    }
    
    return (
        <div>
            <button onClick={handlePayment} className="checkout__button" style={{marginTop: '60px'}}>Complete Payment</button>
        </div>
    )
}

export default PaymentForm
