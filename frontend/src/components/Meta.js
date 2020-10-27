import React from 'react';
import { Helmet } from 'react-helmet';
const Meta = ({ title, description }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'eShop: Best Electronics online store',
	description: 'We are one stop solution for electronic gadgets'
};

export default Meta;
