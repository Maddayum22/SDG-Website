import { UserRepositoryInterface } from "../data/models/user-interface";
import { User } from "../data/models/users";
import { UserRepository } from "../data/repository-sequelize/users";
import { Auth } from "../util/auth";

export class UserService {
  private auth: Auth = Auth.getInstance();

  public constructor(private userRepository: UserRepositoryInterface) {}

  public async getUsers() {}

  public async getUserById(id: number) {}

  public async addUser(user: User) {
    /**
     * @author Rowen Zaal
     * @param user is an object of the user data.
     * This function checks if the user data is valid.
     */
    try {
      Object.values(user).forEach((value) => {
        // The username of the user object will be checked for special characters.
        if (value === user.username) {
          if (this.containsSpecialChars(value)) {
            throw new Error();
          }
        }

        // The password of the user object will be checked for a minimum length and a special character.
        if (value === user.password) {
          if (
            this.hasPasswordLength(value) ||
            !this.containsSpecialChars(value)
          ) {
            throw new Error();
          }
        }

        // The email of the user object will be checked here.
        if (value === user.emailAdress) {
          if (!this.validateEmail(value)) {
            throw new Error();
          }
        }

        // All data from the user object will be checked if they are empty.
        if (this.containsEmptyString(value)) {
          throw new Error();
        }

        // The area of expertise from the user object will be checked if it exists.
        if (value === user.areaOfExpertise) {
          if (!this.validExpertise(value)) {
            throw new Error();
          }
        }

        // All data except the area of expertise will be checked for whitespaces.
        if (value !== user.areaOfExpertise) {
          if (this.hasWhiteSpace(value)) {
            throw new Error();
          }
        }
      });
      // The username will be checked if it already exists in the database.
      if (await User.findOne({ where: { username: Object.values(user)[0] } })) {
        throw new Error();
      }

      // The email will be checked if it already exists in the database.
      if (
        await User.findOne({ where: { emailAdress: Object.values(user)[2] } })
      ) {
        throw new Error();
      }

      // When all checks are done, user data will be sent to the repository.
      this.userRepository.addUser(user);
      return true;
    } catch (err: unknown) {
      return false;
    }
  }

  /**
   * This function checks for special characters in a string.
   * @param string is the data from the user object.
   * @returns a boolean: true/false
   */
  private containsSpecialChars(string: string): boolean {
    const specialChars = /[`!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(string);
  }

  /**
   * This function checks if the email string is filled in correctly.
   * @param string is the data from the user object.
   * @returns a boolean: true/false
   */
  private validateEmail(string: string): boolean {
    const emailString =
      /^[A-Z0-9+_-]+(?:[A-Z0-9+_.-]+)@[A-Z0-9-]+\.(?:[A-Z0-9\.-]+)$/gim;
    return emailString.test(string);
  }

  /**
   * This function checks if the length of the string has 8 or more characters.
   * @param string is the data from the user object.
   * @returns a boolean: true/false
   */
  private hasPasswordLength(string: string): boolean {
    if (string.length >= 8) {
      return false;
    }
    return true;
  }

  /**
   * This function checks if the string is empty by checking the length.
   * @param string is the data from the user object.
   * @returns a boolean: true/false
   */
  private containsEmptyString(string: string): boolean {
    if (string.length === 0) {
      return true;
    }
    return false;
  }

  /**
   * This function checks if string has a whitespace.
   * @param string is the data from the user object.
   * @returns a boolean: true/false
   */
  private hasWhiteSpace(string: string): boolean {
    return /\s/g.test(string);
  }

  /**
   * This function checks if the area of expertise exists by comparing the enum to the string.
   * @param string is the data from the user object.
   * @returns a boolean: true/false
   */
  private validExpertise(string: string): boolean {
    enum expertises {
      A = "Applied Social Sciences and Law",
      B = "Business and Economics",
      C = "Digital Media and Creative Industries",
      D = "Education",
      E = "Health",
      F = "Sports and Nutrition",
      G = "Technology",
    }
    const options = Object.values(expertises);
    for (const option of options) {
      if (option === string) {
        return true;
      }
    }
    return false;
  }

  public async updateUser(user: User) {}

  public async getUserByEmail(userInputEmail: string) {
    let user: User | null = await this.userRepository.getUserByEmail(
      userInputEmail
    );
    return user;
  }

  public async authenticateUser(
    userInputEmail: string,
    userInputPassword: string,
    DbEmail: string,
    DbPassword: string
  ) {
    if (
      (await this.auth.verifyEmail(userInputEmail, DbEmail)) &&
      (await this.auth.verifyPassword(userInputPassword, DbPassword))
    ) {
      return true;
    } else {
      return false;
    }
  }
}
