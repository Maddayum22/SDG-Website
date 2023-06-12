import { UserBusiness, UserInterface } from "../src/business/models/users";
import { UserController } from "../src/controller/users";
import { AreaOfExpertise, UserType } from "../src/data/models/types";
import { UserService } from "../src/services/users";
import { UserRepositoryInterface } from "../src/data/models/user-interface";
import { SessionService } from "../src/services/sessions";
import { SessionRepositoryInterface } from "../src/data/models/session-interface";
import { SessionRepositoryStub } from "./sessions-test-helper";
import { User } from "../src/data/models/users";
import { UserTestData } from "./user-test-data";

export class UpdateTestHelper {
    /**
     * @author William Nguyen
     * @returns fake update data
     */
    public fakeUpdateData(): UserInterface {
        return {
            username: "TestUsername",
            emailAdress: "test@gmail.com",
            areaOfExpertise: AreaOfExpertise.Technology,
            firstName: "John",
            lastName: "Doe",
            education: "TestEducation",
            password: 'testPassword123!',
            age: 19,
            userType: UserType.Student
        };
    }

    /**
     * @author William Nguyen
     * @returns invalid update data
     */
    public invalidUpdateData(): UserInterface {

        return {
            username: "",
            emailAdress: "testgmail.com",
            areaOfExpertise: AreaOfExpertise.Technology,
            firstName: "Jo hn#",
            lastName: "Do e#",
            education: "Test Education#",
            password: "testPassword123!",
            age: 19,
            userType: UserType.Student
        }
    }

    /**
     * @author William Nguyen
     * @returns User controller
     */
    public getUserController(): UserController {
        const userTestData: UserTestData = new UserTestData();
        const userService: UserService = userTestData.getUserService();
        const userController: UserController = new UserController(userService);
        return userController;
    }

    /**
     * @author William Nguyen
     * @returns User service
     */
    public getUserService(): UserService {
        const userRepositoryStub: UserRepositoryInterface = new UserRepositoryStub();
        const userService: UserService = new UserService(userRepositoryStub, this.getSessionService());
        return userService;
    }

    /**
     * @author William Nguyen
     * @returns Session service
     */
    public getSessionService(): SessionService {
        const sessionRepositoryStub: SessionRepositoryInterface = new SessionRepositoryStub();
        const sessionService: SessionService = new SessionService(sessionRepositoryStub);
        return sessionService;
    }
}

/**
 * @author William Nguyen
 * @returns Stub of the user repository
 */
export class UserRepositoryStub implements UserRepositoryInterface {
    doesUserExist(inputUser: UserInterface): Promise<boolean> {
        return Promise.resolve(false)
    }
    addUser(user: UserInterface): Promise<void> {
        return Promise.resolve()
    }
    getUserByEmail(userInputEmail: string): Promise<UserBusiness.User | null> {
        return Promise.resolve(null)
    }
    getUserById(userId: number): Promise<User | null> {
        return Promise.resolve(null)
    }
    getUserType(userId: number): Promise<User | null> {
        return Promise.resolve(null)
    }
    async updateUser(): Promise<boolean> {
        return new Promise<boolean>(res => {
            res(true);
        })
    }
    doesUsernameExist(): Promise<boolean> {
        return new Promise<boolean>(res => {
            res(true);
        })
    }
    doesEmailExist(): Promise<boolean> {
        return new Promise<boolean>(res => {
            res(true);
        })
    }
}