import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4 py-10">
      <div className="max-w-6xl w-full bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-lg p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-pink-600 text-center">
          Contact Us
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Details */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Customer Support</h2>
            <ul className="space-y-3 text-gray-700">
              <li>
                <strong>Phone:</strong>{" "}
                <a href="tel:+91123456789" className="text-pink-500 hover:underline">
                  +91 123456789
                </a>
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:4U@Brands.com" className="text-pink-500 hover:underline">
                  4U@Brands.com
                </a>
              </li>
              <li>
                <strong>Address:</strong><br />
                123 Fashion Street,<br />
                Mumbai, Maharashtra, India
              </li>
              <li>
                <strong>Working Hours:</strong><br />
                Mon - Sat, 10:00 AM - 7:00 PM
              </li>
            </ul>
          </div>

          {/* Store Location Map */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Visit Our Store</h2>
            <div className="w-full h-64 sm:h-72 md:h-80 rounded-md overflow-hidden shadow-md border">
              <iframe
                title="Store Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.123456789012!2d72.8777!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ceaad4efab6b%3A0xaba1234567890cdef!2sFashion%20Street%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1686067890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
