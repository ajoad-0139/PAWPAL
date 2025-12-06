import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import defaultPic from "../../assets/defaultAvatar.png";
import beckham from "../../assets/beckham.jpg";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { toast } from "sonner";
import profilePicUploader from "./profilePicUploader";
import { setProfilePicture, setUser, user } from "@/Store/Auth";
import { useDispatch, useSelector } from "react-redux";

const ProfileHeader = ({ userInfo }) => {
  const fileInputRef = useRef(null);
  const { userId } = useParams();
  const dispatch = useDispatch()
  console.log(userId);
  console.log(userInfo, 'profile header')
  const currentUserData = useSelector(user);

  const showAddIcon = userId ? currentUserData?.userId === userId : true;
  console.log(showAddIcon, 'add icon');
  

  const currentDate = new Date().toLocaleString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: true,
    timeZone: "Asia/Dhaka",
  });

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    try {
      toast("Uploading photo...");
      const formData = new FormData();
      formData.append("image", file);
      console.log(userInfo?.userId, 'pp')
      const updatedUser = await profilePicUploader(userInfo?.userId, formData);

      console.log(updatedUser, "updatedUserinfo")
      if (updatedUser) {
        toast.success("Photo uploaded successfully", { duration: 3000 });
        dispatch(setProfilePicture(updatedUser))
      }
    } catch (error) {
      toast.error("Upload failed", {
        duration: 3000,
        description: error?.message || "Something went wrong",
      });
    }
  };
  return (
    <div className="flex justify-start items-center gap-x-2">
      <div className="relative">
        <img
          src={userInfo?.user?.profilePicture || defaultPic}
          alt="profile-picture"
          className="w-[120px] h-[120px] rounded-full object-cover shadow-xl"
        />
        {showAddIcon ? <div className="absolute right-0 top-[70%] bg-[#c9c19c] rounded-full p-1">
          <Input
            ref={fileInputRef}
            id="profile-photo"
            name="photo"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={handleUploadClick}
            className="flex justify-center items-center p-0"
          >
            <Plus size={16} />
          </button>
        </div>: null}
      </div>
      <div className="flex flex-col justify-around">
        <h3 className="font-semibold font-montserrat text-3xl">
          {userInfo?.user?.name}
        </h3>
        <span className="text-[#565656] font-montserrat">{currentDate}</span>
      </div>
    </div>
  );
};

export default ProfileHeader;
