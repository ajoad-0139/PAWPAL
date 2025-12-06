import { Button } from "@/Components/ui/button";
import { deletePost, getAllPosts } from "@/Store/AdoptionPostSlice";
import { Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ProfileAdoptionCard = ({
  _id,
  name,
  animalType,
  breed,
  image,
  adoptedBy,
  address,
  age,
  sex,
  showDelete,
  handleDeleteSubmission
}) => {
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
  
  return (
    <div className="w-full bg-[#F2EED9] hover:shadow-lg border-2 border-[#8C7A3F] shadow-md rounded-md p-4 flex justify-between items-center">
      <Link
        to={`/adoption/${_id}`}
        className="flex justify-start items-center gap-3 w-full"
      >
        <img
          src={image[0]}
          alt=""
          className="w-[120px] h-[120px] object-cover rounded-full"
        />
        <div className="flex flex-col">
          <h3 className="text-2xl font-montserrat font-semibold pb-0 mb-0">
            {name}
          </h3>

          <ul className="flex justify-start gap-10 text-md text-[#565656] mt-1 ml-5 list-disc">
            <li>{animalType.charAt(0).toUpperCase() + animalType.slice(1)}</li>
            <li>{breed}</li>
            <li>{sex.charAt(0).toUpperCase() + sex.slice(1)}</li>
            <li>{petTypeByAge}</li>
          </ul>
          <div>
            <h6 className="font-inter font-semibold mt-1 text-[#565656]">
              Owner: {address.name}
            </h6>
          </div>
        </div>
      </Link>

      {showDelete && (
        <section className="flex flex-col justify-center items-center gap-2 ml-4">
          <button
            onClick={() => {
              handleDeleteSubmission(_id);
            }}
            className="p-2 rounded-md hover:shadow-md hover:bg-red-200 active:font-bold font-semibold"
          >
            <Trash2 color="red" size={32} />
          </button>
        </section>
      )}
    </div>
  );
};

export default ProfileAdoptionCard;

{
  /* <Button
            className={
              "w-[20vh] hover:shadow-md bg-red-500 hover:hover:bg-red-700 hover:font-semibold active:font-bold font-semibold"
            }
          >
            Delete
          </Button> */
}
