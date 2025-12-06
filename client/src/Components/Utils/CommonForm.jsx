import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ArrowRight, Check } from "lucide-react";

const types = {
  INPUT: "input",
  SELECT: "select",
  TEXTAREA: "textarea",
};

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
  styles,
  onAction,
  filter,
}) => {
  const renderInputsByComponentType = (getControlItem, styles, onSubmit) => {
    let element = null;
    const value = formData[getControlItem.name] || "";
    const onValueChange = (event) =>
      setFormData({
        ...formData,
        [getControlItem.name]: event.target.value,
      });
    console.log(Boolean(filter.selectedTypes));
    const isSelectDisabled = filter.selectedTypes
      ? Boolean(filter.selectedTypes.length)
      : Boolean(filter.selectedTypes);
    console.log(isSelectDisabled, "isSelect");
    let uniqueBreeds;
    // console.log(getControlItem.options, 'get Control Item')

    if (filter.selectedTypes && filter.selectedTypes.length !== 0) {
      const selectedBreedLists = getControlItem?.options
        ?.filter((pet) => filter.selectedTypes.includes(pet.petType))
        ?.flatMap((pet) => pet.breed);

      // Step 3: Deduplicate if needed
      uniqueBreeds = Array.from(new Set(selectedBreedLists));
    }

    //console.log(uniqueBreeds, "unique Breeds");

    switch (getControlItem.componentType) {
      case types.INPUT:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={onSubmit ? value : undefined}
            onChange={onSubmit ? onValueChange : undefined}
            className={`${styles.input}`}
          />
        );
        break;
      case types.SELECT:
        element = (
          <Select
            onValueChange={
              onSubmit
                ? (value) =>
                    setFormData({
                      ...formData,
                      [getControlItem.name]: value,
                    })
                : undefined
            }
            value={onSubmit ? value : undefined}
            id={getControlItem.name}
            name={getControlItem.name}
            disabled={
              getControlItem?.name === "breed" ? !isSelectDisabled : false
            }
          >
            <SelectTrigger
              className={`${
                styles.selectTrigger ? styles.selectTrigger : "w-full"
              }`}
            >
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent
              className={`${
                styles.selectContent ? styles.selectContent : null
              }`}
            >
              {filter.selectedTypes &&
              filter.selectedTypes.length !== 0 &&
              getControlItem?.name === "breed"
                ? uniqueBreeds.map((breed) => (
                    <SelectItem
                      key={breed}
                      value={breed}
                      className={styles.selectItem}
                    >
                       {filter.selectedBreed.includes(breed) ? (
                        <span className="font-semibold">{breed}</span>
                      ) : (
                        breed
                      )}
                    
                    </SelectItem>
                  ))
                : getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem
                      key={optionItem.id}
                      value={optionItem.name}
                      className={`${styles.selectItem}`}
                    >
                      {optionItem.name}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case types.TEXTAREA:
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={onSubmit ? value : undefined}
            onChange={onSubmit ? onValueChange : undefined}
          />
        );
        break;
      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            onChange={onSubmit ? onValueChange : undefined}
            className={`${styles.input}`}
          />
        );
        break;
    }
    return element;
  };
  return (
    <form action={onAction} onSubmit={onSubmit}>
      <div className="flex flex-col gap-1.5">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1" key={controlItem.name}>
            <Label>{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem, styles, onSubmit)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} className="mt-4 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
