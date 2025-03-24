import React, { useEffect } from 'react';
import { useGetProductsQuery } from '../services/products';
const ProductList = () => {
	const { data, error, isLoading } = useGetProductsQuery('');
	useEffect(() => {
		console.log(data);
	}, [data]);

	return <div></div>;
};

export default ProductList;
