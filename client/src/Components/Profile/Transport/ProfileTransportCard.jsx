import { setSingleTransportDetails } from '@/Store/Transport';
import { Trash2 } from 'lucide-react';
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const ProfileTransportCard = ({
  _id,
  owner,
  pet,
  travel,
  agency,
  document, showDelete, dispatch, completeObject, handleDelete
}) => {
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/transport/${_id}`)} className="w-full bg-[#F2EED9] hover:shadow-lg border-2 border-[#8C7A3F] shadow-md rounded-md p-4 flex justify-between items-center">
      <section className="flex justify-start items-center gap-3">
        <img
          src={document?.standing}
          alt="pet-photo"
          className="w-[120px] h-[120px] object-cover rounded-full"
        />
        <div className="flex flex-col">
          <h3 className="text-2xl font-montserrat font-semibold pb-0 mb-0">
            {agency.name}
          </h3>

          <ul className="flex justify-start gap-10 text-md text-[#565656] mt-1 ml-5 list-disc">
            <li>{pet?.type.charAt(0).toUpperCase() + pet.type.slice(1)}</li>
            <li>{pet.breed}</li>
            <li>{pet.gender}</li>
            <li>{travel.sourceAddress}</li>
            <li>{travel.destinationAddress}</li>
          </ul>
          <div>
            <h6 className="font-inter font-semibold mt-1 text-[#565656]">
              Owner: {owner.firstName+" "+owner.lastName}
            </h6>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center gap-2 mr-6">
        {showDelete ? (
          <button onClick={(e) => {
            e.stopPropagation()
            handleDelete(_id)
          }} className="p-2 rounded-md hover:shadow-md hover:bg-red-200 active:font-bold font-semibold">
            <Trash2 color="red" size={32} />
          </button>
        ) : null}
      </section>
    </div>
  );
}

export default ProfileTransportCard