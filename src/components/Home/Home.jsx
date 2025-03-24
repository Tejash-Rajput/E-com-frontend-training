/**
 * Home Component
 * 
 * This component serves as the landing page displaying a grid of products. 
 * It fetches product data using RTK Query and shows:
 * - A grid of the first 8 product cards.
 * - A button to navigate to the full product listing page.
 * 
 * @component
 */

import React from 'react';
import ProductCard from '../Home/Products/ProductCard';
import '../../components/Home/scss/product.scss';
import { useGetProductsQuery } from '../../services/products';
import { Link } from 'react-router-dom';

const Home = () => {
  // Fetch product data using RTK Query
  const { data, error, isLoading } = useGetProductsQuery('');

  // Handle error state
  if (error) return <h1>Error loading products</h1>;

  // Handle loading state
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      {/* Product Grid Section */}
      <div className="product-grid">
        {data?.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Button to View All Products */}
      <div className="all-product">
        <Link to="/products">
          <button className="allprod-btn">All Products</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
