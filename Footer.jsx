import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        
        <div>
          <h2 className="text-2xl font-bold text-orange-400 mb-4">4U Brands</h2>
          <p className="text-sm text-gray-400">
            Trendy fashion for Men, Women, and Kids. Discover style, comfort, and quality.
          </p>
        </div>

        
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
            <li><Link to="/men" className="hover:text-orange-400">Men</Link></li>
            <li><Link to="/women" className="hover:text-orange-400">Women</Link></li>
            <li><Link to="/kids" className="hover:text-orange-400">Kids</Link></li>
            <li><Link to="/cart" className="hover:text-orange-400">Cart</Link></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-orange-400">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-orange-400">FAQ</Link></li>
            <li><Link to="/returns" className="hover:text-orange-400">Returns</Link></li>
            <li><Link to="/privacy" className="hover:text-orange-400">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-orange-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-orange-400"><FaTwitter /></a>
            <a href="#" className="hover:text-orange-400"><FaInstagram /></a>
            <a href="#" className="hover:text-orange-400"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 border-t border-gray-700 py-4">
        &copy; {new Date().getFullYear()} 4U Brands. All rights reserved.
      </div>
    </footer>
  );
}