import { House, Mail, MessageCircle, Phone } from "lucide-react";
import React from "react";


const UserInfo = ({user}) => {
  const {name, email, phone, location } = user;
  const isActive = true
  return (
    <section className="w-ful p-6 rounded-lg shadow-xl bg-[#F2EED9] border-2 border-[#8C7A3F]">
      <h2 className="text-4xl font-bold">Owner/Rescuer Info:</h2>
      <div className="flex justify-between items-center mt-8">
        <div className="flex justify-start items-center gap-4">
          <h2 className="text-3xl font-semibold">{name}</h2>
        </div>
      </div>
      <div className="flex justify-start gap-12 items-center mt-8 text-lg text-[#565656] font-bold">
        <div className="flex justify-start gap-1 items-center">
          <Phone/> <h3>{phone}</h3>
        </div>
        <div className="flex justify-start gap-1 items-center">
          <Mail /> <h3>{email}</h3>
        </div>
      </div>
      <div className="flex justify-start gap-1 items-center mt-4 text-lg text-[#565656] font-bold">
      <House /> <h3>{location}</h3>
      </div>
    </section>
  );
};

export default UserInfo;
