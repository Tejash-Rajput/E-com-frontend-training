import React, { useState } from 'react';
import { useGetProductsQuery } from '../../../services/products';
import ProductCard from '../Products/ProductCard';
import '../scss/product.scss';

/**
 * ProductList Component
 * Renders a list of products with search, category filtering, and pagination.
 *
 * @param {Object} props - Component props.
 * @param {Array<string>} props.selectedCategories - Selected categories to filter products.
 * @returns {JSX.Element} The rendered component.
 */
const ProductList = ({ selectedCategories }) => {
  // Fetch products using RTK Query
  const { data, error, isLoading } = useGetProductsQuery('');

  // State for search term input
  const [searchTerm, setSearchTerm] = useState('');

  // State for current page in pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Number of products to show per page
  const productsPerPage = 10;

  // Handle loading and error states
  if (error) return <h1>Error loading products</h1>;
  if (isLoading) return <h1>Loading...</h1>;

  /**
   * Handles the search input change.
   *
   * @param {Object} event - The input change event.
   */
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  /**
   * Filters products based on selected categories.
   * If no categories are selected, returns all products.
   */
  let filteredProducts = selectedCategories.length
    ? data?.filter((product) => selectedCategories.includes(product.category))
    : data;

  /**
   * Filters products further based on search term.
   */
  if (searchTerm) {
    filteredProducts = filteredProducts?.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Total number of pages for pagination
  const totalPages = Math.ceil(filteredProducts?.length / productsPerPage);

  // Calculate start index for paginated products
  const startIndex = (currentPage - 1) * productsPerPage;

  // Get products for the current page
  const paginatedProducts = filteredProducts?.slice(startIndex, startIndex + productsPerPage);

  /**
   * Handles page change for pagination.
   *
   * @param {number} newPage - The new page number.
   */
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="prod-list">
      {/* Search Input */}
      <div className="search-container">
        <input
          name="search"
          type="text"
          placeholder="Search by product name"
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {paginatedProducts?.length > 0 ? (
          paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-products">
            <h3>No products found</h3>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            className="pagination-button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pagination-button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;


// import React, { useState } from 'react';
// import { useGetProductsQuery } from '../../../services/products';
// import ProductCard from '../Products/ProductCard';
// import '../scss/product.scss';

// const ProductList = ({ selectedCategories }) => {
// 	const { data, error, isLoading } = useGetProductsQuery('');
// 	const [searchTerm, setSearchTerm] = useState('');

// 	if (error) return <h1>Error loading products</h1>;
// 	if (isLoading) return <h1>Loading...</h1>;

// 	// Handle search input change
// 	const handleSearchChange = (event) => {
// 		setSearchTerm(event.target.value);
// 	};

// 	// Filter products based on category selection
// 	let filteredProducts = selectedCategories.length
// 		? data?.filter((product) => selectedCategories.includes(product.category))
// 		: data;

// 	// Further filter based on search input
// 	if (searchTerm) {
// 		filteredProducts = filteredProducts?.filter((product) =>
// 			product.title.toLowerCase().includes(searchTerm.toLowerCase())
// 		);
// 	}

// 	return (
// 		<div className="prod-list">
// 			<div className="search-container">
// 				<input
// 					name="search"
// 					type="text"
// 					placeholder="Search by product name"
// 					className="search-input"
// 					value={searchTerm}
// 					onChange={handleSearchChange}
// 				/>
// 			</div>
// 			<div className="product-grid">
// 				{filteredProducts?.length > 0 ? (
// 					filteredProducts.map((product) => (
// 						<ProductCard key={product.id} product={product} />
// 					))
// 				) : (
// 					<div className="no-products">
// 						<h3>No products found</h3>
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default ProductList;
