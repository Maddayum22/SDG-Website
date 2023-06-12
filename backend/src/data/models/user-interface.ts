import { User } from "./users";
import { UserBusiness, UserInterface } from "../../business/models/users";
/**
 * @author Sven Molenaar
 * UserRepositoryInterface defines the contract for a repository that handles user-related operations.
 * It specifies the methods for checking user existence, adding a new user, retrieving a user by email or ID,
 * retrieving user type, and updating user details.
 */
export interface UserRepositoryInterface {
  // doesUserExist(inputUser: UserInterface): Promise<boolean>;
  addUser(user: UserInterface): Promise<void>;
  getUserByEmail(userInputEmail: string): Promise<UserBusiness.User | null>;
  getUserById(userId: number): Promise<UserInterface | null>;
  getUserType(userId: number): Promise<User | null>;
  updateUser(userId: number, userDetails: Partial<UserInterface>): Promise<boolean>;
  doesUsernameExist(inputUser: UserInterface): Promise<boolean>;
  doesEmailExist(inputUser: UserInterface): Promise<boolean>
}
