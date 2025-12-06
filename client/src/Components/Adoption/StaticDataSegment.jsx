import React, { useState } from "react";
import dogChild from "../../assets/dog-child.webp";
import dogMan from "../../assets/wholesome-pic.jpg";
import manCat from "../../assets/man-hugging-cat.jpg";
import tabbyCat from "../../assets/Tabby-Cat.jpg";
import { Card, CardContent } from "../ui/card";
import { ArrowRight } from "lucide-react";
import { adoptionFormControls } from "../config";
import CommonForm from "../Utils/CommonForm";
import Slideshow from "./SlideShow";
import { useLocation, useSearchParams } from "react-router-dom";
import handleFilterChange from "./utils/handleFilterChange";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import catIcon from '../../assets/cat.png'
import dogIcon from '../../assets/dog-3.png'
import birdIcon from '../../assets/bird.png'
import rabbitIcon from '../../assets/rabbit.png'

const initialFormData = {
  breed: "",
  region: "",
  age: [0, 0],
};

const StaticDataSegment = () => {
  console.log("full page refresh");
  const [tempFormData, setTempFormData] = useState(() => initialFormData);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isRequestLocation = location.pathname.includes("/request");
  const onSubmit = (e) => {
    e.preventDefault();
    const updates = {};
    if (tempFormData.breed !== "") {
      updates.breed = tempFormData.breed;
    }
    if (tempFormData.region !== "") {
      updates.region = tempFormData.region;
    }
    if (tempFormData.age[0] === tempFormData.age[1]) {
      updates.age = { min: null, max: null };
    } else {
      updates.age = { min: tempFormData.age[0], max: tempFormData.age[1] };
    }
    updates.page = 1
    handleFilterChange(setSearchParams, updates);
    setTempFormData(prevData => ({...prevData, breed: '', region: ''}));
  };

  const slides = [dogChild, manCat, tabbyCat, dogMan];

  const selectedTypes = searchParams.get("animalType")?.split(",") || [];
  const selectedBreed = searchParams.get("breed")?.split(",") || [];
  const selectedRegion = searchParams.get("region")?.split(",") || [];
  //const filter = { selectedTypes, selectedBreed, selectedRegion };
  //console.log(filter, 'filter')

  const styles = {
    selectTrigger: `w-full bg-[#F2EED9] hover:bg-[#e4d1cd] border-[#8C7A3F] cursor-pointer ${
      !selectedTypes.length
        ? "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60"
        : null
    }`,
    selectContent: "bg-[#F2EED9] border-[#8C7A3F] cursor-pointer",
    selectItem: "focus:bg-[#e4d1cd] cursor-pointer",
    input: "bg-[#F2EED9] outline-[#fffae6] border-[#8C7A3F] cursor-pointer",
    button: "mt-4 active:font-semibold cursor-pointer",
    slider: `
  [&>span:first-child]:bg-[#c9c19c]
  [&_[role=slider]]:bg-[#fefae6] cursor-pointer
  [&_[role=slider]]:border-[#8C7A3F]
`
      .replace(/\s+/g, " ")
      .trim(),
  };

  const getPetIcon = (pet) => {
    let icon;
    switch (pet) {
      case 'cat':
        icon = <img src={catIcon} alt="cat-icon" width={36}/>
        break;
      case 'dog':
        icon = <img src={dogIcon} alt="cat-icon" width={36}/>
        break;
      case 'rabbit':
        icon = <img src={rabbitIcon} alt="cat-icon" width={36}/>
        break;
      case 'bird':
        icon = <img src={birdIcon} alt="cat-icon" width={36}/>
        break;
      
      default:
        icon = <p>loading...</p>
        break;
    }
    return icon
  }
  const petType = ["cat", "dog", "rabbit", "bird"].map((pet) => {
    const isSelected = selectedTypes?.includes(pet);
    return (
      // <button className="w-20 h-14 text-2xl bg-card">{pet}</button>
      <Card
        key={pet}
        className={`w-26 flex justify-center items-center cursor-pointer ${
          !isSelected
            ? "bg-[#F2EED9] hover:bg-[#e4d1cd]"
            : "bg-[#e4d1cd] hover:bg-[#d6b9b3] font-bold"
        } ${
          isRequestLocation ? "opacity-60 cursor-not-allowed" : null
        }  border-[#8C7A3F] `}
        onClick={
          isRequestLocation
            ? undefined
            : () => {handleFilterChange(setSearchParams, {animalType : pet, page: 1})}
        }
      >
        <CardContent className={'flex flex-col items-center justify-center'}>
          {getPetIcon(pet)}
          <p className="text-md font-montserrat">
            {pet.charAt(0).toUpperCase() + pet.slice(1) + "s"}
          </p>
        </CardContent>
      </Card>
    );
  });

  const isSelectDisabled = selectedTypes
    ? Boolean(selectedTypes.length)
    : Boolean(selectedTypes);

  let uniqueBreeds;
  // console.log(getControlItem.options, 'get Control Item')

  if (selectedTypes && selectedTypes.length !== 0) {
    const selectedBreedLists = adoptionFormControls[0]?.options
      ?.filter((pet) => selectedTypes.includes(pet.petType))
      ?.flatMap((pet) => pet.breed);

    // Step 3: Deduplicate if needed
    uniqueBreeds = Array.from(new Set(selectedBreedLists));
  }
  return (
    <main className="mt-30">
      <section className="flex justify-center gap-6">
        <Slideshow slides={slides} />
        <div className="w-[650px]">
          <h2 className="mt-4 text-5xl font-bold break-words">
            A Paw-some Companion is Just a Click Away!
          </h2>
          <h4 className="mt-2 text-3xl break-words">
            Save a Life and Gain a Loyal Companion
          </h4>
          <h5 className="mt-6 text-2xl font-semibold">Pet Type:</h5>
          {/* <div className="mt-2 flex gap-4">{petType}</div> */}
          <div className="mt-2 flex justify-between items-end">
            <section className="flex gap-4">{petType}</section>
            <button
              className={`text-md underline hover:font-semibold cursor-pointer ${
                isRequestLocation ? "opacity-50 cursor-not-allowed" : null
              }`}
              onClick={() => {
                setSearchParams({});
                setTempFormData(initialFormData);
              }}
              disabled={isRequestLocation}
            >
              Clear All Filters
            </button>
          </div>
          <section className="mt-3">
            <form onSubmit={onSubmit} className="flex flex-col gap-1.5">
              <section className="grid w-full gap-1">
                <Label htmlFor={"breed"} id={"breed"}>
                  Breed
                </Label>
                <Select
                  onValueChange={(value) =>
                    setTempFormData({
                      ...tempFormData,
                      breed: value,
                    })
                  }
                  value={tempFormData.breed}
                  id={"breed"}
                  name={"breed"}
                  disabled={!isSelectDisabled || isRequestLocation}
                >
                  <SelectTrigger className={styles.selectTrigger}>
                    <SelectValue
                      placeholder={adoptionFormControls[0]?.placeholder}
                    />
                  </SelectTrigger>
                  <SelectContent className={styles.selectContent}>
                    {selectedTypes && selectedTypes.length !== 0
                      ? uniqueBreeds.map((breed) => (
                          <SelectItem
                            key={breed}
                            value={breed}
                            className={styles.selectItem}
                          >
                            {selectedBreed.includes(breed) ? (
                              <span className="font-semibold">{breed}</span>
                            ) : (
                              breed
                            )}
                          </SelectItem>
                        ))
                      : null}
                  </SelectContent>
                </Select>
              </section>

              <section className={"flex flex-col gap-0.5"}>
                <Label htmlFor={"region"} id={"region"}>
                  Region
                </Label>
                <Select
                  onValueChange={(value) =>
                    setTempFormData({ ...tempFormData, region: value })
                  }
                  value={tempFormData.region}
                  id={"region"}
                  name={"region"}
                  disabled={isRequestLocation}
                >
                  <SelectTrigger className={styles.selectTrigger}>
                    <SelectValue
                      placeholder={adoptionFormControls[1]?.placeholder}
                    />
                  </SelectTrigger>
                  <SelectContent className={styles.selectContent}>
                    {adoptionFormControls[1]?.options.map((district) => (
                      <SelectItem
                        key={district.id}
                        value={district.name}
                        className={styles.selectItem}
                      >
                        {selectedRegion.includes(district.name) ? (
                          <span className="font-semibold">{district.name}</span>
                        ) : (
                          district.name
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </section>
              <section className={"flex flex-col gap-3"}>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Min: {tempFormData.age[0]} years</span>
                    <span>Max: {tempFormData.age[1]} years</span>
                  </div>
                  <Slider
                    min={0}
                    max={30}
                    step={1}
                    value={tempFormData.age}
                    onValueChange={(value) =>
                      setTempFormData({ ...tempFormData, age: value })
                    }
                    className={styles.slider}
                    disabled={isRequestLocation}
                  />
                </div>
              </section>
              <section>
                <Button className={"mt-3 w-full active:font-semibold cursor-pointer"} disabled={isRequestLocation}>
                  {
                    <>
                      <div className="flex justify-center items-center gap-1">
                        <p>Start your search</p> <ArrowRight />
                      </div>
                    </>
                  }
                </Button>
              </section>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
};

export default StaticDataSegment;
