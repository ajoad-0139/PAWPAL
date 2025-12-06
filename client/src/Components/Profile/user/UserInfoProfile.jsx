import React from "react";

const UserInfoProfile = () => {
  return (
    <main className="flex flex-col justify-center items-center">
      <h3 className="text-3xl font-montserrat underline">User Information</h3>
			<div className="grid grid-cols-2 border-2 border-red-500 p-5 gap-x-50 gap-y-8">
				<section className="flex justify-start items-center gap-2">
					<h6 className="font-bold ">Username:</h6>
					<p className="text-[#565656]">Muntasir Mamun</p>
				</section>
				<section className="flex justify-start items-center gap-2">
					<h6 className="font-bold">Email:</h6>
					<p className="text-[#565656]">mamun.muntasir003@gmail.com</p>
				</section>
			</div>
    </main>
  );
};

export default UserInfoProfile;
