import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../../StateProvider";
import CountryPicker from "./CountryPicker";
import { auth, db } from "../../firebase";
import { useHistory } from "react-router-dom";

function PersonalInfo() {
    const history = useHistory();
    const [{ user }, dispatch] = useStateValue();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [countryCode, setCountryCode] = useState(0);
    const [phone, setPhone] = useState("");

    const [selectedCountryObj, setSelectedCountryObj] = useState({});
    const [selectedPhoneObj, setSelectedPhoneObj] = useState({});

    const [progress, setProgress] = useState("Update Information");

    useEffect(() => {
        db.collection("users").doc(user?.uid).get().then((doc) => {
            const profile = doc.data();
            profile?.firstName && setFirstName(profile.firstName);
            profile?.lastName && setLastName(profile.lastName);
            profile?.country && setCountry(profile.country);
            profile?.address && setAddress(profile.address);
            profile?.city && setCity(profile.city);
            profile?.zipCode && setZipCode(profile.zipCode);
            profile?.countryCode && setCountryCode(profile.countryCode);
            profile?.phone && setPhone(profile.phone);
            profile?.selectedCountryObj && setSelectedCountryObj(profile.selectedCountryObj);
            profile?.selectedPhoneObj && setSelectedPhoneObj(profile.selectedPhoneObj);
        });
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProgress("Saving Changes");
        db.collection("users").doc(user?.uid).update({
            firstName,
            lastName, 
            country, 
            address, 
            city, 
            zipCode, 
            countryCode, 
            phone,
            selectedCountryObj,
            selectedPhoneObj
        }).then(() => {
            setProgress("Changes Saved");
            setTimeout(() => {
                setProgress("Update Information");
            }, 1000);
        })
    }

    return (
        <div className="personalForm__wrapper">
            <form className="personalForm" onSubmit={e => handleSubmit(e)}>
                <div className="checkoutForm__field">
                    <TextField
                        style={{ width: "48%", marginRight: "4%" }}
                        id="standard-basic"
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        style={{ width: "48%" }}
                        id="standard-basic"
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="checkoutForm__field">
                    <CountryPicker
                        type="Country"
                        setCountry={setCountry}
                        setCountryCode={setCountryCode}
                        setSelectedCountryObj={setSelectedCountryObj}
                        setSelectedPhoneObj={setSelectedPhoneObj}
                        defaultVal={selectedCountryObj}
                    />
                </div>

                <div className="checkoutForm__field">
                    <TextField
                        width="100%"
                        style={{ width: "100%" }}
                        label="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="checkoutForm__field">
                    <TextField
                        style={{ width: "48%", marginRight: "4%" }}
                        label="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <TextField
                        style={{ width: "48%" }}
                        label="Zip code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </div>

                <div className="checkoutForm__field">
                    <CountryPicker
                        style={{ width: "30%", display: "inline-block", marginRight: "4%" }}
                        type="Country code"
                        setCountry={setCountry}
                        setCountryCode={setCountryCode}
                        setSelectedCountryObj={setSelectedCountryObj}
                        setSelectedPhoneObj={setSelectedPhoneObj}
                        defaultVal={selectedPhoneObj}
                    />
                    <TextField
                        style={{ width: "66%" }}
                        label="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <button type="submit" className="checkout__button" style={{ marginTop: "60px" }}>
                    {progress}
                </button>
                <button onClick={() => {auth.signOut(); history.push("/")}} className="checkout__button half-inverted" style={{width: "100%"}} >
                    Sign Out
                </button>
            </form>

            
        </div>
    );
}

export default PersonalInfo;
