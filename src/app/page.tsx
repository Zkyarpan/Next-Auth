import React from "react";

const page = () => {
  return (
    <div className="bg-blue-600 text-white h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold mb-4">Welcome to YourBrand</h1>
      <p className="text-2xl mb-8">
        We create amazing experiences for your business
      </p>
      <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition">
        Get Started
      </button>
    </div>
  );
};

export default page;
