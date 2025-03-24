/**
 * ProductCard Component
 * 
 * This component displays individual product details, including:
 * - Product image with lazy loading and skeleton placeholder.
 * - Product title and price.
 * - A button to add the product to the cart.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.product - The product data.
 * @param {number} props.product.id - Unique identifier for the product.
 * @param {string} props.product.thumbnail - Image URL of the product.
 * @param {string} props.product.title - Title of the product.
 * @param {number} props.product.price - Price of the product.
 * 
 * @returns {JSX.Element} The rendered product card.
 */

import React, { useState } from 'react';
import AddToCartButton from '../../Common/AddToCartButton';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  /**
   * State to track if the product image has finished loading.
   * @type {boolean}
   */
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="product-card">
      {/* Skeleton loader displayed until image is fully loaded */}
      {!imageLoaded && <div className="image-skeleton"></div>}

      <Link className="link" to={`/products/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={`product-image ${imageLoaded ? 'visible' : 'hidden'}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        <h3 className="product-title">{product.title}</h3>
      </Link>

      <p className="product-price">${product.price}</p>

      {/* Button to add product to cart */}
      <AddToCartButton product={product} />
    </div>
  );
};

export default ProductCard;
