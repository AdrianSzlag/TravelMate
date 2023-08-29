import { Map } from "features/Map";
import Header from "features/Header";
import { Menu } from "features/MenuCarousel";
import BookingModal from "features/BookingModal";
import { LoginModal } from "features/Login";
import BusinessModal from "features/BusinessModal";
import { useAppSelector } from "hooks/redux-hooks";
import { useRef, useState } from "react";

export default function Home() {
  const isBusinessModalOpen = useAppSelector(
    (state) => state.business.modalOpen
  );
  const [lockMenu, setLockMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    setLockMenu(e.currentTarget.scrollTop < 100);
  };
  const toggleScroll = () => {
    const elementHeight = ref.current?.offsetHeight;
    if (elementHeight)
      ref.current?.scrollTo({
        top: lockMenu ? elementHeight : 0,
        behavior: "smooth",
      });
  };
  return (
    <>
      <div className="fixed left-0 right-0 bottom-0 top-0 flex flex-col">
        <Header />
        <div
          className="no-scrollbar relative flex flex-1 snap-y snap-mandatory flex-col overflow-auto scroll-smooth xs:flex-row"
          onScroll={scrollHandler}
          ref={ref}
        >
          <Map />
          <Menu minimized={lockMenu} toggleScroll={toggleScroll} />
        </div>
        <BookingModal />
      </div>
      {isBusinessModalOpen && <BusinessModal />}
      <LoginModal />
    </>
  );
}
