import React, { useState } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import { useMenu } from '../ContextProvider/MenuContext';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const DeptAndSearch = () => {
  const { isOpen, toggleDropdown } = useMenu();

  const menuItems = [
    {
      name: 'Resin Art',
      url: '/products',
      subItems: [
        { name: 'Key Chains', url: '/products?resin=keychains' },
        { name: 'Wall Clock', url: '/products?resin=wallclock' },
        { name: 'Pooja Thali', url: '/products?resin=poojathali' },
        { name: 'Marriage Special', url: '/products?resin=marriagespecial' },
        { name: 'Mantra Frame', url: '/products?resin=mantraframe' },
      ],
    },
    { name: 'Jwellery Pendant', url: '/products?jewel=pendant' },
    { name: 'Lippan Art', url: '/products?lippanArt=lippanartedition' },
    { name: 'Business Plates', url: '/products?business=businessplate' },
    { name: 'Digital Art', url: '/products?digitalArt=digitalartedition' },
    { name: 'Geode Art', url: '/products?geodeArt=geodeartedition' },
    { name: 'Vintage', url: '/products?vintage=vinatgeExclusive' },
    { name: 'Festival Special', url: '/products?festivalSpecial=diwali%2Crakhi' },
  
  ];

  return (
    <section className="bg-[#3b78ab] flex justify-between md:px-5 px-0 items-center">
      <div className="bg-[#55bae9] relative sm:p-5 p-2 flex justify-between rounded-tr-md rounded-tl-md gap-7 md:gap-[5rem] sm:gap-[3rem] items-center mt-4">
        <div className="flex flex-col -space-y-1">
          <h2 className="md:text-xl text-lg text-[#fff] font-poppins font-bold">
            All Departments
          </h2>
          <h3 className="md:text-sm text-[0.6rem] text-[#fff] font-poppins font-semibold text-opacity-80">
            500+ Products Available
          </h3>
        </div>

        <div className="inline-block">
          <button onClick={toggleDropdown}>
            <AiOutlineMenu className=' md:text-3xl text-xl text-whitecolor md:mt-2  mt-0'  />
          </button>

          {isOpen && (
            <div className="origin-top-right absolute right-0 left-0 top-[100%] bg-[#edf2fb] rounded-bl-md rounded-br-md shadow-lg bg-white ring-opacity-5 transition-all duration-500 z-20">
              <div className=" border-[0.1rem] divide-y divide-border-color border-border-color">
                {menuItems.map((item, index) => (
                  <div
                    className="flex justify-between items-center relative group"
                    key={index}
                  >
                    {typeof item === 'object' ? (
                      <div className="">
                        <Link
                          to={item.url}
                          className="block px-4 py-4 hover:text-[#0077b6] text-xl font-poppins font-semibold text-secondary-dark-color"
                        >
                          {item.name}
                        </Link>
                        <ul
                          style={{
                            background:
                              "rgb(224,235,255)",
                            // background:
                            //   "linear-gradient(90deg, rgba(255,205,255,1) 0%, rgba(107,154,240,1) 100%)",
                          }}
                          className="hidden z-30 absolute left-[100%] top-0 w-[100%] group-hover:block    overflow-x-hidden "
                        >
                          <img
                            src="https://res.cloudinary.com/dkhsnhjrh/image/upload/v1706931157/Jewel/Bracelet/JewelleryBracelet1_te8viz.jpg"
                            className=" object-cover h-full  w-full absolute opacity-30   "
                          />
                          {item.subItems &&
                            item.subItems.map((subItem, subIndex) => (
                              <div className="relative" key={subIndex}>
                                <li className=" h-auto   p-5">
                                  <Link
                                    to={subItem.url}
                                    className="text-2xl font-medium font-poppins text-secondary-dark-color hover:text-primarycolor  "
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              </div>
                            ))}
                        </ul>
                      </div>
                    ) : (
                      <Link
                        to={item.url || '#'}
                        className="block px-4 py-4 text-secondary-dark-color font-poppins hover:text-[#0077b6] text-xl font-semibold "
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <SearchBar />
      </div>
    </section>
  );
};

export default DeptAndSearch;

