import React from 'react';
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Card = ({ name, role, email, image, skills, linkedin, instagram }) => {
  return (
    <div className="relative p-6 bg-transparent rounded-lg shadow-lg max-w-md mx-auto my-6 backdrop-blur-md bg-opacity-30">
      {/* Card Content */}
      <div className="text-center">
        {/* Profile Picture */}
        <img
          src={image}
          alt={name}
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        />

        {/* Name and Role */}
        <div className="mb-4">
          <h3 className="text-4xl font-semibold text-white capitalize">{name}</h3>
          <p className="text-2xl text-gray-400">{role}</p>
        </div>

        {/* Skills */}
        <p className="text-lg text-gray-500 mb-6">{skills}</p>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-6">
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-white text-3xl hover:text-blue-600 hover:scale-110 transition-all" />
          </a>
          <a href={instagram} target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white text-3xl hover:text-pink-500 hover:scale-110 transition-all" />
          </a>
          <a href={email} target="_blank" rel="noopener noreferrer">
            <FaEnvelope className="text-white text-3xl hover:text-red-600 hover:scale-110 transition-all" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;