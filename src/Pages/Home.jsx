import React from 'react';
import { useNavigate } from 'react-router';
import blog from '../../public/blog.jpg';
import contact from '../../public/contact.jpg';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center py-32 bg-base-200">
      <div className="w-[90%] flex flex-wrap justify-center items-start gap-8 md:gap-16">
        
        <div className="flex flex-col items-center">
        <h1 className="text-3xl text-black font-bold mb-6">All Clint</h1>
          <div
            onClick={() => navigate('/table')}
            className="relative w-72 sm:w-80 md:w-96 h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden shadow-md group cursor-pointer transition-all duration-500"
          >
            <img
              src={blog}
              alt="blog"
              className="w-full h-full object-cover brightness-100 group-hover:brightness-50 transition-all duration-500"
            />
            <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <button
                onClick={(e) => { e.stopPropagation(); navigate('/table'); }}
                className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-orange-600 transition"
              >
                View All
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-3xl text-black font-bold mb-6">Add a Clint</h1>
          <div
            onClick={() => navigate('/add')}
            className="relative w-72 sm:w-80 md:w-96 h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden shadow-md group cursor-pointer transition-all duration-500"
          >
            <img
              src={contact}
              alt="contact"
              className="w-full h-full object-cover brightness-100 group-hover:brightness-50 transition-all duration-500"
            />
            <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <button
                onClick={(e) => { e.stopPropagation(); navigate('/add'); }}
                className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-orange-600 transition"
              >
                Add Clint
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
