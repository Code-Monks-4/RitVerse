import React, { useState } from "react";

const Sell = () => {
  const [formData, setFormData] = useState({
    photo: null,
    name: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Product listed for sale!");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: "var(--bg-color)" }}>
      <div className="absolute top-0 left-0 w-full h-full bg-[#0d0d0d]"></div>
      <div className="absolute z-10 flex justify-center items-center w-full h-full">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-lg shadow-2xl w-full sm:w-[400px] border-[2px] border-gray-300 transform transition-transform duration-700 hover:scale-105" style={{ backgroundColor: "var(--object-bg)" }}>
          <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: "var(--text-color)" }}>Sell Your Product</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label className="block mb-2" style={{ color: "var(--text-color)" }}>Upload Photo</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-gray-400"
                style={{ backgroundColor: "var(--object-bg)", color: "var(--text-color)" }}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" style={{ color: "var(--text-color)" }}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-gray-400"
                placeholder="Enter product name"
                style={{ backgroundColor: "var(--object-bg)", color: "var(--text-color)" }}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" style={{ color: "var(--text-color)" }}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-gray-400"
                rows="4"
                placeholder="Enter product description"
                style={{ backgroundColor: "var(--object-bg)", color: "var(--text-color)" }}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-2" style={{ color: "var(--text-color)" }}>Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-gray-400"
                placeholder="Enter product price"
                style={{ backgroundColor: "var(--object-bg)", color: "var(--text-color)" }}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg mt-4 border-2 border-gray-600 bg-transparent text-gray-200 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sell;
