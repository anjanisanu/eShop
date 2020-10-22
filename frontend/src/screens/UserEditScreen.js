import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from './../components/Loader';
import FormContainer from './../components/FormContainer';
import { getUserDetails, updateUser } from './../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = ({ match, history }) => {
	const userId = match.params.id;

	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ isAdmin, setIsAdmin ] = useState(false);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdate = useSelector((state) => state.userUpdate);
	const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

	useEffect(
		() => {
			if (successUpdate) {
				dispatch({ type: USER_UPDATE_RESET });
				history.push('/admin/userlist');
			} else {
				if (!user || user._id !== userId) {
					dispatch(getUserDetails(userId));
				} else {
					setName(user.name);
					setEmail(user.email);
					setIsAdmin(user.isAdmin);
				}
			}
		},
		[ history, dispatch, user, userId, successUpdate ]
	);

	const onSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(updateUser({ _id: userId, name, email, isAdmin }));
	};

	return (
		<Fragment>
			<Link to='/admin/userlist' className='btn btn-light my-3'>
				Go Back
			</Link>

			<FormContainer>
				<h1>Update User</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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

						<Form.Group controlId='email'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId='isAdmin'>
							<Form.Check
								type='checkbox'
								label='isAdmin'
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
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

export default UserEditScreen;
