import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, fuel, limit, model } = filters;

  const headers = {
    "X-RapidAPI-Key": "4bdeaef401msh9275e469055d188p1ee7aajsn31cb78e3eedf",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    {
      headers: headers,
    }
  );

  const data = await response.json();
  return data;
}

// calculate rent a car
export const calculateCarRent = (city_mpg: number, year: number) => {
  // price per day in dollars
  const basePricePerDay = 50;
  // additional rate per mile driven
  const mileageFactor = 0.1;
  // additional rate per year of vehicle age
  const ageFactor = 0.05;

  // calculate addtional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageFactor + ageRate;

  // return total price
  return rentalRatePerDay.toFixed(0);
};

// generate car image from imagin studio api car image
export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append(
    "customer",
    process.env.NEXT_PUBLIC_IMAGIN_API_KEY || ""
  );
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathName;
};
