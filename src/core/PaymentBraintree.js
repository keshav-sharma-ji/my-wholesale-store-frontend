import DropIn from "braintree-web-drop-in-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
import { getMeToken, processPayment } from "./helper/paymentBraintreeHelper";

const PaymentBraintree = ({
	products,
	setReload = (f) => f,
	reload = undefined,
}) => {
	const [info, setInfo] = useState({
		loading: false,
		success: false,
		clientToken: null,
		error: "",
		instance: {},
	});

	const userId = isAuthenticated() && isAuthenticated().user._id;
	const token = isAuthenticated() && isAuthenticated().token;

	const getToken = (userId, token) => {
		getMeToken(userId, token)
			.then((response) => {
				// console.log("INFORMATION", response);
				if (response.error) {
					setInfo({ ...info, error: response.error });
				} else {
					const clientToken = response.clientToken;
					setInfo({ clientToken });
				}
			})
			.catch(() => console.log("error in getting token"));
	};

	const onPurchase = () => {
		setInfo({ loading: true });
		let nonce;
		let getNonce = info.instance
			.requestPaymentMethod()
			.then((data) => {
				nonce = data.nonce;
				const paymentData = {
					paymentMethodNonce: nonce,
					amount: getAmount(),
				};
				processPayment(userId, token, paymentData)
					.then((response) => {
						setInfo({ ...info, success: response.success, loading: false });
						console.log("PAYMENT SUCCESS");
						const orderData = {
							products: products,
							transaction_id: response.transaction.id,
							amount: response.transaction.amount,
						};

						createOrder(userId, token, orderData)
							.then((response) => {
								if (response.error) {
									console.log(response.error);
								}
							})
							.catch(() => console.log("error in creating order"));

						cartEmpty(() => {
							console.log("Cart empty");
						});

						setReload(!reload);
					})
					.catch((err) => {
						setInfo({ loading: false, success: false });
						console.log("PAYMENT FAILED");
					});
			})
			.catch(() => console.log("error in requesting payment method"));
	};

	const getAmount = () => {
		let amount = 0;
		products &&
			products.map((p) => {
				amount = amount + p.price;
			});
		return amount;
	};

	const showBTDropIn = () => {
		return (
			<div>
				{info.clientToken !== null ? (
					<div>
						<DropIn
							options={{ authorization: info.clientToken }}
							onInstance={(instance) => (info.instance = instance)}
						/>
						<button className="btn btn-success col-12" onClick={onPurchase}>
							Buy
						</button>
					</div>
				) : (
					<h3>Please login</h3>
				)}
			</div>
		);
	};

	useEffect(() => {
		getToken(userId, token);
	}, []);

	return (
		<div>
			<h3>Your bill is $ {getAmount()}</h3>
			{showBTDropIn()}
		</div>
	);
};

export default PaymentBraintree;
