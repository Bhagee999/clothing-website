import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function SearchBar({ products }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
      setDropdownVisible(false);
      return;
    }
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
    setDropdownVisible(filtered.length > 0);
  }, [searchQuery, products]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    navigate(`/products?search=${encodeURIComponent(trimmed)}`);
    setDropdownVisible(false);
  };

  const handleSelectProduct = (id) => {
    navigate(`/product/${id}`);
    setDropdownVisible(false);
    setSearchQuery("");
  };

  return (
    <div className="relative w-72">
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center bg-gray-500 rounded-full px-4 py-2 w-full"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="bg-transparent outline-none w-full text-sm text-white placeholder-white"
          onFocus={() => {
            if (filteredProducts.length > 0) setDropdownVisible(true);
          }}
        />
        <button type="submit">
          <FaSearch className="text-white ml-2 cursor-pointer" />
        </button>
      </form>

      {isDropdownVisible && (
        <ul
          ref={dropdownRef}
          className="absolute z-50 bg-white w-full max-h-60 overflow-y-auto rounded-md shadow-lg mt-1 text-gray-900"
        >
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              onClick={() => handleSelectProduct(product.id)}
              className="px-4 py-2 hover:bg-indigo-600 hover:text-white cursor-pointer"
            >
              {product.name}
            </li>
          ))}
          {filteredProducts.length === 0 && (
            <li className="px-4 py-2 text-gray-500">No products found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
