import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from './../components/FormContainer';
import CheckoutSteps from './../components/CheckoutSteps';
import { savePaymentMethod } from './../actions/cartActions';

const PaymentScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress) history.push('/shipping');

	const [ paymentMethod, setPaymentMethod ] = useState('PayPal');

	const dispatch = useDispatch();

	const onSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};
	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<Form onSubmit={onSubmitHandler}>
				<h1>Payment Method</h1>
				<Form.Group>
					<Form.Label as='legend'>Select Payment Method</Form.Label>

					<Col>
						<Form.Check
							type='radio'
							label='Paypal or Credit Card'
							id='PayPal'
							name='paymentMethod'
							value='PayPal'
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						/>
					</Col>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Continue to checkout
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
