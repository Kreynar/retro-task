import { User } from "../types";
import mockedData from "../../../mockedData/users.json";

export const getUsers = (): Promise<User[]> => {
  // In real world here should be a call to BE
  return Promise.resolve(mockedData.users);
};
