import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../redux/Cart/Action";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

const CartItem = ({ item, showButton, cartItemsCount }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const [customizationNote, setCustomizationNote] = useState(
    item?.customizationNote
  );
  const [customizationImage, setCustomizationImage] = useState(
    item?.customizationImage || null
  );

  useEffect(() => {
    setCustomizationNote(item?.customizationNote || "");
    setCustomizationImage(item?.customizationImage || null);
  }, [item?.customizationNote, item?.customizationImage]);

  const handleRemoveItemFromCart = () => {
    const data = { cartItemId: item?._id, jwt };
    dispatch(removeCartItem(data));
  };

  const handleUpdateCartItem = () => {
    const formData = new FormData();
    formData.append("quantity", item.quantity);
    formData.append("customizationNote", customizationNote);
    if (customizationImage) {
      formData.append("customizationImage", customizationImage);
    }

    const data = { data: formData, cartItemId: item._id, jwt };
    dispatch(updateCartItem(data));
  };

  const handleQuantityChange = (num) => {
    const formData = new FormData();
    formData.append("quantity", item.quantity + num);

    const data = { data: formData, cartItemId: item._id, jwt };
    dispatch(updateCartItem(data));
  };

  const handleImageUpload = (event) => {
    setCustomizationImage(event.target.files[0]);
  };

  return (
    <div>
      
     
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              className="w-24 h-24 object-cover rounded-lg mr-4"
              src={item?.product?.image}
              alt=""
            />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                {item?.product?.name}
              </h3>
              <p className="text-gray-600">
                Price: ₹{item?.product?.discountedPrice}{" "}
                <span className="text-sm text-gray-400 line-through">
                  ₹{item?.product?.price}
                </span>
              </p>
            </div>
          </div>
          {showButton && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={item?.quantity <= 1}
                  className="p-1 rounded-full text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <FiMinus />
                </button>
                <span className="text-gray-800 font-semibold">
                  {item?.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-1 rounded-full text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <FiPlus />
                </button>
              </div>
              <button
                onClick={handleRemoveItemFromCart}
                className="text-red-500 hover:text-red-600 focus:outline-none"
              >
                <FiTrash2 />
              </button>
            </div>
          )}
        </div>
        {showButton && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h4 className="text-lg font-semibold mb-2 md:mb-0">
                Customization
              </h4>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Customization Note"
                  value={customizationNote}
                  onChange={(e) => setCustomizationNote(e.target.value)}
                  className="w-full md:w-auto px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <label className="block">
                  <span className="sr-only">Upload Customization Image</span>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="block w-full md:w-auto border border-gray-300 rounded-lg py-2 px-3 bg-white text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <p className="text-gray-600 mb-2 md:mb-0">
                {item?.customizationNote}
              </p>
              {item?.customizationImage && (
                <img
                  className="w-36 h-36 object-cover rounded-lg"
                  src={item?.customizationImage}
                  alt="Customization"
                />
              )}
            </div>
            <button
              onClick={handleUpdateCartItem}
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
            >
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;