import { User } from "./users";
import { UserBusiness, UserInterface } from "../../business/models/users";

export interface UserRepositoryInterface {
  doesUserExist(inputUser: UserInterface): Promise<boolean>;
  addUser(user: UserInterface): Promise<void>;
  getUserByEmail(userInputEmail: string): Promise<UserBusiness.User | null>;
  getUserById(userId: number): Promise<User | null>;
  getUserType(userId: number): Promise<User | null>;
  updateUser(userId: number, userDetails: Partial<User>): Promise<User | null>;
}
