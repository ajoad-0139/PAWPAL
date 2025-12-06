import React, { useEffect, useState } from "react";
import { userPostedAnimals } from "./userPostedAnimals";
import ProfileAdoptionCard from "./ProfileAdoptionCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { user } from "@/Store/Auth";
import { deletePost, getAllPosts } from "@/Store/AdoptionPostSlice";
import { toast } from "sonner";

const Pending = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const userData = useSelector(user);
  const profileId = userId ? userId : userData?.userId;
  const [adoptionInfo, setAdoptionInfo] = useState([]);

  useEffect(() => {
    const getAdoptionInfo = async () => {
      try {
        const response = await dispatch(getAllPosts());
        setAdoptionInfo(response?.payload?.posts);
      } catch (error) {
        toast.error("Failed to get adoption data", { duration: 3000 });
        setAdoptionInfo([]);
      }
    };
    getAdoptionInfo();
  }, [dispatch]);

  const pendingList = adoptionInfo
    ?.filter((pet) => pet.userId === profileId && !pet.isAdopted)
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const showDelete = profileId === userData?.userId;
  console.log(showDelete);

  const handleDeleteSubmission = async (id) => {
    try {
      const actionResult = await dispatch(deletePost(id));

      if (deletePost.fulfilled.match(actionResult)) {
        toast.success("Post has been deleted successfully.", {
          duration: 3000,
        });
      } else {
        toast.error("The post could not be deleted", {
          description:
            actionResult.payload?.message || "Please try again later",
          duration: 3000,
        });
      }
      const response = await dispatch(getAllPosts());
      setAdoptionInfo(response?.payload?.posts);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.", {
        description: "Please try again later",
        duration: 3000,
      });
    }
  };
  return (
    <div className="flex flex-col justify-start gap-6 mt-4">
      <div className="flex w-full justify-start items-center">
        <h6 className="text-[#565656] font-montserrat text-sm">
          {pendingList?.length} pets looking for furr-ever home
        </h6>
      </div>
      {pendingList?.length
        ? pendingList?.map((pendingPost) => (
            <ProfileAdoptionCard
              key={pendingPost.id}
              {...pendingPost}
              showDelete={showDelete}
              handleDeleteSubmission={handleDeleteSubmission}
            />
          ))
        : null}
    </div>
  );
};

export default Pending;
