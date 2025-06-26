import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const sliderImages = [
  'https://img.freepik.com/free-vector/flat-design-minimal-boutique-template-design_23-2149319749.jpg?semt=ais_hybrid&w=740',
  'https://cdn.create.vista.com/downloads/da600043-4d5b-4da4-8494-ea792918c00f_1024.jpeg',
  'https://img.freepik.com/premium-psd/fashion-sales-social-media-facebook-cover-webinar-design_671392-877.jpg?semt=ais_hybrid&w=740',
  'https://img.freepik.com/free-vector/hand-drawn-fashion-collection-twitch-banner_23-2149985384.jpg?semt=ais_hybrid&w=740',
  'https://img.freepik.com/premium-psd/banner-fashion-instagram-social-media-template-post_647960-12.jpg?semt=ais_hybrid&w=740',
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center" style={{
      backgroundImage: "url('https://t4.ftcdn.net/jpg/05/96/62/65/360_F_596626503_jrzjZNYStDexiWxQFqO7oCh6M8PdMlJs.jpg')",
    }}>
      <div className="bg-white bg-opacity-80 min-h-screen">

        {/* Hero Image Slider */}
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-700 w-full h-[250px] md:h-[450px]" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {sliderImages.map((img, index) => (
              <img key={index} src={img} className="w-full object-cover flex-shrink-0" alt={`Slide ${index}`} />
            ))}
          </div>
        </div>

        {/* Category Grid */}
        <div className="mt-10 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
          {[
            {
              label: 'Men',
              image: 'https://c.ndtvimg.com/2023-06/b261peug_mahesh_625x300_10_June_23.jpg',
              path: '/Men',
            },
            {
              label: 'Women',
              image: 'https://d2line.com/thatlook/wp-content/uploads/sites/4/2022/09/V-neck-Blouses.png',
              path: '/Women',
            },
            {
              label: 'Kids',
              image: 'https://c8.alamy.com/comp/MH80GB/little-preschool-boys-cute-children-dressed-in-vintage-style-clothes-eating-ice-cream-urban-scene-MH80GB.jpg',
              path: '/Kids',
            },
            {
              label: 'Traditional Wear',
              image: 'https://cdn.prod.website-files.com/637f32081b68888e6d1bdd50/655f2320328403655766a90b_Himachali%20women%20and%20men%20in%20traditional%20attire.jpg',
              path: '/Traditionalwear',
            },
          ].map(({ label, image, path }) => (
            <div key={label} onClick={() => navigate(path)} className="cursor-pointer text-center hover:scale-105 transition">
              <img src={image} alt={label} className="rounded-lg h-52 w-full object-cover" />
              <h3 className="mt-2 font-bold text-xl text-gray-700">{label}</h3>
            </div>
          ))}
        </div>

        {/* Why Shop With Us Section */}
        <div className="mt-16 px-6 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Shop With Us?</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                title: 'Fast Delivery',
                desc: 'Get your order within 2–5 business days with real-time tracking.',
                icon: 'https://cdn-icons-png.flaticon.com/512/1048/1048941.png',
              },
              {
                title: 'Affordable Pricing',
                desc: 'Trendy styles that don’t break the bank – shop smart, look great.',
                icon: 'https://cdn-icons-png.flaticon.com/512/1965/1965624.png',
              },
              {
                title: '24/7 Support',
                desc: 'Need help? Our team is available round-the-clock via email or chat.',
                icon: 'https://cdn-icons-png.flaticon.com/512/597/597177.png',
              },
              {
                title: 'Easy Returns',
                desc: 'Not satisfied? Enjoy hassle-free 7-day replacement or refund options.',
                icon: 'https://cdn-icons-png.flaticon.com/512/753/753345.png',
              },
            ].map(({ title, desc, icon }, index) => (
              <div key={index} className="rounded-xl p-6 hover:shadow-xl transition relative overflow-hidden cursor-pointer group">
                <div className={`absolute inset-0 opacity-70 group-hover:opacity-100 transition-opacity duration-700 ${[
                  'bg-gradient-to-r from-pink-400 via-red-500 to-yellow-400',
                  'bg-gradient-to-r from-green-400 via-teal-500 to-blue-500',
                  'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500',
                  'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600',
                ][index]}`} />
                <div className="relative z-10 text-white">
                  <img src={icon} alt={title} className="h-14 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold">{title}</h4>
                  <p className="text-sm mt-2">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
