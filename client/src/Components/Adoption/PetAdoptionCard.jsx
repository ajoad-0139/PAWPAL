import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import getUserDetailsWithId from "../Profile/user/getUserDetailsWithId";


const PetAdoptionCard = ({
  name,
  image,
  animalType,
  sex,
  breed,
  age,
  _id,
  address,
  isAdmin,
  onDeletePost,
  userId
}) => {

  const [info,setInfo] = useState("Unknown user");
  const petBreed =
    breed.length > 9 ? breed.substring(0, 8).concat("..") : breed;
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

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await getUserDetailsWithId(userId)
      setInfo(response)
    }
    getUserInfo()
  },[userId])

  return (
    <Link to={!isAdmin ? `${_id}` : `.`}>
      <main className="group bg-[#F2EED9] hover:bg-[#e4d1cd] rounded-tl-xl rounded-tr-xl shadow-xl">
        <div className="relative rounded-tl-xl rounded-tr-xl flex flex-col">
          <img
            src={image[0]}
            alt=""
            className="h-66 w-100 rounded-tl-xl rounded-tr-xl object-cover"
          />
          <div className="absolute right-0 left-0 bottom-0 flex flex-col py-2 justify-center bg-[#F2EED9] items-center rounded-t-full group-hover:bg-[#e4d1cd]">
            <h1 className="text-2xl gloria-hallelujah-regular">{name}</h1>
          </div>
        </div>
        <div className="flex justify-between items-center gap-8 text-lg font-normal px-8 mt-4">
          <h3>{sex.charAt(0).toUpperCase() + sex.slice(1)}</h3>
          <h3>{petBreed}</h3>
          <h3>{petTypeByAge}</h3>
        </div>
        {isAdmin ? (
          <div className="flex px-8 flex-col gap-1 mt-2 font-semibold">
            <h4>Owner: {address.name}</h4>
            <Link to={`/profile/${info?.userId}`}>Posted by: {info?.user?.name}</Link>
          </div>
        ) : null}
        <div className="flex mt-4 font-3xl font-semibold gap-1 px-8 items-center justify-start pb-4">
          <MapPin />
          <h3>{address.location}</h3>
        </div>

        {isAdmin ? (
          <div className="px-5 pb-6">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className={"bg-red-500 hover:bg-red-700 w-full cursor-pointer"}>
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className={"bg-[#fffae6]"}>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this post and remove it from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDeletePost(_id)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : null}
      </main>
    </Link>
  );
};

export default PetAdoptionCard;
