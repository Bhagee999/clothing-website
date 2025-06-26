import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";

const carouselImages = [
  "https://siyafashion.com/cdn/shop/files/7_1600x.png?v=1725014653",
  "https://medias.utsavfashion.com/media/wysiwyg/promotions/2020/2702/deals-on-ethnic-styles_02.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIOuWd3FJdwL9jyiSIG_t8_ENfB2hotYRvsA&s",
];

const traditionalItems = [
  {
    id: 501,
    name: "Silk Saree",
    price: 3499,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqq4tKObjEEImmERQ8wzZZRS8NuA0HMHw-OA&s",
  },
  {
    id: 502,
    name: "Men's Kurta Pajama",
    price: 1999,
    image:
      "https://wholetex.sgp1.cdn.digitaloceanspaces.com/full/navratri-vol-3-cotton-gamthi-traditional-work-kurta-pajama-961.jpg",
  },
  {
    id: 503,
    name: "Lehenga Choli",
    price: 4999,
    image: "https://clothsvilla.com/cdn/shop/products/1308_1024x1024.jpg?v=1697303038",
  },
  {
    id: 504,
    name: "Sherwani Set",
    price: 5999,
    image:
      "https://cdn0.weddingwire.in/article/0438/3_2/1280/jpg/118340-wedding-sherwani-designs-1.jpeg",
  },
  {
    id: 505,
    name: "Anarkali Dress",
    price: 2899,
    image:
      "https://ladybaazar.com/cdn/shop/files/Milky_White_Lucknowi_Embroidered_Georgette_Anarkali_Suit5.jpg?v=1719214484",
  },
  {
    id: 506,
    name: "Pathani Suit",
    price: 2499,
    image: "https://i.ytimg.com/vi/Bn307Mhy9gM/maxresdefault.jpg",
  },
];

const sizes = ["S", "M", "L", "XL", "XXL"];

const TraditionalWear = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-white to-rose-100 p-4">
      {/* Carousel */}
      <div className="relative w-full h-[400px] overflow-hidden mb-10">
        <img
          src={carouselImages[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className="w-full h-full object-cover transition-all duration-500"
        />
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-amber-400 text-white p-2 rounded-full hover:bg-amber-500"
        >
          ◀
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-amber-400 text-white p-2 rounded-full hover:bg-amber-500"
        >
          ▶
        </button>
      </div>

      {/* Title */}
      <h2 className="text-4xl font-bold text-center text-amber-700 mb-10">
        🪔 Traditional Wear Collection
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-10 pb-10">
        {traditionalItems.map((item) => {
          const selectedSize = selectedSizes[item.id];
          const quantity = getQuantity(item.id, selectedSize);

          return (
            <div
              key={item.id}
              className="bg-white p-5 rounded-xl shadow-xl border border-amber-300 hover:shadow-2xl transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[300px] object-contain rounded-md mb-4"
              />
              <h3 className="text-xl font-bold text-amber-800">{item.name}</h3>
              <p className="text-gray-700 mb-3 font-semibold">₹ {item.price}</p>

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

              {quantity === 0 ? (
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={!selectedSize}
                  className={`mt-2 w-full ${
                    selectedSize
                      ? "bg-amber-500 text-white hover:bg-amber-600"
                      : "bg-amber-200 text-gray-400 cursor-not-allowed"
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
                  <span className="text-lg font-bold text-amber-800">
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

export default TraditionalWear;
