import {
  redirect,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Map from "../features/Map";
import Header from "../features/Header";
import { Menu } from "../features/MenuCarusel";
import { getToken } from "../utils/auth";
import store from "../store";
import { placesActions } from "../store/places-slice";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { fetchPlace } from "../store/places-actions";
import { useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const places = useAppSelector((state) => state.places.places);
  const focused = useAppSelector((state) => state.places.focused);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { placeId } = useParams();

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
