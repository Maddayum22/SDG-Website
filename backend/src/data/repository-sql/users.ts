/**
 * @author Sven Molenaar
 * SQL Query Model
 */
import { UserRepositoryInterface } from '../models/user-interface';
import { User } from '../models/users';
import { UserBusiness, UserInterface } from '../../business/models/users';
import { Database } from '../../util/database';
import { UserType } from '../models/types';
import * as argon2 from "argon2";

export class SQLUserRepository implements UserRepositoryInterface {
  public constructor(private database: Database) { }
  /**
   * @author Rowen Zaal
   * Creates an user in the database.
   * @param user User object
   */
  public async addUser(user: User): Promise<void> {
    try {
      user.userType = UserType.Student;
      const hashedPassword = await argon2.hash(user.password);
      this.database.pool?.query(
        'INSERT INTO sql_sdg_databasedetectives.users (username, password, emailAdress, areaOfExpertise, userType) VALUES (?, ?, ?, ?, ?)',
        [user.username, hashedPassword, user.emailAdress, user.areaOfExpertise, user.userType],
        function (err, result) {
          if (err) {
            throw new Error('Failed to create user');
          }
        }
      );
    } catch (error: unknown) {
      throw new Error('Failed to create user');
    }
  }
  /**
   * @author Sven Molenaar
   * Finds the user by checking if the email is valid.
   * @param userInputEmail The email address provided by the user.
   * @returns A Promise resolving to a UserBusiness.User object if found, otherwise null.
   */

  public async getUserByEmail(userInputEmail: string): Promise<UserBusiness.User | null> {
    try {
      const result = await this.database.pool!.promise().query(
        `SELECT * FROM sql_sdg_databasedetectives.users
        WHERE emailAdress = ?`,
        [userInputEmail]
      );
      const user = result[0][0];
      if (user) {
        const userBusiness = new UserBusiness.User(user);
        userBusiness.id = user.id;
        return userBusiness;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error('Failed to get user by email');
    }
  }


  /**
   * @author William Nguyen
   * @param userId the id of the user
   * @returns a promise that resolves either a UserInterface object or null
   */
  public async getUserById(userId: number): Promise<UserInterface | null> {
    'SELECT * FROM sdg_detectives.users WHERE id=${userId}'
    try {

      const [rows] = await this.database.pool?.promise().query(
        'SELECT * FROM sql_sdg_databasedetectives.users WHERE id = ?',
        [userId]
      );
      if (rows.length === 0) {
        return null;
      }
      const userData = rows[0];
      const user: UserInterface = {
        id: userData.id,
        username: userData.username,
        password: userData.password,
        emailAdress: userData.emailAdress,
        areaOfExpertise: userData.areaOfExpertise,
        userType: userData.userType,
      };

      return user;
    } catch (error: unknown) {
      throw new Error('Failed to get user by ID');
    }
  }

  /**
   * @author Rowen Zaal
   * @param userId is the userId of the user.
   * @returns the usertype of the user.
   */
  public async getUserType(userId: number): Promise<User | null> {
    try {
      const result = await this.database.pool?.promise().query(
        'SELECT userType FROM sql_sdg_databasedetectives.users WHERE id=?',
        [userId],
      );

      const usertype = result[0][0];
      return usertype;
    } catch (error: unknown) {
      throw new Error('Failed to get usertype');
    }
  }

  /**
* @author William Nguyen
* @param userId id of user where updated userdetails should be saved 
* @param userDetails updated userdetails 
* @returns an updated user or null
*/

  public async updateUser(userId: number, userDetails: Partial<UserInterface>): Promise<boolean> {
    let userUpdated: boolean;
    try {
      this.database.pool?.query(
        `UPDATE sql_sdg_databasedetectives.users 
           SET username = ?, firstname = ?, lastname = ?, emailAdress = ?, areaOfExpertise = ?, education = ?
           WHERE id= ?`,
        [userDetails.username, userDetails.firstName, userDetails.lastName, userDetails.emailAdress, userDetails.areaOfExpertise, userDetails.education, userId],
        function (err, _result) {
          err ? console.log(err) : (userUpdated = true)
        }
      );
    } catch (err) {
      throw new Error('Failed to update user')
    }
    return userUpdated = true;
  }

  /**
   * @author William Nguyen
   * @param inputUser the user 
   * @returns a boolean, true if the username exists and false if it doesn't
   */
  public async doesUsernameExist(inputUser: UserInterface): Promise<boolean> {
    let usernameExists: boolean;
    try {
      this.database.pool?.query(
        'SELECT username FROM sql_sdg_databasedetectives where username = ?',
        [inputUser.username],
        function (err, _result) {
          err ? console.log(err) : (usernameExists = false)
        }
      );
    } catch (err) {
      throw new Error('Username already in use')
    }
    return usernameExists = true
  }

  /**
   * @author William Nguyen
   * @param inputUser the user
   * @returns a boolean, true if email exists and false if it doesn't
   */
  public async doesEmailExist(inputUser: UserInterface): Promise<boolean> {
    let emailExists: boolean;
    try {
      this.database.pool?.query(
        'SELECT emailAdress FROM sql_sdg_databasedetectives where emailAdress = ?',
        [inputUser.emailAdress],
        function (err, _result) {
          err ? console.log(err) : (emailExists = false)
        }
      );
    } catch (err) {
      throw new Error('Email already in use')
    }
    return emailExists = true
  }
}
