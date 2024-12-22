import React from "react";

const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    description: "An ergonomic wireless mouse with smooth scrolling, precise tracking, and a long-lasting battery.",
    image: "https://via.placeholder.com/150",
    price: "$15",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    description: "A premium mechanical keyboard with RGB lighting, tactile switches, and programmable keys for ultimate productivity.",
    image: "https://via.placeholder.com/150",
    price: "$50",
  },
  {
    id: 3,
    name: "Gaming Headset",
    description: "A noise-canceling gaming headset with crystal-clear sound, comfortable ear cups, and a built-in microphone.",
    image: "https://via.placeholder.com/150",
    price: "$30",
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    description: "A high-back ergonomic office chair with lumbar support, adjustable height, and breathable mesh for long hours of work.",
    image: "https://via.placeholder.com/150",
    price: "$120",
  },
];

const BuyerCards = ({ searchTerm }) => {
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="p-4 rounded-md border border-gray-300 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full object-cover rounded-md"
          />
          <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
          <p className="text-gray-400 mt-2">{product.description}</p>
          <p className="text-lg font-bold mt-2">{product.price}</p>
          <div className="flex justify-between mt-4">
            <button
              className="px-6 py-2 border-2 border-transparent text-white rounded-md focus:outline-none transition-all duration-300 hover:border-red-500 hover:shadow-md hover:shadow-red-500/50"
            >
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default BuyerCards;
 