import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import Meta from './../components/Meta';
import ProductCarousel from './../components/ProductCarousel';
import Product from './../components/Product';
import Message from './../components/Message';
import Loader from './../components/Loader';
import Paginate from './../components/Paginate';
import { listProducts } from './../actions/productActions';

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;

	useEffect(
		() => {
			dispatch(listProducts(keyword, pageNumber));
		},
		[ dispatch, keyword, pageNumber ]
	);

	return (
		<Fragment>
			<Meta />
			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link to='/' className='btn btn-light'>
					Go Back
				</Link>
			)}
			<h1>{!keyword ? 'Latest Products' : `Search Results for ${keyword}`}</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Fragment>
					{products.length === 0 && <p>Oops! No Orders found.</p>}
					<Row>
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
				</Fragment>
			)}
		</Fragment>
	);
};

export default HomeScreen;
