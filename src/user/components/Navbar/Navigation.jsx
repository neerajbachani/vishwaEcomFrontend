import React, { useRef } from 'react'
import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  TruckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import "../button.css"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deepPurple } from "@mui/material/colors";
import { getUser, logout } from "../../redux/Auth/Action";
import { getCart } from "../../redux/Cart/Action";
import SearchBar from '../SearchBar/SearchBar';



import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth,cart } = useSelector((store) => store);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const jwt = localStorage.getItem("jwt");
  const location=useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const MenuItems = ({ to, label, children }) => {
    return (
      <li className="group relative">
        <Link
          to={to}
          className="block py-3 px-5 hover:bg-blue-200 transition-colors duration-300 rounded-md font-semibold font-poppins text-lg "
          onClick={closeMenu}
        >
          {label}
        </Link>
        {children && (
          <div className="absolute left-0 w-64 bg-white shadow-xl rounded-md overflow-hidden hidden group-hover:block border-t-4 border-blue-400 ">
            <ul className="">
              {children}
            </ul>
          </div>
        )}
      </li>
    );
  };
  
  const SubMenuItem = ({ to, label }) => (
    <li>
      <Link
        to={to}
        className="block px-5 py-2 text-lg text-gray-700 hover:bg-indigo-100  transition-colors duration-300 border-l-4 border-transparent hover:border-indigo-400 font-poppins "
      >
        {label}
      </Link>
    </li>
  );

  const NavItem = ({ to, children }) => (
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="flex items-center gap-x-2 font-medium font-poppins lg:text-md xl:text-xl"
    >
      <NavLink
        to={to}
        className={({ isActive }) =>
          `relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-[#e63946] after:transition-transform after:duration-300 after:ease-out hover:after:origin-bottom-left hover:after:scale-x-100 ${
            isActive ? 'text-[#e63946]' : ''
          }`
        }
      >
        {children}
      </NavLink>
    </Typography>
  );
  

  const Dropdown = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    let timeoutId;
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        if (timeoutId) clearTimeout(timeoutId);  // Clear timeout on unmount
      };
    }, []);
  
    const handleMouseEnter = () => {
      if (timeoutId) clearTimeout(timeoutId);
      setIsOpen(true);
    };
  
    const handleMouseLeave = () => {
      timeoutId = setTimeout(() => setIsOpen(false), 200);
    };
  
    return (
      <div 
        className="relative group z-40"
        ref={dropdownRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className="flex items-center gap-1 font-medium font-poppins lg:text-md xl:text-xl"
        >
          {title}
          <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute mt-2 bg-white border rounded-md shadow-lg">
            {items.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(getCart(jwt));
    }
  }, [jwt]);
  
  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseUserMenu = (event) => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpenAuthModal(true);
    navigate('/signup')
  };
  const handleClose = () => {
    setOpenAuthModal(false);
   
  };



  useEffect(() => {
    if (auth.user){ 
      handleClose();
    }
    if( auth.user?.role!=="admin" && (location.pathname==="/signup" || location.pathname==="/signin")){
      navigate(-1)
    }
  }, [auth.user]);

  const handleLogout = () => {
    handleCloseUserMenu();
    logout(dispatch)
  };
  const handleMyOrderClick=()=>{
    handleCloseUserMenu()
    navigate("/account/order")
  }
  const handleProfileClick=()=>{
    handleCloseUserMenu()
    navigate("/account/profile")
  }
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <NavItem to="/">Home</NavItem>
      <NavItem to="/products">Products</NavItem>
      <NavItem to="/gallery">Gallery</NavItem>
      <NavItem to="/about-us">About Us</NavItem>
      <NavItem to="/contact-us">Contact Us</NavItem>
      <Dropdown
        title="Queries"
        items={[
          { label: 'Terms and Conditions', to: '/terms&conditions' },
          { label: 'Privacy Policy', to: '/privacy-policy' },
          { label: 'Shipping Policy', to: '/shipping-policy' },
        ]}
      />
    </ul>
  );


  return (
    <div className="bg-white pb-0 ">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
              
                <button className="space-y-6 border-t border-[gray] px-4 py-6">
                <div className="block">{navList}</div>
                <div className=" lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {auth.user ? (
                    <div>
                      <Avatar
                        className="text-white"
                        onClick={handleUserClick}
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        // onClick={handleUserClick}
                        sx={{
                          bgcolor: deepPurple[500],
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        {/* {auth?.user?.firstName[0].toUpperCase()} */}
                      </Avatar>
                      
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleProfileClick}>
                          Profile
                        </MenuItem>
                        
                        <MenuItem onClick={handleMyOrderClick}>
                          My Orders
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <Button
                      onClick={handleOpen}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign-in
                    </Button>
                  )}
                </div>
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative max-w-screen-2xl mx-auto bg-[white]">
        <nav aria-label="Top" className="mx-auto">
          <div className="">
            <div className="flex h-16 items-center sm:px-4 px-0">
            

              {/* Logo */}
              <div className=" flex lg:ml-0 ">
                <Link to="/">
                 <img src='https://res.cloudinary.com/dkhsnhjrh/image/upload/v1708707479/2_igcdbk.png' className=' md:w-[7rem] md:h-[7rem] mt-4 object-cover w-[6rem] h-[6rem] '/>
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-50">
                <div className="flex h-full items-center">
                <div className="container mx-auto mt-3">
          {navList}
          </div>
                  
                  
                  
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center mt-3">
               

                {/* Search */}
                <div className="flex lg:mr-5 mb-4 ">
                  <p className=" text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <SearchBar/>
                  </p>
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {auth.user ? (
                    <div>
                      <Avatar
                        className="text-white"
                        onClick={handleUserClick}
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        // onClick={handleUserClick}
                        sx={{
                          bgcolor: deepPurple[500],
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        {/* {auth.user?.firstName[0].toUpperCase()} */}
                      </Avatar>
                      
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleProfileClick}>
                          Profile
                        </MenuItem>
                        
                        <MenuItem onClick={handleMyOrderClick}>
                          My Orders
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <div id="nav-part2" className=' flex justify-center items-center text-center text-sm ' >
                    <Link to='/signup'><h4 className=' px-[12px] py-[6px] ' ><a className='text-sm' href="/signup">Sign In</a></h4></Link>
                </div>
                  )}
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Button
                    onClick={() => navigate("/cart")}
                    className="group -m-2 flex items-center p-2"
                  >
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cart.cart?.totalItem}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        

      </header>
      <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
          {auth.user ? (
                    <div className='block md:hidden'>
                      <Avatar
                        className="text-white"
                        onClick={handleUserClick}
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        // onClick={handleUserClick}
                        sx={{
                          bgcolor: deepPurple[500],
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        {/* {auth.user?.firstName[0].toUpperCase()} */}
                      </Avatar>
                      
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleProfileClick}>
                          Profile
                        </MenuItem>
                        
                        <MenuItem onClick={handleMyOrderClick}>
                          My Orders
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <div id="nav-part2" className=' style flex justify-center items-center text-center text-sm md:hidden ' >
                    <Link to='/signup'><h4 className=' px-3 py-[6px] ' ><a className='text-[0.8rem]' href="/signup">Sign In</a></h4></Link>
                </div>
                  )}
          
          <nav className="hidden lg:block z-30 ">
            <ul className="flex space-x-4 font-poppins  ">
           
              <MenuItems to="/products?query=Resin" label="Resin Art">
              <SubMenuItem to="/products?resin=keychains" label="Key Chains" />
                <SubMenuItem to="/products?resin=wallclock" label="Wall Clock" />
                <SubMenuItem to="/products?resin=marriagespecial" label="Varmala Preservation - Marriage special" />
              <SubMenuItem to="/products?resin=poojathali" label="Pooja Thali" />
              <SubMenuItem to="/products?resin=mantraframe" label="Mantra Frame" />
              </MenuItems>

              <MenuItems to="/products?query=jewel" label="Resin Jewellery">
                <SubMenuItem to="/products?jewel=earrings" label="Earrings" />
                <SubMenuItem to="/products?jewel=bracelet" label="Bracelet" />
                <SubMenuItem to="/products?jewel=pendant" label="Pendant" />
                <SubMenuItem to="/products?jewel=rings" label="rings" />

                {/* Add more SubMenuItems as needed */}
              </MenuItems>
              <MenuItems to="/products?digitalArt=digitalartedition" label="Digital Art">
                
                {/* Add more SubMenuItems as needed */}
              </MenuItems>
              <MenuItems to="/products?festivalSpecial=diwali&festivalSpecial=rakhi" label="Festival Special">
                <SubMenuItem to="/products?festivalSpecial=rakhi" label="Resin Customized Rakhi" />
                <SubMenuItem to="/products?festivalSpecial=diwali" label="Diwali Thali" />
                {/* Add more SubMenuItems as needed */}
              </MenuItems>
              <MenuItems to="/products?business=businessplate" label="Business Plate" />
              <MenuItems to="/products?lippanArt=lippanartedition" label="Lippan Art" />
              <MenuItems to="/products?geodeArt=geodeartedition" label="Geode Art" />
              <MenuItems to="/products?resinRawMaterials=rawcollections" label="Resin Raw Materials" />
              
            </ul>
          </nav>
        </div>
      </div>
     
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white shadow-md"
          >
            <ul className="py-4">
              <MenuItems to="/" label="Home" />
              <MenuItems to="/products?query=Resin" label="Resin Art">
              
              </MenuItems>

              <MenuItems to="/products?query=jewel" label="Resin Jewellery">
                
              </MenuItems>
              <MenuItems to="/products?digitalArt=digitalartedition" label="Digital Art">
              
              </MenuItems>
              <MenuItems to="/products?festivalSpecial=diwali&festivalSpecial=rakhi" label="Festival Special">
              
               
              </MenuItems>
              <MenuItems to="/products?business=businessplate" label="Business Plate" />
              <MenuItems to="/products?lippanArt=lippanartedition" label="Lippan Art" />
              <MenuItems to="/products?geodeArt=geodeartedition" label="Geode Art" />
              <MenuItems to="/products?resinRawMaterials=rawcollections" label="Resin Raw Materials" />
              <MenuItems to="/products" label="All Products" />

<MenuItems to="/gallery" label="Gallery" />
<MenuItems to="/about-us" label="About Us" />
<MenuItems to="/contact" label="Contact" />

            
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
     
    </header>
      {/* <AuthModal handleClose={handleClose} open={openAuthModal} /> */}
       
    
  </div>
    
  );
}





