import React, { useState } from "react";
import ProfileUserInfoData from "./ProfileUserInfoData";


const ProfileUserInfo = () => {
  const styles = {
    label: "font-semibold",
    text: "font-montserrat text-gray-600 text-sm",
  };
  return (
    <main className="p-10 pt-2 font-inter w-full overflow-y-auto">
      <ProfileUserInfoData styles={styles}/>
    </main>
  );
};

export default ProfileUserInfo;
