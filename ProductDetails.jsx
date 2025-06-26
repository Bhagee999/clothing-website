import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = ({ allProducts }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the product by id (id from URL is string, so convert to number)
  const product = allProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 object-cover rounded"
        />

        <div className="flex flex-col justify-between">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-indigo-600 font-semibold mb-4">
            ${product.price}
          </p>
          <p className="text-gray-700 mb-6">
            {/* Add product description here if available */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            aliquet, justo vitae convallis dignissim, nulla augue dignissim
            nulla, at facilisis quam enim at lacus.
          </p>

          <button
            onClick={() => alert(`Added "${product.name}" to cart!`)}
            className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
