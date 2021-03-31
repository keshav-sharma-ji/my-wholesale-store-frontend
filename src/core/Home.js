import React, { useEffect, useState } from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
	const [products, setProducts] = useState([]);

	const [error, setError] = useState(false);

	const loadAllProducts = () => {
		return getProducts()
			.then((data) => {
				if (data.error) {
					setError(data.error);
				} else {
					setProducts(data);
				}
			})
			.catch(() => console.log("error in loading all products"));
	};

	useEffect(() => {
		loadAllProducts();
	}, []);

	return (
		<Base title="Home Page" description="Welcome to my store">
			<div className="row text-center">
				<h1 className="text-white">All of Items</h1>
				<div className="row">
					{products &&
						products.map((product, index) => {
							return (
								<div key={index} className="col-4 mb-4">
									<Card product={product} />
								</div>
							);
						})}
				</div>
			</div>
		</Base>
	);
};

export default Home;
