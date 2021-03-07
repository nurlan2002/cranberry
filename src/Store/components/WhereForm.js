import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import CountryPicker from "./CountryPicker";
import { CheckoutContext } from "../CheckoutStateProvider";
import { db } from "../../firebase";

function WhereForm({ setStep, user }) {
    const [{ country, address, city, zipCode, countryCode, phone, selectedCountryObj, selectedPhoneObj }, dispatchAction] = useContext(CheckoutContext);
    const [Country, setCountry] = useState("");
    const [Address, setAddress] = useState("");
    const [City, setCity] = useState("");
    const [ZipCode, setZipCode] = useState("");
    const [CountryCode, setCountryCode] = useState(0);
    const [Phone, setPhone] = useState("");

    const [SelectedCountryObj, setSelectedCountryObj] = useState({});
    const [SelectedPhoneObj, setSelectedPhoneObj] = useState({});

    useEffect(() => {
        country && setCountry(country);
        address && setAddress(address);
        city && setCity(city);
        zipCode && setZipCode(zipCode);
        countryCode && setCountryCode(countryCode);
        phone && setPhone(phone);
        selectedCountryObj && setSelectedCountryObj(selectedCountryObj);
        selectedPhoneObj && setSelectedPhoneObj(selectedPhoneObj);
    }, [country, address, city, zipCode, countryCode, phone, selectedCountryObj, selectedPhoneObj]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatchAction({
            type: "SET_WHERE",
            country: Country,
            address: Address,
            city: City,
            zipCode: ZipCode,
            countryCode: CountryCode,
            phone: Phone            
        });
        db.collection("users").doc(user?.uid).update({
            country: Country, 
            address: Address, 
            city: City, 
            zipCode: ZipCode, 
            countryCode: CountryCode, 
            phone: Phone,
            selectedCountryObj: SelectedCountryObj,
            selectedPhoneObj: SelectedPhoneObj
        });
        setStep(4);
    };

    return (
        <>
            <div className="chechout__header">
                <h2 className="checkout__header-title">Where would you like your order sent?</h2>
            </div>
            <div className="chechout__nameForm">
                <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
                    <CountryPicker
                        type="Country"
                        setCountry={setCountry}
                        setCountryCode={setCountryCode}
                        setSelectedCountryObj={setSelectedCountryObj}
                        setSelectedPhoneObj={setSelectedPhoneObj}
                        defaultVal={SelectedCountryObj}
                    />
                    <div className="checkoutForm__field">
                        <TextField
                            width="100%"
                            style={{ width: "100%" }}
                            label="Address"
                            value={Address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div className="checkoutForm__field">
                        <TextField
                            style={{ width: "48%", marginRight: "4%" }}
                            label="City"
                            value={City}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                        <TextField
                            style={{ width: "48%" }}
                            label="Zip code"
                            value={ZipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            required
                        />
                    </div>

                    <div className="checkoutForm__field">
                        <CountryPicker
                            style={{ width: "36%", display: "inline-block", marginRight: "4%" }}
                            type="Country code"
                            setCountry={setCountry}
                            setCountryCode={setCountryCode}
                            setSelectedCountryObj={setSelectedCountryObj}
                            setSelectedPhoneObj={setSelectedPhoneObj}
                            defaultVal={SelectedPhoneObj}
                        />
                        <TextField
                            style={{ width: "60%" }}
                            label="Phone number"
                            value={Phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="checkout__button"
                        style={{ marginTop: "60px" }}
                    >
                        Proceed to payment
                    </button>
                </form>
            </div>
        </>
    );
}

export default WhereForm;
