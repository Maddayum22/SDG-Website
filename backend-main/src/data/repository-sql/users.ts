/**
 * @author Sven Molenaar
 * SQL Query Model
 */
import { UserRepositoryInterface } from "../models/user-interface";
import { User } from "../models/users";
import { UserBusiness, UserInterface } from "../../business/models/users";
import { Database } from "../../util/database";

export class SQLUserRepository implements UserRepositoryInterface {
  public constructor(private database: Database) { }

  public async doesUserExist(inputUser: UserInterface): Promise<boolean> {
    //     'SELECT username FROM sdgdetectives.users where username=$(inputUser)'
    //     'SELECT emailAdress FROM sdgdetectives.users where emailAdress=$(userInputEmail)'
    return false;
  }

  /**
   * @author Rowen Zaal
   * Creates an user in the database.
   * @param user User object
   */
  public async addUser(user: User): Promise<void> {
    try {
      this.database.pool?.query(
        'INSERT INTO sql_sdg_databasedetectives.users (username, password, emailAdress, areaOfExpertise, userType) VALUES (?, ?, ?, ?, ?)',
        [user.username, user.password, user.emailAdress, user.areaOfExpertise, user.userType],
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

  public async getUserByEmail(userInputEmail: string): Promise<UserBusiness.User | null> {
    //     'SELECT * FROM sdgdetectives.users where emailAdress=$(userInputEmail)'
    return null;
  }

  public async getUserById(userId: number): Promise<User | null> {
       'SELECT * FROM sdg_detectives.users WHERE id=${userId}'
    return null;
  }

  public async getUserType(userId: number): Promise<User | null> {
       'SELECT userType FROM sdg_detectives.users WHERE id=${userId}'
    return null
  }

  public async updateUser(userId: number): Promise<User | null> {
    //
    return null
  }
}
