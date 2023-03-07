import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import axios from "axios";
import { addProduct } from "../../actions/productActions";
import "./addProductScreen.css";
import { getCategories } from "../../actions/categoriesAction";
import { toast } from "react-hot-toast";

const AddProductScreen = () => {
	const [editorState, setEditorState] = React.useState(() =>
		EditorState.createEmpty()
	);
	const [file, setFile] = useState("");
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
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

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
	const AllCategories = useSelector((state) => state.categories);
	const { userInfo } = userSignup;
	const { categories } = AllCategories;

	const addproduct = useSelector((state) => state.addProduct);
	const { loading, success, error } = addproduct;

	console.log(category);

	const submitHandler = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("image", file);

		try {
			// const config = {
			// 	headers: {
			// 		"Content-Type": "multipart/form-data",
			// 	},
			// };
			// const { data } = await axios.post(
			// 	"https://sina-ecom-server.vercel.app/api/upload",
			// 	formData,
			// 	config
			// );

			const imageHostKey = process.env.REACT_APP_imgbb_key;
			const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
			const imgData = (await axios.post(url, formData)).data;
			console.log(imgData);
			if (!imgData?.success) {
				alert("Image doesn't upload\n try again");
				return;
			}
			dispatch(
				addProduct({
					name,
					price,
					description,
					countInStock,
					brand,
					category,
					user: userInfo._id,
					image: [{ name: imgData?.data?.url }],
				})
			);
			console.log({ success });
			if (success) {
				setName("");
				setPrice("");
				setCategory("");
				setDescription("");
				setBrand("");
				setcountInStock("");
				setNameTouch(false);
				setPriceTouch(false);
				setCountInStockTouch(false);
				setDescriptionTouch(false);
				setBrandTouch(false);
				toast.success("product added");
			}
		} catch (err) {
			console.error(err);
		}
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
		setFile(e.target.files[0]);
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
		<form onSubmit={submitHandler} className="addproduct__container my-4">
			<h1>Create Product</h1>
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
					className="w-100"
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
					className="w-100"
					onBlur={brandBlurHandler}
				/>
				{brandIsInvalid && (
					<p className="error-text">Brand must not be empty.</p>
				)}
			</div>

			<div className={classesName}>
				<label htmlFor="category">Category</label>
				{/* <input
					type="text"
					id="category"
					onChange={categoryChange}
					value={category}
					className="w-100"
					onBlur={categoryBlurHandler}
				/> */}
				<select
					id="category"
					onChange={categoryChange}
					value={category}
					className="w-100 py-2"
					onBlur={categoryBlurHandler}
				>
					<option value="" className="pl-2">
						select category
					</option>
					{categories &&
						categories.length > 0 &&
						categories?.map(({ name }, index) => (
							<option value={name} key={index} className="pl-2">
								{name}
							</option>
						))}
				</select>
				{nameIsInvalid && (
					<p className="error-text">category must not be empty.</p>
				)}
			</div>
			<div className={classesName}>
				<label htmlFor="price">price</label>
				<input
					type="number"
					id="category"
					className="w-100"
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
					rows={10}
					className="w-100"
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
					className="w-100"
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
					className="w-100"
					onChange={imageChange}
					cols={20}
				/>
			</div>

			<div>
				<Editor editorState={editorState} onChange={setEditorState} />
			</div>

			<div className="add-product-btn-box mt-2 mb-3">
				<button type="submit" disabled={!formIsValid}>
					Add product
				</button>
			</div>
		</form>
	);
};

export default AddProductScreen;
