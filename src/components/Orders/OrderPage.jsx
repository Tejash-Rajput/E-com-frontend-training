import React from 'react';
import { useFetchOrdersQuery } from '../../services/order';
import { Link } from 'react-router-dom';
import './order.scss';

/**
 * OrderPage Component
 * Displays a list of recent orders with total price, total items,
 * and a link to view order details.
 *
 * @component
 * @returns {JSX.Element} The rendered OrderPage component.
 */
const OrderPage = () => {
  /**
   * Fetches a list of orders using RTK Query.
   * 
   * @property {Array} orders - The list of fetched orders.
   * @property {Error} error - Error object if the request fails.
   * @property {boolean} isLoading - Loading state during the request.
   */
  const { data: orders, error, isLoading } = useFetchOrdersQuery();

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders!</p>;

  return (
    <div className="order-page">
      <h2>Recent Orders</h2>

      {/** Display message if no orders are found */}
      {orders?.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        /** List of orders */
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              {/** Order ID */}
              <h4>Order ID: {order.id}</h4>

              {/** Total price of the order */}
              <p>Total Price: ${order.totalPrice.toFixed(2)}</p>

              {/** Total number of items in the order */}
              <p>Total Items: {order.totalItems}</p>

              {/** Link to view order details */}
              <Link to={`/orders/${order.id}`} className="view-details-btn">
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderPage;
