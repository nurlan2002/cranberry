import React, { useEffect, useState } from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import "../css/Product.css";
import { useStateValue } from "../../StateProvider";
import { Button, ButtonGroup } from "@material-ui/core";

function Product({ product }) {
    const [{ basket, wishlist }, dispatch] = useStateValue();
    const [selectedSize, setSize] = useState("");
    const [message, setMessage] = useState("");
    const [added, setAdded] = useState(0);

    useEffect(() => {
        let num = 0;
        basket.forEach((item) => {
            if(item.title === product.title) {
                num += item.quantity;
            }
        });
        setAdded(num);
    }, []);

    const addToBasket = (e) => {
        if (selectedSize === "") {
            setMessage("Select a size");
            setTimeout(() => {
                setMessage("");
            }, 1500);
        } else {
            setAdded(added + 1);
            var cart = document.getElementById("cart");
            setTimeout(function () {
                cart.classList.add("shake");
                setTimeout(function () {
                    cart.classList.remove("shake");
                }, 500);
            }, 1000);
            dispatch({
                type: "ADD_TO_BASKET",
                item: {
                    id: product.id,
                    title: product.title,
                    type: product.category,
                    photo: product.mainPhotoUrl,
                    price: product.finalPrice,
                    size: selectedSize,
                    quantity: 1,
                },
            });
        }
    };

    const toggleWishlist = (e) => {
        console.log(wishlist);
        if (e.target.classList.contains("animate")) {
            dispatch({
                type: "REMOVE_FROM_WISHLIST",
                id: product.id,
            });
        } else {
            dispatch({
                type: "ADD_TO_WISHLIST",
                item: {
                    id: product.id,
                    title: product.title,
                    type: product.category,
                    photo: product.mainPhotoUrl,
                    price: product.finalPrice,
                    sizes: product.sizes,
                },
            });
        }

        e.target.classList.toggle("animate");
    };

    return (
        <div className="product">
            <div className="product__hover">
                <img
                    className="product__pic"
                    src={product.mainPhotoUrl}
                    alt="product"
                />
                <div
                    className="product__add product__cart addtocart"
                    onClick={(e) => addToBasket(e)}
                >
                    <AddShoppingCartIcon
                        style={{ fontSize: "25px", pointerEvents: "none" }}
                    />
                    <span className="cart-item" data-content={added}></span>
                </div>
                <div
                    className="HeartAnimation product__add product__wish"
                    onClick={(e) => toggleWishlist(e)}
                ></div>
                <div className="product__button">
                    {message === "" ? (
                        <ButtonGroup
                            size="large"
                            color="primary"
                            aria-label="large outlined primary button group"
                        >
                            {product.sizes &&
                                product.sizes.map((val, index) => {
                                    const size = val.split(":")[0];
                                    return (
                                        <Button
                                            key={index}
                                            disabled={val.split(":")[1] <= 0}
                                            variant={
                                                selectedSize.toLowerCase() ===
                                                    size.toLowerCase() &&
                                                "contained"
                                            }
                                            style={{ fontSize: "2rem" }}
                                            onClick={(e) => {
                                                setSize(e.target.innerText);
                                            }}
                                        >
                                            {size}
                                        </Button>
                                    );
                                })}
                        </ButtonGroup>
                    ) : (
                        <p
                            style={{
                                color: "#E23036",
                                fontWeight: 600,
                                fontSize: "2rem",
                            }}
                        >
                            {message}
                        </p>
                    )}
                </div>
            </div>

            <p className="product__title">{product.title}</p>
            <p className="product__price">${product.finalPrice}</p>
        </div>
    );
}

export default Product;
