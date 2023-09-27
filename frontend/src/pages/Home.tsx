import Map from "features/Map/components/Map";
import Header from "features/Header";
import { Menu } from "features/MenuCarousel";
import ServiceBookingModal from "features/ServiceBookingModal";
import RoomBookingModal from "features/RoomBookingModal";
import { LoginModal } from "features/Login";
import BusinessModal from "features/BusinessModal";
import { useAppSelector } from "hooks/redux-hooks";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const isBusinessModalOpen = useAppSelector(
    (state) => state.business.modalOpen
  );
  const [menuMinimized, setMenuMinimized] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollLock, setScrollLock] = useState(false);

  useEffect(() => {
    contentRef.current?.scrollTo({
      top: contentRef.current.offsetHeight * 0.8,
      behavior: "instant",
    });
  }, []);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    const current = contentRef.current;
    if (!current) return;
    const scroll = e.currentTarget.scrollTop;
    const height = current.offsetHeight;
    if (scroll === undefined) return;
    if (scroll / height > 0.6) {
      setMenuMinimized(false);
    }
    if (scroll / height < 0.2) {
      setMenuMinimized(true);
    }
  };

  const scrollDown = () => {
    const current = contentRef.current;
    if (!current) return;
    current.scrollTo({
      top: current.offsetHeight * 0.8,
      behavior: "smooth",
    });
  };

  const maximize = () => {
    scrollDown();
  };

  const setScrollLockHandler = (lock: boolean) => {
    const current = contentRef.current;
    if (current && lock) {
      contentRef.current?.scrollTo({
        top: current.offsetHeight * 0.8,
        behavior: "instant",
      });
    }
    setScrollLock(lock);
  };
  return (
    <>
      <div className="fixed left-0 right-0 bottom-0 top-0 flex flex-col">
        <Header />
        <div
          className={
            "relative flex flex-1 snap-y snap-mandatory snap-always flex-col overscroll-none scroll-smooth xs:flex-row " +
            (scrollLock ? "overflow-hidden " : "overflow-auto ")
          }
          onScroll={scrollHandler}
          ref={contentRef}
        >
          <div className="h-[80%] min-h-0 w-full flex-none snap-start xs:h-full xs:flex-1 ">
            <Map />
          </div>
          <Menu
            minimized={menuMinimized}
            maximize={maximize}
            setScrollLock={setScrollLockHandler}
          />
        </div>
        <ServiceBookingModal />
        <RoomBookingModal />
      </div>
      {isBusinessModalOpen && <BusinessModal />}
      <LoginModal />
    </>
  );
}
