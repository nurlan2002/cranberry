import React, { useState } from "react";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import "../css/Header.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import {
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Popover,
} from "@material-ui/core";
import {
    AccountCircle,
    AssignmentRounded,
    ExitToAppRounded,
} from "@material-ui/icons";
import { auth } from "../../firebase";

function Header() {
    const history = useHistory();
    const location = useLocation();
    const [{ basket, user }, dispatch] = useStateValue();
    const [open, setOpen] = useState(false);

    const menuToggle = (link) => {
        const nav = document.querySelector("#nav");

        if (!open) {
            document.body.style.overflow = "hidden";
            document.querySelector("html").scrollTop = window.scrollY;
        } else {
            document.body.style.overflow = null;
        }

        nav.classList.toggle("nav--open");
        setOpen(!open);
        history.push(link);
    };

    const account = (path) => {
        if (user !== null) {
            console.log(user);
            history.push(`/account-details/${path}`);
        } else {
            history.push("/account");
        }
        handleClose();
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openPop = Boolean(anchorEl);
    const id = openPop ? "simple-popover" : undefined;

    const accountHandler = () => {
        if (user) {
            auth.signOut();
            if (location.pathname.split("/")[1] === "account-details") {
                history.push("/");
            }
        } else {
            history.push("/account");
        }
    };

    return (
        <div className="header">
            <Link className="router-link" to="/">
                <div className="header__logo">
                    <span>CRANBERRY</span>
                </div>
            </Link>

            <nav id="nav" className="nav" role="navigation">
                <ul
                    className="nav__menu"
                    id="menu"
                    tabIndex="-1"
                    aria-label="main navigation"
                    hidden
                >
                    <li
                        className="nav__item nav__link"
                        onClick={() => menuToggle("/")}
                    >
                        Home
                    </li>
                    <li
                        className="nav__item nav__link"
                        onClick={() => menuToggle("/women")}
                    >
                        Women's
                    </li>
                    <li
                        className="nav__item nav__link"
                        onClick={() => menuToggle("/men")}
                    >
                        Men's
                    </li>
                    <li
                        className="nav__item nav__link"
                        onClick={() => menuToggle("/wishlist")}
                    >
                        WishList
                    </li>
                    <li
                        className="nav__item nav__link"
                        onClick={() => menuToggle("/checkout")}
                    >
                        Shopping Cart
                    </li>
                    <li
                        className="nav__item nav__link"
                        onClick={() =>
                            menuToggle(user ? "/account-details" : "/account")
                        }
                    >
                        {user ? "My Account" : "Sign In/Join"}
                    </li>
                </ul>

                <a
                    onClick={(e) => menuToggle(e)}
                    className="nav__toggle"
                    role="button"
                >
                    <svg
                        className="menuicon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                    >
                        <title>Toggle Menu</title>
                        <g>
                            <line
                                className="menuicon__bar"
                                x1="13"
                                y1="16.5"
                                x2="37"
                                y2="16.5"
                            />
                            <line
                                className="menuicon__bar"
                                x1="13"
                                y1="24.5"
                                x2="37"
                                y2="24.5"
                            />
                            <line
                                className="menuicon__bar"
                                x1="13"
                                y1="24.5"
                                x2="37"
                                y2="24.5"
                            />
                            <line
                                className="menuicon__bar"
                                x1="13"
                                y1="32.5"
                                x2="37"
                                y2="32.5"
                            />
                            <circle
                                className="menuicon__circle"
                                r="23"
                                cx="25"
                                cy="25"
                            />
                        </g>
                    </svg>
                </a>

                <div className="splash"></div>
            </nav>

            <div className="header__group">
                <Link className="router-link" to="/women">
                    <span className="header__group-item">Women's</span>
                </Link>
                <Link className="router-link" to="/men">
                    <span className="header__group-item">Men's</span>
                </Link>
            </div>
            <div className="header__options">
                <Link to="/wishlist" className="link">
                    <span className="header__option">
                        <IconButton>
                            <FavoriteBorderOutlinedIcon
                                style={{ fontSize: "20px", fill: "#0f0f0f" }}
                            />
                        </IconButton>
                    </span>
                </Link>
                <Link to="/checkout" className="link">
                    <span className="header__option">
                        {/* <IconButton>
                            <LocalMallOutlinedIcon
                                style={{ fontSize: "20px", fill: "#0f0f0f" }}
                            />
                        </IconButton> */}
                        <div className="cart" data-totalitems={basket.length}>
                            <IconButton id="cart">
                                <LocalMallOutlinedIcon
                                    style={{
                                        fontSize: "20px",
                                        fill: "#0f0f0f",
                                    }}
                                />
                            </IconButton>
                        </div>
                    </span>
                </Link>

                <span className="header__option">
                    <IconButton onClick={handleClick}>
                        <PersonOutlineOutlinedIcon
                            style={{ fontSize: "25px", fill: "#0f0f0f" }}
                            aria-describedby={id}
                        />
                    </IconButton>
                    <Popover
                        id={id}
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
                        <List>
                            <ListItem
                                onClick={() => account("my-account")}
                                className="cursor"
                            >
                                <ListItemAvatar>
                                    <AccountCircle className="menu-item" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="My Account"
                                    className="account-text"
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem
                                onClick={() => account("my-orders")}
                                className="cursor"
                            >
                                <ListItemAvatar>
                                    <AssignmentRounded className="menu-item" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="My Orders"
                                    className="account-text"
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem
                                onClick={accountHandler}
                                className="cursor"
                            >
                                <ListItemAvatar>
                                    <ExitToAppRounded className="menu-item" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user ? "Sign Out" : "Sign In/Join"}
                                    className="account-text"
                                />
                            </ListItem>
                        </List>
                    </Popover>
                </span>
            </div>
        </div>
    );
}

export default Header;
