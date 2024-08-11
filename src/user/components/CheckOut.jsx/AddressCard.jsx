import React from 'react';

const AddressCard = () => {
    return (
        <div className='border border-secondary-dark-color'>
            <h1 className='font-poppins text-5xl text-primarycolor text-center'>Delivery Address</h1>
           
                <button  className='p-10 font-poppins' >
                    <p>Name: </p>
                    <p>Address: </p>
                    <p>Phone No: </p>
                </button>
 
            <button className='w-full bg-secondarycolor py-5 rounded-xl'>Add address</button>
        </div>
    );
};

export default AddressCard;

