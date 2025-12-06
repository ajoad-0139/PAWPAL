import { UsersRound } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import ProfileUserInfoForm from "./user/ProfileUserInfoForm";
import { useSelector } from "react-redux";
import { user } from "@/Store/Auth";

const ProfileNavbar = ({ userInfo }) => {
  const userData = useSelector(user)
  const userType = userInfo?.user?.isAdmin ? "Admin" : "User";
  const showEdit = userData?.userId === userInfo?.userId

  return (
    <main className="mt-10 border-[#8C7A3F] border-2 rounded-t-lg p-4 bg-[#F2EED9] flex items-center justify-between">
      <section className="flex items-center justify-start gap-2 ml-8">
        <UsersRound size={18} />
        <h4 className="font-inter hover:font-semibold">{userType}</h4>
      </section>
      {showEdit ? <section>
        <ProfileUserInfoForm userData={userData}/>
      </section>: null}
    </main>
  );
};

export default ProfileNavbar;
