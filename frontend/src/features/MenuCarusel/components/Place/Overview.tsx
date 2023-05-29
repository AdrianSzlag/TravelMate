import { useAppSelector } from "hooks/redux-hooks";
import { RiMapPin2Line } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";

const Overview = () => {
  const place = useAppSelector((state) => state.places.focused);

  const address = place?.address;
  const images = place?.images && place.images.length > 0 ? place.images : null;
  const phone = place?.contactInfo.phone;
  const email = place?.contactInfo.email;
  const tags = place?.tags;

  return (
    <div className="py-2">
      {images && (
        <div className="flex gap-2 py-2">
          {images.map((image) => {
            return (
              <img
                key={image}
                src={`/${image}`}
                alt="place"
                className="w-24 h-40 rounded-xl object-cover hover:scale-105 cursor-pointer"
              />
            );
          })}
        </div>
      )}
      {address && (
        <div className="flex items-center py-2 cursor-pointer">
          <RiMapPin2Line className="inline-block mr-4 text-xl text-blue-500" />
          <span className="text-gray-500 font-semibold">{address}</span>
        </div>
      )}
      {phone && (
        <div className="flex items-center py-2 cursor-pointer">
          <FiPhone className="inline-block mr-4 text-xl text-blue-500" />
          <span className="text-gray-500 font-semibold">{phone}</span>
        </div>
      )}
      {email && (
        <div className="flex items-center py-2 cursor-pointer">
          <AiOutlineMail className="inline-block mr-4 text-xl text-blue-500" />
          <span className="text-gray-500 font-semibold">{email}</span>
        </div>
      )}
      {tags && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span className="text-gray-300 font-semibold text-sm">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Overview;
