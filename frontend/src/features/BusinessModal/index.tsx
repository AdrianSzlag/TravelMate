import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { createPortal } from "react-dom";
import Input from "./components/Input";
import TimeSelector from "./components/TimeSelector";
import IOpeningHours from "types/IOpeningHours";
import { useRef, useState } from "react";
import Map from "./components/Map";
import { businessActions } from "store/business-slice";
import { postBusiness } from "store/business-actions";
import IBusiness from "types/IBusiness";
import TypeSelector from "./components/TypeSelector";

const BusinessForm = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.business.loading);
  const [coordinates, setCoordinates] = useState<
    [number, number] | undefined
  >();
  const [name, setName] = useState("");
  const [thumbnail, setThumbnails] = useState<File | undefined>(undefined);
  const [images, setImages] = useState<File[]>([]);
  const isValidName = name.length > 0;
  const [description, setDescription] = useState("");
  const isValidDescription = description.length > 0;
  const [type, setType] = useState("hotel");
  const isValidType = type.length > 0;
  const [address, setAddress] = useState("");
  const isValidAddress = address.length > 0;
  const [phone, setPhone] = useState("");
  const isValidPhone = phone.length === 9;
  const [tags, setTags] = useState("");
  const isValidTags = tags.length > 0;
  const isFormValid =
    isValidName &&
    isValidDescription &&
    isValidType &&
    isValidAddress &&
    isValidPhone &&
    isValidTags &&
    thumbnail &&
    !!coordinates &&
    !loading;
  const [openingHours, setOpeningHours] = useState<IOpeningHours[]>(
    [...Array(7)].map((_, i) => {
      return {
        dayOfWeek: i,
        from: "09:00",
        to: "17:00",
      };
    })
  );
  const setHours = (value: IOpeningHours) => {
    const newHours = openingHours.map((current) => {
      if (current.dayOfWeek === value.dayOfWeek) {
        return value;
      }
      return current;
    });
    setOpeningHours(newHours);
  };
  const setTagsHandler = (value: string) => {
    setTags(value.replace(/[^a-zA-Z0-9 ]/g, ""));
  };
  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    setThumbnails(file);
  };
  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) setImages([]);
    else setImages([...files]);
  };
  const onCancelHandler = () => {
    dispatch(businessActions.hideModal());
  };
  const onSubmitHandler = () => {
    if (!isFormValid) return;
    const hours = openingHours.reduce((acc, current) => {
      if (current.from !== "--:--" && current.to !== "--:--") {
        acc.push(current);
      }
      return acc;
    }, [] as IOpeningHours[]);
    const business: IBusiness = {
      name: name.trim(),
      description: description.trim(),
      type,
      address: address.trim(),
      phone: phone.trim(),
      tags: tags.split(" "),
      openingHours: hours,
      location: {
        type: "Point",
        coordinates: [coordinates[1], coordinates[0]],
      },
    };
    dispatch(postBusiness(business, thumbnail, images));
  };
  return (
    <div
      className="fixed top-0 right-0 bottom-0 left-0 z-20 box-border 
                flex items-center justify-center bg-[#0000009a]"
    >
      <div className="flex max-h-full w-full flex-col overflow-y-auto border bg-white shadow-xl xs:w-[450px] xs:rounded md:w-[700px] md:flex-row">
        <div className="w-full flex-shrink-0 flex-grow-0 md:w-[350px]">
          <h1 className="mx-4 mt-1 text-xl font-semibold text-gray-600">
            Let's Get Started
          </h1>
          <div className="mx-4 mt-2">
            <Input
              type="text"
              placeholder="Business Name"
              value={name}
              errorMessage=""
              onChange={setName}
              isValid={isValidName}
              name="business-name"
              title="Business Name"
            />
            <TypeSelector value={type} onChange={setType} />
            <label
              htmlFor="description"
              className="mb-1 block text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <textarea
              className="h-20 w-full resize-none rounded border px-0.5 text-sm font-semibold text-gray-600"
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <Input
              type="text"
              placeholder="London, UK"
              value={address}
              errorMessage=""
              onChange={setAddress}
              isValid={isValidAddress}
              name="address"
              title="Address"
            />
            <Input
              type="number"
              placeholder="123456789"
              value={phone}
              errorMessage=""
              onChange={setPhone}
              isValid={isValidPhone}
              name="phone"
              title="Phone number"
            />
            <div className="mx-4 mt-2 mb-2 flex flex-col gap-0.5 text-sm">
              {openingHours.map((hours) => {
                return (
                  <TimeSelector
                    key={hours.dayOfWeek}
                    value={hours}
                    onChange={(value) => setHours(value)}
                  />
                );
              })}
            </div>
            <Input
              type="text"
              placeholder="Separate tags with spaces e.g. hotel restaurant"
              value={tags}
              errorMessage=""
              onChange={setTagsHandler}
              isValid={isValidTags}
              name="tags"
              title="Tags"
            />
            <div className="mt-2" />
          </div>
        </div>
        <div className="flex-shrink-0 flex-grow-0 md:w-[350px] md:pr-4 md:pt-4">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Choose a thumbnail
          </label>
          <div className="relative flex h-40 items-center justify-center overflow-hidden rounded">
            {thumbnail && (
              <img
                src={URL.createObjectURL(thumbnail)}
                alt="business"
                className="h-full w-full object-cover"
              />
            )}
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-[#0000006c] font-bold text-white">
              Click to select file.
            </div>
            <input
              type="file"
              accept=".jpeg,.jpg,.png,.gif"
              onChange={handleThumbnailChange}
              className="absolute z-20 h-full w-full cursor-pointer opacity-0"
              multiple={false}
            />
          </div>
          <label className="mt-2 mb-2 block text-sm font-medium text-gray-900">
            Add some more photos
          </label>
          <input
            type="file"
            accept=".jpeg,.jpg,.png,.gif"
            onChange={handleImagesChange}
            className="z-20 w-full cursor-pointer"
            multiple={true}
          />
          <label className="mt-2 mb-2 block text-sm font-medium text-gray-900">
            Pick a location
          </label>
          <Map coordinates={coordinates} setCoordinates={setCoordinates} />
          <div className="mt-2 mb-2 flex justify-end gap-2">
            <button
              className="block rounded border px-2 py-0.5 text-sm font-medium text-gray-900"
              onClick={onCancelHandler}
            >
              Cancel
            </button>
            <button
              className="block rounded border px-2 py-0.5 text-sm font-medium text-gray-900 disabled:cursor-not-allowed"
              onClick={onSubmitHandler}
              disabled={!isFormValid}
            >
              {!loading ? "Submit" : "Loading..."}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BusinessModal = () => {
  const isOpen = useAppSelector((state) => state.business.modalOpen);
  const modalRoot = document.getElementById("business-root") as HTMLElement;
  if (!isOpen) return null;
  return createPortal(<BusinessForm />, modalRoot);
};

export default BusinessModal;
