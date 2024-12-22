import React, { useState, useEffect } from 'react';
import teamData from '../data'; // Your team data
import Card from '../components/Card';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import icons

const AboutPage = () => {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * teamData.length)); // Random starting card

  // Function to handle the "Next" card transition
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamData.length); // Loop back to the first card
  };

  // Function to handle the "Previous" card transition
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + teamData.length) % teamData.length); // Loop back to the last card
  };

  // Automatically switch cards every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 4000); // Transition every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-transparent text-white px-4">
      <h1 className="text-4xl font-bold mb-6">Meet Our Team</h1>

      {/* Card Carousel */}
      <div className="relative w-full max-w-lg">
        {/* Left Icon with gap */}
        <div className="absolute -left-[26px] top-1/2 transform -translate-y-1/2 px-4 cursor-pointer">
          <span
            className="text-white text-4xl hover:text-gray-500"
            onClick={handlePrevious}
          >
            <FaArrowLeft />
          </span>
        </div>
        {/* Right Icon with gap */}
        <div className="absolute -right-[26px] top-1/2 transform -translate-y-1/2 px-4 cursor-pointer">
          <span
            className="text-white text-4xl hover:text-gray-500"
            onClick={handleNext}
          >
            <FaArrowRight />
          </span>
        </div>

        {/* Display Current Card */}
        <Card
          name={teamData[currentIndex].name}
          role={teamData[currentIndex].role}
          email={teamData[currentIndex].email}
          image={teamData[currentIndex].image}
          skills={teamData[currentIndex].skills}
          linkedin={teamData[currentIndex].linkedin}
          instagram={teamData[currentIndex].instagram}
        />
      </div>
    </div>
  );
};

export default AboutPage;