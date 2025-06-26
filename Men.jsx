import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";

const carouselImages = [
  "https://static.vecteezy.com/system/resources/previews/047/017/954/non_2x/yellow-minimalist-men-s-fashion-facebook-cover-editor_template.jpeg",
  "https://img.freepik.com/premium-psd/fashion-sale-social-media-facebook-cover-banner-template-design_636037-121.jpg",
  "https://media.centrepointstores.com/i/centrepoint/Web_HP_En_vacay_men_9jun?$banimg-d-rb$&$quality-standard$&fmt=auto",
];

const menItems = [
  {
    id: 401,
    name: "Classic Men's Shirt",
    price: 1599,
    image: "https://thehouseofrare.com/cdn/shop/files/OTAGOBLACK__OTAGOBLACK__0.jpg?v=1743586832",
  },
  {
    id: 402,
    name: "Denim Jeans",
    price: 1999,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrH7204srUiYA_eiyY-n1seshX3zcXd2nSXA&s",
  },
  {
    id: 403,
    name: "Casual T-Shirt",
    price: 799,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNF-MTDnHntd6UOCx_Y3TANkZhRc3C6XTrmA&s",
  },
  {
    id: 404,
    name: "Leather Jacket",
    price: 3999,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzLGvFnJizeacDgnIB2CC52ahjuPsy9RamFQ&s",
  },
  {
    id: 405,
    name: "Formal Blazer",
    price: 3499,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD-fLe8r_pF-WRq-Etl4w1NC10E-0KqLrkfA&s",
  },
  {
    id: 406,
    name: "Sweatshirt",
    price: 1299,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7e1QXwGZNCmq1igV0ib1AaD7C1e-2ywFNrQ&s",
  },
];

const sizes = ["S", "M", "L", "XL", "XXL"];

const Men = () => {
  const { cartItems, addToCart, decreaseQuantity } = useContext(CartContext);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getQuantity = (id, size) => {
    const item = cartItems.find((i) => i.id === id && i.size === size);
    return item ? item.quantity : 0;
  };

  const handleSizeChange = (id, size) => {
    setSelectedSizes((prev) => ({ ...prev, [id]: size }));
  };

  const handleAddToCart = (item) => {
    const size = selectedSizes[item.id];
    if (!size) {
      alert("Please select a size before adding to cart.");
      return;
    }
    addToCart({ ...item, size });
  };

  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 min-h-screen bg-gradient-to-br from-blue-100 via-white to-gray-200">
      {/* Carousel */}
      <div className="relative mb-10 w-full max-w-screen-xl mx-auto">
        <img
          src={carouselImages[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className="w-full h-[220px] sm:h-[300px] md:h-[400px] object-cover rounded-xl shadow-md transition-all duration-500"
        />
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-3 sm:left-6 transform -translate-y-1/2 bg-blue-600 text-white p-2 sm:p-3 rounded-full hover:bg-blue-700"
        >
          ◀
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-3 sm:right-6 transform -translate-y-1/2 bg-blue-600 text-white p-2 sm:p-3 rounded-full hover:bg-blue-700"
        >
          ▶
        </button>
      </div>

      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-10">
        👔 Men’s Collection
      </h2>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {menItems.map((item) => {
          const selectedSize = selectedSizes[item.id];
          const quantity = getQuantity(item.id, selectedSize);

          return (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl border border-blue-200 transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-60 object-contain mb-4 rounded-md bg-white"
              />
              <h3 className="text-lg sm:text-xl font-bold text-blue-800">{item.name}</h3>
              <p className="text-gray-700 font-semibold mb-3">₹ {item.price}</p>

              <label className="block mb-2 font-medium text-gray-700">
                Size:
                <select
                  value={selectedSize || ""}
                  onChange={(e) => handleSizeChange(item.id, e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" disabled>
                    -- Select Size --
                  </option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </label>

              {quantity === 0 ? (
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={!selectedSize}
                  className={`mt-2 w-full ${
                    selectedSize
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-blue-200 text-gray-400 cursor-not-allowed"
                  } py-2 rounded-full font-bold transition`}
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex justify-center items-center mt-3 gap-4">
                  <button
                    onClick={() =>
                      decreaseQuantity({ ...item, size: selectedSize })
                    }
                    className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-full font-bold"
                  >
                    −
                  </button>
                  <span className="text-lg font-bold text-blue-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => addToCart({ ...item, size: selectedSize })}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-bold"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Men;
