import React from "react";
import { Link, useParams } from "react-router-dom";
import { ClipboardCheck, MapPin, Pencil, ShieldCheck, ShieldX } from "lucide-react";
import { Separator } from "../ui/separator";


const PetDetailsInfo = ({name, description, _id, sex, animalType, age, breed, createdAt, updatedAt, userId: postUserId, vaccine, address, activeUserId, isAdopted, adoptedBy }) => {
  console.log('rerendered')
  const petTypeByAge =
    age < 1
      ? animalType === "rabbit"
        ? "Kit"
        : animalType === "cat"
        ? "Kitten"
        : animalType === "dog"
        ? "Puppy"
        : "Chick"
      : "Adult";   
      console.log(adoptedBy, 'adopt')
  return (
    <section className="w-ful p-6 rounded-lg shadow-xl bg-[#F2EED9] border-2 border-[#8C7A3F] max-h-[440px] overflow-y-auto scrollbar-hidden">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          <h2 className="gloria-hallelujah-regular text-5xl">{name}</h2>
        {
          postUserId === activeUserId ? (
            <Link to={`../adoption/request?postId=${_id}`}>
              <Pencil />
            </Link>
          ) : null
        }
        </div>
        <span className={`${isAdopted? 'bg-green-300': 'bg-[#d1d1d1]'} rounded-md px-5 py-2`}>{!isAdopted? "Pending" : "Adopted"}</span>
        
      </div>
      <div className="flex justify-start gap-7 items-center text-2xl font-semibold mt-8">
        <h3>{breed}</h3>
        <div className="flex justify-start gap-1 items-center">
          <MapPin/>
          <h3>{address.location}</h3>
        </div>
      </div>
      <div>
        <ul className="flex justify-start gap-16 text-xl text-[#565656] mt-4 ml-5 list-disc">
          <li>{animalType.charAt(0).toUpperCase()+animalType.slice(1)}</li>
          <li>{petTypeByAge}</li>
          <li>{sex.charAt(0).toUpperCase()+sex.slice(1)}</li>
          <li>{age<1? `${(age*10*12)/10} Months`: `${age} Years`}</li>
          <li>{'1'}Kg</li>
        </ul>
      </div>
      <Separator className={'bg-[#8C7A3F] my-2'}/>
      <h3 className="text-xl font-semibold">About {name}</h3>
      <ul className="list-disc ml-5 mt-2">
        <li>{description}</li>
      </ul>
      <div className="flex justify-start items-center gap-4 mt-4 text-xl font-semibold">
        <div className="flex items-center justify-start ">
          {vaccine.sterilized? <ClipboardCheck color="#48bb78"/> : <ShieldX color="#EF5350"/>}<h4>Sterilized</h4>
        </div>
        <div className="flex items-center justify-start ">
          {vaccine.fluVaccine? <ShieldCheck color="#48bb78"/> : <ShieldX color="#EF5350"/>} <h4>Flu Vaccine</h4>
        </div>
        <div className="flex items-center justify-start">
          {vaccine.rabiesVaccine? <ShieldCheck color="#48bb78"/> : <ShieldX color="#EF5350"/>}<h4>Rabies Vaccine</h4>
        </div>      
        <div className="flex items-center justify-start">
          {vaccine.dewormed? <ShieldCheck color="#48bb78"/> : <ShieldX color="#EF5350"/>}<h4>Dewormed</h4>
        </div>      
      </div>
      <Separator className={'bg-[#8C7A3F] my-2'}/>
      <h3 className="text-xl font-semibold">Adopted by:</h3>
      <ul className="mt-2 list-disc ml-5">
        <li>{adoptedBy}</li>
      </ul>
    </section>
  );
};

export default PetDetailsInfo;
