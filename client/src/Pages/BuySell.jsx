import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BuyerCards from "../components/BuyerCards";
import { FiSearch } from "react-icons/fi"; // Search icon

const BuySell = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleNavigateToSell = () => {
    navigate("/sell");
  };

  const handleNavigateToSearch = () => {
    navigate("/search");
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-white">
      <h1 className="text-4xl font-bold text-center py-8">Buy & Sell</h1>

      <div className="w-10/12">
        {/* Search Bar */}
        <div className="mt-6 w-full flex justify-center">
          <div
            className="p-4 bg-[#191919] text-white rounded-md shadow-md flex items-center gap-4"
            style={{ width: "80%" }} // Reduced width
          >
            <div className="flex items-center gap-2 w-full">
              <FiSearch size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className={`w-full p-4 text-white bg-[#191919] rounded-md resize-none focus:outline-none transition-all duration-300`}
                onChange={handleSearch}
              />
            </div>
            <button
              onClick={handleNavigateToSearch}
              className="px-6 py-2 border-2 border-transparent text-white rounded-md focus:outline-none transition-all duration-300 hover:border-white hover:shadow-md hover:shadow-white/50"
            >
              Search
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <BuyerCards searchTerm={searchTerm} />
        </div>
      </div>

      {/* Interactive Section with new text and styled button */}
      <div className="mt-8 flex justify-center items-center w-full text-center">
        <span className="text-lg font-semibold">
          Didn't use any item for long and planning for selling?
        </span>
        {/* Add margin left to create space between the text and button */}
        <button
          onClick={handleNavigateToSell}
          className="ml-4 px-6 py-2 border-2 border-transparent text-white rounded-md focus:outline-none transition-all duration-300 hover:border-red-500 hover:shadow-md hover:shadow-red-500/50"
        >
          Click here
        </button>
      </div>
    </div>
  );
};

export default BuySell;
