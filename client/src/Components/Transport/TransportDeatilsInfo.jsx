import React from "react";
import { Separator } from "../ui/separator";

const TransportDeatilsInfo = ({ agency, owner, pet, travel, isApproved, isCompleted }) => {
  const approved = isApproved && !isCompleted
  const completed = isApproved && isCompleted
  return (
    <section className="w-ful p-6 rounded-lg shadow-xl bg-[#F2EED9] border-2 border-[#8C7A3F] max-h-[440px] overflow-y-auto custom-scrollbar">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold font-montserrat">
            Transportation Details
          </h2>
          <span className={`${completed? 'bg-red-400' : approved ? 'bg-green-400' :  'bg-[#d1d1d1]'} rounded-md px-5 py-2`}>{completed? 'Completed' : approved ? 'Approved' :  'Pending'}</span>
        </div>
        <Separator className={"bg-[#8C7A3F] my-2"} />
        <div>
          <ul className="flex justify-start gap-16 text-xl text-[#565656] mt-4 ml-5 list-disc">
            <li className="font-semibold">{agency?.name}</li>
            <li>{agency?.type}</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <h2 className="text-2xl font-semibold font-montserrat">Pet Info</h2>
        <Separator className={"bg-[#8C7A3F] my-2"} />
        <div>
          <ul className="flex justify-start gap-16 text-xl text-[#565656] mt-4 ml-5 list-disc">
            <li className="font-semibold">{pet?.type}</li>
            <li>{pet?.breed.charAt(0).toUpperCase() + pet?.breed.slice(1)}</li>
            <li>{pet?.gender}</li>

            <li>
              Total:
              {" " + pet?.amount}
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <h2 className="text-2xl font-semibold font-montserrat">Travel Info</h2>
        <Separator className={"bg-[#8C7A3F] my-2"} />
        <div>
          <ul className="flex justify-start gap-16 text-xl text-[#565656] mt-4 ml-5 list-disc">
            <li className="font-semibold">
              Pickup:{" " + travel?.sourceAddress}
            </li>
            <li>Destination: {" " + travel?.destinationAddress}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TransportDeatilsInfo;
