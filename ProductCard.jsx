import React from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProductsPage = ({ allProducts }) => {
  const query = useQuery();
  const searchTerm = query.get("search") || "";

  // Filter products by search term
  const filtered = allProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl mb-4">Search results for "{searchTerm}"</h2>
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found matching your search.</p>
      )}
    </div>
  );
};

export default ProductsPage;
