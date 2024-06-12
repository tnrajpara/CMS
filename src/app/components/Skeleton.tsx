import React from "react";

const Skeleton = () => {
  return (
    <div className="mx-auto bg-gray-900 text-white p-8">
      <div className="mb-6">
        <div className="block text-xl font-bold mb-3 bg-gray-800 h-8 w-32 rounded"></div>
        <div className="block w-full p-4 rounded bg-gray-800 h-10"></div>
      </div>
      <div className="mb-6">
        <div className="block text-xl font-bold mb-3 bg-gray-800 h-8 w-32 rounded"></div>
        <div className="block w-full h-5/6 lg:h-[20rem] p-4 rounded bg-gray-800"></div>
      </div>
      <div className="mb-6">
        <div className="block text-xl font-bold mb-3 bg-gray-800 h-8 w-32 rounded"></div>
        <div className="block w-full p-4 rounded bg-gray-800 h-10"></div>
      </div>
      <div className="mb-6">
        <div className="block text-xl font-bold mb-3 bg-gray-800 h-8 w-32 rounded"></div>
        <div className="block h-48 w-48 rounded bg-gray-800"></div>
      </div>
      <div className="mb-6">
        <div className="block text-xl font-bold mb-3 bg-gray-800 h-8 w-32 rounded"></div>
        <div className="block w-full p-4 rounded bg-gray-800 h-10"></div>
      </div>
      <div className="mb-6">
        <div className="block text-xl font-bold mb-3 bg-gray-800 h-8 w-32 rounded"></div>
        <div className="space-x-2 flex">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="text-xl bg-gray-800 h-8 w-8 rounded"></div>
              <div className="w-16 px-4 py-2 rounded bg-gray-800 h-10"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <div className="block text-xl font-bold mb-3 bg-gray-800 h-8 w-48 rounded"></div>
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <div className="object-cover rounded-lg bg-gray-800 h-32 w-full"></div>
              <div className="bg-red-600 p-1 rounded-full h-8 w-20"></div>
            </div>
          ))}
        </div>
        <div className="block w-full text-xl bg-gray-800 text-white p-4 rounded mt-4 h-10"></div>
      </div>
      <div className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded text-xl h-12"></div>
    </div>
  );
};

export default Skeleton;
