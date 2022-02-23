import mockedData from "../../../mockedData/users.json";
import { User } from "../../../types";

export const getUsers = (): Promise<User[]> => {
  // In real world here should be a call to BE
  return Promise.resolve(mockedData.users);
};
