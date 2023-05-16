import { redirect } from "react-router-dom";
import Map from "../features/Map";
import Header from "../features/Header";
import { Menu } from "../features/MenuCarusel";
import { getToken } from "../utils/auth";

export default function Home() {
  return (
    <div className="fixed left-0 right-0 bottom-0 top-0 flex flex-col bg-gray-200 ">
      <Header />
      <div className="flex flex-1 flex-col-reverse xs:flex-row">
        <Menu />
        <Map />
      </div>
    </div>
  );
}

export function loader({ request }: { request: Request }) {
  const token = getToken();
  if (!token) {
    return redirect("/login");
  }
  return null;
}
