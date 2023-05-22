import { IUser } from "../types/IUser";

export function getToken() {
  return localStorage.getItem("token");
}

export function getUser() {
  const user = localStorage.getItem("user");
  if (!user) return null;
  return JSON.parse(user) as IUser;
}

export function isLoggedIn() {
  return !!getToken() && !!getUser();
}

export function setAuthData(token: string, user: IUser) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function removeAuthData() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
}
