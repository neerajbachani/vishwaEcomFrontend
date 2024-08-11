import React from 'react'
import { Link } from 'react-router-dom'

const TrendingProducts = () => {
    return (
        <section className=' mt-[5rem]' >
            <h3 className=' md:text-4xl text-3xl  text-secondary-dark-color text-left font-bold md:ml-[3rem]  font-poppins ' >
                Trending Products
            </h3>

      

            <div className=' mt-[1rem]  ' >
                <div className=' flex justify-center md:px-3 px-0 mx-auto md:gap-6 gap-2 ' >
                    <div className=' flex flex-col md:gap-4 gap-1 ' >



                        <div className="relative">
                            <Link>
                                <img className=' md:w-[44rem] md:h-[17rem] w-[30rem] h-[20rem] object-cover object-center rounded-md transition-300 ' src='https://res.cloudinary.com/dkhsnhjrh/image/upload/v1707896221/pghgnjxkhoqrgrbsx5wn.jpg' />
                                <div className=' absolute bottom-0 left-0 right-0 top-0  overflow-hidden bg-[#8ecae6] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 flex justify-center items-center bg-opacity-50 '>
                                    <p to='/products?jewel=bracelet%2Cearrings%2Cpendant%2Crings' className="  text-[#c1121f] font-poppins md:text-4xl text-xl underline ">View All →</p>
                                </div>
                            </Link>

                        </div>
                        <div className="relative">
                            <Link to='/products?resin=poojathali' >
                                <img className='  md:w-[44rem] md:h-[21rem] w-[30rem] h-[18rem] object-cover  rounded-md ' src='https://res.cloudinary.com/dkhsnhjrh/image/upload/v1710516955/ResinPujaThali1_lqm3va.jpg' />
                                <div className=' absolute bottom-0 left-0 right-0 top-0  overflow-hidden bg-[#8ecae6] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 flex justify-center items-center bg-opacity-50 '>
                                    <p className=" text-[#c1121f] font-poppins md:text-4xl text-xl underline  ">View All →</p>
                                </div>
                            </Link>
                        </div>

                    </div>
                    <div className=' flex flex-col md:gap-4 gap-1 ' >
                        <div className="relative">
                            <Link to='/products?resin=wallclock'>
                                <img className=' md:w-[44rem] md:h-[21rem] w-[30rem] h-[18rem]  object-cover object-center rounded-md ' src='https://res.cloudinary.com/dkhsnhjrh/image/upload/v1710516285/IMG_20230802_210253_aqrjfi.jpg' />
                                <div className=' absolute bottom-0 left-0 right-0 top-0  overflow-hidden bg-[#8ecae6] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 flex justify-center items-center bg-opacity-50 '>
                                    <p className=" text-[#c1121f] font-poppins md:text-4xl text-xl underline  ">View All →</p>
                                </div>
                            </Link>
                        </div>
                        <div className="relative">
                            <Link to='/products?resin=keychains'>
                                <img className=' md:w-[44rem] md:h-[17rem] w-[30rem] h-[20rem] object-cover object-top rounded-md ' src='https://res.cloudinary.com/dkhsnhjrh/image/upload/v1707896220/f9ldadsdsinywxulgh5t.jpg' />
                                <div className=' absolute bottom-0 left-0 right-0 top-0  overflow-hidden bg-[#8ecae6] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 flex justify-center items-center bg-opacity-50 '>
                                    <p href='#' className=" text-[#c1121f] font-poppins md:text-4xl text-xl underline   ">View All →</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default TrendingProducts