import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from './../components/FormContainer';
import CheckoutSteps from './../components/CheckoutSteps';
import { saveShippingAddress } from './../actions/cartActions';

const ShippingScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [ address, setAddress ] = useState(shippingAddress.address);
	const [ city, setCity ] = useState(shippingAddress.city);
	const [ postalCode, setPostalCode ] = useState(shippingAddress.postalCode);
	const [ country, setCountry ] = useState(shippingAddress.country);

	const dispatch = useDispatch();

	const onSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		history.push('/payment');
	};
	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<Form onSubmit={onSubmitHandler}>
				<h1>Shipping</h1>
				<Form.Group controlId='address'>
					<Form.Label>Address</Form.Label>
					<Form.Control
						type='text'
						placeholder='Address'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group controlId='city'>
					<Form.Label>City</Form.Label>
					<Form.Control type='text' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
				</Form.Group>

				<Form.Group controlId='postalCode'>
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type='text'
						placeholder='Postal Code'
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId='country'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						type='text'
						placeholder='Country'
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					/>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Continue to checkout
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;