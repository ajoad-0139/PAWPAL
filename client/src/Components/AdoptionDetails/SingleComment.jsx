import { CircleUserRound } from "lucide-react";
import React from "react";
import CommentForm from "./CommentForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Link } from "react-router-dom";

const SingleComment = ({
  rootComment,
  currentUserId,
  replies,
  activeComment,
  setActiveComment,
  parentId = null,
  addComment,
  updateComment,
  deleteComment,
}) => {
  const fiveMinutes = 5 * 60 * 1000;
  const timePassed = new Date() - new Date(rootComment.createdAt) > fiveMinutes;
  //const createdAt = new Date(rootComment.createdAt).toLocaleDateString();
  const createdAt = new Date(rootComment.createdAt).toLocaleString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Dhaka",
  });

  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === rootComment?.userId?._id && !timePassed;
  const canDelete = currentUserId === rootComment?.userId?._id && !timePassed;
  const isReplying =
    activeComment?.type === "replying" && activeComment?.id === rootComment._id;
  const isEditing =
    activeComment?.type === "editing" && activeComment?.id === rootComment._id;
  const replyId = parentId ? parentId : rootComment._id;

  const isSameUser = currentUserId === rootComment?.userId?._id;
  return (
    <section className="mt-0.5">
      <div className="grid grid-cols-[1fr_20fr] gap-1">
        <CircleUserRound size={28} />
        <div className="flex flex-col justify-start">
          <div className="flex justify-start items-center gap-4">
            <Link
              to={
                isSameUser ? "/profile" : `/profile/${rootComment?.userId?._id}`
              }
              className="font-bold text-lg"
            >
              {rootComment?.userId?.name}
            </Link>
            <p className="text-xs text-[#565656]">{createdAt}</p>
          </div>
          {!isEditing ? (
            <p>{rootComment?.text}</p>
          ) : (
            <CommentForm
              submitLabel={"Update"}
              hasCancelButton
              initialText={rootComment.body}
              handleSubmit={(text) => updateComment(text, rootComment._id)}
              handleCancel={() => setActiveComment(null)}
            />
          )}
          <div className="flex flex-start items-center gap-2 text-xs font-semibold text-black mt-1">
            {canReply ? (
              <button
                className="hover:font-bold active:font-extrabold cursor-pointer"
                onClick={() =>
                  setActiveComment({ id: rootComment._id, type: "replying" })
                }
              >
                Reply
              </button>
            ) : null}
            {canEdit ? (
              <button
                className="hover:font-bold active:font-extrabold cursor-pointer"
                onClick={() =>
                  setActiveComment({ id: rootComment._id, type: "editing" })
                }
              >
                Edit
              </button>
            ) : null}
            {canDelete ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="hover:font-bold active:font-extrabold cursor-pointer">
                    Delete
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className={"bg-[#fffae6]"}>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your comment and remove it from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteComment(rootComment._id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : null}
          </div>
        </div>
      </div>
      {isReplying ? (
        <div className={!parentId ? "ml-8 mt-2 mr-2" : "mt-2 mr-2"}>
          <CommentForm
            submitLabel={"Reply"}
            handleSubmit={(text) => {
              addComment(text, replyId);
              setActiveComment(null);
            }}
          />
        </div>
      ) : null}
      {replies.length > 0 ? (
        <div className="ml-8 mt-2">
          {replies.map((reply) => (
            <SingleComment
              key={reply._id}
              rootComment={reply}
              replies={[]}
              currentUserId={currentUserId}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              parentId={rootComment._id}
              updateComment={updateComment}
              deleteComment={deleteComment}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default SingleComment;
