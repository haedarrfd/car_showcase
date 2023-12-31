"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Hero, SearchBar, CustomFilter, CarCard, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import { CarState } from "@/types";

export default function Home() {
  const [allCars, setAllCars] = useState<CarState>([]);
  const [loading, setLoading] = useState(false);
  // Search States
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  // Filter States
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);
  // Pagination Limit
  const [limit, setLimit] = useState(10);

  // Get Car API
  const getCars = async () => {
    setLoading(true);

    try {
      const data = await fetchCars({
        manufacturer: manufacturer || "",
        year: year || 2023,
        fuel: fuel || "",
        limit: limit || 10,
        model: model || "",
      });

      setAllCars(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, [fuel, year, limit, manufacturer, model]);

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter
              title="year"
              options={yearsOfProduction}
              setFilter={setYear}
            />
          </div>
        </div>

        {/* checking fetch data allCars */}
        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            {loading && (
              <div className="w-full mt-16 flex-center">
                <Image
                  src="/loader.svg"
                  alt="Loading"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            )}

            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          !loading && (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">No Result</h2>
              <p>{allCars?.message}</p>
            </div>
          )
        )}
      </div>
    </main>
  );
}
