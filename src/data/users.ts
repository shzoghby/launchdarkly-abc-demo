import { usersList } from "./usersMock";

export type User = {
  key: string;
  name: string;
  office: string;
  email: string;
  title: string;
}

export const getUserDetails = (id: string) => {
  const userFound = usersList.filter(user => user.key === id.toLowerCase());
  return userFound && userFound[0] ? userFound[0] : null;
}