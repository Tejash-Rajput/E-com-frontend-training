import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchOrderByIDQuery } from '../../services/order';
import './order.scss';

/**
 * OrderDetail Component
 * Displays detailed information about a specific order, including total price,
 * total items, and a list of products in the order.
 *
 * @component
 * @returns {JSX.Element} The rendered OrderDetail component.
 */
const OrderDetail = () => {
  /** 
   * @constant {string} id - The ID of the order obtained from URL parameters.
   */
  const { id } = useParams();

  /**
   * Fetches order details using the provided order ID.
   * 
   * @property {Object} order - The fetched order data.
   * @property {Error} error - Error object if the request fails.
   * @property {boolean} isLoading - Loading state during the request.
   */
  const { data: order, error, isLoading } = useFetchOrderByIDQuery(id);
  console.log(order);

  if (isLoading) return <p>Loading order details...</p>;
  if (error) return <p>Error fetching order details.</p>;

  return (
    <div className="order-detail">
      <h2>Order Details</h2>
      
      {/** Order ID */}
      <h3>Order ID: {order.id}</h3>

      {/** Total price of the order */}
      <p>Total Price: ${order.totalPrice.toFixed(2)}</p>

      {/** Total number of items in the order */}
      <p>Total Items: {order.totalItems}</p>

      <div className="products-list">
        <h4>Products:</h4>

        {/** List of products in the order */}
        {order.cartItems.map((product) => (
          <div key={product.id} className="product-item">
            <p>
              <strong>{product.title}</strong>
            </p>
            <p>Quantity: {product.quantity}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetail;
