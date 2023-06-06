import Img from "components/Img";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { useState } from "react";
import NewMenuItemModal from "./NewMenuItemModal";
import { deleteMenuItem, fetchPlace } from "store/places-actions";

interface MenuItemProps {
  name: string;
  price?: number;
  description?: string;
  image?: string;
  edit: boolean;
  onDelete: () => void;
}

const MenuItem = ({
  name,
  price,
  description,
  image,
  edit,
  onDelete,
}: MenuItemProps) => {
  return (
    <div className="p-1 flex hover:bg-gray-100 cursor-pointer">
      <div className="flex-1">
        <div className="text-gray-700 text font-semibold">{name}</div>
        {price && <div className="text-gray-500 text-sm">{price} zl</div>}
        {description && (
          <div className="text-gray-400 text-sm">{description}</div>
        )}
        {edit && (
          <div
            className="flex text-blue-600 text-sm font-semibold cursor-pointer"
            onClick={onDelete}
          >
            Delete menu item
          </div>
        )}
      </div>
      {image && (
        <div className="w-24 h-20 ">
          <Img
            src={`/${image}`}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

const Menu = () => {
  const menu = useAppSelector((state) => state.places.focused?.menu);
  const [modalOpen, setModalOpen] = useState(false);
  const placeId = useAppSelector((state) => state.places.focused?.id);
  const ownerId = useAppSelector((state) => state.places.focused?.createdBy.id);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const isOwner = user?.id === ownerId;

  const deleteMenuItemHandler = async (id: string) => {
    if (!placeId || !isOwner) return;
    const confirm = window.confirm(
      "Are you sure you want to delete this menu item?"
    );
    if (confirm) {
      dispatch(deleteMenuItem(placeId, id));
    }
  };

  const onCloseModalHandler = () => {
    dispatch(fetchPlace(placeId!));
    setModalOpen(false);
  };

  return (
    <div className="py-4">
      {menu?.length === 0 && (
        <div className="text-gray-400 font-semibold pl-1">
          No services available!
        </div>
      )}
      {isOwner && (
        <button
          className="rounded text-sm font-semibold text-gray-400 hover:underline pl-1"
          onClick={() => setModalOpen(true)}
        >
          Click to add new menu item
        </button>
      )}
      <div className="">
        {menu?.map((menuItem) => (
          <MenuItem
            key={menuItem.name}
            name={menuItem.name}
            price={menuItem.price}
            description={menuItem.description}
            image={menuItem.image}
            edit={isOwner}
            onDelete={() => deleteMenuItemHandler(menuItem.id)}
          />
        ))}
      </div>
      {modalOpen && (
        <NewMenuItemModal placeId={placeId!} onClose={onCloseModalHandler} />
      )}
    </div>
  );
};

export default Menu;
