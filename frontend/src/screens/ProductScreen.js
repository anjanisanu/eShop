import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import Rating from './../components/Rating';
import Loader from './../components/Loader';
import Message from './../components/Message';
import { listProductDetails, createProductReview } from './../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = ({ history, match }) => {
	const [ qty, setQty ] = useState(1);
	const [ rating, setRating ] = useState(0);
	const [ comment, setComment ] = useState('');

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productCreateReview = useSelector((state) => state.productCreateReview);
	const { error: errorProductReview, success: successProductReview } = productCreateReview;

	useEffect(
		() => {
			if (successProductReview) {
				alert('Review Submitted');
				setRating(0);
				setComment('');

				dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
			}

			dispatch(listProductDetails(match.params.id));
		},
		[ match, dispatch, successProductReview ]
	);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	const submitReviewHandler = (e) => {
		e.preventDefault();
		dispatch(createProductReview(match.params.id, { rating, comment }));
	};

	return (
		<Fragment>
			<Link to='/' className='btn btn-light my-3'>
				Go back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Fragment>
					<Row>
						<Col md={6}>
							<Image src={product.image} alt={product.name} fluid />
						</Col>

						<Col md={3}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating value={product.rating} text={`${product.numReviews} Reviews`} />
								</ListGroup.Item>
								<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
								<ListGroup.Item>Description: {product.description}</ListGroup.Item>
							</ListGroup>
						</Col>

						<Col md={3}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Price</Col>
										<Col>${product.price}</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<Row>
										<Col>Stock</Col>
										<Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
									</Row>
								</ListGroup.Item>

								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col>
												<Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
													{[ ...Array(product.countInStock).keys() ].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button
										onClick={addToCartHandler}
										className='btn-block'
										type='button'
										disabled={product.countInStock === 0}>
										Add To Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>

					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							{product.name && product.review.length === 0 && <Message>No Reviews</Message>}

							<ListGroup variant='flush'>
								{product.name &&
									product.review.map((r) => (
										<ListGroup.Item key={r._id}>
											<strong>{r.name}</strong>
											<Rating value={r.rating} />
											<p>{r.createdAt.substring(0, 10)}</p>
											<p>{r.comment}</p>
										</ListGroup.Item>
									))}

								<ListGroup.Item>
									<h2>Write a review</h2>
									{errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
									{userInfo ? (
										<Form onSubmit={submitReviewHandler}>
											<Form.Group controlId='rating'>
												<Form.Label>Rating</Form.Label>
												<Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
													<option value=''>Select</option>
													<option value='1'>1- Poor</option>
													<option value='2'>2- Fair</option>
													<option value='3'>3- Good</option>
													<option value='4'>4- Very Good</option>
													<option value='5'>5- Excellent</option>
												</Form.Control>
											</Form.Group>

											<Form.Group controlId='comment'>
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as='textarea'
													row='3'
													value={comment}
													onChange={(e) => setComment(e.target.value)}
												/>
											</Form.Group>
											<Button type='submit' variant='primary'>
												Submit
											</Button>
										</Form>
									) : (
										<Message>
											Please <Link to='/login'>login</Link> to review
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</Fragment>
			)}
		</Fragment>
	);
};

export default ProductScreen;
