import { makeStyles, Modal } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { auth, createUser, login } from "../../firebase";
import { useStateValue } from "../../StateProvider";

const useStyles = makeStyles(() => ({
    paper: {
        position: "absolute",
        minWidth: 400,
        backgroundColor: "#424242",
        border: "2px solid #000",
        boxShadow:
            "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)",
        padding: "16px 32px 24px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        color: "#fff",
        minHeight: "120px",
    },
}));

function AccountForm() {
    const location = useLocation();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        // if(user !== null) {
        //     history.push("/");
        // }
        import("../css/AccountForm.css");
        const switchers = [...document.querySelectorAll(".switcher")];

        switchers.forEach((item) => {
            item.addEventListener("click", function () {
                switchers.forEach((item) =>
                    item.parentElement.classList.remove("is-active")
                );
                this.parentElement.classList.add("is-active");
            });
        });
    }, [user]);

    const loginUser = async (e) => {
        e.preventDefault();
        var user = await login(e.target[1].value, e.target[2].value);
        if (user !== null) {
            if (location.pathname.split("/")[2] === "checkout") {
                history.push("/checkout-proceeded");
            } else {
                history.push("/account-details");
            }
        }
    };

    const body = (
        <div className={classes.paper}>
            <h2
                style={{
                    fontSize: "2rem",
                    lineHeight: "3rem",
                    marginBottom: "2rem",
                }}
            >
                Verification email has been sent!
            </h2>
            <p style={{ fontSize: "1.6rem", lineHeight: "2.5rem" }}>
                Please, verify your email and sign in to your account.
            </p>
        </div>
    );

    return (
        <section class="forms-section">
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
            <div class="forms">
                <div class="form-wrapper is-active">
                    <button type="button" class="switcher switcher-login">
                        Login
                        <span class="underline"></span>
                    </button>
                    <form
                        class="form form-login"
                        onSubmit={(e) => loginUser(e)}
                    >
                        <fieldset>
                            <legend>
                                Please, enter your email and password for login.
                            </legend>
                            <div class="input-block">
                                <label for="login-email">E-mail</label>
                                <input id="login-email" type="email" required />
                            </div>
                            <div class="input-block">
                                <label for="login-password">Password</label>
                                <input
                                    id="login-password"
                                    type="password"
                                    required
                                />
                            </div>
                        </fieldset>
                        <button type="submit" class="btn-login">
                            Login
                        </button>
                    </form>
                </div>
                <div class="form-wrapper">
                    <button type="button" class="switcher switcher-signup">
                        Sign Up
                        <span class="underline"></span>
                    </button>
                    <form
                        class="form form-signup"
                        onSubmit={(e) => {
                            e.preventDefault();
                            createUser(e.target[1].value, e.target[2].value)
                                .then((userCredential) => {
                                    var user = userCredential.user;
                                    user.sendEmailVerification();
                                    auth.signOut();
                                    setOpen(true);
                                })
                                .catch((error) => {
                                    var errorMessage = error.message;
                                    alert(errorMessage);
                                });
                        }}
                    >
                        <fieldset>
                            <legend>
                                Please, enter your email, password and password
                                confirmation for sign up.
                            </legend>
                            <div class="input-block">
                                <label for="signup-email">E-mail</label>
                                <input
                                    id="signup-email"
                                    type="email"
                                    required
                                />
                            </div>
                            <div class="input-block">
                                <label for="signup-password">Password</label>
                                <input
                                    id="signup-password"
                                    type="password"
                                    required
                                />
                            </div>
                            <div class="input-block">
                                <label for="signup-password-confirm">
                                    Confirm password
                                </label>
                                <input
                                    id="signup-password-confirm"
                                    type="password"
                                    required
                                />
                            </div>
                        </fieldset>
                        <button type="submit" class="btn-signup">
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default AccountForm;
