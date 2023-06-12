/** @author Madelief van Slooten */ // Only the base of the repository class.

import { User } from '../models/users';
import { UserRepositoryInterface } from '../models/user-interface';
import { UserBusiness, UserInterface } from '../../business/models/users';
import * as argon2 from 'argon2';
import { UserType } from '../models/types';

export class UserRepository implements UserRepositoryInterface {
  public constructor() { }

  /**
   * @author Rowen Zaal
   * @param inputUser is an object of the user data.
   * @returns a promise with a boolean depending on the user data.
   * This function checks if username or email already exists in the database.
   */
  // public async doesUserExist(inputUser: UserInterface): Promise<boolean> {
  //   if (
  //     await this.doesUsernameExist(inputUser) ||
  //     await this.doesEmailExist(inputUser)
  //   ) {
  //     return true;
  //   }
  //   return false;
  // }

  public async getUsers() { }

  public async getUserById(userId: number) {
    return await User.findByPk(userId);
  }

  /**
   * @author Rowen Zaal
   * @param inputUser is an object of the user data.
   * @returns a Promise with a void
   * This function creates the user in the database.
   */
  public async addUser(inputUser: UserInterface): Promise<void> {
    inputUser.userType = UserType.Student;
    const { password, username, emailAdress, areaOfExpertise, userType } = inputUser;
    const hashedPassword = await argon2.hash(password);

    await User.create({
      username: username,
      password: hashedPassword,
      emailAdress: emailAdress,
      areaOfExpertise: areaOfExpertise,
      userType: userType
    });
  }

  public async getUserByEmail(userInputEmail: string): Promise<UserBusiness.User | null> {
    /** @author Sven Molenaar & Rowen Zaal */ // Finds the user by checking if the email is valid
    const user = await User.findOne({
      where: {
        emailAdress: userInputEmail,
      },
    })
    if (user) {
      const userBusiness = new UserBusiness.User(user);
      userBusiness.id = user.id;
      return userBusiness;
    }
    return null;
  }

  public async getUserType(userId: number): Promise<User | null> {
    /** @author Rowen Zaal */ // Finds the usertype by checking userId.
    return await User.findByPk(userId, {
      attributes: ["userType"],
    });
  }


  /**
   * @author William Nguyen
   * Saves the updated user in the database
   * @param userId id of the user
   * @param userDetails the user updates
   * @returns an updated user
   */
  public async updateUser(userId: number, userDetails: Partial<UserInterface>): Promise<boolean> {
    const user: User | null = await User.findOne({ where: { id: userId } });
    if (user === null) {
      return false
    }
    Object.assign(user, userDetails);
    const sequelizeUser = await user.save();
    const inputUser: Partial<UserInterface> = {
      username: sequelizeUser.username,
      firstName: sequelizeUser.firstName,
      lastName: sequelizeUser.lastName,
      emailAdress: sequelizeUser.emailAdress,
      password: sequelizeUser.password,
      areaOfExpertise: sequelizeUser.areaOfExpertise,
      userType: sequelizeUser.userType
    }
    return true;
  }

  public async doesUsernameExist(inputUser: UserInterface): Promise<boolean> {
    if (
      await User.findOne({ where: { username: inputUser.username } })
    ) {
      return true;
    }
    return false;
  }

  public async doesEmailExist(inputUser: UserInterface): Promise<boolean> {
    if (
      await User.findOne({ where: { emailAdress: inputUser.emailAdress } })
    ) {
      return true;
    }
    return false;
  }


  /**
   * @author Sven Molenaar
   * converts a Sequelize user object to a user interface object. 
   * @param sequeliuzeUser 
   * @returns an userInterface object
   */
  private convertValues(sequeliuzeUser: User): UserInterface {
    return {
      id: sequeliuzeUser.id,
      username: sequeliuzeUser.username,
      firstName: sequeliuzeUser.firstName,
      preposition: sequeliuzeUser.preposition,
      lastName: sequeliuzeUser.lastName,
      password: sequeliuzeUser.password,
      emailAdress: sequeliuzeUser.emailAdress,
      areaOfExpertise: sequeliuzeUser.areaOfExpertise,
      userType: sequeliuzeUser.userType,
      createdAt: sequeliuzeUser.createdAt,
      updatedAt: sequeliuzeUser.updatedAt,
    }
  }
}
