import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { CheckoutContext } from "../CheckoutStateProvider";
import { db } from "../../firebase";

function WhoForm({ user, setStep }) {
    const [{ firstName, lastName }, dispatchAction] = useContext(CheckoutContext);
    const [email, setEmail] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");

    useEffect(() => {
        user && setEmail(user.email);
        firstName && setFirstName(firstName);
        lastName && setLastName(lastName);
    }, [user, firstName, lastName]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatchAction({
            type: "SET_WHO",
            email,
            firstName: FirstName,
            lastName: LastName,
        });
        db.collection("users").doc(user?.uid).update({
            firstName: FirstName,
            lastName: LastName, 
        }).catch(() => {
            db.collection("users").doc(user?.uid).set({
                firstName: FirstName,
                lastName: LastName, 
            })
        })
        setStep(3);
    };

    return (
        <>
            <div className="chechout__header">
                <h2 className="checkout__header-title">Who is placing this order?</h2>
            </div>
            <div className="chechout__nameForm">
                <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
                    <TextField
                        required
                        disabled={user !== null}
                        style={{ width: "100%" }}
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="checkoutForm__field">
                        <TextField
                            required
                            style={{ width: "48%", marginRight: "4%" }}
                            label="First Name"
                            value={FirstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            required
                            style={{ width: "48%" }}
                            label="Last Name"
                            value={LastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="checkout__button"
                        style={{ marginTop: "60px" }}
                    >
                        Proceed to shipping
                    </button>
                </form>
            </div>
        </>
    );
}

export default WhoForm;
