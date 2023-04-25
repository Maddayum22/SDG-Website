import { User } from "./users";
export interface UserRepositoryInterface {
  addUser(user: User): Promise<void>;
  getUserByEmail(userInputEmail: string): Promise<User | null>;
}
