import { User } from "../models/users";
import { Auth } from "../../util/auth";
import { UserRepositoryInterface } from "../models/user-interface";

export class UserRepository implements UserRepositoryInterface {
  private auth = Auth.getInstance();

  public constructor() {}

  public async getUsers() {}

  public async getUserById(id: number) {}

  public async addUser(user: User) {
    /** @author Rowen Zaal */ // Creates the user in the database.

    const { password, username, emailAdress, areaOfExpertise } = user;

    const hashedPassword = await this.auth.hashPassword(password);

    await User.create({
      username: username,
      password: hashedPassword,
      emailAdress: emailAdress,
      areaOfExpertise: areaOfExpertise,
      userType: "student",
    });
  }

  public async updateUser(user: User) {}

  public async getUserByEmail(userInputEmail: string): Promise<User | null> {
    return await User.findOne({
      where: {
        emailAdress: userInputEmail,
      },
    });
  }
}
