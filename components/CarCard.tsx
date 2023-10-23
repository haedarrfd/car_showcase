"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { CarProps } from "@/types";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import { CustomButton, CarDetail } from ".";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  // destructure cars properties
  const { city_mpg, year, make, model, transmission, drive } = car;
  // function calculate car rent
  const carRent = calculateCarRent(city_mpg, year);

  const [isLiked, setIsLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    // Car Wrap
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>

        <Image
          src={!isLiked ? "/heart-outline.svg" : "/heart-filled.svg"}
          alt="Like Icon"
          width={25}
          height={25}
          className="object-contain cursor-pointer mt-0.5"
          onClick={() => setIsLiked(!isLiked)}
        />
      </div>

      {/* Car Price */}
      <p className="car-card__price">
        <span className="car-card__price-dollar">$</span>
        {carRent}
        <span className="car-card__price-day">/day</span>
      </p>

      {/* Car Image */}
      <div className="car-card__image">
        <Image
          src={generateCarImageUrl(car)}
          alt="Car Model"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Car Mini Detail */}
      <div className="relative flex w-full mt-2">
        <div className="car-card__icon-container">
          <div className="car-card__icon">
            <Image
              src="/steering-wheel.svg"
              alt="Steering Icon"
              width={20}
              height={20}
            />
            <p className="car-card__icon-text">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>

          <div className="car-card__icon">
            <Image src="/tire.svg" alt="Tire Icon" width={20} height={20} />
            <p className="car-card__icon-text">{drive.toUpperCase()}</p>
          </div>

          <div className="car-card__icon">
            <Image src="/gas.svg" alt="Gas Icon" width={20} height={20} />
            <p className="car-card__icon-text">{city_mpg}/1L</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={openModal}
          />
        </div>
      </div>

      {/* Car Detail Modal */}
      <CarDetail isOpen={isOpen} closeModal={closeModal} car={car} />
    </div>
  );
};

export default CarCard;
