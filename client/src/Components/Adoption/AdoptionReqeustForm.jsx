import React from "react";
import PetDetailsForm from "./PetDetailsForm";

const AdoptionReqeustForm = () => {
  return (
    <section>
      <h2 className="text-lg font-semibold mt-4">
        *Fill up this form below to request for adoption of your furry/feathery
        friend:
      </h2>
      <div className="border-2 border-[#8C7A3F] rounded-xl p-12 pt-4 mt-8 shadow-2xl">
        <PetDetailsForm />
      </div>
    </section>
  );
};

export default AdoptionReqeustForm;
