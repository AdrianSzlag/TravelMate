import { useState } from "react";
import IMenuItem from "types/IMenuItem";
import fetchApi from "utils/fetchApi";
import Modal from "components/Modal";

interface Props {
  placeId: string;
  onClose: () => void;
}

const NewMenuItemModal = ({ placeId, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const isFormValid = name.length > 0 && price.length > 0 && !loading;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file);
  };

  const handleAddMenuItem = async () => {
    if (!isFormValid) {
      return;
    }
    setLoading(true);
    const menuItem: IMenuItem = {
      name,
      description,
      price: Number(price),
    };
    try {
      const formData = new FormData();
      formData.append("menu", JSON.stringify(menuItem));
      if (image) {
        formData.append("image", image);
      }
      const response = await fetchApi(`/api/place/${placeId}/menu`, {
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

  return (
    <Modal
      onBackdropClick={onClose}
      className="w-full border bg-white shadow-xl sm:w-[500px] sm:rounded"
    >
      <div className="mb-6 flex w-full gap-4 p-4">
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-600">Add Menu Item</h1>
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Name
          </label>
          <input
            className="mr-2 w-full border py-0.5 px-1 text-sm text-gray-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="my-2 block text-sm font-medium text-gray-900">
            Description
          </label>
          <textarea
            className="h-10 w-full resize-none rounded border px-0.5 text-sm font-semibold text-gray-600"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Price
          </label>
          <input
            className="mr-2 w-full border py-0.5 px-1 text-sm text-gray-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
          />
        </div>
        <div className="flex h-full w-48 flex-shrink-0 flex-grow-0 flex-col">
          <label className=" block text-sm font-medium text-gray-900">
            Choose an image. (optional)
          </label>
          <div className="relative mt-2 h-40 w-40">
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="business"
                className="absolute z-10 h-full w-full object-cover"
              />
            )}
            {!image && (
              <div className="absolute z-20 flex h-full w-full items-center justify-center bg-[#00000041] text-white">
                Click to add image
              </div>
            )}
            <input
              type="file"
              accept=".jpeg,.jpg,.png,.gif"
              onChange={handleImageChange}
              className="absolute z-20 h-full w-full cursor-pointer opacity-0"
              multiple={false}
            />
          </div>
        </div>
      </div>
      <div className="m-4 flex justify-end justify-self-end">
        <button
          className="block rounded border px-2 py-0.5 text-sm font-medium text-gray-900"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="ml-2 block rounded bg-blue-500 px-2 py-0.5 text-sm font-medium text-white"
          onClick={handleAddMenuItem}
          disabled={!isFormValid}
        >
          {loading ? "Loading..." : "Add"}
        </button>
      </div>
    </Modal>
  );
};

export default NewMenuItemModal;
