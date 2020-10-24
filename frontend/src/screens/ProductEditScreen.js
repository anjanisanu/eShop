import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails } from '../actions/productActions';

const ProductEditScreen = ({ match, history }) => {
	const productId = match.params.id;

	const [ name, setName ] = useState('');
	const [ price, setPrice ] = useState(0);
	const [ image, setImage ] = useState('');
	const [ brand, setBrand ] = useState('');
	const [ category, setCategory ] = useState('');
	const [ countInStock, setCountInStock ] = useState(0);
	const [ description, setDescription ] = useState('');

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	// const userUpdate = useSelector((state) => state.userUpdate);
	// const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

	useEffect(
		() => {
			if (!product || product._id !== productId) {
				dispatch(listProductDetails(productId));
			} else {
				setName(product.name);
				setPrice(product.price);
				setImage(product.image);
				setBrand(product.brand);
				setCategory(product.category);
				setCountInStock(product.countInStock);
				setDescription(product.description);
			}
		},
		[ history, dispatch, product, productId ]
	);

	const onSubmitHandler = (e) => {
		e.preventDefault();
		//UPDATE PROD
	};

	return (
		<Fragment>
			<Link to='/admin/productlist' className='btn btn-light my-3'>
				Go Back
			</Link>

			<FormContainer>
				<h1>Update Product</h1>
				{/* {loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={onSubmitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId='price'>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter Price'
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId='image'>
							<Form.Control
								type='text'
								placeholder='Enter Image URL'
								value={image}
								onChange={(e) => setImage(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId='brand'>
							<Form.Label>Brand</Form.Label>
							<Form.Control type='text' placeholder='Brand' value={brand} onChange={(e) => setBrand(e.target.value)} />
						</Form.Group>

						<Form.Group controlId='category'>
							<Form.Label>Category</Form.Label>
							<Form.Control
								type='text'
								placeholder='Category'
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId='countInStock'>
							<Form.Label>Count in Stock</Form.Label>
							<Form.Control
								type='number'
								placeholder='Count in Stock'
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId='description'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								type='text'
								placeholder='Description'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Form.Group>

						<Button type='submit' variant='primary'>
							Save
						</Button>
					</Form>
				)}
			</FormContainer>
		</Fragment>
	);
};

export default ProductEditScreen;
