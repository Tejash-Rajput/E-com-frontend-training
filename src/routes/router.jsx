import { createBrowserRouter } from 'react-router-dom';
import Signup from '../components/Signup/Signup';
import Login from '../components/Login/Login';
import App from '../App';
import Home from '../components/Home/Home';
import ProductPage from '../components/Home/Products/ProductPage';
import AllProductPage from '../components/Home/Products/AllProductPage';
import ShoppingCart from '../components/Cart/ShoppingCart';
import OrderPage from '../components/Orders/OrderPage';
import OrderDetail from '../components/Orders/OrderDetail';
import PrivateRoute from './PrivateRoute';

/**
 * Application routing configuration using React Router v6.
 * Defines routes for authentication, product listings, orders, and cart.
 *
 * @constant {object} router - Router object with path definitions.
 */
const router = createBrowserRouter([
  {
    path: '/', // Root path
    element: <App />, // Main App component as the layout
    children: [
      /**
       * Public Routes
       */
      {
        path: 'signup', // Signup page
        element: <Signup />,
      },
      {
        path: 'login', // Login page
        element: <Login />,
      },
      {
        path: '/', // Home page
        element: <Home />,
      },
      {
        path: '/products', // All products listing
        element: <AllProductPage />,
      },
      {
        path: 'products/:id', // Product detail page
        element: <ProductPage />,
      },

      /**
       * Private Routes (Require Authentication)
       */
      {
        path: '/orders', // Orders page (protected)
        element: (
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'orders/:id', // Order detail page (protected)
        element: (
          <PrivateRoute>
            <OrderDetail />
          </PrivateRoute>
        ),
      },
      {
        path: '/cart', // Shopping cart (protected)
        element: (
          <PrivateRoute>
            <ShoppingCart />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
