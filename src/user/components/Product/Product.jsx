import React from 'react'
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import Pagination from "@mui/material/Pagination";
import { filters, sortOptions } from "./Filters";
import ProductCard from "./ProductCard";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  findProducts,
  // searchProducts,
} from "../../redux/Product/Action";
import LoadingBar from 'react-top-loading-bar';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [pageNumbers, setPageNumbers] = useState(1);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const param = useParams();
  const { product } = useSelector((store) => store);
  console.log(product)
  const loadingBarRef = useRef(null);
  const location = useLocation();
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const colorValue = searchParams.get("color");
  const resinValue = searchParams.get('resin');
  const digitalArtValue = searchParams.get("digitalArt");
  const jewelValue = searchParams.get("jewel");
  const resinRawMaterialsValue = searchParams.get("resinRawMaterials");
  const lippanArtValue = searchParams.get("lippanArt");
  const businessValue = searchParams.get("business");
  const geodeArtValue = searchParams.get("geodeArt");
  const vintageValue = searchParams.get("vintage");
  const festivalSpecialValue = searchParams.get("festivalSpecial");
  const sizeValue = searchParams.get("size");
  const discount = searchParams.get("discount");
  const sortValue = searchParams.get("sort");
  const pageNumber = searchParams.get("page") || 1;
  const stock = searchParams.get("stock");
  const searchQuery = searchParams.get("query") || ""; // Note the change here

  const handleSortChange = (value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("sort", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    loadingBarRef.current.continuousStart(); 
  
    const data = {
      colors: searchParams.getAll('color'),
      resin: searchParams.getAll('resin'),
      digitalArt: searchParams.getAll('digitalArt'),
      jewel: searchParams.getAll('jewel'),
      resinRawMaterials: searchParams.getAll('resinRawMaterials'),
      festivalSpecial: searchParams.getAll('festivalSpecial'),
      lippanArt: searchParams.getAll('lippanArt'),
      geodeArt: searchParams.getAll('geodeArt'),
      vintage: searchParams.getAll('vintage'),
      business: searchParams.getAll('business'),
      sizes: searchParams.getAll('size'),
      sort: sortValue || '',
      minDiscount: discount || 0,
      pageNumber: pageNumber,
      pageSize: 12,
      stock: stock,
      search: searchQuery, 
    };
  
    dispatch(findProducts(data))
      .then(() => {
        loadingBarRef.current.complete();
      })
      .catch(() => {
        loadingBarRef.current.complete();
      });
    
  },  [
    location.search,
    colorValue,
    resinValue,
    digitalArtValue,
    jewelValue,
    resinRawMaterialsValue,
    businessValue,
    festivalSpecialValue,
    lippanArtValue,
    vintageValue,
    geodeArtValue,
    sizeValue,
    discount,
    sortValue,
    pageNumber,
    stock,
    searchQuery,
  ]);
  // const handleFilter = (value, sectionId) => {
  //   const searchParams = new URLSearchParams(location.search);
  //   let filterValues = searchParams.getAll(sectionId);
  
  //   if (filterValues.includes(value)) {
  //     filterValues = filterValues.filter((item) => item !== value);
  //   } else {
  //     filterValues.push(value);
  //   }
  
  //   searchParams.delete(sectionId);
  //   filterValues.forEach((val) => {
  //     searchParams.append(sectionId, val);
  //   });
  
  //   const query = searchParams.toString();
  //   navigate({ search: `?${query}` });
  // };

  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    let filterValues = checkedFilters[sectionId] || [];
  
    if (filterValues.includes(value)) {
      filterValues = filterValues.filter(item => item !== value);
    } else {
      filterValues.push(value);
    }
  
    if (filterValues.length > 0) {
      searchParams.set(sectionId, filterValues.join(','));
    } else {
      searchParams.delete(sectionId);
    }
  
    setCheckedFilters(prev => ({
      ...prev,
      [sectionId]: filterValues
    }));
  
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const productList = product?.products?.content
  const productPage =  product.products?.totalPages

  // const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  // const navigate = useNavigate();

  // ... other state and functions

  const handleShopByCategory = () => {
    // setFiltersOpen(true);
    setMobileFiltersOpen(true)
    navigate('/products');
  };

  const [checkedFilters, setCheckedFilters] = useState({});

  const parseUrlForFilters = () => {
    const searchParams = new URLSearchParams(location.search);
    const newCheckedFilters = {};
  
    filters.forEach(section => {
      const paramValue = searchParams.get(section.id);
      if (paramValue) {
        const values = paramValue.split(',');
        newCheckedFilters[section.id] = values;
      } else {
        newCheckedFilters[section.id] = [];
      }
    });
  
    setCheckedFilters(newCheckedFilters);
  };

  useEffect(() => {
    parseUrlForFilters();
  }, [location.search]);



  return (
    <div className="bg-[#fff] -z-20 ">
      <LoadingBar ref={loadingBarRef} />
      <div>
        {/* Mobile filter dialog */}
        
        <Transition.Root show={mobileFiltersOpen || filtersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden "
            onClose={setMobileFiltersOpen}
            // onClose={handleCloseFilters}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-[#000] bg-opacity-25 " />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-[#fff] py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900 text-secondary-dark-color ">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false) || setFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6 text-secondary-dark-color" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200 lg:hidden bg-white shadow-sm">
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 last:border-b-0"
        >
          {({ open }) => (
            <>
              <h3 className="flow-root">
                {section.link ? (
                  <Link
                    to={section.link}
                    className="flex w-full items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-medium font-poppins text-gray-900">
                      {section.name}
                    </span>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  </Link>
                ) : (
                  <Disclosure.Button className="flex w-full items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <span className="font-medium font-poppins text-gray-900">
                      {section.name}
                    </span>
                    {section.options?.length > 0 ? (
                      <ChevronDownIcon
                        className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                          open ? 'transform rotate-180' : ''
                        }`}
                      />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                    )}
                  </Disclosure.Button>
                )}
              </h3>
              {!section.link && section.options?.length > 0 && (
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="px-4 pt-2 pb-3">
                    <div className="space-y-2">
                      {section.options.map((option, optionIdx) => (
                        <div
                          key={option.value}
                          className="flex items-center font-poppins text-gray-700"
                        >
                          <input
                            id={`filter-mobile-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            value={option.value}
                            type="checkbox"
                            checked={
                              checkedFilters[section.id]?.includes(option.value) || false
                            }
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            onChange={() => handleFilter(option.value, section.id)}
                          />
                          <label
                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                            className="ml-3 text-sm cursor-pointer"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Disclosure.Panel>
                </Transition>
              )}
            </>
          )}
        </Disclosure>
      ))}
    </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className=" sm:px-4 px-0 lg:px-10 ">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 font-poppins text-secondary-dark-color ">
              Product
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 m-2 ">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              onClick={() => handleSortChange(option.query)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm cursor-pointer"
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

           
              <button
                type="button"
                className=" text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only text-xl ">Filters</span>
                <FunnelIcon className="h-5 w-5 " aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only font-poppins text-secondary-dark-color">
              Products
            </h2>

            <div>
              {/* <h2 className="py-5 font-semibold opacity-60 text-xl hidden lg:block font-poppins text-secondary-dark-color">Filters</h2> */}
              <h2 className="py-5 font-semibold opacity-60 text-xl hidden lg:block font-poppins text-secondary-dark-color">
    {searchQuery ? 'Search Results' : 'Filters'}
  </h2>
  
  
  <div className={`grid grid-cols-1 gap-x-3 gap-y-10 ${
          searchQuery ? '' : 'lg:grid-cols-5'
        }`}>
                {/* Filters */}
                {!searchQuery && (
              <form className="mt-4 border-t border-gray-200 hidden lg:block bg-white shadow-md rounded-lg overflow-hidden">
              {filters.map((section) => (
                <Disclosure
                  as="div"
                  key={section.id}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  {({ open }) => (
                    <>
                      <h3 className="flow-root">
                        {section.link ? (
                          <Link
                            to={section.link}
                            className="flex w-full items-center justify-between px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                          >
                            <span className="font-semibold font-poppins text-gray-900">
                              {section.name}
                            </span>
                            <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                          </Link>
                        ) : (
                          <Disclosure.Button className="flex w-full items-center justify-between px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                            <span className="font-semibold font-poppins text-gray-900">
                              {section.name}
                            </span>
                            {section.options?.length > 0 ? (
                              <ChevronDownIcon
                                className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                                  open ? 'transform rotate-180' : ''
                                }`}
                              />
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                            )}
                          </Disclosure.Button>
                        )}
                      </h3>
                      {!section.link && section.options?.length > 0 && (
                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel className="px-6 pt-2 pb-4">
                            <div className="space-y-3">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center font-poppins text-gray-700"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    value={option.value}
                                    type="checkbox"
                                    checked={
                                      checkedFilters[section.id]?.includes(option.value) || false
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    onChange={() => handleFilter(option.value, section.id)}
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm cursor-pointer hover:text-gray-900"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </Transition>
                      )}
                    </>
                  )}
                </Disclosure>
              ))}
            </form>
                )}

                {/* Product grid */}
                <div className="lg:col-span-4 sm:w-full mx-auto sm:max-w-full sm:mx-0 px-0 ">
                {searchQuery && (
          <>
            <h1 className='text-center font-poppins font-bold text-xl py-3'>
              Your Search results for "{searchQuery}"
            </h1>
            <p className='text-center cursor-pointer font-poppins text-xl'>
              <span>Looking for something specific? </span>
              <Link
                to='/products'
                className='text-blue-500 font-semibold text-base underline'
                onClick={handleShopByCategory}
              >
                Shop By Category
              </Link>
            </p>
          </>
        )}

               
                
                
<div className="bg-white py-5 rounded-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {productList?.map((item) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>
    </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* pagination section */}
        <section className="w-full px-[3.6rem]">
          <div className="mx-auto px-4 py-5 flex justify-center shadow-lg border rounded-md">
            <Pagination
              count={productPage}
              color="primary"
              className=" "
              onChange={handlePaginationChange}
              
            />
          </div>
        </section>
      </div>
    </div>
  );
}



