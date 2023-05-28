import { useAppSelector } from "hooks/redux-hooks";

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
          <img
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

  return (
    <div className="py-4">
      {menu?.map((menuItem) => (
        <MenuItem
          key={menuItem.name}
          name={menuItem.name}
          price={menuItem.price}
          description={menuItem.description}
        />
      ))}
    </div>
  );
};

export default Menu;
