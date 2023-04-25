/**
 * @author Sven Molenaar
 * SQL Query Model
 */
import { UserRepositoryInterface } from "../models/user-interface";
import { User } from "../models/users";

export class SQLUserRepository implements UserRepositoryInterface {
  public constructor() {}

  public async addUser(user: User): Promise<void> {
    //     "Insert into sdg_detectives.users(username,password,emailAdress,areaOfExpertise,userType,createdAt,updatedAt) values(?,?,?,?,?,?,?)"
    //     [user.username, user.password, user.emailAdress, user.areaOfExpertise,
    //      user.userType, new Date(), new Date(),
    //     ]
  }

  public async getUserByEmail(userInputEmail: string): Promise<User | null> {
    //     'SELECT * FROM sdgdetectives.users where emailAdress=$(userInputEmail)'
    return null;
  }
}
