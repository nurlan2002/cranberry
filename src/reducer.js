import { getIntialState, persistState } from "./persist-state";

export const initialState = {
    basket: getIntialState("basket", []),
    wishlist: getIntialState("wishlist", []),
    user: null,
    loading: false,
};

// Selector
export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_BASKET":
            for (var i = 0; i < state.basket.length; ++i) {
                if (state.basket[i].id === action.item.id) {
                    if (state.basket[i].size === action.item.size) {
                        state.basket[i].quantity += 1;
                        persistState("basket", state.basket);

                        return state;
                    }
                }
            }
            persistState("basket", [...state.basket, action.item]);
            return {
                ...state,
                basket: [...state.basket, action.item],
            };

        case "INCREMENT":
            for (var i = 0; i < state.basket.length; ++i) {
                if (state.basket[i].id === action.item.id) {
                    if (state.basket[i].size === action.item.size) {
                        state.basket[i].quantity += 1;
                        persistState("basket", state.basket);
                        return state;
                    }
                }
            }
            return state;

        case "DECREMENT":
            for (var i = 0; i < state.basket.length; ++i) {
                if (state.basket[i].id === action.item.id) {
                    if (state.basket[i].size === action.item.size) {
                        state.basket[i].quantity -= 1;
                        persistState("basket", state.basket);
                        return state;
                    }
                }
            }
            return state;

        case "EMPTY_BASKET":
            persistState("basket", []);
            return {
                ...state,
                basket: [],
            };

        case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];

            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not in basket!`
                );
            }
            persistState("basket", newBasket);
            return {
                ...state,
                basket: newBasket,
            };

        case "ADD_TO_WISHLIST":
            persistState("wishlist", [...state.wishlist, action.item]);
            return {
                ...state,
                wishlist: [...state.wishlist, action.item],
            };

        case "REMOVE_FROM_WISHLIST":
            const indexWishlist = state.wishlist.findIndex(
                (item) => item.id === action.id
            );
            let newWishlist = [...state.wishlist];

            if (indexWishlist >= 0) {
                newWishlist.splice(indexWishlist, 1);
            } else {
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not in wishlist!`
                );
            }
            persistState("wishlist", newWishlist);
            return {
                ...state,
                wishlist: newWishlist,
            };

        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };

        case "SET_LOADING":
            return {
                ...state,
                loading: action.loading,
            };

        default:
            return state;
    }
};

export default reducer;
