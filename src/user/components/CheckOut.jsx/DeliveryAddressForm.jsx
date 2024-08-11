import React from 'react'
import AddressCard from './AddressCard';
import { useState } from 'react';

const DeliveryAddressForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        telephone: '',
        message: '',
    });

  

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save the form data to the state
        const newAddress = {
            fullName: e.target.elements.fullName.value,
            address1: e.target.elements.address1.value,
            address2: e.target.elements.address2.value,
            city: e.target.elements.city.value,
            state: e.target.elements.state.value,
            zip: e.target.elements.zip.value,
            country: e.target.elements.country.value,
            telephone: e.target.elements.telephone.value,
            message: e.target.elements.message.value,
        };

        setAddresses([...addresses, newAddress]);
        setFormData({
            fullName: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            telephone: '',
            message: '',
        });
    };
    return (
        <div className=' mx-auto max-w-7xl grid sm:grid-cols-4 grid-rows-4 ' >
            <div className=' sm:col-span-1 row-span-1 ' >
                <AddressCard />
            </div>
            <div className=" row-span-3 sm:col-span-3 w-full md:w-1/2 md:max-w-full mx-auto">
                <div className="p-6 border border-gray-300 sm:rounded-md">
                    <form
                        onSubmit={handleSubmit}

                        method="POST"
                    >
                        <label id='fullName' className="block mb-6">
                            <span className="text-gray-700 text-xl ">Your name</span>
                            <input
                                id='fullName'
                                name="fullName"
                                type="text"
                                className=" text-xl block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="Joe Bloggs"
                            />
                        </label>
                        <label className="block mb-6">
                            <span className="text-gray-700 text-xl ">Address line 1</span>
                            <input
                                name="address1"
                                type="text"
                                className=" text-xl block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                                placeholder=""
                            />
                        </label>
                        <label className="block mb-6">
                            <span className="text-gray-700 text-xl">Address line 2</span>
                            <input
                                name="address2"
                                type="text"
                                className=" text-xl block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                                placeholder=""
                            />
                        </label>
                        <label className="block mb-6">
                            <span className="text-gray-700 text-xl ">City</span>
                            <input
                                name="city"
                                type="text"
                                className=" text-xl block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                                placeholder=""
                            />
                        </label>
                        <label className="block mb-6">
                            <span className="text-gray-700 text-xl">State/Province</span>
                            <input
                                name="state"
                                type="text"
                                className=" text-xl block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder=""
                            />
                        </label>
                        <label className="block mb-6">
                            <span className="text-gray-700 text-xl">Zip/Postal code</span>
                            <input
                                name="zip"
                                type="text"
                                className=" text-xl block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder=""
                            />
                        </label>
                        <label className="block mb-6">
                            <span className="text-gray-700 text-xl">Country</span>
                            <input
                                name="country"
                                type="text"
                                className=" text-xl block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder=""
                            />
                        </label>
                        <label className="block mb-6">
                            <span className="text-gray-700 text-xl">Telephone</span>
                            <input
                                name="telephone"
                                type="text"
                                className=" text-xl block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                                placeholder=""
                            />
                        </label>
                        <label className="block mb-6">
                            <span className="text-gray-700 text-xl">Delivery information</span>
                            <textarea
                                name="message"
                                className=" text-xl block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                rows="3"
                                placeholder="floor/door lock code/etc."
                            ></textarea>
                        </label>
                        <div className="mb-6">
                            <button
                                type="submit"
                                className=" text-xl h-10 px-5 text-indigo-100 bg-indigo-700 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default DeliveryAddressForm