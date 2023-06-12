/** @author Madelief van Slooten */ // Only the base of the userService.

import { UserBusiness, UserInterface } from '../business/models/users';
import { UserRepositoryInterface } from '../data/models/user-interface';
import { User } from '../data/models/users';
import { Auth } from '../util/auth';
import { SessionService } from './sessions';

export class UserService {
    private auth: Auth = Auth.getInstance();
    public constructor(private userRepository: UserRepositoryInterface, private sessionService: SessionService) {}

    public async getUsers() {}

    public async getUserById(id: number): Promise<User | null> {
        const user: User | null = await this.userRepository.getUserById(id);
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
        if (
            (!await userBusiness.isValid()) || 
            (await this.userRepository.doesUserExist(userBusiness))) {
            return false;
        }
        await this.userRepository.addUser(userBusiness);
        return true;
    }

    public async updateUser(userId: number, userDetails: Partial<User>): Promise<User | null> {
        /** @author William Nguyen */
        let updatedUser: User | null = await this.userRepository.updateUser(userId, userDetails);
        return updatedUser;
    }

    /**
     * @author Sven Molenaar & Rowen Zaal
     * @param userInputEmail string that contains the email provided by the user
     * @param userInputPassword string that contains the password provided by the user
     * @returns returns sessionID if input data was correct, otherwise it wont return anything
     */
    public async authenticateUser(userInputEmail: string, userInputPassword: string): Promise<string | null> {
        const userBusiness: UserBusiness.User | null = await this.userRepository.getUserByEmail(userInputEmail);
        if (userBusiness) {
            if(await userBusiness.verifyPassword(userInputPassword)) {
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