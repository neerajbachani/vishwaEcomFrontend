"use client";
import React, { useState, useRef, useEffect } from "react";
import AcheivementGridLayout from "./AcheivementGridLayout";

export function AcheivementSkeleton() {
  return (
    <div className="h-screen w-full">
      <AcheivementGridLayout cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div className="">
      <p className="font-bold text-4xl text-white">Amazing Experince With Falguni Vasavad</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Falguni Vasavada is Professor & Chair, Strategic Marketing Area at MICA. She is a double gold medalist with over two decades of teaching experience in the area of Marketing and Advertising.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Workshop With Irfan Pathan</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Irfan Pathan is a former Indian cricketer turned commentator and analyst. 
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Podcast With RJ</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
       
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Inauguration</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A house by the river is a place of peace and tranquility. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2  ",
    thumbnail:
      "https://res.cloudinary.com/ducutbdvu/image/upload/v1717996684/IMG-20240606-WA0010_oct0ll.jpg",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "https://res.cloudinary.com/ducutbdvu/image/upload/v1717996683/IMG-20240606-WA0012_r2p3fa.jpg",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
    "https://res.cloudinary.com/ducutbdvu/image/upload/v1717996683/IMG-20240606-WA0014_br4ani.jpg",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2 ",
    thumbnail:
    "https://res.cloudinary.com/ducutbdvu/image/upload/v1718005228/IMG-20240606-WA0040-vmake_u1mowh.jpg",
  },
];
