import React, { useRef } from "react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  initialText = "",
  handleCancel,
  handleKeyPress
}) => {

  const textAreaRef = useRef(null)
  const showLabel = !hasCancelButton && submitLabel !== 'Reply'
  const onAction = (formData) => {
    const { newComment } = Object.fromEntries(formData);
    console.log(newComment);
    if (!newComment) {
      toast.error("Failed to submit comment", {
        description: 'The comment box was empty',
        duration: 3000
      })
      return
    }
    handleSubmit(newComment);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const comment = textAreaRef.current.value.trim();;
      if (comment) {
        handleSubmit(comment);
        textAreaRef.current.value = ""
      }
    } else {
      handleKeyPress()
    }
  };

  return (
    <section>
      {/* <h4 className="text-xl font-semibold text-[#565656]">10 Comments</h4> */}
      <form action={onAction}>
        {showLabel ? (
          <Label htmlFor="commentForm" className={"text-lg font-semibold"}>
            Comment
          </Label>
        ) : null}
        <div
          className={
            !hasCancelButton
              ? "grid grid-cols-[4fr_1fr] gap-2 items-center"
              : "grid grid-rows-[2fr_1fr] gap-1 items-center pr-2"
          }
        >
          <Textarea
            id="commentForm"
            name="newComment"
            className="border-2 border-[#8C7A3F] bg-[#fffae6]"
            onKeyDown={handleKeyDown}
            defaultValue={initialText}
            ref={textAreaRef}
          />

          <div
            className={
              !hasCancelButton || submitLabel === 'Reply'
                ? "h-full"
                : "grid grid-cols-2 gap-2 items-center"
            }
          >
            <Button className="h-full w-full bg-[#c9c19c] text-black hover:bg-[#ded5ae] font-semibold hover:font-bold active:font-extrabold text-lg cursor-pointer">
              {submitLabel}
            </Button>
            {hasCancelButton ? (
              <Button className="h-full w-full bg-[#c9c19c] text-black hover:bg-[#ded5ae] font-semibold hover:font-bold active:font-extrabold text-lg cursor-pointer" onClick={handleCancel}>
                Cancel
              </Button>
            ) : null}
          </div>
        </div>
      </form>
    </section>
  );
};

export default CommentForm;
