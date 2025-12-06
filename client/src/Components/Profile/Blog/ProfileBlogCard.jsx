import { Button } from "@/Components/ui/button";
import { setBlog, setBlogUser } from "@/Store/Blog";
import {
  extractFirstImageUrl,
  extractFirstParagraph,
  extractHeadings,
} from "@/Utils/blog";
import { Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import getUserDetailsWithId from "../user/getUserDetailsWithId";

const ProfileBlogCard = ({
  item,
  showDelete,
  dispatch,
  handleBlogDelete,
  userData, reqId, toggleFeature
}) => {
  const imageUrl = extractFirstImageUrl(item?.content?.content);
  const headings = extractHeadings(
    item.content?.content?.[0]
      ? { type: "doc", content: item.content.content }
      : { type: "doc", content: [] }
  );
  const content = extractFirstParagraph(item?.content?.content);
  const contentAsHeading =
    content?.length > 34 ? content?.substring(0, 33).concat("..") : content;
  const title = headings[0]?.text || contentAsHeading || "Untitled";
  const featureStatus = item.isFeature;
  const blogType = item.type;
  const handleClick = async()=>{
    const user = await getUserDetailsWithId(item?.userId)
    await dispatch(setBlogUser(user))
    await dispatch(setBlog(item?.content))
  }
  return (
    <main
      onClick={handleClick}
      className="w-full bg-[#F2EED9] hover:shadow-lg border-2 border-[#8C7A3F] shadow-md rounded-md p-4 flex justify-between items-center"
    >
      <section className="flex justify-start items-center gap-3">
        <img
          src={imageUrl}
          alt="blog-image"
          className="w-[120px] h-[120px] object-cover rounded-full"
        />
        <div className="flex flex-col">
          <h3 className="text-2xl font-montserrat font-semibold pb-0 mb-0">
            {title}
          </h3>

          <ul className="flex justify-start gap-10 text-md text-[#565656] mt-1 ml-5 list-disc">
            {featureStatus? <li className="text-green-500 font-semibold">Featured</li>: null}
            <li>{blogType.charAt(0).toUpperCase() + blogType.slice(1)}</li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center gap-3 mr-6">
        {userData?.user?.isAdmin ? (
          <Button onClick={(e) => {
            e.stopPropagation()
            toggleFeature(item._id)
          }} className={'w-[200px]'}>
            {!featureStatus ? 'Add to Featured' : 'Remove from featured'}
          </Button>
        ) : null}
        {showDelete ? (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleBlogDelete(item._id, reqId);
            }}
            className="p-2 rounded-md hover:shadow-md hover:bg-red-600 active:font-bold font-semibold bg-red-400 text-white w-[200px]"
          >
            Delete
          </Button>
        ) : null}
      </section>
    </main>
  );
};

export default ProfileBlogCard;
