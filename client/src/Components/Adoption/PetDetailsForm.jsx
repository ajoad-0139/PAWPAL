import React, { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { districtsList, petTypeBreeds } from "../config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronDown, Trash2, UploadCloudIcon, XIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { addPost, imageUploadHandler } from "./utils/imageUploadHandler";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPetDetailsWithId, handleAdoptionUpdate } from "@/Store/AdoptionPostSlice";
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
} from "../ui/alert-dialog";
import { user } from "@/Store/Auth";

const initialData = {
  userId: null,
  animalType: null,
  breed: null,
  name: "",
  description: "",
  age: "",
  sex: null,
  image: null,
  isAdopted: false,
  adoptedBy: "",
  address: {
    name: "",
    city: "",
    location: "",
    phone: "",
    email: "",
  },
  vaccine: {
    sterilized: false,
    fluVaccine: false,
    rabiesVaccine: false,
    dewormed: false,
  },
};

const PetDetailsForm = () => {
  const [formPetType, setFormPetType] = useState("");
  const [formPetBreed, setFormPetBreed] = useState("");
  const [formPetGender, setFormPetGender] = useState("");
  const [formCity, setFormCity] = useState("");
  const [imageFile, setImageFile] = useState([]);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState(initialData);
  const [vaccineState, setVaccineState] = useState(initialData.vaccine);
  const userData = useSelector(user);
  console.log(userData);

  const navigate = useNavigate();

  const petDetails = petTypeBreeds;

  console.log(imageFile);

  const [searchParams, setSearchParams] = useSearchParams();

  const postId = searchParams.get("postId");

  const onPetTypeChange = (value) => {
    setFormPetType(value);
    setFormPetBreed("");
  };

  useEffect(() => {
    if (!defaultValues.animalType) return;
    setFormPetType(defaultValues.animalType);
    setFormPetGender(defaultValues.sex);
  }, [defaultValues.animalType, defaultValues.sex]);

  useEffect(() => {
    if (!formPetType || !defaultValues.breed) return;
    setFormPetBreed(defaultValues.breed);
  }, [formPetType, defaultValues.breed]);

  // console.log(formPetType, formPetBreed, formPetGender);
  const styles = {
    selectTrigger: "w-full bg-[#F2EED9] hover:bg-[#e4d1cd] border-[#8C7A3F]",
    selectContent: "bg-[#F2EED9] border-[#8C7A3F]",
    selectItem: "focus:bg-[#e4d1cd]",
    input: "bg-[#F2EED9] outline-[#fffae6] border-[#8C7A3F]",
    button: "mt-4",
    label: "font-semibold mb-1",
  };

  const handleImageFileChange = (e) => {
    const files = Array.from(e.target.files);
    imageFile?.length
      ? setImageFile((prevImage) => [...prevImage, ...files])
      : setImageFile([...files]);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleAction = async (formData) => {
    const allPhotos = formData.getAll("photos");
    console.log(allPhotos);
    const urls = [];

    for (const photo of allPhotos) {
      try {
        const url = await imageUploadHandler(photo);

        if (typeof url === "string" && url.trim() !== "") {
          urls.push(url);
          toast.success(`Uploaded ${photo.name} successfully`, {
            duration: 1000,
          });
        } else {
          toast.error(`Invalid upload response for ${photo.name}`, {
            duration: 3000,
          });
          console.error(`Unexpected response for ${photo.name}:`, url);
        }
      } catch (err) {
        toast.error(`Failed to upload ${photo.name}`, { duration: 3000 });
        console.error(`Error uploading ${photo.name}:`, err);
      }

      if (!urls?.length) {
        toast.error("None of the photos were successfully updated.", {
          description: "Please try again",
          duration: 3000,
        });
      }
    }

    console.log(urls);
    const {
      animalType,
      breed,
      name,
      age,
      sex,
      sterilized,
      fluVaccine,
      rabiesVaccine,
      dewormed,
      description,
      ownername,
      city,
      location,
      phone,
      email,
    } = Object.fromEntries(formData);
    console.log(
      animalType,
      breed,
      name,
      age,
      sex,
      Boolean(sterilized),
      Boolean(fluVaccine),
      rabiesVaccine,
      dewormed,
      description,
      ownername,
      city,
      location,
      phone,
      email
    );
    console.log(allPhotos);
    const formBody = {
      userId: userData?.userId,
      animalType,
      breed,
      name,
      description,
      age,
      sex,
      image: urls,
      isAdopted: false,
      adoptedBy: "Unknown",
      address: {
        name: ownername,
        city,
        location,
        phone,
        email,
      },
      vaccine: {
        sterilized: Boolean(sterilized),
        fluVaccine: Boolean(fluVaccine),
        rabiesVaccine: Boolean(rabiesVaccine),
        dewormed: Boolean(dewormed),
      },
    };

    console.log(formBody);

    try {
      const data = await addPost(formBody);
      if (data?.postId) {
        toast.success("Post created successfully", { duration: 2000 });
        console.log("Post created successfully:", data);
        handleRemoveImage();
        setFormPetType("");
        setFormPetBreed("");
        setFormPetGender("");
        navigate("..", { replace: true });
      } else {
        // Error case - the server returned an error or the request failed
        toast.error("Failed to create post", { duration: 2000 });
        console.log("Failed to create post:", data);
        // Additional error handling logic here
      }
    } catch (error) {
      // This will only catch if addPost has an unexpected exception before its own try/catch
      toast.error("Unexpected error occured.", {
        description: "Failed to create post",
        duration: 3000,
      });
      console.error("Unexpected error when creating post:", error);
    }
  };

  const onDeletePost = async (id) => {
    try {
      const actionResult = await dispatch(deletePost(id));

      if (deletePost.fulfilled.match(actionResult)) {
        toast.success("Post has been deleted successfully.", {
          duration: 3000,
        });
        navigate("..", { replace: true });
      } else {
        toast.error("The post could not be deleted", {
          description:
            actionResult.payload?.message || "Please try again later",
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.", {
        description: "Please try again later",
        duration: 3000,
      });
    }
  };

  const handleSubmit = async (formData) => {
  const {
    animalType,
    breed,
    name,
    age,
    sex,
    sterilized,
    fluVaccine,
    rabiesVaccine,
    dewormed,
    description,
    ownername,
    city,
    location,
    phone,
    email,
    adoptedBy,
  } = Object.fromEntries(formData);

  // Build a flat key-value object for all fields you want to send individually
  const allFields = {
    animalType,
    breed,
    name,
    description,
    age,
    sex,
    isAdopted: adoptedBy ? true : false,
    adoptedBy,
    "address.name": ownername,
    "address.city": city,
    "address.location": location,
    "address.phone": phone,
    "address.email": email,
    "vaccine.sterilized": Boolean(sterilized),
    "vaccine.fluVaccine": Boolean(fluVaccine),
    "vaccine.rabiesVaccine": Boolean(rabiesVaccine),
    "vaccine.dewormed": Boolean(dewormed),
  };

  console.log(allFields, 'allFields')

  // Filter out falsy values (adjust if you want to allow false or 0)
  const nonFalsyFields = Object.fromEntries(
    Object.entries(allFields).filter(([_, v]) => Boolean(v))
  );

  console.log(nonFalsyFields, 'nonFalsyFields')

  try {
    for (const [field, value] of Object.entries(nonFalsyFields)) {
      // Dispatch your thunk or call your API here:
      // Replace with your actual update function / thunk
      const data = await dispatch(
        handleAdoptionUpdate({
          postId: postId, // or postId if updating post
          field,
          data: value,
        })
      ).unwrap();

      console.log(`Updated ${field}:`, data);
    }

    toast.success("Post updated successfully", { duration: 2000 });

    handleRemoveImage();
    setFormPetType("");
    setFormPetBreed("");
    setFormPetGender("");
    navigate("..", { replace: true });
  } catch (error) {
    toast.error("Failed to update post", { duration: 2000 });
    console.error("Error updating post:", error);
  }
};

  const onAction = postId? handleSubmit : handleAction;
  useEffect(() => {
    const fetchPostDetails = async (postId) => {
      if (postId) {
        try {
          const data = await dispatch(getPetDetailsWithId(postId));
          console.log(data);
          if (data?.payload?.post) {
            setDefaultValues(data.payload.post);
            setVaccineState(data.payload.post.vaccine || initialData.vaccine);
            setFormCity(defaultValues.address.city);
          } else {
            toast.error("Failed to load the values to edit.", {
              description: "Please Try Again Later",
              duration: 3000,
            });
          }
        } catch (err) {
          toast.error("Unexpected Error!", { duration: 3000 });
        }
      }
    };

    fetchPostDetails(postId);
  }, [defaultValues.address.city, dispatch, postId]);

  return (
    <div>
      <form action={onAction} className="grid w-full mt-7 gap-4">
        <section>
          <Label htmlFor="photos" className={styles.label}>
            Upload Image:
          </Label>
          <div
            className={`bg-[#F2EED9] outline-[#fffae6] border-2 border-[#8C7A3F] border-dashed rounded-lg py-6 ${
              postId ? "opacity-50 cursor-not-allowed" : "null"
            }`}
          >
            <Input
              id="photos"
              name="photos"
              type={"file"}
              ref={inputRef}
              onChange={handleImageFileChange}
              multiple
              accept="image/*"
              required
              className={"hidden"}
              disabled={postId}
            />
            {!imageFile?.length ? (
              <Label
                htmlFor="photos"
                className={
                  "flex flex-col items-center justify-center cursor-pointer"
                }
              >
                <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
                <span>
                  {
                    "Please choose atleast three images you wish to upload at once."
                  }
                </span>
              </Label>
            ) : (
              <div className="flex justify-center items-center">
                <Popover>
                  <PopoverTrigger className="p-3 border-1 border-[#8C7A3F] bg-[#ebe8db] rounded-md shadow-xs flex justify-center items-center gap-4 cursor-pointer">
                    <div className="flex justify-start items-center gap-1">
                      {imageFile.length} pictures selected
                      <ChevronDown size={18} />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    className={
                      "flex flex-col gap-2 border-2 border-[#8C7A3F] bg-[#F2EED9] overflow-auto max-h-50"
                    }
                  >
                    {imageFile.map((image, index) => (
                      <div key={index} className="">
                        <div className="hover:bg-[#e4d1cd] rounded-sm p-1 text-sm">
                          {image.name}
                        </div>
                        <Separator className={"bg-[#8C7A3F] my-2"} />
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
                <button onClick={handleRemoveImage}>
                  <Trash2 color="red" />
                </button>
              </div>
            )}
          </div>
        </section>
        <section className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="animalType" className={styles.label}>
              Pet Type
            </Label>
            <Select
              id="animalType"
              name="animalType"
              value={formPetType ?? ""}
              onValueChange={(value) => onPetTypeChange(value)}
            >
              <SelectTrigger className={styles.selectTrigger}>
                <SelectValue placeholder="Cat, Dog etc..." />
              </SelectTrigger>
              <SelectContent className={styles.selectContent}>
                {petDetails.map((pet) => (
                  <SelectItem
                    value={pet.petType}
                    key={pet.petType}
                    className={styles.selectItem}
                  >
                    {pet.petType.charAt(0).toUpperCase() + pet.petType.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="breed" className={styles.label}>
              Breed
            </Label>
            <Select
              id="breed"
              name="breed"
              value={formPetBreed ?? ""}
              onValueChange={(value) => setFormPetBreed(value)}
            >
              <SelectTrigger className={styles.selectTrigger}>
                <SelectValue placeholder="Persian, Serbian Huskey etc..." />
              </SelectTrigger>
              <SelectContent className={styles.selectContent}>
                {petDetails
                  .find((pet) => formPetType === pet.petType)
                  ?.breed.map((breedName) => (
                    <SelectItem
                      value={breedName}
                      key={breedName}
                      className={styles.selectItem}
                    >
                      {breedName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-3">
          <div>
            <Label htmlFor="name" className={styles.label}>
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Minty, Kaju etc..."
              required
              defaultValue={defaultValues?.name}
              className={styles.input}
            />
          </div>
          <div>
            <Label htmlFor="age" className={styles.label}>
              Age
            </Label>
            <Input
              id="age"
              name="age"
              placeholder="Enter age in years. Example:0.25yr is equivalent to 3months"
              required
              defaultValue={defaultValues?.age}
              className={styles.input}
            />
          </div>
          <div>
            <Label htmlFor="sex" className={styles.label}>
              Gender
            </Label>
            <Select
              id="sex"
              name="sex"
              value={formPetGender ?? ""}
              onValueChange={(value) => setFormPetGender(value)}
            >
              <SelectTrigger className={styles.selectTrigger}>
                <SelectValue placeholder={"Male/Female"} />
              </SelectTrigger>
              <SelectContent className={styles.selectContent}>
                <SelectItem value="male" className={styles.selectItem}>
                  Male
                </SelectItem>
                <SelectItem value="female" className={styles.selectItem}>
                  Female
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        <Label className={"font-semibold text-md"}>Medical Info:</Label>
        <section className="grid grid-cols-5 bg-[#F2EED9] p-2 rounded-md shadow-xs border-[#8C7A3F] border-[0.5px]">
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="sterilized"
              checked={vaccineState?.sterilized}
              onChange={(e) =>
                setVaccineState({
                  ...vaccineState,
                  sterilized: e.target.checked,
                })
              }
              name="sterilized"
            />
            <Label className={styles.label}>Sterilized</Label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="flu"
              checked={vaccineState?.fluVaccine}
              onChange={(e) =>
                setVaccineState({
                  ...vaccineState,
                  fluVaccine: e.target.checked,
                })
              }
              name="fluVaccine"
            />
            <Label className={styles.label}>Flu Vaccine</Label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="rabies"
              checked={vaccineState?.rabiesVaccine}
              onChange={(e) =>
                setVaccineState({
                  ...vaccineState,
                  rabiesVaccine: e.target.checked,
                })
              }
              name="rabiesVaccine"
            />
            <Label className={styles.label}>Rabies Vaccine</Label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="dewormed"
              checked={vaccineState?.dewormed}
              onChange={(e) =>
                setVaccineState({
                  ...vaccineState,
                  dewormed: e.target.checked,
                })
              }
              name="dewormed"
            />
            <Label className={styles.label}>Dewormed</Label>
          </div>
        </section>

        <section>
          <Label htmlFor="description" className={styles.label}>
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={defaultValues?.description}
            required
            className={"bg-[#F2EED9] border-[#8C7A3F]"}
          />
        </section>

        <Label className={"font-semibold text-md"}>Owner/Rescuer Info:</Label>
        <section>
          <div className="grid grid-cols-4 gap-3 mb-2">
            <div>
              <Label htmlFor="ownername" className={styles.label}>
                Name
              </Label>
              <Input
                id="ownername"
                name="ownername"
                defaultValue={defaultValues?.address?.name}
                placeholder="John Doe"
                className={styles.input}
              />
            </div>
            <div>
              <Label htmlFor="city" className={styles.label}>
                City
              </Label>
              <Select
                onValueChange={(value) => setFormCity(value)}
                value={formCity ?? ""}
                id={"city"}
                name={"city"}
              >
                <SelectTrigger className={styles.selectTrigger}>
                  <SelectValue
                    placeholder={"Dhaka, Chattogram, Sylhet etc..."}
                  />
                </SelectTrigger>
                <SelectContent className={styles.selectContent}>
                  {districtsList.map((district) => (
                    <SelectItem
                      key={district.id}
                      value={district.name}
                      className={styles.selectItem}
                    >
                      {district.name === formCity ? (
                        <span className="font-semibold">{district.name}</span>
                      ) : (
                        district.name
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="phone" className={styles.label}>
                Phone No.
              </Label>
              <Input
                id="phone"
                name="phone"
                type={"tel"}
                defaultValue={defaultValues?.address?.phone}
                inputMode="numeric"
                pattern="^\+?[0-9]{13}$"
                placeholder="+880172***10"
                className={styles.input}
              />
            </div>
            <div>
              <Label htmlFor="email" className={styles.label}>
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="johndoe@gmail.com"
                type={"email"}
                defaultValue={defaultValues?.address?.email}
                className={styles.input}
              />
            </div>
          </div>
          <Label htmlFor="location" className={styles.label}>
            Location
          </Label>
          <Input
            id="location"
            name="location"
            defaultValue={defaultValues?.address?.location}
            required
            placeholder="Topobon R/A, Akhaliya, Sylhet"
            className={styles.input}
          />
        </section>
        <Label className={"font-semibold text-md"}>Adoption Info:</Label>
        <Input
          id="adoptedBy"
          name="adoptedBy"
          defaultValue={defaultValues?.address?.adoptedBy}
          placeholder="Adopter's username, e.g: Mamun110"
          className={styles.input}
          disabled={!postId}
        />

        <Button className={'mt-3'}> {postId ? "Update" : "Submit"}</Button>
      </form>
      {postId? <div className="w-full mt-4">          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className={"bg-red-600 hover:bg-red-700 w-full"}>Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className={"bg-[#fffae6]"}>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this post and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDeletePost(postId)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>:null} 
    </div>
  );
};

export default PetDetailsForm;

{
  /* <div className="w-full grid grid-cols-2 gap-2 mt-4">
          <Button>Update</Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className={"bg-red-600 hover:bg-red-700"}>Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className={"bg-[#fffae6]"}>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this post and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDeletePost(postId)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div> */
}
