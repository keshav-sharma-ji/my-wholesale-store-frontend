import React, { useEffect, useState } from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import PaymentBraintree from "./PaymentBraintree";

const Cart = () => {
	const [products, setProducts] = useState([]);

	const [reload, setReload] = useState(false);

	useEffect(() => {
		setProducts(loadCart());
	}, [reload]);

	const loadAllProducts = (products) => {
		return (
			<div className="text-center">
				<h2>This section is to load products</h2>
				{products &&
					products.map((product, index) => {
						return (
							<Card
								key={index}
								product={product}
								addtoCart={false}
								removeFromCart={true}
								setReload={setReload}
								reload={reload}
							/>
						);
					})}
			</div>
		);
	};

	// const loadCheckout = () => {
	// 	return (
	// 		<div>
	// 			<h2>This section is to checkout</h2>
	// 		</div>
	// 	);
	// };

	return (
		<Base title="Cart Page" description="Ready to checkout">
			<div className="row">
				<div className="col-6">
					{products && products.length > 0 ? (
						loadAllProducts(products)
					) : (
						<h3>No product in cart</h3>
					)}
				</div>
				<div className="col-6">
					<PaymentBraintree products={products} setReload={setReload} />
				</div>
			</div>
		</Base>
	);
};

export default Cart;
