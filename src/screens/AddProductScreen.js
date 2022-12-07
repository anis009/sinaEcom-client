import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import axios from "axios";
import { addProduct } from "../actions/productActions";

const AddProductScreen = () => {
	const [editorState, setEditorState] = React.useState(() =>
		EditorState.createEmpty()
	);
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [countInStock, setcountInStock] = useState(0);
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [uploading, setUploading] = useState(false);
	const [nameTouch, setNameTouch] = useState(false);
	const [priceTouch, setPriceTouch] = useState(false);
	const [brandTouch, setBrandTouch] = useState(false);
	const [categoryTouch, setCategoryTouch] = useState(false);
	const [descriptionTouch, setDescriptionTouch] = useState(false);
	const [countInStockTouch, setCountInStockTouch] = useState(false);

	const nameIsValid = name.trim() !== "";
	const brandIsValid = brand.trim() !== "";
	const categoryIsValid = category.trim() !== "";
	const descriptionIsValid = description.trim() !== "";
	const priceIsValid = price !== 0;
	const countInStockIsValid = countInStock !== 0;
	const nameIsInvalid = !nameIsValid && nameTouch;

	const categoryIsInvalid = !categoryIsValid && categoryTouch;
	const brandIsInvalid = !brandIsValid && brandTouch;
	const descriptionIsInvalid = !descriptionIsValid && descriptionTouch;
	const priceIsInvalid = !priceIsValid && priceTouch;
	const countInStockIsInvalid = !countInStockIsValid && countInStockTouch;

	const fileRef = useRef();

	let formIsValid = false;
	if (
		nameIsValid &&
		brandIsValid &&
		categoryIsValid &&
		descriptionIsValid &&
		priceIsValid &&
		countInStock
	) {
		formIsValid = true;
	} else {
		formIsValid = false;
	}
	const navigate = useNavigate();
	const userSignup = useSelector((state) => state.userSignup);
	const { userInfo } = userSignup;

	const addproduct = useSelector((state) => state.addProduct);
	const { loading, success, error } = addproduct;

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			addProduct({
				name,
				price,
				description,
				countInStock,
				brand,
				category,
				user: userInfo._id,
				image: [{ name: image }],
			})
		);
		setName("");
		setPrice("");
		setCategory("");
		setDescription("");
		setcountInStock("");
		setBrand("");
		fileRef.value = "";
	};
	const nameBlurHandler = (e) => {
		setNameTouch(true);
	};

	const brandBlurHandler = (e) => {
		setBrandTouch(true);
	};
	const categoryBlurHandler = (e) => {
		setCategoryTouch(true);
	};

	const priceBlurHandler = (e) => {
		setPriceTouch(true);
	};

	const descriptionBlurHandler = (e) => {
		setDescriptionTouch(true);
	};

	const countInStockBlurHandler = (e) => {
		setCountInStockTouch(true);
	};

	const nameChange = (e) => {
		setName(e.target.value);
	};

	const imageChange = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("image", file);
		setUploading(true);
		try {
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};
			const { data } = await axios.post(
				"http://localhost:7070/api/upload",
				formData,
				config
			);
			setImage(data);
			console.log(data);
			setUploading(false);
		} catch (err) {
			console.error(err);
			setUploading(false);
		}
	};
	const countInStockChange = (e) => {
		setcountInStock(e.target.value);
	};
	const brandChange = (e) => {
		setBrand(e.target.value);
	};
	const categoryChange = (e) => {
		setCategory(e.target.value);
	};
	const priceChange = (e) => {
		setPrice(e.target.value);
	};
	const descriptionChange = (e) => {
		setDescription(e.target.value);
	};
	const classesName =
		!nameIsInvalid &&
		!brandIsInvalid &&
		!categoryIsInvalid &&
		!descriptionIsInvalid &&
		!priceIsInvalid
			? "form-controls"
			: "form-controls invalid";
	console.log(editorState);
	return (
		<form action="" onSubmit={submitHandler}>
			<div style={{ display: "flex", justifyContent: "center" }}>
				{loading && <Loader />}
			</div>
			{error && <Message color="danger">{error}</Message>}
			{success && (
				<Message color="success"> product is added successfully </Message>
			)}
			<div className={classesName}>
				<label htmlFor="name">product name</label>
				<input
					type="text"
					id="name"
					onChange={nameChange}
					value={name}
					onBlur={nameBlurHandler}
				/>
				{nameIsInvalid && <p className="error-text">Name must not be empty.</p>}
			</div>
			<div className={classesName}>
				<label htmlFor="brand">Brand</label>
				<input
					type="text"
					id="brand"
					onChange={brandChange}
					value={brand}
					onBlur={brandBlurHandler}
				/>
				{brandIsInvalid && (
					<p className="error-text">Brand must not be empty.</p>
				)}
			</div>

			<div className={classesName}>
				<label htmlFor="category">Category</label>
				<input
					type="text"
					id="category"
					onChange={categoryChange}
					value={category}
					onBlur={categoryBlurHandler}
				/>
				{nameIsInvalid && (
					<p className="error-text">category must not be empty.</p>
				)}
			</div>
			<div className={classesName}>
				<label htmlFor="price">price</label>
				<input
					type="number"
					id="category"
					onChange={priceChange}
					value={price}
					onBlur={priceBlurHandler}
				/>
				{priceIsInvalid && (
					<p className="error-text">price must not be empty.</p>
				)}
			</div>

			<div className={classesName}>
				<label htmlFor="description">description</label>
				<textarea
					type="text"
					id="description"
					onChange={descriptionChange}
					value={description}
					onBlur={descriptionBlurHandler}
					cols={20}
				/>
				{descriptionIsInvalid && (
					<p className="error-text">description must not be empty.</p>
				)}
			</div>

			<div className={classesName}>
				<label htmlFor="countInStock">countInStock</label>
				<input
					type="number"
					id="category"
					onChange={countInStockChange}
					value={countInStock}
					onBlur={countInStockBlurHandler}
				/>
				{countInStockIsInvalid && (
					<p className="error-text">countInStock must not be empty.</p>
				)}
			</div>

			<div className={classesName}>
				<label htmlFor="image">image</label>
				<input
					type="file"
					id="image"
					ref={fileRef}
					onChange={imageChange}
					cols={20}
				/>
			</div>

			<div>
				<Editor editorState={editorState} onChange={setEditorState} />
			</div>

			<div className="add-product-btn-box">
				<button type="submit" disabled={!formIsValid}>
					Add product
				</button>
			</div>
		</form>
	);
};

export default AddProductScreen;
