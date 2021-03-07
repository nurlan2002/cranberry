import React, { useReducer } from "react";

const initialState = {
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    city: "",
    zipCode: "",
    countryCode: 0,
    phone: "",
    selectedCountryObj: {},
    selectedPhoneObj: {}
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_EMAIL": return { ...state, email: action.email };
        case "SET_FIRSTNAME": return { ...state, firstName: action.firstName };
        case "SET_LASTNAME": return { ...state, lastName: action.lastName };
        case "SET_COUNTRY": return { ...state, country: action.country };
        case "SET_ADDRESS": return { ...state, address: action.address };
        case "SET_CITY": return { ...state, city: action.city };
        case "SET_ZIPCODE": return { ...state, zipCode: action.zipCode };
        case "SET_COUNTRYCODE": return { ...state, countryCode: action.countryCode };
        case "SET_PHONE": return { ...state, phone: action.phone };
        case "SET_SELECTEDCOUNTRYOBJ": return { ...state, selectedCountryObj: action.selectedCountryObj };
        case "SET_SELECTEDPHONEOBJ": return { ...state, selectedPhoneObj: action.selectedPhoneObj };
        case "SET_WHERE":
            return {
                ...state,
                phone: action.phone,
                countryCode: action.countryCode,
                zipCode: action.zipCode,
                city: action.city,
                address: action.address,
                country: action.country,
            };
        default:
            return state;
    }
};
export const CheckoutContext = React.createContext({});
export const MyCheckoutContext = ({ children }) => {
    const [state, dispatchAction] = useReducer(reducer, initialState);
    return <CheckoutContext.Provider value={[state, dispatchAction]}>{children}</CheckoutContext.Provider>;
};
