import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean;
}

export interface SearchManufacturerProps {
  selected: string;
  setSelected: (selected: string) => void;
}

// check di api documentation
export interface CarProps {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

// Car State Props
export type CarState = CarProps[] & { message?: string };

// Car Detail Props
export interface CarDetailProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

// Filter Search
export interface FilterProps {
  manufacturer: string;
  year: number;
  fuel: string;
  limit: number;
  model: string;
}

// Filter Listbox
export interface OptionsProps {
  title: string;
  value: string;
}

export interface CustomFilterProps<T> {
  title: string;
  options: OptionsProps[];
  setFilter: (selected: T) => void;
}

// Limit
export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
  setLimit: (limit: number) => void;
}

// Search Bar Props
export interface SearchBarProps {
  setManufacturer: (manufacturer: string) => void;
  setModel: (model: string) => void;
}
