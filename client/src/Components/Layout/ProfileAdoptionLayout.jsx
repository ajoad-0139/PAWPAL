import React from "react";
import ProfileAdoptionNavbar from "../Profile/adoption/ProfileAdoptionNavbar";
import { Outlet } from "react-router-dom";

const ProfileAdoptionLayout = () => {
  return (
    <main className="p-10 pt-2 font-inter w-full">
      <ProfileAdoptionNavbar />
      <section className="w-full max-h-[68vh] overflow-y-auto scrollbar-hidden">
        <Outlet />
      </section>
    </main>
  );
};

export default ProfileAdoptionLayout;
