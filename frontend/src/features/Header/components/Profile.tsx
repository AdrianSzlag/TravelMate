import UserAvatar from "components/UserAvatar";
import { useAppSelector } from "hooks/redux-hooks";
import Input from "components/Input";
import { useEffect, useState } from "react";
import fetchApi from "utils/fetchApi";
import Modal from "components/Modal";
import { FaRegAddressCard } from "react-icons/fa";
import Button from "components/Button";

interface Props {
  onClose: () => void;
}

const Profile = ({ onClose }: Props) => {
  const user = useAppSelector((state) => state.auth.user);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validName = name.length >= 3;
  const validPassword = password.length >= 6 || password.length === 0;
  const validForm = validName && validPassword && !loading;

  const imageURL = imageFile ? URL.createObjectURL(imageFile) : undefined;
  const image = imageURL ? undefined : user?.profileImage;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageFile(file || undefined);
  };

  const onSubmit = async () => {
    if (!validForm) {
      return;
    }
    setLoading(true);
    const profile = {
      name: name.length > 0 ? name.trim() : undefined,
      password: password.length > 0 ? password : undefined,
    };
    try {
      const formData = new FormData();
      formData.append("profile", JSON.stringify(profile));
      if (imageFile) {
        formData.append("image", imageFile);
      }
      const response = await fetchApi(`/api/user/profile`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        try {
          response.json().then((data) => {
            setError(data.message);
          });
        } catch (error: any) {
          throw new Error(error);
        }
      }
      setLoading(false);
      if (response.ok) onClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setName(user?.name || "");
  }, [user]);

  return (
    <Modal className="w-full rounded border bg-white p-4 xs:w-[400px]">
      <h1 className="flex">
        <FaRegAddressCard className="mr-4 h-7 w-7" />
        <div className="text-xl font-semibold text-gray-600">
          Edit your profile
        </div>
      </h1>
      <div className="group relative mt-4 flex cursor-pointer">
        <UserAvatar
          name={user?.name || ""}
          url={imageURL}
          image={image}
          className="h-12 w-12 bg-pink-400"
        />
        <div className="mx-4 block text-sm font-semibold text-gray-600 group-hover:underline">
          Click to change your profile picture
        </div>
        <input
          type="file"
          accept=".jpeg,.jpg,.png"
          onChange={handleImageChange}
          className="absolute top-0 left-0 z-20 h-full w-full cursor-pointer opacity-0"
          multiple={false}
        />
      </div>
      <div className="mt-4 w-full">
        <Input
          type="text"
          placeholder="Name"
          value={name}
          errorMessage="Enter a valid name"
          onChange={setName}
          isValid={validName}
          name="name"
          title="Name"
        />
        <div className="mb-4" />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          errorMessage="Password must be at least 6 characters long"
          onChange={setPassword}
          isValid={validPassword}
          name="password"
          title="Password"
        />
        {error && (
          <div className="text-sm font-semibold text-red-600">{error}</div>
        )}
        <div className="mt-4 flex justify-end gap-2">
          <Button text="Cancel" onClick={() => onClose()} className="border" />
          <Button
            text={!loading ? "Submit" : "Loading..."}
            onClick={onSubmit}
            disabled={!validForm}
            className="border"
          />
        </div>
      </div>
    </Modal>
  );
};

export default Profile;
