import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";

// Carousel images
const carouselImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbq8BVaLsbKLjWrDQ9WO1S8Ez4G2YSUBQ1gQk8PEPIcCQGrOc_rb8uO8TEwbjCgt928g&usqp=CAU",
  "https://ambraee.com/cdn/shop/files/1999_copy_64ebe455-1b6d-4d96-abe6-b70b80eb47d1.png?v=1747808623&width=1600",
  "https://cms.landmarkshops.in/cdn-cgi/image/w=1232,q=85,fit=cover/LS-Fest/LS-new/desktop-dept-modularblock-oneBytwo1A-Women-11Jun25.jpg",
];

const womenItems = [
  {
    id: 301,
    name: "Elegant Evening Dress",
    price: 2999,
    image: "https://www.omsara.co.uk/wp-content/uploads/IMG_2609.jpeg",
  },
  {
    id: 302,
    name: "Casual Summer Top",
    price: 999,
    image: "https://i.ytimg.com/vi/k0cyjhoA3i8/maxresdefault.jpg",
  },
  {
    id: 303,
    name: "Stylish Jeans",
    price: 1499,
    image: "https://5.imimg.com/data5/SELLER/Default/2022/12/NC/HT/AK/17003214/1895-ice-1-500x500.jpeg",
  },
  {
    id: 304,
    name: "Classic Blazer",
    price: 2499,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMiiXYNw9f_KovgogmH8ZGmlRSWD7r_JmTDw&s",
  },
  {
    id: 305,
    name: "Floral Skirt",
    price: 1299,
    image: "https://i.etsystatic.com/25472123/r/il/8ccc40/2923726977/il_570xN.2923726977_dxdy.jpg",
  },
  {
    id: 306,
    name: "Cozy Sweater",
    price: 1199,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5IHANTvBMQNvi6ny_RTt3k09tRYZNmJLE8M-UestZbFDw3JMhIl9T8gK4vsJjZv0qXmE&usqp=CAU",
  },
];

const sizes = ["S", "M", "L", "XL"];

const Women = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 p-4">
      {/* Image Carousel */}
      <div className="relative w-screen h-[500px] overflow-hidden mb-10">
        <img
          src={carouselImages[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className="w-full h-full object-cover transition-all duration-500"
        />
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600"
        >
          ◀
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600"
        >
          ▶
        </button>
      </div>

      {/* Content */}
      <div className="p-10">
        <h2 className="text-4xl font-bold text-center text-pink-600 mb-10">
          👗 Women’s Collection
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {womenItems.map((item) => {
            const selectedSize = selectedSizes[item.id];
            const quantity = getQuantity(item.id, selectedSize);

            return (
              <div
                key={item.id}
                className="bg-white p-5 rounded-xl shadow-xl border border-pink-300 hover:shadow-2xl transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[350px] object-contain rounded-md bg-white"
                />
                <h3 className="mt-4 text-xl font-bold text-pink-700">{item.name}</h3>
                <p className="text-gray-700 mb-3 font-semibold">₹ {item.price}</p>

                {/* Size Dropdown */}
                <label className="block mb-2 font-semibold text-gray-700">
                  Select Size:
                  <select
                    value={selectedSize || ""}
                    onChange={(e) => handleSizeChange(item.id, e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2"
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

                {/* Cart Buttons */}
                {quantity === 0 ? (
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={!selectedSize}
                    className={`mt-2 w-full ${
                      selectedSize
                        ? "bg-pink-400 text-white hover:bg-pink-500"
                        : "bg-pink-200 text-gray-400 cursor-not-allowed"
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
                      className="bg-red-300 hover:bg-red-400 text-white px-4 py-2 rounded-full font-bold"
                    >
                      −
                    </button>
                    <span className="text-lg font-bold text-pink-700">
                      {quantity}
                    </span>
                    <button
                      onClick={() => addToCart({ ...item, size: selectedSize })}
                      className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-full font-bold"
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
    </div>
  );
};

export default Women;
