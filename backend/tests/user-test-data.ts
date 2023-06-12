import * as tssinon from 'ts-sinon';
import * as Sinon from 'sinon';
import { UserService } from '../src/services/users';
import { UserInterface } from '../src/business/models/users';
import { AreaOfExpertise, UserType } from '../src/data/models/types';
import { UserRepository } from '../src/data/repository-sequelize/users';
import { SessionService } from '../src/services/sessions';
import { SessionRepositoryInterface } from '../src/data/models/session-interface';
import { SessionRepository } from '../src/data/repository-sequelize/sessions';

export class UserTestData {
    /**
     * @author Rowen Zaal
     * @returns the UserService using a repository stub & session service stub.
     */
    public getUserService(): UserService {
        const userService: UserService = new UserService(this.getUserRepositoryStub(), this.getSessionServiceStub());
        return userService
    }

    /**
     * @author Rowen Zaal
     * @returns valid fake register input.
     */
    public getFakeRegisterInput(): UserInterface {
        const fakeRegisterInput: UserInterface = {
            username: "Testusername",
            password: "testtest#",
            emailAdress: "testmail@test.com",
            areaOfExpertise: AreaOfExpertise.Health,
            userType: UserType.Student
        }
        return fakeRegisterInput;
    }

    /**
     * @author Rowen Zaal
     * @returns fake register input of an user that already exists.
     */
    public getFakeExistingUser(): UserInterface {
        const fakeExistingUser: UserInterface = {
            username: "duplicate",
            password: "testtest#",
            emailAdress: "duplicate@test.com",
            areaOfExpertise: AreaOfExpertise.Health,
            userType: UserType.Student
        }
        return fakeExistingUser;
    }

    /**
     * @author Rowen Zaal
     * @returns a session service stub using the repository interface stub.
     */
    private getSessionServiceStub(): tssinon.StubbedInstance<SessionService> {
        const sessionService: SessionService = new SessionService(this.getSessionRepositoryInterfaceStub());
        const sessionServiceStub: tssinon.StubbedInstance<SessionService> = tssinon.stubObject<SessionService>(sessionService);
        return sessionServiceStub;
    }

    /**
     * @author Rowen Zaal
     * In this function the userRepositoryStub doesUserExist function Promises true/false depending on which register input is used.
     * @returns an user repository stub.
     */
    private getUserRepositoryStub(): tssinon.StubbedInstance<UserRepository> {
        const userRepository: UserRepository = new UserRepository();
        const userRepositoryStub: tssinon.StubbedInstance<UserRepository> = tssinon.stubObject<UserRepository>(userRepository);
        return userRepositoryStub;
    }

    /**
     * @author Rowen Zaal
     * @returns a session repository interface stub.
     */
    private getSessionRepositoryInterfaceStub(): tssinon.StubbedInstance<SessionRepositoryInterface> {
        const sessionRepositoryInterface: SessionRepositoryInterface = new SessionRepository();
        const sessionRepositoryInterfaceStub: tssinon.StubbedInstance<SessionRepositoryInterface> = tssinon.stubObject<SessionRepositoryInterface>(sessionRepositoryInterface);
        return sessionRepositoryInterfaceStub;
    }
}