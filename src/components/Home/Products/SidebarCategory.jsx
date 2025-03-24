import React, { useEffect, useState } from 'react';
import { useGetProductsQuery } from '../../../services/products';
import '../scss/product.scss';

/**
 * SidebarCategory Component
 * Renders a sidebar with category filters for products.
 * Allows users to select or deselect categories to filter the product list.
 *
 * @param {Object} props - Component props.
 * @param {Array<string>} props.selectedCategories - List of currently selected categories.
 * @param {Function} props.setSelectedCategories - Function to update selected categories.
 *
 * @returns {JSX.Element} The rendered SidebarCategory component.
 */
const SidebarCategory = ({ selectedCategories, setSelectedCategories }) => {
  // Fetch products data using RTK Query
  const { data, error, isLoading } = useGetProductsQuery('');
  
  // State to hold unique product categories
  const [categories, setCategories] = useState([]);

  /**
   * useEffect Hook
   * Extracts unique categories from product data when available.
   */
  useEffect(() => {
    if (data) {
      const uniqueCategories = [...new Set(data.map((p) => p.category))];
      setCategories(uniqueCategories);
    }
  }, [data]);

  /**
   * Handle category selection toggle.
   *
   * @param {string} category - The category to toggle.
   */
  const handleCheckboxChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // Remove category if already selected
        : [...prev, category] // Add category if not selected
    );
  };

  // Handle error state
  if (error) return <h1>Error loading products</h1>;

  return (
    <div className="sidebar-category">
      {isLoading ? (
        // Skeleton loader during loading state
        <div className="skeleton">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="skeleton-item"></div>
          ))}
        </div>
      ) : (
        // Render category list with checkboxes
        <div className="category-list">
          {categories.map((category, index) => (
            <label key={index}>
              <input
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCheckboxChange(category)}
              />
              {category}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarCategory;
