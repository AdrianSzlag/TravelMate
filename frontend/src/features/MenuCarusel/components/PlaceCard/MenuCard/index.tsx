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
    <div className="flex p-1 ">
      <div className="flex-1">
        <div className="text font-semibold text-gray-700">{name}</div>
        {!!price && <div className="text-sm text-gray-500">{price} zl</div>}
        {description && (
          <div className="text-sm text-gray-400">{description}</div>
        )}
        {edit && (
          <div
            className="flex cursor-pointer text-sm font-semibold text-blue-600"
            onClick={onDelete}
          >
            Delete menu item
          </div>
        )}
      </div>
      {image && (
        <div className="h-20 w-24 ">
          <Img
            src={`/${image}`}
            alt={name}
            className="h-full w-full object-cover"
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
        <div className="pl-1 font-semibold text-gray-400">
          No services available!
        </div>
      )}
      {isOwner && (
        <button
          className="rounded pl-1 text-sm font-semibold text-gray-400 hover:underline"
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
