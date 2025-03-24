/**
 * AllProductPage Component
 * 
 * This component represents the page displaying all products.
 * It includes:
 * - A sidebar for category filtering.
 * - A product list that updates based on selected categories.
 * 
 * @component
 */

import React, { useState } from 'react';
import ProductList from './ProductList';
import SidebarCategory from './SidebarCategory';

const AllProductPage = () => {
  /**
   * State to track selected categories for filtering products.
   * @type {Array<string>}
   */
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <div className="allprod-page">
      {/* Sidebar for Category Selection */}
      <aside className="sidebar">
        <SidebarCategory 
          selectedCategories={selectedCategories} 
          setSelectedCategories={setSelectedCategories} 
        />
      </aside>

      {/* Product List Section */}
      <section className="product-list">
        <ProductList selectedCategories={selectedCategories} />
      </section>
    </div>
  );
};

export default AllProductPage;
