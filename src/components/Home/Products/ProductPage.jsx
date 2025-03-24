import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../../services/products';
import '../scss/product.scss';
import AddToCartButton from '../../Common/AddToCartButton';

/**
 * ProductPage Component
 * Displays detailed information about a single product.
 *
 * @returns {JSX.Element} The rendered product page component.
 */
const ProductPage = () => {
  // Extract product ID from URL parameters
  const { id } = useParams();

  // Fetch product data by ID using RTK Query
  const { data: product, error, isLoading } = useGetProductByIdQuery(id);

  // State to track image loading status
  const [imageLoaded, setImageLoaded] = useState(false);

  // Handle loading and error states
  if (error) return <h1 className="error">Error loading product</h1>;
  if (isLoading) return <h1 className="loading">Loading...</h1>;

  return (
    <div className="product-page">
      {/* Image Skeleton Loader */}
      {!imageLoaded && <div className="image-skeleton"></div>}

      {/* Product Image */}
      <img
        src={product.thumbnail}
        alt={product.title}
        className={`product-image ${imageLoaded ? 'visible' : 'hidden'}`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
      />

      <div className="product-info">
        {/* Product Title */}
        <h1 className="product-title">{product.title}</h1>

        {/* Product Brand */}
        <h2 className="product-brand">Brand: {product.brand}</h2>

        {/* Product Description */}
        <p className="description">{product.description}</p>

        {/* Product Price and Discount */}
        <p className="price">
          ${product.price}{' '}
          <span className="discount">-{product.discountPercentage}%</span>
        </p>

        {/* Product Rating */}
        <p className="rating">⭐ {product.rating} / 5</p>

        {/* Product Tags */}
        <div className="tags">
          {product.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Add to Cart Button */}
        <AddToCartButton />
      </div>
    </div>
  );
};

export default ProductPage;
