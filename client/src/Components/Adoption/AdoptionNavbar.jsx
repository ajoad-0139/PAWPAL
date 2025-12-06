import React from "react";
import { NavLink } from "react-router-dom";

const AdoptionNavbar = () => {
  const activeStyles = {
    backgroundColor: `#F2EED9`,
    fontWeight: 'bold',  // Make text bold
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)', // Add shadow to the text
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', // shadow-xl equivalent
    borderRadius: '0.375rem', // equivalent of rounded-md
    borderWidth: '1px', // Equivalent of Tailwind's border-1
    borderColor: '#3c3720' // Border color
};

  
  return (
    <nav className="mt-10 w-full flex font-semibold text-xl">
        <NavLink
          to={"."}
          className={
            "w-full flex justify-center items-center py-2"
          }
          end
          style={({isActive}) => isActive ? activeStyles:null}
        >
          Find Pets
        </NavLink>
        <NavLink
          to={"request"}
          className={
            "w-full flex justify-center items-center py-2"
          }
          style={({isActive}) => isActive ? activeStyles:null}
        >
          Request Adoption
        </NavLink>
    </nav>
  );
};

export default AdoptionNavbar;
