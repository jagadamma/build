import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {CiMobile3} from "react-icons/ci";
import {RiMotorbikeLine} from "react-icons/ri";
import {HiOutlineDesktopComputer} from "react-icons/hi";
import {GiBed} from "react-icons/gi";
import {BsBookHalf} from "react-icons/bs";
import {GiClothes} from "react-icons/gi";
import {GiSittingDog} from "react-icons/gi";
import {BiBuildingHouse} from "react-icons/bi";

export const CategoryData = [
  {
    title: "Cars",
    icon: <AiIcons.AiFillCar />,
    subNav: [
        {title: "Car"}
    ]
  },
  {
    title: "Mobiles",
    // path: "/reports",
    icon: <CiMobile3 />,
    subNav: [{title: "Mobile Phones"},
           {title:  "Accessories"},
           {title:  "Tablets"}
    ]
  },
  {
    title: "Bikes",
    // path: "/products",
    icon: <RiMotorbikeLine />,
    subNav: [
       {title:  "Motorcycles"},
       {title:  "Scooters"},
       {title:  "Spare Parts"},
       {title:  "Bicycles"}
    ]
  },
  {
    title: "Electronics And Appliances",
    // path: "/team",
    icon: <HiOutlineDesktopComputer />,
    subNav: [
     {title:  "TVs, Video - Audio"},
     {title:  "Kitchen And Other Appliances"},
     {title:  "Computers And Laptops"},
     {title:  "Cameras And Lenses"},
     {title:  "Games And Entertainment"},
     {title:  "Fridges"},
     {title:  "Computer Accessories"},
     {title:  "Hard Disks, Printers And Monitors"},
     {title:  "ACs"},
     {title:  "Washing Machines"}
    ]
  },
  {
    title: "Commercial Vehicles And Spares",
    // path: "/",
    icon: <AiIcons.AiOutlineCar />,
    subNav: [{title: "Commercial And Other Vehicles"},
        {title: "Spare Parts"}
    ]
  },
  {
    title: "Furniture",
    // path: "/support",
    icon: <GiBed />,
    subNav: [{title: "Sofa And Dining"},
       {title:  "Beds And Wardrobes"},
       {title:  "Home Decor And Garden"},
      {title:   "Kids Furniture"},
       {title:  "Other Household Items"}
    ]
  },
  {
    title: "Fashion",
    // path: "/support",
    icon: <GiClothes />,
    subNav: [{title: "Men"},
      {title: "Women"},
      {title: "Kids"}]
  },
  {
    title: "Books, Sports And Hobbies",
    // path: "/support",
    icon: <BsBookHalf />,
    subNav: [{title: "Books"},
     {title:  "Gym And Fitness"},
     {title:  "Musical Instruments"},
     {title:  "Sports Equipment"},
     {title:  "Other Hobbies"}]
  },
  {
    title: "Pets",
    // path: "/support",
    icon: <GiSittingDog />,
    subNav: [{title: "Fishes And Aquarium"},
     {title:  "Pet Food And Accessories"},
     {title:  "Dogs"},
     {title:  "Other Pets"}]
  },
  {
    title: "Properties",
    // path: "/support",
    icon: <BiBuildingHouse />,
    subNav: [{title: "For Sale: Houses And Apartments"},
       {title:  "For Rent: Houses And Apartments"},
       {title:  "Lands And Plots"},
       {title:  "For Rent: Shops And Offices"},
       {title:  "For Sale: Shops And Offices"},
       {title:  "PG And Guest Houses"}
    ]
},
  {
    title: "Services",
    // path: "/support",
    icon: <FaIcons.FaConciergeBell />,
    subNav: [{title: "Electronics And Computer"},
    {title: "Education And Classes"},
    {title: "Drivers And Taxi"},
    {title: "Health And Beauty"},
    {title: "Other Services"}
  ]
  }
];