import React from "react";
import "../css/CheckoutProduct.css";
import CloseIcon from "@material-ui/icons/Close";
import { useStateValue } from "../../StateProvider";
import { Button, ButtonGroup } from "@material-ui/core";

function CheckoutProduct({ id, title, photo, price, quantity, size, setUpdate }) {
    const [{}, dispatch] = useStateValue();

    const removeFromBasket = () => {
        // remove the item from the basket
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id,
        });
    };

    const handleIncrement = () => {
        dispatch({
            type: "INCREMENT",
            item: {
                id,
                size
            }
        });
        setUpdate(true);
    };

    const handleDecrement = () => {
        dispatch({
            type: "DECREMENT",
            item: {
                id,
                size
            }
        })
        setUpdate(true);
    };

    return (
        <div className="chechout__titles chechout__titles-min">
            <div className="checkout__header-titlesParts checkout__header-titlesPartsOne">
                <div>
                    <img className="checkoutProduct__image" src={photo} />
                </div>
                <div className="checkoutProduct__title">{title}</div>
            </div>
            <div className="checkout__header-titlesParts checkout__header-titlesPartsTwo">
                <div className="checkoutProduct__title none">{title}</div>
                <div className="checkout__header-titlesPart counter">
                    <ButtonGroup
                        size="small"
                        aria-label="small outlined button group"
                    >
                        {quantity > 1 && (
                            <Button style={{fontSize: "1.6rem"}} onClick={handleDecrement}>-</Button>
                        )}
                        <Button style={{fontSize: "1.6rem", pointerEvents: "none"}}>{quantity}</Button>
                        <Button style={{fontSize: "1.6rem"}} onClick={handleIncrement}>+</Button>
                        
                    </ButtonGroup>
                </div>
                <div className="checkout__header-titlesPart">{size}</div>
                <div className="checkout__header-titlesPart deleteButton">
                    <div>${price}</div>
                    <div
                        onClick={removeFromBasket}
                        style={{ cursor: "pointer" }}
                    >
                        <CloseIcon
                            style={{ fontSize: "25px", marginTop: "-5px" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutProduct;
