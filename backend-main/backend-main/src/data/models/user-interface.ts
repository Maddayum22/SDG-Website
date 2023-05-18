import { User } from "./users";
export interface UserRepositoryInterface {
  addUser(user: User): Promise<void>;
  getUserByEmail(userInputEmail: string): Promise<User | null>;
  getUserById(userId: number): Promise<User | null>;
  getUserType(userId: number): Promise<User | null>;
  updateUser(userId: number, userDetails: Partial<User>): Promise<User | null>;
}
