import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
	product,
	addtoCart = true,
	removeFromCart = false,
	setReload = (f) => f, //function(f){return f}
	reload = undefined,
}) => {
	const [redirect, setRedirect] = useState(false);
	const [count, setCount] = useState(product.count);

	const cardTitle = product ? product.name : "Default name";
	const cardDescription = product ? product.description : "Default description";
	const cardPrice = product ? product.price : "Default price";

	const addToCart = () => {
		return addItemToCart(product, () => setRedirect(true));
	};

	const getARedirect = (redirect) => {
		if (redirect) {
			return <Redirect to="/cart/" />;
		}
	};

	const showAddToCart = (addtoCart) => {
		return (
			addtoCart && (
				<button
					onClick={addToCart}
					className="btn col-12 btn-outline-success mt-2 mb-2"
				>
					Add To Cart
				</button>
			)
		);
	};

	const showRemoveFromCart = (removeFromCart) => {
		return (
			removeFromCart && (
				<button
					onClick={() => {
						removeItemFromCart(product._id);
						setReload(!reload);
					}}
					className="btn col-12 btn-outline-danger mt-2 mb-2"
				>
					Remove from cart
				</button>
			)
		);
	};

	return (
		<div className="card text-white bg-dark border border-info ">
			<div className="card-header lead">{cardTitle}</div>
			<div className="card-body">
				{getARedirect(redirect)}
				<ImageHelper product={product} />
				<p className="lead bg-success font-weight-normal text-wrap">
					{cardDescription}
				</p>
				<p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
				<div className="row">
					<div className="col-12">{showAddToCart(addtoCart)}</div>
					<div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
