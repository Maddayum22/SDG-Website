/** @author Madelief van Slooten */ // Only the base of the repository class.

import { User } from "../models/users";
import { UserRepositoryInterface } from "../models/user-interface";
import * as argon2 from "argon2";

export class UserRepository implements UserRepositoryInterface {
  public constructor() {}

  public async getUsers() {}

  public async getUserById(userId: number) {
    return await User.findByPk(userId);
  }

  public async addUser(user: User) {
    /** @author Rowen Zaal */ // Creates the user in the database.

    const { password, username, emailAdress, areaOfExpertise, userType } = user;
    const hashedPassword = await argon2.hash(password);

    await User.create({
      username: username,
      password: hashedPassword,
      emailAdress: emailAdress,
      areaOfExpertise: areaOfExpertise,
      userType: userType
    });
  }
  
  public async getUserByEmail(userInputEmail: string): Promise<User | null> {
    /** @author Sven Molenaar */ // Finds the user by checking if the email is valid
    return await User.findOne({
      where: {
        emailAdress: userInputEmail,
      },
    });
  }

  public async getUserType(userId: number): Promise<User | null> {
    /** @author Rowen Zaal */ // Finds the usertype by checking userId.
    return await User.findByPk(userId, {
      attributes: ["userType"],
    });
  }

  public async updateUser(userId: number, userDetails: Partial<User>) {
    /** @author William Nguyen */
    const user: User | null = await User.findOne({ where: { id: userId } });
    if (!user) {
      return null;
    }
    Object.assign(user, userDetails);
    return await user.save();
  }
}