import { AreaOfExpertise, UserType } from '../src/data/models/types';
import { UserBusiness, UserInterface } from '../src/business/models/users';
import { UserService } from '../src/services/users';
import { UserRepositoryInterface } from '../src/data/models/user-interface';
import { SessionService } from '../src/services/sessions';
import { SessionRepositoryInterface } from '../src/data/models/session-interface';
import * as argon2 from 'argon2';
import { User } from '../src/data/models/users';
import { SessionRepositoryStub } from './sessions-test-helper';

/**
 * @author Sven Molenaar
 * Helper class for login-related tests.
 */
export class LoginTestHelper {
    /**
     * @author Sven Molenaar
     * Returns fake user data with correct credentials.
     * @returns {UserInterface} Fake user data with correct credentials.
     */
    public fakeUserDataCorrect(): UserInterface {
        return {
            username: 'Admin',
            password: 'Admin123!',
            emailAdress: 'Admin@Test.com',
            firstName: 'Matt',
            preposition: '',
            lastName: 'Smith',
            areaOfExpertise: AreaOfExpertise.Technology,
            userType: UserType.Admin,
        };
    }
    /**
     * Returns fake user data with incorrect credentials.
     * @author Sven Molenaar
     * @returns {UserInterface} Fake user data with incorrect credentials.
     */
    public fakeUserDataIncorrect(): UserInterface {
        return {
            username: 'Admin',
            password: 'WrongAdmin123!',
            emailAdress: 'WrongAdmin@Test.com',
            firstName: 'Matt',
            preposition: '',
            lastName: 'Smith',
            areaOfExpertise: AreaOfExpertise.Technology,
            userType: UserType.Admin,
        };
    }
    /**
     * @author Sven Molenaar
     * Gets an instance of the UserService.
     * @returns {UserService} An instance of the UserService.
     */
    public getUserService(): UserService {
        const userRepositoryStub: UserRepositoryInterface = new UserRepositoryStub();
        const userService: UserService = new UserService(userRepositoryStub, this.getSessionService());
        return userService;
    }
    /**
     * @author Sven Molenaar
     * Gets an instance of the SessionService.
     * @returns {SessionService} An instance of the SessionService.
     */
    public getSessionService(): SessionService {
        const sessionRepositoryStub: SessionRepositoryInterface = new SessionRepositoryStub();
        const sessionService: SessionService = new SessionService(sessionRepositoryStub);
        return sessionService;
    }
}
/**
 * @author Sven Molenaar
 * Stub implementation of UserRepositoryInterface for testing.
 */
export class UserRepositoryStub implements UserRepositoryInterface {
    /**
     * @author Sven Molenaar
     * Returns fake user data with hashed password.
     * @returns {Promise<UserInterface>} A promise that resolves to fake user data.
     */
    public async fakeUserData(): Promise<UserBusiness.User> {
        let password = await argon2.hash('Admin123!');
        const user =  {
            username: 'Admin',
            password: password,
            emailAdress: 'Admin@Test.com',
            firstName: 'Matt',
            preposition: '',
            lastName: 'Smith',
            areaOfExpertise: AreaOfExpertise.Technology,
            userType: UserType.Admin,
        };

        const userBusiness = new UserBusiness.User(user);
        return userBusiness;
    }

    doesUserExist(inputUser: UserInterface): Promise<boolean> {
        throw new Error('method not implemented');
    }
    /**
     * @author Sven Molenaar
     * Retrieves a user by their email address.
     * @param {string} userInputEmail - The email address of the user to retrieve.
     * @returns {Promise<UserBusiness.User | null>} A promise that resolves to the user data or null if not found.
     */
    getUserByEmail(userInputEmail: string): Promise<UserBusiness.User | null> {
        return new Promise<UserBusiness.User | null>(res => {
            res(this.fakeUserData());
        });
    }
    /**
     * @author Sven Molenaar.
     * the implementations of addUser,getUserByID,getUserType and updateUser arent used in the testing file,
     * but they are needed for the interface to work correctly in the test file.     * 
     */
    addUser(user: User): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getUserById(userId: number): Promise<User | null> {
        throw new Error('Method not implemented.');
    }
    getUserType(userId: number): Promise<User | null> {
        throw new Error('Method not implemented.');
    }
    updateUser(userId: number, userDetails: Partial<User>): Promise<User | null> {
        throw new Error('Method not implemented.');
    }
}
