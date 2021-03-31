import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { deleteProduct, getAllProducts } from "./helper/adminapicall";

const ManageProducts = () => {
	const [products, setProducts] = useState([]);

	const { user, token } = isAuthenticated();

	const preload = () => {
		getAllProducts()
			.then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					setProducts(data);
				}
			})
			.catch(() => console.log("unable to preload"));
	};

	useEffect(() => {
		preload();
	}, []);

	const deleteThisProduct = (preoductId) => {
		deleteProduct(preoductId, user._id, token)
			.then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					preload();
				}
			})
			.catch(() => console.log("unable to delete"));
	};

	return (
		<Base title="Welcome admin" description="Manage products here">
			<Link className="btn btn-info mb-3" to={`/admin/dashboard`}>
				<span className="">Admin Home</span>
			</Link>
			<h2 className="mb-4">All products:</h2>
			<div className="row">
				<div className="col-12">
					<h2 className="text-center text-white my-3">
						Total {products.length} products
					</h2>

					{products &&
						products.map((product, index) => {
							return (
								<div key={index} className="row text-center mb-2 ">
									<div className="col-4">
										<h3 className="text-white text-left">{product.name}</h3>
									</div>
									<div className="col-4">
										<Link
											className="btn btn-success"
											to={`/admin/product/update/${product._id}`}
										>
											<span className="">Update</span>
										</Link>
									</div>
									<div className="col-4">
										<button
											//here we have used callback in onclick becuse deleteThisProduct requires parameter
											onClick={() => {
												deleteThisProduct(product._id);
											}}
											className="btn btn-danger"
										>
											Delete
										</button>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</Base>
	);
};

export default ManageProducts;
