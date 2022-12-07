import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	REMOVE_ALL_FROM_CART,
} from "../constants/cartConstant";

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			const item = action.payload;
			const existItem = state.cartItems.find((x) => x.product === item.product);
			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((x) =>
						x.product === item.product ? item : x
					),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}
		case REMOVE_FROM_CART:
			const id = action.payload;
			const items = state.cartItems.filter((x) => x.product !== id);
			return {
				...state,
				cartItems: items,
			};
		case REMOVE_ALL_FROM_CART:
			return {};
		default:
			return state;
	}
};
