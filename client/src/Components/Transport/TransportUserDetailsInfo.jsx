import React from "react";
import { Separator } from "../ui/separator";

const TransportUserDetailsInfo = ({ owner }) => {
  return (
    <section className="w-ful p-6 rounded-lg shadow-xl bg-[#F2EED9] border-2 border-[#8C7A3F]">
      <h2 className="text-2xl font-semibold font-montserrat">Owner Info</h2>
      <Separator className={"bg-[#8C7A3F] my-2"} />
      <div>
          <ul className="flex justify-start gap-16 text-xl text-[#565656] mt-4 ml-5 list-disc">
            <li className="font-semibold">{owner?.firstName +" "+ owner?.lastName}</li>
            <li>{owner?.email}</li>
            <li>{owner?.mobileNo}</li>
          </ul>
        </div>
    </section>
  );
};

export default TransportUserDetailsInfo;
