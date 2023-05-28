import Map from "features/Map";
import Header from "features/Header";
import { Menu } from "features/MenuCarusel";
import BookingModal from "features/BookingModal";

export default function Home() {
  return (
    <div className="fixed left-0 right-0 bottom-0 top-0 flex flex-col bg-gray-200 ">
      <Header />
      <div className="flex flex-1 flex-col-reverse xs:flex-row">
        <Menu />
        <Map />
      </div>
      <BookingModal />
    </div>
  );
}
