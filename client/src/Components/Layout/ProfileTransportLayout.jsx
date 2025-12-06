import React from "react";
import ProfileTransportNavbar from "../Profile/Transport/ProfileTransportNavbar";
import { Outlet } from "react-router-dom";

const ProfileTransportLayout = () => {
  return (
    <main className="p-10 pt-2 font-inter w-full">
      <ProfileTransportNavbar />
      <section className="w-full max-h-[68vh] overflow-y-auto scrollbar-hidden">
        <Outlet />
      </section>
    </main>
  );
};

export default ProfileTransportLayout;
