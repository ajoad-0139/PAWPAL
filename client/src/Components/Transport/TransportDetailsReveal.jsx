import React, { useEffect, useState } from "react";
import TransportCarousel from "./TransportCarousel";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleTransportById, singleTransportDetails } from "@/Store/Transport";
import { toast } from "sonner";
import { Heading1 } from "lucide-react";
import TransportDeatilsInfo from "./TransportDeatilsInfo";
import TransportUserDetailsInfo from "./TransportUserDetailsInfo";
import TransportChatComponent from "./TransportChatComponent";
import { Button } from "../ui/button";
import { user } from "@/Store/Auth";
import helperFunctionApproved, {
  helperFunctionCompleted,
} from "./helperFunction";

const TransportDetailsReveal = () => {
  const allTransportData = useSelector(singleTransportDetails)
  console.log(allTransportData, 'alltransportdata')
  const { postId } = useParams();
  console.log(postId, "postId");
  const dispatch = useDispatch();
  const userData = useSelector(user);
  const isAdmin = userData?.user?.isAdmin;

  useEffect(() => {
    const getTransportData = async () => {
      try {
        const response = await dispatch(getSingleTransportById(postId));
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    getTransportData();
  }, [dispatch, postId]);
  console.log(allTransportData, "alltransportdata");

  const onApproveClick = async () => {
    await helperFunctionApproved(postId);
    const response = await dispatch(getSingleTransportById(postId));
  };
  const onCompletedClick = async () => {
    await helperFunctionCompleted(postId);
    const response = dispatch(getSingleTransportById(postId));
  };
  return allTransportData ? (
    <div className="flex flex-col h-full w-full overflow-y-scroll scrollbar-hidden bg-[#fffae6] pt-36 px-14">
      <div className="w-full flex items-center justify-center">
        <TransportCarousel
          image1={allTransportData?.document?.sitting}
          image2={allTransportData?.document?.standing}
        />
      </div>

      <section className="grid grid-cols-2 gap-3 mt-10 mb-10">
        <div className="flex flex-col gap-4">
          <TransportDeatilsInfo {...allTransportData} />
          <TransportUserDetailsInfo {...allTransportData} />
        </div>
        <TransportChatComponent postId={postId} userData={userData} />
      </section>

      {isAdmin ? (
        <section className="flex justify-center items-center gap-x-10 mb-40">
          <Button onClick={onApproveClick} disabled={allTransportData?.isApproved} className={"w-50 bg-green-400"}>
            Approve
          </Button>
          <Button onClick={onCompletedClick} disabled={allTransportData?.isCompleted} className={"w-50 bg-red-400"}>
            Complete
          </Button>
        </section>
      ) : null}
    </div>
  ) : (
    <h1>Loading Data....</h1>
  );
};

export default TransportDetailsReveal;
