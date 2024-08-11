import React from "react";

const AddressCard = ({address}) => {
  console.log(address)
  return (
    <div>
      {/* <h1 className="text-lg font-semibold py-4">Delivery Adress</h1> */}
      <div className="space-y-3">
        <p className="font-semibold font-poppins text-xl ">{`${address?.firstName} ${address?.lastName}`}</p>

        <p className="font-poppins" >
          {`${address?.streetAddress}, ${address?.city}, ${address?.state}, ${address?.pincode}`}
        </p>

        <div className="space-y-1">
          <p className="font-semibold font-poppins">Phone Number </p>
          <p>{address?.mobile}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;