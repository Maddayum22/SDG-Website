/** @author Madelief van Slooten */ // Only the base of the userService.

import { UserBusiness } from '../business/models/users';
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
     * @param user is an object of the user data.
     * @returns a promise with a boolean depending on the user data.
     * This function checks if the user data is valid. If it is, adds user in database.
     */
    public async addUser(user: User): Promise<boolean> {
        const userBusiness = new UserBusiness.User();
        if (
            !(await userBusiness.isValid(user)) ||
            (await User.findOne({ where: { username: user.username } })) ||
            (await User.findOne({ where: { emailAdress: user.emailAdress } }))
        ) {
            return false;
        }
        this.userRepository.addUser(user);
        return true;
    }

    public async updateUser(userId: number, userDetails: Partial<User>): Promise<User | null> {
        /** @author William Nguyen */
        let updatedUser: User | null = await this.userRepository.updateUser(userId, userDetails);
        return updatedUser;
    }

    /**
     * @author Sven Molenaar
     * @param userInputEmail string that contains the email provided by the user
     * @param userInputPassword string that contains the password provided by the user
     * @returns returns sessionID if input data was correct, otherwise it wont return anything
     */
    public async authenticateUser(userInputEmail: string, userInputPassword: string): Promise<string | null> {
        const user: User | null = await this.userRepository.getUserByEmail(userInputEmail);
        const userBusiness = new UserBusiness.User();
        userBusiness.password = user!.password;
        if (user && (await userBusiness.verifyPassword(userInputPassword))) {
            const sessionID = await this.sessionService.startSession(user);
            return sessionID.sessionID;
        }
        return null;
    }

    public async getUserType(userId: number): Promise<User | null> {
        /** @author Rowen Zaal */ // Requests usertype of the user.
        const userType = await this.userRepository.getUserType(userId);
        return userType;
    }
}
