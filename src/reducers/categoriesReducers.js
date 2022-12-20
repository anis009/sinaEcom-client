import {
	GET_CATEGORIES_FAIL,
	GET_CATEGORIES_REQUEST,
	GET_CATEGORIES_SUCCESS,
} from "../constants/CategoriesConstant";

export const getAllCategoriesReducer = (state = { categories: [] }, action) => {
	switch (action.type) {
		case GET_CATEGORIES_REQUEST:
			return {
				loading: true,
			};
		case GET_CATEGORIES_SUCCESS:
			return {
				loading: false,
				categories: action.payload,
			};
		case GET_CATEGORIES_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
