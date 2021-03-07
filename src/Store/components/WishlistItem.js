import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { useStateValue } from "../../StateProvider";
import "../css/WishlistItem.css";
import { Add } from "@material-ui/icons";
import {
    Button,
    ButtonGroup,
    makeStyles,
    Modal,
    Popover,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    paper: {
        position: "absolute",
        minWidth: 400,
        backgroundColor: "#424242",
        border: "2px solid #000",
        boxShadow:
            "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)",
        padding: "36px 32px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        color: "#fff",
        minHeight: "120px",
    },
}));

function WishlistItem({ id, title, photo, price, type, sizes }) {
    const [{}, dispatch] = useStateValue();

    const remove = () => {
        dispatch({
            type: "REMOVE_FROM_WISHLIST",
            id,
        });
    };

    const addToBasket = () => {
        if (selectedSize !== "") {
            setMessage("Item has been added to your cart!");
            setOpen(true);
            dispatch({
                type: "ADD_TO_BASKET",
                item: {
                    id,
                    title,
                    type,
                    photo,
                    price,
                    quantity: 1,
                    size: selectedSize,
                },
            });
        } else {
            setMessage("Please, select a size!")
            setOpen(true);
        }
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedSize, setSize] = useState("");

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openPop = Boolean(anchorEl);
    const idPop = openPop ? "popover" : undefined;

    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const [message, setMessage] = useState("")

    const body = (
        <div className={classes.paper}>
            <h2
                style={{
                    fontSize: "2rem",
                    lineHeight: "3rem",
                    margin: "auto 0",
                    textAlign: "center",
                    display: "block",
                    height: "100%",
                }}
            >
                {message}
            </h2>
        </div>
    );

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
            <div className="chechout__titles chechout__titles-min">
                <div
                    className="checkout__header-titlesParts checkout__header-titlesPartsOne"
                    style={{ width: "40%" }}
                >
                    <div>
                        <img className="checkoutProduct__image" src={photo} />
                    </div>
                    <div className="checkoutProduct__title">{title}</div>
                </div>
                <div
                    className="checkout__header-titlesParts checkout__header-titlesPartsTwo"
                    style={{ width: "60%" }}
                >
                    <div className="checkoutProduct__title none">{title}</div>
                    <div className="checkout__header-titlesPart four price-label">
                        ${price}
                    </div>
                    <div className="checkout__header-titlesPart four">
                        <button
                            onClick={handleClick}
                            className="home__collection-text-button"
                            style={{ padding: "15px 18px" }}
                            aria-describedby={idPop}
                        >
                            {selectedSize || "Size"}
                        </button>
                        <Popover
                            id={idPop}
                            open={openPop}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <ButtonGroup
                                size="large"
                                color="primary"
                                aria-label="large outlined primary button group"
                            >
                                {sizes &&
                                    sizes.map((val, index) => {
                                        const size = val.split(":")[0];
                                        return (
                                            <Button
                                                key={index}
                                                disabled={
                                                    val.split(":")[1] <= 0
                                                }
                                                variant={
                                                    selectedSize === size &&
                                                    "contained"
                                                }
                                                style={{ fontSize: "2rem" }}
                                                onClick={(e) => {
                                                    setSize(e.target.innerText);
                                                    handleClose();
                                                }}
                                            >
                                                {size}
                                            </Button>
                                        );
                                    })}
                            </ButtonGroup>
                        </Popover>
                    </div>

                    <div className="checkout__header-titlesPart four">
                        <button
                            onClick={addToBasket}
                            className="home__collection-text-button add-button"
                            style={{ padding: "15px 18px", position: "relative" }}
                        >
                            <Add />
                        </button>
                    </div>
                    <div className="checkout__header-titlesPart four delete-button">
                        <div onClick={remove} style={{ cursor: "pointer" }}>
                            <CloseIcon
                                style={{ fontSize: "25px", marginTop: "-5px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WishlistItem;
