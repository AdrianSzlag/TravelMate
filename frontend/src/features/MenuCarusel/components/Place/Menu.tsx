import Img from "components/Img";
import { useAppSelector } from "hooks/redux-hooks";
import { useState } from "react";
import NewMenuItemModal from "./NewMenuItemModal";

interface MenuItemProps {
  name: string;
  price?: number;
  description?: string;
  image?: string;
}
const MenuItem = ({ name, price, description, image }: MenuItemProps) => {
  return (
    <div className="p-1 flex hover:bg-gray-100 cursor-pointer">
      <div className="flex-1">
        <div className="text-gray-700 text font-semibold">{name}</div>
        {price && <div className="text-gray-500 text-sm">{price} zl</div>}
        {description && (
          <div className="text-gray-400 text-sm">{description}</div>
        )}
      </div>
      {image && (
        <div className="w-20 h-24 ">
          <Img
            src={`/${image}`}
            alt={name}
            className="w-full h-full object-contain"
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
  const isOwner = user?.id === ownerId;

  return (
    <div className="py-4">
      {menu?.length === 0 && (
        <div className="text-gray-400 font-semibold">
          No services available!
        </div>
      )}
      {isOwner && (
        <button
          className="rounded text-sm font-semibold text-gray-400 hover:underline"
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
          />
        ))}
      </div>
      {modalOpen && (
        <NewMenuItemModal
          placeId={placeId!}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Menu;
