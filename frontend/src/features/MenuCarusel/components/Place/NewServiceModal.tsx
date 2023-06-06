import Img from "components/Img";
import { useState } from "react";
import { createPortal } from "react-dom";
import IService from "types/IService";
import fetchApi from "utils/fetchApi";

interface Props {
  placeId: string;
  onClose: () => void;
}

const NewServiceModal = ({ placeId, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const modalRoot = document.getElementById("business-root") as HTMLElement;
  const [image, setImage] = useState<File | undefined>(undefined);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const isFormValid =
    name.length > 0 && price.length > 0 && duration.length > 0 && !loading;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file);
  };

  const handleAddService = async () => {
    if (!isFormValid) {
      return;
    }
    setLoading(true);
    const service: IService = {
      name,
      description,
      price: Number(price),
      duration: Number(duration),
    };
    try {
      const formData = new FormData();
      formData.append("service", JSON.stringify(service));
      if (image) {
        formData.append("image", image);
      }
      const response = await fetchApi(`/api/place/${placeId}`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      setLoading(false);
      onClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return createPortal(
    <div
      className="top-0 right-0 bottom-0 left-0 flex items-center justify-center 
              z-20 fixed bg-[#0000009a] box-border"
      onClick={onClose}
    >
      <div
        className="bg-white shadow-xl border sm:rounded sm:w-[500px] w-full"
        onClick={stopPropagation}
      >
        <div className="p-4 flex w-full gap-4 mb-6">
          <div className="flex-1">
            <h1 className="font-semibold text-lg text-gray-600">Add service</h1>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Name
            </label>
            <input
              className="text-gray-500 text-sm mr-2 border py-0.5 px-1 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="my-2 block text-sm font-medium text-gray-900">
              Description
            </label>
            <textarea
              className="h-10 w-full resize-none rounded border px-0.5 text-gray-600 text-sm font-semibold"
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Price
            </label>
            <input
              className="text-gray-500 text-sm mr-2 border py-0.5 px-1 w-full"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
            />
            <label className="my-2 block text-sm font-medium text-gray-900">
              Duration (minutes)
            </label>
            <input
              className="text-gray-500 text-sm mr-2 border py-0.5 px-1 w-full"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              type="number"
            />
          </div>
          <div className="w-48 flex-grow-0 flex-shrink-0 flex flex-col h-full">
            <label className=" block text-sm font-medium text-gray-900">
              Choose an image. (optional)
            </label>
            <div className="w-40 h-40 relative mt-2">
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="business"
                  className="absolute z-10 h-full w-full object-cover"
                />
              )}
              {!image && (
                <div className="absolute z-20 h-full w-full bg-[#00000041] flex justify-center items-center text-white">
                  Click to add image
                </div>
              )}
              <input
                type="file"
                accept=".jpeg,.jpg,.png,.gif"
                onChange={handleImageChange}
                className="opacity-0 absolute h-full w-full cursor-pointer z-20"
                multiple={false}
              />
            </div>
          </div>
        </div>
        <div className="flex m-4 justify-end justify-self-end">
          <button
            className="px-2 py-0.5 block text-sm font-medium text-gray-900 border rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-2 py-0.5 block text-sm font-medium text-white bg-blue-500 rounded ml-2"
            onClick={handleAddService}
            disabled={!isFormValid}
          >
            {loading ? "Loading..." : "Add"}
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default NewServiceModal;
