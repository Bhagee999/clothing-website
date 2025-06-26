import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";

const carouselImages = [
  "https://as1.ftcdn.net/jpg/04/41/95/14/1000_F_441951434_5nxdPbKXap3KQ7vNpX562vGCL73McRVE.jpg",
  "https://marketplace.canva.com/EAFIMHQ5yhE/1/0/1600w/canva-orange-and-teal-summer-sale-kids-fashion-bright-website-banner-L6kUMOWkkho.jpg",
  "https://static.vecteezy.com/system/resources/thumbnails/041/417/220/small_2x/fashion-sale-horizontal-banner-with-discount-offer-advertisement-with-colorful-sketches-of-various-clothing-items-illustration-vector.jpg",
];

const kidsItems = [
  {
    id: 201,
    name: "Kids Hoodie",
    price: 899,
    image: "https://thebanyantee.com/cdn/shop/files/kids-hoodie-2-gray-melange.jpg?v=1721906574&width=1445",
  },
  {
    id: 202,
    name: "Cartoon T-Shirt",
    price: 699,
    image: "https://down-sg.img.susercontent.com/file/03e8687000cd55f76411dc2b7da39fdc",
  },
  {
    id: 203,
    name: "Shorts",
    price: 499,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV2-ngljeNc3YwVPb2stJH-JSpjnm_QrI1JqtULYMvzvMd4mgzBP3jy1jqrCCfUaFOPX8&usqp=CAU",
  },
  {
    id: 204,
    name: "Kids Jacket",
    price: 1299,
    image: "https://cdn.shopify.com/s/files/1/0826/7084/6244/files/Leather_Jacket_Styles_for_Kids_1024x1024.webp?v=1703598906",
  },
  {
    id: 205,
    name: "Kids Dress",
    price: 1099,
    image: "https://www.cutedoll.in/cdn/shop/files/003_2_copy_1200x.jpg?v=1715855400",
  },
  {
    id: 206,
    name: "Kids Sweater",
    price: 799,
    image: "https://i0.wp.com/blog.tincanknits.com/wp-content/uploads/2021/10/sweetshopsweater-tck-3694-web.jpg?resize=1165%2C777&ssl=1",
  },
];

const sizes = ["1 year", "2 years", "3 years", "4 years", "5 years"];

const Kids = () => {
  const { cartItems, addToCart, decreaseQuantity } = useContext(CartContext);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-blue-100 py-8 px-4 sm:px-6 lg:px-12">
      {/* Carousel */}
      <div className="relative w-full h-64 sm:h-80 md:h-[400px] overflow-hidden rounded-lg mb-10">
        <img
          src={carouselImages[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className="w-full h-full object-cover transition duration-500 rounded-lg"
        />
        <button
          onClick={() =>
            setCurrentSlide((prev) =>
              prev === 0 ? carouselImages.length - 1 : prev - 1
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-500"
        >
          ◀
        </button>
        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-500"
        >
          ▶
        </button>
      </div>

      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-yellow-600 mb-10">
        🧒 Kids’ Zone
      </h2>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {kidsItems.map((item) => {
          const selectedSize = selectedSizes[item.id];
          const quantity = getQuantity(item.id, selectedSize);

          return (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-5 hover:shadow-xl transition duration-300 border"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-contain rounded-md mb-4 bg-white"
              />
              <h3 className="text-xl font-bold text-blue-700 mb-1">{item.name}</h3>
              <p className="text-gray-700 font-semibold mb-3">₹ {item.price}</p>

              <label className="block mb-2 font-medium text-gray-700">
                Select Size:
                <select
                  value={selectedSize || ""}
                  onChange={(e) => handleSizeChange(item.id, e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                >
                  <option value="" disabled>
                    -- Choose Age --
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
                  className={`mt-4 w-full py-2 rounded-full font-semibold ${
                    selectedSize
                      ? "bg-yellow-400 text-black hover:bg-yellow-500"
                      : "bg-yellow-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center justify-center gap-4 mt-4">
                  <button
                    onClick={() =>
                      decreaseQuantity({ ...item, size: selectedSize })
                    }
                    className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg"
                  >
                    −
                  </button>
                  <span className="text-lg font-bold text-blue-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => addToCart({ ...item, size: selectedSize })}
                    className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 rounded-full font-bold text-lg"
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

export default Kids;
