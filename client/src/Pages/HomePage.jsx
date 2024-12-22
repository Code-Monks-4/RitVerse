import React, { useState, useEffect } from "react";

const Homepage = () => {
  const banners = [
    "https://via.placeholder.com/800x300?text=Banner+1",
    "https://via.placeholder.com/800x300?text=Banner+2",
    "https://via.placeholder.com/800x300?text=Banner+3",
    "https://via.placeholder.com/800x300?text=Banner+4",
    "https://via.placeholder.com/800x300?text=Banner+5",
    "https://via.placeholder.com/800x300?text=Banner+6",
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  // Automatic banner change every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const handleNext = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const handlePrevious = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative w-full min-h-auto bg-transparent text-white">
      {/* Banner Section */}
      <div className="relative w-10/12 mx-auto mt-6">
        <div className="relative w-full rounded-lg overflow-hidden">
          <img
            src={banners[currentBanner]}
            alt={`Banner ${currentBanner + 1}`}
            className="w-full rounded-lg transition-transform duration-500 ease-in-out"
          />
          {/* Navigation Arrows (Removed on medium and below screens) */}
          <button
            onClick={handlePrevious}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 p-4 rounded-full hover:bg-black/70 border-transparent backdrop-blur-md hidden md:block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white hover:text-blue-500"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 p-4 rounded-full hover:bg-black/70 border-transparent backdrop-blur-md hidden md:block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white hover:text-blue-500"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        {/* Indicator Divs */}
        <div className="flex justify-center mt-4">
          {banners.map((_, index) => (
            <div
              key={index}
              className={`h-3 w-3 mx-1 rounded-full transition-all duration-500 ${
                currentBanner === index ? "bg-blue-500" : "bg-gray-500"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-10/12 mx-auto mt-12">
        {/* Card 1 - Buy and Sell */}
        <div className="bg-[#191919] p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:-translate-y-1 h-96 flex flex-col justify-between">
          <h3 className="text-2xl font-semibold mb-3">Buy and Sell</h3>
          <p className="text-sm text-gray-400 mb-6">
            Buy and sell items easily through our platform. Whether it's used
            electronics, furniture, or rare collectibles, find everything you
            need or sell your items quickly. Enjoy seamless transactions with
            trusted buyers and sellers.
          </p>
          <a
            href="#"
            className="text-white text-lg hover:text-blue-500 transition-all duration-300"
          >
            Learn more
          </a>
        </div>

        {/* Card 2 - Lost and Found */}
        <div className="bg-[#191919] p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:-translate-y-1 h-96 flex flex-col justify-between">
          <h3 className="text-2xl font-semibold mb-3">Lost and Found</h3>
          <p className="text-sm text-gray-400 mb-6">
            Lost something important? Or found an item? Our Lost and Found
            section helps you reunite with lost belongings. Just post a quick
            description and our community will help you track it down. Stay
            connected and safe with us!
          </p>
          <a
            href="#"
            className="text-white text-lg hover:text-blue-500 transition-all duration-300"
          >
            Learn more
          </a>
        </div>

        {/* Card 3 - Connect */}
        <div className="bg-[#191919] p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:-translate-y-1 h-96 flex flex-col justify-between">
          <h3 className="text-2xl font-semibold mb-3">Connect</h3>
          <p className="text-sm text-gray-400 mb-6">
            Connect with like-minded individuals, mentors, and professionals
            in your area. Whether you're looking for advice, networking, or
            opportunities, our Connect section helps you find the right people
            to collaborate with.
          </p>
          <a
            href="#"
            className="text-white text-lg hover:text-blue-500 transition-all duration-300"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
