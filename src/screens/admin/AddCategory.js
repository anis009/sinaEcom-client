import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import "./addCategory.css";
const AddCategory = () => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm();
	const onSubmit = async (data) => {
		console.log(data);
		const image = data?.image[0];
		const name = data?.name;
		const formData = new FormData();
		formData.append("image", image);
		console.log(image);
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
			if (!data) {
				alert("Image doesn't upload\n try again");
				return;
			}
			const createImage = {
				image: data,
				name: name,
			};
			const createdData = (
				await axios.post("http://localhost:7070/api/category", createImage, {
					"Content-Type": "application/json",
				})
			).data;
			console.log(createdData);
			if (createdData) {
				toast.success("Created Category");
				reset();
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form
			className="category__form__container"
			onSubmit={handleSubmit(onSubmit)}
		>
			{/* register your input into the hook by invoking the "register" function */}
			<h1>Create category</h1>
			<div className="pt-4">
				<input defaultValue="" {...register("name", { required: true })} />
				{errors.name && <p className="errors my-2">This field is required</p>}
			</div>

			<div className="pt-4">
				<input
					type="file"
					{...register("image", {
						required: "Image is required",
					})}
				/>
				{errors.image && (
					<p className="errors my-2">{errors.image?.message} </p>
				)}
			</div>

			<div className="my-2 pt-2">
				<input type="submit" />
			</div>
		</form>
	);
};

export default AddCategory;
