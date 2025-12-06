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
import { Textarea } from "@/Components/ui/textarea";
import { SquarePen } from "lucide-react";
import handleFieldUpdate from "./handleFieldUpdate";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import getUserDetailsWithId from "./getUserDetailsWithId";
import { setUser } from "@/Store/Auth";

const initialData = {
  name: "",
  phone: "",
  address: "",
  facebook: "",
  instagram: "",
  twitter: "",
  bio: "",
  city: "",
};

const ProfileUserInfoForm = ({ userData }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const styles = {
    label: "font-semibold",
    text: "font-montserrat text-gray-600 text-sm",
    input:
      "bg-[#ebe8db] outline-[#fffae6] border-[#8C7A3F] cursor-pointer max-w-[236px]",
    section: "flex flex-col gap-0.5",
  };

  const [formData, setFormData] = useState(initialData);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const nonEmptyFields = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value.trim() !== "")
    );

    try {
      for (const [key, value] of Object.entries(nonEmptyFields)) {
        const response = await handleFieldUpdate(userData?.userId, key, value);
        console.log(response, 'response')
      }
      toast.success("Updated Successfully");
      const data = await getUserDetailsWithId(userData?.userId);
      console.log(data)
      await dispatch(setUser(data))
    } catch (error) {
      toast.error("Something went wrong");
    }

    setFormData(initialData);
    setIsOpen(false);
  };

  const onCancel = () => {
    setFormData(initialData);
    setIsOpen(false);
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <form onSubmit={onSubmit}>
          <DialogTrigger asChild>
            <button
              className={
                "flex justify-start items-center hover:font-semibold gap-x-1 active:font-bold font-montserrat"
              }
            >
              <SquarePen size={18} />
              Edit
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] border-2 border-[#8C7A3F] bg-[#F2EED9]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <section className="flex w-full justify-center items-center">
              <Label className={"font-semibold underline"}>Contact Info</Label>
            </section>
            <div className="grid grid-cols-3 mt-2 gap-y-6">
              <section className={styles.section}>
                <Label
                  htmlFor={"name"}
                  id={"name"}
                  className={styles.label}
                >
                  Username
                </Label>
                <Input
                  id={"name"}
                  name={"name"}
                  placeholder={"John Doe"}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className={styles.input}
                />
              </section>
              <section className={styles.section}>
                <Label htmlFor={"city"} id={"city"} className={styles.label}>
                  city
                </Label>
                <Input
                  id={"city"}
                  name={"city"}
                  placeholder={"Dhaka, Chattogram, Sylhet etc.."}
                  value={formData.city}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  className={styles.input}
                />
              </section>
              <section className={styles.section}>
                <Label htmlFor={"phone"} id={"phone"} className={styles.label}>
                  Phone no.
                </Label>
                <Input
                  id={"phone"}
                  name={"phone"}
                  placeholder={"+01712345678"}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className={styles.input}
                  type={"tel"}
                  inputMode={"numeric"}
                  pattern="^\+?[0-9]{11}$"
                />
              </section>
              <section className={styles.section}>
                <Label
                  htmlFor={"address"}
                  id={"address"}
                  className={styles.label}
                >
                  Address
                </Label>
                <Input
                  id={"address"}
                  name={"address"}
                  placeholder={"Topobon R/A, Akhaliya, Sylhet"}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  className={styles.input}
                />
              </section>
              <section className={styles.section}>
                <Label
                  htmlFor={"facebook"}
                  id={"facebook"}
                  className={styles.label}
                >
                  Facebook
                </Label>
                <Input
                  id={"facebook"}
                  name={"facebook"}
                  placeholder={"https://facebook.com/johndoe"}
                  value={formData.facebook}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      facebook: e.target.value,
                    }))
                  }
                  className={styles.input}
                />{" "}
              </section>
              <section className={styles.section}>
                <Label
                  htmlFor={"instagram"}
                  id={"instagram"}
                  className={styles.label}
                >
                  Instagram
                </Label>
                <Input
                  id={"instagram"}
                  name={"instagram"}
                  placeholder={"https://instagram.com/johndoe"}
                  value={formData.instagram}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      instagram: e.target.value,
                    }))
                  }
                  className={styles.input}
                />
              </section>
              <section className={styles.section}>
                <Label
                  htmlFor={"twitter"}
                  id={"twitter"}
                  className={styles.label}
                >
                  twitter
                </Label>
                <Input
                  id={"twitter"}
                  name={"twitter"}
                  placeholder={"https://twitter.com/johndoe"}
                  value={formData.twitter}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      twitter: e.target.value,
                    }))
                  }
                  className={styles.input}
                />
              </section>
            </div>
            <section className="flex w-full justify-center items-center">
              <Label className={"font-semibold underline mt-2"}>
                About User
              </Label>
            </section>
            <section className="mt-2">
              <Label htmlFor={"bio"} id={"bio"} className={styles.label}>
                Bio
              </Label>
              <Textarea
                id={"bio"}
                name={"bio"}
                placeholder={
                  "Animal lover on the hunt for furry adventures 🐾 | Adopt, ride, read, repeat 🐶🚚📖 | Your future pet’s biggest fan!"
                }
                value={formData.bio}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, bio: e.target.value }))
                }
                className={"bg-[#ebe8db] border-[#8C7A3F]"}
              />
            </section>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  className={"bg-red-500 hover:bg-red-700"}
                  type={"button"}
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" onClick={onSubmit}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default ProfileUserInfoForm;
