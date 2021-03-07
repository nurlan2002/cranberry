import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { db } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link } from "react-router-dom";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        minHeight: "calc(100vh - 267px)",
        alignItems: "center",
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

function OrderDetails() {
    const [{ basket, user }, dispatch] = useStateValue();
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [orders, setOrders] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(async () => {
        const ordersArray = (
            await db
                .collection("users")
                .doc(user?.uid)
                .collection("orders")
                .get()
        ).docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id,
            };
        });
        setOrders(ordersArray);
    }, [user]);

    return (
        <div className={classes.root} style={{ backgroundColor: "#FAF9F7" }}>
            {orders.length > 0 ? (
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                    style={{ minWidth: "80px" }}
                >
                    {orders.map((order, index) => {
                        return (
                            <Tab
                                label={
                                    order.created
                                        .toDate()
                                        .toLocaleString()
                                        .split(",")[0]
                                }
                                {...a11yProps(index)}
                                style={{ fontSize: "1.2rem" }}
                            />
                        );
                    })}
                </Tabs>
            ) : (
                <div className="empty-cart-wrapper">
                    <img className="empty-cart" src="/images/empty-cart.png" />
                    <h3 style={{fontSize: "3rem"}}>No Purchase History</h3>
                    <p style={{fontSize: "2rem"}}>Check back after your next shopping trip</p>
                    <Link to="/">
                        <button
                            className="home__collection-text-button"
                            style={{ marginTop: "30px" }}
                        >
                            Start shopping
                        </button>
                    </Link>
                </div>
            )}

            {orders.map((order, index) => {
                return (
                    <TabPanel
                        value={value}
                        index={index}
                        style={{ width: "100%" }}
                    >
                        {order.basket.map((item) => {
                            return (
                                <CheckoutProduct
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    photo={item.photo}
                                    price={item.price}
                                    quantity={item.quantity}
                                />
                            );
                        })}
                    </TabPanel>
                );
            })}
        </div>
    );
}

export default OrderDetails;
