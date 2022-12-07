import {
	PRODUCT_FAIL,
	PRODUCT_REQUEST,
	PRODUCT_SUCCESS,
	ADD_PRODUCT_REQUEST,
	ADD_PRODUCT_SUCCESS,
	ADD_PRODUCT_FAIL,
	PRODUCT_SINGLE_FAIL,
	PRODUCT_SINGLE_REQUEST,
	PRODUCT_SINGLE_SUCCESS,
	PRODUCT_SINGLE_RESET,
	EDIT_PRODUCT_REQUEST,
	EDIT_PRODUCT_SUCCESS,
	EDIT_PRODUCT_FAIL,
	ADD_PRODUCT_REVIEW_FAIL,
	ADD_PRODUCT_REVIEW_SUCCESS,
	ADD_PRODUCT_REVIEW_REQUEST,
	ADD_PRODUCT_REVIEW_RESET,
	TOP_PRODUCT_REQUEST,
	TOP_PRODUCT_SUCCESS,
	TOP_PRODUCT_FAIL,
} from "../constants/productConstants";

export const getProductReducer = (state = { products: null }, action) => {
	switch (action.type) {
		case PRODUCT_REQUEST:
			return {
				loading: true,
			};
		case PRODUCT_SUCCESS:
			return {
				loading: false,
				products: action.payload,
			};
		case PRODUCT_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const getTopProductReducer = (state = { products: null }, action) => {
	switch (action.type) {
		case TOP_PRODUCT_REQUEST:
			return {
				loading: true,
			};
		case TOP_PRODUCT_SUCCESS:
			return {
				loading: false,
				products: action.payload,
			};
		case TOP_PRODUCT_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const addProductReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_PRODUCT_REQUEST:
			return {
				loading: true,
			};
		case ADD_PRODUCT_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case ADD_PRODUCT_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const getSingleProductReducer = (state = { product: null }, action) => {
	switch (action.type) {
		case PRODUCT_SINGLE_REQUEST:
			return {
				loading: true,
			};
		case PRODUCT_SINGLE_SUCCESS:
			return {
				loading: false,
				product: action.payload,
			};
		case PRODUCT_SINGLE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case PRODUCT_SINGLE_RESET:
			return {};
		default:
			return state;
	}
};

export const editProductReducer = (state = {}, action) => {
	switch (action.type) {
		case EDIT_PRODUCT_REQUEST:
			return {
				loading: true,
			};
		case EDIT_PRODUCT_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case EDIT_PRODUCT_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const addProductReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_PRODUCT_REVIEW_REQUEST:
			return {
				loading: true,
			};
		case ADD_PRODUCT_REVIEW_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case ADD_PRODUCT_REVIEW_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case ADD_PRODUCT_REVIEW_RESET:
			return {};
		default:
			return state;
	}
};
