/** @author Madelief van Slooten */ // Only the base of the userService.

import { UserBusiness, UserInterface } from '../business/models/users';
import { UserRepositoryInterface } from '../data/models/user-interface';
import { User } from '../data/models/users';
import { Auth } from '../util/auth';
import { SessionService } from './sessions';

export class UserService {
    private auth: Auth = Auth.getInstance();
    public constructor(private userRepository: UserRepositoryInterface, private sessionService: SessionService) { }

    public async getUsers() { }

    public async getUserById(id: number): Promise<UserInterface | null> {
        const user: UserInterface | null = await this.userRepository.getUserById(id);
        return user;
    }

    /**
     * @author Rowen Zaal
     * @param inputUser is an object of the user data.
     * @returns a promise with a boolean depending on the user data.
     * This function checks if the user data is valid. If it is, adds user in database.
     */
    public async addUser(inputUser: UserInterface): Promise<boolean> {
        const userBusiness = new UserBusiness.User(inputUser);
        if (!(await userBusiness.isValid()) || (await this.userRepository.doesUsernameExist(userBusiness)) || (await this.userRepository.doesEmailExist(userBusiness))) {
            return false;
        }
        await this.userRepository.addUser(userBusiness);
        return true;
    }

    /** 
     * @author William Nguyen
     * Checks if username/email exists in the database, if not then it
     * validates the user updates and sends the updated user to the Repository
     * @param userId id of the user
     * @param userDetails the new user details
     * @returns an updated user if userDetails were valid, if not returns null
     * */
    public async updateUser(userId: number, userDetails: UserInterface): Promise<boolean> {
        const userBusiness = new UserBusiness.User(userDetails)
        const user = await this.userRepository.getUserById(userId);
        const userUpdates: Partial<UserInterface> = Object.assign({ user }, userDetails)
        if (userDetails.username !== user?.username) {
            if (await this.userRepository.doesUsernameExist(userDetails) === true) {
                return false;
            }
        }
        if (userDetails.emailAdress !== user?.emailAdress) {
            if (await this.userRepository.doesEmailExist(userDetails) === true) {
                return false;
            }
        }
        if (await userBusiness.isValidUpdate()) {
            await this.userRepository.updateUser(userId, userUpdates);
            return true;
        } else {
            return false
        }
    }

    /**
     * @author Sven Molenaar & Rowen Zaal
     * Authenticates a user based on their email and password.
     * @param userInputEmail The email provided by the user.
     * @param userInputPassword The password provided by the user.
     * @returns The session ID if the input data is correct, otherwise returns null.
     */
    public async authenticateUser(userInputEmail: string, userInputPassword: string): Promise<string | null> {
        const userBusiness: UserBusiness.User | null = await this.userRepository.getUserByEmail(userInputEmail);
        if (userBusiness) {
            if (await userBusiness.verifyPassword(userInputPassword)) {
                const sessionID = await this.sessionService.startSession(userBusiness);
                return sessionID.sessionID;
            }
        }
        return null;
    }

    /**
     * @author Rowen Zaal
     * @param userId is an id of the user
     * @returns a promise with a boolean depending on the user data.
     * This function requests the usertype of the user.
     */
    public async getUserType(userId: number): Promise<User | null> {
        const userType = await this.userRepository.getUserType(userId);
        return userType;
    }
}
