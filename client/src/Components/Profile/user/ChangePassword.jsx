import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { FilePenLine } from "lucide-react";
import { toast } from "sonner";
import handlePasswordChange from "./handlePasswordChange";

const ChangePassword = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  console.log(newPassword, confirmPassword);
  const styles = {
    input: "bg-[#ebe8db] outline-[#fffae6] border-[#8C7A3F] cursor-pointer",
  };

  const handleCancel = () => {
    setNewPassword("");
    setConfirmPassword("");
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("pressed");
    if (newPassword !== confirmPassword) {
      toast.error("Failed to update password", {
        duration: 3000,
        description: "Make sure the passwords match",
      });
      setOpen(false);
      return;
    }
    try {
      await handlePasswordChange(newPassword, userId);
			toast.success('Password Updated Successfully')
    } catch (error) {
      toast.error(error);
    }

    setConfirmPassword("");
    setNewPassword("");
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <form onSubmit={handleSubmit}>
          <DialogTrigger className="py-3 hover:bg-[#e4d1cd]" asChild>
            <button className="flex justify-center items-center w-full gap-x-1">
              <FilePenLine /> Password
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] border-2 border-[#8C7A3F] bg-[#F2EED9]">
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Make changes to your password here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="new">New Password</Label>
                <Input
                  id="new"
                  name="new"
									type={'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={"pxy1234@ki"}
                  className={styles.input}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input
                  id="confirm"
                  name="confirm"
									type={'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={"pxy1234@ki"}
                  className={styles.input}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  className={"bg-red-500 hover:bg-red-700"}
                  type={"button"}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" onClick={handleSubmit}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default ChangePassword;
