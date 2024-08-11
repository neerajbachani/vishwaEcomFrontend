import React from "react";

export default function DeliveryAndReturn() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className=" text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 font-poppins "
        type="button"
        onClick={() => setShowModal(true)}
      >
        Delivery & Return
      </button>
      {showModal ? (
        <>
          <div
         
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-[#219ebc] bg-opacity-50  "
          >
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none bg-whitecolor  ">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-4xl font-semibold font-poppins ">
                    Delivery & Shipping
                  </h3>
                  <button
                    className="p-1 ml-auto h-full w-full bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none  "
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <ul className="relative p-6 flex-auto list-disc px-20 ">
                  <li className="my-4 text-blueGray-500  text-xl leading-relaxed font-poppins">
                  Orders are shipped within 2-4 working days.
                  </li>
                  <li className="my-4 text-blueGray-500 text-xl leading-relaxed font-poppins">
                  Order having Custom products are shipped within 4-7 days.
                  </li>
                  <li className="my-4 text-blueGray-500 text-xl leading-relaxed font-poppins">
                  Delivery takes another 5-10 working days after shipment.
                  </li>
                  <li className="my-4 text-blueGray-500 text-xl leading-relaxed font-poppins">
                  In-store pick-up is available when order status is updated to Ready to Pick-up. 
                  </li>
                  <li className="my-4 text-blueGray-500 text-xl leading-relaxed font-poppins">
                  See our Shipping Policy
                  </li>
                </ul>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 font-poppins "
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}