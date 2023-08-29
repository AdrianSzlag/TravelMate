import { Map } from "features/Map";
import Header from "features/Header";
import { Menu } from "features/MenuCarousel";
import BookingModal from "features/BookingModal";
import { LoginModal } from "features/Login";
import BusinessModal from "features/BusinessModal";
import { useAppSelector } from "hooks/redux-hooks";
import { useEffect, useRef, useState } from "react";
import { set } from "immer/dist/internal";

export default function Home() {
  const isBusinessModalOpen = useAppSelector(
    (state) => state.business.modalOpen
  );
  const [menuMinimized, setMenuMinimized] = useState(false);
  const [scrollLock, setScrollLock] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const getScrollTop = () => {
    if (!contentRef.current) return undefined;
    const height = contentRef.current?.offsetHeight;
    const scrollHeight = contentRef.current?.scrollHeight;
    const scroll = contentRef.current?.scrollTop;
    return scroll + scrollHeight - height;
  };
  const setScrollTop = (top: number) => {
    if (!contentRef.current) return;
    const height = contentRef.current?.offsetHeight;
    const scrollHeight = contentRef.current?.scrollHeight;
    contentRef.current.scrollTo({
      top: top - scrollHeight + height,
      behavior: "smooth",
    });
  };

  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = getScrollTop();
    const height = contentRef.current?.offsetHeight;
    const scroll = height && scrollTop ? scrollTop / height : 0;
    setMenuMinimized(scroll < 0.4);
  };

  const scrollUp = () => setScrollTop(0);

  const scrollDown = () => {
    const elementHeight = contentRef.current?.offsetHeight;
    setScrollTop(elementHeight || 0);
  };

  const toggleScroll = () => {
    if (menuMinimized) {
      scrollDown();
    } else {
      scrollUp();
    }
  };

  const setScrollLockHandler = (lock: boolean) => {
    contentRef.current?.scrollTo({
      top: 0,
      behavior: "instant",
    });
    setScrollLock(lock);
  };

  return (
    <>
      <div className="fixed left-0 right-0 bottom-0 top-0 flex flex-col">
        <Header />
        <div
          className={
            "no-scrollbar relative flex flex-1 snap-y snap-mandatory flex-col-reverse scroll-smooth xs:flex-row " +
            (scrollLock ? "overflow-hidden" : "overflow-auto")
          }
          onScroll={scrollHandler}
          ref={contentRef}
        >
          <Menu
            minimized={menuMinimized}
            toggleScroll={toggleScroll}
            lockScroll={setScrollLockHandler}
          />
          <div className="h-[80%] min-h-0 w-full flex-none snap-start xs:h-full xs:flex-1">
            <Map />
          </div>
        </div>
        <BookingModal />
      </div>
      {isBusinessModalOpen && <BusinessModal />}
      <LoginModal />
    </>
  );
}
